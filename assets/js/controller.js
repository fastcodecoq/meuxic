




 function actions_controller(act, cmd){

 	

     switch(cmd){



      case "show":


         var el = $( act.attr("data-show") );

         if( el.hasClass("hide") )
             el.removeClass("hide");
         else
         	el.addClass("hide");


      break;


      case "close":

          $(act.attr("data-element")).remove();

      break;



     }





 }


 function aListener(e){

 	e.preventDefault();
 	e.stopPropagation();
      
    var act = $(this);
    var cmd = act.attr("data-action");


    actions_controller(act, cmd);

 }


 function ini_actions(){


     $("*[data-action]").on("click", aListener);


 }






function radio_highlighter(){

  $("#preguntas input[type='radio']").live( "change" , function(){

            var name =  $(this).attr("name");  


     $("input[name='" + name + "']").each(function(){

     		var radio = $(this);

            console.log(this);

	  		 if(radio.attr("checked") === "checked"){
	  		 	 radio.parents("label:first").addClass("active");
	  		 	 radio.parents("li:first").find(".number:first").addClass("ok");
	  		 	}
	  		 else
	  		 	 radio.parents("label:first").removeClass("active");

     });

	  		 


	  });

}


function chkCheckeds(){

   $("input:checked").each(function(){

      $(this).parents("li:first").find(".number:first").addClass("ok");

   });

}




function ini_controller(){

	 ini_actions();
	 radio_highlighter();
   chkCheckeds();

}








$(ini_controller);