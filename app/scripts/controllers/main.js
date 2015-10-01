/*global angular */
/**
 * @ngdoc function
 * @name vjsVideoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vjsVideoApp
 */
angular.module('vjsVideoApp')
    .controller('MainCtrl', ['$scope', function (scope) {
        'use strict';
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        scope.options = {
            loop: true
        };

        scope.media = {
            sources: [
                {
                    src: 'http://video-js.zencoder.com/oceans-clip.mp4',
                    type: 'video/mp4'
                },
                {
                    src: 'http://video-js.zencoder.com/oceans-clip.webm',
                    type: 'video/webm'
                }
            ],
            tracks: []
        };

        scope.$on('vjsVideoReady', function (e, data) {
            //data contains `id` and `vid`
        });
    }]);
