//##########################################################
//Get the values for slider dropdown
//##########################################################
d3.json('/sliderdropdownlist', (error, response) => {
    if (error) return console.warn(error);

    var todoList = document.querySelector("#selectddl");
    todoHTML = "<option value='Development Plans' selected='selected'>Development Plans</option>";
    for (var i = 0; i < response.length; i++) {
        todoHTML += "<option>" + response[i] + "</option>";
    }
    todoList.innerHTML = todoHTML;
});


//##########################################################
//Post and get the values for sliderplot to and from app.py
//##########################################################
/** Update table from user selected options called at each dropdown selection  */
// function updateSliderPlot_test(){
//     // change event
//     $('#selectddl').change(function(){
//         console.log($(this).find(':selected').text());
//         console.log($(this).find(':selected').val());
//     });
//   }

function updateSliderPlot(ddl1) {

    console.log("on selection")
    console.log(ddl1)
    var development = (ddl1 == "Development Plans")?"":ddl1;
    console.log(development)
    var selection = {developmentPlan: development}
    console.log(selection) 
    console.log(JSON.stringify(selection)) 

    fetch('/sliderdata1', {
        body: JSON.stringify(selection), // must match 'Content-Type' header
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST', 
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        var sliderData = {officeVal: parseInt(data.office),
            retailVal: parseInt(data.retail),
            hotelVal: parseInt(data.hotel),
            institutionalVal: parseInt(data.institution),
            industrialVal: parseInt(data.industry),
            nonresidentialVal: parseInt(data.nonresidential),
            residentialVal: parseInt(data.residential)
            };
        console.log(sliderData);
        renderSliderPlot(sliderData)
      });
    }

// TEST DATA FOR 
// var sliderDatadefault = {officeVal: 259845,
//                          retailVal: 183555,
//                          hotelVal: 0,
//                          institutionalVal: 0,
//                          industrialVal: 0,
//                          nonresidentialVal: 443400,
//                          residentialVal: 1341401
//                          };

var sliderDatadefault = {officeVal: 259845,
retailVal: 183555,
hotelVal: 0,
institutionalVal: 0,
industrialVal: 0,
nonresidentialVal: 443400,
residentialVal: 1341401
}

