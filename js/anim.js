var canvas = document.querySelector( 'canvas' );
var context = canvas.getContext( '2d' );

var time = 0,
    velocity = 0.1,
    velocityTarget = 0.1,
    width,
    height,
    lastX,
    lastY;

var MAX_OFFSET = 300; //konusno / konveksno
var SPACING = 2; // RESOLUTION
// var SPACING = 0.2;
var POINTS = MAX_OFFSET / SPACING;
var PEAK = MAX_OFFSET * 0.25; //BRDO U SREDINI
var POINTS_PER_LAP = -8;
var SHADOW_STRENGTH = 12;

function startline(){
    POINTS_PER_LAP -= 0.02;
    // console.log(POINTS_PER_LAP);
    if(POINTS_PER_LAP < -30){
      clearInterval(lineInterval)
      console.log("done " + POINTS_PER_LAP);
    }
}

var lineInterval = setInterval(startline, 350)

setup();

function setup() {

  resize();
  step();

  window.addEventListener( 'resize', resize );
  // window.addEventListener( 'mousedown', onMouseDown );
  // document.addEventListener( 'touchstart', onTouchStart );

}

function resize() {

  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

}

function step() {

  time += velocity;
  velocity += ( velocityTarget - velocity ) * 0.3;

  clear();
  render();

  requestAnimationFrame( step );

}

function clear() {

  context.clearRect( 0, 0, width, height );

}

function render() {

  var x, y,
      cx = width/2,
      cy = height/2;

  context.globalCompositeOperation = 'lighter';
  context.strokeStyle = '#fff';
  context.shadowColor = '#fff';
  context.lineWidth = 2;
  context.beginPath();

  for( var i = POINTS; i > 0; i -- ) {

    var value = i * SPACING + ( time % SPACING );

    var ax = Math.sin( value/POINTS_PER_LAP ) * Math.PI,
        ay = Math.cos( value/POINTS_PER_LAP ) * Math.PI;

    x = ax * value,
    y = ay * value * 0.35;

    var o = 1 - ( Math.min( value, PEAK ) / PEAK );

    y -= Math.pow( o, 2 ) * 200;
    y += 200 * value / MAX_OFFSET;
    y += x / cx * width * 0.1;

    context.globalAlpha = 1 - ( value / MAX_OFFSET );
    context.shadowBlur = SHADOW_STRENGTH * o;

    context.lineTo( cx + x, cy + y );
    context.stroke();

    context.beginPath();
    context.moveTo( cx + x, cy + y );

  }

  context.lineTo( cx, cy - 200 );
  context.lineTo( cx, 0 );
  context.stroke();

}


// console.log(123)
