(function(){
	angular.module('app')
	.controller('WebsiteController', WebsiteController);

	WebsiteController.$inject = ['UserFactory', '$state', '$stateParams', '$rootScope', 'ProfileFactory', 'WebsiteFactory'];

	function WebsiteController(UserFactory, $state, $stateParams, $rootScope, ProfileFactory, WebsiteFactory){
		var vm = this;
		vm.newsletter = {};
		
		vm.getNewsletters = function() {
			WebsiteFactory.getNewsletters().then(function(res) {
				vm.newsletters = res;
			});
		};

		vm.getNewsletters();


		
	} 

})()