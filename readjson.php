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
		$jsons = $jsons . $json . ',';
	}
	$jsons = substr($jsons, 0, -1) . ']';
	return $jsons;
}

$files = readJSONList('./jsondata/');
$jsons = readJSONFile($files, './jsondata/');
echo $jsons;
?>