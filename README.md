# PICASA

## A JavaScript wrapper for Picasa's API.

## Example


  #html
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
  <html>
  <head>
    <title>PicasaViewer based on pur JavaScript</title>
    <link rel="stylesheet" href="reset-fonts-grids.css" type="text/css">
    <link rel="stylesheet" href="style.css" type="text/css">
  </head>
  <body>
  <div id="doc" class="yui-t7">
     <div id="hd" role="banner"><h1></h1></div>
     <div id="bd" role="main">
	<div class="yui-g">
          <div id="navigate"></div>
          <div id="photos"></div>
 	</div>
     </div>
     <div id="ft" role="contentinfo"><p>Created by @<a href="http://adrianstatescu.com">thinkphp</a></p></div>
  </div>
  
  #js     
  <script type="text/javascript" src="picasabadge.js"></script>
  <script type="text/javascript">picasabadge.init({username: 'mergesortv'});</script>
