(function() {
  'use strict';

  angular.module('iuiForm').directive('mfLabel', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-label/iui-label.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function (scope, element, attrs, ngModel) {
        // model => DOM update
        ngModel.$render = function () {
          scope.value = ngModel.$viewValue;
        };

        /* scope.onChange = function() {
           ngModel.$setViewValue(scope.value);
         };*/

      }
    };
  }]);

}());
