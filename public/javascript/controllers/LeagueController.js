(function() {
	'use strict';
	angular.module('app')
	.controller('LeagueController', LeagueController);

	LeagueController.$inject = ['$state', '$stateParams', '$rootScope', 'LeagueFactory'];

	function LeagueController($state, $stateParams, $rootScope, LeagueFactory) {
		var vm = this;
		/* Steps for League Creation:
		1. League
		2. Team
		3. Players
		*/
		//Includes full CRUD
	}
})();