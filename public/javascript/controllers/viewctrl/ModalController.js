(function(){
	angular.module('app')
	.controller('ModalController', ModalController);

	ModalController.$inject = ['$modalInstance'];

	function ModalController($modalInstance){
		var vm = this;

		vm.close = function() {
			$modalInstance.close();
		};
	} 

})()