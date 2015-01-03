/**
 * Created by Steve on 31/12/2014.
 */

/*
    A motif is an image to be shown on the garment, so this object
    contains everything needed to draw and manage itself.
 */

Motif.prototype = {};
Motif.prototype.constructor = Motif;

function Motif(x, y, width, height) {
    this.position = {x : x || 20, y : y || 20, width : width || 100, height : height || 100 };
    this.dragging = false;      // True if being dragged, otherwise false.
    this.resizing = false;      // True if being resized, otherwise false.
    this.selected = false;
    this.image = new Image();
}

Motif.prototype.draw = function(context) {
    context.save();


    // Draw the image
    context.fillStyle = "lightgrey";
    context.fillRect(this.position.x, this.position.y, this.position.width, this.position.height);

    if (this.selected) {

        context.translate(0.5, 0.5);	// so all lines straddle the pixels and aren't blurred - http://www.mobtowers.com/html5-canvas-crisp-lines-every-time/
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.beginPath();

        // gives a 3 padding - have in a setting.
        // Add a placeholder function for browsers that don't have setLineDash()
        if (!context.setLineDash) {
            context.setLineDash = function () {
            }
        }
        context.setLineDash([5, 2]);
        context.rect(this.position.x - 4, this.position.y - 4, this.position.width + 7, this.position.height + 7);
        context.stroke();
    }

    //context.beginPath();
    //context.setLineDash([]);  // this turns of line dash.
    //context.rect(this.position.x + 5, this.position.y + 5, this.position.width -10, this.position.height -10);
    //context.stroke();

    context.restore();
};