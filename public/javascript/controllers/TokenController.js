(function() {
	'use strict' ;
	angular.module('app')
	.controller('TokenController', TokenController) ;

	TokenController.$inject = ['UserFactory', 'token', '$state', '$rootScope'] ;

	function TokenController(UserFactory, token, $state, $rootScope) {
		var vm = this ;
		console.log("DEBUG: TokenController") ;
		UserFactory.saveToken(token);

		// $state.go('Profile') ;
		// $window.location.reload() ;

		setTimeout(function() {
			$rootScope._user = UserFactory.isLoggedIn() ;
			$state.go('Profile')
		}, 1000)
	}
})() ;