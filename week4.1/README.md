# Week 4.1 Iteration Generation

For this week’s assignment, I went on to focus more on the swirl effect from my Week 3 code. I knew I wanted to create something related to swirls, so at first I thought about sunsets, scenery, and other natural patterns. I still wanted the final idea to feel more meaningful instead of only making swirls because they looked cool. While thinking about it, I looked at my fingers and started thinking about fingerprints. Everyone has a different fingerprint, even though we all share many of the same body structures and functions.

I went through a lot of trial and error to make the curved lines actually look like fingerprints. Some versions looked too much like regular ovals, while others had lines that were too sparse or too condensed. I also tried adding separate swirls throughout the background, but I did not know how to feel about them because they started looking random and disconnected from the main fingerprint. I eventually replaced those background swirls with smaller fingerprints and echo ridges. I thought this was a nice touch because the entire piece now uses the same type of swirling form, while every fingerprint still looks slightly different.

The large fingerprint in the center is the main focus, while the smaller fingerprints surrounding it represent different individuals. They have different sizes, rotations, ridge counts, movements, and openings. When the cursor moves to the right, the fingerprints become more uneven and individual. When it moves to the left, they become smoother and more similar. This represents how everyone has their own identity, but at the same time, we are still similar and share the same basic structures.

I kept the individual fingerprint forms relatively small and compact so they would feel closer to the size and detail of an actual finger pattern. I also kept everything as one color and used only outlines so the drawing could be exported as an SVG and drawn with one pen on the plotter.

I used an LLM to help me structure some of the functions and troubleshoot the fingerprint spacing and SVG export. I made the main concept, sketches, positioning, sizing, interaction, and visual revisions through my own process and repeated testing.


# Week 4.0 Iteration Generation

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
