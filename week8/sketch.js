/*
 * Michelle Huang
 * Creative Coding Week 8 Assignment
 * Fragmented Self
 * 
 * interaction:
 * mouse left/right = changes how fast the fragments move
 * mouse up/down = changes the glitch intensity
 * 's' = saves the current portrait
 */


let camera;
let fragments = [];

let cameraWidth = 640;
let cameraHeight = 480;

let imageScale = 600 / cameraWidth;
let portraitX = 180;
let portraitY = 95;

// area of webcam where my face should be
let faceX = 154;
let faceY = 67;
let faceWidth = 333;
let faceHeight = 346;

// 4x4 grid of face fragments
let fragmentColumns = 4;
let fragmentRows = 4;
let fragmentWidth = faceWidth / fragmentColumns;
let fragmentHeight = faceHeight / fragmentRows;


function setup() {
  createCanvas(960, 640);
  pixelDensity(1);
  frameRate(20);

  // starts webcam and hides original video
  camera = createCapture(VIDEO);
  camera.size(cameraWidth, cameraHeight);
  camera.hide();

  noStroke();

  // divides face into 16 fragments
  for (let row = 0; row < fragmentRows; row++) {
    for (let col = 0; col < fragmentColumns; col++) {

      // gets the position of each fragment from the webcam
      let oneFragment = {
        sourceX: floor(faceX + col * fragmentWidth),
        sourceY: floor(faceY + row * fragmentHeight),

        // random starting positions
        x: random(0, width - fragmentWidth * imageScale),
        y: random(0, height - fragmentHeight * imageScale),

        // random movement direction and speed
        moveX: random(-1.2, 1.2),
        moveY: random(-1.2, 1.2)
      };

      fragments.push(oneFragment);
    }
  }
}

function draw() {
  background(210, 213, 216);

  // wait camera start
  if (!camera.elt || camera.elt.readyState < 2) {
    return;
  }

  // gets the current webcam frame and pixel values
  let cameraImage = camera.get();
  cameraImage.loadPixels();

  // makes a black and white copy of webcam
  let grayImage = cameraImage.get();
  grayImage.filter(GRAY);

  // makes another copy to blur the face
  let blurredImage = grayImage.get();
  blurredImage.filter(BLUR, 4);

  // draws blurred face in center
  image(
    blurredImage,
    portraitX,
    portraitY,
    cameraWidth * imageScale,
    cameraHeight * imageScale
  );

  // mouseY controls how much color is added
  let glitchAmount = map(mouseY, 0, height, 0, 200, true);

  let colorImage = cameraImage.get();
  colorImage.loadPixels();

  // loops through pixels in the face area
  for (let y = faceY; y < faceY + faceHeight; y++) {
    for (let x = faceX; x < faceX + faceWidth; x++) {

      // converts x and y into pixel array index
      let pixelIndex = 4 * (y * cameraImage.width + x);

      // gets the RGB values of each pixel
      let r = cameraImage.pixels[pixelIndex];
      let g = cameraImage.pixels[pixelIndex + 1];
      let b = cameraImage.pixels[pixelIndex + 2];

      // calculates average brightness
      let brightness = (r + g + b) / 3;

      // alternates between red, green, and blue every 18 pixels
      let colorBand = floor((y - faceY) / 18) % 3;

      // only changes pixels brighter than 65
      if (brightness > 65) {
        if (colorBand === 0) {
          colorImage.pixels[pixelIndex] = min(255, r + glitchAmount);
        }
        else if (colorBand === 1) {
          colorImage.pixels[pixelIndex + 1] = min(255, g + glitchAmount);
        }
        else {
          colorImage.pixels[pixelIndex + 2] = min(255, b + glitchAmount);
        }
      }
    }
  }

  // updates the changed pixel colors
  colorImage.updatePixels();
  // divides the face into horizontal strips
  let stripHeight = 12;

  for (let y = faceY; y < faceY + faceHeight; y += stripHeight) {

    let oneStrip = colorImage.get(faceX, y, faceWidth, stripHeight);
    // sin moves each strip back and forth
    // mouseY changes how far they move
    let shift = sin(frameCount * 0.1 + y * 0.2) * glitchAmount * 0.15;

    image(
      oneStrip,
      portraitX + faceX * imageScale + shift,
      portraitY + y * imageScale,
      faceWidth * imageScale,
      stripHeight * imageScale
    );
  }

  // covers some parts of the face to create missing pieces
  for (let i = 0; i < fragments.length; i++) {

    // every 3rd fragment leaves a faded empty space
    if (i % 3 === 0) {
      let oneFragment = fragments[i];

      fill(210, 213, 216, 145);

      rect(
        portraitX + oneFragment.sourceX * imageScale,
        portraitY + oneFragment.sourceY * imageScale,
        fragmentWidth * imageScale,
        fragmentHeight * imageScale
      );
    }
  }

  // mouseX controls how fast the pieces move
  let fragmentSpeed = map(mouseX, 0, width, 0.5, 3, true);

  // moves each fragment around the canvas
  for (let i = 0; i < fragments.length; i++) {
    let oneFragment = fragments[i];
    oneFragment.x += oneFragment.moveX * fragmentSpeed;
    oneFragment.y += oneFragment.moveY * fragmentSpeed;

    // bounces when reaching the canvas edges
    if (oneFragment.x < 0 ||
        oneFragment.x > width - fragmentWidth * imageScale) {
      oneFragment.moveX *= -1;
    }

    if (oneFragment.y < 0 ||
        oneFragment.y > height - fragmentHeight * imageScale) {
      oneFragment.moveY *= -1;
    }
    // crops a piece from the live webcam
    let onePiece = grayImage.get(
      oneFragment.sourceX,
      oneFragment.sourceY,
      floor(fragmentWidth),
      floor(fragmentHeight)
    );
    // draws the fragment at its moving position
    image(
      onePiece,
      oneFragment.x,
      oneFragment.y,
      fragmentWidth * imageScale,
      fragmentHeight * imageScale
    );
  }
}

// 's' saves a screenshot
function keyPressed() {
  if (key === "s" || key === "S") {
    saveCanvas("fragmented-self", "png");
  }
}
