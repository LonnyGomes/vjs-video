/*global angular */

/**
 * @ngdoc directive
 * @name vjsVideoApp.directive:vjs.directive.js
 * @description
 * # vjs.directive.js
 */
angular.module('vjs.video', [])
    .directive('vjsVideo', function () {
        'use strict';

        return {
            restrict: 'A',
            transclude: true,
            link: function postLink(scope, element, attrs, ctrl, transclude) {
                var vid = null;
                if (element[0].nodeName === 'VIDEO') {
                    vid = element[0];
                }

                if (vid) {
                    if (window.videojs) {
                        //attach transcluded content
                        transclude(function (content) {
                            element.append(content);
                        });

                        //bootstrap videojs
                        window.videojs(vid, {
                            //options
                        }, function () {

                        });

                        //dispose of videojs before destroying directive
                        scope.$on('$destroy', function () {
                            window.videojs(vid).dispose();
                        });
                    } else {
                        throw new Error('video.js was not found!');
                    }
                } else {
                    throw new Error('directive must be attached to a video tag!');
                }
            }
        };
    });
