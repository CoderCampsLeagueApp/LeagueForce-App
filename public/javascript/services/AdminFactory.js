(function() {
	'use strict';
	angular.module('app')
	.factory('AdminFactory', AdminFactory);

	AdminFactory.$inject = ['$http', '$q'];

	function AdminFactory($http, $q) {
		var o = {};

		var getAuth = function() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			};
			return auth;
		};

		o.createLeague = function(league){
			console.log(league);
			var q = $q.defer();
			$http.post('/api/league/', league, getAuth()).success(function(res){
				q.resolve();
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
		o.getLeagues = function() {
			var q = $q.defer();
			$http.get('/api/league/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.editLeague = function(league) {
			console.log(league);
			var q = $q.defer();
			$http.put('/api/league/' + league._id, league).success(function(res) {



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

		o.postNewsletter = function(newsletter) {
			var q = $q.defer();
			$http.post('/api/newsletter/', newsletter, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise
		};

		o.editNewsletter = function(edit) {
			var q = $q.defer();
			$http.put('/api/newsletter/' + edit._id, edit).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.createTeam = function(team){
			console.log(team);
			var q = $q.defer();
			$http.post('/api/league/team', team).success(function(res) {
				q.resolve();
				console.log('hello');
			});
			return q.promise;
		};

		o.deleteNewsletter = function(newsletter) {
			var q = $q.defer();
			$http.delete('/api/newsletter/' + newsletter._id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}


		return o;
	}
})();