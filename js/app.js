var app = angular.module('app', ['ngAnimate', 'countrySelect','naif.base64']);

app.controller('MainCtrl', function($scope,$http,$window) {

  $scope.user = {};

  $scope.DomainSearch = false;
  $scope.AcceptTerms = false;
  $scope.ImageDiv = false;
  $scope.showDomainSE = false;
  $scope.showDomainNU = false;
  $scope.checkboxModel = {value : true};

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

  $scope.buttonClicked = function(domain,$event) {
      $scope.user.domain = domain;
      if ($event.target.id == "seButton") {
        $scope.termsUrl = "https://www.iis.se/domaner/registrera/se/villkor/";
        $scope.termsDomain = ".SE";
      } else if ($event.target.id == "nuButton") {
        $scope.termsUrl = "https://www.iis.se/docs/terms-and-conditions-nu.pdf";
        $scope.termsDomain = ".NU";
      }
      $scope.DomainSearch = false;
      $scope.AcceptTerms = true;
      $scope.CreatePageButton = true;
  }

  $scope.register = function() {
    if ($scope.checkboxModel.value) {
      $scope.user.countrycode = $scope.user.countrycode.split(":").pop();
      $scope.user.tags = ["weekendfestival2016"];

      var data = JSON.stringify($scope.user);

      $http.post('https://weld-staging.herokuapp.com/api/users', data,{
              transformRequest:angular.identity})
      .success(function (data, status, headers, config) {
          $scope.PostDataResponse = data;

          var pageUrl = "https://weld-staging.herokuapp.com/";
          //$window.location.href = pageUrl + data.projectSlug;
      })
      .error(function (data, status, headers, config) {
          $scope.ResponseDetails = "Data: " + data +
              "<hr />status: " + status +
              "<hr />headers: " + headers +
              "<hr />config: " + config;
      });
    } else {
      alert("Var vänlig, acceptera villkor");
    }
  };
});

function imageURL(event){
  var imagePath = URL.createObjectURL(event.target.files[0]);
  $('#image-div').css('background-image', 'url(' + imagePath + ')');
}
