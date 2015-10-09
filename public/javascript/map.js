(function() {
	'use strict';
	angular.module('app')
	.config(function(uiGmapGoogleMapApiProvider) {
    
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAGEGj1MQXzaAG_1LN_rDcJgX1i5XO6tl4',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

})();