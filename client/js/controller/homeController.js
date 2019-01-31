// var app=angular.module('myApp', []);
app.controller('homeController', function ($scope,$http,$state,$rootScope) {
 
    if ($rootScope.user)
    {
      $rootScope.userLoggedOut=false;    
    }
    else
    {
      $rootScope.userLoggedOut=true;
    }
    
  
    $scope.loginView = function (){
      $state.go('login');
  }
   //  $http.get(url).then( function(response) {
   //     $scope.transactionData = response.data;
   //  });
 });