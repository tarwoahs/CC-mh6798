/*
    Michelle Huang
    Data Visualization / Data Portraiture
    Certified Rotten %

    data source: https://ghibliapi.vercel.app/films
*/

let url = "https://ghibliapi.vercel.app/films";
let dataObject; // stores api data
let films = []; // stores the movie info
let posters = []; // stores the loaded poster images
let selectedFilm = 0; // index of the currently selected movie

// pos and size
let posterX = 360;
let posterY = 105;
let posterW = 240;
let posterH = 360;

let tomatoes = [];
let landed = 0; // counts # tomatoes landed
let throwStart = 0; // frame the animation starts
let throwing = false; // keeps track animation run

let booSound;
let splatSound;
let cheerSound;
let nextSplatTime = 0; //tracking next splat sound can play

let visibleFilms = 9; // number of movies shown on the timeline
let loadingError = false; // api failed to load check

async function setup() {
    createCanvas(960, 700);
    textFont("Arial, sans-serif");
    frameRate(60);

    // getting the movie data from the api
    try {
        dataObject = await loadJSON(url); 
        films = Object.values(dataObject); // data -> array

        // movie sort old - new
        films.sort(function(a, b) {
            // convert the release years to numbers and comparing
            return Number(a.release_date) - Number(b.release_date);
        });

        console.log(films); // look movie data in the console
        selectFilm(0); // start with the first movie

    } catch (error) {
        console.log(error);
        loadingError = true;
    }

    // sound effect
    loadBoo();
    loadSplat();
    loadCheer();
}

function draw() {
    drawWall();
    drawHeader();

    // display a message if the movie array is still empty
    if (films.length === 0) {
        fill(70);
        textAlign(CENTER, CENTER);
        textSize(18);

        if (loadingError) {
            text("Not able to load movie data", width / 2, height / 2);
        } else {
            text("Loading movies at the moment...", width / 2, height / 2);
        }
        return; // dont draw until data available
    }

    drawGallery();
    drawTomatoes();
    drawFilmInfo();
    drawTimeline();
    drawDescription();
}
function drawWall() {
    background(216); // light gray bg
}

function drawHeader() {
    noStroke();
    textAlign(CENTER, CENTER);
    fill(50);
    textSize(34);
    textStyle(BOLD);
    text("Studio Ghibli", width / 2, 35);
    fill(175, 55, 45);
    textSize(18);
    textStyle(NORMAL);
    text("Certified Rotten %", width / 2, 68);
}

// load the movie posters from the api
async function loadPoster(index) {
    // check if the movie index is outside the array
    if (index < 0 || index >= films.length) {
        return;
    }
    // don't load the same poster again if it already exists
    if (posters[index]) {
        return;
    }
    posters[index] = "loading"; // temp value while the image loads
    let imageURL = films[index].image; // get the image url from the movie data

    // earwig's poster from the api bc image doesn't load
    if (films[index].title === "Earwig and the Witch") {
        imageURL = "assets/earwig.jpg";
    }
    try {
        // wait for the image to load and store it at the same index as the movie
        posters[index] = await loadImage(imageURL);
    } catch (error) {
        posters[index] = "unavailable"; // image not here mark if it fails
        console.log(error);
    }
}

function selectFilm(index) {
    // prevents going past the first or last movie
    if (index < 0 || index >= films.length) {
        return;
    }
    selectedFilm = index; // update the selected movie

    // reset tomatoes when switching movies
    tomatoes = [];
    landed = 0;
    throwing = false;
    nextSplatTime = 0;

    // stop sounds from the other movie if they are still playing
    if (booSound) {
        booSound.stop();
    }
    if (splatSound) {
        splatSound.stop();
    }
    if (cheerSound) {
        cheerSound.stop();
    }
    // load the center poster and the two posters next to it
    loadPoster(selectedFilm);
    loadPoster(selectedFilm - 1); // prev movie
    loadPoster(selectedFilm + 1); // next movie
}

function drawGallery() {
    // prev movie on the left if there is
    if (selectedFilm > 0) {
        drawFrame(selectedFilm - 1, 100, 175, 150, 225);
    }
    // next movie on the right if there is
    if (selectedFilm < films.length - 1) {
        drawFrame(selectedFilm + 1, 710, 175, 150, 225);
    }
    // curr movie main poster dimensions
    drawFrame(selectedFilm, posterX, posterY, posterW, posterH);
}

