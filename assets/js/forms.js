
(function($){


   var form = $(this);

   var vars = {

       live : true 
   };

   var patterns = [         
          {name : "text" , pattern : "^\\w" , error_msg: "%field% no es un texto válido"},          
          {name :"only-text" , pattern : "^[a-zA-Z'\",\.\\s+]{3,}$" , error_msg: "%field% no es un texto valido"},
          {name : "email" , pattern: "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]{2,3})(\.[a-z]{2}\s)?$" , error_msg : "%field% no es un email valido"},
          {name : "password" , pattern : "^[\\w]{6,}" , error_msg: "%field% no es un texto válido"},
          {name : "tel" , pattern :"^[(]?[2-9]{1}[0-9]{2}[)]?[-|.| ]?[0-9 ]{3}[-|.| ]?[0-9 ]{4}$", error_msg: "%field% no es un correo valido" },
          {name : "address" , pattern : "^([a-zA-Z0-9])[a-zA-Z0-9 ,-/#]*$", error_msg: "%field% no es una dirección valida"},
          {name : "credit-card" , pattern : "^((67\d{2})|(4\d{3})|(5[1-5]\d{2})|(6011))(-?\s?\d{4}){3}|(3[4,7])\ d{2}-?\s?\d{6}-?\s?\d{5}$" , error_msg: "%field% no es una tarjeta de credito válida"},
          {name : "postal" , pattern : "^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$" , error_msg: "%field% no es un código postal válido"},
          {name: "date" , pattern : "#^(((0?[1-9]|1d|2[0-8]){[/-.]}(0?[1-9]|1[012])|(29|30){[/-.]}(0?[13456789]|1[012])|31{[/-.]}(0?[13578]|1[02])){[/-.]}(19|[2-9]d)d{2}|29{[/-.]}0?2{[/-.]}((19|[2-9]d)(0[48]|[2468][048]|[13579][26])|(([2468][048]|[3579][26])00)))$#", error_msg: "%field% no es una fecha válida"}
       ]; 


   $.fn.forms = function(varss, callback){
      
      if(varss instanceof Function && !callback)
          var callback = varss;
      else if(varss instanceof Object){
         
         $.extend(vars, varss); 

         if(vars.patterns){

           $.extend(patterns, vars.patterns);

          } 

         }


       if(vars.live)
         live_validate();

      
      controller(this,callback);
      return this;          
            

   }






   this.controller = function ( form , callback){


    form.live("submit", function(e){

        submit(e, callback);


    });    


    form.find("input:not(input[type=\"submit\"], input[type=\"password\"], input[type=\"button\"]), textarea").focusout(function(){

        $(this).val( trim($(this).val()) );
         
                     var field = $(this);
                     var pat = new RegExp(get_pattern(field.attr("data-type")).pattern,"i");  
                     

                     if(field.attr("data-require") instanceof String)
                      if(field.attr("data-require") == "no" && strlen(field.val()) == 0)
                         field.removeClass("input-error");

                     if( !pat.test(field.val()) ) 
                     {

                        field.addClass("input-error");                        

                     }else
                      field.removeClass("input-error");
         


    });


    this.submit = function(e, callback){

        e.preventDefault();
        e.stopPropagation();

        if(!test_form())
          callback(false);
        else
          callback(form);


        return false;


    }

   
   

    this.test_form = function (){


          var cond = new Array();

           form.find("input:not(input[type=\"submit\"], input[type=\"button\"], input[type=\"password\"], input[name=\"fotos\"]), textarea").each(function(){

                     var field = $(this);
                                        
                     if(field.attr("data-require"))                    
                       if(field.attr("data-require") === "no" && strlen(field.val()) === 0)
                          { 
                            alert("hey")
                            field.removeClass("input-error");
                            return true; 
                            return;          

                          }

                          console.log($(this));

                    if(field.attr("data-type"))
                    var regE = get_pattern(field.attr("data-type"));
                    else
                    var regE = get_pattern("text");

                       console.log(regE)

                     if(!regE)                                      
                      cond.push("false");
                    else
                      regE = regE.pattern;

                     var pat = new RegExp(regE,"i");  
                                     
              
                     if( !pat.test( field.val()) ) 
                     {

                        field.addClass("input-error");
                        cond.push("false");

                     }else 
                      field.removeClass("input-error");

                     

                  });

 console.log(cond)

  if($.inArray("false", cond) != -1)
    return false;
  else
    return true;

}

  

}


this.chk_input = function (){


                     var field = $(this);                                      

                     if(field.attr("data-type"))
                    var regE = get_pattern(field.attr("data-type"));
                    else
                    var regE = get_pattern("text");

                     console.log(regE)

                     if(regE)
                      regE = regE.pattern;
                    else
                      return false;

                     var pat = new RegExp(regE,"i");  
                     

                     if(field.attr("data-require"))
                      if(field.attr("data-require") == "no" && field.val().split("").length == 0){
                         field.removeClass("input-error");
                         return true;
                       }

                     if( !pat.test(field.val()) ) 
                     {

                        field.addClass("input-error");                        

                     }else
                      field.removeClass("input-error");
         
                      

}


this.live_validate = function (){


   $("form[data-live-validate] input").keyup(chk_input);


}


this.get_pattern = function (type){

   
    for(x in patterns)
       if(type === patterns[x].name) 
          return patterns[x]


}



}(jQuery));










// ----------------------------- forms api 



 // patterns util --------------------------

