// Note that y coordinates are used first in the array, and x is second.
// This is to facilitate the display of the maze in HTML,
// as horizontal rows need to be established first, followed by each vertical cell in the row.

class Maze {

    constructor() {
        this.height = parseInt(document.getElementById("myRange1").value);
        this.width = parseInt(document.getElementById("myRange2").value);
        this.grid = this._initialiseGrid();
        this.generateMaze();
    }

    // Initialise every cell to have all walls surrounding them.
    _initialiseGrid() {
        let grid = [];
        for (let j = 0; j < this.height; j++) {
            let row = [];
            for (let i = 0; i < this.width; i++) {
                row.push(new Cell(j, i));
            }
            grid.push(row);
        }
        return grid;
    }

    // Recursive backtracker algorithm used to generate the maze.
    // Initialised with any starting cell and an empty stack.
    generateMaze() {
        this._generateMaze(this.grid[0][0], []);
    }

    _generateMaze(currentCell, stack) {

        currentCell.visited = true;

        let unvisitedNeighbouringCells = this._neighbouringUnvisitedCells(currentCell);

        // If there are unvisited neighbors, else if stack is not empty.
        if (unvisitedNeighbouringCells.length > 0) {

            // Choose randomly one of the visited cells to remove wall between that and currentCell.
            let randomCell = randomArrayElement(unvisitedNeighbouringCells);
            this._removeWall(currentCell, randomCell);

            // Push the current cell onto the stack.
            stack.push(currentCell);

            // Make the random cell the current cell to recursively generate the maze with.
            currentCell = randomCell;
            this._generateMaze(currentCell, stack);

        } else if (stack.length > 0) {

            // Pop a cell from the stack and make it the current cell.
            currentCell = stack.pop();

            // Recursively generate the maze from the new current cell.
            this._generateMaze(currentCell, stack);

        }
    }

    // Solve maze by finding shortest path between current and end cells.
    // Breadth first search.
    solveMaze(curr, end) {

        // Reset all cells so they have not been visited.
        this._resetVisited();

        let queue = [];

        // Label curr node as visited
        this.grid[curr.y][curr.x].visited = true;

        queue.push(this.grid[curr.y][curr.x]);

        while (queue.length > 0) {
            curr = queue.shift();
            if (curr === end) {
                return;
            }

            let possibleMoves = this._possibleMoves(curr);

            for (let i = 0; i < possibleMoves.length; i++) {
                let child = this.grid[possibleMoves[i].y][possibleMoves[i].x];
                if (!child.visited) {
                    child.visited = true;
                    child.nextCell = curr;
                    queue.push(child);
                }
            }
        }

    }

     _findLengthOfPath(start, end) {
        let length = 1;
        while (!(start.nextCell === end)) {
            start = start.nextCell;
            length++;
        }
        return length;
    }

    // Returns array of all unvisited neighbours of given cell.
    _neighbouringUnvisitedCells(cell) {

        let cells = [];
        const {y: yCoordinate, x: xCoordinate} = cell;

        // If neighbouring cell exists, add neighbouring to cells array if it is unvisited.
        if (yCoordinate + 1 < this.height) {
            if (!this.grid[yCoordinate + 1][xCoordinate].visited) {
                cells.push(this.grid[yCoordinate + 1][xCoordinate]);
            }
        }
        if (yCoordinate - 1 >= 0) {
            if (!this.grid[yCoordinate - 1][xCoordinate].visited) {
                cells.push(this.grid[yCoordinate - 1][xCoordinate]);
            }
        }
        if (xCoordinate + 1 < this.width) {
            if (!this.grid[yCoordinate][xCoordinate + 1].visited) {
                cells.push(this.grid[yCoordinate][xCoordinate + 1]);
            }
        }
        if (xCoordinate - 1 >= 0) {
            if (!this.grid[yCoordinate][xCoordinate - 1].visited) {
                cells.push(this.grid[yCoordinate][xCoordinate - 1]);
            }
        }

        return cells;
    }

    // Returns array of possible moves from given cell.
    _possibleMoves(cell) {

        let cells = [];
        const {y: yCoordinate, x: xCoordinate} = cell;

        if (!cell.north) {
            cells.push(this.grid[yCoordinate + 1][xCoordinate]);
        }
        if (!cell.south) {
            cells.push(this.grid[yCoordinate - 1][xCoordinate]);
        }
        if (!cell.east) {
            cells.push(this.grid[yCoordinate][xCoordinate + 1]);
        }
        if (!cell.west) {
            cells.push(this.grid[yCoordinate][xCoordinate - 1]);
        }

        return cells;
    }

    // Removes wall between two cells
    _removeWall(currentCell, randomCell) {
        if ((currentCell.x === randomCell.x) && (currentCell.y + 1 === randomCell.y)) {
            currentCell.north = false;
            randomCell.south = false;
        }
        if ((currentCell.x + 1 === randomCell.x) && (currentCell.y === randomCell.y)) {
            currentCell.east = false;
            randomCell.west = false;
        }
        if ((currentCell.x === randomCell.x) && (currentCell.y - 1 === randomCell.y)) {
            currentCell.south = false;
            randomCell.north = false;
        }
        if ((currentCell.x - 1 === randomCell.x) && (currentCell.y === randomCell.y)) {
            currentCell.west = false;
            randomCell.east = false;
        }

    }

    // Sets the visited field of every cell to false.
    // Used when solving maze as field of every cell has been set to true when generating the maze.
    _resetVisited() {
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                this.grid[j][i].visited = false;
            }
        }
    }

}
