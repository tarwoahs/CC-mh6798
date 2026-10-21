# Week 6 Clocks

For this assignment, I wanted to create a clock that represented time without using actual numbers. I decided to base it on my dog, Taro, I used him as one of my Ideation and Prototyping assignment so I decided to also bring him here. I thought it would be cute to use food and water to show how time passes.

The food bowl represents the hours, with each piece of kibble representing one hour on a 12-hour clock. The water bowl represents the minutes, while the droplets coming from the faucet represent the seconds. As time passes, the droplets change color. I also wanted the environment to change throughout the day, so the sky transitions between sunrise, daytime, sunset, and night. Taro also breathes and wags his tail using sin() and millis(), and falls asleep at night.

One of the harder parts was figuring out how to turn the actual time into something visual. I had to use loops and arrays to organize 60 droplets while making sure they fit inside the water bowl. I also had trouble figuring out how to make the sky gradually change colors instead of suddenly switching between day and night. Getting sin() to create small movements for Taro and the water droplets was another thing I had to work through. Besides the coding, I spent a lot of time adjusting the spacing, colors, and shapes because certain parts weren't lining up or were difficult to see.

Overall, this assignment helped me get more comfortable using loops, arrays, conditionals, and sin(). I also realized how much small adjustments to positioning and color can affect the final result. I enjoyed making something personal rather than just a clock that tells time.

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
