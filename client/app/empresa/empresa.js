'use strict';

angular.module('applicationSample')
  .config(function ($stateProvider) {
    $stateProvider
      .state('backOffice.empresas', {
        url: '/empresas',
        views : {
          'bodyLab@' : {
            templateUrl: 'app/empresa/empresa.html',
            controller: 'EmpresaCtrl',
            authenticate: true
          }
        }
      })
      .state('backOffice.empresas.viewEmpresa', {
        url: '/view/:id',
        views : {
          'bodyLab@' : {
            templateUrl: 'app/empresa/view/view.html',
            controller: 'ViewEmpresaCtrl',
            authenticate: true
          }
        }
      })
      .state('backOffice.empresas.addEmpresa', {
        url: '/add',
        views : {
          'bodyLab@' : {
            templateUrl: 'app/empresa/view/view.html',
            controller: 'ViewEmpresaCtrl',
            authenticate: true
          }
        }
      });
  });
