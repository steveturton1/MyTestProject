/**
 * Created by Steve on 05/05/2015.
 */

UsersController.prototype = {};
UsersController.prototype.constructor = UsersController;

function UsersController() {
    this.model = new UsersModel();
    this.view=new UsersView();
}

UsersController.prototype.index=function() {

    MyRest.getUsers(function(users)
    {
        // On a callback, we lose reference to 'this' so use 'controller' instead which is defined in the html file.
        controller.model.users = users;
        controller.renderUsersList();
    });
};

UsersController.prototype.renderUsersList=function() {
    this.view.renderUsersList(this.model);
};


UsersModel.prototype = {};
UsersModel.prototype.constructor = UsersModel;
function UsersModel() {
    this.users=[];
}

UsersView.prototype = {};
UsersView.prototype.constructor = UsersView;
function UsersView() {}

UsersView.prototype.renderUsersList=function(model) {
    jQuery("#usersList").html("");
    jQuery(jQuery('#templateUserItems').render({users:model.users})).appendTo('#usersList');
};