// reusable function for drawing each picture frame
// index determines the movie and x, y, w, h determine its position and size
function drawFrame(index, x, y, w, h) {
    noStroke();

    // frame shadow
    fill(0, 25);
    rect(x - 6, y - 4, w + 28, h + 28);

    // outer frame
    fill(45);
    rect(x - 14, y - 14, w + 28, h + 28);

    // inner frame
    fill(85);
    rect(x - 9, y - 9, w + 18, h + 18);

    // white border
    fill(245);
    rect(x - 5, y - 5, w + 10, h + 10);

    // check if the poster exists, isn't loading, isn't unavailable
    // && true conditions for all
    if (posters[index] &&
        posters[index] !== "loading" &&
        posters[index] !== "unavailable") {

        image(posters[index], x, y, w, h);

    } else {
        // gray placeholder if the poster hasn't loaded
        fill(180);
        rect(x, y, w, h);
        fill(70);
        textAlign(CENTER, CENTER);
        textSize(12);
        if (posters[index] === "unavailable") {
            text("Poster is unavailable", x + w / 2, y + h / 2);
        } else {
            text("Loading poster...", x + w / 2, y + h / 2);
        }
    }
}

// rotten tomatoes % of the curr movie
function getScore() {
    let rating = films[selectedFilm].rt_score; // access the rating from the api

    // check if the rating is missing or empty
    if (rating === undefined || rating === null || rating === "") { // either or condition true
        return -1; //unavailable rating
    }
    // the rating from the api is a string, so convert it to a number
    let score = Number(rating);

    // check if the score is not a number or outside the range of 0 to 100
    if (isNaN(score) || score < 0 || score > 100) {
        return -1;
    }
    return round(score); // return the score as a whole number
}

function drawFilmInfo() {
    let film = films[selectedFilm]; // curr selected movie
    let score = getScore(); // number rating

    noStroke();
    textAlign(CENTER, CENTER);

    // title
    fill(45);
    textSize(28);
    textStyle(BOLD);
    text(film.title, width / 2, 505);

    // release year
    fill(90);
    textSize(18);
    textStyle(NORMAL);
    text(film.release_date, width / 2, 533);

    // rotten tomatoes rating
    fill(170, 45, 35);
    textSize(19);

    // only display the percentage if the rating is valid, if not unavailable msg
    if (score >= 0) {
        text("Rotten Tomatoes: " + score + "%", width / 2, 560);
    } else {
        text("Rating unavailable", width / 2, 560);
    }
    // count how many tomatoes have splat
    fill(80);
    textSize(14);

    if (throwing) {
        // display the curr count out of the total during the animation
        text(landed + " / " + score + " tomatoes", width / 2, 585);
    } else if (tomatoes.length > 0) {
        // display the final count when the animation is done
        text(landed + " tomatoes thrown", width / 2, 585);
    }
}

function throwTomatoes() {
    // prevents throwing if the animation is already running
    if (throwing) {
        return;
    }
    let score = getScore();
    // no tomato throwing
    if (score <= 0) {
        return;
    }

    // reset the prev animation
    tomatoes = [];
    landed = 0;
    throwing = true;
    throwStart = frameCount; // remember which frame the animation started on
    nextSplatTime = 0;

    // more tomatoes = high rating
    // loop based on the rating
    for (let i = 0; i < score; i++) {

        // push adds a new tomato object to the array
        tomatoes.push({
            startX: random(60, width - 60),
            startY: random(500, 580),

            // random spots for the tomatoes to land on the poster
            // there is extra 10 pixels keep the landing positions away from the edges
            targetX: random(posterX + 10, posterX + posterW - 10),
            targetY: random(posterY + 10, posterY + posterH - 10),

            size: random(24, 40), // tomato size range
            angle: random(TWO_PI), // random angle for rotation and splat orientation

            // each tomato is thrown 3 frames after prev one
            delay: i * 3,
            hit: false // make sure tomato has landed
        });
    }
    // browsers require user click before allowing audio to play
    if (booSound || splatSound || cheerSound) {
        userStartAudio();
    }
    // stop sounds that might still be playing from the previous animation
    if (splatSound) {
        splatSound.stop();
    }
    if (cheerSound) {
        cheerSound.stop();
    }
    // restart booing sound tomatoes thrown
    if (booSound) {
        booSound.stop();
        booSound.play();
    }
}

