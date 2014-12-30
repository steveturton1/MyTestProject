/**
 * Created by Steve on 15/12/2014.
 */

MainCanvas.prototype = {};
MainCanvas.prototype.constructor = MainCanvas;

function MainCanvas() {
	// maybe wrap this in a vars object for tidyness

    this.canvas = document.getElementById("mc-canvas"),
	this.context = this.canvas.getContext("2d"),
	this.canvasBackgroundImageData,			// contains the grid and garmentImage
	this.garmentImage = new Image();

    this.canvas.onmousedown = onmousedown;
}


MainCanvas.prototype.testmouseover=function(element) {

	// do this better - I keep finding the selected image.  Just do it once.

	var img = $(element).find("img").attr("data-img-medium");

	// Get the display name and display it.
	$("#mcts-colour").text($(element).find("img").attr("data-displayname"));

	// Deselect any selected images (should only be 1)
	$(element).parent().parent().find("li").find("img").removeClass("selected-img");

	// Select the clicked image
	$(element).find("img").addClass("selected-img");

	this.initialise_canvas(img);
};


MainCanvas.prototype.initialise_canvas=function(img) {
	this.garmentImage = new Image();
	var _this = this;

	this.garmentImage.onload = function() {
		_this.renderGrid('whitesmoke', 10, 10);
		_this.context.drawImage(_this.garmentImage, 0, 0);

		_this.saveCanvasBackground();
    	_this.renderAll();
	};
	this.garmentImage.onerror = function() {
		_this.renderGrid('whitesmoke', 10, 10);
		_this.context.fillText("MISSING IMAGE!", 10, 10);

		_this.saveCanvasBackground();
    	_this.renderAll();
	};

	this.garmentImage.src = img;
};

MainCanvas.prototype.renderGrid=function(color, stepx, stepy) {
	this.context.save();

	this.context.translate(0.5, 0.5);	// so all lines straddle the pixels and aren't blurred - http://www.mobtowers.com/html5-canvas-crisp-lines-every-time/

	this.context.strokeStyle = color;
	this.context.lineWidth = 1;
	this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		for (var i = stepx; i < this.context.canvas.width; i += stepx) {
			this.context.beginPath();
			this.context.moveTo(i, 0);
			this.context.lineTo(i, this.context.canvas.height);
			this.context.stroke();
		}

		for (i = stepy; i < this.context.canvas.height; i += stepy) {
			this.context.beginPath();
			this.context.moveTo(0, i);
			this.context.lineTo(this.context.canvas.width, i);
			this.context.stroke();
		}
		this.context.restore();
};

MainCanvas.prototype.saveCanvasBackground=function() {
	// Saves the grid and the garmentImage so it can be quickly retrieved.
	this.canvasBackgroundImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

MainCanvas.prototype.restoreCanvasBackground=function() {
	this.context.putImageData(this.canvasBackgroundImageData, 0, 0);
};

MainCanvas.prototype.renderAll=function() {
	this.restoreCanvasBackground();
};

onmousedown=function(e){
    //var x = 1;
};