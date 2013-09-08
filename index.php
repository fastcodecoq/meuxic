<?php

  require(dirname(__FILE__) . "/assets/includes/api.php" );
  require(dirname(__FILE__) . "/langs/lang.php" );

?>

<!DOCTYPE html>
<html lang="en-US" xlmns:og="http://ogp.me/ns#">
  
   <head>

   	<meta charset="UTF-8" />

   	<title>Meuxic - Play your life</title>

   	<link rel="stylesheet" href="assets/css/bootstrap.min.css" media="screen" />
   	<link rel="stylesheet/less" href="assets/less/index.less"  media="screen" />

   	<script src="assets/js/lib.js"></script>

    <style>
       #dropbox.dragdrop{

       	  background-image:  url(<?php echo $lang["drag"]; ?>); background-position:center; background-repeat: no-repeat;

       }
    </style>

   </head>

   <body>

   	<div id="container">

  <form name="uploader" method="post" action="javascript:void()" style="display:none">
   			<input type="file" name="files" multiple />
   </form>
   	
  <div class="logo">
   <h1><span style="font-size:1.5em">m</span>euxic</h1> 
  </div>
  <br />
  <div>
  <a href="#" data-action="click" data-target="input[name='files']" rel="nofollow" class="note"><?php echo $lang["upload_songs"]; ?></a>
</div>
  <br />
  <br />
  		<form method="post" name="search">
   			<input type="text" name="query" placeholder="<?php echo $lang["search_text"]; ?>" spellcheck="false"/>
   			<a href="#" data-action="submit" data-target="form[name='search']">
   				<i class='icon-seacrh'></i>
   			</a>
   		</form>
  <br /> 
  <br />
  	<span  class="promo"><?php echo $lang["promo_home"]; ?></span>
   <br />
   <br />
   <br />
   <br />

   		  <div class="full">
   		  	  <a  rel="nofollow" >
   		  	  	  <i class='fb-connect'></i>
   		  	  </a>
   		  </div>

   <br />
   <br />
   	  <div class="progress-bar" id="upload_bar" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100" >   	

   <div id="dropbox" > 
   </div>

 
  
   </div>

   <script>    

         require("assets/js/upload.js");
         require("index.js");

   </script>

   </body>

</html>