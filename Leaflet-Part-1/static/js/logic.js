// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    // magnitude = feature.properties.mag
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><h3>Magnitude: ${feature.properties.mag}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }
  function createCircles(feature){
    magnitude = feature.properties.mag
  // - set color based on magnitude
    var circleColor = '';
  
    if (magnitude > 5){
      circleColor = '#ff0000';
    }
    else if (magnitude > 4){
      circleColor = '#ff4000';
    }
    else if (magnitude > 3){
      circleColor = '#ff8000';
    }
    else if (magnitude > 2){
      circleColor = '#ffbf00';
    }
    else {
      circleColor = '#bfff00';
    }

    // - set geojsonMarkerOptions (radius based magnitude)
    var geojsonMarkerOptions = {
      radius: magnitude *10,
      fillColor: circleColor,
      color: circleColor,
      fillOpacity: feature.geometry.coordinates[2]/15
    };
  // - var latlng based on feature.geometry.coordinates[1], feature...[0]
    var latlng = L.latLng([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
  // - return L.circleMarker(latlng, geojsonMarkerOptions)
    return L.circleMarker(latlng, geojsonMarkerOptions);
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  };
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: createCircles
  });
  
  // Send our earthquakes layer to the createMap function/
//   createMap(earthquakes, earthquakeData);
// }

// function createMap(earthquakes, earthquakeData) {

    // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  
  // var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  //     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  // });
  
    // Create a baseMaps object.
    // var baseMaps = {
    //   "Street Map": street,
    //   "Topographic Map": topo
    // };
  
    // // Create an overlay object to hold our overlay.
    // var overlayMaps = {
    //   Earthquakes: earthquakes
    // };

      // Create our map, giving it the streetmap and earthquakes layers to display on load.
var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
});

// function markerSize(mag) {
//     return mag;
// };
    // function onEachFeature(feature, layer) {   
    // // for (var i = 0; i < features.length; i++) {
    //     L.circle(feature.geometry.coordinates, {
    //     fillOpacity: 0.75,
    //     color: "white",
    //     fillColor: "red",
    //     // Setting our circle's radius to equal the output of our markerSize() function:
    //     radius: markerSize(feature.properties.mag)
    //     })
    // };
  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

}