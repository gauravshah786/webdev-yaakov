(function () {

angular.module('public')
.controller('SignUpController', SignUpController)
.directive('validnumber', validMenuNumber);

validMenuNumber.$inject = ['$q', 'MenuService'];
function validMenuNumber($q,MenuService){
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function(scope, elm, attrs, ctrl) {
		   ctrl.$asyncValidators.validnumber = function (modelValue, viewValue) {

		   var deferred = $q.defer();
	        
	        if (!modelValue && !viewValue)
        		deferred.resolve();
	        else{
	        	var promise = MenuService.getFavMenuItem(modelValue);
					promise.then(function(response){
      		 			deferred.resolve();
    				})
    				.catch(function(error){
      					deferred.reject();
    				});
	      		}
			return deferred.promise;
	      	};
		}
	}
}

SignUpController.$inject = ['UserService'];
function SignUpController(UserService) {
  var signUp = this;
  signUp.successful = false;
  
  signUp.submit = function () {
	signUp.successful = UserService.storeUser(signUp.user);
	signUp.signupForm.$setPristine();
	signUp.signupForm.$setUntouched();
	signUp.user = {};
  };  
}

})();