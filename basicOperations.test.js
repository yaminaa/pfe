/**
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var bpmn = require('../../../lib/public');
var Manager = require('../../../lib/manager').ProcessManager;
var restify = require('restify');
var path = require('path');
var assert = require('assert-plus');

require("../../../lib/history.js").setDummyTimestampFunction();

var port = 8080;
var counter = 0;

var manager = new Manager({
    bpmnFilePath: path.join(__dirname, "../../resources/projects/simple/taskExampleProcess.bpmn")
});
var server = manager.createServer({ logLevel: bpmn.logLevels.error, createProcessId: function() {
    return ("_my_custom_id_" + counter++);
}});
// NOTE: SERVER IS CLOSED IN THE LAST TEST OPERATION
// NOTE2: Couldn't use setUp, tearDown, because they are called for each test case!
//function closeServer(test) {
  //  server.close(function() {
    //    test.done();
    //});
//}

function createClient() {
    return restify.createJsonClient({url: "http://localhost:" + port});
}

exports.testCreateProcess = function() {

    server.listen(port, function() {

        var startEventMessage = {
            "gugus": "blah"
        };

        var client = createClient();
         client.post('/TaskExampleProcess/MyStart', startEventMessage, function(error, req, res, obj) {
            //compareCreateProcessResult(assert, error, res.statusCode, obj);
            //client.close();
            //test.done();
        });
    });
};

exports.testGetProcess = function() {
    var client = createClient();
    client.get('/TaskExampleProcess/_my_custom_id_0', function(error, req, res, obj) {
      //  compareGetProcessResult(test, error, res.statusCode, obj);
      //  client.close();
      //  test.done();
     });
};

exports.testCreateAnotherProcess = function() {
    var client = createClient();
    client.post('/TaskExampleProcess', function(err, req, res, obj) {
      assert.ifError(err);
console.log('%d -> %j', res.statusCode, res.headers);
console.log('%j', obj);
    });
};

exports.testFindProcessesByProperty = function() {
    var client = createClient();
    client.get('/TaskExampleProcess?myFirstProperty.gugus=blah', function(error, req, res, obj) {
        //compareFindProcessesByPropertyResult(test, error, obj);
        //client.close();
        //test.done();
    });
};

exports.testFindProcessesByState = function() {
    var client = createClient();
    client.get('/TaskExampleProcess?state=MyTask', function(error, req, res, obj) {
        //compareFindProcessesByStateResult(assert, error, obj);
        //client.close();
      //  assert.done();
    });
};

exports.testPutEvent = function() {
    var message = {
        "gugus": "blah"
    };

    var client = createClient();
    client.put('/TaskExampleProcess/_my_custom_id_1/MyStart/_my_message_id_1', message, function(error, req, res, obj) {
        //comparePutEventResult(assert, error, res.statusCode, obj);
        //client.close();
        //test.done();
    });
};

exports.testGetAllProcesses = function() {
    var client = createClient();
    client.get('/TaskExampleProcess', function(error, req, res, obj) {
        //compareGetAllProcessesResult(assert, error, obj);
      //  client.close();
        //closeServer(assert);
    });
};
function compareCreateProcessResult(assert, error, statusCode, result) {

    assert.ok(!error, "testBasicOperations: createProcess: noError");

    assert.ok(statusCode, 201, "testBasicOperations: createProcess: statusCode");

    assert.deepEqual(result,
        {
            "id": "_my_custom_id_0",
            "name": "TaskExampleProcess",
            "link": {
                "rel": "self",
                "href": "/TaskExampleProcess/_my_custom_id_0"
            },
            "state": [
                {
                    "position": "MyTask",
                    "owningProcessId": "_my_custom_id_0"
                }
            ],
            "history": [
                {
                    "name": "MyStart",
                    "type": "startEvent",
                    "begin": "_dummy_ts_",
                    "end": "_dummy_ts_"
                },
                {
                    "name": "MyTask",
                    "type": "task",
                    "begin": "_dummy_ts_",
                    "end": null
                }
            ],
            "properties": {
                "myFirstProperty": {
                    "gugus": "blah"
                }
            }
        },
        "testBasicOperations: createProcess: result"
    );
}

function compareGetProcessResult(assert, error, statusCode, result) {

    assert.ok(!error, "testBasicOperations: getProcess: noError");

    assert.equal(statusCode, 200, "testBasicOperations: createProcess: statusCode");

    assert.deepEqual(result,
        {
            "id": "_my_custom_id_0",
            "name": "TaskExampleProcess",
            "link": {
                "rel": "self",
                "href": "/TaskExampleProcess/_my_custom_id_0"
            },
            "state": [
                {
                    "position": "MyTask",
                    "owningProcessId": "_my_custom_id_0"
                }
            ],
            "history": [
                {
                    "name": "MyStart",
                    "type": "startEvent",
                    "begin": "_dummy_ts_",
                    "end": "_dummy_ts_"
                },
                {
                    "name": "MyTask",
                    "type": "task",
                    "begin": "_dummy_ts_",
                    "end": null
                }
            ],
            "properties": {
                "myFirstProperty": {
                    "gugus": "blah"
                }
            }
        },
        "testBasicOperations: getProcess: result"
    );

}

function compareCreateAnotherProcessResult(assert, error, statusCode, result) {

    assert.ok(!error, "testBasicOperations: createProcess (2): noError");

    assert.equal(statusCode, 201, "testBasicOperations: createProcess: statusCode");

    assert.deepEqual(result,
        {
            "id": "_my_custom_id_1",
            "name": "TaskExampleProcess",
            "link": {
                "rel": "self",
                "href": "/TaskExampleProcess/_my_custom_id_1"
            },
            "state": [],
            "history": [],
            "properties": {}
        },
        "testBasicOperations: createProcess (2): result"
    );
}

function compareGetAllProcessesResult(assert, error, result) {

    assert.ok(!error, "testBasicOperations: getAllProcesses: noError");

    assert.deepEqual(result,
        [
            {
                "id": "_my_custom_id_0",
                "name": "TaskExampleProcess",
                "link": {
                    "rel": "self",
                    "href": "/TaskExampleProcess/_my_custom_id_0"
                },
                "state": [
                    {
                        "position": "MyTask",
                        "owningProcessId": "_my_custom_id_0"
                    }
                ],
                "history": [
                    {
                        "name": "MyStart",
                        "type": "startEvent",
                        "begin": "_dummy_ts_",
                        "end": "_dummy_ts_"
                    },
                    {
                        "name": "MyTask",
                        "type": "task",
                        "begin": "_dummy_ts_",
                        "end": null
                    }
                ],
                "properties": {
                    "myFirstProperty": {
                        "gugus": "blah"
                    }
                }
            },
            {
                "id": "_my_custom_id_1",
                "name": "TaskExampleProcess",
                "link": {
                    "rel": "self",
                    "href": "/TaskExampleProcess/_my_custom_id_1"
                },
                "state": [
                    {
                        "position": "MyTask",
                        "owningProcessId": "_my_custom_id_1"
                    }
                ],
                "history": [
                    {
                        "name": "MyStart",
                        "type": "startEvent",
                        "begin": "_dummy_ts_",
                        "end": "_dummy_ts_"
                    },
                    {
                        "name": "MyTask",
                        "type": "task",
                        "begin": "_dummy_ts_",
                        "end": null
                    }
                ],
                "properties": {
                    "myFirstProperty": {
                        "gugus": "blah"
                    }
                }
            }
        ],
        "testBasicOperations: getAllProcesses: result"
    );

}

function compareFindProcessesByPropertyResult(assert, error, result) {

    assert.ok(!error, "testBasicOperations: compareFindProcessesByPropertyResult: noError");

    assert.deepEqual(result,
        [
            {
                "id": "_my_custom_id_0",
                "name": "TaskExampleProcess",
                "link": {
                    "rel": "self",
                    "href": "/TaskExampleProcess/_my_custom_id_0"
                },
                "state": [
                    {
                        "position": "MyTask",
                        "owningProcessId": "_my_custom_id_0"
                    }
                ],
                "history": [
                    {
                        "name": "MyStart",
                        "type": "startEvent",
                        "begin": "_dummy_ts_",
                        "end": "_dummy_ts_"
                    },
                    {
                        "name": "MyTask",
                        "type": "task",
                        "begin": "_dummy_ts_",
                        "end": null
                    }
                ],
                "properties": {
                    "myFirstProperty": {
                        "gugus": "blah"
                    }
                }
            }
        ],
        "testBasicOperations: compareFindProcessesByPropertyResult: result"
    );

}

function compareFindProcessesByStateResult(assert, error, result) {

    assert.ok(!error, "testBasicOperations: compareFindProcessesByStateResult: noError");

    assert.deepEqual(result,
        [
            {
                "id": "_my_custom_id_0",
                "name": "TaskExampleProcess",
                "link": {
                    "rel": "self",
                    "href": "/TaskExampleProcess/_my_custom_id_0"
                },
                "state": [
                    {
                        "position": "MyTask",
                        "owningProcessId": "_my_custom_id_0"
                    }
                ],
                "history": [
                    {
                        "name": "MyStart",
                        "type": "startEvent",
                        "begin": "_dummy_ts_",
                        "end": "_dummy_ts_"
                    },
                    {
                        "name": "MyTask",
                        "type": "task",
                        "begin": "_dummy_ts_",
                        "end": null
                    }
                ],
                "properties": {
                    "myFirstProperty": {
                        "gugus": "blah"
                    }
                }
            }
        ],
        "testBasicOperations: compareFindProcessesByStateResult: result"
    );

}

function comparePutEventResult(assert, error, statusCode, result) {

    assert.ok(!error, "testBasicOperations: comparePutEventResult: noError");

    assert.equal(statusCode, 201, "testBasicOperations: comparePutEventResult: statusCode");

    assert.deepEqual(result,
        {
            "id": "_my_custom_id_1",
            "name": "TaskExampleProcess",
            "link": {
                "rel": "self",
                "href": "/TaskExampleProcess/_my_custom_id_1"
            },
            "state": [
                {
                    "position": "MyTask",
                    "owningProcessId": "_my_custom_id_1"
                }
            ],
            "history": [
                {
                    "name": "MyStart",
                    "type": "startEvent",
                    "begin": "_dummy_ts_",
                    "end": "_dummy_ts_"
                },
                {
                    "name": "MyTask",
                    "type": "task",
                    "begin": "_dummy_ts_",
                    "end": null
                }
            ],
            "properties": {
                "myFirstProperty": {
                    "gugus": "blah"
                }
            }
        },
        "testBasicOperations: comparePutEventResult: result"
    );
}
