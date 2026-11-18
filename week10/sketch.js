/*
    Michelle Huang
    Kirby's Musical Dreamland
    Option 2 - Audio Visualizer
*/

// sound
let song, amplitude, fft;
let songName = "Drop an MP3 Onto Kirby!";
let dragging = false;
let loading = false;
let eatingFrames = 0;

// music measurements
let volume = 0, bass = 0, mids = 0, treble = 0;
let flight = 0, beat = 0, bassAverage = 0, rhythm = 0;

// track recent changes in the song
let lastBeat = -100, lastAccent = -100;
let averageChange = 0;
let recentHits = [];
let haloHeights = [];

// sliders and buttons
let flightSlider, haloSlider, starSlider;
let flightValue, haloValue, starValue;
let playButton, restartButton;
let floatPower = 85, haloPower = 80, starPower = 70;

async function setup() {
    let canvas = createCanvas(800, 520);
    canvas.parent("sketch-holder");

    // drag and drop a song onto kirby
    canvas.dragOver(() => dragging = true);
    canvas.dragLeave(() => dragging = false);
    canvas.drop(loadSong, playEatSound);
    canvas.mousePressed(togglePlay);

    // sound analyzers
    amplitude = new p5.Amplitude();
    fft = new p5.FFT(256);

    // play and restart buttons
    playButton = createButton("Play");
    playButton.parent("play-control");
    playButton.mousePressed(togglePlay);

    restartButton = createButton("Restart");
    restartButton.parent("restart-control");
    restartButton.mousePressed(restartSong);

    // sliders for performing the visuals
    flightSlider = createSlider(0, 100, 85, 5);
    flightSlider.parent("flight-slider");

    haloSlider = createSlider(0, 100, 80, 5);
    haloSlider.parent("halo-slider");

    starSlider = createSlider(0, 100, 70, 5);
    starSlider.parent("star-slider");

    flightValue = select("#flight-value");
    haloValue = select("#halo-value");
    starValue = select("#star-value");

    textFont("Comic Sans MS");
}

// play a nom sound when a file is dropped
function playEatSound() {
    dragging = false;
    eatingFrames = 35;
    userStartAudio();

    let gulp = new p5.Oscillator(450, "triangle");
    gulp.amp(0);
    gulp.start();
    gulp.amp(0.16, 0.02);
    gulp.freq(115, 0.18);

    // fade out the sound
    setTimeout(() => gulp.amp(0, 0.08), 90);
    setTimeout(() => gulp.stop(), 230);
}

// load the song kirby eats
async function loadSong(file) {
    if (file.type !== "audio") {
        songName = "Please Drop an MP3 File";
        return;
    }

    if (song) song.stop();
    song = null;
    loading = true;
    eatingFrames = 35;
    songName = "Kirby is Eating Your Song...";

    // start fresh w the new song
    volume = bass = mids = treble = flight = beat = 0;
    bassAverage = rhythm = averageChange = 0;
    recentHits = [];
    haloHeights = [];
    lastBeat = lastAccent = -100;

    try {
        song = await loadSound(file.data);
        song.connect(amplitude);
        song.connect(fft);
        songName = file.name;
        eatingFrames = 25;

    } catch (error) {
        console.error(error);
        songName = "Could Not Load The Audio File";
    }

    loading = false;
}

// play or pause the music
function togglePlay() {
    if (!song ||loading) return;
    userStartAudio();

    if (song.isPlaying()) song.pause();
    else song.play();
}

// play the song again from the beginning
function restartSong() {
    if (!song || loading) return;
    userStartAudio();
    song.stop();
    song.play();
}

// keyboard controls that update the sliders
function keyPressed() {
    let k = key.toLowerCase();

    if (k=== "q") flightSlider.value(constrain(flightSlider.value()+ 10, 0, 100));
    if (k=== "a") flightSlider.value(constrain(flightSlider.value() - 10, 0, 100));

    if (k === "w") haloSlider.value(constrain(haloSlider.value()+ 10, 0, 100));
    if (k === "s") haloSlider.value(constrain(haloSlider.value() - 10, 0, 100));

    if (k === "e") starSlider.value(constrain(starSlider.value()+ 10, 0, 100));
    if (k === "d") starSlider.value(constrain(starSlider.value() - 10, 0, 100));

    if (k === " ") togglePlay();
    if (k === "r") restartSong();

    if (k === " ") return false;
}

// measure energy in part of the frequency spectrum
function bandEnergy(spectrum, lowHz, highHz) {
    let nyquist = getAudioContext().sampleRate / 2;
    let low = floor(lowHz / nyquist * spectrum.length);
    let high = min(spectrum.length - 1, ceil(highHz / nyquist * spectrum.length));
    let total = 0;

    for (let i = low; i <= high; i++) {
        total += spectrum[i];
    }
    let average = total / (high - low + 1);
    return constrain(
        map(20 * Math.log10(average + 0.000001), -90,-15, 0, 1),
        0, 1
    );
}

