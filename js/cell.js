class Cell {

    constructor(y, x) {
        this._y = y;
        this._x = x;
        this._north = true; // true iff there is a wall to north of cell
        this._east = true;
        this._south = true;
        this._west = true;
        this._visited = false; // used to create and solve maze
        this._nextCell = undefined; // used to solve maze
    };

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get north() {
        return this._north;
    }

    set north(value) {
        this._north = value;
    }

    get east() {
        return this._east;
    }

    set east(value) {
        this._east = value;
    }

    get south() {
        return this._south;
    }

    set south(value) {
        this._south = value;
    }

    get west() {
        return this._west;
    }

    set west(value) {
        this._west = value;
    }

    get visited() {
        return this._visited;
    }

    set visited(value) {
        this._visited = value;
    }

    get nextCell() {
        return this._nextCell;
    }

    set nextCell(value) {
        this._nextCell = value;
    }

}