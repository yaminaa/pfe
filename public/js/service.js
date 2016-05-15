var process = angular.module('processService', ['ngResource']);
var processFactory = function($resource){
	return $resource('http://localhost:8099/TaskExampleProcess/MyStart',{ MyStart : '@MyStart' },{ _my_custom_id_0 : '@_my_custom_id_0' } },
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
