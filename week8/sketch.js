let cam; 

async function setup() {
  createCanvas(800, 600);
  pixelDensity(1);
  // load a video
  cam = await createCapture(VIDEO);
  cam.size(800, 600);
  cam.hide();
}

function draw() {
  background(0);
 
  // exaggerate values based on mouseY
  let exaggeration = floor(map(mouseY, 0, height, 255, 0));

  // get a copy of the camera image
  let img = cam.get();

  img.loadPixels();

  // note: i += 4 in the loop update
  for (let i = 0; i < img.pixels.length; i += 4) {
    // get color values from image
    let redValue = img.pixels[i + 0];
    let greenValue = img.pixels[i + 1];
    let blueValue = img.pixels[i + 2];

    // which is the dominant value
    let maxColorValue = max(redValue, greenValue, blueValue);

    // exaggerate the domiant one, but in the img
    if (maxColorValue == redValue) {
      img.pixels[i + 0] = exaggeration;
    } else if (maxColorValue == greenValue) {
      img.pixels[i + 1] = exaggeration;
    } else if (maxColorValue == blueValue) {
      img.pixels[i + 2] = exaggeration;
    }
  }

  img.updatePixels();
  image(img, 0, 0);
}