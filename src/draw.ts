import { LENGTH, Pos } from './utils.js'

export default class Draw {
    color: string
    ctx: CanvasRenderingContext2D

    constructor(color: string, ctx: CanvasRenderingContext2D) {
        this.color = color
        this.ctx = ctx
    }

    fillRect(start: Pos, len: Pos): void {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(start.x * LENGTH, start.y * LENGTH, len.x * LENGTH, len.y * LENGTH)
    }
}