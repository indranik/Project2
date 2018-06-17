const mapboxToken = "pk.eyJ1IjoiaW5kcmFuaWsiLCJhIjoiY2pod202dXZ3MDJpNDNxbnRpdnF0Y3hwMiJ9.G-Msbu1I25lI-ZKiIcEIhA";

// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=" + mapboxToken, {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18
});

// Define variables for our tile layers
var satiliteMap = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=' + mapboxToken,{
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18
  }
);



// Only one base layer can be shown at a time
var baseMaps = {
  Satilite: satiliteMap,
  Light: lightmap
};

// Overlays that may be toggled on or off
var overlayMaps = {
 // Cities: cityLayer,
};

// Create map object and set default layers
var myMap = L.map('map-id', {
  center: [38.95, -77.38],
  zoom: 13,
  layers: [satiliteMap]
}); 

var icons = {
  RESIDENTIAL: L.ExtraMarkers.icon({
    //icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  OFFICE: L.ExtraMarkers.icon({
   // icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  RETAIL: L.ExtraMarkers.icon({
    //icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  HOTEL: L.ExtraMarkers.icon({
    //icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  INSTITUTIONAL: L.ExtraMarkers.icon({
    //icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle"
  }),
  INDUSTRIAL: L.ExtraMarkers.icon({
    //icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "grey",
    shape: "circle"
  })
};


var lyrTSABoundaries = new L.Shapefile("data/TSABoundaries.zip", {onEachFeature: function (feature, layer) {
  /* Add some colors based on shapefile features */
  layer.setStyle({
    color: 'orange',
    fillOpacity: 0,
    weight: 6,
  });
  
  
  }});

  var lyrDistSubDist = new L.Shapefile("data/DISTRICTS_AND_SUBDISTRICTS.zip", {onEachFeature: function (feature, layer) {
    /* Add some colors based on shapefile features */
    layer.setStyle({
      color: 'orange',
      fillOpacity: 0,
      weight: 3,
    });
    
    
    }});
var RestonGeo = new L.Shapefile("data/Reston_TSA_Landuse_Category_GeoUnits.zip", {onEachFeature: function (feature, layer) {
    /* Add some colors based on shapefile features */
    layer.setStyle({
        color: 'blue',
        fillOpacity: 0,
        weight: 1.5,
      });
    }});

function filterApprovedCases(feature){if(fearure.properties.STATUS == "APPROVED") return true;}
function filterUnderReviewCases(feature){if(fearure.properties.STATUS == 'ACCEPTED'|| fearure.properties.STATUS == 'PENDING'|| fearure.properties.STATUS == 'UNDER REVIEW' ) return true;}
function filterPreAppCases(feature){if(fearure.properties.STATUS == 'PREAPP ACTIVE') return true;}

var lyrZoningApprovedCases = new L.Shapefile("data/ZONING_CASES.zip", {onEachFeature: function (feature, layer) {
      /* Add some colors based on shapefile features */
      //Set all the feature no show
      layer.setStyle({
        fillOpacity: 0,
        weight:0,
      });

      if(feature.properties.STATUS == "APPROVED"){
    
      layer.setStyle({
        color: 'red',
        fillcolor: 'red',
        fillOpacity: 0.75,
        weight: 1.5,
      });
      if (feature.properties) {
        layer.bindPopup(Object.keys(feature.properties).map(function(k) {
            return k + ": " + feature.properties[k];
        }).join("<br />"), {
            maxHeight: 200
        });
        
        }
    }


      }});
var lyrZoningUnderReviewCases = new L.Shapefile("data/ZONING_CASES.zip", {onEachFeature: function (feature, layer) {
        /* Add some colors based on shapefile features */
    
        layer.setStyle({
            fillOpacity: 0,
            weight:0,
          });
    
          if(feature.properties.STATUS == "ACCEPTED"|| feature.properties.STATUS == "PENDING"|| feature.properties.STATUS == "UNDER REVIEW"){
        
          layer.setStyle({
            color: 'yellow',
            fillcolor: 'yellow',
            fillOpacity: 0.75,
            weight: 1.5,
          });
          if (feature.properties) {
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
            }).join("<br />"), {
                maxHeight: 200
            });
            
            }
        }
        }});
var lyrPreZoningCases = new L.Shapefile("data/ZONING_CASES.zip", {onEachFeature: function (feature, layer) {
          /* Add some colors based on shapefile features */
          layer.setStyle({
            fillOpacity: 0,
            weight:0,
          });
    
          if(feature.properties.STATUS == "PREAPP ACTIVE"){
        
          layer.setStyle({
            color: 'blue',
            fillcolor: 'blue',
            fillOpacity: 0.75,
            weight: 1.5,
          });
          if (feature.properties) {
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
            }).join("<br />"), {
                maxHeight: 200
            });
            
            }
        }
          }});

