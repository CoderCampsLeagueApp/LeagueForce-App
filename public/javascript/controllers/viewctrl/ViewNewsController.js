(function(){
	angular.module('app')
	.controller('ViewNewsController', ViewNewsController);

	ViewNewsController.$inject = ['UserFactory', '$state', '$stateParams', '$rootScope', 'ProfileFactory', 'WebsiteFactory'];

	function ViewNewsController(UserFactory, $state, $stateParams, $rootScope, ProfileFactory, WebsiteFactory){
		var vm = this;
		vm.newsletter = {};
		vm.replyBox = false;

		if($stateParams.id) {
			WebsiteFactory.getNewsletter($stateParams.id).then(function(res) {
				vm.newsletter = res
			});
		}

		vm.getNewsletters = function() {
			WebsiteFactory.getNewsletters().then(function(res) {
				vm.newsletters = res;
			});
		};

		vm.getNewsletters();
		//-------------------Comments----------------------

		vm.getComments = function() {
			ProfileFactory.getComments().then(function(res) {
				vm.comment = res;
			})
		};

		vm.getComments();

		vm.deleteComment = function(comment, news) {
			ProfileFactory.deleteComment(comment, news).then(function(res) {
				vm.comment.splice(vm.comment.indexOf(comment), 1);
			})
		};

		vm.createComment = function(newsId) {
			var comment = {
				body: vm.comment.body,
				picture: $stateParams.id,
				news: newsId				
			};
			ProfileFactory.createComment(comment).then(function(res) {
				vm.comment.body = " ",
				vm.getComments();
				vm.comment.push(res);
			})
		};

		vm.postReply = function(reply) {
			var reply = {
				body: vm.comment.reply.body,
				picture: $stateParams.id,
				comments: commentId
			};
			ProfileFactory.postReply(reply).then(function(res) {
				vm.comment.reply.body = " ",
				vm.getComments();
				vm.comment.push(res);
			})
		};

		
	} 

})()