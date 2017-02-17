(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http,ApiBasePath) {
    var service = this;

    service.getAllCategories = function(){
      return $http({
          method: "GET",
          url: (ApiBasePath + "/categories.json")
        });
    };

    service.getItemsforCategory = function(categoryShortName){
      var url = ApiBasePath + "/menu_items.json?category=" + categoryShortName;
      return $http({
          method: "GET",
          url: url
      });
    };
  }
})();
