let grid;
let cols;
let rows;
let resolution = 20;
let fpsSlider;
let pFps;
let gameState = 'editing';
let states = {
    editing: {
        name: 'editing',
        nextState: 'playing',
        color: 125,
        tag: 'Paused',
        defaultFps: 60
    },
    playing: {
        name: 'playing',
        nextState: 'editing',
        color: 0,
        tag: 'Playing',
        wrap: false
    }
}

function setup() {
    myDiv = document.getElementById('sketch-holder');
    myCanvas = createCanvas(myDiv.offsetWidth, myDiv.offsetHeight);
    myCanvas.parent('#sketch-holder');
    pFps = createP('Fps Value: 30').parent('#sketch-holder');
    fpsSlider = createSlider(1, 60, 60).parent('#sketch-holder');

    width = myDiv.offsetWidth;
    height = myDiv.offsetHeight - 50;

    cols = floor(myDiv.offsetWidth / resolution);
    rows = floor(myDiv.offsetHeight / resolution);

    generateGame();

    reset = createButton("Reset Game").parent('#sketch-holder');
    reset.mousePressed(() => {
        generateGame()
    });

    frameRate(fpsSlider.value());

    toggle = createButton("Paused").parent('#sketch-holder');
    toggle.mousePressed(() => {
        gameState = states[gameState].nextState;

        toggle.html(`${states[gameState].tag}`);
    });

    rand = createButton("Random Seed").parent('#sketch-holder');
    rand.mousePressed(() => {
        generateGame(true);
    });

    wrap = createButton(`Wrap ${states.playing.wrap ? `On`: `Off`}`).parent('#sketch-holder');
    wrap.mousePressed(() => {
        states.playing.wrap = !states.playing.wrap;
        wrap.html(`Wrap ${states.playing.wrap ? `On`: `Off`}`);

    });
}


function make2DArray(cols, rows) {
    let arr = new Array(cols);

    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(cols);
    }

    return arr;
}

function generateGame(rand = false) {
    cols = floor(myDiv.offsetWidth / resolution);
    rows = floor(myDiv.offsetHeight / resolution);

    grid = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = rand ? floor(random(2)) : 0;
        }
    }
}

/*
function windowResized() {
    resizeCanvas(myDiv.offsetWidth, myDiv.offsetHeight);
}
*/

function mousePressed() {
    paintGrid();
}

function mouseDragged() {
    paintGrid();
}

function paintGrid() {
    let x = snapToGrid(mouseX);
    let y = snapToGrid(mouseY);

    if (mouseButton === LEFT && keyIsDown(CONTROL))
        grid[x][y] = 0;
    else if (mouseButton === LEFT)
        grid[x][y] = 1;
}

function snapToGrid(pixel) {
    return floor(pixel / resolution)
}

function draw() {
    background(255);
    frameRate(states[gameState].defaultFps || fpsSlider.value());
    pFps.html("Fps Value: " + fpsSlider.value());

    let next = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] == 1) {
                fill(states[gameState].color);
                stroke(255);
                rect(x, y, resolution - 1, resolution - 1);
            }

            if (gameState === states.playing.name) {
                simulate(next, i, j);
            } else if (gameState === states.editing.name) {
                fill(states[gameState].color);
                stroke(0);
                rect(snapToGrid(mouseX) * (resolution), snapToGrid(mouseY) * (resolution), resolution - 1, resolution - 1);
            }
        }
    }

    if (gameState === states.playing.name)
        grid = next;
}

function simulate(next, i, j) {
    //Neighbour check
    let n = 0; //Number of neighbours
    let state = grid[i][j]; //Tile current state

    if (states.playing.wrap) {
        for (let c = -1; c <= 1; c++) {
            for (let r = -1; r <= 1; r++) {
                if (r == 0 && c == 0) //Skip center tile
                    continue;

                let a = (c + i + cols) % cols;
                let b = (r + j + rows) % rows;

                n += grid[a][b];
            }
        }
    } else {
        for (let c = -1; c <= 1; c++) {
            for (let r = -1; r <= 1; r++) {
                if ((c + i < 0 || r + j < 0) || (c + i >= cols || r + j >= rows) || //Check for boundaries
                    (r == 0 && c == 0)) //Skip center tile
                    continue;
                else
                    n += grid[c + i][r + j];
            }
        }
    }
    if (state == 0 && n == 3) {
        next[i][j] = 1;
    } else if (state == 1 && (n < 2 || n > 3)) {
        next[i][j] = 0;
    } else {
        next[i][j] = state;
    }
}