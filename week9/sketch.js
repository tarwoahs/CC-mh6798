
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

async function setup() {
  createCanvas(800, 600);
  
  // Load the faceMesh model asynchronously
  faceMesh = await ml5.faceMesh(options);
  
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(800, 600);
  video.hide();
  
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill(255);
      noStroke();
      ellipse(keypoint.x, keypoint.y, 2,2);
    }
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
  console.log(faces);
}