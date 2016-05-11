(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form/iui-basic.html',
    '<section>\n' +
    '  {{form.hello}} {{form.name}}\n' +
    '</section>');
}]);
})();
