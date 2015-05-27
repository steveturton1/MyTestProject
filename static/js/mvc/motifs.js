/**
 * Created by Steve on 11/05/2015.
 */

MotifsController.prototype = new Controller;
MotifsController.prototype.constructor = MotifsController;

function MotifsController() {
    this.model = new MotifsModel();
    this.view=new MotifsView();
}

MotifsController.prototype.index=function() {

    MyRest.getMotifs(function(motifs)
    {
        // On a callback, we lose reference to 'this' so use 'controller' instead which is defined in the html file.
        controller.model.items = motifs;
        controller.renderMotifList();
    });
};

MotifsController.prototype.renderMotifList=function() {
    this.view.renderMotifList(this.model);

    // Register some events
    $('#dataListMotifs li').hover(
        function() { controller.view.motifHoverOn($(this));  },
        function() { controller.view.motifHoverOff($(this)); }
    );

    $('#dataListMotifs li').click(
        function() { controller.view.renderEdit($(this)); }
    );
};


MotifsModel.prototype = new Model;
MotifsModel.prototype.constructor = MotifsModel;
function MotifsModel() {
    this.items=[];
    this.currentMotifId = -1;
}

MotifsView.prototype = new View;
MotifsView.prototype.constructor = MotifsView;
function MotifsView() {}

MotifsView.prototype.renderMotifList=function(model) {
    jQuery("#motifsList").html("");
    jQuery(jQuery('#templateMotifItems').render({motifs:model.items})).appendTo('#motifsList');
};

MotifsView.prototype.motifHoverOn=function(element) {
    element.find("dl").find("dd").first().css("background-color", "red");
};
MotifsView.prototype.motifHoverOff=function(element) {
    element.find("dl").find("dd").first().css("background-color", "white");
};

MotifsView.prototype.renderEdit=function(element) {

    var motifId = element.attr("id").substr(4);  // Get the motif id - without the 'item' bit on the front.

    this.removeAllActiveRows();

    if (controller.model.currentMotifId == motifId) {
        // We've just clicked the item being edited so just close it.
        controller.model.currentMotifId = -1;
    } else {
        controller.model.currentMotifId = motifId;
        var item = controller.model.items.getObjectById(motifId);

        var tmpl = $('#templateMotifEdit').render({item:item});
        $(tmpl).hide();
        $(element).after($(tmpl));
        $('.aol-edit').slideUp({duration:0}).slideDown();
    }

};
