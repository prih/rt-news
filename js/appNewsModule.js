angular.module('appNewsModule', ['ngRoute', 'appNavModule', 'appAPIModule', 'appLoginModule'])

.controller('appNewsController', [
	'$scope', '$routeParams', 'appNavService', 'appAPIService', 'appLoginService',
	function($scope, $routeParams, appNavService, appAPIService, appLoginService){
	
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

	$scope.login_state = appLoginService;

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

	var start_index = 0;

	$scope.dragStart = function($index){
		start_index = $index;
	};
	$scope.dragDrop = function($index, item){
		var offset = 0;
		if($index > start_index){
			$index--;
			if($index != start_index) offset = start_index - $index;
		} else {
			offset = start_index - $index;
		}

		console.log(item.position, offset)

		return item;
	};
	$scope.dragMoved = function($index){
		$scope.news.items.splice($index, 1);
	};

	$scope.openNewsModal = function($event, item_key){
		var content = $($scope.news.items[item_key].content);
		content.find('*').removeAttr('class').removeAttr('style');

		$scope.modal.title = $scope.news.items[item_key].title;
		$scope.modal.body = content.html();
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