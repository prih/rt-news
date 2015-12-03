angular.module('appThemesModule', ['appNavModule'])

.controller('appThemesController', ['$scope', '$routeParams', 'appNavService', function($scope, $routeParams, appNavService){
	$scope.nav_type = $routeParams.type;
	$scope.$watch('nav_type', function(value){
		appNavService.active = value;
	});

	$scope.themes = {
		title: 'Все темы',
		items: [
			{
				title: 'Критически опасные уязвимости в популярных 3G- и 4G-модемах или как построить Большого Брата',
				link: 'http://habrahabr.ru/company/pt/blog/272175/',
				meta: 'habrahabr.ru, 12/3/2015 в 12:58:48',
				preview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...',
				img: 'images/0a0f7d7733cc47ef83184485ecfafcee.png',
				active: true
			},
			{
				title: 'Критически опасные уязвимости в популярных 3G- и 4G-модемах или как построить Большого Брата',
				link: 'http://habrahabr.ru/company/pt/blog/272175/',
				meta: 'habrahabr.ru, 12/3/2015 в 12:58:48',
				preview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...',
				img: 'images/0a0f7d7733cc47ef83184485ecfafcee.png',
				geek: true
			}
		]
	};
}]);