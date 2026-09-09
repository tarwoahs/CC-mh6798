let xPos;
let yPos;


function setup() {
    createCanvas(windowWidth, windowHeight);
    xPos = width/2;
    yPos = height/2;
    randomX=random(0,width/2);
    console.log("xPos: " + xPos + " yPos: " + yPos);

}

function draw() {
    background (180, 10, 220);
    ellipse(xPos, yPos, 100);
    ellipse(xPos/2, yPos/2, 100);
    ellipse(xPos+randomX, yPos-30, 100)
    
}

function mousePressed() {
    xPos = random(0, width);
    yPos = random(0, height);
    console.log("xPos: " + xPos + " yPos: " + yPos);
}
