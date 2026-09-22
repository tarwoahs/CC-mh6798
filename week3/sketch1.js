/* Michelle Huang
*  Creative Coding Week 3 Assignment
*  Iteration Generation
*  Idea 1
*/

// mouse up = circles separate
// mouse down = circles merge into one
// spacing controls space between each color wheel
// circleSize controls each individual circle
// alpha goes from 0 to 1 because of how colorMode is set

function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 360, 100, 100, 1);
    angleMode(DEGREES);
    noStroke();
}

function draw() {
    background(0, 0, 97);

    // keeps mouseY between the top and bottom of the canvas
    let mousePositionY = constrain(mouseY, 0, height);

    // radius is 32 at top and becomes 0 at bottom
    // 32 keeps the full motif around 100px by 100px
    let mouseRadius = map(
        mousePositionY,
        0,
        height,
        32,
        0
    );

    // circles slowly pulse in and out on their own
    // sin gives a value between -1 and 1
    let pulse = map(
        sin(frameCount * 0.04),
        -1,
        1,
        0.85,
        1.15
    );

    // mouse controls the main movement
    // pulse adds a smaller automatic movement
    let ringRadius = mouseRadius * pulse;

    // variables to make sizes easier to change later
    let spacing = 115;
    let circleSize = 26;
    let circleCount = 8;

    // x loop repeats pattern across screen
    for (
        let x = spacing / 2;
        x < width;
        x += spacing
    ) {

        // y loop repeats pattern down screen
        for (
            let y = spacing / 2;
            y < height;
            y += spacing
        ) {

            push();

            // move 0,0 to the center of each pattern
            translate(x, y);

            // each color wheel starts at a slightly different angle
            let gridRotation =
                (x * 0.05 + y * 0.05) % 360;

            rotate(gridRotation);

            // makes the 8 circles inside each color wheel
            for (
                let circleNumber = 0;
                circleNumber < circleCount;
                circleNumber += 1
            ) {

                // evenly spaces the circles around 360 degrees
                let angle =
                    circleNumber *
                    (360 / circleCount);

                // finds the x and y position around the center
                let circleX =
                    cos(angle) * ringRadius;

                let circleY =
                    sin(angle) * ringRadius;

                // changes hue for every circle and grid position
                // % 360 keeps hue inside the hsb color range
                let circleHue =
                    (
                        circleNumber *
                        (360 / circleCount) +
                        x * 0.15 +
                        y * 0.1
                    ) % 360;

                // 0.5 alpha makes circles transparent
                // overlapping circles create different colors
                fill(
                    circleHue,
                    90,
                    100,
                    0.5
                );

                circle(
                    circleX,
                    circleY,
                    circleSize
                );
            }

            // resets translate and rotate for next pattern
            pop();
        }
    }
}

function windowResized() {
    // keeps canvas full screen when browser size changes
    resizeCanvas(windowWidth, windowHeight);
}