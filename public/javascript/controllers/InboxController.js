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
		});

		vm.showMessage = function(inbox){
			delete vm.msg;
			vm.msg = {};
			vm.messageDisplay = true;
			vm.inboxMessage = inbox;
		};

		vm.reply = function(msgId, msg, nav){
			var name = "";
			var pic = "";
			if(vm.inboxMessage.user1._id === nav) {
				name = vm.inboxMessage.user1.name;
				pic = vm.inboxMessage.user1.pic;
			};
			if(vm.inboxMessage.user2._id === nav) {
				name = vm.inboxMessage.user2.name;
				pic = vm.inboxMessage.user2.pic;
			};
			var reply = {
				body: msg,
				id: msgId,
				name: name,
				pic: pic
			};
			InboxFactory.reply(reply).then(function(res){
				var message = res;
				var senderId = message.sender;
				var senderName = message.name;
				var senderPic = message.pic;
				message.sender = {
					id: senderId,
					name: senderName,
					pic: senderPic
				};
				
				vm.inboxMessage.messages.push(res);
				vm.msg.message = "";
			});
		}
	};
})();