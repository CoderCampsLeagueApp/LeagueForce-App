(function() {
	'use strict';
	angular.module('app')
	.controller('LeagueController', LeagueController);

	LeagueController.$inject = ['$state', '$stateParams', '$rootScope', 'LeagueFactory'];

	function LeagueController($state, $stateParams, $rootScope, LeagueFactory) {
		var vm = this;
		vm.league = {};
		//vm.adminLoggedIn = $rootScope._user;

		/* Steps for League Creation:
		1. League
		2. Team
		3. Players
		*/
		//Includes full CRUD

		if($stateParams.id) { //if the ID exists here, we go to the factory and find the specific pictures
			LeagueFactory.getLeague($stateParams.id).then(function(res) {
				vm.league = res;
				vm.oldLeague = angular.copy(res);
			});
		};

		if($rootScope._user) {
			LeagueFactory.getAdminLoggedIn($rootScope._user.id).then(function(res) {
				vm.adminLoggedIn = res;
			})
		}

		//----------League CRUD----------
		vm.createLeague = function(league) {
			//	vm.league.admin = $rootScope._user.id ------ for specific admin logged in
			LeagueFactory.createLeague(vm.league).then(function(res) {
				vm.getLeagues();
				delete vm.league;
			});
		};

		vm.getLeagues = function() {
			LeagueFactory.getLeagues().then(function(res) {
				vm.leagues = res;
			});
		};

		vm.getLeagues();

		vm.editLeague = function(league) {
			LeagueFactory.editLeague(vm.oldLeague, vm.league).then(function() {
				vm.getLeagues();
			})
		}

		vm.deleteLeague = function(league) {
			LeagueFactory.deleteLeague(league).then(function(res) {
				vm.leagues.splice(vm.leagues.indexOf(league), 1);
			});
		};

	}
})();