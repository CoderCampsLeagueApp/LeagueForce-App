(function() {
	'use strict';
	angular.module('app')
	.controller('AdminController', AdminController);


	AdminController.$inject = ['$state', '$stateParams', '$rootScope', 'AdminFactory', '$window', '$scope', 'Upload', '$http'];

	function AdminController($state, $stateParams, $rootScope, AdminFactory, $window, $scope, Upload, $http) {
		var vm = this;
		vm.title = 'Welcome to our App!';
		vm.uiRouterState = $state;

		vm.def = "https://d1luk0418egahw.cloudfront.net/static/images/guide/NoImage_592x444.jpg";
		$state.go('Admin.home');

		// -----------Google Maps---------------------

		vm.map = { center: { latitude: 40, longitude: -100 }, zoom: 4 }; //center of map

		//Geolocation HTML5, using $scope.$apply-- digest cycle applies changes
		vm.getLocation = function(){
			$window.navigator.geolocation.getCurrentPosition(function(position){
				console.log(position);
				vm.marker = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				}
				var newCenter = angular.copy(vm.marker);
				console.log(newCenter.latitude);
				$scope.$apply(function(){
					vm.map = { center: { latitude: newCenter.latitude, longitude: newCenter.longitude}, zoom: 14};
				});
				

			});
		}


		//--------------------Cloudinary-----------------------

    // upload on file select or drop
    $scope.upload = function (file) {
    	console.log(file);
    // 	vm.loading = true;
    // 	Upload.upload({
    // 		url: '/api/user/uploadPhoto',
    // 		data: {file: file, 'userId': vm.status._user.id}
    // 	}).then(function (resp) {
				// vm.loading = false;

    // 		console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    // 	}, function (resp) {
				// vm.loading = false;
				
    // 		console.log('Error status: ' + resp.status);
    // 	}, function (evt) {
    // 		var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    // 		console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    // 	});
};



AdminFactory.getLeague($rootScope._user.id).then(function(res){
	vm.adminLeague = res;
	
});

		//news
		vm.newsletter = {};
		vm.edit = {};
		vm.editBox = false;

		//league
		vm.league = {};
		vm.league.features = [];
		vm.league.images = [];
		vm.leagueSize = [0];
		vm.league.weeks = [];
		vm.matches = [];
		//vm.league.teams  = [];

		//team
		vm.team = {};
		vm.teams = [];	

		//schedule
		// vm.week = {}
		// // vm.weeks = [];
		// vm.league.weeks = [];
		// vm.league.weeks.week = {};
		// vm.weeks.week = {};
		// vm.week.matches = [];


		//league ----------------------------------------
		//creating League or editing
		vm.createLeague = function(league, match){
			if(!league._id){
				league.googleLocation = vm.marker;
				AdminFactory.createLeague(league).then(function(res){
					vm.adminLeague = res;
					$state.go('Admin.home');
				});
			}
			else{
				league.googleLocation = vm.marker;
				AdminFactory.editLeague(league).then(function(res){
					console.log(res);
					console.log(match);
					if(match) {
						var idx = 0;
						for (var i = 0; i < vm.adminLeague.weeks.length; i++) {
							console.log(vm.adminLeague.weeks.length);
							if (vm.adminLeague.weeks[i]._id === match.week) {
								idx = i;
								for(var j = 0; i < vm.adminLeague.teams.length; i++){
									console.log('sodejhgfdghdf');
									if(vm.adminLeague.teams[i] === match.team1){
										match.team1name = vm.adminLeague.teams[i].name;
									}
									if(vm.adminLeague.teams[i] === match.team2){
										console.log('bubba');
										match.team2name = vm.adminLeague.teams[i].name;
									}
								}
							}
						} vm.adminLeague.weeks[idx].matches.push(match);
					} 
					else {
						vm.adminLeague = res; 
						$state.go('Admin.home');
					}

				}
				)};
			};
			vm.addFeature = function(feature){
				vm.league.features.push(feature);
			};


			vm.removeFeature = function(idx){
				console.log(idx);
				vm.league.features.splice(idx, 1);
			};

			vm.addImage = function(image){
				vm.league.images.push(image);
			};

			vm.removeImage = function(idx){
				console.log(idx);
				vm.league.images.splice(idx, 1);
			};


		//creating League finished 

		//Editing League ------------------------------------------------

		vm.startLeagueEdit = function(id){
			AdminFactory.getLeague($rootScope._user.id).then(function(res){
				vm.league = res;
				$state.go('Admin.league');
			});
		};

		vm.startAddTeam = function(){
			$state.go('Admin.team');
			vm.edit = false;
		}
		vm.startTeamEdit = function(team){
			$state.go('Admin.team');
			vm.team = team;
			console.log(vm.team.images);
			vm.edit = true;
		}

		vm.team.teamMembers = [];

		//Creating & Editing Team---------------------------------------------
		vm.createTeam = function(team){
			team.league = vm.adminLeague._id;
			AdminFactory.createTeam(team).then(function(res){
				vm.adminLeague.teams.push(team);
				$state.go('Admin.home');
			});
		};
		vm.editTeam = function(team){
			AdminFactory.editTeam(team).then(function(res){
				$state.go('Admin.home');
			}); 
		};
		vm.deleteTeam = function(team, idx){
			
			AdminFactory.deleteTeam(team).then(function(res){
				console.log('has been deleted');
				vm.adminLeague.teams.splice(idx, 1);
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

		vm.removeTeamImage = function(idx){
			vm.team.images.splice(idx, 1);
		}

		//-------------Matches & Weeks----------------------
		vm.matchesInWeek = function(week) {
			vm.edit = false;
			vm.week = week;
			$state.go('Admin.addmatch', {id: week})
		};

		vm.addWeek = function(singleWeek) {
			var week = angular.copy(singleWeek);
			console.log(week);
			week = {};
			vm.league.weeks.push(week);
			console.log(vm.league.weeks.length);			
		};

		vm.subtractWeek = function(idx) {
			vm.league.weeks.splice(idx, 1);
		};

		vm.addMatch = function(match) {
			var copy = angular.copy(match);
			vm.matches.push(copy);
			console.log(copy);
			console.log(vm.matches);
			vm.match.date = '';
			vm.match.googleLocation = '';
			vm.match.team1 = '';
			vm.match.team2 = '';
		};

		vm.removeMatch = function(idx){
			console.log(idx);
			vm.league.weeks.matches.splice(idx, 1);
		};

		vm.createMatch = function(matches) {
			var leagueWeek = {
				weekId: vm.week,
				leagueId: vm.adminLeague._id
			};
			AdminFactory.createMatch(matches, leagueWeek).then(function(res) {
				vm.createLeague(res, matches);
				$state.go('Admin.schedule');
			})
		};

		// vm.getMatches = function() {
		// 	AdminFactory.getMatches($stateParams.id).then(function(res) {
		// 		vm.matches = res;
		// 	})
		// }


		// vm.getWeeks = function() {
		// 	AdminFactory.getWeek($stateParams.id).then(function(res) {
		// 		vm.weeks = res;
		// 	});
		// };


		//-------------Newsletter Controller Functions------

		vm.toEditPage = function(edit) {
			$state.go('Admin.editnewsletter');
			vm.newsletter = angular.copy(edit);
		};

		vm.postNewsletter = function(newsletter) {
			if(!newsletter._id) {
				vm.newsletter.created = new Date();
				vm.newsletter.isPublished = true;
				AdminFactory.postNewsletter(vm.newsletter).then(function(res) {
					vm.getNewsletters();
					console.log(vm.newsletter + ' | created!');
					delete vm.newsletter;
					$state.go('Newsletter');
				});
			}

			else {
				AdminFactory.editNewsletter(vm.newsletter).then(function(res) {
					vm.getNewsletters();
					console.log(vm.newsletter + ' | edited!');
					delete vm.newsletter;
					$state.go('Admin.storedarticles');
				});
			}
			
		};


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

		vm.adminToComments = function(newsletter) {
			
			$state.go('SingleNewsletter');
		}

		//------------Draft Functionality-------------
		vm.draftRequest = function(draft) {
			vm.newsletter.isPublished = false;
			AdminFactory.postNewsletter(vm.newsletter).then(function(res) {				
				//console.log(newsletter);
				delete vm.newsletter;
				$state.go('Admin.draftsmodal')
			});
		};

		vm.exampleModal = function(){
			ModalService.showModal({
				templateUrl: '../admin_views/drafts_modal.html',
				controller: 'ModalController'
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					console.log(result);	
				})
			});
		};

		vm.saveDraft = function(newsletter) {
			vm.newsletter.isPublished = false;
			AdminFactory.postNewsletter(vm.newsletter).then(function(res) {
				vm.newsletter.body = " ";
				vm.newsletter.title = " ";
				vm.getNewsletters();
				delete vm.newsletter;
				$state.go('Admin.home')
			});
		};

		vm.cancelDraft = function() {
			delete vm.newsletter;
			vm.newsletter = "";
			vm.newsletter = {};
			$state.go('Admin.home');
			console.log(vm.newsletter);
			console.log(newsletter);
		};

		
	};
})();