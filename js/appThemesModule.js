angular.module('appThemesModule', ['ngRoute', 'appNavModule', 'appNewsModule'])

.controller('appThemesController', [
	'$scope', '$routeParams', 'appNavService', 'appNewsService',
	function($scope, $routeParams, appNavService, appNewsService){
	
	$scope.nav_type = $routeParams.type;
	$scope.$watch('nav_type', function(value){
		appNavService.active = value;
	});

	if($routeParams.type == 'geek') $scope.geek_only = true;

	$scope.themes = {
		title: 'Все темы',
		items: []
	};

	$scope.loading = true;

	appNewsService.getNews(function(data){
		$scope.themes.items = data;
		$scope.loading = false;
	});
}])

.filter('url', function(){
	var a = document.createElement('a');

	return function(input, key){
		a.href = input;
		return a[key];
	};
});