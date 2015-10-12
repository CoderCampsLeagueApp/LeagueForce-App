(function() {
	'use strict';

	angular.module('app', ['ui.router', 'angularModalService', 'textAngular','uiGmapgoogle-maps', 'ngFileUpload', 'ngImgCrop', "ui.bootstrap"])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider'];
	function Config($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('Inbox', {
			url: '/inbox/:id',
			templateUrl: '/views/inbox.html',
			controller: 'InboxController',
			controllerAs: 'vm'
		})
		.state('Leagues', {
			url: '/leagues',
			templateUrl: 'views/leagues.html'
		}).state('About', {
			url: '/about',
			templateUrl: 'views/about.html'
		}).state('Login', {
			url: '/login',
			templateUrl: 'views/login.html'
		}).state('Register', {
			url: '/register',
			templateUrl: 'views/register.html'
		}).state('AdminRegister', {
			url: '/admin/register',
			templateUrl: 'views/admin_register.html'
		}).state('Admin', {
			url: '/admin/manager',
			templateUrl: 'views/admin.html',
			controller: 'AdminController',
			controllerAs: 'vm'
		}).state('Admin.league',{
			url: '/createLeague',
			templateUrl: '../admin_views/league_form.html',
		}).state('Admin.team',{
			url: '/createTeams',
			templateUrl: '../admin_views/team_form.html',
		}).state('Admin.home',{
			url: '/home',
			templateUrl: '../admin_views/admin_home.html'
		}).state('Admin.newsletter', {
			url: '/newsletter/create',
			templateUrl: '../admin_views/create_newsletter.html'
		}).state('Admin.editnewsletter', {
			url: '/newsletter/edit/:id',
			templateUrl: '../admin_views/create_newsletter.html'
		}).state('Admin.addmatch', {
			url: '/addMatch',
			templateUrl: '../admin_views/add_match_form.html'
		}).state('Admin.schedule', {
			url: '/schedule',
			templateUrl: '../admin_views/league_schedule.html'
		}).state('TestView', {
			url: '/test',
			templateUrl: 'views/test_view.html'
		}).state('Newsletter', {
			url: '/leaguenews',
			templateUrl: 'views/league_news.html',
			controller: 'ViewNewsController',
			controllerAs: 'vm'
		}).state('SingleNewsletter', {
			url: '/leaguenews/:id',
			templateUrl: 'views/newsletter.html',
			controller: 'ViewNewsController',
			controllerAs: 'vm'
		}).state('Admin.storedarticles', {
			url: '/storedArticles',
			templateUrl: '../admin_views/stored_articles.html'
		}).state('ViewProfile', {
			url: '/profile/:id',
			templateUrl: 'views/all_profiles.html',
			controller: "ViewProfileController",
			controllerAs: 'vm'
		}).state('Profile', {
			url: '/profile/settings/:id',
			templateUrl: 'views/profile_settings.html',
			controller: "ProfileController",
			controllerAs: 'vm'
		}).state('EditProfile', {
			url: '/EditProfile/:id',
			templateUrl: 'views/edit_profile.html',
			controller: "ProfileController",
			controllerAs: 'vm'
		}).state("Token", {
			url: '/auth/token/:token',
			templateUrl: 'views/authenticating.html',
			controller: 'TokenController',
			resolve: {
				token: ["$stateParams", function($stateParams) {
					return $stateParams.token ;
				}]
			}
		});
		uiGmapGoogleMapApiProvider.configure({ 
		key: 'AIzaSyAGEGj1MQXzaAG_1LN_rDcJgX1i5XO6tl4', 
		v: '3.20',
		libraries: 'places,weather,geometry,visualization' 
		});
		
		$urlRouterProvider.otherwise('/');
	}
})();

