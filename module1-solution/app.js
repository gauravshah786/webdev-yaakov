(function(){

'use strict';

	angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {
		$scope.msg="";
		$scope.food="";
		$scope.checkItems = function (){
			var items = $scope.food;
			$scope.commaMsg="";
			$scope.style = "";
			if(items != ""){
				var foodItems = items.split(',');
				var len = foodItems.length;
				foodItems.forEach(function (entry){
					if(entry.trim() == ""){
						len--;
						$scope.commaMsg="We do not consider an empty item, i.e., , , towards to the count";
					}
				});
				
				if(len >=1 && len <=3){
					$scope.msg="Enjoy!";
					$scope.style = true;
				}
				else if(len >3){
					$scope.msg="Too much!";
					$scope.style = true;
				}
				else{
					$scope.msg="Please enter data first";
					$scope.style = false;
				}
			}
			else{
				$scope.msg="Please enter data first";
				$scope.style = false;
			}
		}
	}
})();