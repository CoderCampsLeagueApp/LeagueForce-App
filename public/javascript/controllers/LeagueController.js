(function() {
	'use strict';
	angular.module('app')
	.controller('LeagueController', LeagueController);


	LeagueController.$inject = ['$state', '$stateParams', '$rootScope', 'AdminFactory', 'LeagueFactory'];

	function LeagueController($state, $stateParams, $rootScope, AdminFactory, LeagueFactory) {
		var vm = this;
		vm.league = {};

		// if($stateParams.id) { //if the ID exists here, we go to the factory and find the specific League
		// 	LeagueFactory.getLeague($stateParams.id).then(function(res) {
		// 		vm.league = res;
		// 		vm.oldLeague = angular.copy(res);
		// 	});
		// };

		// //----------League CRUD----------
		// vm.createLeague = function(league) {
		// 	//	vm.league.admin = $rootScope._user.id ------ for specific admin logged in
		// 	LeagueFactory.createLeague(vm.league).then(function(res) {
		// 		vm.getLeagues();
		// 		delete vm.league;
		// 	});
		// };

		// vm.getLeagues = function() {
		// 	LeagueFactory.getLeagues().then(function(res) {
		// 		vm.leagues = res;
		// 	});
		// };

		// vm.getLeagues();

		// vm.editLeague = function(league) {
		// 	LeagueFactory.editLeague(vm.oldLeague, vm.league).then(function() {
		// 		vm.getLeagues();
		// 	})
		// }

		// vm.deleteLeague = function(league) {
		// 	LeagueFactory.deleteLeague(league).then(function(res) {
		// 		vm.leagues.splice(vm.leagues.indexOf(league), 1);
		// 	});
		// };

	}

})();