(function (app) {
  'use strict';

  app.directive('mfaEmail', [function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        // validate on changes to this field
        function validateEmail (email) {
          if (!email) {
            ngModel.$setValidity('email', true);
          } else {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            ngModel.$setValidity('email', re.test(email.key || email.email || email));
          }

          return email;
        }

        ngModel.$parsers.push(validateEmail);
        ngModel.$formatters.push(validateEmail);
      }
    };
  }]);

}(window.app));
