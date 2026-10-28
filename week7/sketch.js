/* 
    Michelle Huang
    Creative Coding Assignment
    Projection Mapping - Minecraft Portals
*/

let pMapper;
let netherQuad;
let aetherQuad;
let endQuad;

let purpleParticles = [];
let endParticles = [];
let showColors = false;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pMapper = createProjectionMapper(this);

    // 3 surfaces for the box
    netherQuad = pMapper.createQuadMap(400, 400);
    aetherQuad = pMapper.createQuadMap(400, 400);
    endQuad = pMapper.createQuadMap(400, 400);

    // purple particles for nether
    for (let i = 0; i < 30; i++) {
        let oneParticle = {
            x: random(100, 300),
            y: random(70, 330),
            size: random(4, 8),
            speed: random(0.3, 0.8),
            offset: random(100)
        };

        purpleParticles.push(oneParticle);
    }

    // small particles for endd
    for (let i = 0; i < 35; i++) {
        let oneParticle = {
            x: random(100, 300),
            y: random(100, 300),
            size: random(3, 6),
            offset: random(100)
        };

        endParticles.push(oneParticle);
    }
}

function draw() {
    background(0);

    // solid colors to help see each surface for "t"
    if (showColors) {
        netherQuad.display("purple");
        aetherQuad.display("yellow");
        endQuad.display("green");
    } else {
        netherQuad.displaySketch(netherPortal);
        aetherQuad.displaySketch(aetherPortal);
        endQuad.displaySketch(endPortal);
    }
}

// NETHER PORTAL
function netherPortal(pg) {
    pg.background(23, 17, 40);
    pg.noStroke();

    // dark obsidian blocks with brighter purple details
    // the filling for the code
    for (let y = 0; y < 400; y += 20) {
        for (let x = 0; x < 400; x += 20) {
            if ((x + y) % 60 === 0) {
                pg.fill(64, 47, 100);
            } else if ((x + y) % 40 === 0) {
                pg.fill(41, 30, 72);
            } else {
                pg.fill(25, 20, 47);
            }

            pg.rect(x, y, 20, 20);
        }
    }

    // purple border slowly moves
    let pulse = map(
        sin(frameCount * 0.035),
        -1, 1, 100, 210
    );

    pg.fill(190, 85, 255, pulse);
    pg.rect(75, 55, 250, 290);

    // moving purple portal nether waves
    for (let y = 65; y < 335; y += 10) {
        for (let x = 90; x < 310; x += 10) {
            let wave = sin(
                x * 0.06 + y * 0.04 + frameCount * 0.05
            );

            let purple = map(wave, -1, 1, 0, 1);
            pg.fill(
                95 + purple * 105,
                25 + purple * 75,
                175 + purple * 80
            );
            pg.rect(x, y, 10, 10);
        }
    }

    // purple particle float up
    for (let i = 0; i < purpleParticles.length; i++) {
        let particle = purpleParticles[i];

        let alpha = map(
            sin(frameCount * 0.04 + particle.offset),
    -1, 1, 170, 255
        );

        let moveX = sin(
            frameCount * 0.02 + particle.offset) * 5;

        pg.fill(245, 165, 255, alpha);
        pg.rect(
            particle.x + moveX,
            particle.y,
            particle.size,
            particle.size
        );

        particle.y -= particle.speed;
        // return particles to the bottom
        if (particle.y < 65) {
            particle.y = 325;
            particle.x = random(100, 300);
        }
    }
}
// AETHER PORTAL
function aetherPortal(pg) {
    pg.noStroke();

    // glowstone blocks shift between gold and light yellow
    for (let y = 0; y < 400; y += 20) {
        for (let x = 0; x < 400; x += 20) {
            let glow = map(
                sin(frameCount * 0.035 + x * 0.04 + y * 0.03),
                -1, 1, 0, 1
            );

            if ((x + y) % 60 === 0) {
                pg.fill(
                    240 + glow * 15,
                    205 + glow * 45,
                    105 + glow * 95
                );
            } else {
                pg.fill(
                    185 + glow * 65,
                    125 + glow * 90,
                    35 + glow * 75
                );
            }

            pg.rect(x, y, 20, 20);
        }
    }

    // yellow glow around the blue
    pg.fill(255, 245, 165, 160);
    pg.rect(75, 55, 250, 290);

    // moving blue portal waves aether
    for (let y = 65; y < 335; y += 10) {
        for (let x = 90; x < 310; x += 10) {
            let wave = map(
                sin(frameCount * 0.04 + x * 0.04 + y * 0.05),
                -1, 1, 0, 1
            );
            pg.fill(
                35 + wave * 65,
                150 + wave * 80,
                220 + wave * 35
            );
            pg.rect(x, y, 10, 10);
        }
    }
}

