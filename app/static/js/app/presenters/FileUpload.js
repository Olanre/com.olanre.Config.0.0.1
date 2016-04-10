define(["dojo/promise/all", "dojo/_base/declare", "../models/apiModel", "dojo/Deferred",  "dojo/Evented" ], function (all, declare, model, Deferred, Evented) {

	var FileParser = declare([],
			constructor: function(file, delimiter){
				var d = new Deferred(function(reason){
				      debugger
				      console.log("Cancelled deferred with the reason" + reason)
	            });
		    	this.file = file;
		    	// Check for the various File API support.
		    	if (window.File && window.FileReader && window.FileList && window.Blob) {
		    		if (file) {
		    		      var r = new FileReader();
		    		      r.onload = function(e) { 
		    			      var contents = e.target.result;
		    		         console.log( "Got the file.n" 
		    		              +"name: " + f.name + "n"
		    		              +"type: " + f.type + "n"
		    		              +"size: " + f.size + " bytesn"
		    		              + "starts with: " + contents.substr(1, contents.indexOf("n"))
		    		        );
		    		         var arr = CSVToArray(contents, delimiter);
		    		         deferred.resolve(arr);
		    		      }
		    		      r.readAsText(file);
		    		}
		    	} else {
		    	  
		    	  console.log('The File APIs are not fully supported by your browser.')
		    	  deferred.cancel('The File APIs are not fully supported by your browser.');
		    	}
		    	return deferred.promise;
	    	},
	    	
	    	// ref: http://stackoverflow.com/a/1293163/2343
	        // This will parse a delimited string into an array of
	        // arrays. The default delimiter is the comma, but this
	        // can be overriden in the second argument.
	        CSVToArray: function( strData, strDelimiter ){
	            // Check to see if the delimiter is defined. If not,
	            // then default to comma.
	            strDelimiter = (strDelimiter || ",");

	            // Create a regular expression to parse the CSV values.
	            var objPattern = new RegExp(
	                (
	                    // Delimiters.
	                    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

	                    // Quoted fields.
	                    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

	                    // Standard fields.
	                    "([^\"\\" + strDelimiter + "\\r\\n]*))"
	                ),
	                "gi"
	                );


	            // Create an array to hold our data. Give the array
	            // a default empty first row.
	            var arrData = [[]];

	            // Create an array to hold our individual pattern
	            // matching groups.
	            var arrMatches = null;


	            // Keep looping over the regular expression matches
	            // until we can no longer find a match.
	            while (arrMatches = objPattern.exec( strData )){

	                // Get the delimiter that was found.
	                var strMatchedDelimiter = arrMatches[ 1 ];

	                // Check to see if the given delimiter has a length
	                // (is not the start of string) and if it matches
	                // field delimiter. If id does not, then we know
	                // that this delimiter is a row delimiter.
	                if (
	                    strMatchedDelimiter.length &&
	                    strMatchedDelimiter !== strDelimiter
	                    ){

	                    // Since we have reached a new row of data,
	                    // add an empty row to our data array.
	                    arrData.push( [] );

	                }

	                var strMatchedValue;

	                // Now that we have our delimiter out of the way,
	                // let's check to see which kind of value we
	                // captured (quoted or unquoted).
	                if (arrMatches[ 2 ]){

	                    // We found a quoted value. When we capture
	                    // this value, unescape any double quotes.
	                    strMatchedValue = arrMatches[ 2 ].replace(
	                        new RegExp( "\"\"", "g" ),
	                        "\""
	                        );

	                } else {

	                    // We found a non-quoted value.
	                    strMatchedValue = arrMatches[ 3 ];

	                }


	                // Now that we have our value string, let's add
	                // it to the data array.
	                arrData[ arrData.length - 1 ].push( strMatchedValue );
	            }

	            // Return the parsed data.
	            return( arrData );
	        }
	});
	return FileParser;
});