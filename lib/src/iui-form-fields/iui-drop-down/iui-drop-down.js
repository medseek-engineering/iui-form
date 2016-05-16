(function (app) {
  'use strict';

  app.directive('mfDropDown', ['$filter', '$rootScope', '$timeout', 'DropDownListItemsSvc', '_', '$log', function ($filter, $rootScope, timeout, listItemsSvc, _, log) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/directives/form-controls/mf-drop-down/mf-drop-down.html',
      scope: {
        form: '=',
        field: '=',
        blankitem: '@'
      },
      link: function (scope, element, attributes, ngModel) {
        function updateListItems () {
          if (scope.field.filters.href) {
            return updateListItemsFromServer();
          }

          if (Array.isArray(scope.field.listItems)) {
            scope.isArray = true;
            var arr = _.clone(scope.field.listItems);
            scope.field.listItems = [];
            populateListItems(arr);
          } else {
            var items = [];
            _.forEach(scope.field.listItems, function (k, v) {
              items.push({id: v, name: k});
            });
            scope.field.listItems = [];
            scope.isArray = true;
            populateListItems(items);
          }
        }

        function updateListItemsFromServer () {
          scope.field.listItems = [];
          scope.isArray = true;
          listItemsSvc.getListItems({
            url: scope.field.filters.href,
            field: scope.field,
            ngModel: ngModel,
            scope: scope
          }, function () {
            scope.$emit(scope.field.name + '-list-items-rendered');
          });
        }

        function populateListItems (arr) {
          for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
              populateListItems(arr[i]);
              continue;
            }
            scope.field.listItems.push(arr[i]);
          }
        }

        updateListItems();

        ngModel.$render = function () {
          var model = scope.model = ngModel.$modelValue ? (ngModel.$modelValue.id || ngModel.$modelValue.toString()) : undefined;
          render(scope.field.listItems);
          if (attributes.noWatch) {
            return;
          }
          scope.$watch('field.listItems', render);
        };

        function render (newVal) {
          if (!newVal || !newVal.length) {
            return;
          }
          var model = scope.model = ngModel.$modelValue ? (ngModel.$modelValue.id || ngModel.$modelValue.toString()) : undefined;
          if (model && newVal) {
            scope.model = _.find(newVal, function (item) {
              return item.id.toString() == model;
            });
            ngModel.$setViewValue(scope.model);
          }
          timeout(function () {$rootScope.$broadcast(scope.field.name + 'Rendered');});
        }

        scope.updateModel = function () {
          ngModel.$setViewValue(scope.model);
          $rootScope.$broadcast(scope.field.name + 'Changed', scope.model);
        };

        scope.$watch('field.filters.href', function (newVal) {
          if (newVal) {
            updateListItemsFromServer();
          }
        });

      }
    };
  }
  ]);

}(window.app));
