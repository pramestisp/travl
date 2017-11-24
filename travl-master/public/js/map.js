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
    lat: -7.8030745,
    lng: 110.357382
}

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
    var marker = new google.maps.Marker({
        position: mark1,
        map: map
    });
    var map = new google.maps.Map(document.getElementById("map"),mapOptions);
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