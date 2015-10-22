(function() {
	'use strict';
	angular.module('app')
	.controller('AdminController', AdminController);


	AdminController.$inject = ['$state', '$stateParams', '$rootScope', 'AdminFactory', '$window', '$scope', 'Upload', '$http'];

	function AdminController($state, $stateParams, $rootScope, AdminFactory, $window, $scope, Upload, $http) {
		var vm = this;
		vm.title = 'Welcome to our App!';
		vm.uiRouterState = $state;

		$state.go('Admin.home');

		// -----------Google Maps---------------------

		var events = {
			places_changed: function (searchBox) {
				var place = searchBox.getPlaces();
		        // console.log(place);
		        if (!place || place == 'undefined' || place.length == 0) {
		        	console.log('no place data :(');
		        		return;
		        	}

		        	$scope.map = {
		        		"center": {
		        			"latitude": place[0].geometry.location.lat(),
		        			"longitude": place[0].geometry.location.lng()
		        		},
		        		"zoom": 18
		        	};
		        	$scope.marker = {
		        		latitude: place[0].geometry.location.lat(),
		        		longitude: place[0].geometry.location.lng()
		        	};
		        	$scope.address = {};
		        	$scope.address.format = place[0].formatted_address;
		        	if(place[0].address_components){
		        		for(var i = 0; i < place[0].address_components.length; i++){
		        			var x = parseInt(place[0].address_components[i].short_name);
		        			if(x > 10000 && x < 99999){
		        				$scope.address.zip = x;
		        			}
		        		}
		        	}
		        	
		        }
		    };
		    $scope.searchbox = { template:'searchbox.tpl.html', events:events, parentDiv: 'gmapsearchbox'};

		$scope.map = { center: { latitude: 40, longitude: -100 }, zoom: 4 }; //center of map

		//Geolocation HTML5, using $scope.$apply-- digest cycle applies changes
		vm.getLocation = function(){
			$window.navigator.geolocation.getCurrentPosition(function(position){
				console.log(position);
				$scope.marker = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				}
				var newCenter = angular.copy($scope.marker);
				console.log(newCenter.latitude);
				$scope.$apply(function(){
					$scope.map = { center: { latitude: newCenter.latitude, longitude: newCenter.longitude}, zoom: 14};
				});
				
			});
		}


		//--------------------Cloudinary-----------------------

    // upload on file select or drop
//     $scope.upload = function (file) {
//     	// console.log(file);
//     // 	vm.loading = true;
//     // 	Upload.upload({
//     // 		url: '/api/user/uploadPhoto',
//     // 		data: {file: file, 'userId': vm.status._user.id}
//     // 	}).then(function (resp) {
// 				// vm.loading = false;

//     // 		console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
//     // 	}, function (resp) {
// 				// vm.loading = false;
				
//     // 		console.log('Error status: ' + resp.status);
//     // 	}, function (evt) {
//     // 		var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//     // 		console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
//     // 	});
// };



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
		vm.allmatches = [];

		//vm.league.teams  = [];

		//team
		vm.team = {};
		vm.teams = [];	

		//schedule
		vm.week = '';
		// // vm.weeks = [];
		// vm.league.weeks = [];
		// vm.league.weeks.week = {};
		// vm.weeks.week = {};
		// vm.week.matches = [];


		//league ----------------------------------------
		//creating League or editing
		vm.createLeague = function(league, match){
			if(!league._id){
				league.googleLocation = {};
				if($scope.marker){
				league.googleLocation.latitude = $scope.marker.latitude;
				league.googleLocation.longitude = $scope.marker.longitude;
				}
				if($scope.address){
				league.googleLocation.address = $scope.address.format;
				league.googleLocation.zip = $scope.address.zip;
				}
				AdminFactory.createLeague(league).then(function(res){
					vm.adminLeague = res;
					$state.go('Admin.home');
				});
			}
			else{
				if(match){
					AdminFactory.editLeague(league).then(function(){
						AdminFactory.getLeague($rootScope._user.id).then(function(res){
							vm.adminLeague = res;
							$state.go('Admin.home');
						}); 			
					});
				}
				else{
					league.googleLocation = {};
					if($scope.marker){
					league.googleLocation.latitude = $scope.marker.latitude;
					league.googleLocation.longitude = $scope.marker.longitude;
					}
					if($scope.address){
					league.googleLocation.address = $scope.address.format;
					league.googleLocation.zip = $scope.address.zip;
					}
					AdminFactory.editLeague(league).then(function(res){
						vm.adminLeague = res;
						console.log(res); 
						$state.go('Admin.home');
					});
				};
			}

		};

		vm.publishLeague = function(id) {
			var leaguePublish = {
				_id: id,
				isDisplay: true
			};
			AdminFactory.editLeague(leaguePublish).then(function(res) {
				$state.go('Leagues');
			})
		}

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

		//Editing League ------------------------------------------------

		vm.startLeagueEdit = function(id){
			AdminFactory.getLeague($rootScope._user.id).then(function(res){
				vm.league = res;
				if(vm.league.googleLocation){
				$scope.marker = angular.copy(vm.league.googleLocation);
				var c = angular.copy(vm.league.googleLocation);
				$scope.map = { center: { latitude: c.latitude, longitude: c.longitude }, zoom: 16 };
				}
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
			vm.edit = true;
		};
		vm.team.teamMembers = [];

		//Creating & Editing Team---------------------------------------------
		vm.clearTeam = function() {
			delete vm.team;
			delete vm.coach;
			delete vm.player;
			vm.team = {};
			vm.team.teamMembers = [];
			vm.coach = {};
			vm.player = {};
		};
		
		vm.createTeam = function(team){
			team.league = vm.adminLeague._id;
			AdminFactory.createTeam(team).then(function(res){
				vm.adminLeague.teams.push(team);
				$state.go('Admin.home');
			});
		};
		vm.editTeam = function(team){
			console.log(team); 
			AdminFactory.editTeam(team).then(function(res){
				delete vm.team;
				delete vm.coach;
				delete vm.player;
				vm.team = {};
				vm.team.teamMembers = [];
				vm.coach = {};
				vm.player = {};
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
			vm.week = week._id;
			vm.allmatches = week.matches;
			for(var i = 0; i< vm.allmatches.length; i++){
				for(var j = 0; j < vm.adminLeague.teams.length; j++){
					
					if(vm.allmatches[i].team1._id === vm.adminLeague.teams[j]._id){
						vm.allmatches[i].t1name = vm.adminLeague.teams[j].name;
					}
					if(vm.allmatches[i].team2._id === vm.adminLeague.teams[j]._id){
						vm.allmatches[i].t2name = vm.adminLeague.teams[j].name;
					}
				}
				console.log(vm.allmatches);
			}
			// console.log(vm.allmatches);
			$state.go('Admin.addmatch', {id: vm.week._id});
		};

		vm.subtractWeek = function(idx) {
			vm.league.weeks.splice(idx, 1);
		};
		vm.addWeek = function() {
			var week = {};
			vm.league.weeks.push(week);			
		};

		vm.addMatch = function(match) {
			var copy = angular.copy(match);
			for(var i = 0; i< vm.adminLeague.teams.length; i++){
				
				if(copy.team1 === vm.adminLeague.teams[i]._id ){
					copy.t1name = vm.adminLeague.teams[i].name;
				}
				if(copy.team2 === vm.adminLeague.teams[i]._id ){
					copy.t2name = vm.adminLeague.teams[i].name;
				}
			};

			copy.googleLocation = {
				address: $scope.address.format,
				zip: $scope.address.zip,
				latitude: $scope.marker.latitude,
				longitude: $scope.marker.longitude
			};
			console.log(copy);
			vm.allmatches.push(copy);
			vm.match.date = '';
			vm.match.googleLocation = '';
			vm.match.team1 = '';
			vm.match.team2 = '';
		};

		vm.removeMatch = function(idx){
			console.log(idx);
			vm.allmatches.splice(idx, 1);
		};

		vm.createMatch = function(matches) {
			
			var leagueWeek = {
				weekId: vm.week,
				leagueId: vm.adminLeague._id,

			};
			AdminFactory.createMatch(matches, leagueWeek).then(function(res) {
				var match = true;
				vm.createLeague(res, match);
			})
		};

		//-------------Newsletter Controller Functions------

		vm.toEditPage = function(edit) {
			$state.go('Admin.editnewsletter');
			vm.newsletter = angular.copy(edit);
		};

		vm.postNewsletter = function(newsletter, idx) {
			if(!newsletter._id) {
				vm.newsletter.created = new Date();
				vm.newsletter.isPublished = true;
				AdminFactory.postNewsletter(vm.newsletter).then(function(res) {
					vm.adminLeague.newsletter.push(res);
					delete vm.newsletter;
					$state.go('Newsletter');
				});
			}

			else {
				AdminFactory.editNewsletter(vm.newsletter).then(function(res) {
					vm.adminLeague.newsletter.splice(idx, 1, newsletter);
					delete vm.newsletter;
					$state.go('Admin.storedarticles');
				});
			}
			
		};


		vm.deleteNewsletter = function(newsletter, idx) {
			AdminFactory.deleteNewsletter(newsletter).then(function(res) {
				vm.newsletters.splice(idx, 1);
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