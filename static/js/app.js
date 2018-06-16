//***************************************/
//*************TEST BLOCK****************/
//***************************************/

//  Calling the renderHTMLtest function to test the sync amongst .py .html and .css
// renderHTMLtest();

// function renderHTMLtest() {
//   // Getting a reference to the element on the page with an ID of app
//   var app = document.querySelector("#test");

//   // Storing a string into a variable
//   var headingMessage = "Prelimnary TEST to check the sync between diff files";

//   // Storing a string into the paragraphMessage variable.
//   var paragraphMessage = "Looks like it works!!!! ";
//   paragraphMessage += "AWESOME!!!! ";
//   paragraphMessage += "Lets get started!!!.";


//   // Create a heading element w/ document.createElement
//   var heading = document.createElement("h1");
//   var paragraph = document.createElement("p");

//   // Update the innerHTML property of these elements
//   heading.innerHTML = headingMessage;
//   paragraph.innerHTML = paragraphMessage;

//   // Use 'appendChild' to put the heading and paragraph into the `app` container
//   app.appendChild(heading);
//   app.appendChild(paragraph);
// }

//***************************************/
//***********END TEST BLOCK**************/
//***************************************/



/** Draw Table
 * method to collect the selected date made by the user 
 * in the dropdown menus and calculate and draw the table 
 * using POST method to pass the information to the flask app
 */
function drawTable(ddl1, ddl2, ddl3){

    console.log("on selection TSA")
    var tsa = (ddl1.value == "TSA (Area Selection)")?"":ddl1.value;
    var district = (ddl2.value == "Select")?"":ddl2.value;
    var category = (ddl3.value == "Select")?"":ddl3.value;

    var selection = { TSA: ddl1.value,
                      DistSubDist: district,
                      LUCategory: category}

    console.log(selection)  

    fetch('/areaSelection', {
      body: JSON.stringify(selection), // must match 'Content-Type' header
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST', 
    }).then((response) => { 
      return response.text();
    }).then(text => {
      //  html  (bare table) --> flask app must return to_html()
      var table = document.querySelector("#table");
      textclean = text.replace(/"/g,' ');
      textclean2 = textclean.replace(/\\n/g,'');
      table.innerHTML = textclean2;
    });

  }


//***************************************/
//*********CREATE SELECT LIST************/
//***************************************/
d3.csv('../static/resources/data/summaryData.csv', (error, response) => {
  if (error) return console.warn(error);
  var todoList = document.querySelector("#dropdownlist1");
  var duplicate = [];
  for (var i = 0; i < response.length; i++) {
      if (duplicate.includes(response[i].TSA)) continue;
      var todoListItem = document.createElement("option");
      todoListItem.innerHTML = response[i].TSA;
      todoList.appendChild(todoListItem); 
      duplicate.push(response[i].TSA);
  } 
});

function configureDropDownLists(ddl1,ddl2,ddl3) {
  d3.json('/selectlist', (error, response) => {
  if (error) return console.warn(error);
  
  var distList0 = response[Object.keys(response)[0]].district;
  var distList1 = response[Object.keys(response)[1]].district;
  var distList2 = response[Object.keys(response)[2]].district;

  var landuseList0 = response[Object.keys(response)[0]].landuse;
  var landuseList1 = response[Object.keys(response)[1]].landuse;
  var landuseList2 = response[Object.keys(response)[2]].landuse;

    switch (ddl1.value) {
      case Object.keys(response)[0]:
          ddl2.options.length = 0;
          ddl3.options.length = 0;
          for (i = 0; i < distList0.length; i++) {
              createOption(ddl2, distList0[i], distList0[i]);
          }
          // break;
          for (j = 0; j < landuseList0.length; j++) {
            createOption(ddl3, landuseList0[j], landuseList0[j]);
          }
          break;
      case Object.keys(response)[1]:
          ddl2.options.length = 0; 
          ddl3.options.length = 0;
          for (i = 0; i < distList1.length; i++) {
            createOption(ddl2, distList1[i], distList1[i]);
          }
        
          for (j = 0; j < landuseList1.length; j++) {
            createOption(ddl3, landuseList1[j], landuseList1[j]);
          }
          break;
      case Object.keys(response)[2]:
          ddl2.options.length = 0;
          ddl3.options.length = 0;
          for (i = 0; i < distList2.length; i++) {
            createOption(ddl2, distList2[i], distList2[i]);
          }
        
          for (j = 0; j < landuseList2.length; j++) {
            createOption(ddl3, landuseList2[j], landuseList2[j]);
          }
          break;
      case 'TSA (Area Selection)':
          ddl2.options.length = 0;
          ddl3.options.length = 0;
          // ddl4.options.length = 0;
          for (i = 0; i < 2; i++) {
            createOption(ddl2, ['District/Sub-District'], ['District/Sub-District']);
          }
          for (j = 0; j < 2; j++) {
            createOption(ddl3,['Land Use Category'], ['Land Use Category']);
          }
          // for (k = 0; k < 2; k++) {
          //   createOption(ddl4,['Development Plan'], ['Development Plan']);
          // }
          // break;

      default:
          ddl2.options.length = 0;
          ddl3.options.length = 0;
          // ddl4.options.length = 0;
      break;
    }
  
    // A selection has been made by the user, update the table with the values derived from the selection
    updateTable();
  
  });  
}

function createOption(ddl, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
}

// var temp = [{'Herndon TSA': {'district': ['Herndon Station', 'Great Oak', 'Woodland Park'], 
//                              'landuse': ['Residential Mixed Use', 'Residential', 'Mixed Use', 'Transit Station Mixed Use']},
//              'Reston Town Center TSA': 
//                             {'district': ['Reston Town Center Station North', 'Town Center Urban Core', 
//                                           'Central Sunrise Valley', 'West Fountain Drive', 'Town Center West', 
//                                           'Reston Heights', 'Old Reston Avenue', 'East Fountain Drive', 
//                                           'Reston Town Center Station South'], 
//                              'landuse': ['Residential Mixed Use', 'Town Center Urban Core Mixed Use', 'Office', 'Mixed Use', 
//                                          'Industrial', 'Transit Station Mixed Use', 'Town Center North Mixed Use']}, 
//              'Wiehle-Reston East TSA': 
//                             {'district': ['Wiehle Station North', 'Sunset Hills', 'Reston East', 'Wiehle Station South'], 
//                              'landuse': ['Residential Mixed Use', 'Transit Station Mixed Use', 'Mixed Use', 'Government / Institutional']}}];

// d3.json('/selectlist', (error, response) => {
//   if (error) return console.warn(error);

//   var todoList = document.querySelector("#test");
//   var todoHTML='';
//   var sample = 'Herndon TSA'
//   todoHTML = "<p> AGE: " + response['Herndon TSA']['district'] + "</p>";
//   todoList.innerHTML = todoHTML;

  // var j = 0;

  // for (i = 0; i < response.length; i++) {
  //     var object = response[j];
  //     // otu_ids_list = object[sample]['otu_ids'];
  //     if (Object.keys(object) == sample) {
  //         // todoHTML = '';
  //         todoHTML += "<p> AGE: " + object['Herndon TSA']['district'][0] + "</p>";
  //         todoList.innerHTML = todoHTML;
  //     }
  //     j++;
  // });

// })
//***************************************/
//***********END SELECT LIST*************/
//***************************************/




/** gauge
 * draw a gauge 1-100% for a given scenario and mark the residential value %
 */
function gauge(scenario, residential_value){
  var value = residential_value?residential_value:1
  
  // Trig to calc meter point
  var degrees = 180 - (value*1.8);
  var radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  var data = [{ type: 'scatter',
  x: [0], y:[0],
      marker: {size: 28, color:'850000'},
      showlegend: false,
      name: 'value',
      text: value,
      hoverinfo: 'text'},
  { values: [value/2, value/2, value],
  rotation: 90,
  text: ["","",''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(14, 127, 0, .5)',
  
                          'rgba(255, 255, 255, 0)']},
  labels: ['Non Residential', 'Residential', ''],
  hoverinfo: 'labels+text',
  hole: .5,
  type: 'pie',
  showlegend: false
  }];

  var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
          color: '850000'
      }
      }],
  title: scenario,
  xaxis: {zeroline:false, showticklabels:false, title: "Residential %",
              showgrid: false, range: [-1, 1]}, 
  yaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]}
  };

  Plotly.newPlot('gauge'+scenario, data, layout, {displayModeBar: false});
}

