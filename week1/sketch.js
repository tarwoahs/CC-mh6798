// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!
// computer go home
const quotes = [
  { text: "the application of programming techniques in the act of creation", source: "Francis Stokes" },
  { text: "new interdisciplinary art form that bridges the gap between technologists and artists", source: "Ahmad Moussa" },
  { text: "a realm of programming for expressive and/or artistic purposes", source: "Amelia Neville" },
  { text: "using code for artistic expression instead of it being simply functional", source: "Tinna Lyngholm Thomsen" },
  { text: "deliberate act of letting go and seeing where the process takes you", source: "Patrik Hübner" },
  { text: "create something expressive instead of something functional", source: "Sean Zhai" },
  { text: "practice of making art with code", source: "Andrew Bryant" },
  { text: "programming without strict pre-planning", source: "Joachim Rodriguez y Romero" }
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable that holds the current quote
let current = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Seed with millis() so each page load gives a different quote.
  randomSeed(millis());
  textSize(32);
  fill(10, 255, 10);
  // calls the function to pick a quote
  pickQuote();
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(255, 20, 250); // set the background color
  drawQuote();  // draw the quote on screen
}

function drawQuote() {   // draw text
  textAlign(CENTER, CENTER);
  text("Creative Coding is.....", width / 2, height / 2 - 48);
  textStyle(BOLD);
  text("'" + current.text + "'", width / 2, height / 2);
  textAlign(RIGHT, CENTER);
  text("-" + current.source, width - 100, height - 100);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote();
}