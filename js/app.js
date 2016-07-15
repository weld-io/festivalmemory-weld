var app = angular.module('app', ["ngAnimate", "countrySelect"]);

app.controller('MainCtrl', function($scope,$http) {

  $scope.user = {};

  $scope.DomainSearch = false;
  $scope.ImageDiv = false;
  $scope.showDomainSE = false;
  $scope.showDomainNU = false;

  $scope.showDomainSearch = function() {
     $scope.DomainSearch = true;
  };

  $scope.showImageDiv = function() {
     $scope.ImageDiv = true;
  };

  $scope.searchDomain = function() {

      $http.get('https://domain-production-weld.herokuapp.com/api/domain/' + $scope.user.domain + '.se')
      .then(function(response) {
          //First function handles success (.se domain is available)
          $scope.freeDomainSE = "Ledig!";
          $scope.showDomainSE = true;
          searchDomainNU();

      }, function(response) {
          //Second function handles error (.se domain is not available)
          $scope.freeDomainSE = "Upptagen!";
          $scope.showDomainSE = true;
          searchDomainNU();
      });
  };

  function searchDomainNU() {

      $http.get('https://domain-production-weld.herokuapp.com/api/domain/' + $scope.user.domain + '.nu')
      .then(function(response) {
          //First function handles success (.nu domain is available)
          $scope.freeDomainNU = "Ledig!";
          $scope.showDomainNU = true;

      }, function(response) {
          //Second function handles error (.nu domain is not available)
          $scope.freeDomainNU = "Upptagen!";
          $scope.showDomainNU = true;

      });
  };

  $scope.register = function() {

    var data = $scope.user;

    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }

    $http.post('http://weld-staging.herokuapp.com/api/users', data, config)
    .success(function (data, status, headers, config) {
        $scope.PostDataResponse = data;
    })
    .error(function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
    });

     console.log('User clicked next button', $scope.user);
  };

});

function readURL(event){
  var imagePath = URL.createObjectURL(event.target.files[0]);
  $('#image-div').css('background-image', 'url(' + imagePath + ')');
  console.log(imagePath);
}
