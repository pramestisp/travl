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
var arrayResults0 = [];
var arrayResults1 = [];
var arrayResults2 = [];
var userPos;
var markTest = {lat:"",lng:""};

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
    
    markTest = new google.maps.LatLng({
        lat: -7.7695634,
        lng: 110.3741336
         
    });
    var markerTest = new google.maps.Marker({
        map: map,
        position: markTest
    });

    // INIT INFOWINDOW
    infowindow = new google.maps.InfoWindow();

    // SEARCH PLACES
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: city,
        radius: 20000,
        type: ['museum']
    }, callback0);

    service.nearbySearch({
        location: city,
        radius: 20000,
        type: ['hindu_temple']
    }, callback1);

    service.nearbySearch({
        location: city,
        radius: 20000,
        type: ['amusement_park']
    }, callback2);

}

// COMPILE SEARCH RESULT
function callback0(results, status){
    if(status === google.maps.places.PlacesServiceStatus.OK){
        for(var i=0; i<results.length; i++){
            arrayResults[i] = results[i];
            createMarker(results[i]);
            _content += "<li><a onclick='loadFunc("+i+")' class='btn btn-small wrapper '>"+results[i].name.toString()+" </a></li>";  
        }
        _ul.innerHTML = _content;
    }
}

function callback1(results, status){
    if(status === google.maps.places.PlacesServiceStatus.OK){
        for(var i=0; i<results.length; i++){
            arrayResults[i+results.length] = results[i];
            createMarker(results[i]);
            _content += "<li><a onclick='loadFunc("+(i+results.length)+")' class='btn btn-small wrapper '>"+results[i].name.toString()+" </a></li>";
            
        }
        _ul.innerHTML = _content;
    }
}

function callback2(results, status){
    if(status === google.maps.places.PlacesServiceStatus.OK){
        for(var i=0; i<results.length; i++){
            arrayResults[i+(results.length*2)] = results[i];
            createMarker(results[i]);
            _content += "<li><a onclick='loadFunc("+(i+(results.length*2))+")' class='btn btn-small wrapper '>"+results[i].name.toString()+" </a></li>";
            
        }
        _ul.innerHTML = _content;
    }
}


// RE-CENTER MAP ONCLICKED PLACE
function loadFunc(i){
    map.setZoom(20);
    map.panTo(arrayResults[i].geometry.location);
}



// DETERMINE USER POSITION
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
        userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(userPos.lat+" "+userPos.lng);
        locationChecker();
    });
} else {
    alert("Geolocation is not supported by this browser.");
}

// CHECK IF USER'S POS EQUAL TO ONE OF PLACES - FOR CHECK IN PURPOSES
function locationChecker(){
    userPos = new google.maps.LatLng(userPos.lat, userPos.lng);  
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