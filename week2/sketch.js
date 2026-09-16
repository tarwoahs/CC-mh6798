/* Michelle Huang
   Creating Coding Week 2 Assignment
   Fish Animation
   */

let variation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
}

// first variation
// fish enters from the left side of the screen and swims to the right side of the screen
function draw() {
    if (variation === 0) {
        background(200, 50, 90); //bg 1
        // body of the fish
        push();
        translate(50, height/2);
        scale(0.8);
        fill(30,85,100);
        rect(0, 0, 300, 300);
        pop();

        // tail of the fish
        push();
        translate(50, height/2);
        scale(0.8);
        translate(-150, 0); //move to left edge body
        fill(15, 90, 100);
        triangle(0, -90, 0, 90, -130, 0);
        pop();

        // eye of the fish
        push();
        translate(50, height/2); //moves eye to the front & upper part of fish
        scale(0.8);
        translate(95, -55); //moves eye to front, and upper part of the fish
        fill(0, 0, 0);
        ellipse(0, 0, 25, 25);
        pop();
    }

// second variation
// fish moves more into the screen "quick hello"
// becomes a little bigger, rotates a little up
    if (variation === 1) {
        background(215, 55, 85); //bg 2 darker
        //body
        push();
        translate(width * 0.3, height/2); //move far
        rotate(-PI/20);
        scale(0.9);
        fill(50, 85, 100); //yellow fish body
        rect(0, 0, 300, 300);
        pop();

        // tail of the fish
        push();
        translate(width * 0.3, height/2);
        rotate(-PI/20);
        scale(0.9);
        translate(-150, 0); //move to left edge body
        fill(30, 90, 100); //orange fish tail
        triangle(0, -90, 0, 90, -130, 0);
        pop();

        //eye
        push();
        translate(width * 0.3, height/2);
        rotate(-PI/20);
        scale(0.9);
        translate(95, -55); //moves eye to front, and upper part of the fish
        fill(0, 0, 0);
        ellipse(0, 0, 25, 25);
        pop();
    }
    // third variation
    // fish at center, turns around,
    // tail moves right moves move left
    // fish face opposite direction
    if (variation === 2) {
        background(185, 40, 95); //bg 3
        //body
        push();
        translate(width/2, height/2);
        scale(1.1);
        fill(335, 55,100);
        rect(0, 0, 300, 300);
        pop();
        //tail
        push();
        translate(width/2, height/2);
        scale(1.1);
        translate(150, 0); //move to right edge body
        fill(315, 65, 95);
        triangle(0, -90, 0, 90, 130, 0);
        pop();

        //eye
        push();
        translate(width/2, height/2);
        scale(1.1);
        translate(-95, -55); //moves eye to front, and upper part of the fish
        fill(0, 0, 0);
        ellipse(0, 0, 25, 25);
        pop();
    }

    //variation 4
    // fish turns back to right

    if (variation === 3) {
        background(210, 60, 80);
        //body
        push();
        translate(width * 0.75, height/2);
        rotate(PI/20);
        scale(0.9);
        fill(125, 60, 90);
        rect(0, 0, 300, 300);
        pop();
        //tail
        push();
        translate(width * 0.75, height/2);
        rotate(PI/20);
        scale(0.9);
        translate(-150, 0); //move to left edge body
        fill(160, 70, 80);
        triangle(0, -90, 0, 90, -130, 0);
        pop();
        //eye
        push();
        translate(width * 0.75, height/2);
        rotate(PI/20);
        scale(0.9);
        translate(95, -55); //moves eye to front, and upper part of the fish
        fill(0, 0, 0);
        ellipse(0, 0, 25, 25);
        pop();
    }
    //variation 5
    // fish moves to the right side of the screen
    if (variation === 4) {
        background(198, 65, 88); //bg 5
        // body of the fish
        push();
        translate(width +125, height/2);
        scale(0.8);
        fill(275,55,95);
        rect(0, 0, 300, 300);
        pop();
        //tail
        push();
        translate(width +125, height/2);
        scale(0.8);
        translate(-150, 0); //move edge of body
        fill(300, 65, 90);
        triangle(0, -90, 0, 90, -130, 0);
        pop();
        //eye
        push();
        translate(width +125, height/2);
        scale(0.8);
        translate(95, -55); //moves eye to front, and upper part of the fish
        fill(0, 0, 0);
        ellipse(0, 0, 25, 25);
        pop();
    }
}
    function mousePressed() {
        //move to next varitation whenever user clicks
        variation = variation + 1;
        //after 5, return to variant 1
        if (variation > 4) {
            variation = 0;
        }
    }
    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }
