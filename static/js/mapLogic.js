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



var icons = {
  RESIDENTIAL: L.ExtraMarkers.icon({
    //icon: "ion-settings",
    iconColor: "white",
    markerColor: "orange",
    shape: "star"
  }),
  OFFICE: L.ExtraMarkers.icon({
   // icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "pink",
    shape: "circle"
  }),
  RETAIL: L.ExtraMarkers.icon({
    //icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "red",
    shape: "square"
  }),
  HOTEL: L.ExtraMarkers.icon({
    //icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "purple",
    shape: "penta"
  }),
  INSTITUTIONAL: L.ExtraMarkers.icon({
    //icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "cyan",
    shape: "penta"
  }),
  INDUSTRIAL: L.ExtraMarkers.icon({
   // icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "black",
    shape: "square"
  }),
  MIXEDUSE: L.ExtraMarkers.icon({
    //icon: "ion-android-star-outline",
    iconColor: "white",
    markerColor: "violet",
    shape: "star"
  })
};
// pop-ups - Zoning cases

function zoningcasePopup(feature){var popup =  "<strong>CASE: </strong>" + feature.properties.CASE +"<br />"+
"<strong>NAME: </strong>" + feature.properties.NAME +"<br />"+
"<strong>STATUS: </strong>"+ feature.properties.STATUS +"<br />"+
"<strong>FAR: </strong>"+ feature.properties.FAR +"<br />"+
"<strong>Office: </strong>" + feature.properties.OFFICE_SQF +" sqft <br />"+
"<strong>Retail: </strong>" + feature.properties.RETAIL_SQF +"<br />"+
"<strong>Hotel: </strong>" + feature.properties.HOTEL_SQFT +"<br />"+
"<strong>Institutional: </strong>" + feature.properties.PUBFACILIT+"<br />"+
"<strong>Industrial: </strong>" + feature.properties.INDUSTRIAL+"<br />"+
"<strong>Residential: </strong>" + feature.properties.RESIDENTIA +"<br />"+
"<strong>Residential Units: </strong>" + feature.properties.RESIDENT_1 +"<br />"

if(feature.properties.LDS_URL!="")
{popup = popup + "<a href="+feature.properties.LDS_URL +">Click for more details</a>"}

return popup}

function BuildingsPopup(feature){var popup =  "<strong>NAME: </strong>" + feature.properties.BUILDING_N +"<br />"+
"<strong>CASE: </strong>" + feature.properties.APPLICATIO +"<br />"+
"<strong>STATUS: </strong>"+ feature.properties.STATUS +"<br />"+
"<strong>CASE STATUS: </strong>"+ feature.properties.ZoCaseStat+"<br />"+
"<strong>BUILDING TYPE: </strong>"+ feature.properties.BUILDING_T+"<br />"+
"<strong>Office: </strong>" + feature.properties.OFFICE_SQF +" sqft <br />"+
"<strong>Retail: </strong>" + feature.properties.RETAIL_SQF +"<br />"+
"<strong>Hotel: </strong>" + feature.properties.HOTEL_SQFT +"<br />"+
"<strong>Institutional: </strong>" + feature.properties.PUBFACILIT+"<br />"+
"<strong>Industrial: </strong>" + feature.properties.INDUSTRIAL+"<br />"+
"<strong>Residential: </strong>" + feature.properties.RESIDENTIA +"<br />"+
"<strong>Residential Units: </strong>" + feature.properties.RESIDENT_1 +"<br />"


return popup}



var arrTSACoordinates =[]
var lyrTSABoundaries = new L.Shapefile("static/resources/data/TSABoundaries1.zip", {onEachFeature: function (feature, layer) {
  /* Add some colors based on shapefile features */
  layer.setStyle({
    color: 'orange',
    fillOpacity: 0,
    weight: 6,
  });

  if (feature.properties) {
    layer.bindPopup(Object.keys(feature.properties).map(function(k) {
        return k + ": " + feature.properties[k];
    }).join("<br />"), {
        maxHeight: 200
    });
    
    }

  arrTSACoordinates.push({key:feature.properties.LABEL,
                          value:[feature.properties.XC,feature.properties.YC]});
    console.log(feature.properties.SHAPE_AREA)
    console.log(feature.properties.YC)
  }});

 console.log(arrTSACoordinates)

 var arrDistCoordinates =[]
  var lyrDistSubDist = new L.Shapefile("static/resources/data/DISTRICTS_AND_SUBDISTRICTS.zip", {onEachFeature: function (feature, layer) {
    /* Add some colors based on shapefile features */
    layer.setStyle({
      color: 'orange',
      fillOpacity: 0,
      weight: 3,
    });
    arrDistCoordinates.push({key:feature.properties.GEO_UNIT,
        value:[feature.properties.x,feature.properties.y]});
    
    }});

