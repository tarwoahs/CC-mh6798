/* Michelle Huang
*  Creative Coding Week 4 Assignment
*  Iteration Generation II
*  Fingerprint Field
*/

// interaction:
// mouse left = fingerprints become smoother and more similar
// mouse right = fingerprints become more uneven and individual
// mouse up/down = controls how fast the ridges move
// S = exports the current drawing as an SVG

let bDoExportSvg = false;

let motion = 0;

// controls how uneven the fingerprints become
// mouseX changes this number inside draw()
let individuality = 2;

//bigger opening
let gapSize = 8;


function setup() {
    createCanvas(576, 384);
    angleMode(DEGREES);
    noFill();
    frameRate(30);
}


function draw() {
    background(250);

    // constrains keeps mouseX inside the canvas
    // map changes mouseX from 0 width into 0.5 4.5
    individuality = map(
        constrain(mouseX, 0, width),0, width, 0.5, 4.5);

    // keeps mouseY inside the canvas
    // moving down makes the animation faster
    let speed = map(
        constrain(mouseY, 0, height), 0, height, 0.15, 0.8);

    // add speed every frame motion grow
    motion += speed;

    if (bDoExportSvg) {
        beginRecordSvg(
            "michellefingerprintfield.svg"
        );
    }
    stroke("black");

    strokeWeight(0.7);


    //LEFT SIDE FINGERPRINTS
    // center x, center y, width, height, rotation, ridge count
    // fingerprint #, main fingerprint t f

    // large fingerprint near the top-left corner
    drawFingerprint(52, 65, 86, 102, -20, 8, 1, false);

    // smaller finger closer center
    drawFingerprint(145, 118, 58, 78, 12, 6, 2, false);

    //larger fingerprint on the middle-left
    drawFingerprint(60, 235, 105, 125, 8, 9, 3, false);

    //small fingerprint near the bottom-left
    drawFingerprint(160, 327, 60, 80, -15, 6, 4, false);


    // RIGHT SIDE FINGERPRINTS
    // top right fingerprint
    drawFingerprint(524, 60, 84, 100, 18, 8, 5, false);

    // smaller fingerprint closer to the center
    drawFingerprint(431, 128, 60, 80, -12, 6, 6, false );

    // larger fingerprint on the middle right
    drawFingerprint(516, 232, 103, 123, -8, 9, 7, false);

    // smaller fingerprint near the bottom right
    drawFingerprint(416, 327, 62, 82, 15, 6, 8, false);


    // CENTER FINGERPRINT
    stroke("black");
    strokeWeight(1.2);

    drawFingerprint(width / 2, height / 2,
        185, 285, 0, 18, 9, true
    );

    if (bDoExportSvg) {
        endRecordSvg();
        bDoExportSvg = false;
    }
}


