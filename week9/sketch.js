/*
    Michelle Huang
    Creative Coding Week 9
    Gestural Control - i love apples and pizza
*/

let video;
let faceMesh;
let faces = [];
let foods = [];
let score = 0;
let gameStarted = false;
let startTime = 0;
let lastFoodTime = 0;

async function setup() {
    createCanvas(800, 600);
    textFont("Comic Sans MS");

    // create webcam video
    video = createCapture(VIDEO);
    video.size(800, 600);
    video.hide();
    
faceMesh = await ml5.faceMesh({ maxFaces: 1 });
console.log("FaceMesh loaded!");

faceMesh.detectStart(video, gotFaces);
}

function draw() {
    background(240);
    // webcam mirrored for more natural interaction
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();

    let mouthOpen = false;
    let mouthX = 0;
    let mouthY = 0;

    // track the mouth if a face is detected
    if (faces.length > 0) {
        let face = faces[0];

        // top and bottom inner lip points
        let topLip = face.keypoints[13];
        let bottomLip = face.keypoints[14];

        // left and right mouth corners
        let leftCorner = face.keypoints[61];
        let rightCorner = face.keypoints[291];

        // find the middle of the mouth
        mouthX = width - (topLip.x + bottomLip.x) / 2;
        mouthY = (topLip.y + bottomLip.y) / 2;

        // measure the opening between the lips
        let mouthDistance = dist(
            topLip.x, topLip.y,
            bottomLip.x, bottomLip.y
        );

        // measuring the width between mouth corner
        let mouthWidth = dist(
            leftCorner.x, leftCorner.y,
            rightCorner.x, rightCorner.y
        );

        // compares mouth opening to mouth width
        if (mouthDistance > mouthWidth * 0.18) {
            mouthOpen = true;
        }

        // start the game when a face is detected
        // make sure to only start the game once
        if (gameStarted === false) {
            gameStarted = true;
            startTime = millis();
            lastFoodTime = millis();
            addFood();
        }


        // draw only the mouth mesh points
        let lips = face.lips.keypoints;
        noStroke();
        fill(0, 255, 255);
        for (let i = 0; i < lips.length; i++) {
            let point = lips[i];
            circle(width - point.x, point.y, 4);
        }

        // draw the mouth corners and inner lip points
        circle(width - leftCorner.x, leftCorner.y, 8);
        circle(width - rightCorner.x, rightCorner.y, 8);
        circle(width - topLip.x, topLip.y, 8);
        circle(width - bottomLip.x, bottomLip.y, 8);
    }


    // count down from 30 seconds
    let timeLeft = 30;
    let foodSpeed = 3;
    let foodDelay = 1300;

    if (gameStarted) {
        let elapsedTime = (millis() - startTime) / 1000;
        timeLeft = 30 - floor(elapsedTime);

        // keeps timer from going below 0
        if (timeLeft < 0) {
            timeLeft = 0;
        }

        // food falls faster and appears more often over time
        // difficulty increases every 10 seconds
        if (elapsedTime < 10) {
            foodSpeed = 3;
            foodDelay = 1300;

        } else if (elapsedTime < 20) {
            foodSpeed = 5;
            foodDelay = 900;

        } else {
            foodSpeed = 7;
            foodDelay = 600;
        }
    }


    // food only falls when the game is started and time is left
    if (gameStarted && timeLeft > 0) {

        // Add new food after a certain amount of time
        if (millis() - lastFoodTime > foodDelay) {
            addFood();
            lastFoodTime = millis();
        }

        // move and draw each piece of food
        for (let i = foods.length - 1; i >= 0; i--) {
            let food = foods[i];
            food.y += foodSpeed;
            drawFood(food);

            // catch food if it reaches an open mouth
            if (mouthOpen &&
                abs(food.x - mouthX) < 30 &&
                abs(food.y - mouthY) < 25) {
                score++;
                foods.splice(i, 1);

            // remove food that falls off the screen
            } else if (food.y > height + 25) {
                foods.splice(i, 1);
            }
        }
    }
    // score and timer
    fill(255);
    noStroke();
    rect(12, 12, 160, 67);

    fill(0);
    textSize(20);
    text("Score: " + score, 22, 39);
    text("Time: " + timeLeft, 22, 66);

    // instructions when no face is detected
    if (faces.length === 0 && timeLeft > 0) {
        fill(255);
        noStroke();
        rect(245, 490, 310, 65);

        fill(0);
        textSize(25);

        if (gameStarted === false) {
            text("Show your face to begin!", 260, 530);
        } else {
            text("No face detected!", 290, 530);
        }
    }

    // game over message
    if (gameStarted && timeLeft === 0) {
        fill(255);
        noStroke();
        rect(190, 240, 420, 110);

        push();
        fill(34, 34, 34);
        textAlign(CENTER);

        textSize(24);
        text("Game Over! Yummy isn't it?", width / 2, 285);

        textSize(18);
        text("Press R to restart", width / 2, 320);
        pop();
    }
}

// add an apple or pizza at a random position
function addFood() {
    let food = {
        x: random(150, width - 150),
        y: -30,
        type: floor(random(2))
    };
    foods.push(food);
}

// draw apple and pizza
function drawFood(food) {
    noStroke();

    if (food.type === 0) {
        // apple
        fill(230, 50, 60);
        circle(food.x, food.y, 34);
        // stem of apple
        fill(50, 150, 60);
        rect(food.x, food.y - 23, 5, 10);

    } else {

        // pizzuh
        fill(255, 210, 80);
        triangle(
            food.x, food.y + 20,
            food.x - 21, food.y - 17,
            food.x + 21, food.y - 17
        );
        // pepperoni
        fill(230, 60, 60);
        circle(food.x - 8, food.y - 6, 8);
        circle(food.x + 7, food.y + 2, 8);
    }
}

function gotFaces(results) {
    faces = results;
}
function keyPressed() {
    if (key === "r" || key === "R") {
        score = 0;
        foods = [];
        gameStarted = false;
    }
}