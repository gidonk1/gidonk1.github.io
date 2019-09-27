$(document).ready(function () {

    $("#newMazeButton").click(function () {

        // Enable start game button.
        enableStartGameButton();

        // Disable the solve button until the game has been started.
        disableSolveButton();

        // Create the randomised maze.
        mazeGeneratorAndSolver.maze = new Maze();

        // Display the maze.
        new mazeGeneratorAndSolver.DisplayMaze();

        // Unbind arrow keys to movement until new game.
        mazeGeneratorAndSolver.movement.unbindArrows();
    });

    $("#startGameButton").click(function () {

        // User cannot start game once the game has already started.
        disableStartGameButton();

        // Initialise start and end points.
        mazeGeneratorAndSolver.game.start();

        // Enable the solve button.
        enableSolveButton();

        // Bind arrow keys to movement.
        mazeGeneratorAndSolver.movement.bindArrows();
    });

    $("#solveButton").click(function () {

        // Disable solve button until maze game has been started.
        disableSolveButton();

        // Disable maze button until maze has been solved.
        disableNewMazeButton();

        // Unbind arrow keys to movement until new game.
        mazeGeneratorAndSolver.movement.unbindArrows();

        // Function call re-enables new maze button after animation.
        mazeGeneratorAndSolver.game.solve();

    });

    $("#close").click(function () {
        document.getElementById("myTutorial").style.display = 'none';
    });

});
