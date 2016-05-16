(function() {
  'use strict';

  angular.module('iuiForm').directive('iuiPhoneTextBox', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-phone-text-box/iui-phone-text-box.html',
      scope: {
        field: '='
      },
      link: function (scope, element, attrs, ngModel) {
        ngModel.$render = function () {
          scope.model = ngModel.$viewValue;
        };
        scope.updateModel = function () {
          ngModel.$setViewValue(scope.model);
        };
      }
    };
  }]);

}());
