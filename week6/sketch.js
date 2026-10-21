/* Michelle Huang
 * Creative Coding - Clocks
 * Taro Time
 */

// food pellets = hours
// water droplets in the bowl = minutes
// water droplets from the faucet = seconds

function setup() {
    createCanvas(1120, 600);
    frameRate(30);
    textFont('Fredoka');
    textAlign(CENTER, CENTER);
}


function draw() {
    // gets the current hour, minute, and second
    let h = hour();
    let m = minute();
    let s = second();

    // % gives the remainder after dividing by 12
    // changes 24-hour time into 12-hour time for the food bowl
    let pellets = h % 12;

    // midnight and noon would give 0, so change it to 12
    if (pellets === 0) {
        pellets = 12;
    }

    // converts the minutes and seconds into part of an hour
    // this lets the sky change gradually instead of every hour
    let currentTime = h + m / 60 + s / 3600;

    // checks if it is between 8pm and 6am
    let nightTime = h >= 20 || h < 6;

    // draws each part of the scene
    drawSky(currentTime);
    drawGrass(currentTime);
    drawFaucet();
    drawTaro(nightTime);
    drawFoodBowl(pellets);
    drawWaterBowl(m);
    drawStream(s, nightTime);
}


// mixes two colors together using a number from 0 to 1
// 0 uses the first color and 1 uses the second color
function blendColors(a, b, amount) {
    // each array stores the red, green, and blue values
    let r = a[0] + (b[0] - a[0]) * amount;
    let g = a[1] + (b[1] - a[1]) * amount;
    let blue = a[2] + (b[2] - a[2]) * amount;

    return [r, g, blue];
}


function drawSky(t) {
    // RGB colors for different times of day
    let night = [28, 39, 75];
    let sunrise = [247, 174, 144];
    let day = [137, 200, 238];
    let sunset = [239, 150, 133];
    let sky;

    // shifts between night, sunrise, daytime, and sunset
    if (t < 5.5) {
        sky = night;
    } else if (t < 7.5) {
        // map changes the time into a value between 0 and 1
        sky = blendColors(night, sunrise, map(t, 5.5, 7.5, 0, 1));
    } else if (t < 10) {
        sky = blendColors(sunrise, day, map(t, 7.5, 10, 0, 1));
    } else if (t < 17) {
        sky = day;
    } else if (t < 19) {
        sky = blendColors(day, sunset, map(t, 17, 19, 0, 1));
    } else if (t < 21) {
        sky = blendColors(sunset, night, map(t, 19, 21, 0, 1));
    } else {
        sky = night;
    }

    // gets the RGB values from the sky array
    background(sky[0], sky[1], sky[2]);
    noStroke();

    if (t >= 6 && t < 19) {
        // map moves the sun from left to right
        let sunX = map(t, 6, 19, 75, 710);

        // sin creates the curved path of the sun
        let sunY = 175 - 90 * sin(map(t, 6, 19, 0, PI));

        fill(255, 220, 150);
        ellipse(sunX, sunY, 58, 58);
    } else {
        // two overlapping circles make the crescent moon
        fill(248, 240, 213);
        ellipse(100, 140, 48, 48);

        // covers part of the circle using the sky color
        fill(sky[0], sky[1], sky[2]);
        ellipse(115, 130, 45, 45);
    }
}


function drawGrass(t) {
    let light = 0.2;

    // light goes from 0.2 to 1 as the grass gets brighter
    // grass gets brighter during the day and darker at night
    if (t >= 6 && t < 9) {
        light = map(t, 6, 9, 0.2, 1);
    } else if (t >= 9 && t < 17) {
        light = 1;
    } else if (t >= 17 && t < 21) {
        light = map(t, 17, 21, 1, 0.2);
    }

    // light changes the RGB values of the grass
    noStroke();
    fill(40 + 90 * light, 75 + 110 * light, 35 + 55 * light);
    rect(0, 455, width, 145);

    // short bent lines for the grass texture
    stroke(25 + 65 * light, 60 + 75 * light, 25 + 30 * light);
    strokeWeight(1.5);

    // the outer loop moves down the grass
    // the inner loop draws blades across each row
    for (let y = 463; y < height; y += 16) {
        for (let x = 8; x < width; x += 17) {
            // % changes the positions slightly so they are not even
            let offset = (x + y) % 11;
            let grassX = x + offset;
            let grassY = y + offset / 2;
            let grassHeight = 8 + (x % 9);

            // two connected lines make a bent grass blade
            line(grassX, grassY, grassX - 2, grassY - grassHeight / 2);
            line(grassX - 2, grassY - grassHeight / 2,
                    grassX + 1, grassY - grassHeight);
        }
    }

    noStroke();
}


