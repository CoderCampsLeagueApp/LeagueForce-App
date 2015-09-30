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
			templateUrl: 'views/admin.html'
		}).state('AdminLeague',{
			url: '/admin/creatLeague',
			templateUrl: '../admin_views/league_form.html',
			controller: 'LeagueController',
			controllerAs: 'vm'
		}).state('AdminTeam',{
			url: '/admin/creatTeams',
			templateUrl: '../admin_views/team_form.html',
			controller: 'LeagueController',
			controllerAs: 'vm'
		}).state('AdminPlayers',{
			url: '/admin/creatTeams',
			templateUrl: '../admin_views/player_form.html',
			controller: 'LeagueController',
			controllerAs: 'vm'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
