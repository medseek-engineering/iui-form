(function (app) {
  'use strict';
  // have to add validation as per requirenet
  app.directive('mfSocialSecurityNumberTextBox', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/directives/form-controls/mf-Social-Security-Number-TextBox/mf-Social-Security-Number-TextBox.html',
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

}(window.app));
