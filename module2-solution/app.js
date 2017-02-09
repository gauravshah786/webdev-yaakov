(function(){
'use strict';
	
angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showBuyList = this;

  showBuyList.items = ShoppingListCheckOffService.getBuyItems();
  showBuyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var showBoughtList = this;
	showBoughtList.bought = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy and bought items
  var toBuy = [
	{ name: "cookies", quantity: 10 },
	{ name: "coke", quantity: 10 },
	{ name: "chili", quantity: 10 },
	{ name: "carrot", quantity: 10 },
	{ name: "cabbage", quantity: 10 }
  ];
  
  var bought = [];

  service.addItem = function (itemIndex) {
    var item = toBuy[itemIndex];
    bought.push(item);
  };

  service.removeItem = function (itemIndex) {
    service.addItem(itemIndex);
	toBuy.splice(itemIndex, 1);
  };

  service.getBuyItems = function () {
    return toBuy;
  };
  
  service.getBoughtItems = function () {
    return bought;
  };
  
}

})();