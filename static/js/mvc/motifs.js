/**
 * Created by Steve on 11/05/2015.
 */

MotifsController.prototype = {};
MotifsController.prototype.constructor = MotifsController;

function MotifsController() {
    this.model = new MotifsModel();
    this.view=new MotifsView();
}

MotifsController.prototype.index=function() {

    MyRest.getMotifs(function(motifs)
    {
        // On a callback, we lose reference to 'this' so use 'controller' instead which is defined in the html file.
        controller.model.motifs = motifs;
        controller.renderMotifList();
    });
};

MotifsController.prototype.renderMotifList=function() {
    this.view.renderMotifList(this.model);

    $('#dataListMotifs li').hover(
        function(e) {
            $(this).find("dl").find("dd").first().css("background-color", "red");
        },
        function(e) {
            $(this).find("dl").find("dd").first().css("background-color", "white");
        }
    );
};


MotifsModel.prototype = {};
MotifsModel.prototype.constructor = MotifsModel;
function MotifsModel() {
    this.motifs=[];
}

MotifsView.prototype = {};
MotifsView.prototype.constructor = MotifsView;
function MotifsView() {}

MotifsView.prototype.renderMotifList=function(model) {
    jQuery("#motifsList").html("");
    jQuery(jQuery('#templateMotifItems').render({motifs:model.motifs})).appendTo('#motifsList');
};