function drawFaucet() {
    noStroke();

    // vertical pipe
    fill(99, 115, 122);
    rect(830, 160, 24, 326, 5);

    // arm and water outlet
    rect(748, 183, 86, 24, 5);
    rect(752, 198, 20, 34, 5);

    fill(188, 198, 199);
    rect(750, 228, 24, 10, 4);

    // highlights down the pipe
    fill(160, 176, 180);
    rect(836, 160, 10, 326);

    fill(188, 198, 199);
    rect(840, 160, 4, 326);

    // faucet handle
    fill(99, 115, 122);
    rect(815, 157, 54, 12, 4);

    fill(188, 198, 199);
    ellipse(842, 163, 20, 20);
}


function drawStream(seconds, nightTime) {
    noStroke();

    // 60 droplets under the faucet, 6 across and 10 down
    // filled droplets show how many seconds have passed
    for (let i = 0; i < 60; i += 1) {
        // % repeats the columns from 0 to 5
        // floor divides the droplets into rows
        let col = i % 6;
        let row = floor(i / 6);

        // sin makes the droplets move slightly back and forth
        let move = sin(millis() / 400 + row * 0.5) * 1.5;

        // each column and row changes the droplet position
        let x = 732 + col * 12 + move;
        let y = 248 + row * 18;

        // droplets change color depending on the second
        // the colors also change between day and night
        if (i < seconds) {
            if (nightTime) {
                fill(120, 231, 252);
            } else {
                fill(23, 112, 159);
            }
        } else {
            if (nightTime) {
                fill(100, 142, 171);
            } else {
                fill(199, 229, 234);
            }
        }

        // triangle and ellipse make one water droplet
        triangle(x, y - 5, x - 4, y + 1, x + 4, y + 1);
        ellipse(x, y + 2, 8, 9);
    }
}


function drawTaro(nightTime) {
    // millis tracks how long the sketch has been running
    // sin makes the breathing and tail wag repeat smoothly
    let breathe = sin(millis() / 650) * 3;
    let wag = sin(millis() / 180) * 12;

    // stops the tail from wagging at night
    if (nightTime) {
        wag = 0;
    }

    noStroke();

    // blanket
    fill(185, 153, 124);
    ellipse(244, 515, 245, 47);
    fill(224, 189, 155);
    ellipse(244, 507, 225, 30);

    // tail moves up and down using wag
    fill(157, 91, 52);
    ellipse(322, 422 + wag, 44, 32);

    // breathe slightly changes the body size
    fill(183, 110, 67);
    ellipse(244, 427, 135 + breathe, 150 + breathe);

    // bigger overlapping circles make the fur look fluffy
    ellipse(199, 392, 51, 53);
    ellipse(188, 422, 52, 55);
    ellipse(194, 454, 51, 53);
    ellipse(218, 477, 52, 49);
    ellipse(252, 481, 53, 49);
    ellipse(283, 467, 51, 52);
    ellipse(300, 435, 51, 53);
    ellipse(291, 401, 52, 53);

    // darker front legs
    fill(145, 80, 47);
    ellipse(212, 466, 35, 65);
    ellipse(277, 466, 35, 65);

    // fluffy paws
    fill(157, 91, 52);
    ellipse(210, 491, 43, 34);
    ellipse(278, 491, 43, 34);
    ellipse(197, 493, 22, 25);
    ellipse(222, 493, 23, 25);
    ellipse(265, 493, 22, 25);
    ellipse(291, 493, 23, 25);

    // curly ears
    fill(133, 73, 42);
    ellipse(177, 307, 48, 51);
    ellipse(172, 333, 53, 53);
    ellipse(178, 359, 49, 48);
    ellipse(299, 307, 48, 51);
    ellipse(305, 333, 53, 53);
    ellipse(299, 359, 49, 48);

    // face
    fill(183, 110, 67);
    ellipse(238, 327, 116, 116);

    // fluffy top of head
    fill(190, 119, 75);
    ellipse(201, 284, 44, 43);
    ellipse(219, 272, 42, 43);
    ellipse(240, 267, 45, 46);
    ellipse(262, 274, 43, 44);
    ellipse(280, 290, 39, 43);

    // fluffy bottom half of the face
    fill(198, 130, 83);
    ellipse(238, 356, 98, 67);

    // cheeks and chin
    fill(204, 139, 91);
    ellipse(201, 354, 43, 45);
    ellipse(222, 373, 48, 43);
    ellipse(254, 373, 48, 43);
    ellipse(275, 354, 43, 45);

    // snout
    fill(211, 149, 103);
    ellipse(238, 358, 53, 43);

    // eyes close at night and open during the day
    if (nightTime) {
        stroke(69, 44, 37);
        strokeWeight(4);
        line(207, 325, 222, 325);
        line(255, 325, 270, 325);
        noStroke();
    } else {
        fill(55, 38, 32);
        ellipse(216, 325, 11, 13);
        ellipse(260, 325, 11, 13);
    }

    // nose
    fill(63, 42, 35);
    ellipse(238, 348, 19, 14);

    // mouth
    stroke(105, 63, 53);
    strokeWeight(3);
    noFill();
    arc(238, 365, 20, 13, 0, PI);
    noStroke();
}


