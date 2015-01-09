/**
 * Created by Steve on 15/12/2014.
 */


// TODO - load all images needed for motif on start up rather than in motifAdd.
// When click a thumbnail, hourglass and freeze thumbnails until loaded into canvas.
// Have the controller set the cursor based on _selectedMotif state.

MainController.prototype = {};
MainController.prototype.constructor = MainController;
function MainController() {
	this.model = new MainModel();
	this.view = new MainView();
    var _this = this;

    this.model.AddDummyData();

    // Enable mouse and touch screen interaction.
    // Everywhere says use pageX, pageY for touch screen but that won't take into account if the page is scrolled?
    this.view.canvas.addEventListener('mousedown', function(e) {
        e.preventDefault();
        mouseDownOrTouchStart(_this.windowToCanvas(e.clientX, e.clientY));
    });
    this.view.canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        mouseDownOrTouchStart(_this.windowToCanvas(e.touches[0].pageX, e.touches[0].pageY));
    });

    this.view.canvas.addEventListener('mouseup', function(e) {
        e.preventDefault();
        mouseUpOrTouchEnd(_this.windowToCanvas(e.clientX, e.clientY));
    });
    this.view.canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
        mouseUpOrTouchEnd(_this.windowToCanvas(e.changedTouches[0].pageX, e.changedTouches[0].pageY));
    });

    this.view.canvas.addEventListener('mousemove', function(e) {
        e.preventDefault();
        mouseMoveOrTouchMove(_this.windowToCanvas(e.clientX, e.clientY));
    });
    this.view.canvas.addEventListener('touchmove', function(e) {
        // TODO maybe only prevent default if dragging/resizing a motif so the user can still scroll by dragging the canvas with touch screen.
        e.preventDefault();
        mouseMoveOrTouchMove(_this.windowToCanvas(e.touches[0].pageX, e.touches[0].pageY));
    });

	function mouseDownOrTouchStart(location) {
		if (_this.model._selectedMotif) {
			if (_this.model._selectedMotif.hitTestDelete(location, _this.view.context)) {
				return;	// do nothing if over the delete button.
			}

            if (_this.model._selectedMotif.hitTestResize(location, _this.view.context)) {
                // Starting a resize
                _this.model._selectedMotif.resizing = true;
                _this.model.motifTestMouseDown(location, _this.view.context);
                return;
            }
		}

		// See if we hit a motif - select it if we did.
		_this.model.motifResetAll();
		_this.model.motifTestMouseDown(location, _this.view.context);
		_this.view.canvasRenderAll(_this.model.motifs, _this.model.canvasBackgroundImageData);
	};

	function mouseUpOrTouchEnd(location) {
		if (_this.model._selectedMotif) {

			// TODO - TEST THAT IT HAD A MOUSE DOWN RATHER THAN HOVER - MAYBE
            if (_this.model._selectedMotif.hitTestDelete(location, _this.view.context) &&
									_this.model._selectedMotif.deleteButton.mouseHover) {

				// Clicked the delete button.
				_this.model.motifDeleteSelected();
				_this.view.canvasRenderAll(_this.model.motifs, _this.model.canvasBackgroundImageData);
				return;
			}
		}

        _this.model._selectedMotif.dragging = false;
		_this.model._selectedMotif.resizing = false;
        _this.view.canvasSetDefaultCursor();
	};

	function mouseMoveOrTouchMove(location) {
		if (_this.model.motifTestMouseMove(location, _this.view.context)) {
			_this.view.canvasRenderAll(_this.model.motifs, _this.model.canvasBackgroundImageData);     // Something changed so redraw everything.
		}
	};
}

MainController.prototype.index=function(img) {
	// Initialise the canvas with the grid and the selected garment (img)
    var _this = this;
	this.model.garmentImage = new Image();

	this.model.garmentImage.onload = function() {
		_this.view.canvasRenderBackground(_this.model);
    	_this.view.canvasRenderAll(_this.model.motifs, _this.model.canvasBackgroundImageData);
	};
	this.model.garmentImage.onerror = function() {
		_this.view.canvasRenderBackground(_this.model);
    	_this.view.canvasRenderAll(_this.model.motifs, _this.model.canvasBackgroundImageData);
	};
	this.model.garmentImage.src = img;
};

