(function(){
	angular.module('app')
	.controller('NavController', NavController);


	NavController.$inject = ['$state', '$stateParams', '$rootScope', 'UserFactory', '$scope', 'Upload', '$timeout', '$interval','$window'];

	function NavController($state, $stateParams, $rootScope, UserFactory, $scope, Upload, $timeout, $interval, $window){
		var vm = this;
		vm.user = {} ;

		vm.status = $rootScope._user;
		vm.noPic = "http://education.mnhs.org/immigration/sites/education.mnhs.org.immigration/files/imagecache/Full_800x800/MaleSilhouette.png";
  		vm.noLogo = "https://d1luk0418egahw.cloudfront.net/static/images/guide/NoImage_592x444.jpg";

		vm.form = true;




	


vm.register = function() {
	console.log("DEBUG: NavController vm.register called.") ;
	UserFactory.register(vm.user).then(function() {
		vm.user = {} ;
		vm.form = false;
	}) ;
} ;

vm.login = function() {

	console.log("DEBUG: NavController vm.login called.") ;
	UserFactory.login(vm.user).then(function(res) {
		if(res) {
			console.log(res) ;
			vm.confirm = res ;
		} else {
			vm.status = $rootScope._user ;
			$state.go('Profile') ;
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

} ;

})() ;
