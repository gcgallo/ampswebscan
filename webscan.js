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
  saveFrames("out", "png", 1, 1, function(data){
    print(data);
    loadImage("out.png", function(img) {
      image(img, 0, 50);
    });
  });
}
