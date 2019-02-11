function getJsonReady(){
	var jsons = null;
	$.getJSON('readjson.php', function(data){
		jsons = data;
	});
	return jsons;
}