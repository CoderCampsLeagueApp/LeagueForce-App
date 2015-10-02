(function() {
	'use strict';
	angular.module('app')
	.controller('LeagueController', LeagueController);


	LeagueController.$inject = ['$state', '$stateParams', '$rootScope', 'AdminFactory'];

	function LeagueController($state, $stateParams, $rootScope, LeagueFactory) {
		var vm = this;
		vm.title = 'Welcome to our App!';
	};
})();