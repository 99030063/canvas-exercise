var canvas = document.getElementById('canvas2d');

canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

var c = canvas.getContext("2d") //c is context

var randomColor = [];

for(var i = 0; i < 100; i++){
    randomColor.push(getRandomColor())
}

function getRandomColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function Circle(x, y, dx, dy, radius, circleNumber){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = getRandomColor();

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = randomColor[circleNumber];
        c.fill();
        c.strokeStyle = "";
        c.stroke();
    }

    this.update = function(){
        if(this.x + this.radius > canvas.width | this.x - this.radius < 0){
            this.dx = -this.dx
        }

        if(this.y + this.radius > canvas.height | this.y - this.radius < 0){
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy

        this.draw();
    }
}
    
var circleArray = [];

for(var i = 0; i < 100; i++){
    var radius = 30;
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    var color = getRandomColor();
    circleArray.push(new Circle(x, y, dx, dy, radius, i))
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

animate();