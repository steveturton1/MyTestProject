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
    $('#dataListUsers li').hover(
        function() { controller.view.userHoverOn($(this));  },
        function() { controller.view.userHoverOff($(this)); }
    );

    $('#dataListUsers li').click(
        function() { controller.view.renderEdit($(this)); }
    );
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

UsersView.prototype.userHoverOn=function(element) {
    element.find("dl").find("dd").first().css("background-color", "red");
};
UsersView.prototype.userHoverOff=function(element) {
    element.find("dl").find("dd").first().css("background-color", "white");
};

UsersView.prototype.renderEdit=function(element) {

    var userId = element.attr("id").substr(4);  // Get the user id - without the 'item' bit on the front.

    this.removeAllActiveRows();

    if (controller.model.currentUserId == userId) {
        // We've just clicked the item being edited so just close it.
        controller.model.currentUserId = -1;
    } else {
        controller.model.currentUserId = userId;
        var item = controller.model.items.getObjectById(userId);

        var tmpl = $('#templateUserEdit').render({item:item});
        $(tmpl).hide();
        $(element).after($(tmpl));
        $('.aol-edit').slideUp({duration:0}).slideDown();
    }

};
