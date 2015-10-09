(function(){
	angular.module('app')
	.controller('ViewLeaguesController', ViewLeaguesController);

	ViewLeaguesController.$inject = ['UserFactory', '$state', '$stateParams', '$rootScope', 'ProfileFactory', 'AdminFactory'];

	function ViewLeaguesController(UserFactory, $state, $stateParams, $rootScope, ProfileFactory, AdminFactory){
		var vm = this;
		vm.newsletter = {};

		if($stateParams.id) {
			UserFactory.getUserLoggedIn($stateParams.id).then(function(res) {
				vm.user = res;
			});
		}

		// Checks if user is logged in
		if($rootScope._user) {
			console.log("DEBUG: ProfileController: Looking for user") ;
			console.log("DEBUG: $rootScope._user.id = " + $rootScope._user.id) ;
			UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
				vm.userLoggedIn = res ;
			}) ;
		}

		
	} 

})()