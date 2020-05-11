// Initializing HERE maps platform
const appid = 'atv7oByWKH2AxK60DqTf';
const apikey = 'NMv1ZzOrXhl_P9fbAuennDekhdoGt3EK6K5ZsPjiYPo';

// fetch(`https://cors-anywhere.herokuapp.com/https://revgeocode.search.hereapi.com/v1/revgeocode?xnlp=CL_JSMv3.1.15.2&apikey=NMv1ZzOrXhl_P9fbAuennDekhdoGt3EK6K5ZsPjiYPo&at=-26.271%2C27.89%2C50`)
// .then(result => result = result.json())
// .then(res => console.log(res));

let platform = new H.service.Platform({
    'useCIT': true,
    'app_id': appid,
    'apikey': 'NMv1ZzOrXhl_P9fbAuennDekhdoGt3EK6K5ZsPjiYPo',
    'useHTTPS': true
});

// Reverse geocoding service
let service = platform.getSearchService();
let lat, lon;

let render = () => {
    navigator.geolocation.getCurrentPosition(position => {
        lati = position.coords.latitude;
        lati = lati.toFixed(3);
        lon = position.coords.longitude;
        lon = lon.toFixed(3);

        // Obtain the default map types from the platform object:
        let defaultLayers = platform.createDefaultLayers();

        // Instantiate (and display) a map object:
        let map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
                zoom: 5,
                center: { lat: lati, lng: 27.89 }
            });
        // Marking user's current location on map
        map.addObject(new H.map.Marker({lat: lati, lng: lon}));

    })
}
render();

