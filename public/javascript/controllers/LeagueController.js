(function() {
	'use strict';
	angular.module('app')
	.controller('LeagueController', LeagueController);


	LeagueController.$inject = ['$state', '$stateParams', '$rootScope', 'LeagueFactory'];

	function LeagueController($state, $stateParams, $rootScope, LeagueFactory) {
		var vm = this;
		
	}

})();