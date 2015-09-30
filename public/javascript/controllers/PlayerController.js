(function(){
	angular.module('app')
	.controller('PlayerController', PlayerController);

	PlayerController.$inject = ['$state', '$stateParams', '$rootScope', 'LeagueFactory'];

	function PlayerController($state, $stateParams, $rootScope, LeagueFactory){
		var vm = this;
		vm.player = {};
		
		if($stateParams.id) { 
			LeagueFactory.getPlayer($stateParams.id).then(function(res) {
				vm.player = res;
				vm.oldPlayer = angular.copy(res);
			});
		};

		//----------Player CRUD------------
		vm.createPlayer = function(player) {
			LeagueFactory.createPlayer(vm.player).then(function(res) {
				vm.getPlayers();
				delete vm.player
			})
		};

		vm.getPlayers = function() {
			LeagueFactory.getPlayers().then(function(res) {
				vm.players = res;
			});
		};

		vm.getPlayers();

		vm.editPlayer = function(player) {
			LeagueFactory.editPlayer(vm.oldPlayer, vm.player).then(function(res) {
				vm.getPlayers();
			});
		};

		vm.deletePlayer = function(player) {
			LeagueFactory.deletePlayer(player).then(function(res) {
				vm.players.splice(vm.players.indexOf(player), 1);
			});
		};



	} 

})()