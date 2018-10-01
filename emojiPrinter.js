
function setWidth(value) {
	// TODO: Control value to be a integer and show an error.
	// TODO: Set width as a radio button: Large, Normal, Small sizes
	if (Number.isInteger(value) && value > 0 && value < 1000) {
		scope.width = value;
		scope.resizeImage();
	}
}

function parseImage() {

	var imageData = scope.context.getImageData(0, 0, scope.image.width, scope.image.height);
	console.log(imageData);
	var r, g, b;
	var finalString ="";
	for(var i = 0; i < imageData.data.length; i += 4) {
		if ((i/4) % scope.width === 0) {
			finalString += "\n";
		}
		r = imageData.data[i];     // RED
  		g = imageData.data[i + 1]; // GREEN
		b = imageData.data[i + 2]; // BLUE
		// ALPHA would be i + 3  but we are not using it
		finalString += scope.getClosestEmoji(r, g, b);
	}
	// TODO: Show the image in a proper HTML container 
	console.clear();
	console.log(finalString);
}

(function() {
	scope = {};
	scope.width = 100;
	scope.resizeImage = resizeImage;
	scope.getClosestEmoji = getClosestEmoji;
    var EMOTE_DICTIONARY = {
		"🌸":{ r:242,g: 132,b: 177},
		"🐷":{ r:244, g:171, b:186},
		"🍅":{ r: 221, g:46, b:68 },
		"🍊":{ r:244, g:144, b:12 },
        "🏀":{ r:234,g: 84,b: 14},
		"🍪":{ r:240,g: 173,b: 4},
		"🍑":{ r: 240, g:136, b:74},
		"🤲🏻": {r: 247, g:215, b: 196},
		"🍋":{ r: 255, g:204, b:77},
		"🍈":{ r:181,g: 215,b: 68},
        "🐸":{ r:141,g: 187,b: 26},
		"🍐":{ r: 166, g:211, b:136},
        "🌳":{ r:16, g:134, b:15},
		"💦":{ r:93, g:173, b:236},
		"💎":{ r: 181, g: 216, b:243},
        "🐋":{ r:52, g:211,b: 248},
		"🆒":{ r: 0, g: 90, b: 215},
		"🅿️":{ r:20, g: 70, b: 200},
		"🌌":{r: 59, g:77, b:141},
		"🍇":{ r:146, g:102, b:204},
		"🔮":{ r:170,g: 151, b:247},
        "📻":{ r:209,g: 209,b: 209},
        "🌑":{ r:94, g:94, b:94},
        "🍞":{ r:249,g: 197, b:82},
        "💭":{ r:255,g: 255,b: 255},
        "🐨":{ r:204,g: 204,b: 204},
	    "🏐":{ r: 225, g:232, b:237},
	    "🦌":{ r: 193, g:105, b:79},
	    "🎥":{ r: 43, g: 49,b: 53},
	    "🐘":{ r: 153, g:170, b:181}
	};

	var emoteEntries = Object.keys(EMOTE_DICTIONARY);

    function resizeImage() {
		// Creates a canvas from the file loaded that will actually have the prompted width.
		canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		var i = new Image();
		var ratio = 1;
		i.onload = function() {
		// Resize to speicific number of pixels.
			ratio = scope.width / i.width;
			i.width = scope.width;
			i.height *= ratio; 
		  	canvas.width = i.width;
		  	canvas.height = i.height;
			context.drawImage(i, 0, 0, i.width, i.height);
		};
		i.src = scope.url;
	
		// cache these
		scope.context = context;
		scope.image = i;
	}

	window.onload = function () {
		 	var uploadImage = document.getElementById('upload-image');
			uploadImage.oninput = function(e) {
				if (uploadImage.files && uploadImage.files[0]) {
					var url = URL.createObjectURL(uploadImage.files[0]);
					document.getElementById("image-holder").src = url;
					scope.url = url;
					resizeImage();
				}
		} 
	}

	function getClosestEmoji(r,g,b) {
		var distance = Infinity;
		var closestEmoji;
		// Loops through each emoji and gives us the shorter "distance" between their RGB coordinates
		emoteEntries.forEach(element => {
			var currentDistance = Math.sqrt(
				Math.pow(r - EMOTE_DICTIONARY[element].r, 2) +
				Math.pow(g - EMOTE_DICTIONARY[element].g, 2) +
				Math.pow(b - EMOTE_DICTIONARY[element].b, 2)
			  );
			  if (currentDistance < distance) {
				  closestEmoji = element;
				  distance = currentDistance;
			  }
		});

		return closestEmoji;
	}
	
})();