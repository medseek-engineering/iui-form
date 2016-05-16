'use strict';

(function () {
  'use strict';

  angular.module('iui.form', ['iui.formTemplates', 'iuiForm']);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm', []);
})();
'use strict';

(function () {
  'use strict';

  var iuiFormConfig = {};

  angular.module('iuiForm').value('iuiFormConfig', iuiFormConfig);
})();
'use strict';

(function () {
  'use strict';

  // Follow the Angular Style Guide: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

  angular.module('iuiForm').directive('iuiForm', iuiForm);

  function iuiForm() {
    // Babel is preprocessing JS, so we can use ES2015 features https://babeljs.io/docs/learn-es2015/
    var directive = {
      restrict: 'E',
      templateUrl: '/$iui-form/iui-form/iui-form.html',
      // Controller names must be capitalized because they are constructors
      controller: FormController,
      // controllerAs & bindToController in directive syntax is only available in Ang 1.3+
      controllerAs: 'form',
      bindToController: true,
      scope: {
        name: '='
      }
    };
    return directive;
  }

  FormController.$inject = [];

  function FormController() {
    // Define Variables up top
    var vm = this;
    vm.hello = 'Hello';
    // Public methods are listed here:
    vm.exampleMethod = exampleMethod;

    // if activate function is necessary
    // this gives you the ability to order the sequence of method calls
    // made when the directive is created
    activate();

    // Methods in the form of function syntax below

    function activate() {}

    function exampleMethod() {
      return 'foo';
    }
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfSocialSecurityNumberTextBox', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-SSN-text-box/iui-SSN-text-box.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function link(scope, element, attrs, ngModel) {
        // scope.field.totalCharacter = 9;
        // model => DOM update
        ngModel.$render = function () {
          scope.value = ngModel.$viewValue;
        };

        scope.onChange = function () {
          ngModel.$setViewValue(scope.value);
        };
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfCheckBoxList', ['$filter', function ($filter) {
    return {
      restrict: 'E',
      require: '?ngModel',
      scope: {
        field: '='
      },
      templateUrl: '/$iui-form/iui-form-fields/iui-checkbox-list/iui-check-box-list.html',
      link: function link(scope, element, attributes, ngModel) {
        ngModel.$render = function () {
          scope.model = ngModel.$modelValue || [];
        };
        scope.updateModel = function (item) {
          var matches = $filter('filter')(scope.model, item.value);
          if (matches && matches.length) {
            scope.model.splice(scope.model.indexOf(matches[0]), 1);
          } else {
            scope.model.push(item);
          }
          ngModel.$setViewValue(scope.model);
        };
        scope.isChecked = function (key) {
          return scope.model && $filter('filter')(scope.model, key).length > 0;
        };
      }
    };
  }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfAutoComplete', ['$http', '_', '$timeout', function (http, _, timeout) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-auto-complete/iui-auto-complete.html',
      scope: {
        field: '=',
        timedelay: '@'
      },
      link: function link(scope, element, attrs, ngModel) {
        function bindResults(res) {
          var items = [];
          for (var iter in res.data.results) {
            if (res.data.results) {
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
          }
          return items;
        }

        function formatItem(item, selector) {
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

        var a = function a(params) {
          if (_typeof(ngModel.$modelValue) === 'object') {
            scope.innerModel = ngModel.$modelValue[scope.field.filters.selector] || ngModel.$modelValue;
          } else {
            http.get(app.api.root + attrs.source, { params: params, cache: true }).then(function (res) {
              var values = bindResults(res);
              var defaultValue = { key: ngModel.$modelValue, value: ngModel.$modelValue, item: {} };

              if (scope.field) {
                defaultValue.item[scope.field.filters.selector] = ngModel.$modelValue;
              }

              var value = values.length === 1 ? values[0] : _.find(values, { key: ngModel.$viewValue }) || _.find(values, function (val) {
                return val.item && val.item.id === ngModel.$viewValue;
              }) || defaultValue;

              scope.onSelect(value);
            });
          }
        };

        ngModel.$render = function () {

          if (ngModel.$modelValue && !scope.field.filters.ReadOnly) {

            var params = {
              findByKey: ngModel.$modelValue
            };

            if (scope.field) {
              var q = scope.q || attrs.query;
              params[q] = ngModel.$modelValue;
            }

            a(params);
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
            params: {},
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
                values.unshift({
                  value: scope.innerModel + ' ( ' + attrs.emptydescriptor + ')',
                  item: scope.innerModel,
                  key: scope.innerModel
                });
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
          if (newVal === undefined || newVal === null || newVal === '') {
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
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfCheckBox', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        field: '='
      },
      templateUrl: '/$iui-form/iui-form-fields/iui-checkbox/iui-checkbox.html',
      link: function link(scope, element, attrs, ngModel) {
        scope.selected = false;

        ngModel.$render = function () {
          scope.selected = ngModel.$modelValue;
        };

        console.log('HEllo');

        scope.$watch('selected', function (newVal) {
          ngModel.$setViewValue(newVal);
          $rootScope.$broadcast(scope.field.name + 'Checked', scope.model);
        });
      }
    };
  }]);
})();
'use strict';

(function (ng) {
  'use strict';

  angular.module('iuiForm').directive('mfAccessDropDown', ['DropDownListItemsSvc', '$log', '_', 'session', function (ddSvc, log, _, session) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-access-drop-down/iui-access-drop-down.html',
      scope: {
        field: '=',
        href: '='
      },
      link: function link(scope, element, attrs, ngModel) {
        scope.accessLevelParent = {};
        scope.accessLevel = ngModel.$modelValue;
        scope.portal = session.get('portal');
        scope.$watch('field.filters.href', function (newVal) {
          if (!newVal) {
            return;
          }
          ddSvc.getListItems({ field: scope.field, url: newVal }, function () {
            if (ngModel.$viewValue) {
              scope.accessLevel = _.find(scope.field.listItems, { id: ngModel.$viewValue });
            }
            scope.$emit(scope.field.name + '-list-items-rendered');
          });
        }, true);
        scope.$watch('field.listItems', function (newVal) {
          scope.originalListItems = ng.copy(newVal);
          scope.listItems = newVal;
          if (scope.accessLevel && scope.accessLevel.isCustom) {
            scope.lsitItems = _.remove(scope.listItems, { isCustom: true });
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
          _.remove(scope.listItems, { isCustom: true });
          if (level.isCustom) {
            scope.listItems.unshift(scope.accessLevel);
          } else {
            scope.accessLevel = _.find(scope.listItems, { id: level.id });
          }
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').factory('CardTypeStateSvc', ['_', function (_) {
    var type;
    var cardTypes = [{
      name: 'Visa',
      val: /^4[0-9]{12}(?:[0-9]{3})?$/
    }, {
      name: 'MasterCard',
      val: /^5[1-5][0-9]{14}/
    }, {
      name: 'Discover',
      val: /^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/
    }];

    return {
      getTypes: function getTypes() {
        return cardTypes;
      },
      getType: function getType() {
        return type ? _.find(cardTypes, { name: type.name }) : undefined;
      },
      setType: function setType(t) {
        type = t;
      }
    };
  }]);
})(window.app);
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfCreditCardTextBox', ['CardTypeStateSvc', function (typeSvc) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-credit-card-text-box/iui-credit-card-text-box.html',
      scope: {
        field: '='
      },
      link: function link(scope, element, attrs, ngModel) {
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
        function validateCard() {
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
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfDateDropdown', ['_', '$translate', function (_, translate) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-date-dropdown/iui-date-dropdown.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function link(scope, element, attributes, ngModel) {
        var moment = require('moment');
        moment().format();

        if (attributes.ngModel === 'editInsuranceForm.formData.ExpirationDate' || attributes.ngModel === 'insurance.addInsuranceForm.formData.ExpirationDate') {
          scope.years = _.range(1900, new Date().getFullYear() + 11).reverse();
        } else {
          scope.years = _.range(1900, new Date().getFullYear() + 1).reverse();
        }

        scope.months = moment.months();
        scope.days = _.range(1, 32);

        ngModel.$formatters.push(function (val) {
          if (!val) {
            scope.year = undefined;
            scope.month = undefined;
            scope.day = undefined;
          }
          return val;
        });

        ngModel.$render = function () {
          if (ngModel.$viewValue) {
            var date = typeof ngModel.$viewValue.getDate === 'function' ? ngModel.$viewValue : moment(ngModel.$viewValue)._d;
            scope.year = date.getFullYear();
            scope.month = date.getMonth();
            scope.day = date.getDate();
            scope.isValid = true;
          }
        };
        scope.onChange = function () {
          var length = scope.month === 1 ? isLeapYear(scope.year) ? 29 : 28 : [0, 2, 4, 6, 7, 9, 11].indexOf(scope.month) > -1 ? 31 : 30;
          scope.days = _.range(1, length + 1);

          var validate = function validate() {
            var valid = true;
            if (scope.field.filters && scope.field.filters.NoFutureDate) {
              var currentDate = moment(scope.year + '/' + (scope.month + 1) + '/' + scope.day);
              valid = moment().diff(currentDate, 'seconds') >= 0;

              ngModel.$setValidity(translate.instant('FUTURE_DATE_IS_NOT_ALLOWED'), valid);
            }
            return valid;
          };

          if (scope.year && scope.month !== undefined && scope.month !== null && typeof scope.day === 'number') {
            if (validate()) {
              scope.isValid = true;
              ngModel.$setViewValue(new Date(scope.year, scope.month, scope.day));
            }
          } else {
            scope.isValid = false;
            ngModel.$setViewValue(undefined);
          }
        };
      }
    };
  }]);
  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfDatePicker', ['PopupManager', function (PopupManager) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-date-picker/iui-date-picker.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function link(scope, element, attributes, ngModel) {
        scope.dateObject = PopupManager.registerPopup(scope.field.id, { opened: false });
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
  }]);
})();
'use strict';

