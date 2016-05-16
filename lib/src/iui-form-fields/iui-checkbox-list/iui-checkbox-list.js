(function (app) {
  'use strict';
  app.directive('mfCheckBoxList', ['$filter', function ($filter) {
    return {
      restrict: 'E',
      require: '?ngModel',
      scope: {
        field: '='
      },
      templateUrl: '/directives/form-controls/mf-checkbox-list/mf-check-box-list.html',
      link: function (scope, element, attributes, ngModel) {
        ngModel.$render = function () {
          scope.model = ngModel.$modelValue || [];
        };
        scope.updateModel = function (item) {
          var matches = $filter('filter')(scope.model, item.value);
          if (matches && matches.length) {
            scope.model.splice(scope.model.indexOf(matches[0]), 1);
          } else {
            scope.model.push(item);
          }
          ngModel.$setViewValue(scope.model);
        };
        scope.isChecked = function (key) {
          return scope.model && $filter('filter')(scope.model, key).length > 0;
        };
      }
    };
  }
  ]);

}(window.app));
