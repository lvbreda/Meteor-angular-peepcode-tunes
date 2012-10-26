var app = angular.module('meteorapp', []).
  config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
  	$locationProvider.html5Mode(true);
    $routeProvider.when('/', {controller: HomeCtrl, templateUrl: 'partials/page.html'});
}]);