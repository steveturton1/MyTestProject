/**
 * Created by Steve on 11/05/2015.
 */

GarmentsController.prototype = {};
GarmentsController.prototype.constructor = GarmentsController;

function GarmentsController() {
    this.model = new GarmentsModel();
    this.view=new GarmentsView();
}

GarmentsController.prototype.index=function() {

    MyRest.getGarments(function(garments)
    {
        // On a callback, we lose reference to 'this' so use 'controller' instead which is defined in the html file.
        controller.model.garments = garments;
        controller.renderGarmentList();
    });
};

GarmentsController.prototype.renderGarmentList=function() {
    this.view.renderGarmentList(this.model);

    $('#dataListGarments li').hover(
        function(e) {
            $(this).find("dl").find("dd").first().css("background-color", "red");
        },
        function(e) {
            $(this).find("dl").find("dd").first().css("background-color", "white");
        }
    );
};


GarmentsModel.prototype = {};
GarmentsModel.prototype.constructor = GarmentsModel;
function GarmentsModel() {
    this.garments=[];
}

GarmentsView.prototype = {};
GarmentsView.prototype.constructor = GarmentsView;
function GarmentsView() {}

GarmentsView.prototype.renderGarmentList=function(model) {
    jQuery("#garmentsList").html("");
    jQuery(jQuery('#templateGarmentItems').render({garments:model.garments})).appendTo('#garmentsList');
};
