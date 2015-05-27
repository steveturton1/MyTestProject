/**
 * Created by Steve on 27/05/2015.
 */

Controller.prototype = {};
Controller.prototype.constructor = Controller;

function Controller() {}

Controller.prototype.index=function() {};


Model.prototype = {};
Model.prototype.constructor = Model;
function Model() {
    this.items=[];
}

View.prototype = {};
View.prototype.constructor = View;
function View() {}

View.prototype.removeAllActiveRows = function() {
    $('.aol-edit').slideUp(function () {
        $(this).remove();
    });
};




Array.prototype.getObjectById = function (obj) {
  var i = this.length;
  while (i--) {
      if (this[i].id + "" == obj + "") {
          return this[i];
      }
  }
  return null;
};