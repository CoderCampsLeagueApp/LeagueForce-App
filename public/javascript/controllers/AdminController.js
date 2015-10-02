(function() {
	'use strict';
	angular.module('app')
	.controller('AdminController', AdminController);


	AdminController.$inject = ['$state', '$stateParams', '$sce', '$rootScope', 'LeagueFactory', 'AdminFactory'];

	function AdminController($state, $stateParams, $sce, $rootScope, LeagueFactory, AdminFactory) {
		var vm = this;
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

		//Newsletters adjust doing it for league property
		if($stateParams.id) { //if the ID exists here, we go to the factory and find the specific pictures
			AdminFactory.getNewsletter($stateParams.id).then(function(res) {
				vm.newsletter = res;
				//vm.oldNewsletter = angular.copy(res);
			});
		};

		// if($rootScope._user) {
		// 	AdminFactory.getAdminLoggedIn($rootScope._user.id).then(function(res) {
		// 		vm.loggedInUser = res;
		// 	});
		// };	

		vm.postNewsletter = function(newsletter) {
			vm.newsletter.created = new Date();
			//console.log(vm.newsletter.created);
			AdminFactory.postNewsletter(vm.newsletter).then(function(res) {
				console.log
				vm.getNewsletters();
				delete vm.newsletter;
				//$state.go('Newsletter');
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


	};
})();