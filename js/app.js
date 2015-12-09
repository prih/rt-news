angular.module('appModule', [
	'ngRoute',
	'dndLists',
	'ngSanitize',
	'appNavModule',
	'appNewsModule'
])

.config(['$routeProvider', function($routeProvider){
	$routeProvider

	.when('/news/:type', {
		templateUrl: 'js/views/news.html',
		controller: 'appNewsController'
	})

	.otherwise({
		redirectTo: '/news/all'
	});
}]);