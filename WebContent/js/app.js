/**
 * 
 */

var myApp = angular.module("myApp",['ngRoute'])
myApp.config(function($routeProvider){
   
	console.log('Entering In Config file myApp ')
	
	$routeProvider
	.when ('/home',{
		templateUrl:'view/home.html'
	})
	.when('/login',{
		templateUrl:'view/login.html'
	})
	
})
