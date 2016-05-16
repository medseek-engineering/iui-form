(function() {
  'use strict';

  angular.module('iuiForm').directive('mfTextBox', ['session', '$translate', function (session, translate) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-text-box/iui-text-box.html',

      link: function (scope, element, attrs, ngModel) {
        if (scope.field.filters.MaskInput) {
          scope.inputType = 'password';
        } else {
          scope.inputType = 'text';
        }
        
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
        
        var createRegex = function (pattern) {
          var a = '^[a-zA-Z0-9.\'';
          var b = '^[a-zA-Z0-9.\' ';
          var c = '^[a-zA-Z0-9\'. ';
          var d = session.get('specialCharactersAllowed').replace(']', '\\]').replace('-', '\\-');
          var e = scope.pattern.replace('-', '\\-');
          var f = ']*$';
          
          if (scope.pattern && scope.disableSpace) {
            pattern = new RegExp(a  + e + d + f);
          } else if (scope.pattern && !scope.disableSpace) {
            pattern = new RegExp(b  + e + d + f);
          } else if (!scope.pattern && scope.disableSpace) {
            pattern = new RegExp(a  + d + f);
          } else {
            pattern = new RegExp(c + d + f);
          }
        };
        
        var valid = function () {
          var valid = true;
          var pattern;
          
          if (input && 
           input.length > 0 && 
           input[0].getAttribute('mfa-email') && 
           input[0].getAttribute('mfa-email').toLowerCase() === 'true') {
            return valid;
          }
          
          createRegex(pattern);
          
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
            if (scope.pattern) {
              ngModel.$setValidity(translate.instant('ENTER_VALID_CHAR') + 
                scope.pattern.split('').join(',') + 
                ',' + 
                session.get('specialCharactersAllowed') + 
                '', valid);              
            } else {
              ngModel.$setValidity(translate.instant('ENTER_VALID_CHAR') + 
                session.get('specialCharactersAllowed') + 
                '', valid);
            }
          }
          
          return true;
        };
        
        scope.onChange = function () {
          if (valid()) {
            ngModel.$setViewValue(scope.value);
          }
        };
        
        function setSpaceValidity (boolValue) {
          ngModel.$setValidity(translate.instant('SPACE_NOT_ALLOWED'), boolValue);
        }
      }
    };
  }]);

}());
