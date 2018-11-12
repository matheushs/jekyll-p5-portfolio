---
layout: post
title:  "Game of Life"
date:   2018-11-11 #year-month-day
thumbnail: thumbnail.png
dependencies:
    - p5
    - p5.dom
---
 
An implementation of Conway's Game of Life. The Game of Life is a cellular automaton created by mathematician John Horton Conway in 1970. It's a zero-player game, consisting of cells which interacts with each other based on the following set of rules:
> Any live cell with fewer than two live neighbors dies, as if by underpopulation.<br/>
> Any live cell with two or three live neighbors lives on to the next generation.<br/>
> Any live cell with more than three live neighbors dies, as if by overpopulation.<br/>
> Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.<br/>  


How to play:  
- Press **Random Seed** to generate a random board 
- Press **Paused** to start the simulation
- Move the slider to change the simulation speed
- Press **Wrap** to toggle if the screen wraps or not
- Press **Reset Game** to clear the board  
While paused you can do the following actions:  
- Left Mouse Button inserts cells
- Ctrl + Left Mouse Button removes cells
<div id="sketch-holder" style="min-height: 600px">
  <script type="text/javascript" src="sketch/sketch.js"></script>
</div>
