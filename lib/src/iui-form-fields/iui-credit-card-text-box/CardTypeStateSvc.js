(function () {
  'use strict';
  angular.module('iuiForm').factory('CardTypeStateSvc', ['_', function (_) {
    var type;
    var cardTypes = [
      {
        name: 'Visa',
        val: /^4[0-9]{12}(?:[0-9]{3})?$/
      },
      {
        name: 'MasterCard',
        val: /^5[1-5][0-9]{14}/
      },
      {
        name: 'Discover',
        val: /^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/
      }
    ];

    return {
      getTypes: function () {
        return cardTypes;
      },
      getType: function () {
        return type ? _.find(cardTypes, {name: type.name}) : undefined;
      },
      setType: function (t) {
        type = t;
      }
    };
  }]);
})(window.app);
