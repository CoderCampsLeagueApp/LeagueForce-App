(function() {
	'use strict';
	angular.module('app')
	.factory('ProfileFactory', ProfileFactory);

	ProfileFactory.$inject = ['$http', '$q'];

	function ProfileFactory($http, $q) {
		var o = {};
		
		var getAuth = function() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			};
			return auth;
		};

		o.createComment = function(comment) {
			var q = $q.defer();
			$http.post('/api/comment/', comment, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

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


		o.editComment = function(edit) {
			var q = $q.defer();
			$http.put('/api/comment/' + edit.id, edit).success(function(res) {
				console.log(edit);
				q.resolve(res);
			});
			return q.promise;
		};

		// o.deleteComment = function(comment) {
		// 	var q = $q.defer();
		// 	$http.delete('/api/comment/' + comment._id).success(function(res) {
		// 		q.resolve(res);
		// 	});
		// 	return q.promise;
		// };

		

		o.deleteComment = function(comment, news){
			var q = $q.defer();
			var del = {commentId: comment, newsId: news};
			$http.put('/api/comment/delete/' + del.commentId, del, getAuth()).success(function(res){
				q.resolve();
			});
			return q.promise;
		};

		return o;
	}
})();