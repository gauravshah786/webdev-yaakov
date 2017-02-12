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
		  onRemove: '&',
			empty: '<'
		},
		controller: FoundItemsDirectiveController,
		controllerAs: 'narrowItDown',
		bindToController: true
	  };
	  return ddo;
	}

	function FoundItemsDirectiveController(){
		var list = this;
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
	  var menu = this;
		menu.searchTerm = "";
	  menu.found = [];
		menu.empty = false;

	  menu.searchMenu = function (searchTerm) {
			var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
			promise.then(function (response) {
				menu.found = response;
				menu.empty = MenuSearchService.isEmpty();
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
			.then(function (result){
				foundItems = searchTermOnArray(result.data.menu_items, searchTerm);
				return foundItems;
			});
		};

		service.isEmpty = function(){
			return (foundItems.length == 0);
		};

		service.removeItem = function (itemIndex) {
			foundItems.splice(itemIndex, 1);
		};

		function searchTermOnArray(arrayOfTerms, searchTerm){
			if (searchTerm != ""){
	      return itemsThatMatchedTerm(searchTerm, arrayOfTerms);
	    }
	    return [];
	  }

		function itemsThatMatchedTerm(searchTerm, arrayOfTerms){
	    var rta = [];
	    for (var i = 0; i < arrayOfTerms.length; i++) {
	      if (arrayOfTerms[i].description.includes(searchTerm)){
	        rta.push(arrayOfTerms[i]);
	      }
	    }
	    return rta;
	  }
	}
})();
