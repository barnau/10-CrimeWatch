(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['DataFactory'];

    /* @ngInject */
    function MainController(DataFactory, $stateParams) {
        var vm = this;
        vm.title = 'MainController';
        vm.test = 'this is a test from MainController';
        vm.options = {scrollwheel: false};
        vm.markers = [];

       vm.map = { center: { latitude: 32.7157, longitude: -117.1611 }, zoom: 8 };

       vm.markers = {
        models: [],
        coordsKey: "position",
        idKey: "id",
        optionsKey: "options"
    };

       DataFactory.getCrimeData().then(
            function(response) {
                vm.crimeData = response.data;
                console.log(vm.crimeData);

                vm.crimeData.forEach(function(crime, index) {
                    vm.markers.models.push({ 
                            position: {
                                latitude : crime.lat,
                                longitude : crime.lon
                            },
                            options: {
                                title: crime.type,
                                animation: google.maps.Animation.DROP
                            },
                            id: index

                    });

                });

                console.log(vm.markers);



            },
            function(error) {
                vm.error = error;
            }
        );
        


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