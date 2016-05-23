/**
 * Created by martin on 17/05/15.
 */


'use strict';

angular.module('applicationSample')
  .controller('LabMenuCtrl', function ($scope, $location, Auth, $state, $mdDialog, $timeout, $mdSidenav, $log) {

    //debería hacerlo el authenticate de ui-router
    $scope.load = function() {
      $timeout(function() {
        if (!Auth.isLoggedIn()){
          $state.go('public.home');
        }
      });
    };

    $scope.isComercial = Auth.isComercial;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.logout = function() {
      Auth.logout();
      $state.go('public.home');
    };

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug('toggle ' + navID + ' is done');
          });
      }, 200);
    }

    $scope.toggleLeft = buildDelayedToggler('left');

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait) {
      var timer;

      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /*function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug('toggle ' + navID + ' is done');
          });
      };
    }*/

    //menu

    var originatorEv;

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.notificationsEnabled = true;
    $scope.toggleNotifications = function() {
      $scope.notificationsEnabled = !$scope.notificationsEnabled;
    };

    $scope.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .content('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );

      originatorEv = null;
    };
  }).controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log, Auth) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isComercial = Auth.isComercial;

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug('close LEFT is done');
        });

    };
  });

