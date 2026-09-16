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
        background(200, 50, 90);
        
        push();
        translate(50 + height/2);
        scale(0.8);
        fill(30,85,100);
        rect(0, 0, 300, 300);
        pop();

        push();
        translate(50, height/2);
        scale(0.8);
        fill(15, 90, 100);
        rect(0, 0, 300, 300);
        pop();
    }
