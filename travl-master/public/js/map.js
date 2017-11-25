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

var mark1 ={
    lat: -7.801575,
    lng: 110.365594
}

var mark2 ={
    lat: -7.797068,
    lng: 110.370529
}

var map;
var infowindow;
var _ul = document.getElementById("list");
var _content = "";

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
    var mapOptions = {
        center:new google.maps.LatLng(city.lat, city.lng), 
        zoom:12, 
        mapTypeId:google.maps.MapTypeId.ROADMAP
    }; 
    map = new google.maps.Map(document.getElementById("map"),mapOptions);
    
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: city,
        radius: 500,
        type: ['store']
    }, callback);
}

function callback(results, status){
    if(status === google.maps.places.PlacesServiceStatus.OK){
        console.log(results.length);
        for(var i=0; i<results.length; i++){
            createMarker(results[i]);
            _content += "<li>"+results[i].name.toString()+"</li>";
        }
        _ul.innerHTML = _content;
    }
}

function createMarker(place){
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}


// passing values via url
var GET = {};
var query = window.location.search.substring(1).split("&");
for (var i = 0, max = query.length; i < max; i++)
{
    if (query[i] === "") // check for trailing & with no param
        continue;

    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
}