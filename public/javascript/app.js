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
		}).state('Newsletter', {
			url: '/leaguenews', //possibly convert it to /leaguenews/:id once we have that working
			templateUrl: 'views/league_news.html',
			controller: 'ProfileController',
			controllerAs: 'vm'
		});

		$urlRouterProvider.otherwise('/');
	}
})();

