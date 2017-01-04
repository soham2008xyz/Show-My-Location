/**
 * Created by soham on 04-01-2017.
 */

angular.module('map.controllers', [])

.controller('HomeController', HomeController);

function HomeController($scope, $cordovaGeolocation) {

  $scope.locate = function () {
    var posOptions = {
      timeout: 10000,
      enableHighAccuracy: true
    };
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;

        //$scope.$apply(function () {
        console.log(lat, long);
        var myLatlng = new google.maps.LatLng(lat, long);
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        var latlng = {
          lat: lat,
          lng: long
        };
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
              //map.setZoom(11);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              map.setCenter(latlng);
              infowindow.setContent(results[1].formatted_address);
              infowindow.open(map, marker);
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        });
        //});
      }, function(err) {
        // error
      });
  };
}
