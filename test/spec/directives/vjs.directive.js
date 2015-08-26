/*global describe, beforeEach, module, inject, it, angular, expect */
/*jslint nomen: true */
describe('Directive: vjs.directive.js', function () {
    'use strict';

    // load the directive's module
    beforeEach(module('vjsVideoApp'));

    var nonVidStr = "<div vjs-video>",
        scope,
        $compile;

    beforeEach(inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
    }));

    function compileAndLink(htmlStr, s) {
        var el = angular.element(htmlStr);

        el = $compile(el)(s);
        scope.$digest();

        return el;
    }

    it('should make hidden element visible', inject(function ($compile) {

        expect(function () {
            var el = compileAndLink(nonVidStr, scope);
        }).to.throw(Error);
    }));
});