var ZoningCasesBuildings = new L.Shapefile("data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
        /* Add some colors based on shapefile features */
        //var lln = layer.getLatLng()
        //console.log(lln)
        
        layer.setIcon(icons["RESIDENTIAL"])
        // layer.setIcon({color:'red'})

        if (feature.properties) {
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
            }).join("<br />"), {
                maxHeight: 200
            });
            
            }
            
           
    
        }});
var grpDevActivity= { "Approved" : lyrZoningApprovedCases,
"Under Review" : lyrZoningUnderReviewCases,
"Pre-App": lyrPreZoningCases
}

var overlayMaps = {
  "Transit Station Areas": lyrTSABoundaries,
  "Districts / Subdistricts": lyrDistSubDist,
  "Land Use": RestonGeo, 
   "Development Activity" : { "Approved" : lyrZoningApprovedCases,
   "Under Review" : lyrZoningUnderReviewCases,
   "Pre-App": lyrPreZoningCases
   },

  "Zoning Case Buildings": ZoningCasesBuildings
};
// Pass our map layers into our layer control
// Add the layer control to the map
L.control.groupedLayers(baseMaps, overlayMaps).addTo(myMap);


//Overlays that may be toggled on or off
/*  var overlayMaps = {
  RestonPlanGeo: RestonGeo,
};  */

// Add our 'lightmap' tile layer to the map
//lightmap.addTo(map);
//saltiliteMap.addTo(map)

/* 
// Initialize all of the LayerGroups we'll be using
var layers = {
  COMING_SOON: new L.LayerGroup(),
  EMPTY: new L.LayerGroup(),
  LOW: new L.LayerGroup(),
  NORMAL: new L.LayerGroup(),
  OUT_OF_ORDER: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [38.9586, -77.3570],
  zoom: 12,  layers: [
    layers.COMING_SOON,
    layers.EMPTY,
    layers.LOW,
    layers.NORMAL,
    layers.OUT_OF_ORDER
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Coming Soon": layers.COMING_SOON,
  "Empty Stations": layers.EMPTY,
  "Low Stations": layers.LOW,
  "Healthy Stations": layers.NORMAL,
  "Out of Order": layers.OUT_OF_ORDER
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  COMING_SOON: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  EMPTY: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  OUT_OF_ORDER: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  LOW: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  NORMAL: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  })
};

// Perform an API call to the Citi Bike Station Information endpoint
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", function(infoRes) {

  // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json", function(statusRes) {
    var updatedAt = infoRes.last_updated;
    var stationStatus = statusRes.data.stations;
    var stationInfo = infoRes.data.stations;

    // Create an object to keep of the number of markers in each layer
    var stationCount = {
      COMING_SOON: 0,
      EMPTY: 0,
      LOW: 0,
      NORMAL: 0,
      OUT_OF_ORDER: 0
    };

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var stationStatusCode;

    // Loop through the stations (they're the same size and have partially matching data)
    for (var i = 0; i < stationInfo.length; i++) {

      // Create a new station object with properties of both station objects
      var station = Object.assign({}, stationInfo[i], stationStatus[i]);
      // If a station is listed but not installed, it's coming soon
      if (!station.is_installed) {
        stationStatusCode = "COMING_SOON";
      }
      // If a station has no bikes available, it's empty
      else if (!station.num_bikes_available) {
        stationStatusCode = "EMPTY";
      }
      // If a station is installed but isn't renting, it's out of order
      else if (station.is_installed && !station.is_renting) {
        stationStatusCode = "OUT_OF_ORDER";
      }
      // If a station has less than 5 bikes, it's status is low
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "LOW";
      }
      // Otherwise the station is normal
      else {
        stationStatusCode = "NORMAL";
      }

      // Update the station count
      stationCount[stationStatusCode]++;
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([station.lat, station.lon], {
        icon: icons[stationStatusCode]
      });

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[stationStatusCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
    }

    // Call the updateLegend function, which will... update the legend!
    updateLegend(updatedAt, stationCount);
  });
});

// Update the legend's innerHTML with the last updated time and station count
function updateLegend(time, stationCount) {
  document.querySelector(".legend").innerHTML = [
    "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
    "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
    "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
    "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
    "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
    "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
  ].join("");
}
 */