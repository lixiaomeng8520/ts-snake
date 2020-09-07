enum Direction  { Left = 37, Up, Right, Down }

class Pos {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

interface IDraw {
    draw(): void
}

interface IObj {
    poss: Pos[]
}

class Game {
    snake: Snake
    food: Food
    isDead: boolean = false

    constructor(snake: Snake, food: Food) {
        this.snake = snake
        this.food = food
    }

    // 移动
    move(): void {
        
        // 获取下一个位置
        const next: Pos = this.snake.getNext()

        // 出界
        if (next.x < 0 || next.x > 9 || next.y < 0 || next.y > 9) {
            this.isDead = true
            return
        }

        // 碰到自己
        for(const pos in this.snake.poss) {
            if (this.snake.poss[pos].x == next.x && this.snake.poss[pos].y == next.y) {
                this.isDead = true
                return
            }
        }

        // 头部加上
        this.snake.poss.unshift(next)

        // 是否吃到食物，如果吃到，则尾巴不动，如果没吃到，则尾巴shift
        if (next.x != this.food.poss[0].x || next.y != this.food.poss[0].y) {
            this.snake.poss.pop()
        }
    }

}

class Canvas {
    el: HTMLCanvasElement
    context: CanvasRenderingContext2D
    constructor(el: HTMLCanvasElement, width: number, height: number) {
        this.el = el
        this.context = this.el.getContext('2d') as CanvasRenderingContext2D
    }
    draw(poss: Pos[]): void {
        
    }
}

class Snake implements IDraw {
    // 方向
    direction: Direction
    // 身体数组
    poss: Pos[]

    constructor(direction: Direction, body: Pos[]) {
        this.direction = direction
        this.poss = body
    }

    // 获取下一个位置
    getNext(): Pos {
        const next: Pos = { ...this.poss[0] }
        switch (this.direction) {
            case Direction.Right:
                next.x++
                break
            case Direction.Left:
                next.x--
                break
            case Direction.Up:
                next.y--
            case Direction.Down:
                next.y++
        }
        return next
    }

    draw(): void {

    }
}

class Food {
    poss: Pos[]
    constructor(pos: Pos[]) {
        this.poss = pos
    }
}

const snake: Snake = new Snake(Direction.Right, [new Pos(1, 0), new Pos(0, 0)])
const food: Food = new Food([new Pos(9, 1)])
// const canvas = new Canvas(document.querySelector('canvas') as HTMLCanvasElement, 100, 100)
const game: Game = new Game(snake, food)

document.addEventListener('keyup', (ev: KeyboardEvent) => {
    if (ev.keyCode in Direction) {
        if (Math.abs(ev.keyCode - snake.direction) % 2 == 1) {
            game.snake.direction = ev.keyCode
        }
    }
})

const interval: number = setInterval(() => {
    
    game.move()
    
    
    context.clearRect(0, 0, 100, 100)
    context.beginPath()
    context.fillStyle = 'yellow'
    context.fillRect(0, 0, 100, 100)
    draw(snake)
    
}, 1000)


const canvas: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement
canvas.width = 100
canvas.height = 100
const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D


function draw(obj: IObj) {
    context.beginPath()
    context.fillStyle = 'blue'
    for (const pos in obj.poss) {
        context.fillRect(obj.poss[pos].x * 10, obj.poss[pos].y * 10, 10, 10)
    }
}
context.fillStyle = 'yellow'

draw(snake)
draw(food)