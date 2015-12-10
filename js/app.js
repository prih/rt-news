angular.module('appModule', [
	'ngRoute',
	'dndLists',
	'ngSanitize',
	'appNavModule',
	'appNewsModule',
	'appLoginModule'
])

.config(['$routeProvider', function($routeProvider){
	$routeProvider

	.when('/news/:type', {
		templateUrl: 'js/views/news.html',
		controller: 'appNewsController'
	})

	.when('/login', {
		controller: 'appLoginController',
		templateUrl: 'js/views/login.html',
	})

	.when('/logout', {
		template: '',
		controller: 'appLogoutController'
	})

	.otherwise({
		redirectTo: '/news/all'
	});
}]);