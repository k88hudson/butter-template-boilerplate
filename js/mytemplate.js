document.addEventListener( "DOMContentLoaded", function( e ){

  Butter({
    config: "../config.conf",
    ready: function( butter ){
      var media = butter.media[ 0 ]; //This is the media element

      function start(){
        //Add a track
        var track = media.addTrack( "Track1" );
        //Add more tracks...
        media.addTrack( "Track" + Math.random() );
        media.addTrack( "Track" + Math.random() );

        //Add a track event
        var event = track.addTrackEvent({
          type: "text",
          popcornOptions: {
            start: 0,
            end: 3,
            text: "This is some text here.... Isn't it nice?",
            target: "Right1"
          }
        });
        var superevent = track.addTrackEvent({
          type: "supertext",
          popcornOptions: {
            start: 5,
            end: 10,
            text: "SUPER",
            target: "Right2",
            defaultTransition: 600
          }
        });
        var superevent2 = butter.tracks[ 1 ].addTrackEvent({
          type: "supertext",
          popcornOptions: {
            start: 5,
            end: 10,
            text: "SUPERrrrrrrr",
          }
        });

        //Try uncommenting and see what happens....
        /*
        //Add a track event to the third track
        butter.tracks[ 2 ].addTrackEvent({ 
          type: "footnote",
          popcornOptions: {
            start: 1,
            end: 2,
            text: "More text!!!!"
            target: "Bottom"
          }
        });
        */

      } //start
      
      media.onReady( start );
      
      window.butter = butter;
    } 
  }); //Butter
}, false );

_testInitCallback = function(){
  console.log( "init callback" );
};

_testBeforeCallback = function( popcorn ){
  console.log( "before callback", popcorn );
};

_testAfterCallback = function( popcorn ){
  console.log( "after callback", popcorn );
};

