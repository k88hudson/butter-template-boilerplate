How to make a template
======================

First, download the folder including all submodules.
`git clone https://k88hudson@github.com/k88hudson/butter-template-boilerplate.git --recursive`

1. Create your html file
------------------------
Your main template page is in `index.html`. On that page, you can specify media and target elements by adding the following attributes:
<dl>
<dt>data-butter="media"</dt>
<dd>Add to the video/div that will contain your media element.</dd>  
<dt>data-butter="target"</dt>
<dd>Add to anything you want to be a target. Make sure you give your element a unique ID!</dd>
<dt>data-butter="exclude"</dt>
<dd>Add to anything you want to show up in the editor, but NOT the exported/shared project.</dd>
</dl>

See the included `index.html` for examples.

2. Add custom plugins to js/custom-plugins, and custom editors to js/custom-editors
------------------------------------------------------------------------------------
If you want to use any custom plugins or editors not included in butter, this is where you should put them.
[Todo: How to create custom editors]

3. Set up your configuration file
----------------------------------
The configuration file for butter is in `configure.conf`. This is where you must specify:
- which plugins to include, and their paths (including your custom ones)
- any custom editors
- your cornfield server, if you are using one

See the included file for examples of how to do this.

4. Set up your javascript file in the js directory
---------------------------------------------------
In `mytemplate.js`, you will see examples of how to add tracks and inital track events events. Any javascript that interacts with butter/your media element should go here.

If you change the name of this file, ensure you are linking to it correctly from `index.html`.

5. Test on a local server
-------------------------
You are ready to test your template! You can do so easily by typing the following in your Terminal:
```
cd [whatever your directory for the project is, e.g. Documents/butter-template-boilerplate ]
python -m SimpleHTTPServer 8888
```

Type `localhost:8888` in your browser and check it out!

