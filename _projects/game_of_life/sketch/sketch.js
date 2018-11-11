function make2DArray(cols, rows){
    let arr = new Array(cols);

    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(cols);
    }
    
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 30;

function setup(){
    myDiv = document.getElementById('sketch-holder');
    myCanvas = createCanvas(myDiv.offsetWidth, myDiv.offsetHeight);
    myCanvas.parent('sketch-holder');

    width = myDiv.offsetWidth;
    height = myDiv.offsetHeight - 50;

    cols = floor(myDiv.offsetWidth / resolution);
    rows = floor(myDiv.offsetHeight / resolution);

    generateGame();

    frameRate(30);
}

function generateGame(){
    grid = make2DArray(cols,rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function mousePressed(){
    generateGame();
}

function windowResized() {
    resizeCanvas(myDiv.offsetWidth, myDiv.offsetHeight);
}

function draw(){
    background(255);

    //Draw the board
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            if(grid[i][j] == 1){
                fill(0);
                stroke(255);
                rect(x, y, resolution-1, resolution-1);
            }
        }  
    }


    //Calculate the next iteration
    let next = make2DArray(cols,rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            //Neighbour check
            let n = 0; //Number of neighbours
            let state = grid[i][j]; //Tile current state
            
            /*
            for(let c = -1; c <= 1; c++){
                for(let r = -1; r <= 1; r++){
                    if((c+i < 0 || r+j < 0) || (c+i >= cols || r+j >= rows) || //Check for boundaries
                       (r == 0 && c == 0)) //Skip center tile
                        continue;
                    else
                        n += grid[c+i][r+j];
                }
            }
            */
            
            //Toroidal wrapping
            for(let c = -1; c <= 1; c++){
                for(let r = -1; r <= 1; r++){
                    if(r == 0 && c == 0) //Skip center tile
                        continue;
                    
                    let x = (c + i + cols) % cols;
                    let y = (r + j + rows) % rows;
                                        
                    n += grid[x][y];
                }
            }

            if(state == 0 && n == 3){
                next[i][j] = 1;
            }
            else if(state == 1 && (n < 2 || n > 3)){
                next[i][j] = 0;
            }
            else{
                next[i][j] = state;
            }
        }
    }

    grid = next;
}