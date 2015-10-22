(function(){
	angular.module('app')
	.controller('AdminUploadController', AdminUploadController);

	AdminUploadController.$inject = ['$scope', 'Upload', '$timeout'];

	function AdminUploadController($scope, Upload, $timeout){
		var vm = this;
		vm.uploadFiles = function(file, leagueid) {
        vm.f = file;
        if (file) {
            file.upload = Upload.upload({
                url: '/api/league/leagueLogoUpload',
                data: {
                    file: file,
                    'leagueid': leagueid
                }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    vm.logopic = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    vm.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                    evt.loaded / evt.total));
            });
        }   
    };
    
    vm.uploadimages = function (files) {
        vm.files = files;
        if (files && files.length) {
            Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {
                    files: files
                }
            }).then(function (response) {
                $timeout(function () {
                    vm.result = response.data;
                });
            }, function (response) {
                if (response.status > 0) {
                   vm.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                vm.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };
}

})() ;
