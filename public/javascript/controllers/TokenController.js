(function() {
	'use strict' ;
	angular.module('app')
	.controller('TokenController', TokenController) ;

	TokenController.$inject = ['UserFactory', 'token', '$state', '$rootScope', '$window'] ;

	function TokenController(UserFactory, token, $state, $rootScope, $window) {
		var vm = this ;
		console.log("DEBUG: TokenController") ;
		UserFactory.saveToken(token);

		// $state.go('Profile') ;
		// $window.location.reload() ;

		setTimeout(function() {
			// $rootScope._user = UserFactory.isLoggedIn() ;
			if(!$rootScope._user) {
				$window.location.reload() ;
			}
			$state.go('Profile')
		}, 1000)
	}
})() ;