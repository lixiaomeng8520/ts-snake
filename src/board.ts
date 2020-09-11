import { IDraw, Pos } from './utils.js'
import Draw from './draw.js'

export default class Board extends Draw implements IDraw {
    width: number
    height: number
    body: Pos[]
    
    constructor(width: number, height: number, color: string, ctx: CanvasRenderingContext2D) {
        super(color, ctx)
        this.width = width
        this.height = height
        this.body = [] // new Array(this.width * this.height)
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.body.push(new Pos(i, j))
            }
        }
    }

    getRemain(poss: Pos[]): Pos[] {
        let remain: Pos[] = []
        for (let i = 0; i < this.body.length; i++) {
            remain.push(this.body[i])
        }
        return remain
    }

    draw(): void {
        this.fillRect(new Pos(0, 0), new Pos(this.width, this.height))
    }
}