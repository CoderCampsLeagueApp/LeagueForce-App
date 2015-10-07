(function(){
	angular.module('app')
	.controller('NewsletterController', NewsletterController);

	NewsletterController.$inject = ['$state', '$stateParams', 'AdminFactory', 'ModalService', 'ProfileFactory'];

	function NewsletterController($state, $stateParams, AdminFactory, ModalService, ProfileFactory){
		var vm = this;
		vm.uiRouterState = $state;

		if($stateParams.id) { 
			AdminFactory.getNewsletter($stateParams.id).then(function(res) {
				vm.newsletter = res;
				vm.oldNewsletter = angular.copy(res);
			});
		};	

		vm.editNewsletter = function(newsletter) {
			vm.oldNewsletter.isPublished = true;
			AdminFactory.editNewsletter(vm.newsletter, vm.oldNewsletter).then(function(res) {
				vm.getNewsletters();
				console.log(vm.oldNewsletter);
				//delete vm.newsletter;
				$state.go('Newsletter');
			});
		}; 

		vm.toEditPage = function() {
			vm.newsletter = res;
			vm.oldNewsletter = angular.copy(res);	
			$state.go('Admin.editnewsletter');
		}

		vm.postNewsletter = function(newsletter) {
			vm.newsletter.created = new Date();
			vm.newsletter.isPublished = true;
			AdminFactory.postNewsletter(vm.newsletter).then(function(res) {
				vm.getNewsletters();
				console.log(vm.newsletter);
				delete vm.newsletter;
				$state.go('Newsletter');
			});
		};


		vm.getNewsletters = function() {
			AdminFactory.getNewsletters().then(function(res) {
				vm.newsletters = res;
			});
		};

		vm.getNewsletters();

		vm.deleteNewsletter = function(newsletter) {
			AdminFactory.deleteNewsletter(newsletter).then(function(res) {
				vm.newsletters.splice(vm.newsletters.indexOf(newsletter), 1);
				console.log(newsletter);
			});
		};

		//------------Draft Functionality-------------
		vm.draftRequest = function(draft) {
			vm.newsletter.isPublished = false;
			AdminFactory.postNewsletter(vm.newsletter).then(function(res) {				
				//console.log(newsletter);
				delete vm.newsletter;
				$state.go('Admin.draftsmodal')
			});
		};

		vm.exampleModal = function(){
			ModalService.showModal({
				templateUrl: '../admin_views/drafts_modal.html',
				controller: 'ModalController'
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					console.log(result);	
				})
			});
		};

		vm.saveDraft = function(newsletter) {
			vm.newsletter.isPublished = false;
			AdminFactory.postNewsletter(vm.newsletter).then(function(res) {
				vm.getNewsletters();
				delete vm.newsletter;
				$state.go('Admin.home')
			});
		};

		vm.cancelDraft = function() {
			delete vm.newsletter;
			vm.newsletter = "";
			vm.newsletter = {};
			$state.go('Admin.home');
			console.log(vm.newsletter);
			console.log(newsletter);
		};

		
		//-------------------Comments----------------------
		if($stateParams.id) { //if the ID exists here, we go to the factory an
			ProfileFactory.getComment($stateParams.id).then(function(res) {
				vm.comment = res;
			});
		};	

		vm.getComments = function() {
			ProfileFactory.getComments().then(function(res) {
				vm.comment = res;
			})
		};

		vm.getComments();

		vm.deleteComment = function(comment) {
			ProfileFactory.deleteComment(comment).then(function(res) {
				vm.comment.splice(vm.comment.indexOf(comment), 1);
			})
		};

		vm.editComment = function(id) {
			vm.edit.id = id;
			console.log(vm.edit);
			ProfileFactory.editComment(vm.edit).then(function(res) {
				vm.edit = "";
				vm.getComments();
			});
		};

		vm.createComment = function() {
			var comment = {
				body: vm.comment.body,
				picture: $stateParams.id,
				addedBy: vm.loggedInUser
			};
			ProfileFactory.createComment(comment).then(function(res) {
				vm.comment.body = " ",
				vm.getComments();
				console.log(res);
				vm.comment.push(res);
				console.log(vm.comment)
			})
		}

	} 

})()