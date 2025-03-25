const app = angular.module('ShopEasyApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
   
    .when('/index', {
      templateUrl: 'index.html',
      controller: 'MainController',
    })
    .when('/about', {
      templateUrl: 'about.html',
      controller: 'AboutController',
    })
    .when('/contact', {
      templateUrl: 'contact.html',
      controller: 'ContactController',
    })
    .otherwise({
      redirectTo: '/', // Redirect to login if no route matches
    });
});