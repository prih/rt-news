angular.module('appNewsModule', ['ngRoute', 'appNavModule', 'appAPIModule'])

.controller('appNewsController', [
	'$scope', '$routeParams', 'appNavService', 'appAPIService',
	function($scope, $routeParams, appNavService, appAPIService){
	
	$scope.nav_type = $routeParams.type;
	$scope.$watch('nav_type', function(value){
		appNavService.active = value;
	});

	$scope.news = {
		title: '',
		items: [],
		loading: true
	};

	switch($routeParams.type){
		case 'all':
			$scope.news.title = 'Все темы';
			$scope.geek_only = false;
			appAPIService.getNews($scope.news);
			break;
		case 'geek':
			$scope.news.title = 'Гиковские';
			$scope.geek_only = true;
			appAPIService.getNews($scope.news);
			break;
		case 'del':
			$scope.news.title = 'Удаленные';
			$scope.geek_only = false;
			$scope.del_only = true;
			appAPIService.getNewsDel($scope.news);
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