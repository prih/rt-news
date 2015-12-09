angular.module('appNewsModule', ['ngRoute', 'appNavModule', 'appAPIModule'])

.controller('appNewsController', [
	'$scope', '$routeParams', 'appNavService', 'appAPIService',
	function($scope, $routeParams, appNavService, appAPIService){
	
	$scope.nav_type = $routeParams.type;
	$scope.$watch('nav_type', function(value){
		appNavService.active = value;
	});

	$scope.news = {
		type: $routeParams.type,
		items: [],
		loading: true
	};

	$scope.geek_only = false;
	$scope.del_only = false;

	// $scope.is_admin = true;

	switch($routeParams.type){
		case 'all':
			appAPIService.getNews($scope.news);
			break;
		case 'geek':
			$scope.geek_only = true;
			appAPIService.getNews($scope.news);
			break;
		case 'del':
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