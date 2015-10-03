(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('Leagues', {
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
		}).state('Admin.League',{
			url: '/admin/createLeague',
			templateUrl: '../admin_views/league_form.html',
		}).state('Admin.Team',{
			url: '/admin/createTeams',
			templateUrl: '../admin_views/team_form.html',
		}).state('Admin.Player',{
			url: '/admin/createPlayers',
			templateUrl: '../admin_views/player_form.html',
		}).state('TestView', {
			url: '/test',
			templateUrl: 'views/test_view.html',
			controller: 'AdminController',
			controllerAs: 'vm'
		}).state('Profile', {
			url: '/profile',
			templateUrl: 'views/profile.html',
			controller: 'ProfileController',
			controllerAs:'vm'
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

		// $urlRouterProvider.otherwise('/');
	}
})();

