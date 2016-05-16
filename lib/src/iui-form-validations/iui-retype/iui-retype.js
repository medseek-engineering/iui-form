(function () {
  'use strict';

  angular.module('iuiForm').directive('iuiRetype', [function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        // locate target field
        var targetField = scope.getField(attrs.mfaRetype);

        // validate on changes to this field
        var validator = function (val) {
          if (val) {
            ngModel.$setValidity('Retype', (val.toLowerCase() === targetField.state().$modelValue.toLowerCase()));
          }
          return val;
        };

        // apply validator only if target field is available
        if (targetField) {
          ngModel.$parsers.push(validator);
          ngModel.$formatters.push(validator);

          // validate on changes to the target field
          scope.$watch(function () {
            return targetField.state().$modelValue;
          }, function (val) {
            ngModel.$setValidity('Retype', (val.toLowerCase() === ngModel.$modelValue.toLowerCase()));
          });
        }
      }
    };
  }]);

}());
