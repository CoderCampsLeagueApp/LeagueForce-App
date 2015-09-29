(function(){
	angular.module('app')
	.controller('NavController', NavController);

	NavController.$inject = ['$state', '$stateParams', '$rootScope', 'UserFactory'];

	function NavController($state, $stateParams, $rootScope, UserFactory){
		var vm = this;
		
	} 

})()