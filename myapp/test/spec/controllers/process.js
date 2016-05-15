'use strict';

describe('Controller: ProcessCtrl', function () {

  // load the controller's module
  beforeEach(module('myappApp'));

  var ProcessCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProcessCtrl = $controller('ProcessCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
