(function(){
	angular.module('app')
	.controller('ViewLeaguesController', ViewLeaguesController);

	ViewLeaguesController.$inject = ['$state', '$stateParams', '$rootScope', 'WebsiteFactory','$timeout'];

	function ViewLeaguesController($state, $stateParams, $rootScope, WebsiteFactory, $timeout){
		var vm = this;
		vm.leagues = [];
		vm.league = {};

		//------------Leagues--------------


		WebsiteFactory.getLeagues().then(function(res) {
			vm.leagues = res;
		});
		


		//------------Teams-----------------
		
	} 

})()