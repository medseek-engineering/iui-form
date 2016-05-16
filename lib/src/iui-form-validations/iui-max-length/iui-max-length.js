(function() {
  'use strict';

  angular.module('iuiForm').directive('iuiMaxLength', ['$timeout', function (timeout) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        // DOM => model changes
        ngModel.$parsers.push(function (val) {
          if (val && (typeof val !== 'object')) {
            // set validity based on model value
            ngModel.$setValidity('MaxLength', (val.length <= attrs.mfaMaxLength));
          }
          return val;
        });

        // model => DOM changes
        ngModel.$formatters.push(function (val) {
          if (val) {
            // set validity based on model value
            ngModel.$setValidity('MaxLength', (val.length <= attrs.mfaMaxLength));
          }
          return val;
        });

        // apply HTML5 maxlength attribute to input
        scope.$watch('field.input', function (val) {
          if (val) {
            val.attr('maxlength', attrs.mfaMaxLength);
          }
        });

      }
    };
  }]);

}());
