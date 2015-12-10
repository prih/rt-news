angular.module('appAPIModule', ['appConfigModule'])

.factory('appAPIService', ['API_SERVER', '$http', '$cacheFactory', 
function(API_SERVER, $http, $cacheFactory){
	var _cache = $cacheFactory('_cache');

	var auth = localStorage.getItem('auth');
	if(auth){
		$http.defaults.headers.common['Authorization'] = auth;
	}

	return {
		getNews: function(obj){
			obj.loading = true;

			var data = null;

			if(data = _cache.get('all_news')){
				obj.items = data;
				obj.loading = false;
				return;
			}

			$http.get(API_SERVER+'/api/v1/news')
			.then(function(res){
				_cache.put('all_news', res.data);

				obj.items = res.data;
				obj.loading = false;
			});
		},
		getNewsDel: function(obj){
			obj.loading = true;

			var data = null;

			if(data = _cache.get('del_news')){
				obj.items = data;
				obj.loading = false;
				return;
			}

			$http.get(API_SERVER+'/api/v1/news/del')
			.then(function(res){
				_cache.put('del_news', res.data);

				obj.items = res.data;
				obj.loading = false;
			});
		},
		getFeeds: function(obj){
			obj.loading = true;
			var data = null;

			$http.get(API_SERVER+'/api/v1/feeds')
			.then(function(res){
				obj.items = res.data;
				obj.loading = false;
			});
		}
	};
}])