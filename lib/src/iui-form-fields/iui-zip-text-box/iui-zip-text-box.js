(function() {
  'use strict';

  angular.module('iuiForm').directive('mfZipTextBox', ['$rootScope', '$translate', function (rootScope, translate) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-zip-text-box/iui-zip-text-box.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function (scope, element, attrs, ngModel) {
        var codes = {
          '102': {
            country: 'US',
            regex: /(^\d{5}$)|(^\d{5}\d{4}$)/,
            maxLength: 10,
            mask: '99999?-9999'
          },
          '103': {
            country: 'Canada',
            regex: /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$/,
            maxLength: 7,
            mask: 'A9A-9A9'
          }
        };

        ngModel.$render = function () {
          scope.model = ngModel.$viewValue;
        };

        scope.code = codes['102'];
        var validate = function () {
          var valid = true;
          if (scope.model && scope.model.length > 0) {
            valid = scope.code.regex.test(scope.model);
            ngModel.$setValidity(translate.instant('ENTER_VALID_ZIP_OR_POSTAL_CODE'), valid);
          }
          return valid;
        };

        // DOM => model update
        scope.updateModel = function () {
          if (validate()) {
            ngModel.$setViewValue(scope.model);
          }
        };
        function countryChanged (event, countryId) {
          scope.code = codes[countryId.id];
          validate();
        }
        function policyHolderCountryChanged (event, countryId) {
          scope.code = codes[countryId.id];
        }
        scope.$watch('field.filters.href', function (newVal) {
          if (newVal) {
            scope.code = codes[newVal];
            validate();
          }
        });

        rootScope.$on('CountryChanged', countryChanged);
        rootScope.$on('PolicyHolderCountryChanged', policyHolderCountryChanged);
        rootScope.$on('PolicyCountryChanged', policyHolderCountryChanged);
        rootScope.$on('CountryIdChanged', countryChanged);
      }
    };
  }]);

}());
