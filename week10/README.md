# Kirby's Musical Dreamland

## Project Description

Before settling on my final idea, I went through several concepts and drafts for this assignment. I originally considered making a hand-controlled instrument using webcam tracking before switching to an audio visualizer. I explored different Minecraft-inspired ideas, including a Sculk Sensor, amethyst crystal chimes, and a jukebox or note block. I even tried making a Sculk Sensor visualizer, but I wasn't satisfied with how it looked or reacted to the music. Eventually, I decided to move away from Minecraft and create something inspired by Kirby.

I wanted to make something playful and colorful where Kirby could fly around while reacting to music. I created a daytime scene with a pastel sky, clouds, and a grassy platform using basic p5.js shapes. I also added a drag-and-drop interaction where users can feed Kirby their own MP3 files. When a file is dropped, Kirby opens his mouth and makes a small eating sound using p5.Oscillator().

I used JavaScript with p5.js and p5.sound to create the visualizer. I used p5.Amplitude() to measure the overall volume, which controls how high Kirby flies, and p5.FFT() to analyze different frequency ranges. The bass makes the halo surrounding Kirby pulse and slightly changes his shape, while the frequency lines react to bass, midrange, and treble using pink, white, and yellow. I also added stars that respond to higher frequencies and flight trails that extend during more active sections of the music. I used lerp() to smooth the animations and tracked recent musical accents to make the visuals more responsive during intense sections.

## Testing and Iterations

I tested my visualizer with three different songs on three different days to see how it responded to different types of music.

### Song 1: Pigstep from Minecraft

I chose Pigstep because of its heavy bass and noticeable changes in intensity. The song felt tense to me, but I noticed that the visualizer wasn't reacting as strongly as I wanted it to. The frequency lines mostly responded to the bass, while other parts of the music barely affected the visuals. I also realized that the moving clouds, pulsing platform, and swirls made the scene feel cluttered without contributing much to the music. I removed them and focused on improving the frequency lines and Kirby's flight movement. I also adjusted the code to detect more frequent musical accents, allowing the visuals to become more intense during busier sections. I felt that stronger halo reactions better matched the tension in Pigstep.

### Song 2: Adventure Time - Intro Instrumental

Compared to Pigstep, this song felt more playful and adventurous, which I thought matched Kirby's flying animation. I felt that emphasizing his flight movement with a gentler halo would suit the music better. During testing, I noticed that the flight trails overlapped with the frequency lines, making certain areas look cluttered. I repositioned the trails farther to Kirby's left and right sides and changed them to a single transparent color. This helped make the scene feel cleaner without losing the impression of movement.

### Song 3: MapleStory - Cash Shop

For my third song, I chose the Cash Shop soundtrack from MapleStory because it felt cheerful, relaxing, and nostalgic. I thought subtler flight movements and less intense frequency reactions would better complement the music, while the stars could still add something playful. By this point, I felt that the visualizer was working much better after all the previous iterations. Different parts of the music had more noticeable reactions, and I was happier with how the visual elements worked together.

## Controls and Reflection

I used createSlider() and createButton() to let users adjust Kirby's flight sensitivity, halo intensity, and stars, along with play, pause, and restart controls. I also added keyboard shortcuts using keyPressed() so users could make quicker adjustments during playback.

I found these controls helpful because different songs have different moods and levels of intensity. For example, Pigstep suited stronger halo reactions, while the MapleStory soundtrack felt better with gentler movements. However, adjusting the settings could also distract from listening to the music, which is why I included both sliders and keyboard shortcuts.

Throughout this assignment, I realized that adding more animations doesn't necessarily make an audio visualizer better. Initially, I thought having more movement would make the project more interesting, but it eventually made the scene feel cluttered. After testing different songs and making changes, I found that focusing on fewer visual elements and improving their connection to the music created a more cohesive experience.