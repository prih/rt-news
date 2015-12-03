angular.module('appNewsModule', [])

.factory('appNewsService', ['API_SERVER', '$http', function(API_SERVER, $http){
	return {
		getNews: function(cb, err_cb){
			$http.get(API_SERVER+'/api/v1/news')
			.then(function(res){
				cb(res.data);
			});
		}
	};
}])