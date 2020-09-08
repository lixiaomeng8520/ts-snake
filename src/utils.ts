enum Direction {
    Left = 37,
    Up,
    Right,
    Down
}

class Pos {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    isEqual(target: Pos): Boolean {
        return this.x == target.x && this.y == target.y
    }
    copy(): Pos {
        return new Pos(this.x, this.y)
    }
}

interface IDraw {
    draw(): void
}

const LENGTH = 20

export { Direction, Pos, IDraw, LENGTH }