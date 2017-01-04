/**
 * Created by soham on 04-01-2017.
 */

angular.module('map.controllers', [])

.controller('HomeController', HomeController);

function HomeController($scope, $cordovaGeolocation) {
  function initialize() {

    $scope.map = map;
  }

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
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'My Location'
          });

        //});
      }, function(err) {
        // error
      });
  };
}
