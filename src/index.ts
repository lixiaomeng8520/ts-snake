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
    
}

class Snake {
    // 方向
    direction: Direction = Direction.Right
    // 身体数组
    body: Pos[] = [new Pos(1, 0), new Pos(0, 0)]

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

    // 移动
    move(): void {
        const next: Pos = this.getNext()
        if (next.x < 0 || next.x > 4 || next.y < 0 || next.y > 4) {
            alert('die')
        }

    }
}

class Food {

}

const snake: Snake = new Snake()
console.log(snake.getNext(), snake.body)

const arr: number[] = [3]
console.log(0 in arr)

document.addEventListener('keyup', (ev: KeyboardEvent) => {
    if (ev.keyCode in Direction) {
        
    }
    snake.direction = ev.keyCode
})