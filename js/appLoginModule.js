angular.module('appLoginModule', ['appNavModule'])

.factory('appLoginService', [function(){
	var user = {
		login: '',
		password: '',
		is_admin: (localStorage.getItem('auth')) ? true : false
	};

	return user;
}])

.controller('appLoginController', [
	'$scope', '$location', '$http', 'appNavService', 'appLoginService',
	function($scope, $location, $http, appNavService, appLoginService){
		appNavService.active = 'login';

		$scope.user = {
			login: '',
			password: '',
			save: false
		};

		$scope.loginSubmit = function(){
			// appLoginService.login = $scope.user.login;
			// appLoginService.password = $scope.user.password;

			var auth = 'Basic '+btoa($scope.user.login+':'+$scope.user.password);

			if($scope.user.save){
				localStorage.setItem('auth', auth);
			}

			$http.defaults.headers.common['Authorization'] = auth;

			appLoginService.is_admin = true;

			$scope.user.login = '';
			$scope.user.password = '';
			
			$location.path('/');
		};
	}
])

.controller('appLogoutController', [
	'$scope', '$location', '$http', 'appLoginService',
	function($scope, $location, $http, appLoginService){
		appLoginService.is_admin = false;

		localStorage.removeItem('auth');

		delete $http.defaults.headers.common['Authorization'];

		$location.path('/');
	}
]);