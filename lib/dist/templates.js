(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form/iui-form.html',
    '<section>\n' +
    '  {{form.hello}} {{form.name}}\n' +
    '</section>');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-SSN-text-box/iui-SSN-text-box.html',
    '<input type="text" id="{{field.id}}" name="{{field.name}}" autocomplete="off" class="form-control" ng-model="value" ng-change="onChange()" ng-readonly="{{field.filters.ReadOnly}}" ui-mask="999-99-9999" maxlength="{{field.totalCharacter}}">\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-auto-complete/iui-auto-complete.html',
    '<div>\n' +
    '<div class="df_autoComplete" ng-class="{\'input-group\': itemSelected&&innerModel.length&&!field.filters.ReadOnly}">\n' +
    '	<input type="text"\n' +
    '		id="{{field | field_id}}"\n' +
    '		name="{{field.name}}"\n' +
    '		ng-model="innerModel"\n' +
    '		ng-readonly="field.filters.ReadOnly"\n' +
    '		ng-required="field.filters.Required"\n' +
    '		typeahead="item as item.value for item in query($viewValue) | filter:{value:$viewValue}"\n' +
    '		class="form-control"\n' +
    '		typeahead-template-url="typeaheadTemplate.html"\n' +
    '		typeahead-wait-ms="timedelay || 100"\n' +
    '		autocomplete="off"\n' +
    '		typeahead-on-select=\'onSelect($item, $model, $label)\'>\n' +
    '		<span class="input-group-btn input-group-addon-no-background" ng-show="itemSelected&&innerModel.length&&!field.filters.ReadOnly">\n' +
    '			<button class="btn btn-default" ng-click="clear()">\n' +
    '				<i class="glyphicon glyphicon-remove white"></i>\n' +
    '				<span class="sr-only">Clear {{field.label}}</span>\n' +
    '			</button>\n' +
    '		</span>\n' +
    '</div>\n' +
    '\n' +
    '<script type="text/ng-template" id="typeaheadTemplate.html">\n' +
    '	<a href="" role="button" ng-click="selectMatch($index)">\n' +
    '		<span>{{match.model.value}}</span>\n' +
    '	</a>\n' +
    '</script>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-checkbox/iui-checkbox.html',
    '<div class="iui-checkbox">\n' +
    '  <input\n' +
    '    class="custom-checkbox"\n' +
    '    id="{{field.id}}"\n' +
    '    name="{{field.name}}"\n' +
    '    type="checkbox"\n' +
    '    ng-model="selected"\n' +
    '    ng-disabled="{{field.valueReadOnly}}">\n' +
    '  <label \n' +
    '	  for="{{field.id}}"\n' +
    '	  ng-bind="field.label">\n' +
    '	</label>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-checkbox-list/iui-check-box-list.html',
    '<ul class="list-unstyled">\n' +
    '  <li ng-repeat="(key, value) in field.listItems"\n' +
    '    data-style="button">\n' +
    '    <div class="checkbox">\n' +
    '      <input\n' +
    '        class="custom-checkbox"\n' +
    '        id="{{field.id + \'_\' + $index}}"\n' +
    '        name="{{field.name}}"\n' +
    '        type="checkbox"\n' +
    '        ng-checked="isChecked(key)"\n' +
    '        ng-click="updateModel({key:key,value:value})">\n' +
    '      <label for="{{field.id + \'_\' + $index}}">\n' +
    '        {{value}}\n' +
    '      </label>\n' +
    '    </div>\n' +
    '  </li>\n' +
    '</ul>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-credit-card-text-box/iui-credit-card-text-box.html',
    '<div class="creditCardTextBox">\n' +
    '	<fieldset class="form-group">\n' +
    '		<legend class="sr-only" translate="SELECT_CARD_TYPE"></legend>\n' +
    '		<div class="cc_radios" >\n' +
    '			<div class="custom-radio" ng-repeat="type in types">\n' +
    '			  <input name="cardType" ng-model="$parent.cardType" ng-value="type" type="radio" id="creditCard_{{type.name}}">\n' +
    '			  <label for="creditCard_{{type.name}}">\n' +
    '			    {{type.name}}\n' +
    '			  </label>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '	</fieldset>\n' +
    '	<label for="{{field.id}}_credit_card" class="control-label" ng-class="{\'required-field\':field.filters.Required}" ng-bind="field.label"></label>\n' +
    '	<input type="text" id="{{field.id}}_credit_card" name="{{field.name}}" class="targetControl form-control" ng-required="field.filters.Required" ng-model="model" maxlength="16">\n' +
    '\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-date-dropdown/iui-date-dropdown.html',
    '<ng-form name="dateDropdown">\n' +
    '	<div class="input-group-date-dropdown">\n' +
    '		<div class="input-group-date-dropdown-month">\n' +
    '			<label><span class="sr-only">{{field.label}}: Month</span><select\n' +
    '					name="month"\n' +
    '					class="form-control"\n' +
    '					ng-model="month"\n' +
    '					ng-options="months.indexOf(month) as month for month in months"\n' +
    '					ng-change="onChange()"\n' +
    '					ng-required="field.filters.Required"\n' +
    '					ng-disabled="field.filters.ReadOnly">\n' +
    '					<option value="">{{\'SR_MONTH\' | translate}}</option>\n' +
    '				</select></label>\n' +
    '		</div>\n' +
    '		<div class="input-group-date-dropdown-day">\n' +
    '			<label><span class="sr-only">{{field.label}}: Day</span><select\n' +
    '					name="day"\n' +
    '					class="form-control"\n' +
    '					ng-model="day"\n' +
    '					ng-options="(day < 10) ? \'0\' + (day) : (day) for day in days"\n' +
    '					ng-change="onChange()"\n' +
    '					ng-required="field.filters.Required"\n' +
    '					ng-disabled="field.filters.ReadOnly">\n' +
    '					<option value="">{{\'SR_DAY\' | translate}}</option>\n' +
    '				</select></label>\n' +
    '		</div>\n' +
    '		<div class="input-group-date-dropdown-year">\n' +
    '			<label><span class="sr-only">{{field.label}}: Year</span><select\n' +
    '					name="year"\n' +
    '					class="form-control"\n' +
    '					ng-model="year"\n' +
    '					ng-options="year for year in years"\n' +
    '					ng-required="field.filters.Required"\n' +
    '					ng-change="onChange()"\n' +
    '					ng-disabled="field.filters.ReadOnly">\n' +
    '					<option value="">{{\'SR_YEAR\' | translate}}</option>\n' +
    '				</select></label>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '	<ul class="df_field_helpblock"\n' +
    '		ng-show="field.state().$dirty">\n' +
    '		<li ng-show="(dateDropdown.month.$dirty &&\n' +
    '		  dateDropdown.day.$dirty &&\n' +
    '		  dateDropdown.year.$dirty) &&\n' +
    '		  (dateDropdown.month.$error.required ||\n' +
    '		  dateDropdown.day.$error.required ||\n' +
    '		  dateDropdown.year.$error.required)" translate="FIELD_REQD"></li>\n' +
    '		<li\n' +
    '			ng-if="key !== \'required\'"\n' +
    '			ng-repeat="(key, value) in field.state().$error"\n' +
    '			ng-show="value"\n' +
    '			ng-bind="key | errorMessage:value:form:field"></li>\n' +
    '	</ul>\n' +
    '</ng-form>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-date-picker/iui-date-picker.html',
    '<div class="input-group" style="width:100%">\n' +
    '		<input \n' +
    '			type="text"\n' +
    '			id="{{field.id}}"\n' +
    '			name="{{field.name}}"\n' +
    '			class="form-control " \n' +
    '			ng-model="dateVal" \n' +
    '			datepicker-popup="{{format}}"\n' +
    '			ng-change="onChange()"\n' +
    '			max="maxDate"\n' +
    '      max-date="maxDate"\n' +
    '			is-open="dateObject.opened"\n' +
    '			readonly \n' +
    '			> \n' +
    '		<span class="input-group-btn">\n' +
    '			<button type="button" role="button" class="btn btn-default" ng-click="open($event)">\n' +
    '				<i class="glyphicon glyphicon-calendar"></i>\n' +
    '				<span class="sr-only" translate="SR_OPEN_CALENDAR_WIDGET"></span>\n' +
    '			</button>\n' +
    '		</span>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-drop-down/iui-drop-down.html',
    '<div class="fieldName-{{field.name}}">\n' +
    '  <select ng-show="!field.filters.ReadOnly" id="{{field.id}}" name="{{field.name}}" class="form-control" ng-options="{{isArray ? \'k as v for (k, v) in field.listItems\' : \'item.name for item in field.listItems | orderBy:\\\'name\\\'\' }} " ng-model="model" ng-change="updateModel()">\n' +
    '    <option value="" ng-show="blankitem"></option>\n' +
    '  </select>\n' +
    '  <input type="text" class="form-control" ng-readonly="field.filters.ReadOnly" ng-model="model.name" ng-show="field.filters.ReadOnly">\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-label/iui-label.html',
    ' <span id="{{field.id}}" name="{{field.name}}" class="pull-left " ng-model="value" >\n' +
    ' 	<b>{{field.textLabel}}</b>\n' +
    ' </span>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-multi-select/iui-multi-select.html',
    '<div class="df-multi-select">\n' +
    '  <div class="column-holder">\n' +
    '    <div class="col-filter">\n' +
    '      <label class="sr-only" for="searchEntity">Filter</label>\n' +
    '      <input type="search" name="searchEntity"  id="searchEntity" placeholder="Filter" ng-model="search" class="form-control" maxlength="50" ng-change="clearFocus()">\n' +
    '      <span ng-show="recordsCount">No Records found</span>\n' +
    '    </div>\n' +
    '  </div>  \n' +
    '  <div class="column-holder">\n' +
    '    <div class="col-available">\n' +
    '      <label class="control-label" for="{{field.name}}_multiSelectAvailable">{{ availableLabel }}\n' +
    '      ({{ collection.length-selectedItems.length || 0 }})</label>\n' +
    '    </div>\n' +
    '    <div class="col-buttons"></div>\n' +
    '    <div class="col-selected">\n' +
    '      <label class="control-label" for="{{field.name}}_multiSelectSelected">{{ selectedLabel }}\n' +
    '      ({{ selectedItems.length || 0 }})</label>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div class="column-holder">\n' +
    '    <div class="col-available">\n' +
    '      <select id="{{field.name}}_multiSelectAvailable" class="form-control" ng-model="focus.available" multiple\n' +
    '      ng-options="item.__displayValue for item in collection | filter: { __selected: false }| filter: search"></select>\n' +
    '    </div>\n' +
    '    <div class="col-buttons">\n' +
    '      <button class="btn-mover pager-button" ng-click="addAll()" title="Add all"\n' +
    '      ng-disabled="((collection | filter:search).length - (selectedItems | filter:search).length) === 0">\n' +
    '        <i class="glyphicon glyphicon-forward"></i>\n' +
    '        <span class="sr-only">Add all {{ availableLabel }} items</span>\n' +
    '      </button>\n' +
    '      <button class="btn-mover pager-button" ng-click="add()" title="Add selected"\n' +
    '      ng-disabled="!focus.available.length">\n' +
    '        <i class="glyphicon glyphicon-play"></i>\n' +
    '        <span class="sr-only">Add selected {{ availableLabel }} items</span>\n' +
    '      </button>\n' +
    '      <button class="btn-mover pager-button" ng-click="remove()" title="Remove selected"\n' +
    '      ng-disabled="!focus.selected.length">\n' +
    '        <i class="pager-back-img"></i>\n' +
    '        <span class="sr-only">Remove selected {{ selectedLabel }} items</span>\n' +
    '      </button>\n' +
    '      <button class="btn-mover pager-button" ng-click="removeAll()" title="Remove all"\n' +
    '      ng-disabled="(selectedItems | filter:search).length === 0">\n' +
    '        <i class="glyphicon glyphicon-backward"></i>\n' +
    '        <span class="sr-only">Remove all {{ selectedLabel }} items</span>\n' +
    '      </button>\n' +
    '    </div>\n' +
    '    <div class="col-selected">\n' +
    '      <select id="{{field.name}}_multiSelectSelected" class="form-control" ng-model="focus.selected" multiple ng-options="item.__displayValue for item in collection | filter: { __selected: true } | filter: search">\n' +
    '      </select>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-phone-text-box/iui-phone-text-box.html',
    '<input id="{{field.id}}" name="{{field.name}}" ng-readonly="{{field.filters.ReadOnly}}" class="form-control" type="text" ng-model="model" ui-mask="(999) 999-9999" ng-change="updateModel()">\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-radio-list/iui-radio-list.html',
    '<ul class="mf-radio-list" role="radiogroup" aria-describedby="{{field.id}}">\n' +
    '	<li ng-repeat="(key, value)  in field.listItems"\n' +
    '		data-style="button"\n' +
    '		role="presentation">\n' +
    '		<div class="custom-radio" role="presentation">\n' +
    '			<input\n' +
    '				id="{{field.name + \'_radioList_radio\' + $index}}"\n' +
    '				name="{{field.name}}"\n' +
    '				type="radio"\n' +
    '				ng-model="$parent.selected"\n' +
    '				role="radio"\n' +
    '				value="{{key}}"\n' +
    '				aria-label="{{field.label + \' \' + value}}"\n' +
    '			>\n' +
    '			<label for="{{field.name + \'_radioList_radio\' + $index}}" class="label-soft">{{value}}</label>\n' +
    '		</div>\n' +
    '	</li>\n' +
    '</ul>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-text-area/iui-text-area.html',
    '<div>\n' +
    '  <textarea id="{{field.id}}" name="{{field.name}}" class="form-control" ng-model="value" ng-change="onChange()" rows="{{field.rows}}" cols="{{field.cols}}" maxlength="{{field.totalCharacter}}"></textarea><br>\n' +
    '  <span ng-if="field.filters.CharacterCountdown">Character Remaining: {{field.totalCharacter-value.length}}</span>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-text-box/iui-text-box.html',
    '<input type="{{inputType}}" id="{{field.id}}" name="{{field.name}}" autocomplete="off" class="form-control" ng-model="value" ng-change="onChange()" ng-keypress="checkMaxlength(field.id,event)" ng-readonly="field.filters.ReadOnly" ng-required="{{field.filters.Required}}">\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.formTemplates');
} catch (e) {
  module = angular.module('iui.formTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-form/iui-form-fields/iui-zip-text-box/iui-zip-text-box.html',
    '<input type="text" id="{{field.id}}" name="{{field.name}}" class="form-control" ng-change="updateModel()" ng-readonly="{{field.filters.ReadOnly}}" ng-model="model" maxlength="{{code.maxLength}}"  ui-mask="{{code.mask}}">\n' +
    '');
}]);
})();
