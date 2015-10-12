(function(){
	angular.module('app')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['UserFactory', '$state', '$stateParams', '$rootScope', 'ProfileFactory', '$uibModal'];

	function ProfileController(UserFactory, $state, $stateParams, $rootScope, ProfileFactory, $modal){
		var vm = this;
		


		vm.editpic = function(user){
			var picmodal = $modal.open({
			templateUrl: "/views/modalviews/profilepic_upload.html",
			size: "md",
			animation: true,
			controller: 'UploadController',
			controllerAs: "uc",
			backdrop: 'static',
			resolve: {
				user: function () { return user }
			}
			});
			picmodal.result.then(function(res){
				console.log('closed');
				vm.userLoggedIn.pic = res;
		});
		};
		
		


		// Checks if user is logged in
		if($rootScope._user) {
			console.log("DEBUG: ProfileController: Looking for user") ;
			console.log("DEBUG: $rootScope._user.id = " + $rootScope._user.id) ;
			UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
				vm.prof = res;
			}) ;
		}

		//Edit Profile: picture, bio, name, etc.

		vm.editProfile = function() {
			vm.user._id = vm.userLoggedIn._id; 
			UserFactory.editProfile(vm.user).then(function(res){
				console.log(res);
				vm.userLoggedIn = res;
				$state.go('Profile');
			})
			
		};
		//Full CRUD on Comments and Inbox model
		//Will create the needed models after achieving MVP
		//CRUD for comments and points to profile factory
	} 

})() ;
