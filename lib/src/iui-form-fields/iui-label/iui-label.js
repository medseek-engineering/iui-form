(function (app) {
  'use strict';

  app.directive('mfLabel', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/directives/form-controls/mf-label/mf-label.html',
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

}(window.app));