function draw() {
    let playing = song && song.isPlaying();
    let spectrum = [];
    let v = 0, b = 0, m = 0, t = 0; // volume bass mids and treble start at 0

    // read the sliders every frame
    floatPower = flightSlider.value();
    haloPower = haloSlider.value();
    starPower = starSlider.value();
    flightValue.html(floatPower);
    haloValue.html(haloPower);
    starValue.html(starPower);

    playButton.html(loading ? "Loading..." : playing ? "Pause" : "Play");

    if (playing) {
        // analyze the song
        spectrum = fft.analyze();
        //volume, bass, mids, and treble
        v = constrain(amplitude.getLevel() * 7, 0, 1);
        b = bandEnergy(spectrum, 20, 250);
        m = bandEnergy(spectrum, 250, 2000);
        t = bandEnergy(spectrum, 2000, 12000);

        // bass hits make the ring pulsate
        if (
            b > bassAverage + 0.04 && //test
            frameCount - lastBeat > 9
        ) {
            beat = 1;
            lastBeat = frameCount;
        }

        bassAverage = lerp(bassAverage, b, 0.07);

        // count changes in the music to make active sections stronger
        let change =
            max(0, b - bass) +
            max(0, m - mids) +
            max(0, t - treble);
        averageChange = lerp(averageChange, change, 0.08);
// more frequent accents = higher
// value = longer and thicker frequency lines
        if (
            change > max(0.025, averageChange * 1.6) &&
            frameCount - lastAccent > 8
        ) {
            recentHits.push(frameCount);
            // need to update the last detected accent
            lastAccent = frameCount;

        }
        // forget accents after about two seconds
        for (let i = recentHits.length - 1; i >= 0; i--) {
            if (frameCount - recentHits[i] > 120) {
                recentHits.splice(i, 1);
            }
        }
        // more recent accents make the visuals more intense
        rhythm = lerp(
            rhythm,
            constrain(recentHits.length / 7, 0, 1),
            0.12
        );

    } else {
        // clear accents when the song stops
        recentHits = [];
        rhythm = lerp(rhythm, 0, 0.1); // slow return and lower
        bassAverage *= 0.95;
    }

    // smooth the movement
    beat *= 0.85;
    volume = lerp(volume, v, 0.2);
    bass = lerp(bass, b, 0.27);
    mids = lerp(mids, m, 0.2);
    treble = lerp(treble, t, 0.24);

    // louder music makes kirby fly higher
    flight = lerp(
        flight,
        volume * 145 * floatPower / 100, 0.17
    );

    let kirbyY = 335-flight; //flies higher with louder music
    if (playing) {
        kirbyY += sin(frameCount * 0.07) * 3; // slight bobbing while flying
    }
    // draw the scene from back to front
    drawScene();
    drawHalo(spectrum, kirbyY);
    drawFlightTrails(kirbyY, playing);
    drawKirby(kirbyY, playing);
    drawStars(kirbyY, playing);

    // song name and instructions
    noStroke();
    fill(72, 58, 100);
    textAlign(LEFT);
    textSize(15);

    text(songName.substring(0, 42), 18, 29);

    if (!playing) {
        textAlign(CENTER);
        textSize(18);

        if (loading) {
            text("Kirby is Eating...", width / 2, 75);

        } else if (!song) {
            text("Drop an MP3 Onto Kirby!", width / 2, 75);

        } else {
            text(
                "Click Kirby or Press Space to Fly!",
                width / 2, 75
            );
        }
    }
    if (eatingFrames > 0) eatingFrames--; // kirby mouth animation
}

// daytime background (stay still now)
function drawScene() {
    let top = color(111, 193, 250);
    let bottom = color(241, 224, 246);
    noStroke();

    // pastel sky
    for (let y = 0; y < height; y += 12) {
        fill(lerpColor(top, bottom, y / height));
        rect(0, y, width, 12);
    }

    // flash the sky when a bass hit happens
    fill(255, 255, 255, beat * 32);
    rect(0, 0, width, height);

    // sun and clouds
    fill(255, 248, 210, 180);
    circle(685, 100, 80);
    fill(255, 255, 255, 200);

    for (let i = 0; i < 3; i++) {
        let x = 125 + i * 260;
        let y = 150 + (i % 2) * 45;

        ellipse(x - 26, y + 6, 75, 36);
        ellipse(x, y - 10, 83, 54);
        ellipse(x + 28, y + 6, 74, 36);
    }

    // hills and a platform (stays still)
    fill(195, 186, 225);
    ellipse(95, 550, 450, 235);
    ellipse(705, 550, 480, 240);

    fill(180, 114, 155);
    ellipse(400, 466, 420, 70);

    fill(125, 198, 141);
    ellipse(400, 441, 420, 48);

    fill(202, 240, 174);
    ellipse(400, 429, 375, 18);

    // shadow gets smaller as kirby flies higher
    fill(79, 95, 88, map(flight, 0, 145, 65, 12, true));
    ellipse(
        400, 429,
        map(flight, 0, 145, 100, 35, true), 12
    );
}

