var capture;
var data = new FormData;

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

  saveFrames("out", "png", 1, 1, function(formData){
	print(formData)
	data.append("file", formData);
	data.append("url", "https://gcgallo.github.io/ampswebscan/index.html");
	data.append("language", "eng");
	data.append("api", "c99af1a26988957");
	data.append("isOverlayRequired", true);
	
	jQuery.ajax({

		url: "https://api.ocr.space/parse/image",
		data: formData,
		dataType: 'form/multipart',
		cache: false,
		contentType: false,
		processData: false,
		type: 'json',
	success: function (ocrParsedResult) {}})
	
    /*httpPost("https://api.ocr.space/parse/image", formData, "form/multipart", function(ocrParsedResult){
		print(ocrParsedResult);});*/
  });
  
  //saveCanvas('out', 'png');
  
  
}
