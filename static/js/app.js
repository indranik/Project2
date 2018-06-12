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

function configureDropDownLists(ddl1,ddl2,ddl3,ddl4) {
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
          ddl4.options.length = 0;
          for (i = 0; i < 2; i++) {
            createOption(ddl2, ['District/Sub-District'], ['District/Sub-District']);
          }
          for (j = 0; j < 2; j++) {
            createOption(ddl3,['Land Use Category'], ['Land Use Category']);
          }
          for (k = 0; k < 2; k++) {
            createOption(ddl4,['Development Plan'], ['Development Plan']);
          }
          break;

      default:
          ddl2.options.length = 0;
          ddl3.options.length = 0;
          ddl4.options.length = 0;
      break;
    }
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

d3.json('/selectlist', (error, response) => {
  if (error) return console.warn(error);

  var todoList = document.querySelector("#test");
  var todoHTML='';
  var sample = 'Herndon TSA'
  todoHTML = "<p> AGE: " + response['Herndon TSA']['district'] + "</p>";
  todoList.innerHTML = todoHTML;

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
  });

// })
//***************************************/
//***********END SELECT LIST*************/
//***************************************/

d3.json('/submit', (error, response) =>{
  if (error) return console.warn(error);
  
  var table = document.querySelector("#table");

  table.innerHTML = response;

});