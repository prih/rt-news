angular.module('appNewsModule', [])

.factory('appNewsService', ['API_SERVER', '$http', '$cacheFactory', 
function(API_SERVER, $http, $cacheFactory){
	var _cache = $cacheFactory('_cache');

	return {
		getNews: function(themes){
			themes.loading = true;

			var data = null;

			if(data = _cache.get('data')){
				themes.items = data;
				themes.loading = false;
				return;
			}

			$http.get(API_SERVER+'/api/v1/news')
			.then(function(res){
				_cache.put('data', res.data);

				themes.items = res.data;
				themes.loading = false;
			});
		},
		getNewsDel: function(themes){
			themes.loading = true;

			var data = null;

			if(data = _cache.get('data_del')){
				themes.items = data;
				themes.loading = false;
				return;
			}

			$http.get(API_SERVER+'/api/v1/news/del')
			.then(function(res){
				_cache.put('data_del', res.data);

				themes.items = res.data;
				themes.loading = false;
			});
		}
	};
}])