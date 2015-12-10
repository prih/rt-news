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

	$scope.modal = {
		title: '',
		visible: false,
		body: ''
	};

	$scope.openNewsModal = function($event, item_key){
		$scope.modal.title = $scope.news.items[item_key].title;
		$scope.modal.body = $scope.news.items[item_key].content;
		$scope.modal.visible = true;

		$event.preventDefault();
	};
}])

.filter('url', function(){
	var a = document.createElement('a');

	return function(input, key){
		a.href = input;
		return a[key];
	};
})

.directive('modal', function(){
	return {
		templateUrl: 'js/views/news_modal.html',
		restrict: 'E',
		transclude: true,
		scope: true,
		replace: true,
		link: function(scope, element, attrs){
			scope.$watch(attrs.title, function(value){
				scope.title = value;
			});

			scope.$watch(attrs.visible, function(value){
				if(value){
					$(element).modal('show');
				} else {
					$(element).modal('hide');
				}
			});

			$(element).on('shown.bs.modal', function(){
				scope.$apply(function(){
					scope.$parent.$eval(attrs.visible + ' = true');
				});
			});

			$(element).on('hidden.bs.modal', function(){
				scope.$apply(function(){
					scope.$parent.$eval(attrs.visible + ' = false');
				});
			});
		}
	};
});