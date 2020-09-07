// let canvas = document.querySelector('canvas') as HTMLCanvasElement
// canvas.width = 100
// canvas.height = 100


// let context = canvas.getContext('2d') as CanvasRenderingContext2D


// context.beginPath()
// context.rect(0, 0, 100, 100)
// context.fillStyle = 'yellow'
// context.fill()

// context.fillStyle = 'red'
// context.fill()

enum Direction  { Left = 37, Up, Right, Down }

class Pos {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
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
        if (next.x < 0 || next.x > 4 || next.y < 0 || next.y > 4) {
            this.isDead = true
            return
        }

        // 碰到自己
        for(const pos in this.snake.body) {
            if (this.snake.body[pos].x == next.x && this.snake.body[pos].y == next.y) {
                this.isDead = true
                return
            }
        }

        // 头部加上
        this.snake.body.unshift(next)

        // 是否吃到食物，如果吃到，则尾巴不动，如果没吃到，则尾巴shift
        if (next.x != this.food.body.x || next.y != this.food.body.y) {
            this.snake.body.pop()
        }

        console.log(this.snake.body)
    }

}

class Snake {
    // 方向
    direction: Direction
    // 身体数组
    body: Pos[]

    constructor(direction: Direction, body: Pos[]) {
        this.direction = direction
        this.body = body
    }

    // 获取下一个位置
    getNext(): Pos {
        const next: Pos = { ...this.body[0] }
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
}

class Food {
    body: Pos
    constructor(pos: Pos) {
        this.body = pos
    }
}

const snake: Snake = new Snake(Direction.Right, [new Pos(1, 0), new Pos(0, 0)])
const food: Food = new Food(new Pos(3, 1))
const game: Game = new Game(snake, food)

document.addEventListener('keyup', (ev: KeyboardEvent) => {
    if (ev.keyCode in Direction) {
        if (Math.abs(ev.keyCode - snake.direction) % 2 == 1) {
            game.snake.direction = ev.keyCode
        }
    }
})

const interval: number = setTimeout(() => {
    
    game.move()
    
}, 1000)