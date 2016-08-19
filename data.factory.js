(function() {
    'use strict';

    angular
        .module('app')
        .factory('DataFactory', DataFactory);

    DataFactory.$inject = ['$http'];

    /* @ngInject */
    function DataFactory($http) {
        var service = {
            getCrimeData: getCrimeData
           
        };
        return service;

        ////////////////
        

        function getCrimeData() {
        	return $http.get('app/mock/crimeData.json');
            
        };

        /*function getMovieDetailData(title) {
           // return $http.get('http://www.omdbapi.com/?t=' + title + '&r=json&type=movie');
        }*/
    }
})();