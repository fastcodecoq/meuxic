(function(){

  var _this;
  var data = {

  	  bar_text : ".percent",
  	  load_bar : "#upload_bar",
  	  allowed_files_ext : new Array("mp3", "ogg"),
  	  upload_url : "/assets/includes/api.upload.php", 
  	  progress_action : function(percent){
    	


          if( percent > 5 ){
          
          data.load_bar.css({

         width : percent + "%"

          }).find(data.bar_text).text(percent + "%");
           

          }

          if(percent == 100){

          	 data.load_bar.fadeOut( function(){

          	  	$(this).css({width:"0px"}).removeClass("bordered");
     

          	  }); 

          	data.load_bar.removeClass("loading");   
          	      	  

          	 }

          console.log(  percent );
       

     },
     upload_success : function(r){
															

				console.log(r);

				if(r.success)
					if(r.success == 0 )
						alert(r.rs.msg);
					

					
				},

	upload_error : function(error){

			console.log(error);
			alert(error.responseText);

	},

	drag_drop : function  ( ) {

	var holder = document.querySelector("form[name='uploader']");

	holder.ondragover = function () { 
		
		this.className = 'span5 hover';

		$(holder).find("span.msg").html("Drop Files <b><em>HERE</em></b>");

		return false;
	};

	holder.ondragend = function () {
		this.className = 'span5';
		$(holder).find("span.ms").html("Drag files  <b><em>HERE</em></b>");
		return false;
	};

	holder.ondragleave = function () {
		this.className = 'span5';
		$(holder).find("span.msg").html("Drag files <b><em>HERE</em></b>");

		return false;
	};	


	holder.ondrop = function (e) {
		e.preventDefault();
		this.className = 'span5';
		console.log(e);
		holder.find("span.msg").html("Drag files <b><em>HERE</em></b>");		 
		procFiles(e.dataTransfer.files);
	};

}

  };


  var drag_drop ;



 $.fn.upload = function(vars){

       if(vars instanceof Object)
     	  $.extend(data, vars );

	  _this = $(this);
	  data.load_bar = $(data.load_bar);
      drag_drop();
      upController();   


      console.log("Upload iniciado");


 }



    
 var drag_drop  = function (){

 var body = document.querySelector("body");
 var dropbox = document.querySelector("#dropbox");

    body.ondragover = function(){


    	$(dropbox).fadeIn();
    	$(dropbox).addClass("dragdrop");

    	return false;

    }

    body.ondrop = function(e){

    		e.preventDefault();
    		return false;

    }

   dropbox.ondrop = function(e){

   	    e.preventDefault();
   		procFiles(e.dataTransfer.files);
   		$(dropbox).removeClass("dragdrop").fadeOut();

   		return false;

   }


    dropbox.ondragover = function(e){

   		$(dropbox).fadeIn();
   		$(dropbox).addClass("dragdrop");

    	return false;

   }


   dropbox.ondragleave = function(){

   		$(dropbox).hide();
   		$(dropbox).removeClass("dragdrop");
   		return false;

   }







 }

  

  var upController = function (){

    _this.find("input[type='file']:first").live('change', function(){
				
		var files = this.files;				
		procFiles(files);


	   });

    }


   var procFiles = function (files){

     if(files.length == 0)
			return;

		var reader, file, files,filesData,files_ = new Array();
		var exts = data.allowed_files_ext;			


			if(window.FormData){
			
				filesData = new FormData();
			
			}
    
     for(i=0; i<files.length;i++){

     	var ext = files[i].name.toString().split(".");     	    
     	    ext = ext[ ext.length - 1 ];
     	    ext = ext.toLowerCase();
     	    _exts = data.allowed_files_ext.join(" ");

     	    console.log(ext);

     	    if(! inArray(ext,exts) )
     	    	if(files.length > 1)
     	    	 {

     	    	  	var preg = confirm("Solo puedes cargar archivos con las extensiones " + _exts + ", Deseas omitir este archivo y continuar con la carga?");

     	    	  	if(!preg)
     	    	  		return;

     	    	 }
     	    	else{
     	    	 
     	    	 alert("Solo puedes cargar archivos con las extensiones " + _exts);
     	    	 return;

     	    	}
     	    else
     	         filesData.append(i,files[i]);    	       

	   
	   }
	  	

	    console.log(filesData)
			
	    sendFiles(filesData);

 }

   var sendFiles =  function  ( files ){

   var min = 10;   
   
   data.load_bar.addClass("bordered");
   data.load_bar.show();

  

 	$.ajax({
				url : data.upload_url,
				type : 'POST',
				data : files,
				dataType : false,
				processData : false, 
				contentType : false,
				statusCode : {

			   "404" : function(){ alert("pagina no encontrada"); }

		        },
				xhr: function(){

     var xhr = new window.XMLHttpRequest();

     xhr.upload.addEventListener("progress", function(evt){
            
                 if (evt.lengthComputable) {

          var percentComplete = evt.loaded / evt.total;
          var percent = parseFloat(Math.round( (percentComplete*100)));
           data.progress_action(percent);

             }
  
      }, false);
     
     xhr.addEventListener("progress", function(evt){
       if (evt.lengthComputable) {
        var percentComplete = evt.loaded / evt.total;         
         

         console.log(percentComplete);

     }

     }, false);

          return xhr;
      
      },

	success : data.upload_success,

	error :  data.upload_error


			});


 }




})(jQuery);