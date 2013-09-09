<?php


class files{
  
   private $errors;
   private $con;
   private $db;
   private $grid;
   private $size_limit;

   public function __construct( $file = NULL , $size_limit = 10000000){


   		$this->con = new MongoClient();
   		$this->db = $this->con->selectDB("meuxic");
      $this->grid = $this->db->getGridFS();
      $this->errors = array();

      if($file != NULL)
         $this->save($file);
   

   }




  public function save( $files = NULL ){ // Array de files separados (no como el convencional multiple)
   
     try{

        if($files === NULL)
           throw new Exception("No has pasado archivos para guardar", 28);
           
         $ids = array();

         foreach ($files as $file) {
                
                 if(!$id = $this->save_one($file))
                    throw new Exception("Error subiendo archivo", 39);
                 else
                   $ids[] = $id;

            }

    return $ids;

  }catch(Exception $e){


      $this->errors[] = var_dump($e);    
     return false;


  }
 


  }






  public function save_one( $file ){

  try{


if(!preg_match("/audio/", $file["type"]))
   throw new Exception("Error el tipo de archivo {$file["type"]} no es válido ", 71);

if(!is_numeric($file["size"]))
   throw new Exception("Error el tipo de archivo {$file["size"]} no es válido ", 74);

if(!is_numeric(str_replace(".","",$_SERVER["REMOTE_ADDR"])))
   throw new Exception("Tu ip es {$_SERVER["REMOTE_ADDR"]} ?", 76);


 if(! $this->calculate_size($file["tmp_name"]) > $this->size_limit  )
   throw new Exception("El tamaño del archivo supera el límite permitido (8MB)", 82);
    


 $file["name"] = addslashes((strip_tags($file["name"])));
 $file["type"] = addslashes((strip_tags($file["name"])));


 
 $name = md5( time() . $file["name"]);   
 $uid = md5("gomosoft");
 $id3 = (function_exists("get_meta_tags")) ?  get_meta_tags($file["tmp_name"]) :  array();

 $info = array( "ID3" => $id3 , "name" => $name,  "privacy" => "public", "plays" => 0 , "downloads" => 0, "date" => new MongoDate());

 $id = $this->grid->storeFile( $file["tmp_name"], $info);

 return $id;


  } catch (Exception $e){

      $this->errors[] = var_dump($e);
      return false;
    

    }

  }



   public function del( $file_id ){

        try{

          if(is_array($file_id)){

              foreach ($file_id as $fid) {
                  
                  if(!$this->del_one($fid))
                    throw new Exception("Error Eliminando archivo {$fid}", 104);
                    

              }

              return true;

              }else 
               if( !$this->del_one($file_id) )  throw new Exception("Error Eliminando archivo {$file_id}", 111);          


        }catch(Exception $e){

            $this->errors[] = $e;
            return false; 

        }


   }


   private function del_one($fid){

                  try{

                  $id = new MongoId($fid);
                  $this->grid->drop(array("_id" => $id));
                  return true;

                   }catch(Exception $e){

                     $this->errors[] = $e;
                     return false;

                   }

   }



   public function get_all(){

   
     try{

   		 $rs = iterator_to_array($this->grid->find());


   		 return $rs;
      
       }catch (Exception $e){

           $this->errors[] = $e;
           return false;

       }

   }



  public function stream($file_id){

   try{

       $id = new MongoId($file_id);
       $file = $this->grid->findOne(array("_id" => $id));

      header('Content-type: audio/mp3;');
      $stream = $file->getResource();        

     while (!feof($stream)) {
         echo fread($stream, 26);
      }
  
     }catch (Exception $e){

          $this->errors[] = $e;
          return false;

     }


   }

  public function error(){

     return $this->errors;

  }


  private function calculate_size($file){

       $file = base64_encode($file);
       return strlen($file);

  }


 }





if($_FILES)
{
  
  header("Content-type: application/json ; charset = utf-8");

  $files = new files;
  
  if(!$ids = $files->save($_FILES)){
      
     
      
      echo json_encode(array("code" => "500", "errors" => $files->error()));
      

    }else
      echo json_encode(array("code" => "200", "files" => $ids));


}


if($_GET){

  
    $cmd = $_GET["q"];
    $files = new files;


    switch ($cmd)
     {

    	case 'get_all':
    		
        header("Content-type: application/json ; charset = utf-8");
    		echo json_encode($files->get_all());

    		break;


       	case 'stream':
    		
  
    		echo json_encode($files->stream($_GET["id"]));

    		break;


        case 'del':

            if($files->del($_GET["id"]))
               echo "ok";
            else{
               
        header("Content-type: application/json ; charset = utf-8");
                          
        echo json_encode(array("code" => "500", "errors" => $files->error()));
               
               }


        break;
    	
    	default:
    		# code...
    		break;
    }



}


