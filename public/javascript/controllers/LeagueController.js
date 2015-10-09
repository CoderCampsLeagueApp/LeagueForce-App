(function() {
	'use strict';
	angular.module('app')
	.controller('LeagueController', LeagueController);


	LeagueController.$inject = ['$state', '$stateParams', '$rootScope', 'AdminFactory', 'LeagueFactory'];

	function LeagueController($state, $stateParams, $rootScope, AdminFactory, LeagueFactory) {
		var vm = this;
		
		vm.league = {};

	}

})();