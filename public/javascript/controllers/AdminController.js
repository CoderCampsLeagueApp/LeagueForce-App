(function() {
	'use strict';
	angular.module('app')
	.controller('AdminController', AdminController);


	AdminController.$inject = ['$state', '$stateParams', '$rootScope', 'AdminFactory'];

	function AdminController($state, $stateParams, $rootScope, AdminFactory) {
		var vm = this;
		vm.title = 'Welcome to our App!';

		$state.go('Admin.home');

		AdminFactory.getLeague($rootScope._user.id).then(function(res){
			vm.adminLeague = res;
			console.log(vm.adminLeague);
		})
		//news
		vm.newsletter = {};
		vm.edit = {};
		vm.editBox = false;

		//league
		vm.league = {};
		vm.league.features = [];
		vm.league.images = [];
		vm.leagueSize = [0];

		//team
		vm.team = {};
		vm.teams = [];	


		//league ----------------------------------------
		//creating League
		vm.createLeague = function(league){
			if(!league._id){
				AdminFactory.createLeague(league).then(function(res){
					console.log('created league!');
				});
			}
			else{
				AdminFactory.editLeague(league).then(function(res)
					{console.log('edited!')}
					)};
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
		//creating League finished 

		//Editing League ------------------------------------------------

		vm.startLeagueEdit = function(id){
			AdminFactory.getLeague($rootScope._user.id).then(function(res){
				vm.league = res;
				$state.go('Admin.league');
			});
		};


		vm.startTeamEdit = function(id){
			$state.go('Admin.team');
		}

		vm.team.teamMembers = [];

		//Creating & Editing Team---------------------------------------------
		vm.createTeam = function(team){
			team.league = vm.adminLeague._id;
			AdminFactory.createTeam(team).then(function(res){
				console.log('has been added to database!');
				$state.go('Home');
			})
		}

		vm.addTeam = function(team){
			var copy = angular.copy(team);
			vm.teams.push(copy);
			delete vm.team;
			delete vm.coach;
			delete vm.player;
			vm.team = {};
			vm.team.teamMembers = [];
			vm.coach = {};
			vm.player = {};
			console.log(vm.team);
			console.log(vm.coach);
			console.log(vm.player);
		};

		vm.addCoach = function(coach){
			console.log(coach);
			if (coach.isCoach  != true) coach.isSubCoach = true;
			var copy = angular.copy(coach);
			vm.team.teamMembers.push(copy);
			vm.coach.name = "";
			vm.coach.isCoach = "";
			vm.coach.pic = "";
			vm.coach.bio = "";
		};
		vm.addPlayer = function(player){
			player.isPlayer = true;
			var copy = angular.copy(player);
			vm.team.teamMembers.push(copy);
			console.log(player);
			vm.player.name = '';
			vm.player.teamMember = '';
			vm.player.position = '';
			vm.player.pic = '';
			vm.player.dob = '';
		};
		vm.addTeamImage = function(image){
			if (vm.team.imagedef !== true) {
				if(!vm.team) vm.team = {};
				if (!vm.team.images) vm.team.images = [];
				vm.team.imagedef = true;
			}
			vm.team.images.push(image);
		};
		
	};
})();