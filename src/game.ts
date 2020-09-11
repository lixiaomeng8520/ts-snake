import { Direction, Pos, LENGTH } from './utils.js'
import Board from './board.js'
import Snake from './snake.js'
import Food from './food.js'

export default class Game {
    board: Board
    snake: Snake
    food: Food

    isDead: boolean = false
    interval: number = 0

    nextDirection: Direction | null = null

    constructor() {

        const canvas: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement
        canvas.width = 800
        canvas.height = 400
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

        this.board = new Board(canvas.width / LENGTH, canvas.height / LENGTH, '#001F5C', ctx)
        this.snake = new Snake(Direction.Right, [new Pos(2, 0), new Pos(1, 0), new Pos(0, 0)], 'yellow', ctx)
        this.food = new Food(new Pos(9, 1), 'yellow', ctx)

        document.addEventListener('keyup', (ev: KeyboardEvent) => {
            if (ev.keyCode in Direction) {
                if (Math.abs(ev.keyCode - this.snake.direction) % 2 == 1) {
                    this.nextDirection = ev.keyCode
                }
            }
        })

        this.board.draw()
        this.snake.draw()
        this.food.draw()

        this.start()
    }

    start(): void {
        
        this.interval = setInterval(() => {
            if (this.nextDirection != null) {
                this.snake.direction = this.nextDirection
            }

            const next: Pos = this.snake.getNext()

            if (next.x < 0 || next.x >= this.board.width || next.y < 0 || next.y > this.board.height) {
                // this.isDead = true
                console.log('碰到边了')
                clearInterval(this.interval)
                return
            }

            this.snake.unshift(next)
            if (this.snake.isCollisionMyself()) {
                console.log('碰到自己了')
                
                clearInterval(this.interval)
                return
            }

            if (this.snake.isCollisionOther(this.food.body)) {
                console.log('吃到食物了')
                // 重新生成
                
            } else {
                this.snake.pop()
            }

            this.board.draw()
            this.snake.draw()
            this.food.draw()
        }, 2500)
    }
}