function drawTomatoes() {
    // map ratings from 0-100 to a delay of 800-300 milliseconds
    // high ratings have a shorter delay between splat sounds
    let soundDelay = map(getScore(), 0, 100, 800, 300);

    // loop through every tomato in the array
    for (let i = 0; i < tomatoes.length; i++) {
        let t = tomatoes[i];

        // splat tomatoes land stay 
        if (t.hit) {
            drawSplat(t.targetX, t.targetY, t.size, t.angle);
            continue; // skip the movement and go to the next tomato
        }

        // calculate how many frames have passed since this tomato's turn
        let age = frameCount - throwStart - t.delay;

        // a negative age means it's not this tomato's turn yet
        if (age < 0) {
            continue;
        }

        // each tomato takes 22 frames to reach the poster
        // constrain keeps progress between 0 and 1
        let progress = constrain(age / 22, 0, 1);

        // map the tomato's starting position to its landing position
        let x = map(progress, 0, 1, t.startX, t.targetX);
        let y = map(progress, 0, 1, t.startY, t.targetY);

        // sin makes the tomato move in a curve instead of a straight line
        y -= sin(progress * PI) * 85; // high curve

        // make the tomato be smaller to 55 so its looks like its going further
        let size = map(progress, 0, 1, t.size, t.size * 0.55);

        // 1, tomato has reached the poster
        if (progress >= 1) {
            t.hit = true; // mark this tomato as landed
            landed++; // increase the counter by 1

            drawSplat(t.targetX, t.targetY, t.size, t.angle);

            // millis tracks the time start
            // only play another splat sound if enough time has passed
            if (splatSound && millis() >= nextSplatTime) {
                splatSound.stop(); // stops to stop overlapping sounds
                splatSound.play();

                // next splat sound is allowed to play
                nextSplatTime = millis() + soundDelay;
            }

        } else {
            // moving tomato full rotation during flight
            drawTomato(x, y, size, t.angle + progress * TWO_PI);
        }
    }

    // check if all the tomatoes have landed
    if (throwing && landed === tomatoes.length) {
        throwing = false; // end the animation and allow another throw

        // cheer at the end if the movie has a rating above 90%
        if (getScore() > 90 && cheerSound) {
            if (booSound) {
                booSound.stop();
            }
            cheerSound.play();
        }
    }
}

// tomato time
function drawTomato(x, y, size, angle) {
    push(); // save the current drawing settings
    translate(x, y); 
    rotate(angle);
    noStroke();

    // body
    fill(237, 81, 67);
    ellipse(0, 0, size, size * 0.85);

    // stem
    fill(128, 85, 44);
    rect(-size * 0.035, -size * 0.55, size * 0.07, size * 0.25);

    // leaves
    fill(80, 141, 72);

    // left leaf rotated slightly
    push();
    translate(-size * 0.14, -size * 0.36);
    rotate(0.4);
    ellipse(0, 0, size * 0.4, size * 0.14);
    pop();

    // right leaf rotated
    push();
    translate(size * 0.14, -size * 0.36);
    rotate(-0.4);
    ellipse(0, 0, size * 0.4, size * 0.14);
    pop();

    // eyes
    fill(40);
    circle(-size * 0.2, 0, size * 0.15);
    circle(size * 0.2, 0, size * 0.15);

    // blush
    fill(255, 170, 160);
    circle(-size * 0.32, size * 0.12, size * 0.12);
    circle(size * 0.32, size * 0.12, size * 0.12);

    // happy face
    noFill();
    stroke(40);
    strokeWeight(size * 0.04);
    arc(0, size * 0.08, size * 0.16, size * 0.18, 0, PI);
    pop(); // restore the drawing settings
}

function drawSplat(x, y, size, angle) {
    push();
    translate(x, y); // landing position
    noStroke();

    // make the landed tomatoes 80% of their original size
    size *= 0.8;
    // create a rounded splat
    fill(237, 81, 67);

    push();
    rotate(angle); // each splat diff rotation

    for (let i = 0; i < 6; i++) {
        push();

        // divide a full rotation into 6 equal sections
        rotate(i * TWO_PI / 6);
        ellipse(size * 0.32, 0, size * 0.52, size * 0.27);

        pop();
    }

    pop(); // remove the rotation so the face stays upright

    // center of the splat
    ellipse(0, 0, size * 0.85, size * 0.68);

    // keep the stem and leaves so it still looks like a tomato
    fill(128, 85, 44);
    rect(-size * 0.035, -size * 0.44, size * 0.07, size * 0.2);

    fill(80, 141, 72);
    ellipse(-size * 0.13, -size * 0.3, size * 0.36, size * 0.12);
    ellipse(size * 0.13, -size * 0.3, size * 0.36, size * 0.12);

    // wide eyes when the tomato hits the poster
    fill(255);
    circle(-size * 0.2, -size * 0.04, size * 0.21);
    circle(size * 0.2, -size * 0.04, size * 0.21);

    // pupils
    fill(40);
    circle(-size * 0.2, -size * 0.04, size * 0.08);
    circle(size * 0.2, -size * 0.04, size * 0.08);

    // blush
    fill(255, 170, 160);
    circle(-size * 0.32, size * 0.12, size * 0.12);
    circle(size * 0.32, size * 0.12, size * 0.12);

    // shocked face with an open mouth
    fill(40);
    ellipse(0, size * 0.13, size * 0.13, size * 0.16);
    pop();
}

