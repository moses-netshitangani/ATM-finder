// Initializing HERE maps platform
const appid = 'atv7oByWKH2AxK60DqTf';
const apikey = 'NMv1ZzOrXhl_P9fbAuennDekhdoGt3EK6K5ZsPjiYPo';


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
        defaultLayers.vector.normal.map.setMax(17);

        // Instantiate (and display) a map object:
        let map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
                zoom: 15,
                center: { lat: lati, lng: lon }
            });

        // Marking user's current location on map
        map.addObject(new H.map.Marker({ lat: lati, lng: lon}));


        // Create the parameters for the routing request:
        // var routingParameters = {
        //     'routingMode': 'fast',
        //     'transportMode': 'pedestrian',
        //     // The start point of the route:
        //     'origin': `${lat},${lon}`,
        //     // The end point of the route:
        //     'destination': '-26.2697,27.6947',
        //     // Include the route shape in the response
        //     'return': 'polyline'
        // };

        // Define a callback function to process the routing response:
        var onResult = function (result) {
            // ensure that at least one route was found
            if (result.routes.length) {
                result.routes[0].sections.forEach((section) => {
                    // Create a linestring to use as a point source for the route line
                    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                    // Create a polyline to display the route:
                    let routeLine = new H.map.Polyline(linestring, {
                        style: { strokeColor: 'aqua', lineWidth: 2 }
                    });

                    // Create a marker for the start point:
                    let startMarker = new H.map.Marker(section.departure.place.location);

                    // Create a marker for the end point:
                    let endMarker = new H.map.Marker(section.arrival.place.location);

                    // Add the route polyline and the two markers to the map:
                    map.addObjects([routeLine, startMarker, endMarker]);

                    // Set the map's viewport to make the whole route visible:
                    map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
                });
            }
        };

        // Get an instance of the routing service version 8:
        var router = platform.getRoutingService(null, 8);

        // Call calculateRoute() with the routing parameters,
        // the callback and an error callback function (called if a
        // communication error occurs):
        router.calculateRoute(routingParameters, onResult,
            function (error) {
                alert(error.message);
            });

    })
}
render();

