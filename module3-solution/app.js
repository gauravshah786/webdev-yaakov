(function () {
'use strict';

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

	function FoundItemsDirective() {
	  var ddo = {
		templateUrl: 'searchResult.html',
		restrict: 'E',
		scope: {
		  found: '<',
		  message: '@',
		  onRemove: '&'
		},
		controller: NarrowItDownController,
		controllerAs: 'narrowItDown',
		bindToController: true
	  };
	  return ddo;
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
	  var menu = this;
	  menu.found = [];
	  menu.message = "";
	  
	  menu.searchMenu = function (searchTerm) {
		var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

		promise.then(function (response) {
			if(response != null && response.length > 0){
				menu.found = response;
				menu.message = "Success";
			}
			else if(response.length == 0)
				menu.message = "Nothing Found";
		})
		.catch(function (error) {
		  console.log(error);
		})
		
	  };
	  
	  menu.removeItem = function (itemIndex) {
		MenuSearchService.removeItem(itemIndex);
	  };
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
		var service = this;
		var foundItems = [];
		
		service.getMatchedMenuItems = function (searchTerm) {
			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			})
			.then(function (result) {
				foundItems = [];
				result.data.menu_items.forEach(function(obj) {
					if(obj.description.includes(searchTerm)){
						var tempObj = {
							name: obj.name,
							short_name: obj.short_name,
							description: obj.description
						};
						foundItems.push(tempObj); 
					}
				});
				return foundItems;
			});
		};
	  
		service.removeItem = function (itemIndex) {
			foundItems.splice(itemIndex, 1);
		};
	}
})();
