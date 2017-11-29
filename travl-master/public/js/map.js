/*
    CITY LAT & LNG
*/
var yk ={
    lat: -7.797068,
    lng: 110.370529
};

var mgl ={
    lat: -7.47056,
    lng: 110.21778
};

var solo ={
    lat: -7.550676,
    lng: 110.828316
};

let city ={
    lat: 0,
    lng: 0
};

/*
    VARIABLE DECLARATION
*/
var map;
var infowindow;
var _ul = document.getElementById("list");
var _content = "";
var arrayResults = [];
var userPos;

// SET CITY'S LAT & LNG FROM PASSED VALUE
function getVal(){
    var getLoc = GET["cityVal"];
    if(getLoc == 3){
        city.lat = yk.lat;
        city.lng = yk.lng;
    }
    if(getLoc == 1){
        city.lat = mgl.lat;
        city.lng = mgl.lng;
    }
    if(getLoc == 2){
        city.lat = solo.lat;
        city.lng = solo.lng;
    }
}

function loadMap() {

    // GENERATE MAP
    var mapOptions = {
        center:new google.maps.LatLng(city.lat, city.lng), 
        zoom:12, 
        mapTypeId:google.maps.MapTypeId.ROADMAP
    }; 
    map = new google.maps.Map(document.getElementById("map"),mapOptions);

    // INIT INFOWINDOW
    infowindow = new google.maps.InfoWindow();

    // SEARCH PLACES
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: city,
        radius: 20000,
        type: ['museum']
    }, callback);

    service.nearbySearch({
        location: city,
        radius: 20000,
        type: ['hindu_temple']
    }, callback);

    service.nearbySearch({
        location: city,
        radius: 20000,
        type: ['amusement_park']
    }, callback);
}

// COMPILE SEARCH RESULT
function callback(results, status){
    if(status === google.maps.places.PlacesServiceStatus.OK){
        for(var i=0; i<results.length; i++){
            addResults(results[i]);
            createMarker(results[i]);
            _content += "<a onclick='loadFunc("+i+")'><li>"+results[i].name.toString()+"</li></a>";
        }
        _ul.innerHTML = _content;
    }
}

// PUSH NEW PLACE TO SINGLE ARRAY
function addResults(res){
    arrayResults.push(res);
}

// RE-CENTER MAP ONCLICKED PLACE
function loadFunc(i){
    map.setZoom(20);
    map.panTo(arrayResults[i].geometry.location);
}

// DETERMINE USER POSITION
navigator.geolocation.getCurrentPosition(function(position) {
    userPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    locationChecker();
});

// CHECK IF USER'S POS EQUAL TO ONE OF PLACES - FOR CHECK IN PURPOSES
function locationChecker(){
    userPos = new google.maps.LatLng(userPos.lat, userPos.lng);
    for(var i=0; i<arrayResults.length; i++){
        if(arrayResults[i].geometry.location == userPos){
            console.log("You're here!");
        }
    }
}

// CREATE MARKER OF PLACES
function createMarker(place){
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    // SHOW INFOWINDOW WHEN MARKER IS CLICKED
    google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}


// PASSING VALUES VIA URL
var GET = {};
var query = window.location.search.substring(1).split("&");
for (var i = 0, max = query.length; i < max; i++)
{
    if (query[i] === "") // TRAILING CHECK & NO PARAMETER
        continue;

    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
}