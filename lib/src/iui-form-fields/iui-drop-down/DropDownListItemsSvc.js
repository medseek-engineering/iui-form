(function () {
  'use strict';
  /*global _:false */

  angular.module('iuiForm').factory('DropDownListItemsSvc', ['$http', '$log', function (http, log) {
    return {
      getListItems: function (options, callback) {
        log.debug('DropDownListItemsSvc| getListItems', 'options', options);
        if (!options || !options.url || !options.field) {
          throw new Error('Invalid options.');
        }
        http.get(app.api.root + options.url)
          .success(function (data) {
            var results = data.results || {};
            if (options.field.filters.property) {
              angular.forEach(options.field.filters.property.split('.'), function (target) {
                results = results[target] || data[target];
              });
            }
            options.field.listItems = [];
            angular.forEach(results, function (result) {
              if (typeof result === 'string') {
                var item = {
                  name: result,
                  id: result
                };
                options.field.listItems.push(item);
                return;
              }
              options.field.listItems.push(result);
            });
            if (options.ngModel && options.ngModel.$modelValue) {
              options.scope.model = _.find(options.field.listItems, { id: options.ngModel.$modelValue });
              options.ngModel.$setViewValue(options.scope.model);
            }
            if (callback) {
              callback(data);
            }
          });

      }
    };
  }]);
})(window.app);
