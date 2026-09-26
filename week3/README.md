# Week 3 Iteration Generation

Idea 1 
I wanted to use a color wheel because I thought it was interesting how artists blend different paints together to create a new color. I referenced that by making transparent circles overlap and merge as the mouse moves down, then separate as it moves up. I used nested loops, HSB colors, transparency, sin(), cos(), and mouseY to repeat and move the pattern.

Idea 2
For my second idea, I searched online references and liked the visual movement created by repeated wavy lines. I recreated that effect using sin(), beginShape(), vertex(), and nested loops. I had a difficult time structuring the code, so I used an LLM to help organize it.

Idea 3
I used the class inspiration links and looked at an interesting pattern that change from an organized grid into something more chaotic. It was difficult to make only the bottom squares become disorganized while keeping the top rows aligned. I used map() with the Y position so the disorder gradually increases toward the bottom, while mouseX controls the overall movement and rotation.

## Getting Started

Open `index.html` in your web browser and start editing `sketch.js`.

## Running Locally

For projects with media files, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"
```

## Resources

- [p5.js 2.0](https://beta.p5js.org/)
- [p5.js Reference](https://p5js.org/reference/)
