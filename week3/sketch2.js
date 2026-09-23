/* Michelle Huang
*  Creative Coding Week 3 Assignment
*  Iteration Generation
*  Idea 2
*/

// keeps mouse values inside the canvas
// moving right makes the waves taller
// moving down makes the waves repeat more tightly
// controls space between every row
// moves 0,0 down to the current row
// starts one continuous wave line
// places each point in the wave
// connects and finishes the wave
// resets translate before next row

function setup() {
    createCanvas(windowWidth, windowHeight);

    stroke(20);
    strokeWeight(1.5);
    noFill();
}

function draw() {
    background(245);

    // keeps mouse values inside the canvas
    let mousePositionX = constrain( mouseX, 0, width);

    let mousePositionY = constrain(mouseY, 0, height);

    // moving right makes the waves taller
    let amplitude = map(
        mousePositionX, 0, width, 2, 35
    );

    // moving down makes the waves repeat more tightly
    let frequency = map(
        mousePositionY, 0, height, 0.01, 0.06
    );

    // controls space between every row
    let rowSpacing = 12;

    // y loop repeats wave rows down the canvas
    for (
        let y = 0; y < height; y += rowSpacing
    ) {

        push();

        // moves 0,0 down to the current row
        translate(0, y);
        // starts one continuous wave line
        beginShape();

        // x loop adds points across the canvas
        for (
            let x = 0; x <= width; x += 5
        ) {

            // x controls the wave across the screen
            // frameCount makes it move
            // y makes every row start at a different point
            let waveY =
                sin(
                    x * frequency + frameCount *0.03+y * 0.02
                ) *
                amplitude;

            // places each point in the wave
            vertex(x, waveY);
        }

        // connects and finishes the wave
        endShape();

        // resets translate before next row
        pop();
    }
}

function windowResized() {
    // keeps canvas full screen when browser size changes
    resizeCanvas(windowWidth, windowHeight);
}