'use strict';

describe('Controller: EmpresaCtrl', function () {

  // load the controller's module
  beforeEach(module('applicationSample'));

  var EmpresaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmpresaCtrl = $controller('EmpresaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
