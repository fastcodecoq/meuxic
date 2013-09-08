
require_once("assets/js/jquery.js");

(function(){
		
   var this_;
   var data = {

   	  dropbox : "dropbox",
   	  form : "form[name='uploader']"

   };

   $.fn.meuxic = function( vars ){


   	 if(vars instanceof Object)
   	 	$.extend(data, vars);


   	  render.home();
   	  $(data.form).upload();
   	  listeners();

      console.log("meuxic esta iniciado");

   }


   var render = {

   	  	home : function(){

   	  		  if(!$.browser.chrome && !$.browser.safari)
   	  		  	$("body").css({ background : "url(assets/img/bg.jpg)", "background-size" : "cover"});

   	  	}

   }



   var listeners = function(){

   	   $("*[data-action]").on("click", command);

   }


   var command = function(e){

   	    e.stopPropagation();
   	    e.preventDefault();

   	    var command = $(this).attr("data-action");

   	     switch(command){

   	     	 case 'click':

   	     	   var target = $(this).attr("data-target");

   	     	   $(target).click();


   	     	 break;

   	     }

   }



})(jQuery);


 



 $("#meuxic").meuxic();	


