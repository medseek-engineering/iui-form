(function() {
  'use strict';

  angular
    .module('app', ['ui.bootstrap','iui.form'])
    .constant('_', window._)
    .controller('TestController', TestController);

  function TestController() {
    var vm = this;
    vm.name = 'World!';
    
    //Check Box Testing
    vm.checkbox = true;
    vm.checkboxField = {
      name: 'Select this box',
      label: 'Select this box'
    };
    
    //Check Box List Testing
    vm.checkboxListFields = {
      listItems: {
        Orange: 'orange',
        Green: 'green',
        Blue: 'blue',
        Pink: 'pink'
      }
    };
    
  }

})();