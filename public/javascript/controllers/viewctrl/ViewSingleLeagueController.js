(function(){
	angular.module('app')
	.controller('ViewSingleLeagueController', ViewSingleLeagueController);

	ViewSingleLeagueController.$inject = ['$state', '$stateParams', '$window', 'WebsiteFactory','$timeout', '$anchorScroll', '$location'];

	function ViewSingleLeagueController($state, $stateParams, $window, WebsiteFactory, $timeout, $anchorScroll, $location){
		var vm = this;
		vm.leagues = [];
		vm.league = {};
		vm.animation = false;

		//------------Leagues--------------

		if($stateParams.id) {
			WebsiteFactory.getLeague($stateParams.id).then(function(res) {
				vm.league = res;
				var coords = {
						latitude: vm.league.googleLocation.latitude,
						longitude: vm.league.googleLocation.longitude
					};
					vm.league.marker = angular.copy(coords);
					vm.league.coords = coords;
					console.log(vm.league);
			});
		};
		

		vm.getTeam = function(team) {
			WebsiteFactory.getTeam(team).then(function(res) {
				$state.go('TeamPage');
				vm.team = res;
				console.log(res);
			});
			
		}; 
		
	} 

})()