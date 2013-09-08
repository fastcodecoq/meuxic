
  <?php

   /*

    void graph()  
  
    @params
    
    String title
    String type
    String site_name
    String site_description
    String img
    Array more_og (default NULL) (acá puedes pasar un array con las og adicionales que deseas agregar al og)
    

   
    
    Copyrights @gomosoft 2013


    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


*/

  //$more_og es un array con las metas adicionales que quieras agregar a tu page, si no pasas una 

  function graph($title = "Test", $site_name = "Test", $site_description = "Test", $img = NULL, $type="website", $more_og = NULL){
 
 
         $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
 
          if($img === NULL)
            $img = "assets/img/golf.jpg"; //esta la pueden cambiar por su imagen por defecto
 
         $graph = array();
         $graph[] = "<meta property=\"og:title\" content=\"{$title}\" />";
         $graph[] = "<meta property=\"og:type\" content=\"{$type}\" />";
         $graph[] = "<meta property=\"og:url\" content=\"{$url}\" />";
         $graph[] = "<meta property=\"og:site_name\" content=\"{$site_name}\" />";
         $graph[] = "<meta property=\"og:description\" content=\"{$site_description}\" />";
         $graph[] = "<meta property=\"og:image\" content=\"{$url}{$img}\" />";
 
         $size = getimagesize( dirname("__FILE__") . "/". $img);         
 
         $graph["image_width"] = "<meta property=\"og:image:width\" content=\"{$size[0]}\" />";
         $graph["image_height"] = "<meta property=\"og:image:height\" content=\"{$size[1]}\" />"; 
 
         if(is_array($more_og))
          $graph = array_merge($graph , $more_og);       
 
         echo implode("\n",$graph);
 
    }