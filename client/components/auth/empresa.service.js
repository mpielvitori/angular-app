'use strict';

angular.module('applicationSample')
  .factory('Empresa', function ($resource) {
    return $resource('/lab/empresas/:id', {id: '@_id'},
      {
        update: {
          method: 'PUT'
        }
      }
    );
  });
