<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, PUT");

	$Data = array(
		'username' => $_POST['username'],
		'Time' => $_POST['time']	
	);
	$file = fopen($Data['username'].".json", "w+");
	$result = json_decode(file_get_contents($Data['username'].".json"), true);

	//if($Data['Time'] - $result['Time'] > )
	$result = $Data;

	$json = json_encode($result);
	fwrite($file, $json);
	fclose($file);
?>