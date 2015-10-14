(function(){
	angular.module('app')
	.controller('ViewLeaguesController', ViewLeaguesController);

	ViewLeaguesController.$inject = ['$state', '$stateParams', '$rootScope', 'WebsiteFactory','$timeout'];

	function ViewLeaguesController($state, $stateParams, $rootScope, WebsiteFactory, $timeout){
		var vm = this;
		vm.leagues = [];
		vm.league = {};

		//------------Leagues--------------
		vm.getLeague = function() {
			if($stateParams.id) {
				WebsiteFactory.getLeague($stateParams.id).then(function(res) {
					vm.league = res;
					console.log(res);
				});
			}
		}; 
		$timeout( function(){ vm.getLeague(); }, 10);


		vm.getLeagues = function() {
			WebsiteFactory.getLeagues().then(function(res) {
				vm.leagues = res;
			});
		};

		vm.getLeagues();

		//------------Teams-----------------
		vm.getTeam = function() {
			if($stateParams.id) {
				WebsiteFactory.getTeam($stateParams.id).then(function(res) {
					vm.team = res;
					console.log(res);
				});
			}
		}; 
		$timeout( function(){ vm.getTeam(); }, 10);
		
	} 

})()