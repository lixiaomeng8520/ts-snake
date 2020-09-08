import { Pos, IDraw } from './utils.js'
import Draw from './draw.js'

export default class Food extends Draw implements IDraw {
    body: Pos

    constructor(body: Pos, color: string, ctx: CanvasRenderingContext2D) {
        super(color, ctx)
        this.body = body
    }

    reBuild() {
        
    }

    draw(): void {
        this.fillRect(new Pos(this.body.x, this.body.y), new Pos(1, 1))
    }
}