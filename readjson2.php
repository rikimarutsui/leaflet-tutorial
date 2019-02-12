<?php
function readJSONList($path = './'){
	$files = scandir($path);
	for($i = 0; $i < sizeof($files); $i++){
		$file = $files[$i];
		if(strpos($file, '.json') !== false){

		}else{
			unset($files[$i]);
		}
	}
	return $files;
}

function readJSONFile($files, $path = './'){
	$jsons = '[';
	foreach($files as $file){
		$json = file_get_contents($path . $file);
		$json_s = json_decode($json);
		$json = json_encode(array(
			'time' => $json_s->time,
			'Lat' => $json_s->df17->Lat,
			'Lng' => $json_s->df17->Lon,
			'windSpd' => $json_s->windSpd_kt,
			'windDir' => $json_s->windDir_deg,
			'geometric_height' => $json_s->df17->geometric_height,
			'createdAt' => $json_s->createdAt
		));
		$jsons = $jsons . $json . ',';
	}
	$jsons = substr($jsons, 0, -1) . ']';
	return $jsons;
}

$files = readJSONList('./jsondata/');
$jsons = readJSONFile($files, './jsondata/');
echo $jsons;
?>