// Returns a random cell from the maze grid.
function randomiseCell() {
    let xRandom = Math.floor(Math.random() * mazeGeneratorAndSolver.maze.width);
    let yRandom = Math.floor(Math.random() * mazeGeneratorAndSolver.maze.height);
    return mazeGeneratorAndSolver.maze.grid[yRandom][xRandom];
}

// Returns random element in array.
function randomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Enable / disable button and turn on / off hover

function enableNewMazeButton() {
    document.getElementById("newMazeButton").disabled = false;
    document.getElementById("newMazeButton").classList.add('hover');
}

function enableStartGameButton() {
    document.getElementById("startGameButton").disabled = false;
    document.getElementById("startGameButton").classList.add('hover');
}

function enableSolveButton() {
    document.getElementById("solveButton").disabled = false;
    document.getElementById("solveButton").classList.add('hover');
}

function disableNewMazeButton() {
    document.getElementById("newMazeButton").disabled = true;
    document.getElementById("newMazeButton").classList.remove('hover');
}

function disableStartGameButton() {
    document.getElementById("startGameButton").disabled = true;
    document.getElementById("startGameButton").classList.remove('hover');
}

function disableSolveButton() {
    document.getElementById("solveButton").disabled = true;
    document.getElementById("solveButton").classList.remove('hover');
}

// Object to store arrow key values.
let arrowValues = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
};