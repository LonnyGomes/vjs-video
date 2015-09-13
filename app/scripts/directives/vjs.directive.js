/*global angular */

/**
 * @ngdoc directive
 * @name vjsVideoApp.directive:vjs.directive.js
 * @description
 * # vjs.directive.js
 */
(function () {
    'use strict';

    var module = angular.module('vjs.video', []);

    function getVidElement(element, isContainer) {
        var vid = null,
            videos;

        if (!window.videojs) {
            throw new Error('video.js was not found!');
        }

        if (isContainer) {
            videos = element[0].getElementsByTagName('video');
            if (videos.length === 0) {
                throw new Error('video tag must be defined within container directive!');
            } else if (videos.length > 1) {
                throw new Error('only one video can be defined within the container directive!');
            }

            vid = videos[0];
        } else {
            if (element[0].nodeName === 'VIDEO') {
                vid = element[0];
            } else {
                throw new Error('directive must be attached to a video tag!');
            }
        }

        return vid;
    }

    function initVideoJs(vid, scope, setupOptions) {
        var opts = setupOptions || {};

        if (!window.videojs) {
            return null;
        }

        //bootstrap videojs
        window.videojs(vid, opts, function () {

        });

        //dispose of videojs before destroying directive
        scope.$on('$destroy', function () {
            window.videojs(vid).dispose();
        });
    }

    module.directive('vjsVideo', function () {
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                vjsSetup: '='
            },
            link: function postLink(scope, element, attrs, ctrl, transclude) {
                var vid = getVidElement(element);

                //attach transcluded content
                transclude(function (content) {
                    element.append(content);
                });

                initVideoJs(vid, scope, scope.vjsSetup);
            }
        };
    });

    module.directive('vjsVideoContainer', function () {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'scripts/directives/vjs.container.html',
            scope: {
                vjsSetup: '='
            },
            link: function postLink(scope, element, attrs, ctrl) {
                var vid = getVidElement(element, true);

                initVideoJs(vid, scope, scope.vjsSetup);
            }
        };
    });
}());
