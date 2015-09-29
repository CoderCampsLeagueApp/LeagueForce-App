(function() {
	'use strict';
	angular.module('app')
	.factory('LeagueFactory', LeagueFactory);

	LeagueFactory.$inject = ['$http', '$q'];

	function LeagueFactory($http, $q) {
		var o = {};

		var getAuth = function() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			};
			return auth;
		};
		
		//include getAuth after league when we have logging in
		o.createLeague = function(league) {
			var q = $q.defer();
			$http.post('api/league/', league/*, getAuth()*/).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getLeagues = function() {
			var q = $q.defer();
			$http.get('/api/league/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getLeague = function(id) {
			var q = $q.defer();
			$http.get('/api/league/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		o.deleteLeague = function(league) {
			var q = $q.defer();
			$http.delete('/api/league/' + league).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		return o;
	}
})();