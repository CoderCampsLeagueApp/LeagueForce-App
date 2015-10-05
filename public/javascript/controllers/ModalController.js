(function(){
	angular.module('app')
	.controller('ModalController', ModalController);

	ModalController.$inject = ['$state', '$stateParams', 'AdminFactory', 'close'];

	function ModalController($state, $stateParams, AdminFactory, close){
		var vm = this;

		vm.cancelDraft = function(result) {
			close(result, 200);
			$state.go('Admin.home');
		}

	} 
})()