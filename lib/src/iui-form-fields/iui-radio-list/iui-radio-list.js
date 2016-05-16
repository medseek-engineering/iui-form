(function() {
  'use strict';
  angular.module('iuiForm').directive('mfRadioList', ['$filter', function ($filter) {
    return {
      restrict: 'E',
      require: '?ngModel',
      transclude: true,
      scope: {
        field: '='
      },
      templateUrl: '/$iui-form/iui-form-fields/iui-radio-list/iui-radio-list.html',
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

}());
