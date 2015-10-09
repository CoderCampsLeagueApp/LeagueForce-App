(function(){
	angular.module('app')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['UserFactory', '$state', '$stateParams', '$rootScope', 'ProfileFactory'];

	function ProfileController(UserFactory, $state, $stateParams, $rootScope, ProfileFactory){
		var vm = this;

	

		if(!$stateParams.id) {
			$state.go('Profile') ;
		} else {
			UserFactory.getUserLoggedIn($stateParams.id).then(function(res) {
				vm.user = res ;
			}) ;
		}

		// Checks if user is logged in
		if($rootScope._user) {
			console.log("DEBUG: ProfileController: Looking for user") ;
			console.log("DEBUG: $rootScope._user.id = " + $rootScope._user.id) ;
			UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
				vm.userLoggedIn = res ;
			}) ;
		}
		//Edit Profile: picture, bio, name, etc.
		//Full CRUD on Comments and Inbox model
		//Will create the needed models after achieving MVP
		//CRUD for comments and points to profile factory
	} 

})()