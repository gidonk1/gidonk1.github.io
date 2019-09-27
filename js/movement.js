;(function() {

    // If maze is undefined, initialise.
    if (typeof mazeGeneratorAndSolver === "undefined") {
        window.mazeGeneratorAndSolver = {};
    }

    let movement = mazeGeneratorAndSolver.movement = {};

    movement.bindArrows = function () {
        window.addEventListener("keydown", arrowDirections);
    };

    movement.unbindArrows = function () {
        window.removeEventListener("keydown", arrowDirections)
    };

    function arrowDirections(key) {

        let value = key.which;

        if (value === arrowValues.left) {
            moveWest();
            checkEndGame();
            key.preventDefault();
        }
        if (value === arrowValues.up) {
            moveNorth();
            checkEndGame();
            key.preventDefault();
        }
        if (value === arrowValues.right) {
            moveEast();
            checkEndGame();
            key.preventDefault();
        }
        if (value === arrowValues.down) {
            moveSouth();
            checkEndGame();
            key.preventDefault();
        }

    }

    function moveWest() {
        let curr = mazeGeneratorAndSolver.game.position;
        // If there is not a wall to west, update position.
        if (!curr.west) {
            mazeGeneratorAndSolver.game.position = mazeGeneratorAndSolver.maze.grid[curr.y][curr.x - 1];
            updatePositionVisually(curr);
        }
    }

    function moveEast() {
        let curr = mazeGeneratorAndSolver.game.position;
        // If there is not a wall to east, update position.
        if (!curr.east) {
            mazeGeneratorAndSolver.game.position = mazeGeneratorAndSolver.maze.grid[curr.y][curr.x + 1];
            updatePositionVisually(curr);
        }
    }

    function moveNorth() {
        let curr = mazeGeneratorAndSolver.game.position;
        // If there is not a wall to north, update position.
        if (!curr.north) {
            mazeGeneratorAndSolver.game.position = mazeGeneratorAndSolver.maze.grid[curr.y + 1][curr.x];
            updatePositionVisually(curr);
        }
    }

    function moveSouth() {
        let curr = mazeGeneratorAndSolver.game.position;
        // If there is not a wall to south, update position.
        if (!curr.south) {
            mazeGeneratorAndSolver.game.position = mazeGeneratorAndSolver.maze.grid[curr.y - 1][curr.x];
            updatePositionVisually(curr);
        }
    }

    // Displays 'You Win!' overlay if the user wins
    function checkEndGame() {
        if (mazeGeneratorAndSolver.game.position === mazeGeneratorAndSolver.game.endPosition) {
            overlayOn();
        }
    }

    function updatePositionVisually(old) {
        mazeGeneratorAndSolver.oldDiv = document.querySelector('[data-x="' + old.x + '"][data-y="' + old.y + '"]');
        mazeGeneratorAndSolver.oldDiv.className = mazeGeneratorAndSolver.game.oldClassName;
        mazeGeneratorAndSolver.currDiv = document.querySelector('[data-x="' + mazeGeneratorAndSolver.game.position.x + '"][data-y="' + mazeGeneratorAndSolver.game.position.y + '"]');
        mazeGeneratorAndSolver.game.oldClassName = mazeGeneratorAndSolver.currDiv.className;
        mazeGeneratorAndSolver.currDiv.className += ' player';
    }


}());
