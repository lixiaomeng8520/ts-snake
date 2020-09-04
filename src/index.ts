let canvas = document.querySelector('canvas') as HTMLCanvasElement
canvas.width = 100
canvas.height = 100


let context = canvas.getContext('2d') as CanvasRenderingContext2D


context.beginPath()
context.rect(0, 0, 100, 100)
context.fillStyle = 'yellow'
context.fill()

context.fillStyle = 'red'
context.fill()