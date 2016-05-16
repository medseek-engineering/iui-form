(function (app, ng) {
  'use strict';
  app.directive('mfAccessDropDown', ['DropDownListItemsSvc', '$log', '_', 'session', function (ddSvc, log, _, session) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/directives/form-controls/mf-access-drop-down/mf-access-drop-down.html',
      scope: {
        field: '=',
        href: '='
      },
      link: function (scope, element, attrs, ngModel) {
        scope.accessLevelParent = {};
        scope.accessLevel = ngModel.$modelValue;
        scope.portal = session.get('portal');
        scope.$watch('field.filters.href', function (newVal) {
          if (!newVal) {
            return;
          }
          ddSvc.getListItems({field: scope.field,url: newVal}, function () {
            if (ngModel.$viewValue) {
              scope.accessLevel = _.find(scope.field.listItems, {id: ngModel.$viewValue});
            }
            scope.$emit(scope.field.name + '-list-items-rendered');
          });
        }, true);
        scope.$watch('field.listItems', function (newVal) {
          scope.originalListItems = ng.copy(newVal);
          scope.listItems = newVal;
          if (scope.accessLevel && scope.accessLevel.isCustom) {
            scope.lsitItems = _.remove(scope.listItems, {isCustom: true});
            scope.listItems.unshift(scope.accessLevel);
          }
        });
        scope.$watch('accessLevel', function (newVal) {
          if (newVal) {
            ngModel.$setViewValue(newVal);
          }
        });
        scope.$on('Custom-Access-Level', function (evt, level, listItems) {
          if (!level) {
            return;
          }
          scope.accessLevel = level;
          scope.listItems = listItems || angular.copy(scope.originalListItems);
          ngModel.$setViewValue(level);
          _.remove(scope.listItems, {isCustom: true});
          if (level.isCustom) {
            scope.listItems.unshift(scope.accessLevel);
          } else {
            scope.accessLevel = _.find(scope.listItems, {id: level.id});
          }
        });
      }
    };
  }]);
})(window.app, window.angular);
