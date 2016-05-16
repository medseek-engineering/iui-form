(function() {
  'use strict';
  
  angular.module('iuiForm').directive('iuiCheckBox', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        field: '='
      },
      templateUrl: '/$iui-form/iui-form-fields/iui-checkbox/iui-checkbox.html',
      link: function (scope, element, attrs, ngModel) {
        scope.selected = false;

        ngModel.$render = function () {
          scope.selected = ngModel.$modelValue;
        };
        
        console.log('HEllo');
        
        scope.$watch('selected', function (newVal) {
          ngModel.$setViewValue(newVal);
          $rootScope.$broadcast(scope.field.name + 'Checked', scope.model);
        });
      }
    };
  }]);

}());
