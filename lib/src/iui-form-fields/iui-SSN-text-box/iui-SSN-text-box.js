(function() {
  'use strict';
  
  angular.module('iuiForm').directive('iuiSocialSecurityNumberTextBox', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-SSN-text-box/iui-SSN-text-box.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function (scope, element, attrs, ngModel) {
        // scope.field.totalCharacter = 9;
        // model => DOM update
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
