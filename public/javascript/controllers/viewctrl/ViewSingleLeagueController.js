(function(){
	angular.module('app')
	.controller('ViewSingleLeagueController', ViewSingleLeagueController);

	ViewSingleLeagueController.$inject = ['$state', '$stateParams', '$rootScope', 'WebsiteFactory','$timeout'];

	function ViewSingleLeagueController($state, $stateParams, $rootScope, WebsiteFactory, $timeout){
		var vm = this;
		vm.leagues = [];
		vm.league = {};

		//------------Leagues--------------

		if($stateParams.id) {
			WebsiteFactory.getLeague($stateParams.id).then(function(res) {
				vm.league = res;
				console.log(res);
			});
		}
		
		//$timeout( function(){ vm.getLeague(); }, 10);

		vm.getTeam = function(team) {
			WebsiteFactory.getTeam(team).then(function(res) {
				$state.go('TeamPage');
				vm.team = res;
				console.log(res);
			});
			
		}; 
		//$timeout( function(){ vm.getTeam(); }, 10);
		
	} 

})()