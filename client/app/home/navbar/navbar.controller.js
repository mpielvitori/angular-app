'use strict';

angular.module('applicationSample')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $uibModal) {

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.showModal = false;
    $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

    //Login
    $scope.open = function () {
      $uibModal.open({
        windowClass: 'customTrans',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      });

    };
  });
