(function() {
  'use strict';

  angular.module('iuiForm').directive('iuiTextArea', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-text-area/iui-text-area.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function (scope, element, attrs, ngModel) {
        scope.field.rows = (scope.field.rows !== undefined) ? scope.field.rows : 3;
        scope.field.cols = (scope.field.cols !== undefined) ? scope.field.cols : 8;
        scope.field.totalCharacter = (scope.field.totalCharacter !== undefined) ? scope.field.totalCharacter : 100;

        ngModel.$render = function () {
          scope.value = ngModel.$viewValue;
        };

        scope.onChange = function () {
          ngModel.$setViewValue(scope.value);
        };

      }
    };
  }]);

}());
