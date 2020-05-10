// Initializing HERE maps platform
const appid = 'atv7oByWKH2AxK60DqTf';
const apikey = 'NMv1ZzOrXhl_P9fbAuennDekhdoGt3EK6K5ZsPjiYPo';

let platform = new H.service.Platform({
    'apikey': 'NMv1ZzOrXhl_P9fbAuennDekhdoGt3EK6K5ZsPjiYPo'
});

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
        zoom: 10,
        center: { lat: -26.26, lng: 27.89 }
    });