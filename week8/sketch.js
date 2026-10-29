let threshold = 20; //255 is white, 0 is black
let aveX, aveY; //this is what we are trying to find
let objectR =255;
let objectG = 0;
let objectB = 0;
let debug = true;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
}

function draw(){

    video.loadPixels();

    let totalFoundPixels= 0;  //we are going to find the average location of change pixes so
    let sumX = 0;  //we will need the sum of all the x find, the sum of all the y find and the total finds
    let sumY = 0;

    //enter into the classic nested for statements of computer vision
    for (let row = 0; row < video.height; row++) {
      for (let col = 0; col < video.width; col++) {
        //the pixels file into the room long line you use this simple formula to find what row and column the sit in 

        let offset = (row * video.width + col)*4;
        //pull out the same pixel from the current frame 
        let thisColor = video.pixels[offset];

        //pull out the individual colors for both pixels
        let r = video.pixels[offset];
        let g = video.pixels[offset + 1];
        let b = video.pixels[offset + 2];

        //in a color "space" you find the distance between color the same whay you would in a cartesian space, phythag or dist in processing
        let diff = dist(r, g, b, objectR, objectG, objectB);

        if (diff < threshold) {  //if it is close enough in size, add it to the average
          sumX = sumX + col;
          sumY= sumY + row;
          totalFoundPixels++;
         // if (debug) video.pixels[offset] = 0xff000000;//debugging
        }
      }
    }
    video.updatePixels();

    image(video,0,0);

    if (totalFoundPixels > 0){
      aveX = sumX/totalFoundPixels;
      aveY = sumY/totalFoundPixels;
      fill(objectR, objectG, objectB);
      ellipse(aveX-10,(aveY-10),20,20);
    }
}

function mousePressed(){
  //if they click, use that picture for the new thing to follow
 // var offset = mouseY * video.width + mouseX;

  //pull out the same pixel from the current frame 
  let thisColor = video.get(mouseX,mouseY);

  //pull out the individual colors for both pixels
   objectR = thisColor[0];
   objectG = thisColor[1];
   objectB = thisColor[2];
  println("Chasing new color  " + objectR + " " + objectG + " " + objectB);
}

function keyPressed() {
  //for adjusting things on the fly
  if (key == '-') {
    threshold--;
    println("Threshold " + threshold);
  } 
  else if (key == '=') {
    threshold++;
    println("Threshold " + threshold);
  }
  else if (key == 'd') {
    background(255);
    debug = !debug;
    println("Debug " + debug);
  }
  else if (key == 't') {
    println("Time Between Frames " + ellapsedTime);
  }
}