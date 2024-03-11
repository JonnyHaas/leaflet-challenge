// Initialize the Leaflet map.
// - `L.map('map')` targets the <div> with an id of 'map' in your HTML where the map will be rendered.
// - The `setView` method initializes the map's center. Here, [20, 0] centers the map at latitude 20 and longitude 0 (near the equator), providing a good starting view of the Earth.
// - Zoom level 2 is chosen to show the entire globe without zooming in too much or too little.
// - `maxBounds` are set to the geographical bounds of the world, preventing the user from panning beyond the visible Earth.
var myMap = L.map('map', {
    center: [20, 0],
    zoom: 2,
    maxBounds: [[-90, -180], [90, 180]]
});

// Add a tile layer to the map using OpenStreetMap tiles.
// - Tiles are the images you see that make up the map's background. OpenStreetMap provides these for free.
// - `attribution` gives credit to OpenStreetMap, which is a requirement for using their free service.
// - `noWrap: true` prevents the map tiles from repeating horizontally, ensuring only one copy of the world is shown.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    noWrap: true
}).addTo(myMap);

// Function to determine marker size based on the earthquake's magnitude.
// This makes the visual representation of earthquakes more informative - larger magnitudes result in larger markers.
function getMarkerSize(magnitude) {
    return magnitude * 2; // Multiplying by 5 scales the marker size in a visually distinct manner.
}

// Function to determine marker color based on the earthquake's depth.
// Deeper earthquakes are often more significant, so this function assigns colors that get darker with depth.
function getMarkerColor(depth) {
    // The function uses a series of conditional (ternary) operators to select a color based on the depth value.
    return depth > 90 ? '#d73027' : // red for the deepest earthquakes
           depth > 70 ? '#fc8d59' : // orange-red for deep
           depth > 50 ? '#fee08b' : // yellow for mid-depth
           depth > 30 ? '#d9ef8b' : // light green for shallow
           depth > 10 ? '#91cf60' : // green for very shallow
                        '#1a9850';  // dark green for surface earthquakes
}

// Specify the URL to fetch GeoJSON data for all earthquakes in the past month from the USGS.
// GeoJSON is a format for encoding geographic data structures.
const earthquakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

// Fetch and process the earthquake GeoJSON data.
// - `fetch(earthquakeData)` makes an HTTP request to the URL and returns a promise that resolves with the response.
fetch(earthquakeData)
.then(response => response.json()) // Converts the response from JSON to a JavaScript object.
.then(data => {
    // Use L.geoJson to add the earthquake data to the map.
    // - `pointToLayer` converts each GeoJSON point into a Leaflet layer. Here, circle markers are used.
    // - Circle markers are styled based on the earthquake's magnitude (for size) and depth (for color).
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getMarkerSize(feature.properties.mag),
                fillColor: getMarkerColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        // `onEachFeature` is used to bind a popup to each feature (earthquake) marker.
        // The popup displays the earthquake's magnitude, location, and depth when clicked.
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}<br>Depth: ${feature.geometry.coordinates[2]} km`);
        }
    }).addTo(myMap); // Adds the GeoJSON layer to the map.
});

// Add a legend to the map to explain the color coding of the earthquake depths.
var legend = L.control({position: 'bottomright'}); // Places the legend in the bottom right corner of the map.

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        depths = [-10, 10, 30, 50, 70, 90], // Depth ranges used in the color function.
        labels = []; // An array to hold the HTML for each range's legend item.

    // Loops through the depth intervals and generates a colored square for each interval.
    depths.forEach((depth, index) => {
        div.innerHTML += 
        '<i style="background:' + getMarkerColor(depth + 1) + '"></i> ' +
        depths[index] + (depths[index + 1] ? '&ndash;' + depths[index + 1] + '<br>' : '+');
    });

    return div; // Returns the legend's HTML to be added to the map.
};

legend.addTo(myMap); // Adds the legend to the map.
