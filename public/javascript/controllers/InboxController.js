(function() {
	'use strict';
	angular.module('app')
	.controller('InboxController', InboxController);

	InboxController.$inject = ['InboxFactory', '$state', "$stateParams", '$rootScope'];

	function InboxController(InboxFactory, $state, $stateParams, $rootScope) {
		var vm = this;

		vm.messageDisplay = false;
		vm.msg = {};
		
		InboxFactory.getMessages($stateParams.id).then(function(res){
			vm.inbox  = res;
			console.log('All messages retrieved');
		});

		vm.showMessage = function(inbox){
			vm.messageDisplay = true;
			vm.inboxMessage = inbox;
		};
	
		vm.reply = function(){
			InboxFactory.reply(vm.msg).then(function(res){
				vm.inboxMessage.messages.push(res);
				vm.msg.message = "";
			});
		}
};
})();