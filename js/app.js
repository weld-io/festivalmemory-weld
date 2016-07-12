var app = angular.module('app', []);

app.factory('Header', function() {
  return {text: "FestivalMinne"}
});

app.controller('MainCtrl', function($scope){
  $scope.showPage1 = function(){
    $scope.page1=true;
    $scope.page2=false;
    $scope.page3=false;
    $scope.page4=false;
  }
  $scope.showPage2 = function(){
    $scope.page1=false;
    $scope.page2=true;
    $scope.page3=false;
    $scope.page4=false;
  }
  $scope.showPage3 = function(){
    $scope.page1=false;
    $scope.page2=false;
    $scope.page3=true;
    $scope.page4=false;
  }
  $scope.showPage4 = function(){
    $scope.page1=false;
    $scope.page2=false;
    $scope.page3=false;
    $scope.page4=true;
  }
});

function HeaderCtrl($scope, Header) {
  $scope.header = Header;
}

app.controller('PersonalNumberCtrl', [function($scope) {

  this.user = {
       personalnumber: ''
  };

  this.register = function() {
     console.log('User clicked next button', this.user);
  };

}]);

app.controller('PersonalDetailsCtrl', [function() {

  this.user = {
       name: '',
       email: '',
       phone: '',
       address1: '',
       city: '',
       zipcode: '',
       countrycode: ''
  };

  this.register = function() {
     console.log('User clicked next button', this.user);
  };

}]);

app.controller('PhotoUploadCtrl', [function($scope) {



}]);

app.controller('GoToLastPageCtrl', [function($scope) {



}]);
