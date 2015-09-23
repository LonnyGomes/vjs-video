'use strict';

/**
 * @ngdoc function
 * @name vjsVideoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vjsVideoApp
 */
angular.module('vjsVideoApp')
    .controller('MainCtrl', ['$scope', function (scope) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        scope.options = {
            loop: true
        };

        scope.$on('vjsVideoReady', function (e, data) {
            console.log('Received vjs instance:', data);
        });
    }]);
