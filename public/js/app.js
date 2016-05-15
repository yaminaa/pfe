var process = angular.module('processService', ['ngResource']);
var processFactory = function($resource){
	return $resource('http://localhost:8099/TaskExampleProcess' },
		{
      'get':    {method:'GET'},
     'save':   {method:'POST'},
     'update' : { method:'PUT' },
     'query':  {method:'GET', isArray:true},
     'remove': {method:'DELETE'},
     'delete': {method:'DELETE'}
		});
};

process.factory('Process', [ '$resource', processFactory ]);

//here we create our controller in order to perform our server
process.controller('MyCtrl',['$scope', 'Process','$location', function($scope, Process,$location) {
$scope.processes = {};

//Perform "GET http://localhost:8099/TaskExampleProcess"
Process.get().$promise.then(function(data) {
      $scope.processes = data;
      }, function(error){/*Error treatment*/};);
}]);
//Perform "DELETE http://mydomain.com/api/user/:slug"
var deleteProcess = function(process) {
   Process.delete(process.slug);
};
//Perform "POST http://localhost:8099/TaskExampleProcess/MyStart"
var createProcess = function(process) {
  $location.path('/user-creation/' + userId);
   Process.save(process);
};
//Perform " PUT http://localhost:8099/TaskExampleProcess/_my_custom_id_0"
var editProcess = function(process) {
  $location.path('/user-detail/' + userId);
   Process.update(process);
};

}];