(function () {
  'use strict';
  /*global _:false */

  angular.module('iuiForm').factory('DropDownListItemsSvc', ['$http', '$log', function (http, log) {
    return {
      getListItems: function getListItems(options, callback) {
        log.debug('DropDownListItemsSvc| getListItems', 'options', options);
        if (!options || !options.url || !options.field) {
          throw new Error('Invalid options.');
        }
        http.get(app.api.root + options.url).success(function (data) {
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
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfDropDown', ['$filter', '$rootScope', '$timeout', 'DropDownListItemsSvc', '_', '$log', function ($filter, $rootScope, timeout, listItemsSvc, _, log) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-drop-down/iui-drop-down.html',
      scope: {
        form: '=',
        field: '=',
        blankitem: '@'
      },
      link: function link(scope, element, attributes, ngModel) {
        function updateListItems() {
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
              items.push({ id: v, name: k });
            });
            scope.field.listItems = [];
            scope.isArray = true;
            populateListItems(items);
          }
        }

        function updateListItemsFromServer() {
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

        function populateListItems(arr) {
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
          var model = scope.model = ngModel.$modelValue ? ngModel.$modelValue.id || ngModel.$modelValue.toString() : undefined;
          render(scope.field.listItems);
          if (attributes.noWatch) {
            return;
          }
          scope.$watch('field.listItems', render);
        };

        function render(newVal) {
          if (!newVal || !newVal.length) {
            return;
          }
          var model = scope.model = ngModel.$modelValue ? ngModel.$modelValue.id || ngModel.$modelValue.toString() : undefined;
          if (model && newVal) {
            scope.model = _.find(newVal, function (item) {
              return item.id.toString() === model;
            });
            ngModel.$setViewValue(scope.model);
          }
          timeout(function () {
            $rootScope.$broadcast(scope.field.name + 'Rendered');
          });
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
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfaEmail', [function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function link(scope, element, attrs, ngModel) {
        // validate on changes to this field
        function validateEmail(email) {
          if (!email) {
            ngModel.$setValidity('email', true);
          } else {
            var re = new RegExp(['/^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))', '@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])', '|(([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$/'].join(''));
            ngModel.$setValidity('email', re.test(email.key || email.email || email));
          }

          return email;
        }

        ngModel.$parsers.push(validateEmail);
        ngModel.$formatters.push(validateEmail);
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfLabel', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-label/iui-label.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function link(scope, element, attrs, ngModel) {
        // model => DOM update
        ngModel.$render = function () {
          scope.value = ngModel.$viewValue;
        };

        /* scope.onChange = function() {
           ngModel.$setViewValue(scope.value);
         };*/
      }
    };
  }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfaMaxLength', ['$timeout', function (timeout) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function link(scope, element, attrs, ngModel) {
        // DOM => model changes
        ngModel.$parsers.push(function (val) {
          if (val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object') {
            // set validity based on model value
            ngModel.$setValidity('MaxLength', val.length <= attrs.mfaMaxLength);
          }
          return val;
        });

        // model => DOM changes
        ngModel.$formatters.push(function (val) {
          if (val) {
            // set validity based on model value
            ngModel.$setValidity('MaxLength', val.length <= attrs.mfaMaxLength);
          }
          return val;
        });

        // apply HTML5 maxlength attribute to input
        scope.$watch('field.input', function (val) {
          if (val) {
            val.attr('maxlength', attrs.mfaMaxLength);
          }
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfPhoneTextBox', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-phone-text-box/iui-phone-text-box.html',
      scope: {
        field: '='
      },
      link: function link(scope, element, attrs, ngModel) {
        ngModel.$render = function () {
          scope.model = ngModel.$viewValue;
        };
        scope.updateModel = function () {
          ngModel.$setViewValue(scope.model);
        };
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfMultiSelect', ['$q', '$filter', '_', 'DropDownListItemsSvc', '$timeout', function ($q, $filter, _, listItemsSvc, timeout) {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        model: '=ngModel',
        field: '='
      },
      templateUrl: '/$iui-form/iui-form-fields/iui-multi-select/iui-multi-select.html',

      link: function link(scope, elm, attrs, ngModel) {
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

        function formatItem(item) {
          var displaySelector = scope.field.filters.selector;
          if (/::([\s\S]+?)::/g.test(displaySelector)) {
            return _.template(displaySelector, item);
          }
          return item[displaySelector] || undefined;
        }

        function moveFocus(from, to) {
          scope.focus[to] = scope.focus[from];
          scope.focus[from] = [];
        }

        function setSelected(collection, selectedValue) {
          _.forEach(collection, function (item) {
            item.__selected = selectedValue;
          });
          return collection;
        }

        function updateModel() {
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
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfRadioList', ['$filter', function ($filter) {
    return {
      restrict: 'E',
      require: '?ngModel',
      transclude: true,
      scope: {
        field: '='
      },
      templateUrl: '/$iui-form/iui-form-fields/iui-radio-list/iui-radio-list.html',
      link: function link(scope, element, attributes, ngModel) {
        ngModel.$render = function () {
          scope.selected = ngModel.$modelValue;
        };
        scope.$watch('selected', function (newVal) {
          if (newVal) {
            ngModel.$setViewValue(newVal);
          }
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfaRetype', [function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function link(scope, element, attrs, ngModel) {
        // locate target field
        var targetField = scope.getField(attrs.mfaRetype);

        // validate on changes to this field
        var validator = function validator(val) {
          if (val) {
            ngModel.$setValidity('Retype', val.toLowerCase() === targetField.state().$modelValue.toLowerCase());
          }
          return val;
        };

        // apply validator only if target field is available
        if (targetField) {
          ngModel.$parsers.push(validator);
          ngModel.$formatters.push(validator);

          // validate on changes to the target field
          scope.$watch(function () {
            return targetField.state().$modelValue;
          }, function (val) {
            ngModel.$setValidity('Retype', val.toLowerCase() === ngModel.$modelValue.toLowerCase());
          });
        }
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfaTextAllowDigits', ['$translate', function (translate) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function link(scope, element, attrs, ngModel) {
        // DOM => model changes
        ngModel.$parsers.push(function (val) {
          if (val) {
            if (!scope.field.filters.TextAllowAlpha) {
              ngModel.$setValidity(translate.instant('NUMERIC_ONLY'), /^\d+$/.test(val));
            }
          }
          return val;
        });

        // model => DOM changes
        ngModel.$formatters.push(function (val) {
          if (val) {
            // set validity based on model value
            if (!scope.field.filters.TextAllowAlpha) {
              ngModel.$setValidity(translate.instant('NUMERIC_ONLY'), /^\d+$/.test(val));
            }
          }
          return val;
        });

        // apply HTML5 maxlength attribute to input
        scope.$watch('field.input', function (val) {
          if (val) {
            val.attr('maxlength', attrs.mfaMaxLength);
          }
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfTextArea', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-text-area/iui-text-area.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function link(scope, element, attrs, ngModel) {
        scope.field.rows = scope.field.rows !== undefined ? scope.field.rows : 3;
        scope.field.cols = scope.field.cols !== undefined ? scope.field.cols : 8;
        scope.field.totalCharacter = scope.field.totalCharacter !== undefined ? scope.field.totalCharacter : 100;

        ngModel.$render = function () {
          scope.value = ngModel.$viewValue;
        };

        scope.onChange = function () {
          ngModel.$setViewValue(scope.value);
        };
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfTextBox', ['session', '$translate', function (session, translate) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-text-box/iui-text-box.html',

      link: function link(scope, element, attrs, ngModel) {
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

        var createRegex = function createRegex(pattern) {
          var a = '^[a-zA-Z0-9.\'';
          var b = '^[a-zA-Z0-9.\' ';
          var c = '^[a-zA-Z0-9\'. ';
          var d = session.get('specialCharactersAllowed').replace(']', '\\]').replace('-', '\\-');
          var e = scope.pattern.replace('-', '\\-');
          var f = ']*$';

          if (scope.pattern && scope.disableSpace) {
            pattern = new RegExp(a + e + d + f);
          } else if (scope.pattern && !scope.disableSpace) {
            pattern = new RegExp(b + e + d + f);
          } else if (!scope.pattern && scope.disableSpace) {
            pattern = new RegExp(a + d + f);
          } else {
            pattern = new RegExp(c + d + f);
          }
        };

        var valid = function valid() {
          var valid = true;
          var pattern;

          if (input && input.length > 0 && input[0].getAttribute('mfa-email') && input[0].getAttribute('mfa-email').toLowerCase() === 'true') {
            return valid;
          }

          createRegex(pattern);

          if (scope.field.filters.MinLength !== undefined) {
            valid = scope.value.length - parseInt(scope.field.filters.MinLength) >= 0;
            valid = scope.value.length - parseInt(scope.field.filters.MinLength) < 0;
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
              ngModel.$setValidity(translate.instant('ENTER_VALID_CHAR') + scope.pattern.split('').join(',') + ',' + session.get('specialCharactersAllowed') + '', valid);
            } else {
              ngModel.$setValidity(translate.instant('ENTER_VALID_CHAR') + session.get('specialCharactersAllowed') + '', valid);
            }
          }

          return true;
        };

        scope.onChange = function () {
          if (valid()) {
            ngModel.$setViewValue(scope.value);
          }
        };

        function setSpaceValidity(boolValue) {
          ngModel.$setValidity(translate.instant('SPACE_NOT_ALLOWED'), boolValue);
        }
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiForm').directive('mfZipTextBox', ['$rootScope', '$translate', function (rootScope, translate) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: '/$iui-form/iui-form-fields/iui-zip-text-box/iui-zip-text-box.html',
      scope: {
        form: '=',
        field: '='
      },
      link: function link(scope, element, attrs, ngModel) {
        var codes = {
          '102': {
            country: 'US',
            regex: /(^\d{5}$)|(^\d{5}\d{4}$)/,
            maxLength: 10,
            mask: '99999?-9999'
          },
          '103': {
            country: 'Canada',
            regex: /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$/,
            maxLength: 7,
            mask: 'A9A-9A9'
          }
        };

        ngModel.$render = function () {
          scope.model = ngModel.$viewValue;
        };

        scope.code = codes['102'];
        var validate = function validate() {
          var valid = true;
          if (scope.model && scope.model.length > 0) {
            valid = scope.code.regex.test(scope.model);
            ngModel.$setValidity(translate.instant('ENTER_VALID_ZIP_OR_POSTAL_CODE'), valid);
          }
          return valid;
        };

        // DOM => model update
        scope.updateModel = function () {
          if (validate()) {
            ngModel.$setViewValue(scope.model);
          }
        };
        function countryChanged(event, countryId) {
          scope.code = codes[countryId.id];
          validate();
        }
        function policyHolderCountryChanged(event, countryId) {
          scope.code = codes[countryId.id];
        }
        scope.$watch('field.filters.href', function (newVal) {
          if (newVal) {
            scope.code = codes[newVal];
            validate();
          }
        });

        rootScope.$on('CountryChanged', countryChanged);
        rootScope.$on('PolicyHolderCountryChanged', policyHolderCountryChanged);
        rootScope.$on('PolicyCountryChanged', policyHolderCountryChanged);
        rootScope.$on('CountryIdChanged', countryChanged);
      }
    };
  }]);
})();
'use strict';

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form/iui-form.html', '<section>\n' + '  {{form.hello}} {{form.name}}\n' + '</section>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-SSN-text-box/iui-SSN-text-box.html', '<input type="text" id="{{field.id}}" name="{{field.name}}" autocomplete="off" class="form-control" ng-model="value" ng-change="onChange()" ng-readonly="{{field.filters.ReadOnly}}" ui-mask="999-99-9999" maxlength="{{field.totalCharacter}}">\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-access-drop-down/iui-access-drop-down.html', '  <div class="row mf-access-drop-down">\n' + '    <div class="col-xs-11">\n' + '      <select ng-disabled="{{field.valueReadOnly}}" ng-show="!isArray" id="{{field.id}}" name="{{field.name}}" class="form-control" ng-options="item.name  for item in listItems | orderBy:\'name\'" ng-model="accessLevel" ng-change="updateModel()">\n' + '          <option value="" ng-show="blankitem"></option>\n' + '      </select>\n' + '    </div>\n' + '      <div ng-if="portal===\'staff\'" class="col-xs-1" iui-required-permission=\'["user-management.invitations.access-level.customize"]\'>\n' + '      <button class="no-btn" ng-disabled="!accessLevel" permissions-editor-modal access-level="accessLevel" access-levels="listItems"><i class="round-icon_tools" ></i></button>\n' + '    </div>\n' + '    <div ng-if="portal===\'patient\'" class="col-xs-1">\n' + '      <button class="no-btn" ng-disabled="!accessLevel" permissions-editor-modal access-level="accessLevel" access-levels="listItems"><i class="round-icon_tools" ></i></button>\n' + '    </div>\n' + '  </div>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-auto-complete/iui-auto-complete.html', '<div>\n' + '<div class="df_autoComplete" ng-class="{\'input-group\': itemSelected&&innerModel.length&&!field.filters.ReadOnly}">\n' + '	<input type="text"\n' + '		id="{{field | field_id}}"\n' + '		name="{{field.name}}"\n' + '		ng-model="innerModel"\n' + '		ng-readonly="field.filters.ReadOnly"\n' + '		ng-required="field.filters.Required"\n' + '		typeahead="item as item.value for item in query($viewValue) | filter:{value:$viewValue}"\n' + '		class="form-control"\n' + '		typeahead-template-url="typeaheadTemplate.html"\n' + '		typeahead-wait-ms="timedelay || 100"\n' + '		autocomplete="off"\n' + '		typeahead-on-select=\'onSelect($item, $model, $label)\'>\n' + '		<span class="input-group-btn input-group-addon-no-background" ng-show="itemSelected&&innerModel.length&&!field.filters.ReadOnly">\n' + '			<button class="btn btn-default" ng-click="clear()">\n' + '				<i class="glyphicon glyphicon-remove white"></i>\n' + '				<span class="sr-only">Clear {{field.label}}</span>\n' + '			</button>\n' + '		</span>\n' + '</div>\n' + '\n' + '<script type="text/ng-template" id="typeaheadTemplate.html">\n' + '	<a href="" role="button" ng-click="selectMatch($index)">\n' + '		<span>{{match.model.value}}</span>\n' + '	</a>\n' + '</script>\n' + '</div>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-checkbox/iui-checkbox.html', '<div class="mf-checkbox">\n' + '	<input\n' + '		class="custom-checkbox"\n' + '		id="{{field.id}}"\n' + '		name="{{field.name}}"\n' + '		type="checkbox"\n' + '		ng-model="selected"\n' + '		ng-disabled="{{field.valueReadOnly}}"\n' + '	> \n' + '	<label for="{{field.id}}" ng-bind="field.label"></label>\n' + '</div>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-checkbox-list/iui-check-box-list.html', '<ul class="list-unstyled">\n' + '  <li ng-repeat="(key, value) in field.listItems"\n' + '    data-style="button">\n' + '    <div class="checkbox">\n' + '      <input\n' + '          class="custom-checkbox"\n' + '          id="{{field.id + \'_\' + $index}}"\n' + '          name="{{field.name}}"\n' + '          type="checkbox"\n' + '          ng-checked="isChecked(key)"\n' + '          ng-click="updateModel({key:key,value:value})">\n' + '      <label for="{{field.id + \'_\' + $index}}">\n' + '        {{value}}\n' + '      </label>\n' + '    </div>\n' + '  </li>\n' + '</ul>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-credit-card-text-box/iui-credit-card-text-box.html', '<div class="creditCardTextBox">\n' + '	<fieldset class="form-group">\n' + '		<legend class="sr-only" translate="SELECT_CARD_TYPE"></legend>\n' + '		<div class="cc_radios" >\n' + '			<div class="custom-radio" ng-repeat="type in types">\n' + '			  <input name="cardType" ng-model="$parent.cardType" ng-value="type" type="radio" id="creditCard_{{type.name}}">\n' + '			  <label for="creditCard_{{type.name}}">\n' + '			    {{type.name}}\n' + '			  </label>\n' + '			</div>\n' + '		</div>\n' + '	</fieldset>\n' + '	<label for="{{field.id}}_credit_card" class="control-label" ng-class="{\'required-field\':field.filters.Required}" ng-bind="field.label"></label>\n' + '	<input type="text" id="{{field.id}}_credit_card" name="{{field.name}}" class="targetControl form-control" ng-required="field.filters.Required" ng-model="model" maxlength="16">\n' + '\n' + '</div>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-date-picker/iui-date-picker.html', '<div class="input-group" style="width:100%">\n' + '		<input \n' + '			type="text"\n' + '			id="{{field.id}}"\n' + '			name="{{field.name}}"\n' + '			class="form-control " \n' + '			ng-model="dateVal" \n' + '			datepicker-popup="{{format}}"\n' + '			ng-change="onChange()"\n' + '			max="maxDate"\n' + '      max-date="maxDate"\n' + '			is-open="dateObject.opened"\n' + '			readonly \n' + '			> \n' + '		<span class="input-group-btn">\n' + '			<button type="button" role="button" class="btn btn-default" ng-click="open($event)">\n' + '				<i class="glyphicon glyphicon-calendar"></i>\n' + '				<span class="sr-only" translate="SR_OPEN_CALENDAR_WIDGET"></span>\n' + '			</button>\n' + '		</span>\n' + '</div>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-date-dropdown/iui-date-dropdown.html', '<ng-form name="dateDropdown">\n' + '	<div class="input-group-date-dropdown">\n' + '		<div class="input-group-date-dropdown-month">\n' + '			<label><span class="sr-only">{{field.label}}: Month</span><select\n' + '					name="month"\n' + '					class="form-control"\n' + '					ng-model="month"\n' + '					ng-options="months.indexOf(month) as month for month in months"\n' + '					ng-change="onChange()"\n' + '					ng-required="field.filters.Required"\n' + '					ng-disabled="field.filters.ReadOnly">\n' + '					<option value="">{{\'SR_MONTH\' | translate}}</option>\n' + '				</select></label>\n' + '		</div>\n' + '		<div class="input-group-date-dropdown-day">\n' + '			<label><span class="sr-only">{{field.label}}: Day</span><select\n' + '					name="day"\n' + '					class="form-control"\n' + '					ng-model="day"\n' + '					ng-options="(day < 10) ? \'0\' + (day) : (day) for day in days"\n' + '					ng-change="onChange()"\n' + '					ng-required="field.filters.Required"\n' + '					ng-disabled="field.filters.ReadOnly">\n' + '					<option value="">{{\'SR_DAY\' | translate}}</option>\n' + '				</select></label>\n' + '		</div>\n' + '		<div class="input-group-date-dropdown-year">\n' + '			<label><span class="sr-only">{{field.label}}: Year</span><select\n' + '					name="year"\n' + '					class="form-control"\n' + '					ng-model="year"\n' + '					ng-options="year for year in years"\n' + '					ng-required="field.filters.Required"\n' + '					ng-change="onChange()"\n' + '					ng-disabled="field.filters.ReadOnly">\n' + '					<option value="">{{\'SR_YEAR\' | translate}}</option>\n' + '				</select></label>\n' + '		</div>\n' + '	</div>\n' + '	<ul class="df_field_helpblock"\n' + '		ng-show="field.state().$dirty">\n' + '		<li ng-show="(dateDropdown.month.$dirty &&\n' + '		  dateDropdown.day.$dirty &&\n' + '		  dateDropdown.year.$dirty) &&\n' + '		  (dateDropdown.month.$error.required ||\n' + '		  dateDropdown.day.$error.required ||\n' + '		  dateDropdown.year.$error.required)" translate="FIELD_REQD"></li>\n' + '		<li\n' + '			ng-if="key !== \'required\'"\n' + '			ng-repeat="(key, value) in field.state().$error"\n' + '			ng-show="value"\n' + '			ng-bind="key | errorMessage:value:form:field"></li>\n' + '	</ul>\n' + '</ng-form>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-drop-down/iui-drop-down.html', '<div class="fieldName-{{field.name}}">\n' + '  <select ng-show="!field.filters.ReadOnly" id="{{field.id}}" name="{{field.name}}" class="form-control" ng-options="{{isArray ? \'k as v for (k, v) in field.listItems\' : \'item.name for item in field.listItems | orderBy:\\\'name\\\'\' }} " ng-model="model" ng-change="updateModel()">\n' + '    <option value="" ng-show="blankitem"></option>\n' + '  </select>\n' + '  <input type="text" class="form-control" ng-readonly="field.filters.ReadOnly" ng-model="model.name" ng-show="field.filters.ReadOnly">\n' + '</div>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-label/iui-label.html', ' <span id="{{field.id}}" name="{{field.name}}" class="pull-left " ng-model="value" >\n' + ' 	<b>{{field.textLabel}}</b>\n' + ' </span>\n' + '\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-phone-text-box/iui-phone-text-box.html', '<input id="{{field.id}}" name="{{field.name}}" ng-readonly="{{field.filters.ReadOnly}}" class="form-control" type="text" ng-model="model" ui-mask="(999) 999-9999" ng-change="updateModel()">\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-radio-list/iui-radio-list.html', '<ul class="mf-radio-list" role="radiogroup" aria-describedby="{{field.id}}">\n' + '	<li ng-repeat="(key, value)  in field.listItems"\n' + '		data-style="button"\n' + '		role="presentation">\n' + '		<div class="custom-radio" role="presentation">\n' + '			<input\n' + '				id="{{field.name + \'_radioList_radio\' + $index}}"\n' + '				name="{{field.name}}"\n' + '				type="radio"\n' + '				ng-model="$parent.selected"\n' + '				role="radio"\n' + '				value="{{key}}"\n' + '				aria-label="{{field.label + \' \' + value}}"\n' + '			>\n' + '			<label for="{{field.name + \'_radioList_radio\' + $index}}" class="label-soft">{{value}}</label>\n' + '		</div>\n' + '	</li>\n' + '</ul>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-multi-select/iui-multi-select.html', '<div class="df-multi-select">\n' + '  <div class="column-holder">\n' + '    <div class="col-filter">\n' + '      <label class="sr-only" for="searchEntity">Filter</label>\n' + '      <input type="search" name="searchEntity"  id="searchEntity" placeholder="Filter" ng-model="search" class="form-control" maxlength="50" ng-change="clearFocus()">\n' + '      <span ng-show="recordsCount">No Records found</span>\n' + '    </div>\n' + '  </div>  \n' + '  <div class="column-holder">\n' + '    <div class="col-available">\n' + '      <label class="control-label" for="{{field.name}}_multiSelectAvailable">{{ availableLabel }}\n' + '      ({{ collection.length-selectedItems.length || 0 }})</label>\n' + '    </div>\n' + '    <div class="col-buttons"></div>\n' + '    <div class="col-selected">\n' + '      <label class="control-label" for="{{field.name}}_multiSelectSelected">{{ selectedLabel }}\n' + '      ({{ selectedItems.length || 0 }})</label>\n' + '    </div>\n' + '  </div>\n' + '  <div class="column-holder">\n' + '    <div class="col-available">\n' + '      <select id="{{field.name}}_multiSelectAvailable" class="form-control" ng-model="focus.available" multiple\n' + '      ng-options="item.__displayValue for item in collection | filter: { __selected: false }| filter: search"></select>\n' + '    </div>\n' + '    <div class="col-buttons">\n' + '      <button class="btn-mover pager-button" ng-click="addAll()" title="Add all"\n' + '      ng-disabled="((collection | filter:search).length - (selectedItems | filter:search).length) === 0">\n' + '        <i class="glyphicon glyphicon-forward"></i>\n' + '        <span class="sr-only">Add all {{ availableLabel }} items</span>\n' + '      </button>\n' + '      <button class="btn-mover pager-button" ng-click="add()" title="Add selected"\n' + '      ng-disabled="!focus.available.length">\n' + '        <i class="glyphicon glyphicon-play"></i>\n' + '        <span class="sr-only">Add selected {{ availableLabel }} items</span>\n' + '      </button>\n' + '      <button class="btn-mover pager-button" ng-click="remove()" title="Remove selected"\n' + '      ng-disabled="!focus.selected.length">\n' + '        <i class="pager-back-img"></i>\n' + '        <span class="sr-only">Remove selected {{ selectedLabel }} items</span>\n' + '      </button>\n' + '      <button class="btn-mover pager-button" ng-click="removeAll()" title="Remove all"\n' + '      ng-disabled="(selectedItems | filter:search).length === 0">\n' + '        <i class="glyphicon glyphicon-backward"></i>\n' + '        <span class="sr-only">Remove all {{ selectedLabel }} items</span>\n' + '      </button>\n' + '    </div>\n' + '    <div class="col-selected">\n' + '      <select id="{{field.name}}_multiSelectSelected" class="form-control" ng-model="focus.selected" multiple ng-options="item.__displayValue for item in collection | filter: { __selected: true } | filter: search">\n' + '      </select>\n' + '    </div>\n' + '  </div>\n' + '</div>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-text-area/iui-text-area.html', '<div>\n' + '  <textarea id="{{field.id}}" name="{{field.name}}" class="form-control" ng-model="value" ng-change="onChange()" rows="{{field.rows}}" cols="{{field.cols}}" maxlength="{{field.totalCharacter}}"></textarea><br>\n' + '  <span ng-if="field.filters.CharacterCountdown">Character Remaining: {{field.totalCharacter-value.length}}</span>\n' + '</div>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-text-box/iui-text-box.html', '<input type="{{inputType}}" id="{{field.id}}" name="{{field.name}}" autocomplete="off" class="form-control" ng-model="value" ng-change="onChange()" ng-keypress="checkMaxlength(field.id,event)" ng-readonly="field.filters.ReadOnly" ng-required="{{field.filters.Required}}">\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form-fields/iui-zip-text-box/iui-zip-text-box.html', '<input type="text" id="{{field.id}}" name="{{field.name}}" class="form-control" ng-change="updateModel()" ng-readonly="{{field.filters.ReadOnly}}" ng-model="model" maxlength="{{code.maxLength}}"  ui-mask="{{code.mask}}">\n' + '');
  }]);
})();