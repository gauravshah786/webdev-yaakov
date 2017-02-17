(function () {
'use strict';

angular.module('MenuApp')
.component('categoryList', {
  templateUrl: 'src/menuapp/templates/categories.template.html',
  bindings: {
    categories: '<'
  }
});

})();
