(function(){
	angular.module('app')
	.controller('NavController', NavController);


	NavController.$inject = ['$state', '$stateParams', '$rootScope', 'UserFactory', '$scope', 'Upload', '$timeout', '$interval','$window'];

	function NavController($state, $stateParams, $rootScope, UserFactory, $scope, Upload, $timeout, $interval, $window){
		var vm = this;
		vm.user = {} ;
		vm.status = $rootScope._user ;
		vm.def = "https://d1luk0418egahw.cloudfront.net/static/images/guide/NoImage_592x444.jpg";
		vm.form2 = false;



		$scope.upload = function(dataUrl) {
		// 	console.log(dataUrl);
		
		// Upload.upload({
  //           url: '/api/user/profilePicUpload',
  //           data: {
  //               file: Upload.dataUrltoBlob(dataUrl)
  //           },
  //       })
  //   	.then(function (response) {
  //           $timeout(function () {
  //               $scope.result = response.data;
  //           });
  //       }, function (response) {
  //           if (response.status > 0) $scope.errorMsg = response.status 
  //               + ': ' + response.data;
  //           console.log($scope.errorMsg);
  //       }, function (evt) {
  //       	$scope.picFile = null;
  //       	$scope.progress = 0;
  //       	var interv = $interval(function(){
  //   			if ($scope.progress ==100){
  //     				$interval.cancel(interv);
  //   				}
  //   			else{ $scope.progress += 1 }
  // 				}, 30);
  //       		$scope.picSubmitted = true;
  //       	});
            
        };
		

		vm.register = function() {
			console.log("DEBUG: NavController vm.register called.") ;
			UserFactory.register(vm.user).then(function() {
				vm.user = {} ;
				$state.go('Home') ;
			}) ;
		} ;

		vm.login = function() {
			console.log("DEBUG: NavController vm.login called.") ;
			UserFactory.login(vm.user).then(function(res) {
				if(res){
					console.log(res);
					vm.confirm = res;
				}else{
					vm.status = $rootScope._user;
					$state.go('Home');
				}
			}) ;
		} ;

		vm.logout = function() {
			UserFactory.logout() ;
			vm.status = $rootScope._user;
			//delete vm.user;
			$window.location.reload();
			$state.go('Home');
		} ;

	} ;

})() ;
