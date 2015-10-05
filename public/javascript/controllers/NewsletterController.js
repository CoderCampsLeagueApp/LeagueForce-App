(function(){
	angular.module('app')
	.controller('NewsletterController', NewsletterController);

	NewsletterController.$inject = ['$state', '$stateParams', '$sce', 'AdminFactory', 'ModalService'];

	function NewsletterController($state, $stateParams, $sce, AdminFactory, ModalService){
		var vm = this;

		//Newsletters adjust doing it for league property
		if($stateParams.id) { //if the ID exists here, we go to the factory and find the specific pictures
			AdminFactory.getNewsletter($stateParams.id).then(function(res) {
				vm.newsletter = res;
			});
		};	

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

		//Strict Contextual Escaping
		//vm.articleBody = $sce.trustAsHTML();

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

		vm.editNewsletter = function(id) {
			vm.edit.id = id;
			AdminFactory.editNewsletter(vm.edit).then(function() {
				vm.edit= "";
				vm.getNewsletters();
			})
		};

		//------------Draft Functionality-------------
		vm.draftRequest = function(draft) {
			vm.newsletter.isPublished = false;
			AdminFactory.postNewsletter(vm.newsletter).then(function(res) {
				$state.go('Admin.draftsmodal')
				//console.log(newsletter);
				delete vm.newsletter;
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

		vm.saveDraft = function(draft) {
			AdminFactory.postNewsletter(vm.newsletter).then(function(res) {
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

		vm.current = function() {
			console.log(vm.newsletter + ' | 2')
		};
	} 

})()