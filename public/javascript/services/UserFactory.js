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
		};

		function setToken(token) {
			localStorage.setItem("token", token) ;
		} ;

		function removeToken() {
			localStorage.removeItem("token") ;
		};

		function getToken() {
			return localStorage.token ;
		};

		o.isLoggedIn = function() {
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
			var q = $q.defer() ;
			$http.post('/api/user/login', user).success(function(res) {
				setToken(res.token) ;

				// Following only happens when user has registered 
				// but not verified.
				if(!res.token) {
					// Put in a message for the user saying that you are not
					// verified
					q.resolve(res) ;
					localStorage.removeItem("token") ;
					return ;

				}

				$rootScope._user = o.isLoggedIn() ;
				q.resolve() ;
			}) ;
			return q.promise ;
		};

		o.logout = function() {
			removeToken() ;
			$rootScope._user = o.isLoggedIn() ;
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

		o.getUserLoggedIn = function(id) {
			var q = $q.defer() ;
			$http.get('/api/user/' + id).success(function(res) {
				q.resolve(res) ;
			});
			return q.promise ;

		}

		o.saveToken = function(token) {
			console.log("DEBUG: UserFactory saveToken called") ;
			window.localStorage.setItem("token", token) ;
		}


		o.editProfile = function(edit) {
			console.log(edit);
			var q = $q.defer();
			$http.put('/api/user/' + edit._id, edit).success(
				function(res) {
					q.resolve(res);
				})
			return q.promise;
		}
		

		$rootScope._user = o.isLoggedIn() ;
		return o ;
	}
})() ;
