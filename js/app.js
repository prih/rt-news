angular.module('appModule', ['ngRoute', 'dndLists', 'ngSanitize', 'appNavModule', 'appThemesModule'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider

	.when('/themes/:type', {
		templateUrl: 'js/views/themes.html',
		controller: 'appThemesController'
	})

	.otherwise({
		redirectTo: '/themes/all'
	});
}])

.value('API_SERVER', 'http://master.radio-t.com:8778');