// Render Sliderplot
function renderSliderPlot(sliderData) {
    var officeVal = (sliderData.officeVal+1)/1000;
    var retailVal = (sliderData.retailVal+1)/1000;
    var hotelVal = (sliderData.hotelVal+1)/1000;
    var institutionalVal = (sliderData.institutionalVal+1)/1000;
    var industrialVal = (sliderData.industrialVal+1)/1000;
    var nonresidentialVal = (sliderData.nonresidentialVal+1)/1000;
    var residentialVal = (sliderData.residentialVal+1)/1000;
    var jobs = ((officeVal/300)+(retailVal/400)+(hotelVal/1350)+(institutionalVal/450)+(industrialVal/500))*1000;
    var people = residentialVal*2.2;
    var students = residentialVal*0.85;
    console.log(jobs,people,students)



    $(document).ready(function () {
        function getExportServer() {
            return 'https://www.jqwidgets.com/export_server/export.php';
        }

        // prepare chart data
        var xaxisData = [
            { Category: 'Non-Residential(sq.ft)'},
            { Category: 'Residential(sq.ft)'},
            { Category: 'Jobs'},
            { Category: 'People'},
            { Category: 'Students'}
        ]

        var areaData = [
            { Category: 'Non-Residential(sq.ft)', Area: nonresidentialVal },
            { Category: 'Residential(sq.ft)', Area: residentialVal },
            { Category: 'Jobs', Area: 0 },
            { Category: 'People', Area: 0 },
            { Category: 'Students', Area: 0 }
        ]

        var countData = [
            { Category: 'Non-Residential(sq.ft)', Count: 0 },
            { Category: 'Residential(sq.ft)', Count: 0 },
            { Category: 'Jobs', Count: jobs },
            { Category: 'People', Count: people },
            { Category: 'Students', Count: students }
        ]

        // prepare jqxChart settings
        var settings = {
            title: "Development Plan Overview",
            description: "Use slider to project development progress based on selection",
            showLegend: true,
            enableAnimations: true,
            padding: { left: 20, top: 5, right: 20, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: xaxisData,
            xAxis:
                {
                    dataField: 'Category',
                    showGridLines: true,
                    flip: false
                },
            
            colorScheme: 'scheme07',
            seriesGroups:
                [
                    {
                        type: 'column',
                        columnsGapPercent: 50,
                        toolTipFormatSettings: { thousandsSeparator: ',' },
                        valueAxis:
                        {
                            unitInterval: 150,
                            maxValue: Math.max(nonresidentialVal,residentialVal)+50,
                            minValue: 0,
                            description: 'Area (thousand SQ.FT.)'
                        },
                        source: areaData,
                        
                        series: [
                                { dataField: 'Area', displayText: 'Area'}
                            ]
                    },
                    {
                        type: 'column',
                        columnsGapPercent: 50,
                        toolTipFormatSettings: { thousandsSeparator: ',' },
                        valueAxis:
                        {
                            unitInterval: 150,
                            maxValue: Math.max(jobs,people,students)+50,
                            minValue: 0,
                            description: 'Count',
                            position: 'right',
                            showGridLines: false
                        },
                        source: countData,
                        
                        series: [
                                { dataField: 'Count', displayText: 'Count'}
                            ]
                    },
                ],
            
        };


        // setup the chart
        $('#chartContainer').jqxChart(settings);
        // $('#chartContainer').jqxChart(settings2);

        $("#jqxslider1").jqxSlider({ width: 750, min: 0, max: officeVal, value: 0 , step: 5 });
        $("#jqxslider2").jqxSlider({ width: 750, min: 0, max: retailVal, value: 0, step: 5 });
        $("#jqxslider3").jqxSlider({ width: 750, min: 0, max: hotelVal, value: 0, step: 5 });
        $("#jqxslider4").jqxSlider({ width: 750, min: 0, max: institutionalVal, value: 0, step: 5 });
        $("#jqxslider5").jqxSlider({ width: 750, min: 0, max: industrialVal, value: 0, step: 5 });
        $("#jqxslider6").jqxSlider({ width: 750, min: 0, max: residentialVal, value: 0, step: 5 });

        $('#jqxslider1').on('change', function (event) {
            var value = event.args.value;
            areaData[0].Area = areaData[0].Area + value;
            countData[2].Count = countData[2].Count + value;
            $('#chartContainer').jqxChart("update");
        });
        
        $('#jqxslider2').on('change', function (event) {
            var value = event.args.value;
            areaData[0].Area = value;
            countData[2].Count = value;
            $('#chartContainer').jqxChart("update");
        });
        
        $('#jqxslider3').on('change', function (event) {
            var value = event.args.value;
            sampleData2[2].MarketShare =value;
            $('#chartContainer').jqxChart("update");
        });
        
        $('#jqxslider4').on('change', function (event) {
            var value = event.args.value;
            sampleData2[3].MarketShare =value;
            $('#chartContainer').jqxChart("update");
        });
        
        $('#jqxslider5').on('change', function (event) {
            var value = event.args.value;
            sampleData2[4].MarketShare =value;
            $('#chartContainer').jqxChart("update");
        });

        $('#jqxslider6').on('change', function (event) {
            var value = event.args.value;
            sampleData2[4].MarketShare =value;
            $('#chartContainer').jqxChart("update");
        });

        $("#jpegButton").jqxButton({});
        $("#pngButton").jqxButton({});
        $("#pdfButton").jqxButton({});
        $("#jpegButton").click(function () {
            // call the export server to create a JPEG image
            $('#chartContainer').jqxChart('saveAsJPEG', 'myChart.jpeg', getExportServer());
        });
        $("#pngButton").click(function () {
            // call the export server to create a PNG image
            $('#chartContainer').jqxChart('saveAsPNG', 'myChart.png', getExportServer());
        });
        $("#pdfButton").click(function () {
            // call the export server to create a PNG image
            $('#chartContainer').jqxChart('saveAsPDF', 'myChart.pdf', getExportServer());
        });
    });
}

renderSliderPlot(sliderDatadefault);
