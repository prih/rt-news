angular.module('appThemesModule', ['ngRoute', 'appNavModule', 'appNewsModule'])

.controller('appThemesController', [
	'$scope', '$routeParams', 'appNavService', 'appNewsService',
	function($scope, $routeParams, appNavService, appNewsService){
	
	$scope.nav_type = $routeParams.type;
	$scope.$watch('nav_type', function(value){
		appNavService.active = value;
	});

	$scope.themes = {
		title: '',
		items: [],
		loading: true
	};

	switch($routeParams.type){
		case 'all':
			$scope.themes.title = 'Все темы';
			$scope.geek_only = false;
			appNewsService.getNews($scope.themes);
			break;
		case 'geek':
			$scope.themes.title = 'Гиковские';
			$scope.geek_only = true;
			appNewsService.getNews($scope.themes);
			break;
		case 'del':
			$scope.themes.title = 'Удаленные';
			$scope.geek_only = false;
			$scope.del_only = true;
			appNewsService.getNewsDel($scope.themes);
			break;
	}
}])

.filter('url', function(){
	var a = document.createElement('a');

	return function(input, key){
		a.href = input;
		return a[key];
	};
});