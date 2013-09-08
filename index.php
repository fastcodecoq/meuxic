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



   </head>

   <body>

   	<div id="container">


   	
  <div class="logo">
   <h1><span style="font-size:1.5em">m</span>euxic</h1> 
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
   		  	  <a data-action="click" data-target="input[name='files']" rel="nofollow" >
   		  	  	  <i class='fb-connect'></i>
   		  	  </a>
   		  </div>

   <br />
   <br />

   <div id="#uploader">
   </div>

   <form name="uploader" method="post" action="javascript:void()" >
   			<label>Upload your songs</label> <br />
   			<input type="file" name="files" multiple />
   </form>
  
   </div>

   <script>    

         require("assets/js/upload.js");
         require("index.js");

   </script>

   </body>

</html>