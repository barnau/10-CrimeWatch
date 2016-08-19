(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['DataFactory', '$stateParams', 'geocoder', '$scope'];

    /* @ngInject */
    function MainController(DataFactory, $stateParams, geocoder, $scope) {
        var vm = this;
        vm.title = 'MainController';
        vm.test = 'this is a test from MainController';
        vm.options = { scrollwheel: false };
        vm.markers = [];
        vm.isDetailsShowing = false;
        vm.detail = {};
        vm.my_place_id = "ChIJdd4hrwug2EcRmSrV3Vo6llI";
        

        vm.map = { center: { latitude: 32.7157, longitude: -117.1611 }, zoom: 12, };

        vm.markers = {
            models: [],
            coordsKey: "position",
            idKey: "id",
            optionsKey: "options",
            events: {
                click: function(marker, eventName, model) {
                    debugger;

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

                    $scope.$apply();
                }
            }
        };
        

        DataFactory.getCrimeData().then(
            function(response) {
                vm.crimeData = response.data;

                pushCrimeDataToMarkersModel(vm.crimeData);

            },
            function(error) {
                vm.error = error;
            }
        );



        var filterCrimeDataByType = function(crimeDataArray, type) {
            var rArr = [];


            if(type !="all") {

            crimeDataArray.forEach(function(crimeSet) {

                if(crimeSet.type == type) {
                    
                    rArr.push(crimeSet);
                    }

                }

            );

            return rArr;
            } else {
                return vm.crimeData;
            }

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

        vm.pushFilteredMarkers= function(type) {

            var tempArray = angular.copy(vm.crimeData);
            

            tempArray = filterCrimeDataByType(tempArray, type);
            console.log(tempArray);

            vm.markers.models = [];

            pushCrimeDataToMarkersModel(tempArray);


        }

        vm.setMapCenter = function() {
            console.log(vm.out.geometry.location.lat());

            var x = vm.out.geometry.location.lat();
            var y = vm.out.geometry.location.lng();

            angular.extend(vm.map, { center: { latitude: x, longitude: y }, zoom: 12 });
            
        }


        


        activate();

        ////////////////

        function activate() {}
    }
})();
