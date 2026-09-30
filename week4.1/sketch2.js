/* Michelle Huang
*  Creative Coding Week 4 Assignment
*  Iteration Generation II
*  Plotter Version of Idea 2
*/

// mouse left/right == changes wave height
// mouse up/down == changes how tightly waves repeat
// noise gives each row a small variation
// R creates a new noise pattern
// S downloads the current pattern as an SVG

let bDoExportSvg = false;
let seed = 1234;


function setup() {
    // postcard size for the pen plotter
    createCanvas(576, 384);

    stroke(20);
    strokeWeight(1);
    noFill();
}


function keyPressed() {

    // S tells the next frame to export
    if (key === "s" || key === "S") {
        bDoExportSvg = true;
    }

    // R creates a different noise variation
    if (key === "r" || key === "R") {
        seed = floor(random(10000));
    }
}


function draw() {
    background(245);

    // keeps the generated variation stable
    randomSeed(seed);
    noiseSeed(seed);

    // starts recording when S is pressed
    if (bDoExportSvg) {
        beginRecordSvg(
            "michelle-vibrating-waves-" + seed + ".svg"
        );
    }

    // keeps mouse values inside the canvas
    let mousePositionX = constrain(
        mouseX,
        0,
        width
    );

    let mousePositionY = constrain(
        mouseY,
        0,
        height
    );

    // moving right makes the waves taller
    let amplitude = map(
        mousePositionX,
        0,
        width,
        2,
        28
    );

    // moving down makes waves repeat more tightly
    let frequency = map(
        mousePositionY,
        0,
        height,
        0.01,
        0.06
    );

    // space between each row
    let rowSpacing = 12;

    // keeps waves away from the paper edges
    let margin = 40;

    // controls the moving wave position
    let motion = frameCount * 0.03;


    // repeats wave rows down the canvas
    for (
        let y = margin;
        y < height - margin;
        y += rowSpacing
    ) {

        // gives each row a smooth noise value
        let rowNoise = noise(y * 0.02);

        // slightly changes wave height for each row
        let rowAmplitude = amplitude * map(
            rowNoise,
            0,
            1,
            0.75,
            1.2
        );

        // slightly changes the starting position of each row
        let rowPhase = map(
            rowNoise,
            0,
            1,
            -1,
            1
        );

        // custom function draws one wave row
        drawWaveRow(
            y,
            rowAmplitude,
            frequency,
            rowPhase,
            motion
        );
    }


    // finishes and downloads the SVG
    if (bDoExportSvg) {
        endRecordSvg();
        bDoExportSvg = false;
    }
}


// custom function for drawing one wave row
function drawWaveRow(
    y,
    amplitude,
    frequency,
    rowPhase,
    motion
) {

    push();

    // moves 0,0 down to this row
    translate(0, y);

    // starts one continuous line
    beginShape();

    // creates points across the x-axis
    for (
        let x = 10;
        x <= width - 10;
        x += 5
    ) {

        let waveY =
            sin(
                x * frequency +
                motion +
                y * 0.02 +
                rowPhase
            ) *
            amplitude;

        // adds one point to the wave
        vertex(x, waveY);
    }

    // connects and finishes the wave
    endShape();

    pop();
}