'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
.controller('MyCtrl',function($scope, Process) {
$scope.processes=Process.query();
//$scope.setDataForProcess=function(processID){};
//$scope.addProcess=function(){};
});
