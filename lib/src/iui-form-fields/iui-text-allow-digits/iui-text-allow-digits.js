(function (app) {
  'use strict';

  app.directive('mfaTextAllowDigits', ['$translate',function (translate) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        // DOM => model changes
        ngModel.$parsers.push(function (val) {
          if (val) {
            if (!scope.field.filters.TextAllowAlpha) {
              ngModel.$setValidity(translate.instant('NUMERIC_ONLY'), /^\d+$/.test(val));
            }
          }
          return val;
        });

        // model => DOM changes
        ngModel.$formatters.push(function (val) {
          if (val) {
            // set validity based on model value
            if (!scope.field.filters.TextAllowAlpha)
              ngModel.$setValidity(translate.instant('NUMERIC_ONLY'), /^\d+$/.test(val));
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

}(window.app));
