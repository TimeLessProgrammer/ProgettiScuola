<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, PUT");

	$result = json_decode(file_get_contents("Utenti.json"), true);
	$file = fopen("Utenti.json", "w+");
	$trovato = false;
	//$i = 0;

	$Data = array(
		'username' => $_POST['Username'],
		'password' => $_POST['Password']	
	);
	foreach($result as $key){
		if(strcmp($key["UID"], $Data['username']) == 0 && strcmp($key["PWD"], $Data['password']) == 0){
			$key["status"] = true;
			$CurrentUser = $key;
			$trovato = true;
		}
	}
	echo ($trovato);
	$json = json_encode($result);
	fwrite($file, $json);
	fclose($file);
?>