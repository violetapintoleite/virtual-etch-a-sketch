// Select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;
const { width, height } = canvas;

// create random x and y starting points on the canvas

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

// draw line
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// draw function
function draw({ key }) {
// increment the hue
hue = hue + 1;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

//start the path
ctx.beginPath();
ctx.moveTo(x, y);

// move x and y values depending on what the user did

switch (key) {
    case 'ArrowUp':
        y -= MOVE_AMOUNT;
        break;

    case 'ArrowRight':
        x += MOVE_AMOUNT;
        break;

    case 'ArrowDown':
        y += MOVE_AMOUNT;
        break;

    case 'ArrowLeft':
        x -= MOVE_AMOUNT;
        break;
        default:
        break;

    }

    ctx.lineTo(x, y);
    ctx.stroke();
}


// handler for the keys
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        draw({ key: e.key });

    }
}


// clear/shake function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener('animationend', function () {
       
        canvas.classList.remove('shake');
    }, { once: true }
    );
}


// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);