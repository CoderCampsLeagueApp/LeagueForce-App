(function(){
	angular.module('app')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['UserFactory', '$state', '$stateParams', '$rootScope', 'ProfileFactory', '$uibModal'];

	function ProfileController(UserFactory, $state, $stateParams, $rootScope, ProfileFactory, $modal){
		var vm = this;
		


		vm.editpic = function(user){
			var picmodal = $modal.open({
				templateUrl: "/templates/modalviews/profilepic_upload.html",
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
				vm.prof.pic = res;
			});
		};
		vm.unsubscribe = function(league, idx){
			ProfileFactory.unsubscribe(league).then(function(res){
				vm.prof.leagueSubscribed.splice(idx, 1);
			})
		}
		
		


		// Checks if user is logged in
		if($rootScope._user) {
			UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
				vm.prof = res;
			}) ;
		}

		//Edit Profile: picture, bio, name, etc.

		vm.editProfile = function(profile) {
			UserFactory.editProfile(vm.prof).then(function(res){
				vm.prof = res;
				$state.go('ViewProfile', {'id': $rootScope._user.id });
			})
			
		};

		//Full CRUD on Comments and Inbox model
		//Will create the needed models after achieving MVP
		//CRUD for comments and points to profile factory
	} 

})() ;
