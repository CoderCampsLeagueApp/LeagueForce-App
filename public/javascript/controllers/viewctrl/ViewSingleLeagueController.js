(function(){
	angular.module('app')
	.controller('ViewSingleLeagueController', ViewSingleLeagueController);

	ViewSingleLeagueController.$inject = ['$state', '$stateParams', '$timeout', 'WebsiteFactory','$timeout', '$anchorScroll', '$location', '$rootScope', 'UserFactory'];

	function ViewSingleLeagueController($state, $stateParams, $timeout, WebsiteFactory, $timeout, $anchorScroll, $location, $rootScope, UserFactory){
		var vm = this;
		vm.leagues = [];
		vm.league = {};
		vm.map = false;

		//------------Leagues--------------

		if($stateParams.id) {
			WebsiteFactory.getLeague($stateParams.id).then(function(res) {
				vm.league = res;
				if(!vm.league.background){
					vm.league.background = 'http://res.cloudinary.com/josemedina760/image/upload/v1445490673/leaguebg_yweyf1.jpg';
				}
				var coords = {
						latitude: vm.league.googleLocation.latitude,
						longitude: vm.league.googleLocation.longitude
					};
					vm.league.marker = angular.copy(coords);
					vm.league.coords = coords;
					UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res){
						var map = $timeout(function(){ 
							vm.map = true;
						 }, 800); 
						if(res.leagueSubscribed.length != 0){
						for(var i = 0; i < res.leagueSubscribed.length; i++){
							if(res.leagueSubscribed[i]._id === vm.league._id){
								vm.subs = false;
								vm.subbed = true;
							}else if($rootScope._user){vm.subs = true};
						};
					}else if($rootScope._user){vm.subs = true};
				});
			});
		};

		vm.subscribe = function(leagueid){
			var subscriber = {
				league: leagueid,
				user: $rootScope._user.id
			};
			WebsiteFactory.subscribe(subscriber).then(function(res){
				vm.subs = false;
				vm.subbed = true;
			});
		};
		

		vm.getTeam = function(team) {
			WebsiteFactory.getTeam(team).then(function(res) {
				$state.go('TeamPage');
				vm.team = res;
			});
			
		}; 
		
	} 

})()