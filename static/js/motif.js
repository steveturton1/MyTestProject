/**
 * Created by Steve on 31/12/2014.
 */

/*
    A motif is an image to be shown on the garment, so this object
    contains everything needed to draw and manage itself.
 */

Motif.prototype = {};
Motif.prototype.constructor = Motif;

function Motif(x, y, width, height, images) {

    this.rect = {x: x, y: y, width: width, height: height};


    this.deleteButton = {   rect: {},           // Position and dimension of button - set in draw method.
                            mouseHover: false,  // True if mouse hovering over, otherwise false.
                            mouseDown: false
                        };

    this.dragging = false;      // True if being dragged, otherwise false.

    this.resizing = false;      // True if being resized, otherwise false.
    this.selected = false;
    this.dragLoc = {x : 0, y : 0};
    this.images = images;

}

Motif.prototype.reset = function() {
    this.selected = false;
	this.dragging = false;
	this.resizing = false;
	this.deleteButton.mouseHover = false;
    this.deleteButton.mouseDown = false;
};

Motif.prototype.hitTest = function(loc, context) {
	// Determine if a point (loc) is in a rectangle.

    context.save();
    context.translate(0.5, 0.5);    // remember we've used translate to avoid blurred lines, so we must also apply here.

	context.beginPath();
	context.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
	var retVal = context.isPointInPath(loc.x, loc.y);

    context.restore();
    return retVal;
};

Motif.prototype.hitTestDelete = function(loc, context) {
	// Determine if a point (loc) is in a rectangle.

    context.save();
    context.translate(0.5, 0.5);    // remember we've used translate to avoid blurred lines, so we must also apply here.

	context.beginPath();
	context.rect(this.deleteButton.rect.x, this.deleteButton.rect.y, this.deleteButton.rect.width, this.deleteButton.rect.height);
	var retVal = context.isPointInPath(loc.x, loc.y);

    context.restore();
    return retVal;
};

Motif.prototype.draw = function(context) {
    context.save();


    // Draw the image
    context.fillStyle = "lightgrey";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);

    if (this.selected) {

        context.translate(0.5, 0.5);	// so all lines straddle the pixels and aren't blurred - http://www.mobtowers.com/html5-canvas-crisp-lines-every-time/
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.beginPath();

        // gives a 3 padding - have in a setting.
        // Add a placeholder function for browsers that don't have setLineDash()
        if (!context.setLineDash) {
            context.setLineDash = function () {}
        }
        context.setLineDash([5, 3]);
        context.rect(this.rect.x - 4, this.rect.y - 4, this.rect.width + 7, this.rect.height + 7);
        context.stroke();
        context.setLineDash([]);    // turn off dashed line

        // Draw Delete button
        this.deleteButton.rect = {x: this.rect.x + this.rect.width - 8,
                                y: this.rect.y - 8,
                                width: 15, height: 15};
        context.beginPath();
        context.fillStyle = "white";
        context.fillRect(this.deleteButton.rect.x, this.deleteButton.rect.y, this.deleteButton.rect.width, this.deleteButton.rect.height);
        context.rect(this.deleteButton.rect.x, this.deleteButton.rect.y, this.deleteButton.rect.width, this.deleteButton.rect.height);
        context.stroke();

        // don't draw images with the context.translate(0.5, 0.5) fix as images
        // will be blurred so restore canvas here.
        context.restore();
        if (this.deleteButton.mouseHover) {
            context.drawImage(this.images.delete_on, this.deleteButton.rect.x, this.deleteButton.rect.y);
        } else {
            context.drawImage(this.images.delete_off, this.deleteButton.rect.x, this.deleteButton.rect.y);
        }


    }
    context.restore();
};