angular.module('appNavModule', [])

.factory('appNavService', [function(){
	var nav = {
		active: null
	};

	return nav;
}])

.controller('appNavController', ['$scope', 'appNavService', function($scope, appNavService){
	$scope.nav = appNavService;
}]);