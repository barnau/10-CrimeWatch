(function() {
    'use strict';

    angular
        .module('app')
        .controller('SecondaryController', SecondaryController);

    SecondaryController.$inject = ['DataFactory', '$stateParams'];

    /* @ngInject */
    function SecondaryController(DataFactory, $stateParams) {
        var vm = this;
        vm.title = 'SecondaryController';
        vm.test = 'this is a test from SecondaryController';

       
        


        // MovieFactory.getMovieDetailData(vm.movieName).then(
        //     function(response) {
        //         console.log(response.data);
        //         vm.movieDetails = response.data;

        // });
        
        
        activate();

        ////////////////

        function activate() {
        }
    }
})();