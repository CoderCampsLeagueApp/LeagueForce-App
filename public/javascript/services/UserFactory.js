(function(){
	// "use strict" ;
	angular.module('app').factory('UserFactory', UserFactory) ;
	UserFactory.$inject = ['$q', '$http', '$window', '$rootScope'] ;

	function UserFactory($q, $http, $window, $rootScope) {
		var o = {} ;

		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + 
					localStorage.getItem("token")
				}
			}
			return auth ;
		} ;

		function setToken(token) {
			localStorage.setItem("token", token) ;
		} ;

		function removeToken() {
			localStorage.removeItem("token") ;
		} ;

		function getToken() {
			return localStorage.token ;
		};

		function isLoggedIn() {
			var token = getToken() ;
			if(token) {
				var payload = JSON.parse(urlBase64Decoder(token.split(".")[1])) ;
				if(payload.exp > Date.now() / 1000) {
					return payload ;
				}
			} else {
				return false ;
			}
		} ;


		o.register = function(user) {
			console.log("DEBUG: UserFactory o.register called.") ;
			var q = $q.defer() ;
			$http.post('/api/user/register', user).success(function(res) {
				// Need to uncomment the following 2 lines so that 
				// the user is logged in on registration
				// o.status.isLoggedIn = true ;
				// o.status.username = user.username ;
				q.resolve() ;
			})  ;
			return q.promise ;
		} ;

		o.login = function(user) {
			console.log("DEBUG: UserFactory o.login called.") ;
			var q = $q.defer() ;
			$http.post('/api/user/login', user).success(function(res) {
				setToken(res.token) ;
				$rootScope._user = isLoggedIn() ;
				q.resolve() ;
			}) ;
			return q.promise ;
		};

		o.logout = function() {
			removeToken() ;
			$rootScope._user = isLoggedIn() ;
		} ;

		function urlBase64Decoder(str) {
			var output = str.replace(/-/g, '+').replace(/_/g, '/') ;

			switch(output.length % 4) {
				case 0: { break; }
				case 2: { output += '=='; break ; }
				case 3: { output += '='; break ; }
				default: 
				throw 'Illegal base64url string'
			}

			return decodeURIComponent(escape($window.atob(output))) ;
		} ;

		$rootScope._user = isLoggedIn() ;
		return o ;
	}
})() ;
