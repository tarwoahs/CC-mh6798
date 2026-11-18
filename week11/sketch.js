const base_url = "http://colormind.io/";

let models;
let color_suggestions = [[255, 255,255],[255, 255,255],[255, 255,255],[255, 255,255],[255, 255,255]];
let model_selector;
let btn;

async function setup() {
  createCanvas(800, 600);

  await loadJSON(base_url + "list/", populateDropdown);
  model_selector = createSelect();
  model_selector.position(400, 50);
  for (let i = 0; i < models.result.length; i++) {
    model_selector.option(models.result[i]);
  }

  let btn = createButton("get colors");
  btn.position(560, 50);
  btn.size(170, 34);
  btn.mousePressed(requestColors);

}

function populateDropdown(data) {
  models = data;

}

async function requestColors() {
  let selection = model_selector.selected();
  let APIurl = base_url + "api/";
  try {
    let response = await fetch(APIurl, {
      method: "POST",
      body: JSON.stringify({ model: selection })
    });
    let res = await response.json();
    color_suggestions = res.result;
    console.log(color_suggestions);
  } catch (err) {
    console.error("Error loading data:", err);
  }
}


function draw(){
  background(220);
  noStroke();
  for(let i =0; i<color_suggestions.length; i++){
    let r = color_suggestions[i][0];
    let g = color_suggestions[i][1];
    let b = color_suggestions[i][2];
    fill(r,g,b);
    rect(i*width/color_suggestions.length, 0, width/color_suggestions.length, height);
  }
}