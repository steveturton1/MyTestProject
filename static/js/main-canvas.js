/**
 * Created by Steve on 15/12/2014.
 */

    var xxx = document.getElementById('main-container');



maincanvas.prototype = new Object;
maincanvas.prototype.constructor = maincanvas;

function maincanvas() {
    this.canvas = document.getElementById("mc-canvas"),
	this.context = this.canvas.getContext("2d"),
	this.image = new Image(),
	this.imageObject = {x : 10,	y : 10, width : 300, height : 200 },
	this.clickObject = false,
	this.selectObjectBorderPadding = 2,
	this.selectObjectGrabWidth = 12,		// Keep an even number
	this.selectObjectBorder = {},
	this.selectObjectGrabHandle = {},
	this.dragging = false,
	this.resizing = false,
	this.dragLoc,
	this.canvasBackgroundImageData;

    this.canvas.onmousedown = onmousedown;
}

maincanvas.prototype.initialise_canvas=function() {
    this.renderGrid('lightgray', 10, 10);
    this.saveCanvasBackground();
    this.renderAll();
}

maincanvas.prototype.renderGrid=function(color, stepx, stepy) {
	this.context.save();

	this.context.strokeStyle = color;
	this.context.lineWidth = 0.5;
	this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		for (var i = stepx + 0.5; i < this.context.canvas.width; i += stepx) {
			this.context.beginPath();
			this.context.moveTo(i, 0);
			this.context.lineTo(i, this.context.canvas.height);
			this.context.stroke();
		}

		for (var i = stepy + 0.5; i < this.context.canvas.height; i += stepy) {
			this.context.beginPath();
			this.context.moveTo(0, i);
			this.context.lineTo(this.context.canvas.width, i);
			this.context.stroke();
		}
		this.context.restore();
}

maincanvas.prototype.saveCanvasBackground=function() {
		this.canvasBackgroundImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
	}

maincanvas.prototype.restoreCanvasBackground=function() {
		this.context.putImageData(this.canvasBackgroundImageData, 0, 0);
}

maincanvas.prototype.renderAll=function() {
		this.restoreCanvasBackground();
		//this.renderObject();

		//if (clickObject == true) {
		//	//context.fillRect(10, 10, 10, 10);
		//	selectObject();
		//}
}

