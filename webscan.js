var capture;
var formData = new FormData();

var readText = function (data) {

        console.log('calling readText');

        // Create an image element and load it from the server
        //var f = new Image();
        //f.src = '/test.png';

        // Prepare form data
        var formData = new FormData();
        //formData.append('file', "out.png");

        formData.append('url', 'https://thirdwitchfirstmurderer.files.wordpress.com/2012/01/macbeth-text.jpg');
        formData.append('language', 'eng');
        formData.append('apikey', 'c99af1a26988957');

        formData.append('isOverlayRequired', true);

        // Send OCR Parsing request asynchronously
        jQuery.ajax({
            url: 'https://api.ocr.space/parse/image',
            data: formData,
            dataType: 'form/multipart',
            cache: false,
            contentType: false,
            processData: false,
            method: 'post',
            success: function (ocrParsedResult) {
                // Get the parsed results, exit code and error message and details
                var parsedResults = ocrParsedResult['ParsedResults'];
                var ocrExitCode = ocrParsedResult['OCRExitCode'];
                var isErroredOnProcessing = ocrParsedResult['IsErroredOnProcessing'];
                var errorMessage = ocrParsedResult['ErrorMessage'];
                var errorDetails = ocrParsedResult['ErrorDetails'];

                var processingTimeInMilliseconds = ocrParsedResult['ProcessingTimeInMilliseconds'];

                // If we have got parsed results, then loop over the results to do something
                if (parsedResults!= null) {
                    // Loop through the parsed results
                    $.each(parsedResults, function (index, value) {
                        var exitCode = value['FileParseExitCode'];
                        var parsedText = value['ParsedText'];
                        var errorMessage = value['ParsedTextFileName'];
                        var errorDetails = value['ErrorDetails'];

                        var textOverlay = value['TextOverlay'];

                        var pageText = '';
                        switch (+exitCode) {
                            case 1:
                                pageText = parsedText;
                                break;
                            case 0:
                            case -10:
                            case -20:
                            case -30:
                            case -99:
                            default:
                                pageText += 'Error: ' + errorMessage;
                                break;
                        }

                        $.each(textOverlay['Lines'], function (index, value) {
                            // LOOP THROUGH THE LINES AND GET WORDS TO DISPLAY ON TOP OF THE IMAGE AS OVERLAY
                            console.log(i, v);
                        });

                        // YOUR CODE HERE
                        // `parsedText` is in the object, but it isn't printing here.
                        console.log('parsedText', parsedText);
                        $('#textOutput').text(parsedText);

                    });
                }
            }
        });
    };

/*formData.append("file", "test.png");
//formData.append("url", "https://gcgallo.github.io/ampswebscan/test.png");
formData.append("language", "eng");
formData.append("apikey", "c99af1a26988957");

formData.append("isOverlayRequired", true);*/


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
	
	//formData.set("file", "test2.png");

	//Send OCR Parsing request asynchronously
	readText(data);
    /*httpPost("https://api.ocr.space/parse/image", formData, "form/multipart", function(ocrParsedResult){
		print(ocrParsedResult);});*/
  });
  
  //saveCanvas('out', 'png');
}

