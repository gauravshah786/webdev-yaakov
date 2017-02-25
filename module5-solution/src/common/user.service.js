(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

UserService.$inject = ['MenuService'];
function UserService(MenuService) {
  var service = this;
  var user = {};  

  service.storeUser = function(newUser){
    user = {
        firstName: newUser.firstname,
        lastName: newUser.lastname,
        email: newUser.email,
        phone: newUser.phone
    };
    
    var menuNumber = newUser.menuNumber;
    if(menuNumber){
      var promise = MenuService.getFavMenuItem(menuNumber);
      promise.then(function(response){
        user.favoriteDish = menuNumber;
        user.favoriteMenuItem = response.data;
      })
      .catch(function(error){
          console.log(error);
      });
    }
    return true;
  };

  service.getUser = function(){
  	return user;
  }
}

})();