(function () {
  'use strict';
  
  angular.module('iuiForm').directive('iuiDateDropdown', ['_', '$translate', function (_, translate) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-date-dropdown/iui-date-dropdown.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function (scope, element, attributes, ngModel) {
        var moment = require('moment');
        moment().format();
        
        if (attributes.ngModel === 'editInsuranceForm.formData.ExpirationDate' ||
          attributes.ngModel === 'insurance.addInsuranceForm.formData.ExpirationDate') {
          scope.years = _.range(1900, new Date().getFullYear() + 11).reverse();
        } else {
          scope.years = _.range(1900, new Date().getFullYear() + 1).reverse();
        }
        
        scope.months = moment.months();
        scope.days = _.range(1, 32);

        ngModel.$formatters.push(function (val) {
          if (!val) {
            scope.year = undefined;
            scope.month = undefined;
            scope.day = undefined;
          }
          return val;
        });

        ngModel.$render = function () {
          if (ngModel.$viewValue) {
            var date = typeof ngModel.$viewValue.getDate === 'function' ? 
              ngModel.$viewValue : 
              moment(ngModel.$viewValue)._d;
            scope.year = date.getFullYear();
            scope.month = date.getMonth();
            scope.day = date.getDate();
            scope.isValid = true;
          }
        };
        scope.onChange = function () {
          var length = scope.month === 1 ?
            (isLeapYear(scope.year) ? 29 : 28) :
            [0, 2, 4, 6, 7, 9, 11].indexOf(scope.month) > -1 ? 31 : 30;
          scope.days = _.range(1, length + 1);

          var validate = function () {
            var valid = true;
            if (scope.field.filters && scope.field.filters.NoFutureDate) {
              var currentDate = moment(scope.year + '/' + (scope.month + 1) + '/' + scope.day);
              valid = moment().diff(currentDate, 'seconds') >= 0;

              ngModel.$setValidity(translate.instant('FUTURE_DATE_IS_NOT_ALLOWED'), valid);
            }
            return valid;
          };

          if (scope.year && (scope.month !== undefined && scope.month !== null) && typeof scope.day === 'number') {
            if (validate()) {
              scope.isValid = true;
              ngModel.$setViewValue(new Date(scope.year, scope.month, scope.day));
            }
          } else {
            scope.isValid = false;
            ngModel.$setViewValue(undefined);
          }
        };
      }
    };
  }
  ]);
  function isLeapYear (year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  }
}());