MainController.prototype.windowToCanvas=function (x, y) {
	/*
	var bbox = this.view.canvas.getBoundingClientRect();
	return { x : Math.round(x - bbox.left * (this.view.canvas.width / bbox.width)),
			 y : Math.round(y - bbox.top  * (this.view.canvas.height / bbox.height)) };
	*/

	var bbox = this.view.canvas.getBoundingClientRect();
	return { x : x - bbox.left, y : y - bbox.top};
};

MainController.prototype.garmentThumbnailClick=function(element) {
	// The user has clicked a thumbnail - we want to show the bigger image.
	var img = $(element).find("img");						// Get the image clicked
	$("#mcts-colour").text(img.attr("data-displayname"));	// Get the display name and display it.

	// Deselect any selected images (should only be 1)
	$(element).parent().parent().find("li").find("img").removeClass("selected-img");

	img.addClass("selected-img");							// Select the clicked image
	this.index(img.attr("data-img-medium"));	            // Reinitialise the canvas with the garment
};

MainController.prototype.motifAddDummy=function(e) {
	e.preventDefault();
    var _this = this;

	this.model.motifAddDummy(function(){
		_this.view.canvasRenderAll(_this.model.motifs, _this.model.canvasBackgroundImageData);
	});

}



MainView.prototype = {};
MainView.prototype.constructor = MainView;
function MainView() {
	this.canvas = document.getElementById("mc-canvas");
	this.context = this.canvas.getContext("2d");
};

MainView.prototype.canvasRenderBackground=function(model) {
	this.canvasRenderGrid('whitesmoke', 10, 10);

	if (model.garmentImage !== null) {
		// no problem with the garment image so draw it.
		this.context.drawImage(model.garmentImage, 0, 0);
	} else {
		// problem, just output the error (usually missing image).
		this.context.fillText('MISSING IMAGE!', 10, 10);
	}

    // Save the background grid and garment image so we don't have to keep redrawing it.
	model.canvasBackgroundImageData = this.canvasGetBackground();
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

MainView.prototype.canvasRenderAll=function(motifs, backgroundImageData) {
	this.canvasRestoreBackground(backgroundImageData);

	for (var i = 0, len = motifs.length; i < len; i++) {
		motifs[i].draw(this.context);   // Draw each motif
	}
};

MainView.prototype.canvasGetBackground=function() {
	// Saves the grid and the garmentImage so it can be quickly retrieved.
	return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

MainView.prototype.canvasRestoreBackground=function(backgroundImageData) {
	this.context.putImageData(backgroundImageData, 0, 0);
};

MainView.prototype.canvasSetDragCursor=function() {
	this.canvas.style.cursor = "move";
};

MainView.prototype.canvasSetDefaultCursor=function() {
	this.canvas.style.cursor = "default";
};

MainView.prototype.canvasSetResizeCursor=function() {
	this.canvas.style.cursor = "nwse-resize";
};



MainModel.prototype = {};
MainModel.prototype.constructor = MainModel;
function MainModel() {
	this._selectedMotif = null;			        // gives us quick access to the selected motif in this.motifs[]
	this.motifs = [];                           // Different images on the garment
	this.garmentImage = new Image();            // The big garment t-shirt
    this.canvasBackgroundImageData = null;		// contains the grid and garmentImage
}

MainModel.prototype.AddDummyData = function() {
    var _this = this;
	function loadImages(sources, callback) {
		var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
			numImages++;
        }
        for(var src in sources) {
			images[src] = new Image();
          	images[src].onload = function() {
            	if(++loadedImages >= numImages) {
              		callback(images);
            	}
          	};
          	images[src].src = sources[src];
        }
	}

	var sources = {
		delete_on: '/static/images/steve/delete_on.png',
		delete_off: '/static/images/steve/delete_off.png',
		blank: '/static/images/steve/blank.png'
	};

	loadImages(sources, function(images) {
        var x = new Motif(20, 20, 150, 100, images);
		x.selected = true;
		_this.motifs.push(x);
		_this._selectedMotif = x;
	});
};

MainModel.prototype.motifAddDummy = function(parentCallback) {
    var _this = this;
	function loadImages(sources, callback) {
		var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
			numImages++;
        }
        for(var src in sources) {
			images[src] = new Image();
          	images[src].onload = function() {
            	if(++loadedImages >= numImages) {
              		callback(images);
            	}
          	};
          	images[src].src = sources[src];
        }
	}

	var sources = {
		delete_on: '/static/images/steve/delete_on.png',
		delete_off: '/static/images/steve/delete_off.png',
		blank: '/static/images/steve/blank.png'
	};

	loadImages(sources, function(images) {
		_this.motifResetAll();

        var x = new Motif(20, 20, 150, 100, images);
		x.selected = true;
		_this.motifs.push(x);
		_this._selectedMotif = x;

		parentCallback();
	});
};

