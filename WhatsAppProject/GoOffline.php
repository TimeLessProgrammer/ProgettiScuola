<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, PUT");

	$result = json_decode(file_get_contents("Utenti.json"), true);
	$file = fopen("Utenti.json", "w+");
	$Username = $_POST['username'];
	
	foreach($result as $key=>$val){
		if(strcmp($val["username"], $Username) == 0){
			unset($result[$key]);
		}
	}
	$json = json_encode($result);
	fwrite($file, $json);
	fclose($file);
?>