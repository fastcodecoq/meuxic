
require_once("assets/js/jquery.js");

(function(){
		
   var this_;
   var data;

   $.fn.meuxic = function(){

   	  render.home();

      console.log("meuxic esta iniciado");

   }


   var render = {

   	  	home : function(){

   	  		  if(!$.browser.chrome && !$.browser.safari)
   	  		  	$("body").css({ background : "url(assets/img/bg.jpg)", "background-size" : "cover"});

   	  	}

   }

})(jQuery);


 



 $("#meuxic").meuxic();	

