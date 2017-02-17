(function () {
'use strict';

angular.module('MenuApp')
.component('itemList', {
  templateUrl: 'src/menuapp/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
