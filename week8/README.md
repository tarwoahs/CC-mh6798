# Fragmented Self

For this assignment, I wanted to explore fragmented identity and how we perceive ourselves. I was inspired by images of blurred faces, digital glitches, and misplaced puzzle pieces. I liked how these portraits were still recognizable as people, but something about them felt slightly uncanny or unfamiliar. I wanted to recreate that feeling using a live webcam. I decided to make my face blurry and add colorful horizontal glitches to distort how it appears on screen. I also divided parts of my face into rectangular fragments that continuously move around the canvas. I wanted these pieces to resemble a puzzle that never fully comes together, even though all the pieces are still there.

I used pixel brightness to change the colors of certain areas of my face, while mouse movement controls the glitch intensity and how quickly the fragments move. I wanted to explore how much an image of ourselves can be distorted while still remaining recognizable, and how our perception of ourselves isn't always complete or consistent.

I used createCapture(VIDEO) to capture my face and applied GRAY and BLUR filters to distort it. I used nested for loops and arrays to create moving fragments of my face. For the colorful glitches, I used loadPixels() to access RGB values and changed pixel colors based on their brightness, then used updatePixels() to apply the changes. I also used sin() to move the horizontal strips and map() with mouseX and mouseY to control the fragment speed and glitch intensity.

# template

---

This is a README file that can be used to describe and document your assignment.

Markdown Cheatsheet (from [https://www.markdownguide.org/cheat-sheet/](https://www.markdownguide.org/cheat-sheet/)):

---

# Heading1
## Heading2
### Heading3
#### Heading4
##### Heading5
###### Heading6

**bold text**

*italicized text*

~~strikethrough text~~

Ordered List:
1. First item
2. Second item
3. Third item

Unordered List:
- First item
- Second item
- Third item

`short code block`

```
extended code block
fun() {
  return 0
}
```

Link:  
[linked text](https://www.example.com)


Image with url:  
![image description](https://dm-gy-6063-2024f-b.github.io/assets/homework/02/clark-espaco-modulado-00.jpg)


Image on repo:  
![image description](./file-name.jpg)


To start a new line, add two spaces at the end of a line, like this:  
this is a new line.


To start a new paragraph, leave an empty line between two lines of text.

This is a new paragraph.