function drawFoodBowl(pellets) {
    noStroke();

    // rectangle and ellipse make the rounded bowl
    fill(167, 105, 94);
    rect(385, 460, 210, 45);
    ellipse(490, 505, 210, 60);

    // rim and inside of the food bowl
    fill(192, 131, 115);
    ellipse(490, 458, 210, 62);
    fill(235, 192, 157);
    ellipse(490, 458, 187, 46);

    // two arrays store the x and y positions of 12 pellets
    // the kibble has different positions instead of even rows
    let kibbleX = [434, 478, 518, 552,
                    449, 488, 530, 566,
                    428, 465, 503, 541];

    let kibbleY = [447, 443, 448, 452,
                    461, 457, 461, 463,
                    472, 472, 474, 473];

    // each pellet represents one hour on a 12-hour clock
    for (let i = 0; i < pellets; i += 1) {
        // i gets the matching position from both arrays
        let x = kibbleX[i];
        let y = kibbleY[i];

        // % gives the pellets slightly different sizes
        let pelletW = 17 + (i % 3) * 2;
        let pelletH = 10 + (i % 2) * 3;

        fill(119, 74, 42);
        ellipse(x, y, pelletW, pelletH);

        // smaller ellipse adds a lighter part to the kibble
        fill(152, 102, 58);
        ellipse(x - 2, y - 2, pelletW / 2, pelletH / 2);
    }

    // bowl label
    fill(255, 237, 220);
    textSize(18);
    textStyle(BOLD);
    text('Food', 490, 510);
}


function drawWaterBowl(minutes) {
    noStroke();

    // rectangle and ellipse make the rounded bowl
    fill(72, 145, 166);
    rect(630, 460, 270, 45);
    ellipse(765, 505, 270, 60);

    // rim and water
    fill(122, 184, 202);
    ellipse(765, 458, 270, 62);
    fill(187, 224, 227);
    ellipse(765, 458, 235, 58);

    // each number tells how many droplets are in that row
    // all seven rows add up to 60 droplets
    let rowCounts = [6, 8, 10, 12, 10, 8, 6];

    // keeps track of how many droplets have been drawn
    let count = 0;

    // outer loop moves through the rows
    for (let row = 0; row < rowCounts.length; row += 1) {
        // inner loop draws the number of droplets in each row
        for (let col = 0; col < rowCounts[row]; col += 1) {
            // centers each row and spaces out the droplets
            let x = 765 + (col - (rowCounts[row] - 1) / 2) * 17;
            let y = 436 + row * 7;

            // darker droplets show the minutes that have passed
            if (count < minutes) {
                fill(12, 87, 130);
            } else {
                fill(83, 145, 170);
            }

            noStroke();

            // triangle and ellipse make one water droplet
            triangle(x, y - 3, x - 3, y + 1, x + 3, y + 1);
            ellipse(x, y + 1, 6, 6);

            // adds one to the count after drawing each droplet
            count += 1;
        }
    }

    // bowl label
    fill(235, 249, 250);
    textSize(18);
    textStyle(BOLD);
    text('Water', 765, 510);
}