onmousedown=function(e){
    var x = 1;
		//if (resizing == true) {
		//	renderAll();
		//};

		//dragging = false;
		//resizing = false;
		//canvas.style.cursor = "default";
}

    /*
	// maybe wrap this in a vars object for tidyness

	// On resizing image - set transparency.

    var xxx = document.getElementById("main-container");
	var canvas = document.getElementById("mc-canvas");
	var context = canvas.getContext("2d");
	var image = new Image();
	var imageObject = {x : 10,	y : 10, width : 300, height : 200 };
	var clickObject = false;
	var selectObjectBorderPadding = 2;
	var selectObjectGrabWidth = 12;		// Keep an even number
	var selectObjectBorder = {};
	var selectObjectGrabHandle = {};
	var dragging = false;
	var resizing = false;
	var dragLoc;
	var canvasBackgroundImageData;

	canvas.onmouseup = function (e) {

		if (resizing == true) {
			renderAll();
		};

		dragging = false;
		resizing = false;
		canvas.style.cursor = "default";
	}

	canvas.onmousedown = function (e) {
		e.preventDefault();

		if (canvas.style.cursor == "nw-resize") {
			dragLoc = windowToCanvas(e.clientX, e.clientY);
			resizing = true;
			return;
		}

		var loc = windowToCanvas(e.clientX, e.clientY);

		context.beginPath();
		context.rect(imageObject.x, imageObject.y, imageObject.width, imageObject.height);

		if (context.isPointInPath(loc.x, loc.y)) {
			clickObject = true;
			dragging = true;
			dragLoc = windowToCanvas(e.clientX, e.clientY);
			//canvas.style.cursor = "move";
		}
		else
		{
			clickObject = false;
			dragging = false;
			//canvas.style.cursor = "default";
		}

		renderAll();
	}

	canvas.onmousemove = function (e) {
		//prevent default thing - if dragging

		var loc = windowToCanvas(e.clientX, e.clientY);

		if (dragging == true) {
			imageObject.x += loc.x - dragLoc.x;
			imageObject.y += loc.y - dragLoc.y;

			dragLoc.x = loc.x;
			dragLoc.y = loc.y;
			renderAll();
		}
		else
		if (resizing == true) {

			var normalResize = true;

			if (normalResize == false) {
				imageObject.width += loc.x - dragLoc.x;
				imageObject.height += loc.y - dragLoc.y;
				dragLoc.x = loc.x;
				dragLoc.y = loc.y;
			}
			else
			{
				var s = calculateAspectRatioFit(imageObject.width, imageObject.height, imageObject.width += loc.x - dragLoc.x, imageObject.height += loc.y - dragLoc.y)
				imageObject.width = s.width;
				imageObject.height = s.height;

				dragLoc.x = imageObject.x + imageObject.width;
				dragLoc.y = imageObject.y + imageObject.height;
			}
			renderAll();
		}
		else
		{
			if (clickObject == true) {
				if (hitTest(loc, selectObjectGrabHandle.x1, selectObjectGrabHandle.y1, selectObjectGrabHandle.x2 - selectObjectGrabHandle.x1, selectObjectGrabHandle.y2 - selectObjectGrabHandle.y1)) {
					canvas.style.cursor = "nw-resize";
				}
				else
				{
					canvas.style.cursor = "default";
				}
			}
			else
			{
				canvas.style.cursor = "default";
			}
		}
	}

	function hitTest(loc, x, y, width, height) {
		context.beginPath();
		context.rect(x, y, width, height);

		if (context.isPointInPath(loc.x, loc.y)) {
			return true;
		}
		else
		{
			return false;
		}
	}

	function windowToCanvas(x, y) {
		var bbox = canvas.getBoundingClientRect();
		return { x : x - bbox.left * (canvas.width / bbox.width),
				 y : y - bbox.top  * (canvas.height / bbox.height) };
	}

	function renderGrid(color, stepx, stepy) {
		context.save()

		context.strokeStyle = color;
		context.lineWidth = 0.5;
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
			context.beginPath();
			context.moveTo(i, 0);
			context.lineTo(i, context.canvas.height);
			context.stroke();
		}

		for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
			context.beginPath();
			context.moveTo(0, i);
			context.lineTo(context.canvas.width, i);
			context.stroke();
		}
		context.restore();
	}

	function renderObject() {
		//context.save();
		context.globalAlpha = 1;
		context.drawImage(image, Math.floor(imageObject.x), Math.floor(imageObject.y), Math.floor(imageObject.width), Math.floor(imageObject.height) );
		//context.restore();
	}

	function selectObject() {
		context.save();

		calculateObjectSizes();
		context.beginPath();

		dashedLinePath(context, selectObjectBorder.x1, selectObjectBorder.y1, selectObjectBorder.x2, selectObjectBorder.y1, 4);
		dashedLinePath(context, selectObjectBorder.x2, selectObjectBorder.y1, selectObjectBorder.x2, selectObjectBorder.y2, 4);
		dashedLinePath(context, selectObjectBorder.x2, selectObjectBorder.y2, selectObjectBorder.x1, selectObjectBorder.y2, 4);
		dashedLinePath(context, selectObjectBorder.x1, selectObjectBorder.y2, selectObjectBorder.x1, selectObjectBorder.y1, 4);

		context.stroke();

		context.fillStyle = "white";
		context.fillRect(selectObjectGrabHandle.x1, selectObjectGrabHandle.y1, selectObjectGrabHandle.x2 - selectObjectGrabHandle.x1, selectObjectGrabHandle.y2 - selectObjectGrabHandle.y1);

		context.strokeStyle = "gray";
		context.strokeRect(selectObjectGrabHandle.x1, selectObjectGrabHandle.y1, selectObjectGrabHandle.x2 - selectObjectGrabHandle.x1, selectObjectGrabHandle.y2 - selectObjectGrabHandle.y1);

		context.restore();
	}

	function calculateObjectSizes() {
		selectObjectBorder = {	x1 : Math.floor(imageObject.x) - selectObjectBorderPadding - 0.5,
								y1 : Math.floor(imageObject.y) - selectObjectBorderPadding - 0.5,
								x2 : Math.floor(imageObject.x) + Math.floor(imageObject.width) + selectObjectBorderPadding + 0.5,
								y2 : Math.floor(imageObject.y) + Math.floor(imageObject.height) + selectObjectBorderPadding + 0.5};

		selectObjectGrabHandle = {	x1 : Math.floor(imageObject.x) + Math.floor(imageObject.width) - (selectObjectGrabWidth / 2) - 0.5,
									y1 : Math.floor(imageObject.y) + Math.floor(imageObject.height) - (selectObjectGrabWidth / 2) - 0.5,
									x2 : Math.floor(imageObject.x) + Math.floor(imageObject.width) + (selectObjectGrabWidth / 2) + 0.5,
									y2 : Math.floor(imageObject.y) + Math.floor(imageObject.height) + (selectObjectGrabWidth / 2) + 0.5 };
	}

	function dashedLinePath(context, x1, y1, x2, y2, dashLength) {
		dashLength = dashLength === undefined ? 5 : dashLength;

		var deltaX = x2 - x1;
		var deltaY = y2 - y1;
		var numDashes = Math.floor(
			Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

		for (var i=0; i < numDashes; ++i) {
			context[ i % 2 === 0 ? 'moveTo' : 'lineTo' ]
				(x1 + (deltaX / numDashes) * i, y1 + (deltaY / numDashes) * i);
		}
	}

	function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
		var ratio = [maxWidth / srcWidth, maxHeight / srcHeight ];
		ratio = Math.min(ratio[0], ratio[1]);

		return { width:srcWidth*ratio, height:srcHeight*ratio };
	}

	function renderAll() {
		restoreCanvasBackground();
		renderObject();

		if (clickObject == true) {
			//context.fillRect(10, 10, 10, 10);
			selectObject();
		}
	}

	function saveCanvasBackground() {
		canvasBackgroundImageData = context.getImageData(0, 0, canvas.width, canvas.height);
	}

	function restoreCanvasBackground() {
		context.putImageData(canvasBackgroundImageData, 0, 0);
	}

	function initialise_canvas() {
				renderGrid('lightgray', 10, 10);
				saveCanvasBackground();
				renderAll();
    }

*/
