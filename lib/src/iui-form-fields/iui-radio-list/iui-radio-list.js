(function (app) {
  'use strict';
  app.directive('mfRadioList', ['$filter', function ($filter) {
    return {
      restrict: 'E',
      require: '?ngModel',
      transclude: true,
      scope: {
        field: '='
      },
      templateUrl: '/directives/form-controls/mf-radio-list/mf-radio-list.html',
      link: function (scope, element, attributes, ngModel) {
        ngModel.$render = function () {
          scope.selected = ngModel.$modelValue;
        };
        scope.$watch('selected', function (newVal) {
          if (newVal) {
            ngModel.$setViewValue(newVal);
          }
        });
      }
    };
  }
  ]);

}(window.app));
