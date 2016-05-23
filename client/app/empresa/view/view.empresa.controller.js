'use strict';

angular.module('applicationSample')
	.controller('ViewEmpresaCtrl', function($scope, $stateParams, Empresa, $mdToast, $location, $state, User, $http) {

    //Inicializa scope
    $scope.phonePattern = /^(?=(\D*\d){11}$)\(?\d{3,5}\)?[- .]?\d{2,4}[- .]?\d{4}$/;
    $scope.passwordValidate = '';
    $scope.editar = true;
    $scope.loading = false;
    $scope.invalidPassword = false;

    //Función al cancelar Form
    $scope.cancel = function(){
        $state.go('backOffice.empresas');
    };

    //Inicializa pantalla
    $scope.loadEmpresa = function() {

      $scope.usuariosSeleccionadosEMail = [];

      /**
       * Search for users.
       */
      function querySearch (query) {
        var results = query ?
          $scope.allContacts.filter(createFilterFor(query)) : [];
        return results;
      }

      $scope.querySearch = querySearch;
      //$scope.allContacts = User.query(); //loadContacts(); user que no está en usuarioempresa con id de empresa = $stateParams.id
      //$scope.contacts = [];//User.query(); //usuarios seleccionados previamente (user que está en usuarioempresa con id de empresa = $stateParams.id)
      $scope.filterSelected = true;
      //alert('q');
      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(contact) {
          return (contact.name.toLowerCase().indexOf(lowercaseQuery) != -1);
        };
      }

      if ($stateParams.id === undefined) {

        $scope.contacts = [];
        $scope.usuariosSeleccionadosPreviamente = [];
        //Si el id nulo es una nueva empresa
        $scope.empresa = new Empresa();
        //Acción para crear empresa
        $scope.saveEmpresa = function () {
          $scope.invalidPassword = false;
          if ($scope.passwordValidate != $scope.empresa.password){
            $scope.invalidPassword = true;
            return;
          }
          $scope.loading = true;
          $scope.editar = false;
          $scope.empresa.$save(function(){
            $state.go('backOffice.empresas');
            $mdToast.show(
              $mdToast.simple()
                .content('La empresa se creó exitosamente')
                .position('bottom left right')
                .hideDelay(5000)
            );
          });
        };
      }
      else {
        //Si el id NO es nulo recupera la empresa
        Empresa.get({id: $stateParams.id}, function (empresa) {
            $scope.empresa = empresa;
          });
        //Acción para actualizar empresa
        $scope.saveEmpresa = function () {
          $scope.invalidPassword = false;
          if ($scope.passwordValidate != $scope.empresa.password){
            $scope.invalidPassword = true;
            return;
          }
          $scope.loading = true;
          $scope.editar = false;
          $scope.empresa.$update(function(){
            $state.go('backOffice.empresas');
            $mdToast.show(
              $mdToast.simple()
                .content('La empresa se actualizó exitosamente')
                .position('bottom left right')
                .hideDelay(5000)
            );
          });
        };
      }
    };


  });

