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

		vm.getNewsletters = function() {
			AdminFactory.getNewsletters().then(function(res) {
				vm.newsletters = res;
			});
		};

		vm.getNewsletters();

		//work on removing the above

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

		vm.deleteComment = function(comment) {
			ProfileFactory.deleteComment(comment).then(function(res) {
				vm.comment.splice(vm.comment.indexOf(comment), 1);
			})
		};

		vm.createComment = function() {
			var comment = {
				body: vm.comment.body,
				picture: $stateParams.id,
				username: vm.userLoggedIn
			};
			ProfileFactory.createComment(comment).then(function(res) {
				console.log(res);
				console.log(vm.comment)
				vm.comment.body = " ",
				vm.getComments();
				vm.comment.push(res);
			})
		}

		
	} 

})()