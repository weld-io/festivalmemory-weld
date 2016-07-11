var app = angular.module('app', []);

app.factory('Header', function() {
  return {text: "FestivalMinne"}
})

function HeaderCtrl($scope, Header) {
  $scope.header = Header;
  $scope.headerStyle = {
    "font-family": "Alfa Slab One",
    "color" : "#000",
    "font-size" : "120px",
    "text-align" : "center",
    "text-shadow" : "none",
    "margin-top" : "0px",
    "padding" : "40px 0px"
  }
}

app.controller('PersonalNrInputCtrl', [function() {

  this.user = {
       personalnumber: ''
  };

  this.register = function() {
     console.log('User clicked next button', this.user);
  };

}]);
