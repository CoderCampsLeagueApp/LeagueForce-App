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
		o.getComment = function(id) {
			var q = $q.defer();
			$http.get('/api/comment/' + id).success(function(res) {
				console.log(id);
				q.resolve(res);
			});
			return q.promise;
		};

		o.getComments = function() {
			var q = $q.defer();
			$http.get('/api/comment/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};


		//-------------Leagues----------------------
		o.getLeague = function(id) {
			var q = $q.defer();
			$http.get('/api/league/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}
		o.getLeagues = function() {
			var q = $q.defer();
			$http.get('/api/league/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		//-------------Teams-----------------------


		return o;
	}
})();