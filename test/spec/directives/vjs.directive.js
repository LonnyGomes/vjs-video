'use strict';

describe('Directive: vjs.directive.js', function () {

  // load the directive's module
  beforeEach(module('vjsVideoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vjs.directive.js></vjs.directive.js>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the vjs.directive.js directive');
  }));
});
