(function(){
	angular.module('app')
	.controller('TeamController', TeamController);

	TeamController.$inject = ['$state', '$stateParams', '$rootScope', 'LeagueFactory'];

	function TeamController($state, $stateParams, $rootScope, LeagueFactory){
		var vm = this;
		vm.team = {};
		
		if($stateParams.id) { 
			LeagueFactory.getTeam($stateParams.id).then(function(res) {
				vm.team = res;
				vm.oldTeam = angular.copy(res);
			});
		};

		//----------Tean CRUD------------
		vm.createTeam = function(team) {
			LeagueFactory.createTeam(vm.team).then(function(res) {
				vm.getTeams();
				delete vm.team
			})
		};

		vm.getTeams = function() {
			LeagueFactory.getTeams().then(function(res) {
				vm.teams = res;
			});
		};

		vm.getTeams();

		vm.editTeam = function(team) {
			LeagueFactory.editTeam(vm.oldTeam, vm.team).then(function(res) {
				vm.getTeams();
			});
		};

		vm.deleteTeam = function(team) {
			LeagueFactory.deleteTeam(team).then(function(res) {
				vm.teams.splice(vm.teams.indexOf(team), 1);
			});
		};
	} 

})()