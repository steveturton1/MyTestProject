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
	this.model.AddDummyData();
    this.view = new MainView();
    var _this = this;

    // Enable mouse and touch screen interaction.
    // Everywhere says use pageX, pageY for touch screen but that won't take into
    // account if the page is scrolled.
    this.view.canvas.onmousedown = function(e) {
        e.preventDefault();
        mouseDownOrTouchStart(_this.windowToCanvas(e.clientX, e.clientY));
    };
    this.view.canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        mouseDownOrTouchStart(_this.windowToCanvas(e.touches[0].clientX, e.touches[0].clientY));
    });

    this.view.canvas.onmouseup = function(e) {
        e.preventDefault();
        mouseUpOrTouchEnd(_this.windowToCanvas(e.clientX, e.clientY));
    };
    this.view.canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
        mouseUpOrTouchEnd(_this.windowToCanvas(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
    });

    this.view.canvas.onmousemove = function(e) {
        e.preventDefault();
        mouseMoveOrTouchMove(_this.windowToCanvas(e.clientX, e.clientY));
    };
    this.view.canvas.addEventListener('touchmove', function(e) {
        // TODO maybe only prevent default if dragging/resizing a motif so the user can still
        // scroll by dragging the canvas with touch screen.
        e.preventDefault();
        mouseMoveOrTouchMove(_this.windowToCanvas(e.touches[0].clientX, e.touches[0].clientY));
    });

	function mouseDownOrTouchStart(location) {
		if (_this.model._selectedMotif) {
			// a motif is selected.
			if (_this.model._selectedMotif.hitTestDelete(location, _this.view.context)) {
				return;	// do nothing if over the delete button.
			}

            if (_this.model._selectedMotif.hitTestResize(location, _this.view.context)) {
                _this.model._selectedMotif.resizing = true;
                _this.model.motifTestMouseDown(location, _this.view.context);
                return;
            }
		}

		// See if we hit a motif - select it if we did.
		_this.model.motifResetAll();
		_this.model.motifTestMouseDown(location, _this.view.context);
		_this.view.canvasRenderAll(_this.model.motifs);
	};

	function mouseUpOrTouchEnd(location) {
		if (_this.model._selectedMotif) {

			// TODO - TEST THAT IT HAD A MOUSE DOWN RATHER THAN HOVER - MAYBE
            if (_this.model._selectedMotif.hitTestDelete(
									location,
									_this.view.context) &&
									_this.model._selectedMotif.deleteButton.mouseHover) {

				// Clicked the delete button.
				_this.model.motifDeleteSelected();
				_this.view.canvasRenderAll(_this.model.motifs);
				return;
			}
		}

		_this.model.motifStopDragging();
        _this.model.motifStopResizing();
	};

	function mouseMoveOrTouchMove(location) {
		if (_this.model.motifTestMouseMove(location, _this.view.context)) {
			_this.view.canvasRenderAll(_this.model.motifs);
		}
	};
}

MainController.prototype.index=function(img) {
	// Initialise the canvas with the grid and the selected garment (img)
    var _this = this;
	this.model.garmentImage = new Image();

	this.model.garmentImage.onload = function() {
		_this.view.canvasRenderBackground();
    	_this.view.canvasRenderAll(_this.model.motifs);
	};
	this.model.garmentImage.onerror = function() {
		_this.view.canvasRenderBackground("MISSING IMAGE!");
    	_this.view.canvasRenderAll(this.model.motifs);
	};
	this.model.garmentImage.src = img;
};

MainController.prototype.windowToCanvas=function (x, y) {
	// Convert mouse coordinates to client coordinates

	/*
	var bbox = this.view.canvas.getBoundingClientRect();
	return { x : Math.round(x - bbox.left * (this.view.canvas.width / bbox.width)),
			 y : Math.round(y - bbox.top  * (this.view.canvas.height / bbox.height)) };
	*/

	var bbox = this.view.canvas.getBoundingClientRect();
	return { x : x - bbox.left, y : y - bbox.top};
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

MainController.prototype.motifAddDummy=function(e) {
	e.preventDefault();
    var _this = this;

	this.model.motifAddDummy(function(){
		_this.view.canvasRenderAll(_this.model.motifs);
	});

}
/*
MainController.prototype.hitTest = function(loc, rect) {
	// Determine if a point (loc) is in a rectangle.
	this.view.context.beginPath();
	this.view.context.rect(rect.x, rect.y, rect.width, rect.height);
	return this.view.context.isPointInPath(loc.x, loc.y);
};
*/


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

MainView.prototype.canvasRenderAll=function(motifs) {
	// Draw the background grid and garment
	this.canvasRestoreBackground();

	// Draw each motif
	for (var i = 0, len = motifs.length; i < len; i++) {
		motifs[i].draw(this.context);
	}
};

MainView.prototype.canvasSaveBackground=function() {
	// Saves the grid and the garmentImage so it can be quickly retrieved.
	this.canvasBackgroundImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

MainView.prototype.canvasRestoreBackground=function() {
	this.context.putImageData(this.canvasBackgroundImageData, 0, 0);
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
	this._selectedMotif = null;			// gives us quick access to the selected motif in this.motifs[]
	this.motifs = [];
	this.garmentImage = new Image();
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

		//x = new Motif(20, 150, 150, 100, images);
		//controller.model.motifs.push(x);
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


// TODO DO I REALLY NEED THESE motifStopDragging/Resizing functions?
MainModel.prototype.motifStopDragging = function() {
	if (this._selectedMotif && this._selectedMotif.dragging) {
		this._selectedMotif.dragging = false;
		controller.view.canvasSetDefaultCursor();
	}
};

MainModel.prototype.motifStopResizing = function() {
	if (this._selectedMotif && this._selectedMotif.resizing) {
		this._selectedMotif.resizing = false;
		controller.view.canvasSetDefaultCursor();
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