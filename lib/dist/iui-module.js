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
      controller: formController,
      // controllerAs & bindToController in directive syntax is only available in Ang 1.3+
      controllerAs: 'form',
      bindToController: true,
      scope: {
        name: '='
      }
    };
    return directive;
  }

  formController.$inject = [];

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

(function (module) {
  try {
    module = angular.module('iui.formTemplates');
  } catch (e) {
    module = angular.module('iui.formTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-form/iui-form/iui-basic.html', '<section>\n' + '  {{form.hello}} {{form.name}}\n' + '</section>');
  }]);
})();