(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/main-categories.template.html',
    controller: 'CategoryListController as categoryList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories()
        .catch(function(error){
          console.log(error);
        });
      }]
    }
  })

  .state('categoryItems', {
    url: '/items/{categoryId}',
    templateUrl: 'src/menuapp/templates/main-items.template.html',
    controller: 'ItemListController as itemList',
    resolve: {
      menuItems: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
                  return MenuDataService.getItemsforCategory($stateParams.categoryId)
                  .catch(function(error){
                    console.log(error);
                  });
            }]
    }
  });
}

})();
