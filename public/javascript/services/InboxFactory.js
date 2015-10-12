'use strict';
	angular.module('app')
	.factory('InboxFactory', InboxFactory);

	InboxFactory.$inject = ['$http', '$q', '$state'];

	function InboxFactory($http, $q, $state) {
		var o = {};

		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		}
		o.getMessages = function(id){
			var q = $q.defer();
			$http.get('/api/inbox/'+ id, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		o.sendMessage = function(message){
			var q = $q.defer();
			console.log(message);
			$http.post('/api/inbox/post', message, getAuth()).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		}
		o.messageReply = function(message){
			var q = $q.defer();
			$http.post('/api/inbox/reply', message, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		

		return o;
		
	}