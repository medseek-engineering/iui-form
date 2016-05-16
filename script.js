(function() {
  'use strict';

  angular
    .module('app', ['ui.bootstrap','iui.form'])
    .constant('_', window._)
    .controller('TestController', TestController);

  function TestController() {
    var vm = this;
    vm.name = 'World!';
    vm.checkbox = true;
    vm.checkboxField = {
      name: 'asdsad',
      label: 'asdasd'
    };
  }

})();