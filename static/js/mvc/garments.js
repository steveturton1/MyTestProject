/**
 * Created by Steve on 11/05/2015.
 */

GarmentsController.prototype = new Controller;
GarmentsController.prototype.constructor = GarmentsController;

function GarmentsController() {
    this.model = new GarmentsModel();
    this.view=new GarmentsView();
}

GarmentsController.prototype.index=function() {

    MyRest.getGarments(function(garments)
    {
        // On a callback, we lose reference to 'this' so use 'controller' instead which is defined in the html file.
        controller.model.items = garments;
        controller.renderGarmentList();
    });
};

GarmentsController.prototype.renderGarmentList=function() {
    this.view.renderGarmentList(this.model);

    // Register some events
    $('#dataListGarments li').hover(
        function() { controller.view.garmentHoverOn($(this));  },
        function() { controller.view.garmentHoverOff($(this)); }
    );

    $('#dataListGarments li').click(
        function() { controller.view.renderEdit($(this)); }
    );
};


GarmentsModel.prototype = new Model;
GarmentsModel.prototype.constructor = GarmentsModel;
function GarmentsModel() {
    this.items=[];
    this.currentGarmentId = -1;
}

GarmentsView.prototype = new View;
GarmentsView.prototype.constructor = GarmentsView;
function GarmentsView() {}

GarmentsView.prototype.renderGarmentList=function(model) {
    jQuery("#garmentsList").html("");
    jQuery(jQuery('#templateGarmentItems').render({garments:model.items})).appendTo('#garmentsList');
};

GarmentsView.prototype.garmentHoverOn=function(element) {
    //element.find("dl").find("dd").first().css("background-color", "red");
    element.find("dl").toggleClass("itemHighlighted");
};
GarmentsView.prototype.garmentHoverOff=function(element) {
    //element.find("dl").find("dd").first().css("background-color", "white");
    element.find("dl").toggleClass("itemHighlighted");
};

GarmentsView.prototype.renderEdit=function(element) {

    var garmentId = element.attr("id").substr(4);  // Get the motif id - without the 'item' bit on the front.

    this.removeAllActiveRows();

    if (controller.model.currentGarmentId == garmentId) {
        // We've just clicked the item being edited so just close it.
        controller.model.currentGarmentId = -1;
    } else {
        controller.model.currentGarmentId = garmentId;
        var item = controller.model.items.getObjectById(garmentId);

        var tmpl = $('#templateGarmentEdit').render({item:item});
        $(tmpl).hide();
        $(element).after($(tmpl));
        $('.aol-edit').slideUp({duration:0}).slideDown();
    }

};
