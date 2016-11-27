var capture;
var formData = new FormData;

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
	formData.append("file", data);
	formData.append("url", "https://gcgallo.github.io/ampswebscan/index.html");
	formData.append("language", "eng");
	formData.append("api", "c99af1a26988957");
	formData.append("isOverlayRequired", true);
	
	jQuery.ajax({

		url: "https://api.ocr.space/parse/image",
		data: formData,
		dataType: 'form/multipart',
		cache: false,
		contentType: false,
		processData: false,
		type: 'POST',
	success: function (ocrParsedResult) {}})
	
    /*httpPost("https://api.ocr.space/parse/image", formData, "form/multipart", function(ocrParsedResult){
		print(ocrParsedResult);});*/
  });
  
  //saveCanvas('out', 'png');
  
  
}