// the circle shows different parts of the music
function drawHalo(spectrum, y) {
    let radius = 81 + beat * 17 + rhythm * 8;

    noFill();
    // glowing ring reacts to bass
    stroke(255, 255, 255, 55 + beat * 120);
    strokeWeight(10 + beat * 7);
    circle(400, y, radius * 2); // outer ring reacts to bass
    stroke(255, 249, 218, 220); // inner ring beat and rhythm
    strokeWeight(2);
    circle(400, y, radius * 2);

    for (let i = 0; i < 60; i++) { //60lines circle
        let index, quiet, loud;
        if (i < 12) {

            // PINK for BASS
            index = floor(map(i, 0, 12, 0, 6));
            quiet = -75;
            loud = -20;
            stroke(255, 130, 185, 235);

        } else if (i < 42) {
            // WHITE for MIDRANGE
            index = floor(map(i, 12, 42, 6, 48));
            quiet = -90;
            loud = -22;
            stroke(255, 255, 255, 240);

        } else {
            // YELLOW for TREBLE
            index = floor(map(i, 42, 60, 48, 170));
            quiet = -95;
            loud = -30;
            stroke(255, 237, 139, 240);
        }

        // change each line based on its frequency
        let peak = max(
            spectrum[index] || 0,
            spectrum[index + 1] || 0
        );

        let db = 20 * Math.log10(peak + 0.000001); // convert to decibels
        let strength = map( 
            db, quiet, loud, 0, 1, true
        );

        let target =
            5 + strength *
            (30 + haloPower * 0.6 + rhythm * 75); // how long the line should be

        if (haloHeights[i] === undefined) {
            haloHeights[i] = 5;
        }
        // speed up when the line is growing, slow down when shrinking
        let speed = target > haloHeights[i] ? 0.6 : 0.18;
        // smooth the line height changes
        haloHeights[i] = lerp(
            haloHeights[i],
            target,
            speed
        );
        // draw a line pointing out from the circle
        let angle = i * TWO_PI / 60;
        let inner = radius + 5;
        let outer = inner + haloHeights[i];
        strokeWeight(3 + rhythm * 2);
        // draw the line from the inner circle to the outer circle
        line(
            400 + cos(angle) * inner, y + sin(angle) * inner, 
            400 + cos(angle) * outer, y + sin(angle) * outer
        );
    }
    noStroke();
}

// one transparent color for the flight trails
function drawFlightTrails(y, playing) {
    if (!playing) return;
    let length = 24 + mids * 55 + rhythm * 30; 
    stroke(91, 147, 203, 145);
    strokeWeight(4);

    // keep the trails away from kirby's circle
    for (let i = 0; i < 3; i++) {
        let left = 225 - i * 13;
        let right = 575 + i * 13;
        let yy = y + 24 + i * 23;
        line(left, yy, left - length, yy + 12); // left side
        line(right, yy, right + length, yy + 12); // right side
    }
    noStroke();
}

// treble makes small stars appear
function drawStars(y, playing) {
    if (!playing) return;
    // the strength of the stars is based on treble, starPower, and rhythm
    let strength = constrain(
        treble * starPower / 100 * (1 + rhythm),
        0, 1
    );
    stroke(255, 244, 156, strength * 245); // yellow stars
    strokeWeight(2 + strength * 2);
    // draw 8 stars around kirby
    for (let i = 0; i < 8; i++) {
        let angle = i * TWO_PI / 8 + 0.2;
        let x = 400 + cos(angle) * 178;
        let yy = y + sin(angle) * 178;
        let size = 2 + strength * 11;
        // draw a cross shape for the star
        line(x - size, yy, x + size, yy);
        line(x, yy - size, x, yy + size);
    }

    noStroke();
}


// draw kirby flying and eating
function drawKirby(y, playing) {
    push();
    translate(400, y);
    // tilt slightly while flying
    if (playing) {
        rotate(sin(frameCount * 0.05) * 0.045);
    }

    // squash and stretch on bass
    scale(1 + beat * 0.12,1-beat * 0.09);
    noStroke();

    // kirby feet and arms
    fill(194, 57, 106);
    ellipse(-28, 51, 50, 28);
    ellipse(28, 51, 50, 28);
    fill(247, 137, 185);

    if (playing) {
        ellipse(-52, -24, 33, 43);
        ellipse(52, -24, 33, 43);

    } else {
        ellipse(-52, 12, 33, 43);
        ellipse(52, 12, 33, 43);
    }

    // body
    fill(255, 169, 206);
    circle(0, 0, 113);

    // eyes and eye sparkle
    fill(45, 40, 77);
    ellipse(-18, -13, 11, 28);
    ellipse(18, -13, 11, 28);
    fill(255);
    ellipse(-18, -19, 5, 9);
    ellipse(18, -19, 5, 9);

    // cheeks and mouth
    fill(246, 103, 157);
    ellipse(-35, 12, 21, 11);
    ellipse(35, 12, 21, 11);
    fill(128, 45, 83);

    // mouth changes size when eating or flying
    if (dragging || loading || eatingFrames > 0) {
        // mouth is open when eating
        ellipse(0, 20, 34, 36);
    } else {
        // mouth is smaller when flying
        ellipse(0, 19, 13, 15);
    }

    pop();
}
