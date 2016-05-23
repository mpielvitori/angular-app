'use strict';

angular.module('applicationSample')
  .controller('LoginCtrl', function ($scope, Auth, $location, $uibModalInstance, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
            $uibModalInstance.dismiss();
            $state.go('backOffice');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
