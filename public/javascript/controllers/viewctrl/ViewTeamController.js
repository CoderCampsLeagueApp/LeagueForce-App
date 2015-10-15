(function(){
	angular.module('app')
	.controller('ViewTeamController', ViewTeamController);

	ViewTeamController.$inject = ['$state', '$stateParams', '$rootScope', 'WebsiteFactory','$timeout'];

	function ViewTeamController($state, $stateParams, $rootScope, WebsiteFactory, $timeout){
		var vm = this;
		vm.leagues = [];
		vm.league = {};
		vm.schedule = [];

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
						for(var j = 0; j < vm.league.teams.length; j++) {
							if(vm.schedule[i].team1 === vm.league.teams[j]._id) {
								vm.schedule[i].t1name = vm.league.teams[j].name
							};
							if(vm.schedule[i].team2 === vm.league.teams[j]._id) {
								vm.schedule[i].t2name = vm.league.teams[j].name	
							};
						};
					};
					console.log(vm.league);
				});
				console.log(res);
			});
		};

		vm.getMatch = function(match) {
			
			$state.go('SingleMatch', {id: match});
			console.log(match);
		}


		
	} 

})()