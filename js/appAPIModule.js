angular.module('appAPIModule', ['appConfigModule'])

.factory('appAPIService', ['API_SERVER', '$http', '$cacheFactory', 
function(API_SERVER, $http, $cacheFactory){
	var _cache = $cacheFactory('_cache');

	return {
		getNews: function(themes){
			themes.loading = true;

			var data = null;

			if(data = _cache.get('all_news')){
				themes.items = data;
				themes.loading = false;
				return;
			}

			$http.get(API_SERVER+'/api/v1/news')
			.then(function(res){
				_cache.put('all_news', res.data);

				themes.items = res.data;
				themes.loading = false;
			});
		},
		getNewsDel: function(themes){
			themes.loading = true;

			var data = null;

			if(data = _cache.get('del_news')){
				themes.items = data;
				themes.loading = false;
				return;
			}

			$http.get(API_SERVER+'/api/v1/news/del')
			.then(function(res){
				_cache.put('del_news', res.data);

				themes.items = res.data;
				themes.loading = false;
			});
		}
	};
}])