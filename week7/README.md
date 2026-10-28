# Week 7 - Minecraft Portals Projection Mapping

When we practiced projection mapping with boxes in class, I immediately thought of Minecraft because of how blocky everything is in the game. My first idea was to turn the box into a Minecraft pumpkin, with a glowing face on one side, a daytime sky with a moving sun on another, and a nighttime sky with stars and a moon on the last side. I also tried thinking about the three surfaces as sunrise, sunset, and nighttime. I liked the individual animations, but when I saw them together, I didn't really like how they mixed. They felt more like separate scenes than one project, and I wanted something that connected better.

I remembered Portal 2, which is a different game I used to watch people play on YouTube when I was younger. I liked the idea of portals connecting different spaces, and I thought it would be cool to combine that idea with Minecraft. Instead of having three different skies, I decided to make three Minecraft-inspired portals: the Nether Portal, the Aether Portal (modded portal), and the End Portal. Each one could still have its own colors and movement, but they would make more sense together.

I started with the p5.mapper example from class and created three QuadMap surfaces that were each 400 by 400 pixels. I used displaySketch() to draw a different portal on each surface, and pg. before the drawing functions so each sketch would appear on its own mapped area.

For the Nether Portal, I used small rectangles to create dark purple obsidian blocks, along with moving purple waves and particles that float up. For the Aether Portal, I made a glowstone frame with yellow and gold colors that gradually change, while the blue center has its own moving color pattern. For the End Portal, I drew a dark center with small blue particles that gently move and fade in and out. I also made 12 square Eyes of Ender, with three evenly spaced on each side and none in the corners. Their pupils move slightly at different times.

I used for loops to repeat the blocks and patterns, along with arrays and objects to store the particles' positions and sizes. I also used sin(), map(), and frameCount for the different movements and changes in color. I wanted to keep everything pixelated, so most of the drawings were made using rect() instead of more complicated shapes.

# 03_5_real_simple_mapping

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
