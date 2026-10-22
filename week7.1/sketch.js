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

//balls	= hearts
// numBalls	= numHearts
// oneBall = oneHeart
//balls[i].d = hearts[i].d
//

function dots(mySketch) {

    // pink gradient background
    for (let y = 0; y < 400; y++) {
        let r = map(y, 0, 400, 255, 247);
        let g = map(y, 0, 400, 240, 198);
        let b = map(y, 0, 400, 245, 218);

        mySketch.stroke(r, g, b);
        mySketch.line(0, y, 400, y);
    }

    // transparent pink hearts
    mySketch.noStroke();
    mySketch.fill(230, 80, 140, 100);
    mySketch.textAlign(CENTER, CENTER);

    for (let i = 0; i < numBalls; i++) {
        mySketch.textSize(balls[i].d);
        mySketch.text("♥", balls[i].x, balls[i].y);

        // hearts float around
        balls[i].x += random(-1, 1);
        balls[i].y -= 0.5;

        // hearts return to bottom
        if (balls[i].y < -balls[i].d) {
            balls[i].y = 400 + balls[i].d;
            balls[i].x = random(400);
        }
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