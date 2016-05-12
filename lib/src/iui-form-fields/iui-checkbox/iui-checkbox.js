(function (app) {
  'use strict';
  app.directive('mfCheckBox', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        field: '='
      },
      templateUrl: '/directives/form-controls/mf-checkbox/mf-checkbox.html',
      link: function (scope, element, attrs, ngModel) {
        scope.selected = false;

        ngModel.$render = function () {
          scope.selected = ngModel.$modelValue;
        };

        scope.$watch('selected', function (newVal) {
          ngModel.$setViewValue(newVal);
          $rootScope.$broadcast(scope.field.name + 'Checked', scope.model);
        });
      }
    };
  }]);

}(window.app));
