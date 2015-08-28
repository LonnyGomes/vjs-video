/*global describe, beforeEach, module, inject, it, angular, expect */
/*jslint nomen: true */
describe('Directive: vjs.directive.js', function () {
    'use strict';

    // load the directive's module
    beforeEach(module('vjsVideoApp'));

    var vidStr = "<video vjs-video></video>",
        nonVidStr = "<div vjs-video>",
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

    it('should throw an error if not attached to a video tag', function () {
        expect(function () {
            var el = compileAndLink(nonVidStr, scope);
        }).to.throw(Error);

        expect(function () {
            var el = compileAndLink(vidStr, scope);
        }).to.not.throw(Error);
    });

    it('should throw an error if videojs is not loaded', function () {
        expect(function () {
            var vjs = window.videojs,
                el;

            window.videojs = undefined;
            el = compileAndLink(vidStr, scope);
            window.videojs = vjs;
        }).to.throw(Error);
    });
});
