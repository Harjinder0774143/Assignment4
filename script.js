/*
    Assignment 4
    {Your name here}
*/

$(document).ready(function(){
    // your code here
    getPreviousLocation()
});

//Check already stored geo coordinate or not 
function getPreviousLocation() {
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage
        let previousLocation = getStorageCoordinates()
        if(previousLocation !== null && previousLocation !== undefined) {
            let text = "Latitude: " + previousLocation.lat + "<br>Longitude: " + previousLocation.long;
            document.getElementById("youarehere").innerHTML = text
        }
    } else {
        // No web storage Support.
        document.getElementById("youarehere").innerHTML = "No web storage Support"
    }
}

//get local storage stored coordinates
function getStorageCoordinates () {
    let previousLocation = window.localStorage.getItem('currentLocation');
    if(previousLocation !== null && previousLocation !== undefined) {
        return previousLocation = JSON.parse(previousLocation)
    } else {
        return null
    }
}


//find geo coordinates using navigator
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    document.getElementById("youarehere").innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    let newLat = position.coords.latitude
    let newLong = position.coords.longitude

    if (typeof(Storage) !== "undefined") {

        let previousLocation = getStorageCoordinates()
        if (previousLocation !== null && (newLat !== previousLocation.lat || newLong !== previousLocation.long)) {
            let distance = calcDistance(newLat, newLong, previousLocation.lat, previousLocation.long)
            document.getElementById('distance').innerHTML = 'You traveled ' + parseFloat(distance).toFixed(2) + ' Meter'
        }
        // Code for localStorage
        let currentLocation = JSON.stringify( { "lat": newLat, "long": newLong })
        window.localStorage.setItem('currentLocation', currentLocation);
        document.getElementById("youarehere").innerHTML = "Latitude: " + newLat + "<br>Longitude: " + newLong;
    } else {
        // No web storage Support.
        document.getElementById("youarehere").innerHTML = "No web storage Support"
    }
}

// function to calculate the distance in metres between two lat/long pairs on Earth
// Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
// Aren't those cool variable names? Yah gotta love JavaScript

function calcDistance(lat1, lon1, lat2, lon2){
    var toRadians = function(num) {
        return num * Math.PI / 180;
    }
    var R = 6371000; // radius of Earth in metres
    var ??1 = toRadians(lat1);
    var ??2 = toRadians(lat2);
    var ???? = toRadians(lat2-lat1);
    var ???? = toRadians(lon2-lon1);

    var a = Math.sin(????/2) * Math.sin(????/2) + Math.cos(??1) * Math.cos(??2) * Math.sin(????/2) * Math.sin(????/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return ( R * c );
}