var arrZoningCaseCoordinates =[]
    var lyrzoningcasesall = new L.Shapefile("static/resources/data/ZONING_CASES.zip", {onEachFeature: function (feature, layer) {
      /* Add some colors based on shapefile features */
            arrZoningCaseCoordinates.push({key:feature.properties.NAME,
          value:[feature.properties.x,feature.properties.y]});
      
      }});

      console.log(arrTSACoordinates)
      console.log(arrDistCoordinates)
      console.log(arrZoningCaseCoordinates)   
var RestonGeo = new L.Shapefile("static/resources/data/Reston_TSA_Landuse_Category_GeoUnits.zip", {onEachFeature: function (feature, layer) {
    /* Add some colors based on shapefile features */
    layer.setStyle({
        color: 'blue',
        fillOpacity: 0,
        weight: 1.5,
      });
    }});



var lyrZoningApprovedCases = new L.Shapefile("static/resources/data/ZONING_CASES.zip", {onEachFeature: function (feature, layer) {
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
      
        layer.bindPopup(
         
            zoningcasePopup(feature)
        )

      }
      }});
var lyrZoningUnderReviewCases = new L.Shapefile("static/resources/data/ZONING_CASES.zip", {onEachFeature: function (feature, layer) {
        /* Add some colors based on shapefile features */
    
        layer.setStyle({
            fillOpacity: 0,
            weight:0,
          });
         var Status = feature.properties.STATUS
          if(Status == "ACCEPTED"|| Status == "PENDING"|| Status == "UNDER REVIEW"){
        
          layer.setStyle({
            color: 'yellow',
            fillcolor: 'yellow',
            fillOpacity: 0.75,
            weight: 1.5,
          });
          
            layer.bindPopup(zoningcasePopup(feature));
            
            
        }
        }});
var lyrPreZoningCases = new L.Shapefile("static/resources/data/ZONING_CASES.zip", {onEachFeature: function (feature, layer) {
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
          layer.bindPopup(zoningcasePopup(feature));
        }
          }});
/* APPROVED BUILDINGS - BY TYPE */
var lyrApprovedResidentialBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
        /* Add some colors based on shapefile features */
      
        layer.setOpacity(0);
        var CaseStatus= feature.properties.ZoCaseStat;
        var BldingType =feature.properties.BUILDING_T;
        var condition = (CaseStatus == "APPROVED")&&(BldingType.search("Residential")==0)
        if(condition){
        layer.setIcon(icons["RESIDENTIAL"]);
        layer.setOpacity(1);
        // layer.setIcon({color:'red'})

        layer.bindPopup(BuildingsPopup(feature));
            
        } 
        }});

var lyrApprovedOfficeBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
            /* Add some colors based on shapefile features */
          
            layer.setOpacity(0);
            var CaseStatus= feature.properties.ZoCaseStat;
            var BldingType =feature.properties.BUILDING_T;
            var condition = (CaseStatus == "APPROVED")&&(BldingType.search("Office")==0)
            if(condition){
            layer.setIcon(icons["OFFICE"]);
            layer.setOpacity(1);
            // layer.setIcon({color:'red'})
    
            layer.bindPopup(BuildingsPopup(feature));
            } 
}});
var lyrApprovedRetailBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
                /* Add some colors based on shapefile features */
              
                layer.setOpacity(0);
                var CaseStatus= feature.properties.ZoCaseStat;
                var BldingType =feature.properties.BUILDING_T;
                var condition = (CaseStatus == "APPROVED")&&(BldingType.search("Retail")==0)
                if(condition){
                layer.setIcon(icons["RETAIL"]);
                layer.setOpacity(1);
                // layer.setIcon({color:'red'})
        
                layer.bindPopup(BuildingsPopup(feature));
                } 
}});
var lyrApprovedHotelBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
                    /* Add some colors based on shapefile features */
                  
                    layer.setOpacity(0);
                    var CaseStatus= feature.properties.ZoCaseStat;
                    var BldingType =feature.properties.BUILDING_T;
                    var condition = (CaseStatus == "APPROVED")&&(BldingType.search("Hotel")==0)
                    if(condition){
                    layer.setIcon(icons["HOTEL"]);
                    layer.setOpacity(1);
                    // layer.setIcon({color:'red'})
            
                    layer.bindPopup(BuildingsPopup(feature));
                        
                    } 
}});
var lyrApprovedInstitutionalBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
                        /* Add some colors based on shapefile features */
                      
                        layer.setOpacity(0);
                        var CaseStatus= feature.properties.ZoCaseStat;
                        var BldingType =feature.properties.BUILDING_T;
                        var condition = (CaseStatus == "APPROVED")&&(BldingType.search("Institutional")==0)
                        if(condition){
                        layer.setIcon(icons["INSTITUTIONAL"]);
                        layer.setOpacity(1);
                        // layer.setIcon({color:'red'})
                
                        layer.bindPopup(BuildingsPopup(feature));
                            
                        } 
}});
var lyrApprovedIndustrialBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
                            /* Add some colors based on shapefile features */
                          
                            layer.setOpacity(0);
                            var CaseStatus= feature.properties.ZoCaseStat;
                            var BldingType =feature.properties.BUILDING_T;
                            var condition = (CaseStatus == "APPROVED")&&(BldingType.search("Warehouse")==0)
                            if(condition){
                            layer.setIcon(icons["INDUSTRIAL"]);
                            layer.setOpacity(1);
                            // layer.setIcon({color:'red'})
                    
                            layer.bindPopup(BuildingsPopup(feature));
                                
                            } 
}});
                        

/* END APPROVED BUILDINGS - BY TYPE */

/* INPROCESS BUILDINGS - BY TYPE */
var lyrInprocessResidentialBuildings = new L.Shapefile("static/resources/static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
    /* Add some colors based on shapefile features */
  
    layer.setOpacity(0);
    var CaseStatus= feature.properties.ZoCaseStat;
    var BldingType =feature.properties.BUILDING_T;
    var condition = (CaseStatus== "ACCEPTED"|| CaseStatus == "PENDING"|| CaseStatus == "UNDER REVIEW")&&(BldingType.search("Residential")==0)
    if(condition){
    layer.setIcon(icons["RESIDENTIAL"]);
    layer.setOpacity(1);
    // layer.setIcon({color:'red'})

    layer.bindPopup(BuildingsPopup(feature));
    } 
    }});

var lyrInprocessOfficeBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
        /* Add some colors based on shapefile features */
      
        layer.setOpacity(0);
        var CaseStatus= feature.properties.ZoCaseStat;
        var BldingType =feature.properties.BUILDING_T;
        var condition = (CaseStatus== "ACCEPTED"|| CaseStatus == "PENDING"|| CaseStatus == "UNDER REVIEW")&&(BldingType.search("Office")==0)
        if(condition){
        layer.setIcon(icons["OFFICE"]);
        layer.setOpacity(1);
        // layer.setIcon({color:'red'})

        layer.bindPopup(BuildingsPopup(feature));
            
        } 
}});
var lyrInprocessRetailBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
            /* Add some colors based on shapefile features */
          
            layer.setOpacity(0);
            var CaseStatus= feature.properties.ZoCaseStat;
            var BldingType =feature.properties.BUILDING_T;
            var condition = (CaseStatus== "ACCEPTED"|| CaseStatus == "PENDING"|| CaseStatus == "UNDER REVIEW")&&(BldingType.search("Retail")==0)
            if(condition){
            layer.setIcon(icons["RETAIL"]);
            layer.setOpacity(1);
            // layer.setIcon({color:'red'})
    
            layer.bindPopup(BuildingsPopup(feature));
                
            } 
}});
var lyrInprocessHotelBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
                /* Add some colors based on shapefile features */
              
                layer.setOpacity(0);
                var CaseStatus= feature.properties.ZoCaseStat;
                var BldingType =feature.properties.BUILDING_T;
                var condition = (CaseStatus== "ACCEPTED"|| CaseStatus == "PENDING"|| CaseStatus == "UNDER REVIEW")&&(BldingType.search("Hotel")==0)
                if(condition){
                layer.setIcon(icons["HOTEL"]);
                layer.setOpacity(1);
                // layer.setIcon({color:'red'})
        
                layer.bindPopup(BuildingsPopup(feature));
                    
                } 
}});
var lyrInprocessInstitutionalBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
                    /* Add some colors based on shapefile features */
                  
                    layer.setOpacity(0);
                    var CaseStatus= feature.properties.ZoCaseStat;
                    var BldingType =feature.properties.BUILDING_T;
                    var condition = (CaseStatus== "ACCEPTED"|| CaseStatus == "PENDING"|| CaseStatus == "UNDER REVIEW")&&(BldingType.search("Institutional")==0)
                    if(condition){
                    layer.setIcon(icons["INSTITUTIONAL"]);
                    layer.setOpacity(1);
                    // layer.setIcon({color:'red'})
            
                    layer.bindPopup(BuildingsPopup(feature));
                        
                    } 
}});
var lyrInprocessIndustrialBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
                        /* Add some colors based on shapefile features */
                      
                        layer.setOpacity(0);
                        var CaseStatus= feature.properties.ZoCaseStat;
                        var BldingType =feature.properties.BUILDING_T;
                        var condition = (CaseStatus== "ACCEPTED"|| CaseStatus == "PENDING"|| CaseStatus == "UNDER REVIEW")&&(BldingType.search("Warehouse")==0)
                        if(condition){
                        layer.setIcon(icons["INDUSTRIAL"]);
                        layer.setOpacity(1);
                        // layer.setIcon({color:'red'})
                
                        layer.bindPopup(BuildingsPopup(feature));
                            
                        } 
                        }});
 var lyrInprocessMixedBuildings = new L.Shapefile("static/resources/data/ZONING_CASES_BLDG.zip", {onEachFeature: function (feature, layer) {
                            /* Add some colors based on shapefile features */
                          
                            layer.setOpacity(0);
                            var CaseStatus= feature.properties.ZoCaseStat;
                            var BldingType =feature.properties.BUILDING_T;
                            var condition = (CaseStatus== "ACCEPTED"|| CaseStatus == "PENDING"|| CaseStatus == "UNDER REVIEW")&&(BldingType.search("Mixeduse")==0)
                            if(condition){
                            layer.setIcon(icons["MIXEDUSE"]);
                            layer.setOpacity(1);
                            // layer.setIcon({color:'red'})
                    
                            layer.bindPopup(BuildingsPopup(feature));
                                
                            } 
}});
                                                     

/* END IN-PROCESS BUILDINGS - BY TYPE */

var groupedOverlays = {
    "": {
        "Transit Station Areas": lyrTSABoundaries,
        "Districts / Subdistricts": lyrDistSubDist,
        "Land Use": RestonGeo, 
    },
    "Approved": {"Cases" : lyrZoningApprovedCases,
                "Residential" : lyrApprovedResidentialBuildings,
                "Office" : lyrApprovedOfficeBuildings,
                "Retail" : lyrApprovedRetailBuildings,
                "Hotel" : lyrApprovedHotelBuildings,
                "Institutional" : lyrApprovedInstitutionalBuildings,
                "Industrial" : lyrApprovedIndustrialBuildings
    },
    "Under Review": {
                "Cases" : lyrZoningUnderReviewCases,
                "Residential" : lyrInprocessResidentialBuildings,
                "Office" : lyrInprocessOfficeBuildings,
                "Retail" : lyrInprocessRetailBuildings,
                "Hotel" : lyrInprocessHotelBuildings,
                "Institutional" : lyrInprocessInstitutionalBuildings,
                "Industrial" : lyrInprocessIndustrialBuildings
    
    },
    "Pre Application": {
    "Cases": lyrPreZoningCases
    }



  };
 var options = {
    //Make the "Pre Application" group exclusive (use radio inputs)
  // exclusiveGroups: ["Pre Application"],
    // Show a checkbox next to non-exclusive group labels for toggling all
    groupCheckboxes: true
  }; 
  
  // Create map object and set default layers

var mapCenter = [38.954859,-77.365811]
var myMap = L.map('map-id', {
    center: mapCenter,
    zoom: 14,
    layers: [satiliteMap,lyrTSABoundaries]
  }); 
// Pass our map layers into our layer control
// Add the layer control to the map

L.control.groupedLayers(baseMaps, groupedOverlays,options).addTo(myMap);

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
/* info.addTo(myMap);
function updateLegend() {
    console.log(reIcon),
    document.querySelector(".legend").innerHTML = [
    
      
      '<i class="circle" style="background: red"></i> ',
      

    ].join("");
  }
  updateLegend(); */

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