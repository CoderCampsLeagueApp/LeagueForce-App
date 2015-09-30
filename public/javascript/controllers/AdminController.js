(function() {
	'use strict';
	angular.module('app')
	.controller('AdminController', AdminController);


	AdminController.$inject = ['$state', '$stateParams', '$rootScope', 'LeagueFactory'];

	function AdminController() {
		var vm = this;
		vm.title = 'Welcome to our App!';
		//league
		vm.league = {};
		vm.league.features = [];
		vm.league.images = [];
		vm.leagueSize = [0];

		//team
		vm.teams = [];	


		//league
		vm.addLeague = function(league){
			console.log(league);
		}
		vm.addFeature = function(feature){
			vm.league.features.push(feature);
		}
		vm.removeFeature = function(idx){
			console.log(idx);
			vm.league.features.splice(idx, 1);
		}
		vm.addImage = function(image){
			vm.league.images.push(image);
		}
		vm.removeImage = function(idx){
			console.log(idx);
			vm.league.images.splice(idx, 1);
		}

		//teams on the league
		vm.formSize = function(size){ 
			
			console.log(size);
			vm.leagueSize = [];
			for(var i = 0; i < size;i++){
				vm.leagueSize.push(i);
				console.log(i);
			}
		};
		vm.addTeam = function(team){
			console.log(team);
		};
		vm.addCoach = function(coach, idx){
			if (vm.teams[idx].coachdef !== true) {
				if(!vm.teams[idx]) vm.teams[idx] = {};
				if (!vm.teams[idx].coaches) vm.teams[idx].coaches = [];
				vm.teams[idx].coachdef = true;
			}
			vm.teams[idx].coaches.push(coach);
		};
		vm.addTeamImage = function(image, idx){
			if (vm.teams[idx].imagedef !== true) {
				if(!vm.teams[idx]) vm.teams[idx] = {};
				if (!vm.teams[idx].images) vm.teams[idx].images = [];
				vm.teams[idx].imagedef = true;
			}
			vm.teams[idx].images.push(image);
		};
		// players
		vm.playerForm = function(){
			console.log(vm.teams)
			//show form with drop down of players.
		}

	};
})();