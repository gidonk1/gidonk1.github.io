;(function () {

    // If maze is undefined, initialise
    if (typeof mazeGeneratorAndSolver === "undefined") {
        window.mazeGeneratorAndSolver = {};
    }

    let DisplayMaze = mazeGeneratorAndSolver.DisplayMaze = function () {
        this.setCellSize();
        this.render();
    };

    DisplayMaze.prototype.setCellSize = function () {
        this.cellSize = Math.floor(Math.min(
            Math.floor(mazeGeneratorAndSolver.mazeWidth / mazeGeneratorAndSolver.maze.width),
            Math.floor(mazeGeneratorAndSolver.mazeHeight / mazeGeneratorAndSolver.maze.height)
        ));
    };

    DisplayMaze.prototype.render = function () {
        this._generateHTML();
    };
    
    DisplayMaze.prototype._generateHTML = function () {

        let mazeDiv = document.getElementById('maze');
        mazeDiv.style.opacity = '0';

        setTimeout(function () {
            mazeDiv.innerHTML = null;
            mazeDiv.style.width = this.cellSize * mazeGeneratorAndSolver.maze.width + 10 + 'px';
            mazeDiv.style.height = this.cellSize * mazeGeneratorAndSolver.maze.height + 10 + 'px';

            // Display maze starting from top row, left to right.
            for (let y = mazeGeneratorAndSolver.maze.height - 1; y >= 0; y--) {

                let row = document.createElement('div');
                row.className = 'maze-row';

                for (let x = 0; x < mazeGeneratorAndSolver.maze.width; x++) {

                    let el = document.createElement('div');
                    el.setAttribute('data-x', x + "");
                    el.setAttribute('data-y', y + "");
                    el.style.width = this.cellSize + 'px';
                    el.style.height = this.cellSize + 'px';

                    let classes = ['maze-cell'];

                    let currentCell = mazeGeneratorAndSolver.maze.grid[y][x];

                    // If boundary or wall is open, then add the corresponding class.
                    if (y + 1 >= mazeGeneratorAndSolver.maze.height || !currentCell.north) {
                        classes.push('up-open');
                    }
                    if (y - 1 < 0 || !currentCell.south) {
                        classes.push('down-open');
                    }
                    if (x + 1 >= mazeGeneratorAndSolver.maze.width || !currentCell.east) {
                        classes.push('right-open')
                    }
                    if (x - 1 < 0 || !currentCell.west) {
                        classes.push('left-open');
                    }

                    // Join array elements into one string with a space in between them.
                    el.className = classes.join(' ');

                    row.appendChild(el);
                }

                mazeDiv.appendChild(row);

            }

            mazeDiv.style.opacity = '1';

        }.bind(this), 150);

    };

}());