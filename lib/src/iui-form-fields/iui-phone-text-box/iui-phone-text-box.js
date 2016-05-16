(function (app) {
  'use strict';

  app.directive('mfPhoneTextBox', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/directives/form-controls/mf-phone-text-box/mf-phone-text-box.html',
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

}(window.app));
