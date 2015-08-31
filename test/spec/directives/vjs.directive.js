/*global describe, beforeEach, module, inject, it, angular, expect */
/*jslint nomen: true */
describe('Directive: vjs.directive.js', function () {
    'use strict';

    // load the directive's module
    beforeEach(module('vjsVideoApp'));

    var vidStr = "<video vjs-video></video>",
        multipleVidStr = "<div><video vjs-video></video><video vjs-video></video></div>",
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

    it('should attach videojs to the video tag', function () {
        //videojs should add at vjs-tech class to the element
        var el = compileAndLink(vidStr, scope);
        expect(el.hasClass('vjs-tech')).to.be.true;
    });

    it('should attach videojs to multiple video tags', function () {
        //videojs should add at vjs-tech class to the element
        var el = compileAndLink(multipleVidStr, scope);
        expect(el[0].querySelectorAll('.vjs-tech').length).to.equal(2);
    });

    it('should throw an error if not attached to a video tag', function () {
        expect(function () {
            var el = compileAndLink(nonVidStr, scope);
        }).to.throw(Error);

        expect(function () {
            var el = compileAndLink(vidStr, scope);
        }).to.not.throw(Error);
    });

    it('should throw an error if videojs is not loaded', function () {
        //TOOD: currently, this must be the last test
        //      because it destroys the reference to videojs
        //      find a way to fix that
        expect(function () {
            var vjs = window.videojs,
                el;

            window.videojs = undefined;
            el = compileAndLink(vidStr, scope);
            window.videojs = vjs;
        }).to.throw(Error);
    });
});
