

function string2location (s) {
	
	/*
	 This function converts a string representing a geo location into an
	 object representing a geo location.
	  
	 The returned object looks like this:
	  
	 {"latitude":
		{"sign":1,
		 "degree":2,
		 "minutes":3,
		 "seconds":4.5},
	  "longitude":
		{"sign":-1,
		 "degree":6,
		 "minutes":7,
		 "seconds":8.9}
	 }
	  
	 While "sign" is 1 for North or East and -1 for South or West.
	 
	 It should be easy to create a string needed out of this object.
	 
	 This function can be found at https://github.com/DeusFigendi/usefull_snippets
	*/
	
	var latitude = new Object();
	latitude.sign = 1;
	latitude.degree = 0;
	latitude.minutes = 0;
	latitude.seconds = 0;
	
	var longitude = new Object();
	longitude.sign = 1;
	longitude.degree = 0;
	longitude.minutes = 0;
	longitude.seconds = 0;

	if (s.search(/^(N|S|n|s)?\s*(\d+)°\s*(\d+)[′'`]\s*(\d+([\.\,]\d+)?)["″]\s*(W|O|E|w|o|e)?\s*(\d+)°\s*(\d+)[′'`]\s*(\d+([\.\,]\d+)?)["″]$/) >= 0) {
		var RegExp_Result = s.match(/^(N|S)?\s*(\d+)°\s*(\d+)[′'`]\s*(\d+([\.\,]\d+)?)["″]\s*(W|O|E)?\s*(\d+)°\s*(\d+)[′'`]\s*(\d+([\.\,]\d+)?)["″]$/);
		latitude.degree = parseInt(RegExp_Result[2]);
		latitude.minutes = parseInt(RegExp_Result[3]);
		latitude.seconds = parseFloat(RegExp_Result[4].replace(/,/,'.'));
		if(RegExp_Result[1].toUpperCase == 'S') {
			latitude.sign = -1;
		}
		
		
		longitude.degree = parseInt(RegExp_Result[7]);
		longitude.minutes = parseInt(RegExp_Result[8]);
		longitude.seconds = parseFloat(RegExp_Result[9].replace(/,/,'.'));
		if(RegExp_Result[6].toUpperCase == 'W') {
			longitude.sign = -1;
		}
		
		
	} else if (s.search(/^\d+\:\d+\:\d+(\.\d+)?\s*(N|S)\s*\,?\s*\d+\:\d+\:\d+(\.\d+)?\s*(W|w|E|e|O|o)\s*$/) >= 0) {
		var RegExp_Result = s.match(/^(\d+)\:(\d+)\:(\d+(\.\d+)?)\s*(N|S)\s*\,?\s*(\d+)\:(\d+)\:(\d+(\.\d+)?)\s*(W|w|E|e|O|o)\s*$/);
		
		latitude.degree = parseInt(RegExp_Result[1]);
		latitude.minutes = parseInt(RegExp_Result[2]);
		latitude.seconds = parseFloat(RegExp_Result[3].replace(/,/,'.'));
		if(RegExp_Result[5].toUpperCase == 'S') {
			latitude.sign = -1;
		}
		
		
		longitude.degree = parseInt(RegExp_Result[6]);
		longitude.minutes = parseInt(RegExp_Result[7]);
		longitude.seconds = parseFloat(RegExp_Result[8].replace(/,/,'.'));
		if(RegExp_Result[10].toUpperCase == 'W') {
			longitude.sign = -1;
		}
	
	} else if (s.search(/^(\d+)[°d]\s*(\d+)[′'`]\s*(\d+([\.\,]\d+)?)["″]\s*(N|S|n|s)\,?\s*(\d+)[d°]\s*(\d+)[′'`]\s*(\d+([\.\,]\d+)?)["″]\s*(W|w|E|e|O|o)$/) >= 0) {
		var RegExp_Result = s.match(/^(\d+)[d°]\s*(\d+)[′'`]\s*(\d+([\.\,]\d+)?)["″]\s*(N|S|n|s)\,?\s*(\d+)[d°]\s*(\d+)[′'`]\s*(\d+([\.\,]\d+)?)["″]\s*(W|w|E|e|O|o)$/);
		
		latitude.degree = parseInt(RegExp_Result[1]);
		latitude.minutes = parseInt(RegExp_Result[2]);
		latitude.seconds = parseFloat(RegExp_Result[3].replace(/,/,'.'));
		if(RegExp_Result[5].toUpperCase == 'S') {
			latitude.sign = -1;
		}
		
		
		longitude.degree = parseInt(RegExp_Result[6]);
		longitude.minutes = parseInt(RegExp_Result[7]);
		longitude.seconds = parseFloat(RegExp_Result[8].replace(/,/,'.'));
		if(RegExp_Result[10].toUpperCase == 'W') {
			longitude.sign = -1;
		}
	
	} else if (s.search(/^(\-)?(\d+)[°d]\s*(\d+([\.\,]\d+)?)[′'`]?\s*\,?\s*(\-)?(\d+)[°d]\s*(\d+([\.\,]\d+)?)[′'`]?$/) >= 0) {
		var RegExp_Result = s.match(/^(\-)?(\d+)[°d]\s*(\d+([\.\,]\d+)?)[′'`]?\s*\,?\s*(\-)?(\d+)[°d]\s*(\d+([\.\,]\d+)?)[′'`]?$/);
		
		latitude.degree = parseInt(RegExp_Result[2]);
		latitude.minutes = parseInt(RegExp_Result[3]);
		latitude.seconds = parseFloat('0'+RegExp_Result[4].replace(/,/,'.'))*60;
		if(RegExp_Result[1] == '-') {
			latitude.sign = -1;
		}
		
		
		longitude.degree = parseInt(RegExp_Result[6]);
		longitude.minutes = parseInt(RegExp_Result[7]);
		longitude.seconds = parseFloat('0'+RegExp_Result[8].replace(/,/,'.'))*60;
		if(RegExp_Result[5] == '-') {
			longitude.sign = -1;
		}
		
			
	}	 else if (s.search(/^(\-)?(\d+([\.\,]\d+)?)[°d]?\s*(N|S|n|s)?\s*\,?\s*(\-)?(\d+([\.\,]\d+)?)[°d]?\s*(E|W|O|o|e|w)?$/) >= 0) {
		var RegExp_Result = s.match(/^(\-)?(\d+([\.\,]\d+)?)[°d]?\s*(N|S|n|s)?\s*\,?\s*(\-)?(\d+([\.\,]\d+)?)[°d]?\s*(E|W|O|o|e|w)?$/);
		
		/*
		for (var i in RegExp_Result) {
			console.log(i+': '+RegExp_Result[i]);
		}
		*/
		
		latitude.degree = parseInt(RegExp_Result[2]);
		
		var TEMP_minutes = parseFloat('0'+RegExp_Result[3].replace(/,/,'.'))*60;
		var TEMP_seconds = (TEMP_minutes - parseInt(TEMP_minutes))*60;
				
		latitude.minutes = parseInt(TEMP_minutes);
		latitude.seconds = TEMP_seconds;
		if(RegExp_Result[1] == '-' || RegExp_Result[4].toUpperCase == 'S') {
			latitude.sign = -1;
		}
		
		
		longitude.degree = parseInt(RegExp_Result[6]);
		
		TEMP_minutes = parseFloat('0'+RegExp_Result[7].replace(/,/,'.'))*60;
		TEMP_seconds = (TEMP_minutes - parseInt(TEMP_minutes))*60;
		
		longitude.minutes = parseInt(TEMP_minutes);
		longitude.seconds = TEMP_seconds;
		if(RegExp_Result[5] == '-'  || RegExp_Result[8].toUpperCase == 'W') {
			longitude.sign = -1;
		}
		
			
	}	
	
	
	var return_object = new Object();
	return_object.latitude = latitude;
	return_object.longitude = longitude;
	
	return(return_object);

}
