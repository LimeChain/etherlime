var test = require('tape');
var App = require('../lib/index');

var defaultProtocol = 'https';
if (typeof window !== 'undefined' && window.navigator.userAgent.indexOf('MSIE') > -1) {
  defaultProtocol = document.location.protocol.replace(':', '');
}

test('Constructor', function(t) {
  var app = new App();

  t.equal(app instanceof App, true,
    'should return a new instance of the app');

  t.end();
});

test('.configure()', function(t){
  var app = new App().configure({
    projectId: '123',
    protocol: 'http',
    host: 'none'
  });

  t.equal(app.config.projectId, '123',
    'should set provided projectId');

  t.equal(app.config.protocol, 'http',
    'should set provided protocol');

  t.equal(app.config.host, 'none',
    'should set provided host');

  app.configure({
    projectId: '456',
    host: 'mydomain.com'
  });

  t.equal(app.config.projectId, '456',
    'should set provided projectId');

  t.equal(app.config.host, 'mydomain.com',
    'should set provided host');

  t.end();
});

test('.masterKey()', function(t){
  var app = new App({
    masterKey: '123'
  });

  t.equal(app.masterKey(), '123',
    'Should get the correct masterKey value');

  app.masterKey('456');

  t.equal(app.masterKey(), '456',
    'Should set the correct masterKey value');

  t.end();
});

test('.projectId()', function(t){
  var app = new App({
    projectId: '123'
  });

  t.equal(app.projectId(), '123',
    'Should get the correct projectId value');

  app.projectId('456');

  t.equal(app.projectId(), '456',
    'Should set the correct projectId value');

  t.end();
});

test('.resources()', function(t){
  var app = new App();

  t.equal(app.resources()['base'], '{protocol}://{host}',
    'Should have the correct \'base\' resource');

  app.resources({
    'new': '{protocol}://{host}/my_api'
  });

  t.equal(app.resources()['new'], '{protocol}://{host}/my_api',
    'Should set a \'new\' resource');

  app.resources({
    'new': null
  });

  t.equal(app.resources()['new'], null,
    'Should unset a \'new\' resource');

  t.end();
});

test('.url()', function(t){
  var app = new App({
    projectId: '123'
  });

  t.equal(app.url('base'), defaultProtocol + '://' + app.config.host,
    'Should return the correct URL for the \'base\' resource');

  t.equal(app.url('projectId'), defaultProtocol + '://' + app.config.host + '/3.0/projects/123',
    'Should return the correct URL for the \'projectId\' resource');

  t.equal(app.url('base', { key: true }), defaultProtocol + '://' + app.config.host + '?key=true',
    'Should return the correct URL with provided query params');

  t.equal(app.url('events', undefined), app.url('events'),
    'Should return the correct URL when second argument is undefined');

  t.end();
});

test('.extendLibrary()', function(t){
  var test = {
    'boolean': true,
    'function': function(){},
    'number': 123,
    'object': {
      'nested': {
        'value': 987
      }
    },
    'resources': {},
    'string': 'some-string',
    'prototype': {
      'method': function(a, b){ return a + b; }
    }
  };
  App.extendLibrary(App, test);
  t.equal(App.boolean, test.boolean,
    'Should return an inherited boolean');
  t.equal(App.function, test.function,
    'Should return an inherited function');
  t.equal(App.number, test.number,
    'Should return an inherited number');
  t.equal(App.string, test.string,
    'Should return an inherited string');
  t.equal(App.object.nested.value, test.object.nested.value,
    'Should return an inherited object');
  t.equal(App.prototype.method, test.prototype.method,
    'Should return an inherited prototype method');

  var app = new App();
  t.equal(app.method(1, 2), 3,
    'Should return an appropriate value from the prototype method');
});
