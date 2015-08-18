/**
 * Created by Steve on 05/05/2015.
 */



UsersController.prototype = new Controller;
UsersController.prototype.constructor = UsersController;

function UsersController() {
    this.model = new UsersModel();
    this.view=new UsersView();
}

UsersController.prototype.index=function() {

    MyRest.getUsers(function(users)
    {
        controller.model.items = users;
        controller.renderUsersList();
    });
};

UsersController.prototype.renderUsersList=function() {
    this.view.renderUsersList(this.model);

    // Register some events
    //$('#dataListUsers li').click(
    //    function() { controller.view.renderEdit($(this)); }
    //);
};

UsersController.prototype.renderDelete=function(event, itemid) {
    event.stopPropagation();
    this.view.renderDelete(itemid);
};
UsersController.prototype.renderEdit=function(event, itemid) {
    event.stopPropagation();
    this.view.renderEdit(itemid);
};
UsersController.prototype.cancelUserEdit=function(event) {
    event.stopPropagation();
    this.view.cancelUserEdit();
};


UsersModel.prototype = new Model;
UsersModel.prototype.constructor = UsersModel;
function UsersModel() {
    this.items=[];
    this.currentUserId = -1;
}

UsersView.prototype = new View;
UsersView.prototype.constructor = UsersView;
function UsersView() {}

UsersView.prototype.renderUsersList=function(model) {
    jQuery("#usersList").html("");
    jQuery(jQuery('#templateUserItems').render({users:model.items})).appendTo('#usersList');
};

UsersView.prototype.cancelUserEdit=function() {
    $("#edit_user").css("visibility","hidden");
    controller.model.currentUserId = -1;
};

UsersView.prototype.renderEdit=function(userId) {

    //var userId = element.attr("id").substr(4);  // Get the user id - without the 'item' bit on the front.
    //var blag = element.find(".dl-expand");      // Get the element that shows the expand arrow - we will changes this later to contract arrow

    //this.removeAllActiveRows();
    //$("#dataListUsers dl").removeClass("aole-expanded");

    // Replace any contract icons with expand.
    //$("#dataListUsers .dl-contract").removeClass("dl-contract").addClass("dl-expand");

    if (controller.model.currentUserId == userId) {
        // We've just clicked the item being edited so just close it.
        controller.model.currentUserId = -1;
    } else {
        //blag.addClass("dl-contract");           // show the contract icon for the expanded item.

        //element.find("dl").addClass("aole-expanded");

        controller.model.currentUserId = userId;
        var item = controller.model.items.getObjectById(userId);

        $('#edit_user').html('');
        $($('#templateUserEdit').render({item:item})).appendTo('#edit_user');
        $("#edit_user").css("visibility","visible");

        //$(element).after($(tmpl));
        //$('.aol-edit').slideUp({duration:0}).slideDown();
    }
};

UsersView.prototype.renderDelete=function(itemid) {
    this.renderRemove(itemid);
};
