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
			delete vm.msg;
			vm.msg = {};
			vm.messageDisplay = true;
			vm.inboxMessage = inbox;
		};

		vm.reply = function(msgId, msg){
			var reply = {
				body: msg,
				id: msgId
			};
			InboxFactory.reply(reply).then(function(res){
				vm.inboxMessage.messages.push(res);
				vm.msg.message = "";
			});
		}
	};
})();