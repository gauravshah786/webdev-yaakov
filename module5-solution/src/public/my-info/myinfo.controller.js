(function () {
  "use strict";

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['user'];
  function MyInfoController(user) {
    var $ctrl = this;
    $ctrl.signedUp = false;
    $ctrl.user = {};

    if(Object.keys(user).length !== 0) {
      $ctrl.signedUp = true;
      $ctrl.user = {
        firstName : user.firstName,
        lastName : user.lastName,
        email : user.email,
        phone : user.phone,
        favoriteDish : user.favoriteDish,
        favoriteMenuItem : user.favoriteMenuItem
      }
    }
    else {
      $ctrl.signedUp = false;
    }
  }

})();