(function(){
  angular.module('app')
  .controller('UploadController', UploadController);


  UploadController.$inject = ['$state', '$stateParams', '$rootScope', 'UserFactory', '$scope', 'Upload', '$timeout', '$interval', 'user', "$modalInstance"];

  function UploadController($state, $stateParams, $rootScope, UserFactory, $scope, Upload, $timeout, $interval, user, $modalInstance){
    var vm = this;
    vm.user = user;
    $scope.cb = "";

    $scope.upload = function(dataUrl) {
      
      Upload.upload({
            url: '/api/user/profilePicUpload',
            data: {
                file: Upload.dataUrltoBlob(dataUrl),
                'userId': vm.user._id
            },
        })
      .then(function (response) {
        
            $timeout(function () {
                $scope.cb = response.data;
                $modalInstance.close($scope.cb);
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
            console.log($scope.errorMsg);
        }, function (evt) {
              vm.stat = true;
              $scope.progressVisible = true;
              $scope.progress = 0;
           var interv = $interval(function(){
           if ($scope.progress ==100){
               $interval.cancel(interv);
             }
           else{ $scope.progress += 1 }
           }, 20);
           });
            
        };

        $scope.cancel = function(){
          $modalInstance.dismiss();
        };

      }
  
})() ;
