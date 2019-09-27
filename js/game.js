;(function() {

    // If maze is undefined, initialise.
    if (typeof mazeGeneratorAndSolver === "undefined") {
        window.mazeGeneratorAndSolver = {};
    }

    // If game is undefined, initialise.
    if (typeof mazeGeneratorAndSolver.game === "undefined") {
        window.mazeGeneratorAndSolver.game = {};
    }

    let game = window.mazeGeneratorAndSolver.game;

    game.start = function () {
        initialiseStart();
        initialiseEndPoint();
    };

    game.solve = function () {

        // Solve maze by finding shortest path between current and end position.
        // Function sets field 'nextCell' of the cells between current and end position.
        mazeGeneratorAndSolver.maze.solveMaze(game.endPosition, game.position);

        // Return length of shortest path.
        let length = mazeGeneratorAndSolver.maze._findLengthOfPath(game.position, game.endPosition);

        // Display the solution, speed of animation inversely proportional to path length.
        displaySolution(length);

    };

    function initialiseStart() {

        // Player starts in bottom left corner.
        game.position = mazeGeneratorAndSolver.maze.grid[0][0];
        mazeGeneratorAndSolver.currDiv = document.querySelector('[data-x="' + 0 + '"][data-y="' + 0 + '"]');

        // Store classname for (0, 0) before the player is added.
        // This variable is used so we can restore cells to how they looked before the player arrived.
        game.oldClassName = mazeGeneratorAndSolver.currDiv.className;

        // Update (0, 0) visually to contain player.
        mazeGeneratorAndSolver.currDiv.className += ' player';
    }

    function initialiseEndPoint() {

        // Randomise end position.
        let endCell = randomiseCell();

        // Make sure end is not the same as the starting position.
        while (endCell === game.position) {
            endCell = randomiseCell();
        }

        game.endPosition = endCell;

        // Add end point visually to the maze.
        document.querySelector('[data-x="' + endCell.x + '"][data-y="' + endCell.y + '"]').className += ' end';
    }

    function displaySolution(length) {

        function myLoop () {

            // Draw maze with timeout.
            // Timeout inversely proportional to length of path.

            setTimeout(function () {

                // Update game position to next cell in path.
                game.position = game.position.nextCell;

                mazeGeneratorAndSolver.currDiv = document.querySelector('[data-x="' + game.position.x + '"][data-y="' + game.position.y + '"]');
                mazeGeneratorAndSolver.currDiv.className += ' path';

                if (!(game.position === game.endPosition)) {
                    myLoop();
                } else {
                    // Re-enable 'new maze button' when animation is complete.
                    enableNewMazeButton();
                }

            }, 1000 / length)
        }

        myLoop();

    }

}());