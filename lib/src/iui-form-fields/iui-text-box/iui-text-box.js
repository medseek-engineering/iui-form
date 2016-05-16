(function (app) {
  'use strict';

  app.directive('mfTextBox', ['session', '$translate', function (session, translate) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/directives/form-controls/mf-text-box/mf-text-box.html',

      link: function (scope, element, attrs, ngModel) {
        if (scope.field.filters.MaskInput)
          scope.inputType = 'password';
        else
          scope.inputType = 'text';
        scope.field.ngModel = ngModel;
        scope.pattern = attrs.invalidcharacters;
        if (attrs.textdisablespaces) {
          scope.disableSpace = attrs.textdisablespaces;
        }
        var input = element.find('input');
        _.forEach(attrs, function (v, k) {
          if (k.indexOf('$') < 0) {
            input.attr(k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(), v);
          }
        });

        // model => DOM update
        ngModel.$render = function () {
          scope.value = ngModel.$viewValue;
        };

        scope.onChange = function () {
          if (validate()) {
            ngModel.$setViewValue(scope.value);
          }
        };
        var validate = function () {
          var valid = true;
          var pattern;
          if (input && input.length > 0 && input[0].getAttribute('mfa-email') && input[0].getAttribute('mfa-email').toLowerCase() === 'true') {
            return valid;
          }
          if (scope.pattern) {
            if (scope.disableSpace) {
              pattern = new RegExp("^[a-zA-Z0-9.'" + scope.pattern.replace('-', '\\-') + session.get('specialCharactersAllowed').replace(']', '\\]').replace('-', '\\-') + ']*$');
            } else {
              pattern = new RegExp("^[a-zA-Z0-9.' " + scope.pattern.replace('-', '\\-') + session.get('specialCharactersAllowed').replace(']', '\\]').replace('-', '\\-') + ']*$');
            }
          } else {
            if (scope.disableSpace) {
              pattern = new RegExp("^[a-zA-Z0-9.'" + session.get('specialCharactersAllowed').replace(']', '\\]').replace('-', '\\-') + ']*$');
            } else {
              pattern = new RegExp("^[a-zA-Z0-9'. " + session.get('specialCharactersAllowed').replace(']', '\\]').replace('-', '\\-') + ']*$');
            }
          }
          if (scope.field.filters.MinLength !== undefined) {
            valid = (scope.value.length - parseInt(scope.field.filters.MinLength) >= 0);
            valid = (scope.value.length - parseInt(scope.field.filters.MinLength)) < 0;
            ngModel.$setValidity(translate.instant('MIN_CHAR_ALLOWED') + scope.field.filters.MinLength + ' ', !valid);

          }
          if (scope.disableSpace && scope.value && /\s/.test(scope.value)) {
            setSpaceValidity(false);
            return true;
          }
          setSpaceValidity(true);
          if (scope.value && scope.value.length > 0) {
            valid = pattern.test(scope.value);
            if (scope.pattern)
              ngModel.$setValidity(translate.instant('ENTER_VALID_CHAR') + scope.pattern.split('').join(',') + ',' + session.get('specialCharactersAllowed') + '', valid);
            else
              ngModel.$setValidity(translate.instant('ENTER_VALID_CHAR') + session.get('specialCharactersAllowed') + '', valid);
          }
          return true;
        };
        function setSpaceValidity (boolValue) {
          ngModel.$setValidity(translate.instant('SPACE_NOT_ALLOWED'), boolValue);
        }
      }
    };
  }]);

}(window.app));