/**
 * Creates and draws a gauge for each scenario 
 */
function gauges(){
  d3.json("/gauges", (error, response) => {
    if (error) return console.warn(error);
    console.log(response);
  
    //Only pass the Residential %, the non residential is 100- residential %
    // Need to check value for proper rendering or use an alternative <<<<<<< assumes good values
    var scenarios= ["Existing","Plan","Approved","Review"];
    for (var i=0; i< scenarios.length; i++){
      if (response[i] == 0){
        console.log("draw something else");
        gauge(scenarios[i], 0);
      } else {
        gauge(scenarios[i],response[i]);
      }
    }
  });
}

/** areaSelection:
 * draw the table with no selections made (uses default GET method) 
 */
function areaSelection(){
  d3.json('/areaSelection', (error, response)=> {
    if (error) return console.warn(error);
   
    var table = document.querySelector("#table");
    table.innerHTML = response;
  });
}

/** Update table from user selected options called at each dropdown selection  */
function updateTable(){
  var ddl1 = document.querySelector("#dropdownlist1");
  var ddl2 = document.querySelector("#dropdownlist2");
  var ddl3 = document.querySelector("#dropdownlist3");
  drawTable(ddl1, ddl2, ddl3);
  gauges();
}


/** Test mode only:
 *  pass the selected Unique plan to draw the table
 */
function optionChanged(route) {
  console.log("Option changed called with  "+ route);
  table(route);
 
} 

/** Test mode only: 
 *  populates the unique plans in the Unique dropdown
 */
// d3.json("/unique", (error, response) => {
//   if (error) return console.warn(error);
//   //console.log("unique", response);

//   var ddl = document.querySelector("#dropdownlist4");
//   for (i = 0; i < response.length; i++) 
//   {
//     var opt = document.createElement('option');
//     opt.value = response[i];
//     opt.text = response[i];
//     ddl.options.add(opt);
//   }
// });

/** Test mode only: 
 * draws the table for Unique areas (not composed values)
 * depends on the dropdown for unique plans
 */
function table(uniqueid_selection){
  d3.json(`/table/${uniqueid_selection}`, (error, response) => {
    if (error) return console.warn(error);
    
    // draw gauge based on example table loaded in response
    var table = document.querySelector("#table");
    table.innerHTML = response;
    
    gauges();
  });
}


 areaSelection();
 gauges();
