import { Direction, Pos, IDraw } from './utils.js'
import Draw from './draw.js'

export default class Snake extends Draw implements IDraw {
    direction: Direction
    body: Pos[]

    constructor(direction: Direction, body: Pos[], color: string, ctx: CanvasRenderingContext2D) {
        super(color, ctx)
        this.direction = direction
        this.body = body
    }

    getNext(): Pos {
        const next: Pos = this.body[0].copy()
        switch (this.direction) {
            case Direction.Right:
                next.x++
                break
            case Direction.Left:
                next.x--
                break
            case Direction.Up:
                next.y--
                break
            case Direction.Down:
                next.y++
                break
        }
        return next
    }

    pop(): void {
        this.body.pop()
    }

    unshift(pos: Pos): void {
        this.body.unshift(pos)
    }

    isCollisionOther(target: Pos): Boolean {
        return this.body[0].isEqual(target)
    }

    isCollisionMyself(): Boolean {
        for(let i = 0; i < this.body.length; i++) {
            if (i != 0 && this.body[i].isEqual(this.body[0])) {
                return true
            }
        }
        return false
    }

    // isCollision(target: Pos[]): Boolean {
    //     target.isA
    // }

    draw(): void {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        for (const pos in this.body) {
            this.fillRect(new Pos(this.body[pos].x, this.body[pos].y), new Pos(1, 1))
        }
    }
}
