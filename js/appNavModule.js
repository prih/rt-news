angular.module('appNavModule', ['appLoginModule'])

.factory('appNavService', [function(){
	var nav = {
		active: null,
		is_admin: false
	};

	return nav;
}])

.controller('appNavController', ['$scope', 'appNavService', 'appLoginService',
	function($scope, appNavService, appLoginService){
		$scope.nav = appNavService;
		$scope.login_state = appLoginService;
	}
]);