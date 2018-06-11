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
  todoHTML='';
  var duplicate = [];
  for (var i = 0; i < response.length; i++) {
      if (duplicate.includes(response[i].TSA)) continue;
      var todoListItem = document.createElement("option");
      todoListItem.innerHTML = response[i].TSA;
      todoList.appendChild(todoListItem); 
      duplicate.push(response[i].TSA);
  } 
});

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
//   var j = 0;

//   for (i = 0; i < response.length; i++) {
//       var object = response[j];
//       // otu_ids_list = object[sample]['otu_ids'];
//       if (Object.keys(object) == sample) {
//           // todoHTML = '';
//           todoHTML += "<p> AGE: " + object['Herndon TSA']['district'][0] + "</p>";
//           todoList.innerHTML = todoHTML;
//       }
//       j++;
//   }

// })
//***************************************/
//***********END SELECT LIST*************/
//***************************************/