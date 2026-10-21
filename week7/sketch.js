let pMapper; // mapper instance
let myQuad; // one face
let ballx;

function setup() {
    // p5.mapper needs WEBGL in createCanvas
    createCanvas(windowWidth, windowHeight, WEBGL);
    // create the mapper
    pMapper = createProjectionMapper(this);
    // create one quad surface
    myQuad = pMapper.createQuadMap(400, 400);
    // if you want to position items in your sketch
    // do so with the quad you're targeting
    ballx = myQuad.width/2;
}

function draw() {
    background(0);
    //pass the name of a drawing function into displaySketch()
    myQuad.displaySketch(myDrawing);
}

// p5.mapper passes an offscreen canvas (mySketch) into this function
function myDrawing(mySketch) {
    // anything drawn on this surface needs 'mySketch.' in front of it
    mySketch.background("orange");
    mySketch.stroke(0);
    mySketch.strokeWeight(4);
    mySketch.line(0, 0, 400, 400); // diagonal line across the quad
    mySketch.noStroke();
    mySketch.fill(255);
    mySketch.ellipse(ballx, myQuad.height/2, 150);
    ballx += 1;
    if(ballx>myQuad.width+75)ballx=-75;
}
function keyPressed() {
    if (key === "c") {
        pMapper.toggleCalibration();
    }
    if (key === "s") {
        pMapper.save("map.json");
    }
    if (key === "l") {
        pMapper.load("maps/map.json");
    }
}