// END PORTAL
function endPortal(pg) {
    pg.background(19, 32, 42);
    pg.noStroke();

    // dark teal? pixelated framing
    for (let y = 0; y < 400; y += 20) {
        for (let x = 0; x < 400; x += 20) {
            if (x < 80 || x >= 320 || y < 80 || y >= 320) {
                let glow = map(
                    sin(frameCount * 0.03 + x * 0.04 + y * 0.03),
                    -1, 1, 0, 30
                );
                if ((x + y) % 60 === 0) {

                    pg.fill(98, 145 + glow, 125);

                } else {

                    pg.fill(49, 99 + glow, 88);
                }

                pg.rect(x, y, 20, 20);
            }
        }
    }

    // thin green edge around the dark center of the end portal
    pg.fill(100, 160, 140);
    pg.rect(76, 76, 248, 248);

    // dark portal center, with particles
    pg.fill(13, 17, 39);
    pg.rect(80, 80, 240, 240);

    // bright blue purple particles slowly twinkles the darkness
    for (let i = 0; i < endParticles.length; i++) {
        let particle = endParticles[i];

        let moveX = sin(
            frameCount * 0.02 + particle.offset
        ) * 4;

        let moveY = sin(
            frameCount * 0.015 + particle.offset
        ) * 4;

        let alpha = map(
            sin(frameCount * 0.03 + particle.offset),
            -1, 1, 170, 255
        );

        pg.fill(155, 180, 255, alpha);
        pg.rect(
            particle.x + moveX,
            particle.y + moveY,
            particle.size,
            particle.size
        );
    }

    // 3 eyes on each side = 9 eyes of ender
    let eyePositions = [90, 167, 244];

    for (let i = 0; i < 3; i++) {
        // top
        drawEye(pg, eyePositions[i], 8, i);

        // bottom
        drawEye(pg, eyePositions[i], 325, i + 3);

        // left
        drawEye(pg, 8, eyePositions[i], i + 6);

        // right
        drawEye(pg, 325, eyePositions[i], i + 9);
    }
}

// draw one square eye of ender
function drawEye(pg, x, y, offset) {
    pg.noStroke();

    // outer square
    pg.fill(185, 190, 135);
    pg.rect(x, y, 67, 67);

    // dark green square
    pg.fill(47, 92, 79);
    pg.rect(x + 7, y + 7, 53, 53);

    // lighter green square
    pg.fill(105, 155, 116);
    pg.rect(x + 13, y + 13, 41, 41);

    // inner green square
    pg.fill(160, 194, 143);
    pg.rect(x + 20, y + 20, 27, 27);

    // pupils move at slightly different times
    let pupilX = round(
        sin(frameCount * 0.025 + offset) * 4
    );
    let pupilY = round(
        sin(frameCount * 0.02 + offset) * 3
    );

    pg.fill(18, 43, 38);

    pg.rect(
        x + 27 + pupilX,
        y + 27 + pupilY,
        13, 13
    );
}

// PROJECTION MAPPING shortcuts
function keyPressed() {
    switch (key) {
        case "c":
            pMapper.toggleCalibration();
            break;

        case "f":
            let fs = fullscreen();
            fullscreen(!fs);
            break;

        case "s":
            pMapper.save("map.json");
            break;

        case "l":
            pMapper.load("map3.json");
            break;

        case "t":
            showColors = !showColors;
            break;
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}