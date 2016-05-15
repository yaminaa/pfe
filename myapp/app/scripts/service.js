'use strict';
angular.module('processService')
.factory('Process',function($resource){
      return $resource('http://localhost:8080/TaskExampleProcess');
});
