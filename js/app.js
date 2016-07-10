var app = angular.module('app', []);

app.factory('Header', function() {
  return {text: "FestivalMinne"}
})

function HeaderCtrl($scope, Header) {
  $scope.header = Header;
}
