/**
 * Created by Steve on 12/11/2014.
 */

/**
 * Created by Steve on 03/10/2014.
 */

LoginController.prototype = new Object;
LoginController.prototype.constructor = LoginController;

function LoginController() {
    this.model = new LoginModel();
    this.view=new LoginView();
}

LoginController.prototype.requestlogin=function(email) {
    var x = 1;
};


LoginModel.prototype = new Object;
LoginModel.prototype.constructor = LoginModel;
function LoginModel() {}

LoginView.prototype = new Object;
LoginView.prototype.constructor = LoginView;
function LoginView() {}
