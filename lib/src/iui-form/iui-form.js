(function() {
  'use strict';

  // Follow the Angular Style Guide: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

  angular.module('iuiForm')
    .directive('iuiForm', iuiForm);

  function iuiForm() {
    // Babel is preprocessing JS, so we can use ES2015 features https://babeljs.io/docs/learn-es2015/
    let directive = {
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
    let vm = this;
    vm.hello = 'Hello';
    // Public methods are listed here:
    vm.exampleMethod = exampleMethod;

    // if activate function is necessary
    // this gives you the ability to order the sequence of method calls
    // made when the directive is created
    activate();


    // Methods in the form of function syntax below

    function activate() {

    }

    function exampleMethod() {
      return 'foo';
    }
  }


})();