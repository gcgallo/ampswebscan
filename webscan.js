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
    httpPost("https://api.ocr.space/parse/image", data, "json", function(ocrParsedResult));
  });
  
  //saveCanvas('out', 'png');
  
  
}
