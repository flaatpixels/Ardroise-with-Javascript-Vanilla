/**
 * Canvas space
 * @type {HTMLElement}
 */
let canvas = document.getElementById("draw");

/**
 * Color input
 * @type {HTMLElement}
 */
let color = document.getElementById("color");

/**
 * Canvas Context
 * @type {CanvasRenderingContext2D}
 */
let ctx = canvas.getContext("2d");

/**
 * Active the Drawing mode
 * @type {Boolean}
 */
let isDraw = false;

/**
 * Active the Clearing mode
 * @type {Boolean}
 */
let isClear = false;

/**
 * Width of the line
 * @type {Number}
 */
let lineWidth = 25;

// Make canva take the whole size of the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Style of lines
ctx.lineWidth = lineWidth;
ctx.lineCap = 'round';
ctx.lineJoin = 'round'

/**
 * Toggle the drawing mode
 * @return {Boolean}
 */
function toggleDrawingMode(e) {
  // If click on left button
  // toggle the dwaring mode / disable the clearing mode
  if(!e.button){
    isDraw = !isDraw;
    isClear = false;
  } else {
    isDraw = false;
    isClear = !isClear;
  }
}

/**
 * Start a new trace
 * @param  {Number} posX Where to start the trace in X
 * @param  {Number} posY Where to start the trace in Y
 * @return {undefined}
 */
function beginTrait(posX, posY){
  ctx.beginPath();
  ctx.moveTo(posX, posY);
}

/**
 * Make the trace visible while moving the mouse
 * @param  {Number} posX The X position to stop the trait
 * @param  {Number} posY The Y position to stop the trai
 * @return
 */
function buildTrait(posX, posY){
  ctx.lineTo(posX, posY);
  ctx.strokeStyle = color.value;
  ctx.stroke();
  return true;
}

/**
 * Remove a part of a trace
 * @param  {Number} posX Where to clear in X
 * @param  {Number} posY Where to clear in Y
 * @return {undefined}
 */
function removeTrait(x, y){
  ctx.clearRect(x, y, lineWidth, lineWidth);
}

// When double click
// Trigger the color picker
window.addEventListener('dblclick', (e) =>{
  console.log(e);
  e.preventDefault();
  color.click();
});

window.addEventListener('contextmenu', (e) => e.preventDefault());

// When click (right or left)
// toggle drawing or clearing mode
// Then start the trace if drawing mode is active
window.addEventListener('mousedown', (e) => {
  toggleDrawingMode(e);
  if(isDraw){
    beginTrait(e.offsetX, e.offsetY);
  }
});

// Stop drawing or clearing
// When click is realeased
window.addEventListener('mouseup', (e) => {
  toggleDrawingMode(e);
});

// Trace or clear while moving the mouse
window.addEventListener('mousemove', (e) => {
  if(isDraw){
    buildTrait(e.offsetX, e.offsetY);
  }
  if(isClear){
    removeTrait(e.offsetX, e.offsetY);
  }
});