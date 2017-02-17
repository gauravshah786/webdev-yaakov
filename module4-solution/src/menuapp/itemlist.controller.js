(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemListController', ItemListController);

ItemListController.$inject = ['menuItems']
function ItemListController(menuItems) {
  var itemList = this;
  itemList.menuItems = menuItems;
}

})();