// this function creates one complete fingerprint
// the parameters let the same function create many different fingerprints
function drawFingerprint(
    centerX, centerY,
    fingerprintWidth, fingerprintHeight,
    rotationAmount,
    ridgeCount,
    fingerprintNumber,
    isMainFingerprint
) {
    // save the current canvas position
    push();
    translate(
        centerX,
        centerY
    );
    rotate(rotationAmount);


    // ECHO RIDGES
    // this section only runs when isMainFingerprint is false
    // the large center fingerprint does not need extra echoes
    if (!isMainFingerprint) {
        // repeat two extra ridges around every smaller fingerprint
        for (
            let echoNumber = 0; echoNumber < 2; echoNumber += 1
        ) {
            let echoSize =
                10 + echoNumber * 8; //first echo 10, second echo 18
            let echoGapStart =
                (
                    fingerprintNumber * 31 +
                    echoNumber * 67
                ) % 360; //keeps result between 0 and 360

            // draw the larger echo ridge
            drawOpenRidge(
                fingerprintWidth + echoSize, fingerprintHeight + echoSize,
                echoGapStart,
                echoNumber,
                fingerprintNumber,
                false
            );
        }
    }


    // INSIDE FINGERPRINT RIDGES
    // begin at ridge 0
    // continue until ridgeNumber reaches ridgeCount
    // add 1 after every repetition
    for (
        let ridgeNumber = 0;
        ridgeNumber < ridgeCount;
        ridgeNumber += 1
    ) {
        // map makes the outside ridge start at the full width
        // every repeated ridge becomes smaller
        let ridgeWidth = map(
            ridgeNumber, 0, ridgeCount - 1,
            fingerprintWidth,
            18 //final stops at 18
        );

        let ridgeHeight = map(
            ridgeNumber,
            0, ridgeCount - 1, //height
            fingerprintHeight,
            26 //final stops at 26
        );

        // each ridge and fingerprint gets a different opening position within 0 360
        let gapStart =
            (
                ridgeNumber * 47 +
                fingerprintNumber * 31
            ) % 360;

        // calculated values to give drawOpenRidge()
        drawOpenRidge(
            ridgeWidth, ridgeHeight,
            gapStart, ridgeNumber,
            fingerprintNumber,
            isMainFingerprint
        );
    }
    pop();
}

// creates one curved ridge
// almost complete oval, has one opening
function drawOpenRidge(
    ridgeWidth, ridgeHeight,
    gapStart,
    ridgeNumber,
    fingerprintNumber,
    isMainFingerprint
) {
    let averageRadius =
        (ridgeWidth + ridgeHeight) / 4;

    // convert gapSize from pixels into an angle
    // this keeps the openings around the same visible size
    let gapAngle = constrain(
        gapSize / averageRadius * 180 / PI,
        1, 25
    );

    beginShape();

    // travel around most of the oval
    // stop before reaching 360 degrees to leave the opening
    for (
        let part = 0;
        part <= 360 - gapAngle;
        part += 1
    ) {
        // start after the opening
        // part keeps moving around the rest of the oval
        let angle = gapStart + gapAngle + part;

        // sin creates a smooth repeating movement
        // ridgeNumber changes every ridge
        // fingerprintNumber changes every fingerprint
        // motion animates the lines
        let ridgeMovement = sin(
            angle * 3 +
            ridgeNumber * 5 +
            fingerprintNumber * 24 +
            motion * 0.25
        ) * individuality; // controls the strength of the movement

        // cos calculates the horizontal pos
        // ridgeMovement doesnt make the oval perfect
        let x = cos(angle) * (
            ridgeWidth / 2 +
            ridgeMovement
        );

        // sin calculates the vertical pos
        let y = sin(angle) * (
            ridgeHeight / 2 +
            ridgeMovement
        );

        // only the large center fingerprint receives this extra movement
        if (isMainFingerprint) {
            // adds another horizontal shift
            x += sin(
                angle * 2 +
                ridgeNumber * 3 +
                motion * 0.15) * 3;
        }
        vertex(x, y);
    }
    endShape();
}
function keyPressed() {
    if (key === "s" || key === "S") {
        bDoExportSvg = true;
    }
}

// process:
// earlier version had background lines that felt random and did not add to the idea
// replaced those lines with more fingerprints so every part supports the concept
// fingerprints were also spaced awkwardly when they were placed in straight rows
// changed their positions, sizes and rotations to make the layout feel more natural

// methods:
// drawFingerprint creates one complete fingerprint
// drawOpenRidge creates one unfinished oval ridge
// for loops repeat the ridges from the outside toward the center
// another for loop adds two echo ridges around each smaller fingerprint
// translate moves 0,0 to each fingerprint position
// rotate gives every fingerprint a different direction
// map changes the ridge sizes and connects the drawing to the mouse
// sin and cos calculate the points around every curved ridge
// beginShape, vertex and endShape connect the points into lines
// modulo (%) moves the openings to different areas of every ridge
// different function parameters change position, size, rotation and ridge count
