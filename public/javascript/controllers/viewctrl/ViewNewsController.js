(function(){
	angular.module('app')
	.controller('ViewNewsController', ViewNewsController);

	ViewNewsController.$inject = ['$state', '$stateParams', '$rootScope', '$timeout', 'ProfileFactory', 'WebsiteFactory'];

	function ViewNewsController($state, $stateParams, $rootScope, $timeout, ProfileFactory, WebsiteFactory){
		var vm = this;
		vm.newsletter = {};
		vm.replyBox = false;
		vm.commentEdit = false;
		

		vm.getNews = function() {
			
			if($stateParams.id) {
				WebsiteFactory.getNewsletter($stateParams.id).then(function(res) {
					vm.newsletter = res;
					WebsiteFactory.getComments($stateParams.id).then(function(res) {
						console.log(res)
						vm.comments = res;
					})
				});
			}
		};

		$timeout( function(){ vm.getNews(); }, 10);

		vm.getNewsletters = function() {
			WebsiteFactory.getNewsletters().then(function(res) {
				vm.newsletters = res;
			});
		};

		vm.getNewsletters();


		//-------------------Comments----------------------

		vm.deleteComment = function(comment, news) {
			ProfileFactory.deleteComment(comment, news).then(function(res) {
				vm.comments.splice(vm.comments.indexOf(comment), 1);
				vm.getNews();
			})
		};

		vm.createComment = function(newsId) {
			var comment = {
				body: vm.comment.body,
				news: newsId				
			};
			ProfileFactory.createComment(comment).then(function(res) {
				vm.comment.body = " ";
				vm.getNews();
			})
		};

		vm.postReply = function(commentId) {
			var reply = {
				body: vm.comment.reply.body,
				comment: commentId
			};
			ProfileFactory.postReply(reply).then(function(res) {
				vm.comment.reply.body = " ";
				vm.getNews();
				
			})
		};

		
	} 

})()