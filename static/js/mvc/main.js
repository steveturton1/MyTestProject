/**
 * Created by Steve on 15/12/2014.
 */

MainController.prototype = {};
MainController.prototype.constructor = MainController;
function MainController() {

	this.model = new MainModel();
	this.model.AddDummyData();

    this.view = new MainView();
	this.view.canvas.onmousedown = function(e) {
		//e.preventDefault();
    	var loc = controller.windowToCanvas(e.clientX, e.clientY);
	};
}

MainController.prototype.index=function(img) {
	// Initialise the canvas with the grid and the selected garment (img)

	this.model.garmentImage = new Image();

	this.model.garmentImage.onload = function() {
		controller.view.canvasRenderBackground();
    	controller.view.canvasRenderAll();
	};
	this.model.garmentImage.onerror = function() {
		controller.view.canvasRenderBackground("MISSING IMAGE!");
    	controller.view.canvasRenderAll();
	};
	this.model.garmentImage.src = img;
};

MainController.prototype.windowToCanvas = function (x, y) {
	var bbox = this.view.canvas.getBoundingClientRect();
	return { x : x - bbox.left * (this.view.canvas.width / bbox.width),
			 y : y - bbox.top  * (this.view.canvas.height / bbox.height) };

};

MainController.prototype.garmentThumbnailClick=function(element) {

	// TODO - MOVE TO View
	// The user has clicked a thumbnail - we want to show the bigger image.

	var img = $(element).find("img");						// Get the image clicked
	$("#mcts-colour").text(img.attr("data-displayname"));	// Get the display name and display it.

	// Deselect any selected images (should only be 1)
	$(element).parent().parent().find("li").find("img").removeClass("selected-img");

	img.addClass("selected-img");							// Select the clicked image
	this.index(img.attr("data-img-medium"));	// Reinitialise the canvas with the new image
};



MainView.prototype = {};
MainView.prototype.constructor = MainView;
function MainView() {
	this.canvas = document.getElementById("mc-canvas");
	this.context = this.canvas.getContext("2d");
	this.canvasBackgroundImageData;			// contains the grid and garmentImage
};

MainView.prototype.canvasRenderBackground=function(garmentImageError) {
	this.canvasRenderGrid('whitesmoke', 10, 10);

	if (garmentImageError === undefined) {
		// no problem with the garment image so draw it.
		this.context.drawImage(controller.model.garmentImage, 0, 0);
	} else {
		// problem, just output the error (usually missing image).
		this.context.fillText(garmentImageError, 10, 10);
	}

	this.canvasSaveBackground();
};

MainView.prototype.canvasRenderGrid=function(color, stepX, stepY) {
	this.context.save();

	this.context.translate(0.5, 0.5);	// so all lines straddle the pixels and aren't blurred - http://www.mobtowers.com/html5-canvas-crisp-lines-every-time/

	this.context.strokeStyle = color;
	this.context.lineWidth = 1;
	this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		for (var i = stepX; i < this.context.canvas.width; i += stepX) {
			this.context.beginPath();
			this.context.moveTo(i, 0);
			this.context.lineTo(i, this.context.canvas.height);
			this.context.stroke();
		}

		for (i = stepY; i < this.context.canvas.height; i += stepY) {
			this.context.beginPath();
			this.context.moveTo(0, i);
			this.context.lineTo(this.context.canvas.width, i);
			this.context.stroke();
		}
		this.context.restore();
};

MainView.prototype.canvasRenderAll=function() {
	// Draw the background grid and garment
	this.canvasRestoreBackground();

	// Draw each motif
	for (var i = 0, len = controller.model.motifs.length; i < len; i++) {
		controller.model.motifs[i].draw(this.context);
	}

};

MainView.prototype.canvasSaveBackground=function() {
	// Saves the grid and the garmentImage so it can be quickly retrieved.
	this.canvasBackgroundImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

MainView.prototype.canvasRestoreBackground=function() {
	this.context.putImageData(this.canvasBackgroundImageData, 0, 0);
};



MainModel.prototype = {};
MainModel.prototype.constructor = MainModel;
function MainModel() {
	this.motifs = [];
	this.garmentImage = new Image();
}

MainModel.prototype.AddDummyData = function() {
	var x = new Motif();
	this.motifs.push(x);

	x = new Motif(20, 150, 100, 100);
	x.selected = true;
	this.motifs.push(x);
};