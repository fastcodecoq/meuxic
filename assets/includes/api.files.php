<?php


class files{
  
   private $errors;
   private $con;
   private $db;
   private $grid;

   public function __construct(){


   		$this->con = new MongoClient();
   		$this->db = $this->con->selectDB("meuxic");
      $this->grid = $this->db->getGridFS();
   	



   }




  public function save(){



try{


foreach ($_FILES as $file) {
	
 
 $name = md5( time() . $file["name"]);   
 $uid = md5("gomosoft");
 $id3 =  "adas";  //get_meta_tags($file["tmp_name"]);

 $info = array( "ID3" => $id3 , "name" => $name,  "privacy" => "public", "plays" => 0 , "downloads" => 0);

 $id = $this->grid->storeFile( $file["tmp_name"], $info);


  }
  

  } catch (Exception $e){


  		echo "Hubo un error";
  		var_dump($e);
    

  }



   }



   public function del( $file_id ){

        try{

          if(is_array($file_id)){

              foreach ($file_id as $fid) {
                  
                  if(!$this->del_one($fid))
                    throw new Exception("Error Eliminando archivo {$fid}", 72);
                    

              }else
                if( !$this->del_one($file_id) )  throw new Exception("Error Eliminando archivo {$file_id}", 76);


          }


        }catch(Exception $e){

            return false;

        }


   }


   private function del_one($fid){

                  try{

                  $id = new MongoId($fid);
                  $this->grid->drop(array("_id" => $id));
                  return true;

                   }catch(Exception $e){

                     return false;

                   }

   }



   public function get_all(){

   
     try{

   		 $rs = iterator_to_array($this->grid->find());


   		 return $rs;
      
       }catch (Exception $e){

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
         echo fread($stream, 4096);
      }
  
     }catch (Exception $e){

          return false;

     }


   }

 }





if(isset($_FILES))
{

   $files = new files;
   $files->save();

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
            else
              echo "no";


        break;
    	
    	default:
    		# code...
    		break;
    }



}