// first visible movie
function timelineStart() {

    // subtract half movies keep the movie that is picked near the center
    // floor rounds down to a whole number
    return constrain(
        selectedFilm - floor(visibleFilms / 2), 0, // stops the timeline from going before the first movie
        // stops the timeline from going past the last movie
        max(0, films.length - visibleFilms)
    );
}

function drawTimeline() {
    stroke(140); //line
    strokeWeight(1);
    line(112, 625, 848, 625);
    let start = timelineStart();
    // loop through the 9 visible movie positions
    for (let i = 0; i < visibleFilms; i++) {
        // get the actual movie index
        let index = start + i;
        // stop the loop if there are no more movies
        if (index >= films.length) {
            break;
        }

        let x = 112 + i * 92; // space each circle 92 pixels apart
        let y = 625;
        noStroke();

        // make the movie's circle bigger and red
        if (index === selectedFilm) {
            fill(175, 45, 35);
            circle(x, y, 18);
        } else {
            fill(145);
            circle(x, y, 10);
        }
        // year underneath each circle
        fill(70);
        textAlign(CENTER, CENTER);
        textSize(14);
        text(films[index].release_date, x, 650);

        // dist how far the mouse is from the circle
        // show the movie title if its within 16 pixels
        if (dist(mouseX, mouseY, x, y) < 16) {
            textSize(13);
            text(films[index].title, width / 2, 605);
        }
    }
    // left and right <>
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(30);
    // gray out the left arrow if 1st movie
    if (selectedFilm === 0) {
        fill(175);
    } else {
        fill(70);
    }
    text("<", 40, 625);
    // gray out the right arrow if last movie
    if (selectedFilm === films.length - 1) {
        fill(175);
    } else {
        fill(70);
    }
    text(">", 920, 625);
}

function drawDescription() {
    noStroke();
    fill(95);
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    textSize(13);
    text(
        "Explore Studio Ghibli films and their Rotten Tomatoes ratings over the years.",
        width / 2, 675
    );
    text(
        "The higher the rating, the more tomatoes are thrown. Movies rated above 90% receive a round of applause after.",
        width / 2, 691
    );
}

function mousePressed() {
    if (films.length === 0) {
        return;
    }
    // mouse in the center poster's boundaries check
    // mouseX checks the horizontal position 
    // mouseY checks the vertical position
    if (mouseX > posterX && mouseX < posterX + posterW &&
        mouseY > posterY && mouseY < posterY + posterH) {
        throwTomatoes();
        return;
    }
    // left poster click in order to go to the previous movie
    if (mouseX > 100 && mouseX < 250 &&
        mouseY > 175 && mouseY < 400) {
        selectFilm(selectedFilm - 1);
        return;
    }
    // click the right poster in order to go to the next movie
    if (mouseX > 710 && mouseX < 860 &&
        mouseY > 175 && mouseY < 400) {
        selectFilm(selectedFilm + 1);
        return;
    }
    // check if mouse is within the timeline area
    if (mouseY > 610 && mouseY < 662) {
        // <
        if (mouseX > 15 && mouseX < 75) {
            selectFilm(selectedFilm - 1);
            return;
        }
        // >
        if (mouseX > 885 && mouseX < width) {
            selectFilm(selectedFilm + 1);
            return;
        }
        let start = timelineStart();

        // loop through the visible movie circles
        for (let i = 0; i < visibleFilms; i++) {
            let x = 112 + i * 92; // drawTimeline circle

            // abs gets the pos distance between the mouse and the circle
            // allows clicking within 22 pixels on either side
            if (abs(mouseX - x) < 22) {
                // add the visible position start movie index
                selectFilm(start + i);
                return;
            }
        }
    }
}
async function loadBoo() {
    try {
        booSound = await loadSound("assets/boo.wav");
        booSound.amp(0.18); // lower the volume too loud
    } catch (error) {
        booSound = undefined; // sound left unavailable fail loading
        console.log("Boo sound unavailable");
    }
}
async function loadSplat() {
    try {
        splatSound = await loadSound("assets/splat.wav");
        // lower volume if too loud with mutliple tomatoes thrown
        splatSound.amp(0.04);
    } catch (error) {
        splatSound = undefined;
        console.log("Splat sound unavailable");
    }
}
async function loadCheer() {
    try {
        cheerSound = await loadSound("assets/cheer.wav");
        cheerSound.amp(0.18);
    } catch (error) {
        cheerSound = undefined;
        console.log("Cheer sound unavailable");
    }
}