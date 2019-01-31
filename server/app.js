
var app=angular.module('myApp', ['ui.router']);
app.constant('api',{
  apiUrl :"http://localhost:8083"
  });
  
app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouteProvider) {


$stateProvider
.state('home',{
  url :'/',
  templateUrl :'view/home.html',
  controller : 'homeController'
})
.state('login',{
  url :'/login',
  templateUrl :'view/login.html',
  controller : 'loginController'
})
.state('forgot',{
  url :'/forgotpswrd',
  templateUrl :'view/forgot.html',
  controller : 'loginController'
})
.state('register',{
  url :'/register',
  templateUrl :'view/register.html',
  controller : 'registerController'
})
.state('logout',{
  url :'/',
  templateUrl :'view/home.html',
  controller : 'loginController'
})
.state('payment',{
  url :'/payment',
  templateUrl :'view/payment.html',
  controller : 'paymentController'
})
.state('contact',{
  url :'/contact',
  templateUrl :'view/contact.html',
  controller : 'loginController'
})
.state('bill',{
  url :'/billing',
  templateUrl :'view/bill.html',
  controller : 'billController'
})
.state('timeout',{
  url :'/timeOut',
  templateUrl :'view/timeOut.html',
  controller : 'loginController'
})

$urlRouteProvider.otherwise('/');  
}]);
