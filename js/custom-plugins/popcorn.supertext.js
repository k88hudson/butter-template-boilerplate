// PLUGIN: Footnote/Text

(function ( Popcorn ) {

  /**
   * This is a modified form of the Footnote popcorn plug-in
   * Instead of hiding/showing using style.display, it adds and removes an 'active' class.
   * Required options are start, end, and text. Other options are optional.
   * If you do not specify a target, supertext will generate subtitles.
   *
   * Example:
     var p = Popcorn('#video')
        .supertext({
          start: 5, // seconds
          end: 15, // seconds
          text: 'This video made exclusively for drumbeat.org',
          defaultTransition: 400, //in milliseconds
          baseClass: 'supertext',
          activeClass: 'active',
          target: 'targetdiv',
          callback: function() {
            console.log("Supertext is playing!");
          }
        });
   *
   */
    var styleSheet, subtitleStyleSheet, subtitleContainer;

    Popcorn.plugin( "supertext" , {

      manifest: {
        about: {
          name: "Popcorn supertext Plugin",
          version: "0.1",
          author: "@k88hudson",
          website: "http://k88.ca"
        },
        options: {
          text: {
            elem: "input",
            type: "text",
            label: "Text"
          },
          start: {
            elem: "input",
            type: "number",
            label: "Start"
          },
          end: {
            elem: "input",
            type: "number",
            label: "End"
          },
          defaultTransition: {
            elem: "input",
            type: "number",
            label: "Default Transition Time (in milliseconds)"
          },
          target: "supertext-container"
        }
      },
    _setup: function( options ) {

      if( options.defaultTransition && styleSheet ) {
        styleSheet.parentNode.removeChild( styleSheet );
        styleSheet = undefined;
        console.log('stylesheet', styleSheet);
      }

      //Create the stylesheet if it is not set
      if(! styleSheet) {
        var transition;
        if( options.defaultTransition ) {
          transition = options.defaultTransition/1000 
        }
        else {
          transition = .5;
        }

        styleSheet = document.createElement('style');
        styleSheet.setAttribute('type', 'text/css');
        styleSheet.appendChild(
          document.createTextNode('.supertext-container { \n'+
            '  -webkit-transition: visibility 0s '+transition+'s, opacity '+transition+'s '+transition+'s linear;\n'+
            '  -moz-transition: visibility 0s '+transition+'s, opacity '+transition+'s linear;\n'+
            '  transition: visibility 0s '+transition+'s, opacity '+transition+'s linear;\n'+
            '  opacity: 0; visibility:hidden; overflow: hidden;\n'+
            '}\n'+
            '.supertext-container > div {\n'+
            '  margin-top: -10000px;\n'+
            '  -webkit-transition: margin-top 0s '+transition+'s;\n'+
            '  -moz-transition: margin-top 0s '+transition+'s;\n'+
            '  transition: margin-top '+transition+'s '+transition+'s;\n'+
            '}\n'
        ));
        styleSheet.appendChild(
          document.createTextNode('.supertext-active { \n'+
            '  -moz-transition: opacity '+transition+'s '+transition+'s linear;\n'+
            '  -webkit-transition: opacity '+transition+'s '+transition+'s linear;\n'+
            '  transition: opacity '+transition+'s '+transition+'s linear;\n'+
            '  opacity: 1; visibility:visible;\n'+
            '}\n'+
            '.supertext-active > div {\n'+
            '  margin-top: 0;\n'+
            '}\n'
        ));

       // var headElements = document.head.childNodes;
        document.head.appendChild(styleSheet);
      }

      options._target = document.getElementById( options.target );

      //Check if the target container exists
      if ( !options._target && !subtitleContainer) {
        if(!subtitleStyleSheet) {
          subtitleStyleSheet = document.createElement("style");
          subtitleStyleSheet.setAttribute('type', 'text/css');
          document.head.appendChild(subtitleStyleSheet);
        }
        subtitleContainer = createDefaultContainer( this, "supertext-subtitles-" + this.media.id );
        subtitleStyleSheet.appendChild(
        document.createTextNode( "#" + subtitleContainer.id + ' { \n'+
          '  font-family: "Helvetica Neue", Helvetica, sans-serif;\n'+
          '  text-align: center;\n'+
          '  text-shadow: 0 0 4px #000;\n'+
          '  color: #FFF;\n'+
          '}\n'+
          '#' + subtitleContainer.id + ' .supertext-container {\n'+
          '  position: absolute;\n' +
          '  bottom: 40px;\n'+
          '}\n'
        ));
      }

      if ( !options._target ) {
        options._target = subtitleContainer;
      }

      //Check if active and base classes are provided
      if( options.baseClass === undefined ) {
        options.baseClass = "supertext-container";
      }
      if( options.activeClass === undefined ) {
        options.activeClass = "supertext-active";
      }
        
      options._container = document.createElement( "div" );
      options._container.className = options.baseClass;
      options._container.innerHTML  = '<div>' + options.text + '</div>';

      options._target && options._target.appendChild( options._container );

      //Run the callback
      if(typeof options.callback === "function") {
        options.callback();
      }

    },
  
    start: function( event, options ){
      //Hide other active elements in the target container first
      var activeElements = options._target.querySelectorAll("."+options.activeClass);
      for(var i=0;i<activeElements.length;i++) {
        activeElements[i].removeClass(options.activeClass);
      }
      addClass(options._container, options.activeClass);
    },
   
    end: function( event, options ){
      removeClass(options._container, options.activeClass);
    },
    _teardown: function( options ) {
      options._target && options._target.removeChild( options._container );
    }
  });

  //Helpers

  //Modified from subtitle plugin
  createDefaultContainer = function( context, containerID ) {

    var ctxContainer = context.container = document.createElement( "div" ),
        style = ctxContainer.style,
        media = context.media;

    var updatePosition = function() {
      var position = context.position();
      // the video element must have height and width defined
      style.fontSize = "18px";
      style.width = media.offsetWidth + "px";
      style.top = position.top  + media.offsetHeight - ctxContainer.offsetHeight - 40 + "px";
      style.left = position.left + "px";

      setTimeout( updatePosition, 10 );
    };

    ctxContainer.id = containerID || "supertext-subtitles-" + Popcorn.guid();

    style.position = "absolute";
    updatePosition();

    context.media.parentNode.appendChild( ctxContainer );

    return ctxContainer; 
  };

  function hasClass(el, name) {
    return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
  }
  function addClass(el, name) {
    if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
  }
  function removeClass(el, name) {
   if (hasClass(el, name)) {
      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
   }
  }

})( Popcorn );
