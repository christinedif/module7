(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('price', PriceFilter);



ToBuyController.$inject = ['ShoppingListCheckOffService', '$scope'];
function ToBuyController(ShoppingListCheckOffService, $scope) {
var itemAdder=this;


  var items_existing = [{ name: "cookies", quantity: 10, pricePerItem: .25}, 
 { name: "apples", quantity: 3, pricePerItem: 1},
 { name: "toilet paper", quantity: 12, pricePerItem: 1.5},
 { name: "cups", quantity: 5, pricePerItem: 0.5},
 { name: "milk", quantity: 2, pricePerItem: 3} ];

var showList = this;


  for (var j = 0; j < items_existing.length; j++){
    console.log(items_existing[j].name)

     ShoppingListCheckOffService.addItem(items_existing[j].name, items_existing[j].quantity, items_existing[j].pricePerItem );

}

  showList.items = ShoppingListCheckOffService.getItems();

    showList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  }

}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', '$scope', 'priceFilter'];
function AlreadyBoughtController(ShoppingListCheckOffService, $scope, priceFilter) {

  var showBoughtList = this;

  showBoughtList.items = ShoppingListCheckOffService.getBoughtItems();

  $scope.findPrice = function (quantity, price) {

    var msg= '$$$' + quantity * price
    console.log("msg:", msg,showBoughtList.items.quantity)
    msg=priceFilter(msg)
    return msg;
  };



}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [];
  var items_bought = [];

  service.addItem = function (itemName, quantity, price) {
    var item = {
      name: itemName,
      quantity: quantity,
      pricePerItem: price
    };
    items.push(item);
    console.log(items);
  };

  service.removeItem = function (itemIndex) {
    var bought_item=items.pop(itemIndex, 1);
    items_bought.push(bought_item);
    console.log("items bought", items_bought)
  };

  service.getItems = function () {
    return items;
  };
    service.getBoughtItems = function () {

    return items_bought;
  };
};

  function PriceFilter() {
  return function (input) {
    console.log('input test 1:', input)
    input = input || "";
    input = input.replace('$$$', '');
    console.log('input test:', input)
    return input;
  }
}


})();

