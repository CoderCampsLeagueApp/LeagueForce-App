(function(){
	angular.module('app')
	.controller('WebsiteController', WebsiteController);

	WebsiteController.$inject = ['UserFactory', '$state', '$stateParams', '$rootScope', 'ProfileFactory', 'AdminFactory'];

	function WebsiteController(UserFactory, $state, $stateParams, $rootScope, ProfileFactory, AdminFactory){
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
		
		//-------------------Comments----------------------
		if($stateParams.id) { //if the ID exists here, we go to the factory an
			ProfileFactory.getComment($stateParams.id).then(function(res) {
				vm.comment = res;
			});
		};	

		vm.getComments = function() {
			ProfileFactory.getComments().then(function(res) {
				vm.comment = res;
			})
		};

		vm.getComments();

		

		
	} 

})()