/* Michelle Huang
*  Creative Coding Week 3 Assignment
*  Iteration Generation
*  Idea 3
*/

// top rows stay organized
// bottom rows become more messy
// mouse left = organized grid
// mouse right = more movement and rotation
// randomSeed keeps the pattern from flickering every frame

function setup() {
    createCanvas(windowWidth, windowHeight);

    angleMode(DEGREES);

    noFill();
    stroke(20);
    strokeWeight(1.5);
}

function draw() {
    background(245);

    // keeps mouseX inside the canvas
    let mousePositionX = constrain(
        mouseX,
        0,
        width
    );

    // moving right increases the most disorder allowed
    let maximumDisorder = map(
        mousePositionX,
        0,
        width,
        0,
        35
    );

    // spacing controls distance between squares
    // squareSize stays under the 100px motif size
    let spacing = 90;
    let squareSize = 65;

    // repeats the same random pattern every frame
    // without this, all the squares would flicker
    randomSeed(10);

    // x loop repeats squares across the screen
    for (
        let x = spacing / 2;
        x < width;
        x += spacing
    ) {

        // y loop repeats squares down the screen
        for (
            let y = spacing / 2;
            y < height;
            y += spacing
        ) {

            // top starts at 0 disorder
            // disorder increases closer to the bottom
            let disorder = map(
                y,
                spacing / 2,
                height - spacing / 2,
                0,
                maximumDisorder
            );

            // random horizontal movement
            let horizontalJitter = random(
                -disorder,
                disorder
            );

            // random vertical movement
            let verticalJitter = random(
                -disorder,
                disorder
            );

            // random square rotation
            let rotationJitter = random(
                -disorder,
                disorder
            );

            push();

            // move 0,0 to each grid position
            // then add the random x and y movement
            translate(
                x + horizontalJitter,
                y + verticalJitter
            );

            // tilt the square based on disorder
            rotate(rotationJitter);

            // draw square around 0,0
            // subtracting half makes 0,0 the center
            rect(
                -squareSize / 2,
                -squareSize / 2,
                squareSize,
                squareSize
            );

            // resets translate and rotate for next square
            pop();
        }
    }
}

function windowResized() {
    // keeps canvas full screen when browser size changes
    resizeCanvas(windowWidth, windowHeight);
}