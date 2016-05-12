(function (app) {
  'use strict';

  app.directive('mfAutoComplete', ['$http', '_', '$timeout', function (http, _, timeout) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/directives/form-controls/mf-auto-complete/mf-auto-complete.html',
      scope: {
        field: '=',
        timedelay: '@'
      },
      link: function (scope, element, attrs, ngModel) {
        function bindResults (res) {
          var items = [];
          for (var iter in res.data.results) {
            var item = res.data.results[iter];
            var value = formatItem(item, scope.field ? scope.field.filters.selector : null);
            var key = attrs.key ? item[attrs.key] : value;

            // previewSelector shows a different value in dropdown than when selected
            if (scope.field && scope.field.filters.previewSelector) {
              value = formatItem(item, scope.field.filters.previewSelector);
            }

            var entity = { key: key, value: value, item: item || iter };
            items.push(entity);
          }
          return items;
        }

        function formatItem (item, selector) {
          if (!selector) {
            return item;
          }
          if (/::([\s\S]+?)::/g.test(selector)) {
            return _.template(selector, item);
          }

          return item[selector] || undefined;
        }

        scope.$on('clear-auto-complete', function () {
          scope.clear();
        });

        ngModel.$render = function () {
          if (ngModel.$modelValue && !scope.field.filters.ReadOnly) {
            var params = {
              findByKey: ngModel.$modelValue
            };
            if (scope.field) {
              var q = scope.q || attrs.query;
              params[q] = ngModel.$modelValue;
            }
            if (typeof ngModel.$modelValue === 'object') {
              scope.innerModel = ngModel.$modelValue[scope.field.filters.selector] || ngModel.$modelValue;
            } else {
              http.get(app.api.root + attrs.source, {
                params: params,
                cache: true
              }).then(function (res) {
                var values = bindResults(res);
                var defaultValue = { key: ngModel.$modelValue, value: ngModel.$modelValue, item: {} };
                if (scope.field)
                  defaultValue.item[scope.field.filters.selector] = ngModel.$modelValue;
                var value = values.length === 1 ? values[0] : (_.find(values, { key: ngModel.$viewValue }) ||
                _.find(values, function (val) {
                  return val.item && val.item.id === ngModel.$viewValue;
                }) ||
                defaultValue);
                scope.onSelect(value);
              });
            }
          } else if (ngModel.$modelValue && scope.field.filters.ReadOnly) {
            scope.readonlyModel = ngModel.$modelValue[scope.field.filters.selector] || ngModel.$modelValue;
          } else if (ngModel.$modelValue && scope.field.filters.__static) {
            scope.innerModel = ngModel.$modelValue[scope.field.filters.selector] || ngModel.$modelValue;
          } else {
            scope.innerModel = '';
          }
        };

        scope.query = function (search) {
          scope.changed();
          var query = {
            params: {
            },
            cache: true
          };
          var q = scope.q || attrs.query;
          if (q) {
            query.params[q] = search;
          } else {
            query.params.search = search;
          }
          var currentQuery = JSON.stringify(query);
          if (scope.currentQuery !== currentQuery) {
            scope.currentQuery = currentQuery;

            return http.get(app.api.root + attrs.source, query).then(function (res) {
              var values = bindResults(res);
              if (attrs.allownew && attrs.emptydescriptor && !_.find(values, { key: scope.innerModel })) {
                values.unshift({ value: scope.innerModel + ' ( ' + attrs.emptydescriptor + ')', item: scope.innerModel, key: scope.innerModel });
              }

              return values;
            });
          }
        };

        scope.$on('set-autocomplete-' + scope.field.name, function (sender, val, displayVal) {
          if (displayVal) {
            scope.itemSelected = displayVal;
            scope.innerModel = displayVal;
          }
          if (val) {
            ngModel.$setViewValue(val);
          }
        });

        scope.$watch('field.filters.query', function (newVal, oldVal) {
          if (newVal && oldVal && newVal !== oldVal) {
            scope.q = newVal;
          }
        });

        scope.$watch('innerModel', function (newVal, oldVal) {
          if (!newVal && !oldVal) {
            return;
          }
          if (!scope.field.filters.ReadOnly) {
            ngModel.$setViewValue(newVal);
          }
          if (newVal == undefined || newVal == null || newVal == '') {
            scope.$emit(scope.field.name + 'Cleared');
          }
        });

        scope.onSelect = function ($item) {
          ngModel.$render = angular.noop;
          ngModel.$setViewValue($item.item);
          scope.itemSelected = true;
          if (scope.field) {
            scope.$emit(scope.field.name + 'Selected', $item.item);
          }
          scope.innerModel = $item.key;
          scope.field.itemSelected = true;
          timeout(function () {
            ngModel.$setViewValue($item.item);
          }, 10);
        };

        scope.clear = function () {
          if (scope.field.filters.ReadOnly) {
            return;
          }
          scope.itemSelected = false;
          scope.innerModel = null;
          ngModel.$setViewValue(undefined);
          if (scope.field) {
            scope.$emit(scope.field.name + 'Cleared');
            scope.field.itemSelected = false;
          }
        };

        scope.changed = function () {
          scope.itemSelected = false;
          if (scope.field) {
            scope.$emit(scope.field.name + 'Changed');
            scope.field.itemSelected = false;
          }
        };
      }
    };
  }]);

}(window.app));
