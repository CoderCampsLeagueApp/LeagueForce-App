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
		o.getProfile = function(id){
			//no auth neccessary
			var q = $q.defer();
			$http.get('/api/user/profile/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		

		o.createComment = function(comment) {
			var q = $q.defer();
			$http.post('/api/comment/', comment, getAuth()).success(function(res) {
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

		o.deleteComment = function(comment, news){
			var q = $q.defer();
			var del = {commentId: comment, newsId: news};
			$http.put('/api/comment/delete/' + del.commentId, del, getAuth()).success(function(res){
				q.resolve();
			});
			return q.promise;
		};

		o.postReply = function(reply) {
			var q = $q.defer();
			$http.post('/api/comment/reply/', reply, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		return o;
	}
})();