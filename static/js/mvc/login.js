/**
 * Created by Steve on 12/11/2014.
 */

/**
 * Created by Steve on 03/10/2014.
 */

LoginController.prototype = {};
LoginController.prototype.constructor = LoginController;

function LoginController() {
    this.model = new LoginModel();
    this.view=new LoginView();
}

LoginController.prototype.index=function() {
};

LoginController.prototype.requestlogin=function(email) {
};



LoginModel.prototype = {};
LoginModel.prototype.constructor = LoginModel;
function LoginModel() {}

LoginView.prototype = {};
LoginView.prototype.constructor = LoginView;
function LoginView() {}
