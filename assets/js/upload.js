(function(){

  var _this;
  var data = {

  	  bar_text : ".percent",
  	  load_bar : "#upload_bar",
  	  allowed_files_ext : new Array("mp3", "ogg"),
  	  upload_url : "assets/includes/api.upload.php"

  }



 $.fn.upload = function(vars){

       if(vars instanceof Object)
     	  $.extend(data, vars);

	  _this = $(this);
      drag_drop();
      upController();   

      console.log("Upload iniciado");


 }



    
    var drag_drop = function  ( ) {

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
		uploader.procFiles(e.dataTransfer.files);
	};

}

  var upController = function (){

    _this.find("input[type='file']:first").live('change', function(){
				
		files = this.files;		
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

   var sendFiles =  function  ( data ){

   var min = 10;   
   
   var load_bar = $(data.load_bar)
   load_bar.fadeIn();
   $("thumbs").addClass("loading");


 	$.ajax({
				url : data.upload_url,
				type : 'POST',
				data : data,
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

          if( percent > min ){
          
          load_bar.css({

          		width : percent + "%"

          }).find(data.bar_text).text(percent + "%");
           

          }

          if(percent == 100){

          	  load_bar.fadeOut( function(){

          	  	$(this).css({width:"5%"}).find(data.bar_text).text("5%")

          	  });

          	  load_bar.removeClass("loading");   
          	      	  

          	 }

          console.log(  percent );
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

	success : function(r){
															

				console.log(r);

				if(r.success)
					if(r.success == 0 )
						alert(r.rs.msg);

					
				},

	error : function(error){

			console.log(error);
			alert(error.responseText);

	}
			});

 }




})(jQuery);