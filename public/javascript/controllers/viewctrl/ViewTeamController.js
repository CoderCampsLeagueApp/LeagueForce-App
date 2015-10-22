(function(){
	angular.module('app')
	.controller('ViewTeamController', ViewTeamController);

	ViewTeamController.$inject = ['$state', '$stateParams', 'WebsiteFactory', '$location', '$anchorScroll', '$timeout'];

	function ViewTeamController($state, $stateParams, WebsiteFactory, $location, $anchorScroll, $timeout){
		var vm = this;
		vm.animation = false;
		vm.leagues = [];
		vm.league = {};
		vm.schedule = [];
		vm.schedule.t1 = {};
		vm.schedule.t2 = {};
		vm.currentMatch = {};

		//------------Leagues--------------
		//Brings back the single team id and loops through the weeks in the league to bring back the matches only THAT
		//team will play in. Also brings back the whole team object by looping through the league that was brought earlier
		if($stateParams.id) {
			WebsiteFactory.getTeam($stateParams.id).then(function(res) {
				vm.team = res;
				WebsiteFactory.getLeague(vm.team.league).then(function(res) {
					vm.league = res;
					for(var i = 0; i < vm.league.weeks.length; i++) {
						for (var j = 0; j < vm.league.weeks[i].matches.length; j++) {
							if(vm.league.weeks[i].matches[j].team1 === vm.team._id) {
								vm.schedule.push(vm.league.weeks[i].matches[j]);
							};
							if(vm.league.weeks[i].matches[j].team2 === vm.team._id) {
								vm.schedule.push(vm.league.weeks[i].matches[j]);
							};
						};
					};

					for(var i = 0; i < vm.schedule.length; i++) {
							vm.schedule[i].t1 = {};
							vm.schedule[i].t2 = {};
						for(var j = 0; j < vm.league.teams.length; j++) {
							if(vm.schedule[i].team1 === vm.league.teams[j]._id) {
								vm.schedule[i].t1.name = vm.league.teams[j].name;
								vm.schedule[i].t1.logo = vm.league.teams[j].logo;
							};
							if(vm.schedule[i].team2 === vm.league.teams[j]._id) {
								vm.schedule[i].t2.name = vm.league.teams[j].name;	
								vm.schedule[i].t2.logo = vm.league.teams[j].logo;	
							};
						};
					};
					vm.currentMatch = vm.schedule[0];
					var coords = {
						latitude: vm.schedule[0].googleLocation.latitude,
						longitude: vm.schedule[0].googleLocation.longitude
					};
					vm.currentMatch.marker = angular.copy(coords);
					vm.currentMatch.coords = coords;
					vm.currentMatch.index = 0;
					vm.map = true;
				});
			});
		};

		vm.showMatch = function(idx){
			vm.map = false;
			if(!vm.animation){
				vm.animation = true;
			}
			vm.currentMatch = vm.schedule[idx];
			var map = $timeout(function(){ 
				vm.map = true;
			 }, 2001); 
			var coords = {
				latitude: vm.schedule[idx].googleLocation.latitude,
				longitude: vm.schedule[idx].googleLocation.longitude
			};
			vm.currentMatch.marker = angular.copy(coords);
			vm.currentMatch.coords = coords;
			vm.currentMatch.index = idx;
			$location.hash('schedule' + idx);
      		$anchorScroll();
		};


		
	} 

})()