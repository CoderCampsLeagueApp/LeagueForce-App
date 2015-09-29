(function(){
	angular.module('app')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$state', '$stateParams', '$rootScope', 'ProfileFactory'];

	function ProfileController($state, $stateParams, $rootScope, ProfileFactory){
		var vm = this;
		//Edit Profile: picture, bio, name, etc.
		//Full CRUD on Comments and Inbox model
		//Will create the needed models after achieving MVP

	} 

})()