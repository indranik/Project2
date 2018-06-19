//var mapboxToken = "pk.eyJ1IjoiaW5kcmFuaWsiLCJhIjoiY2pod202dXZ3MDJpNDNxbnRpdnF0Y3hwMiJ9.G-Msbu1I25lI-ZKiIcEIhA";


// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=" + "pk.eyJ1IjoiaW5kcmFuaWsiLCJhIjoiY2pod202dXZ3MDJpNDNxbnRpdnF0Y3hwMiJ9.G-Msbu1I25lI-ZKiIcEIhA", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18
});

// Define variables for our tile layers
var satiliteMap = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=' + "pk.eyJ1IjoiaW5kcmFuaWsiLCJhIjoiY2pod202dXZ3MDJpNDNxbnRpdnF0Y3hwMiJ9.G-Msbu1I25lI-ZKiIcEIhA",{
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18
  }
);


// Only one base layer can be shown at a time
var baseMaps = {
  Satilite: satiliteMap,
  Light: lightmap
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

var TSAlyr = "static/resources/data/TSA.zip"
var Districtslyr = "static/resources/data/DISTRICTS.zip"
var LUCatlyr = "static/resources/data/LUCATEGORIES.zip"
var ZoningCaselyr = "static/resources/data/ZONINGCASES.zip"
var ZoningCaseBldslyr = "static/resources/data/ZONINGCASESBLGDS.zip"


var mapCenter = [38.949343, -77.337901];



var arrTSACoordinates =[]
var lyrTSABoundaries = new L.Shapefile(TSAlyr, {onEachFeature: function (feature, layer) {
  /* Add some colors based on shapefile features */
  layer.setStyle({
    color: 'orange',
    fillOpacity: 0,
    weight: 6,
  });
  arrTSACoordinates.push({key:feature.properties.LABEL,
    value:[feature.properties.XC,feature.properties.YC]});


  
  }});

 
  var arrDistCoordinates =[]
  var lyrDistSubDist = new L.Shapefile(Districtslyr, {onEachFeature: function (feature, layer) {
    /* Add some colors based on shapefile features */
    layer.setStyle({
      color: 'orange',
      fillOpacity: 0,
      weight: 3,
    });
    arrDistCoordinates.push({key:feature.properties.GEO_UNIT,
        value:[feature.properties.XC,feature.properties.YC]});
    
    }});
  

var RestonGeo = new L.Shapefile(LUCatlyr, {onEachFeature: function (feature, layer) {
    /* Add some colors based on shapefile features */
    layer.setStyle({
        color: 'blue',
        fillOpacity: 0,
        weight: 1.5,
      });
    }});



var lyrZoningApprovedCases = new L.Shapefile(ZoningCaselyr, {onEachFeature: function (feature, layer) {
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
var lyrZoningUnderReviewCases = new L.Shapefile(ZoningCaselyr, {onEachFeature: function (feature, layer) {
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
var lyrPreZoningCases = new L.Shapefile(ZoningCaselyr, {onEachFeature: function (feature, layer) {
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
var lyrApprovedResidentialBuildings = new L.Shapefile(ZoningCaseBldslyr, {onEachFeature: function (feature, layer) {
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

var lyrApprovedOfficeBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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
var lyrApprovedRetailBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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
var lyrApprovedHotelBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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
var lyrApprovedInstitutionalBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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
var lyrApprovedIndustrialBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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
var lyrInprocessResidentialBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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

var lyrInprocessOfficeBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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
var lyrInprocessRetailBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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
var lyrInprocessHotelBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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
var lyrInprocessInstitutionalBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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
var lyrInprocessIndustrialBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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
 var lyrInprocessMixedBuildings = new L.Shapefile(ZoningCaseBldslyr , {onEachFeature: function (feature, layer) {
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

  // Create map object and set default layers
  var myMap = L.map('map-id', {
    center: mapCenter,
    zoom: 14,
    layers: [satiliteMap,lyrTSABoundaries]

  });

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
  
  


// Pass our map layers into our layer control
// Add the layer control to the map

renderMap();
function renderMap() {
    L.control.groupedLayers(baseMaps, groupedOverlays, options).addTo(myMap);
}

function userInputMapLogic(selectionStr){
  console.log(selectionStr);
}

