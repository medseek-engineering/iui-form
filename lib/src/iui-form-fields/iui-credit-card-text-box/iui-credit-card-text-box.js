(function() {
  'use strict';

  angular.module('iuiForm').directive('iuiCreditCardTextBox', ['CardTypeStateSvc', function (typeSvc) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-credit-card-text-box/iui-credit-card-text-box.html',
      scope: {
        field: '='
      },
      link: function (scope, element, attrs, ngModel) {
        scope.types = typeSvc.getTypes();
        scope.cardType = typeSvc.getType() || scope.types[0];


        ngModel.$render = function () {
          scope.model = ngModel.$viewValue;
        };
        scope.$watch('cardType', function (newVal) {
          typeSvc.setType(newVal);
          validateCard();
        });
        scope.$watch('model', validateCard);
        function validateCard () {
          if (!scope.model) {
            return;
          }
          scope.model = scope.model.replace(/\D/g, '');
          var valid = scope.cardType.val.test(scope.model);
          ngModel.$setValidity('CreditCard', valid);
          ngModel.$setViewValue(scope.model);
        }
      }
    };
  }]);

}());
