;(function () {

    // If maze is undefined, initialise.
    if (typeof mazeGeneratorAndSolver === "undefined") {
        window.mazeGeneratorAndSolver = {};
    }

    let css = mazeGeneratorAndSolver.css = {};

    css.initialise = function () {

        // Set maze dimensions.
        mazeGeneratorAndSolver.mazeWidth = $(window).width() - 120;
        mazeGeneratorAndSolver.mazeHeight = $(window).height() / 1.3;

        // Create the randomised maze.
        mazeGeneratorAndSolver.maze = new Maze();

        // Display the maze.
        new mazeGeneratorAndSolver.DisplayMaze();

        // Disable the solve maze button (re-enabled when game starts).
        disableSolveButton();
    };

}());