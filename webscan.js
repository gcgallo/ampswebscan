var capture;

function setup() {
  createCanvas(600, 480);
  capture = createCapture(VIDEO);
  capture.size(600, 480);
  capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, 600, 480);
  //filter('INVERT');
}

function mousePressed() {
  saveCanvas('out', 'png');
}
