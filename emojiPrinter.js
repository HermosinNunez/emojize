let width = 100;
let context;
let image;
let url;
let resultContainer;

const EMOTE_DICTIONARY = {
  '🌸': {r: 242, g: 132, b: 177},
  '🐷': {r: 244, g: 171, b: 186},
  '🍅': {r: 221, g: 46, b: 68},
  '🍂': {r: 244, g: 144, b: 12},
  '🏀': {r: 234, g: 84, b: 14},
  '🍪': {r: 240, g: 173, b: 4},
  '🍑': {r: 240, g: 136, b: 74},
  '💮': {r: 247, g: 215, b: 196},
  '🍋': {r: 255, g: 204, b: 77},
  '🍈': {r: 181, g: 215, b: 68},
  '🐸': {r: 141, g: 187, b: 26},
  '🍐': {r: 166, g: 211, b: 136},
  '🍀': {r: 16, g: 134, b: 15},
  '💦': {r: 93, g: 173, b: 236},
  '💎': {r: 181, g: 216, b: 243},
  '🐋': {r: 52, g: 211, b: 248},
  '🆒': {r: 0, g: 90, b: 215},
  '🅿️': {r: 20, g: 70, b: 200},
  '🌌': {r: 59, g: 77, b: 141},
  '🍆': {r: 146, g: 102, b: 204},
  '🔮': {r: 170, g: 151, b: 247},
  '🖨️': {r: 209, g: 209, b: 209},
  '🌑': {r: 94, g: 94, b: 94},
  '🍞': {r: 249, g: 197, b: 82},
  '🐨': {r: 204, g: 204, b: 204},
  '🏐': {r: 225, g: 232, b: 237},
  '📦': {r: 216, g: 176, b: 148},
  '🦌': {r: 193, g: 105, b: 79},
  '🐒': {r: 94, g: 59, b: 47},
  '🎥': {r: 13, g: 13, b: 13},
  '🐘': {r: 153, g: 170, b: 181}
};

function setWidth(value) {
  // TODO: Set width as a radio button: Large, Normal, Small sizes
  if (!isNaN(value) && value > 0 && value < 1000) {
    width = value;
    resizeImage();
  }
}

function parseImage() {

  if (image) {
    var imageData = context.getImageData(0, 0, image.width, image.height);
    var r, g, b;
    var finalString = '';
    for(var i = 0; i < imageData.data.length; i += 4) {
      if ((i / 4) % width === 0) {
        finalString += '\n';
      }
      r = imageData.data[i];     // RED
      g = imageData.data[i + 1]; // GREEN
      b = imageData.data[i + 2]; // BLUE
      // ALPHA would be i + 3  but we are not using it
      finalString += getClosestEmoji(r, g, b);
    }
    // Add the result and show it
    resultContainer.innerHTML = finalString;
  }
}

var emoteEntries = Object.keys(EMOTE_DICTIONARY);

function resizeImage() {
  // Create a hidden canvas from the file loaded that will actually have the prompted width.
  let canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  image = new Image();
  let ratio = 1;
  image.onload = function() {
    // Resize to specific number of pixels.
    ratio = width / image.width;
    image.width = width;
    image.height *= ratio;
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);
  };
  // Set the image, and show it
  image.src = url;

}

window.onload = function() {
  resultContainer = document.getElementById('result-container');
  const uploadImage = document.getElementById('upload-image');
  uploadImage.oninput = function() {
    resultContainer.innerHTML = null;
    if (uploadImage.files && uploadImage.files[0]) {
      url = URL.createObjectURL(uploadImage.files[0]);
      document.getElementById('image-holder').src = url;
      resizeImage();
    }
  }
};

function getClosestEmoji(r, g, b) {
  var distance = Infinity;
  var closestEmoji = '';
  // Loops through each emoji and gives us the shorter "distance" between their RGB coordinates
  emoteEntries.forEach(function(element) {
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
