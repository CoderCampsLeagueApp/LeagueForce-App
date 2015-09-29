(function() {
	'use strict';
	angular.module('app')
	.factory('LeagueFactory', LeagueFactory);

	LeagueFactory.$inject = ['$http', '$q'];

	function LeagueFactory($http, $q) {
		var o = {};
		
		return o;
	}
})();