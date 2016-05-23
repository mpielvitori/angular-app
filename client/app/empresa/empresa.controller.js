'use strict';

angular.module('applicationSample')
  .controller('EmpresaCtrl', function ($scope, Empresa, $mdDialog) {

    $scope.delete = function(empresa) {
      var confirm = $mdDialog.confirm()
        .title('¿Está seguro que desea eliminar la empresa '+empresa.nombre)
        .content('Esta acción no se podrá deshacer')
        .ok('Eliminar')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(function() {
        var index = $scope.displayedCollection.indexOf(empresa);
        if (index !== -1) {
          Empresa.remove({ id: empresa._id });
          $scope.displayedCollection.splice(index, 1);
        }
      }, function() {
        //Cancela el borrado
      });
    };

    $scope.itemsByPage=20;

    $scope.empresasDB = Empresa.query();
    $scope.displayedCollection = [].concat($scope.empresasDB);

  });
