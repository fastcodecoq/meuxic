<?php


if(isset($_GET["lang"]) )
  switch(str_to_lower($_GET["lang"])){


    case "es":

    require_once(dirname(__FILE__) . "/es-CO.php");
      

    break;

  }

  else  
    require_once(dirname(__FILE__) . "/en-US.php");
  