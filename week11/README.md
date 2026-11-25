# Certified Rotten %

## Project Description

For this assignment, I wanted to work with something related to my personal interests. While looking through different public APIs from the class link examples, I came across the Studio Ghibli API, which contained information such as movie titles, release dates, posters, and Rotten Tomatoes ratings. I thought it would be interesting to explore how Studio Ghibli films have been rated over the years.

I was thinking about how to visualize the data, I wanted to do something more interactive. I thought about the irony of Rotten Tomatoes because I initially thought it meant the higher it was the worse the movie it was. Instead it is actually the quite opposite. I liked the irony and wanted to use that idea by having more tomatoes thrown at movies with higher ratings.

I also included booing and splat sound effects to make the interaction more playful. For fun I did add that if a movie has a rating above 90%, the audience cheers and claps after all the tomatoes have landed.

## Design Process

I originally considered creating a movie theater setting at first. I then decided to create something resembling an art gallery with a basic grey background. I wanted the movie posters to be the main focus, so I kept the background simple. I placed the selected movie in the center with smaller posters of the previous and next movies on each side. I also created an interactive timeline at the bottom so users could explore the movies in chronological order.

Throughout the process, I experimented with different tomato designs. I initially created more realistic tomatoes and splatters, but I realized that the splatters started to look like blood when there were a lot of them covering the poster.. which is concerning. I eventually redesigned the tomatoes to have cute smiling faces while being thrown and shocked expressions once they landed. I felt that this fit the playful nature of the project better.

## Technical Implementation

I used JavaScript with p5.js and p5.sound to create this sketch. I used `loadJSON()` with `async` and `await` to retrieve movie information from the Studio Ghibli API. I sorted the movies by their release years and used `loadImage()` to display their posters. Since the Rotten Tomatoes ratings from the API were stored as strings, I converted them into numbers so I could use them to control the animation and sound effects. Release year determines the order of the movies on the timeline. Rotten Tomatoes rating shows the number of tomatoes thrown. An example would be a rating of 95% generates 95 tomatoes. Sound frequency brings higher ratings result in more frequent splat sounds. Audience reaction is based on movies rated above 90% receive a round of applause after the animation.

I used arrays, loops, `random()`, and `map()` to control the movement, size, and landing positions of the tomatoes. The tomatoes were drawn using basic p5.js shapes. :D

## Interaction

Click the center movie poster to throw tomatoes
Click the left or right poster to switch movies
Use the arrows or select a year on the timeline
Click the center poster again to replay the animation.

## Challenges and Reflection

One of the more challenging parts of this assignment was figuring out how to use the information from the API and connect it to the different elements of my sketch. I had to figure out how to organize the movies by their release years and keep track of which movie was currently selected. Creating the timeline was also a little challenging since I only wanted a certain number of movies to appear at a time.

Another challenge was figuring out how to animate multiple tomatoes without having them all thrown at once. Each tomato needed its own starting position, landing position, size, and delay. I also had to make sure the splatters stayed on the poster after landing but were cleared whenever the user switched to another movie.

Forth challenge is issues with the sound effects. The splat sounds were playing too frequently and overlapping with one another, which made the audio overwhelming. I lowered the volume and added a delay between the sounds. I mapped the delay to the movie rating so that higher rated movies would still have more frequent splat sounds.

Fifth challenge I gone through was that the poster for *Earwig and the Witch* was not loading through the API. I downloaded the poster separately and used a conditional statement to display the local image while keeping the rest of the movie information from the API. The API did not include *The Boy and the Heron* move, I decided to work with the existing dataset instead of manually adding additional movie information.

Through this assignment, I learned more about retrieving and organizing information from an API. I think what I found most interesting was how I could take a single numerical value and use it in multiple ways. In this case, the movie rating determines how many tomatoes are thrown, how frequently the splat sounds play, and whether the audience cheers at the end. It was interesting to explore a more playful way of visualizing data. Also including sounds and continuing to play around with that. I think that is what I enjoyed a lot it sort of gives it a little life.

## Sources and Credits

### Data Source

[Studio Ghibli API](https://ghibliapi.vercel.app/)
[Studio Ghibli Film Data](https://ghibliapi.vercel.app/films)
[Public APIs - Studio Ghibli](https://publicapis.lol/apis/studio-ghibli)

### Sound Effects

All sound effects were downloaded from Freesound.
[Crowd cheer.wav](https://freesound.org/people/BeeProductive/sounds/430046/) by BeeProductive
[boo 01.wav](https://freesound.org/people/tim.kahn/sounds/336997/) by tim.kahn
[Cartoon Splat](https://freesound.org/people/Breviceps/sounds/445117/) by Breviceps 

The volume and playback timing of the sound effects were adjusted within the sketch.

### Movie Posters

Most movie posters were retrieved through the Studio Ghibli API.[Earwig and the Witch](https://gkids.com/films/earwig-and-the-witch/) - GKIDS