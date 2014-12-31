/**
 * Created by Steve on 15/12/2014.
 */

MainController.prototype = {};
MainController.prototype.constructor = MainController;

function MainController() {
	this.model = new MainModel(),
    this.view = new MainView();
    //this.canvas.onmousedown = onmousedown;
}

/*
onmousedown=function(e){
    //var x = 1;
};
*/

MainController.prototype.initialiseCanvas=function(img) {
	// Initialise the canvas with the grid and the selected garment (img)

	this.view.garmentImage = new Image();
	var _this = this;

	this.view.garmentImage.onload = function() {
		_this.view.renderCanvasBackground();
    	_this.view.renderCanvasAll();
	};
	this.view.garmentImage.onerror = function() {
		_this.view.renderCanvasBackground("MISSING IMAGE!");
    	_this.view.renderCanvasAll();
	};
	this.view.garmentImage.src = img;
};

MainController.prototype.garmentThumbnailClick=function(element) {
	// The user has clicked a thumbnail - we want to show the bigger image.

	var img = $(element).find("img");						// Get the image clicked
	$("#mcts-colour").text(img.attr("data-displayname"));	// Get the display name and display it.

	// Deselect any selected images (should only be 1)
	$(element).parent().parent().find("li").find("img").removeClass("selected-img");

	img.addClass("selected-img");							// Select the clicked image
	this.initialiseCanvas(img.attr("data-img-medium"));	// Reinitialise the canvas with the new image
};



MainView.prototype = {};
MainView.prototype.constructor = MainView;
function MainView() {
	this.canvas = document.getElementById("mc-canvas"),
	this.context = this.canvas.getContext("2d"),
	this.canvasBackgroundImageData,			// contains the grid and garmentImage
	this.garmentImage = new Image();
}

MainView.prototype.renderCanvasBackground=function(garmentImageError) {
	this.renderCanvasGrid('whitesmoke', 10, 10);

	if (garmentImageError === undefined) {
		// no problem with the garment image so draw it.
		this.context.drawImage(this.garmentImage, 0, 0);
	} else {
		// problem, just output the error (usually missing image).
		this.context.fillText(garmentImageError, 10, 10);
	}

	this.view.saveCanvasBackground();
};

MainView.prototype.renderCanvasGrid=function(color, stepx, stepy) {
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

MainView.prototype.saveCanvasBackground=function() {
	// Saves the grid and the garmentImage so it can be quickly retrieved.
	this.canvasBackgroundImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

MainView.prototype.restoreCanvasBackground=function() {
	this.context.putImageData(this.canvasBackgroundImageData, 0, 0);
};

MainView.prototype.renderCanvasAll=function() {
	this.restoreCanvasBackground();
};



MainModel.prototype = {};
MainModel.prototype.constructor = MainModel;
function MainModel() {}
