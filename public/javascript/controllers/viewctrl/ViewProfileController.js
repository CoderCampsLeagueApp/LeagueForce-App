(function(){
	angular.module('app')
	.controller('ViewProfileController', ViewProfileController);

	ViewProfileController.$inject = ['InboxFactory', '$state', '$stateParams', '$rootScope', 'ProfileFactory', '$uibModal', '$scope'];

	function ViewProfileController(InboxFactory, $state, $stateParams, $rootScope, ProfileFactory, $modal, $scope){
	
		if($stateParams){
		ProfileFactory.getProfile($stateParams.id).then(function(res){
			$scope.profile = res;
			console.log($scope.profile);

		});
		
		}
		else $state.go('home');

		$scope.openSendMessage = function(){
			var msg = $modal.open({
			template: "<div class='msgModal'><span>Message To:{{profile.name}}</span><textarea class='form-control' ng-model='inbox.messages.body'></textarea><br><button class='btn btn-success btn-block' ng-click='sendMessage(inbox)'>Send</button><div>",
			size: "md",
			animation: true,
			scope: $scope
			});
			msg.result.then(function(res){
				console.log('closed');
		});
		};


		$scope.sendMessage = function(inbox){
			inbox.user2 = $scope.profile._id;
			InboxFactory.sendMessage(inbox).then(function(res){
				 
			});
		};

	} 

})()