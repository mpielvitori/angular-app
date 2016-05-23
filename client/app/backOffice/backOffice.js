/**
 * Created by martin on 21/10/15.
 */
'use strict';

angular.module('applicationSample')
  .config(function ($stateProvider) {
    $stateProvider
      .state('backOffice', {
        url : '/backOffice',
        views : {
          'headerLab' : {
            templateUrl: 'app/menu/header.html',
            controller: 'LabMenuCtrl',
            authenticate: true
          },
          'menuLab' : {
            templateUrl: 'app/menu/leftMenu.html',
            controller: 'LeftCtrl',
            authenticate: true
          }
        }
      });
  });
