(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['DataFactory', '$stateParams'];

    /* @ngInject */
    function MainController(DataFactory, $stateParams) {
        var vm = this;
        vm.title = 'MainController';
        vm.test = 'this is a test from MainController';
        vm.options = { scrollwheel: false };
        vm.markers = [];
        vm.isDetailsShowing = false;
        vm.detail = {};
        

        vm.map = { center: { latitude: 32.7157, longitude: -117.1611 }, zoom: 12, };

        vm.markers = {
            models: [],
            coordsKey: "position",
            idKey: "id",
            optionsKey: "options",
            events: {
                click: function(marker, eventName, model) {
                    vm.isDetailsShowing = true;

                    if(model.position.type === 'Burglary') {
                            vm.detail.pic = "burglary.png";
                    } else if(model.position.type === 'Assault') {
                            vm.detail.pic = "assault.png";
                    } else if(model.position.type === 'Arrest') {
                            vm.detail.pic = "arrest.png";
                    } else if(model.position.type === 'Other') {
                            vm.detail.pic = "other.png";
                    } else if(model.position.type === 'Theft') {
                            vm.detail.pic = "theft.png";
                    } else if(model.position.type === 'Robbery') {
                            vm.detail.pic = "robbery.png";
                    } else if(model.position.type === 'Arson') {
                            vm.detail.pic = "arson.png";
                    } else if(model.position.type === 'Vandalism') {
                        vm.detail.pic = "vandalism.png";
                    }
                    
                    vm.detail.address = model.position.address;
                    vm.detail.story = model.position.crimeID;
                    vm.detail.category = model.position.type;
                }
            }
        };

        

        

        DataFactory.getCrimeData().then(
            function(response) {
                vm.crimeData = response.data;

                pushCrimeDataToMarkersModel(vm.crimeData);

                

                

                // vm.crimeData.forEach(function(crime, index) {
                //     vm.markers.models.push({
                //         position: {
                //             latitude: crime.lat,
                //             longitude: crime.lon,
                //             address: crime.address,
                //             type: crime.type,
                //             crimeID: crime.crimeID
                //         },
                //         options: {
                //             // title: crime.type,
                //             animation: google.maps.Animation.DROP,
                //             label: crime.type

                //         },
                //         id: index
                //     });
                // });
            },
            function(error) {
                vm.error = error;
            }
        );



        var filterCrimeDataByType = function(crimeDataArray, type) {
            var rArr = [];
            crimeDataArray.forEach(function(crimeSet) {
                if(crimeSet.type == type) {
                    
                    rArr.push(crimeSet);
                }

                
                return rArr;
            });



        };


        

        var pushCrimeDataToMarkersModel = function(crimeDataArray) {

            crimeDataArray.forEach(function(crime, index) {
                    vm.markers.models.push({
                        position: {
                            latitude: crime.lat,
                            longitude: crime.lon,
                            address: crime.address,
                            type: crime.type,
                            crimeID: crime.crimeID
                        },
                        options: {
                            // title: crime.type,
                            animation: google.maps.Animation.DROP,
                            label: crime.type

                        },
                        id: index
                    });
                });

        };



        


        activate();

        ////////////////

        function activate() {}
    }
})();
