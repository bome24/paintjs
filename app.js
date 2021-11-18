const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const rectBtn = document.getElementById("jsRect");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let recting = false;


function startPainting(event) {
    painting = true;
    if(recting) {
        event.preventDefault();
        event.stopPropagation();

        startX = parseInt(event.clientX - offsetX);
        startY = parseInt(event.clientY - offsetY);

    }
}

function stopPainting(event) {
    painting = false;
    if(recting) {
        event.preventDefault();
        event.stopPropagation();

        recting = false;

        ctx.strokeRect(prevStartX, prevStartY, prevWidth, prevHeight);
    }
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    if(recting) {
        event.preventDefault();
        event.stopPropagation();
        mouseX = parseInt(event.clientX - event.offsetX);
        mouseY = parseInt(event.clientY - event.offsetY);

        let width = mouseX - startX;
        let height = mouseY - startY;

        ctx.strokeRect(startX, startY, width, height);

        prevStartX = startX;
        prevStartY = startY;

        prevWidth = width;
        prevHeight = height;
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "yourPainting[🎨]";
    link.click();
}

function handleRectClick() {
    recting = true;
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if(rectBtn) {
    rectBtn.addEventListener("click", handleRectClick);
}