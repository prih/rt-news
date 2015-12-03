angular.module('appModule', ['ngRoute', 'appNavModule', 'appThemesModule'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider

	.when('/themes/:type', {
		templateUrl: 'js/views/themes.html',
		controller: 'appThemesController'
	})

	.otherwise({
		redirectTo: '/themes/all'
	});
}]);