/**
 * Created by Steve on 03/10/2014.
 */

LayoutController.prototype = new Object;
LayoutController.prototype.constructor = LayoutController;

function LayoutController() {
    this.model = new LayoutModel();
    this.view=new LayoutView();
}

LayoutController.prototype.index = function(e) {
/*
    MyRest.getSettings(function(settings)
    {
        // On a callback, we lose reference to 'this' so use 'controller' instead which is defined in the html file.
        //controller.model.users = users;
        //controller.renderUsersList();
        var x;
        var y;
        var arr = [];
        for (x in settings["i18N"]["LANGUAGES"]) {

            y = x;
            y = settings["i18N"]["LANGUAGES"][x];

            arr.push({id: x, value: settings["i18N"]["LANGUAGES"][x]})
        }

        jQuery('#plc-list').html(jQuery('#LanguageTestTemplate').render({languages:arr}));

        // As the user may have clicked the back button, the session['language'] shown in layout.html
        // Might be out of date so set the correct language here aswell.
        jQuery('#ltln-language').html(settings["i18N"]["CURRENT_LANGUAGE"]);
    });
*/
}

LayoutController.prototype.changeLanguage=function(language) {
    // update cookie and reload page
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + 1);
    document.cookie = "language=" + language +"; expires="+exdate.toUTCString()+"; path=/";

    window.location.reload();
};

LayoutController.prototype.popupLanguageRender=function(element, e) {
    // Remove any current popups
    this.view.popupsRemoveAll();

    // Get the popup container
    var popup = document.getElementById('popup-language-container');

    var x =  document.getElementById('lt-language');

    // Position and show the popup.
    popup.style.left = x.offsetLeft  + 10 + "px";
    popup.style.top = x.offsetTop + 25 + "px";
    popup.style.visibility = "visible";

    e.stopPropagation();
};

LayoutController.prototype.popupInfoRender=function(element, e) {
    // Remove any current popups
    this.view.popupsRemoveAll();

    // Get the popup container
    var popup = document.getElementById('popup-info-container');

    // Get the message to display in the popup
    var msg = this.model.popupInfoMsg(element);

    // Calculate the popup position
    var left = element.offsetLeft + 35 + "px";
    var top = element.offsetTop - 10 + "px";

    // Show the popup
    this.view.popupInfoRender(popup, msg, left, top);

    // Prevent the click closing the popup in layout.html document.onclick
    e.stopPropagation();
};

LayoutController.prototype.popupUserRender=function(element, e) {
    // Remove any current popups
    this.view.popupsRemoveAll();
};

LayoutController.prototype.popupsRemoveAll=function() {
    this.view.popupsRemoveAll();

    // Prevent the click closing the popup in layout.html document.onclick
    e.stopPropagation();
};



LayoutModel.prototype = new Object;
LayoutModel.prototype.constructor = LayoutModel;
function LayoutModel() {}

LayoutModel.prototype.popupInfoMsg=function(element) {
    // Each popup-info span has an image and a span, the span holds the message
    // we want to display in the popup.  Get this message.
    return element.getElementsByTagName("span")[0].innerHTML;
}



LayoutView.prototype = new Object;
LayoutView.prototype.constructor = LayoutView;
function LayoutView() {}

LayoutView.prototype.popupInfoRender=function(popup, msg, left, top) {
    // Set the message - note do not use innerText as not FireFox compatible
    popup.getElementsByTagName("div")[0].innerHTML = msg;

    // Position and show the popup.
    popup.style.left = left;
    popup.style.top = top;
    popup.style.visibility = "visible";
 };

LayoutView.prototype.popupsRemoveAll=function() {
    // Hide any popups that may be showing.
    document.getElementById("popup-info-container").style.visibility = "hidden";
    document.getElementById("popup-language-container").style.visibility = "hidden";
};