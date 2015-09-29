(function() {
	'use strict';
	angular.module('app')
	.factory('ProfileFactory', ProfileFactory);

	ProfileFactory.$inject = ['$http', '$q'];

	function ProfileFactory($http, $q) {
		var o = {};
		
		return o;
	}
})();