(function() {
  'use strict';
  
  angular.module('iuiForm').directive('mfMultiSelect', ['$q', '$filter', '_', 'DropDownListItemsSvc', '$timeout',
    function ($q, $filter, _, listItemsSvc, timeout) {
      return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
          model: '=ngModel',
          field: '='
        },
        templateUrl: '/$iui-form/iui-form-fields/iui-multi-select/iui-multi-select.html',

        link: function (scope, elm, attrs, ngModel) {
          scope.availableLabel = attrs.availablelabel || 'Available';
          scope.selectedLabel = attrs.selectedlabel || 'Selected';
          scope.focus = {};
          scope.collection = [];

          ngModel.$render = function () {
            if (!ngModel.$modelValue || scope.hasSelections) {
              return;
            }

            _.forEach(ngModel.$modelValue, function (item) {
              item.__displayValue = formatItem(item);
              item.__selected = true;
              scope.hasSelections = true;
            });
            timeout(updateModel, 1000);
            ngModel.$render = angular.noop;
          };
          scope.addAll = function () {
            setSelected($filter('filter')(scope.collection, scope.search), true);
            moveFocus('available', 'selected');
            updateModel();
          };

          scope.removeAll = function () {
            setSelected($filter('filter')(scope.collection, scope.search), false);
            moveFocus('selected', 'available');
            updateModel();
          };

          scope.add = function () {
            setSelected(scope.focus.available, true);
            moveFocus('available', 'selected');
            updateModel();
          };

          scope.remove = function () {
            setSelected(scope.focus.selected, false);
            moveFocus('selected', 'available');
            updateModel();
          };

          scope.clearFocus = function () {
            scope.focus = {};
          };

          function formatItem (item) {
            var displaySelector = scope.field.filters.selector;
            if (/::([\s\S]+?)::/g.test(displaySelector)) {
              return _.template(displaySelector, item);
            }
            return item[displaySelector] || undefined;
          }

          function moveFocus (from, to) {
            scope.focus[to] = scope.focus[from];
            scope.focus[from] = [];
          }

          function setSelected (collection, selectedValue) {
            _.forEach(collection, function (item) {
              item.__selected = selectedValue;
            });
            return collection;
          }

          function updateModel () {
            scope.selectedItems = _.filter(scope.collection, '__selected');
            ngModel.$setViewValue(scope.selectedItems);
          }

          if (Array.isArray(scope.field.listItems)) {
            scope.collection = _.clone(scope.field.listItems, true);
          }

          if (scope.field.filters && scope.field.filters.href) {
            var options = {
              url: scope.field.filters.href,
              field: scope.field
            };
            listItemsSvc.getListItems(options, function () {
              var collection = scope.field.listItems;
              _.forEach(collection, function (item) {
                item.__displayValue = formatItem(item);
                var oldItem = _.find(scope.collection, { id: item.id });
                if (!oldItem) {
                  item.__selected = false;
                  scope.collection.push(item);
                }
              });
              updateModel();
            });
          }

        }
      };
    }]);
}());
