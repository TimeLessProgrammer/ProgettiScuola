<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, PUT");

	$result = json_decode(file_get_contents("Utenti.json"), true);
	$file = fopen("Utenti.json", "w");
	$trovato = false;
	//$i = 0;

	$Data = array(
		'UserColor' => $_POST['UserColor'],
		'username' => $_POST['username'],
		'Avatar' => $_POST['Avatar']
	);
	foreach($result as $key){
		if(strcmp($key["username"], $Data['username']) == 0){
			$trovato = true;
		}
	}
	$index = COUNT($result);
	if(!$trovato){
		$result[$index] = $Data;
	}
	else{
		echo("L'utente è già presente!");
	}
	$json = json_encode($result);
	fwrite($file, $json);
	fclose($file);
?>