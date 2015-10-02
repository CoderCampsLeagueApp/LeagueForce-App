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

		//Newsletters

		// o.getAdminLoggedIn = function(id) {
		// 	var q = $q.defer();
		// 	$http.get('/api/user/' + id).success(function(res) {
		// 		q.resolve(res);
		// 	});
		// 	return q.promise;
		// };

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