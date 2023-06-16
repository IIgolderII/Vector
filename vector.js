const canvas = document.getElementById("vector");
const ctx = canvas.getContext("2d");


class Player {
    constructor() {
        this.x = 50
        this.y = canvas.height / 2
        this.direction = 1
        this.speed = 1
        this.keys = [" "]
        this.keyDown = false
        this.mouseDown = false
        this.width = 10

        document.addEventListener("keydown", (e) => {
            if (!this.keyDown) {
                if (this.keys.includes(e.key)) {
                    this.keyDown = true
                    this.direction *= -1
                }
            }
        })
        document.addEventListener("keyup", (e) => {
            if (this.keys.includes(e.key)) {
                this.keyDown = false
            }
        })

        document.addEventListener("mousedown", (e) => {
            if (!this.mouseDown) {
                this.mouseDown = true
                this.direction *= -1
            }
        })
        document.addEventListener("mouseup", (e) => {
            this.mouseDown = false
        })
    }

    move() {
        this.y += this.direction * this.speed
        if (this.y - this.width / 2 < 0) {
            this.direction = 1
        }
        if (this.y + this.width / 2 > canvas.height) {
            this.direction = -1
        }
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x - this.width / 2, this.y - this.width / 2, this.width, this.width);
    }
}

class Object {
    constructor() {
        this.x = canvas.width
        this.speed = Math.random() * .5 + 1
        this.width = Math.random() * 20 + 20
        this.y = Math.random() * (canvas.height - this.width * 2) + this.width
    }

    move() {
        this.x -= this.speed

        if (this.colliding()) {
            end = true
        }
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - this.width / 2, this.y - this.width / 2, this.width, this.width);
    }

    colliding() {
        if (this.x > 0 && this.x - this.width / 2 < player.x + player.width / 2 && this.y + this.width / 2 > player.y - player.width / 2 && this.y - this.width / 2 < player.y + player.width / 2 && this.x + this.width / 2 > player.x - player.width / 2) {
            return true
        } else {
            return false
        }
    }
}

var player = new Player
var objects = [new Object()]
var objectRate = 1000 * 1
var end = false
var lastObjectTime = Date.now()
game()

function game() {

    player.move()

    objects.forEach(object => {
        object.move()
    })

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.draw()

    objects.forEach(object => {
        object.draw()
    })

    if (lastObjectTime + objectRate < Date.now()) {
        objects.push(new Object());
        lastObjectTime = Date.now()
    }

    if (end) {
        console.log("end");
    } else {
        requestAnimationFrame(game)
    }
}