MainModel.prototype.motifResetAll = function() {
	for (var i = 0, len = this.motifs.length; i < len; i++) {
		this._selectedMotif = null;
		this.motifs[i].reset();
	}
}

MainModel.prototype.motifTestMouseDown = function(loc, context) {
	// go through each of our motifs and see if the mouse loc means one
	// of them were clicked.  If one was then mark it as selected.

	for (var i = 0, len = this.motifs.length; i < len; i++) {

        if (this._selectedMotif && (this._selectedMotif === this.motifs[i])) {
            if (this.motifs[i].hitTestResize(loc, context)) {
                this.motifs[i].resizing = true;
                this.motifs[i].dragLoc = loc;
                return;
            }
        }

		if (this.motifs[i].hitTest(loc, context)) {
			this.motifs[i].selected = true;
			this.motifs[i].dragging = true;
			this.motifs[i].dragLoc = loc;
			this._selectedMotif = this.motifs[i];
			return;
		}

	}
};


MainModel.prototype.motifTestMouseMove = function(loc, context) {
	// Returns true if a motif was changed(needs redrawing), otherwise false.
	// Only need to test the selected motif.

	if (this._selectedMotif) {
		if (this._selectedMotif.dragging) {
			// we are trying to drag this motif
			this._selectedMotif.rect.x += loc.x - this._selectedMotif.dragLoc.x;
			this._selectedMotif.rect.y += loc.y - this._selectedMotif.dragLoc.y;
			this._selectedMotif.dragLoc = loc;

			controller.view.canvasSetDragCursor();
			return true;
		}

        if (this._selectedMotif.resizing) {

            this._selectedMotif.rect.width += loc.x - this._selectedMotif.dragLoc.x;
			this._selectedMotif.rect.height += loc.y - this._selectedMotif.dragLoc.y;
			this._selectedMotif.dragLoc.x = loc.x;
			this._selectedMotif.dragLoc.y = loc.y;

            controller.view.canvasSetResizeCursor();
			return true;
        }

		var prevVal = this._selectedMotif.deleteButton.mouseHover;
		var changed = false;

		// See if we are hovering over the delete button
		this._selectedMotif.deleteButton.mouseHover = this._selectedMotif.hitTestDelete(loc, context);
		if (prevVal !== this._selectedMotif.deleteButton.mouseHover){
			changed = true;
		};

		// See if we are hovering over the resize button
		prevVal = this._selectedMotif.resizeButton.mouseHover;
		this._selectedMotif.resizeButton.mouseHover = this._selectedMotif.hitTestResize(loc, context);
		//if (prevVal !== this._selectedMotif.resizeButton.mouseHover){
		//	controller.view.canvasSetResizeCursor();
		//	//changed = true;
		//} else {
		//	//controller.view.canvasSetDefaultCursor();
		//};
		if (this._selectedMotif.resizeButton.mouseHover) {
			controller.view.canvasSetResizeCursor();
		} else {
			controller.view.canvasSetDefaultCursor();
		};

		return changed;
	}

	return false;

};

MainModel.prototype.motifDeleteSelected = function() {
	var y = this.motifs.indexOf(this._selectedMotif);
	this._selectedMotif = null;
	this.motifs.splice(y,1);
};