(function() {
  'use strict';

  angular.module('iuiForm').directive('iuiDatePicker', ['PopupManager', function (PopupManager) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-date-picker/iui-date-picker.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function (scope, element, attributes, ngModel) {
        scope.dateObject = PopupManager.registerPopup(scope.field.id, {opened: false});
        ngModel.$render = function () {
          // if(ngModel.$modelValue) {
          scope.dateVal = ngModel.$modelValue;
        // }
        };
        scope.onChange = function () {
          ngModel.$setViewValue(scope.dateVal);
        };
        scope.format = 'MMMM d, yyyy';
        scope.maxDate = new Date();

        /* function to open datepicker icon when clicked on it */
        scope.open = function ($event) {
          $event.preventDefault();
          $event.stopPropagation();
          PopupManager.togglePopup(scope.field.id);
        };
      }
    };
  }
  ]);

}());
