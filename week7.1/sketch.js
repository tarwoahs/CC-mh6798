let pMapper;
let leftQuad;
let rightQuad;
let balls = [];
let numBalls = 20;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pMapper = createProjectionMapper(this);
    
    // create two quads
    leftQuad = pMapper.createQuadMap(400, 400);
    rightQuad = pMapper.createQuadMap(400, 400);

    // create array of circles
    for (let i = 0; i < numBalls; i++) {
        let oneBall = {
            x: random(leftQuad.width),
            y: random(leftQuad.height),
            d: random(20, 100)
        };
        balls.push(oneBall);
    }
}


function draw() {
    background(0);

    // each quad runs its own function
    leftQuad.displaySketch(dots);
    rightQuad.displaySketch(stripes);
}

function dots(mySketch) {
    mySketch.background("aliceblue");  
    mySketch.noStroke();
    mySketch.fill(180, 10, 220, 40);
    for (let i = 0; i < numBalls; i++) {
        mySketch.ellipse(balls[i].x, balls[i].y, balls[i].d);
        balls[i].x += random(-1, 1);
    }
}

function stripes(yourSketch) {
    yourSketch.background("orange");
    yourSketch.stroke(255);
    yourSketch.strokeWeight(5);
    for (let i = 0; i < 400; i += 40) {
        yourSketch.line(i, 0, i, 400);
    }
}

function keyPressed() {
    switch (key) {
        case "c":
            pMapper.toggleCalibration();
            break;
        case "f":
            let fs = fullscreen();
            fullscreen(!fs);
            break;
        case "l":
            pMapper.load("maps/map.json");
            break;
        case "s":
            pMapper.save("map.json");
            break;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}