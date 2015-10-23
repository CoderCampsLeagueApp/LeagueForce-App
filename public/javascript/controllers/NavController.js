(function(){
	angular.module('app')
	.controller('NavController', NavController);


	NavController.$inject = ['$state', '$stateParams', '$rootScope', 'UserFactory', '$scope', 'Upload', '$timeout', '$interval','$window'];

	function NavController($state, $stateParams, $rootScope, UserFactory, $scope, Upload, $timeout, $interval, $window){
		var vm = this;
		vm.user = {} ;
		vm.dropdown = false;

		vm.status = $rootScope._user;
		vm.noPic = "http://education.mnhs.org/immigration/sites/education.mnhs.org.immigration/files/imagecache/Full_800x800/MaleSilhouette.png";
  		vm.noLogo = "https://d1luk0418egahw.cloudfront.net/static/images/guide/NoImage_592x444.jpg";

		vm.form = true;




	


	vm.register = function() {
		UserFactory.register(vm.user).then(function() {
			vm.user = {} ;
			vm.form = false;
		}) ;
	} ;

	vm.login = function() {
		UserFactory.login(vm.user).then(function(res) {
			if(res) {
				vm.confirm = res ;
			} else {
				vm.status = $rootScope._user;
				$state.go('Profile');
				vm.check();
			}
		}) ;
	} ;



	vm.logout = function() {
		UserFactory.logout() ;
		vm.status = $rootScope._user;
		//delete vm.user;
		$window.location.reload();
		vm.check();
		$state.go('Home');
	} ;



	vm.forgot = function() {
		UserFactory.forgot(vm.user).then(function() {
			$state.go('Login') ;
		}) ;
	} ;

	vm.resetPassword = function() {
		vm.user.id = $stateParams.id ;
		UserFactory.resetPassword(vm.user).then(function(res) {
			$state.go('Home') ;
		}) ;
		
	} ;
	vm.check = function(){
		var check = $timeout(function(){ 
			if($rootScope._user){
				UserFactory.checkAdmin($rootScope._user).then(function(res){
					if(res){
						vm.admin = true;
					}
				});
				};
		 }, 20);
	}; 
	vm.check();

} ;

})() ;
