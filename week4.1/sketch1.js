/* Michelle Huang
*  Creative Coding Week 4 Assignment
*  Iteration Generation II
*  Plotter Version of Idea 1
*/

// mouse up == circles separate
// mouse down == circles overlap
// circles slowly pulse in and out
// noise changes the radius slightly across the grid
// R creates a new variation
// S downloads the current pattern as an SVG

let bDoExportSvg = false;
let seed = 1234;


function setup() {
    // postcard size for the pen plotter
    createCanvas(576, 384);

    colorMode(HSB, 360, 100, 100, 1);
    angleMode(DEGREES);

    // plotter uses outlines instead of fills
    noFill();
    stroke(0);
    strokeWeight(1);
}


function keyPressed() {

    // S tells the next frame to export as an SVG
    if (key === "s" || key === "S") {
        bDoExportSvg = true;
    }

    // R creates a new controlled random variation
    if (key === "r" || key === "R") {
        seed = floor(random(10000));
    }
}


function draw() {
    background(0, 0, 97);

    // makes the random and noise results repeatable
    randomSeed(seed);
    noiseSeed(seed);

    // start recording when S is pressed
    if (bDoExportSvg) {
        beginRecordSvg(
            "michelle-circle-pattern-" + seed + ".svg"
        );
    }

    // keeps mouseY inside the canvas
    let mousePositionY = constrain(
        mouseY,
        0,
        height
    );

    // mouse up separates circles
    // mouse down brings circles closer together
    let mouseRadius = map(
        mousePositionY,
        0,
        height,
        32,
        6
    );

    // makes the circles slowly pulse
    let pulse = map(
        sin(frameCount * 0.04),
        -1,
        1,
        0.85,
        1.15
    );

    let ringRadius = mouseRadius * pulse;

    // main pattern variables
    let spacing = 115;
    let circleSize = 26;
    let circleCount = 8;


    // repeats the circle wheels across the x-axis
    for (
        let x = spacing / 2;
        x < width;
        x += spacing
    ) {

        // repeats the circle wheels down the y-axis
        for (
            let y = spacing / 2;
            y < height;
            y += spacing
        ) {

            // noise gives each wheel a small radius change
            let noiseAmount = map(
                noise(x * 0.01, y * 0.01),
                0,
                1,
                -4,
                4
            );

            // prevents circles from completely overlapping
            let wheelRadius = max(
                4,
                ringRadius + noiseAmount
            );

            // changes the angle across the grid
            let gridRotation =
                (x * 0.05 + y * 0.05) % 360;

            // adds a small controlled random rotation
            let rotationChange = random(-8, 8);

            // custom function draws one complete wheel
            drawCircleWheel(
                x,
                y,
                wheelRadius,
                circleSize,
                circleCount,
                gridRotation + rotationChange
            );
        }
    }


    // finish and download the SVG
    if (bDoExportSvg) {
        endRecordSvg();
        bDoExportSvg = false;
    }
}


// custom function for drawing one circle wheel
function drawCircleWheel(
    x,
    y,
    ringRadius,
    circleSize,
    circleCount,
    rotationAmount
) {

    push();

    // moves 0,0 to the center of this wheel
    translate(x, y);
    rotate(rotationAmount);

    // creates the 8 circles inside the wheel
    for (
        let circleNumber = 0;
        circleNumber < circleCount;
        circleNumber += 1
    ) {

        // evenly separates the circles around 360 degrees
        let angle =
            circleNumber *
            (360 / circleCount);

        // calculates each circle's position
        let circleX =
            cos(angle) * ringRadius;

        let circleY =
            sin(angle) * ringRadius;

        // draws one circle outline
        circle(
            circleX,
            circleY,
            circleSize
        );
    }

    pop();
}