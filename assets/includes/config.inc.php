<?php 




 

  if($_SERVER["SERVER_NAME"] === "localhost"){


			define("logo","http://localhost/props/encuestas/assets/img/golf.jpg");
			define("db_host", "localhost");
			define("db_user", "gomosoft");
			define("db_password", "p455w0rd");
			define("db_database", "encuestas");
			define("tb_prefix", "golf_");


  }
   else if($_SERVER["SERVER_NAME"] === "gomosoft.pro"){


   	 define("logo","http://gomosoft.pro/encuesta/assets/img/golf.jpg");
   	 define("db_host", "localhost");
     define("db_user", "gomosoft_go");
     define("db_password", "p455w0rd");
     define("db_database", "gomosoft_encuestas");
     define("tb_prefix", "golf_");
   	 

  } 
  
