(function(){
	angular.module('app')
	.controller('TeamController', TeamController);

	TeamController.$inject = ['$state', '$stateParams', '$rootScope', 'LeagueFactory'];

	function TeamController($state, $stateParams, $rootScope, LeagueFactory){
		var vm = this;
		//CRUD on Team and Player models

	} 

})()