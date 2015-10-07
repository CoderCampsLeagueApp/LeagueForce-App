(function(){
	angular.module('app')
	.controller('PlayerController', PlayerController);

	PlayerController.$inject = ['$state', '$stateParams', '$rootScope', 'LeagueFactory'];

	function PlayerController($state, $stateParams, $rootScope, LeagueFactory){
		var vm = this;
		vm.player = {};
		


	} 

})()