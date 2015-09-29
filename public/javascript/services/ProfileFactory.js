(function() {
	'use strict';
	angular.module('app')
	.factory('ProfileFactory', ProfileFactory);

	ProfileFactory.$inject = ['$http', '$q'];

	function LeagueFactory($http, $q) {
		var o = {};
		
		return o;
	}
})();