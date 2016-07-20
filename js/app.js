var app = angular.module('app', ['ngAnimate', 'countrySelect']);

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
          $scope.freeDomainSE = "Välj!";
          $scope.showDomainSE = true;
          var seButton = angular.element(document.querySelector('#seButton'));
          seButton.css('color','#47e2a1');
          searchDomainNU();

      }, function(response) {
          //Second function handles error (.se domain is not available)
          $scope.freeDomainSE = "Upptagen!";
          $scope.showDomainSE = true;
          var seButton = angular.element(document.querySelector('#seButton'));
          seButton.css('color','#f86060');
          searchDomainNU();
      });
  };

  function searchDomainNU() {

      $http.get('https://domain-production-weld.herokuapp.com/api/domain/' + $scope.user.domain + '.nu')
      .then(function(response) {
          //First function handles success (.nu domain is available)
          $scope.freeDomainNU = "Välj!";
          $scope.showDomainNU = true;
          var nuButton = angular.element(document.querySelector('#nuButton'));
          nuButton.css('color','#47e2a1');

      }, function(response) {
          //Second function handles error (.nu domain is not available)
          $scope.freeDomainNU = "Upptagen!";
          $scope.showDomainNU = true;
          var nuButton = angular.element(document.querySelector('#nuButton'));
          nuButton.css('color','#f86060');
      });
  };

  $scope.buttonClicked = function(domain) {
      $scope.user.domain = domain;
      $scope.DomainSearch = false;
      $scope.ready = true;
  }

  $scope.register = function() {
    $scope.user.countrycode = $scope.user.countrycode.split(":").pop();
    $scope.user.tags = ["weekendfestival2016"];
    $scope.user.pictureurl = " ";
    var data = JSON.stringify($scope.user);

    /* var config = {
                headers : {
                    'Content-Type': 'application/json; charset=utf-8;'
                }
            } */

    $http.post('https://weld-staging.herokuapp.com/api/users', data)
    .success(function (data, status, headers, config) {
        $scope.PostDataResponse = data;
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
    })
    .error(function (data, status, headers, config) {
        $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + headers +
            "<hr />config: " + config;
    });

     console.log('User clicked next button', data);
  };

});

function readURL(event){
  var imagePath = URL.createObjectURL(event.target.files[0]);
  $('#image-div').css('background-image', 'url(' + imagePath + ')');
  console.log(imagePath);
}
