(function() {
	'use strict';

	angular.module('app', ['ui.router', 'angularModalService', 'textAngular','uiGmapgoogle-maps', 'ngFileUpload', 'ngImgCrop', "ui.bootstrap"])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider'];
	function Config($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'templates/home.html'
		}).state('Inbox', {
			url: '/inbox/:id',
			templateUrl: '/templates/inbox.html',
			controller: 'InboxController',
			controllerAs: 'vm'
		}).state('Leagues', {
			url: '/leagues',
			templateUrl: 'templates/leagues.html',
			controller: 'ViewLeaguesController',
			controllerAs: 'vm'
		}).state('SingleLeague', {
			url: '/leagues/:id',
			templateUrl: 'templates/single_league.html',
			controller: 'ViewLeaguesController',
			controllerAs: 'vm'
		}).state('TeamPage', {
			url: '/team/:id',
			templateUrl: 'templates/team_page.html',
			controller: 'ViewLeaguesController',
			controllerAs: 'vm'
		}).state('SingleMatch', {
			url: '/match/:id',
			templateUrl: 'templates/single_match.html',
			controller: 'ViewLeaguesController',
			controllerAs: 'vm'
		}).state('About', {
			url: '/about',
			templateUrl: 'templates/about.html'
		}).state('Login', {
			url: '/login',
			templateUrl: 'templates/login.html'
		}).state('Register', {
			url: '/register',
			templateUrl: 'templates/register.html'
		}).state('AdminRegister', {
			url: '/admin/register',
			templateUrl: 'templates/admin_register.html'
		}).state('Admin', {
			url: '/admin/manager',
			templateUrl: 'templates/admin.html',
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
			url: '/addMatch/:id',
			templateUrl: '../admin_views/add_match_form.html'
		}).state('Admin.schedule', {
			url: '/schedule',
			templateUrl: '../admin_views/league_schedule.html'
		}).state('TestView', {
			url: '/test',
			templateUrl: 'templates/test_view.html'
		}).state('Newsletter', {
			url: '/leaguenews',
			templateUrl: 'templates/league_news.html',
			controller: 'ViewNewsController',
			controllerAs: 'vm'
		}).state('SingleNewsletter', {
			url: '/leaguenews/:id',
			templateUrl: 'templates/newsletter.html',
			controller: 'ViewNewsController',
			controllerAs: 'vm'
		}).state('Admin.storedarticles', {
			url: '/storedArticles',
			templateUrl: '../admin_views/stored_articles.html'
		}).state('ViewProfile', {
			url: '/profile/:id',
			templateUrl: 'templates/all_profiles.html',
			controller: "ViewProfileController",
			controllerAs: 'vm'
		}).state('Profile', {
			url: '/profile/settings/:id',
			templateUrl: 'templates/profile_settings.html',
			controller: "ProfileController",
			controllerAs: 'vm'
		}).state('EditProfile', {
			url: '/EditProfile/:id',
			templateUrl: 'templates/edit_profile.html',
			controller: "ProfileController",
			controllerAs: 'vm'
		}).state('PasswordReset', {
			url: '/PasswordReset/:id',
			templateUrl: 'templates/password_reset.html'
		}).state("Token", {
			url: '/auth/token/:token',
			templateUrl: 'templates/authenticating.html',
			controller: 'TokenController',
			resolve: {
				token: ["$stateParams", function($stateParams) {
					return $stateParams.token ;
				}]
			}
		})
		uiGmapGoogleMapApiProvider.configure({ 
			key: 'AIzaSyAGEGj1MQXzaAG_1LN_rDcJgX1i5XO6tl4', 
			v: '3.20',
			libraries: 'places, weather' 
		});
		
		$urlRouterProvider.otherwise('/');
	}
})();

