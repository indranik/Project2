
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

/** configureDropDownLists
 * main function called at  dropdown 1 (TSA) re-selection
 * will update the values for dropdown 2 and 3 options
 * will call function to update and render the table
 * will call function to draw the gauge 
 */
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
      case 'All TSA':
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
      case 'All TSA':
          console.log("RIGHT CASE")
          ddl2.options.length = 1
          ddl3.options.length = 1;

          ddl2.value = "Select";
          ddl3.value = "Select";
          ddl2.options.length = 0;
          ddl3.options.length = 0;
          
          for (i = 0; i < 2; i++) {
            createOption(ddl2, ['District/Sub-District'], ['District/Sub-District']);
          }
          for (j = 0; j < 2; j++) {
            createOption(ddl3,['Land Use Category'], ['Land Use Category']);
          }
          break;

      default:
          ddl2.options.length = 0;
          ddl3.options.length = 0;
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

/** TO DO
 * Update drop down 3 for valid categories give district/subdistrict selection
 */
function configureDropDownLists3(ddl2,ddl3) {
  district_selected = ddl2.value;
  console.log("Setting valid categories for ",district_selected);
  var district_selected_compress = district_selected.replace(" ","");
  d3.json(`/selectlist3/${district_selected}`, (error, response) => {
    if (error) return console.warn(error);

    //var landuseList = response[Object.keys(response)[0]].landuse;
    var landuseList = response;

    console.log(" GOT the landlist ", landuseList);

    ddl3.options.length = 0;
    for (j = 0; j < landuseList.length; j++) {
      createOption(ddl3, landuseList[j], landuseList[j]);
    }
    // A selection has been made by the user, update the table with the values derived from the selection
    updateTable();
    
  });  
}

//***************************************/
//***********END SELECT LIST*************/
//***************************************/

/** Draw Table
 * method to collect the selected date made by the user 
 * in the dropdown menus and calculate and draw the table 
 * using POST method to pass the information to the flask app
 */
function drawTable(ddl1, ddl2, ddl3){

  console.log("on selection TSA")
  var tsa = (ddl1.value == "All TSA")?"":ddl1.value;
  var district = (ddl2.value == "Select")?"":ddl2.value;
  var category = (ddl3.value == "Select")?"":ddl3.value;

  var selection = { TSA: tsa,
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


/** gauges
 *  draw multi gauges to show residential percentages for all scenarios 
 */
function gauges(){
  d3.json("/gauges", (error, response) => {
    if (error) return console.warn(error);
    console.log(response);
    allresidential_gauge(response)
  });
}

/** areaSelection
 * draw the table with no selections made (uses default GET method) 
 * flask app does the database query and returns the final table
 */
function areaSelection(){
  d3.json('/areaSelection', (error, response)=> {
    if (error) return console.warn(error);
   
    var table = document.querySelector("#table");
    table.innerHTML = response;
  });
}

/** updateTable
 * render table from user selected options called at each dropdown selection
 * refresh gauge for residential percentage  
 */
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
  
  // PLACEHOLDER FOR CALLING MAP JS with user selection <<<<INDU
  var TSA = document.querySelector("#dropdownlist1").value;
  var Distric_SubDistrict = document.querySelector("#dropdownlist2").value;
  var LandUseCategory = document.querySelector("#dropdownlist3").value;  
  //updateMap(TSA,Distric_SubDistrict,LandUseCategory);
}


 areaSelection();
 gauges();