(function() {
	'use strict';
	angular.module('app')
	.controller('AdminController', AdminController);


	AdminController.$inject = ['$state', '$stateParams', '$rootScope', 'LeagueFactory'];

	function AdminController() {
		var vm = this;
		vm.title = 'Welcome to our App!';
		vm.leagueSize = [0];
		vm.team = [];
		vm.team.coach = [];
		vm.team.player = [];

		//teams on the league
		vm.formSize = function(size){  
			console.log(size);
			vm.leagueSize = [0];
			for(var i = 1; i < size;i++){
				vm.leagueSize.push(i);
				console.log(i);
			}
		};
		vm.addTeam = function(team){
			console.log(team);
		};
		vm.addCoach = function(coach){
			console.log(coach);
			vm.team.coach.push(coach);
		};
		vm.addPlayer = function(player){
			console.log(player);
			vm.team.player.push(player);
		};

	};
})();