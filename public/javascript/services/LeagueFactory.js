(function(){
	// "use strict" ;
	angular.module('app').factory('LeagueFactory', LeagueFactory) ;
	LeagueFactory.$inject = ['$q', '$http', '$window', '$rootScope'] ;

	function LeagueFactory($q, $http, $window, $rootScope) {
		var o = {} ;
		
		return o ;
	}
})();