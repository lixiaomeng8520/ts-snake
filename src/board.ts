import { IDraw, Pos } from './utils.js'
import Draw from './draw.js'

export default class Board extends Draw implements IDraw {
    width: number
    height: number
    
    constructor(width: number, height: number, color: string, ctx: CanvasRenderingContext2D) {
        super(color, ctx)
        this.width = width
        this.height = height
    }

    draw(): void {
        this.fillRect(new Pos(0, 0), new Pos(this.width, this.height))
    }
}