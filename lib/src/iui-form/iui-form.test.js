(function() {
  'use strict';

  describe('iui-form directive', function () {
    var scope,
      element,
      el;
    beforeEach(function () {
      module('iuiForm');
      module('templates');
    });
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();

      scope.name = 'Bart';
      
      element = angular.element('<div><iui-form name="name"></iui-form></div>');
      el = $compile(element)(scope);
      scope.$digest();
    }));

    it('should have one `<section>`', function() {
      expect(el[0].querySelectorAll('section').length).toBe(1);
    });

    
  });
})();