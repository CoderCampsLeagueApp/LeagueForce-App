(function() {
	'use strict';
	angular.module('app')
	.factory('WebsiteFactory', WebsiteFactory);

	WebsiteFactory.$inject = ['$http', '$q'];

	function WebsiteFactory($http, $q) {
		var o = {};

		//----------------Newsletters------------------
		o.getNewsletters = function() {
			var q = $q.defer();
			$http.get('/api/newsletter/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getNewsletter = function(id) {
			var q = $q.defer();
			$http.get('/api/newsletter/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		//------------------Comments---------------

		o.getComments = function(id) {
			var q = $q.defer();
			$http.get('/api/comment/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getReplies = function() {
			var q = $q.defer();
			$http.get('/api/comment/reply/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		//-------------Leagues----------------------
		o.getLeague = function(id) {
			var q = $q.defer();
			$http.get('/api/views/league/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}
		o.getLeagues = function() {
			var q = $q.defer();
			$http.get('/api/views/league/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		o.subscribe = function(subscriber){
			var q = $q.defer();
			$http.put('/api/views/subscribe/', subscriber).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		//-------------Teams-----------------------
		o.getTeam = function(id) {
			var q = $q.defer();
			$http.get('/api/views/team/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		return o;
	}
})();
