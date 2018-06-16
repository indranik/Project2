d3.json('/sliderdropdownlist', (error, response) => {
    if (error) return console.warn(error);

    var todoList = document.querySelector("#selectddl");
    todoHTML = '';
    for (var i = 0; i < response.length; i++) {
        todoHTML += "<option>" + response[i] + "</option>";
    }
    todoList.innerHTML = todoHTML;
});






$(document).ready(function () {
    function getExportServer() {
        return 'https://www.jqwidgets.com/export_server/export.php';
    }

    // prepare chart data
    var sampleData = [
        { Category: 'Total Non-Residential(sq.ft)', MarketShare: 0 },
        { Category: 'Total Residential(sq.ft)', MarketShare: 0 },
        { Category: 'Total Jobs', MarketShare: 0 },
        { Category: 'Total People', MarketShare: 0 },
        { Category: 'Total Students', MarketShare: 0 }
    ]

    // prepare jqxChart settings
    var settings = {
        title: "Development Plan Overview",
        description: "",
        showLegend: false,
        enableAnimations: true,
        padding: { left: 20, top: 5, right: 20, bottom: 5 },
        titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
        source: sampleData,
        xAxis:
            {
                dataField: 'Category',
                showGridLines: true,
                flip: false
            },
        colorScheme: 'scheme01',
        seriesGroups:
            [
                {
                    type: 'column',
                    columnsGapPercent: 100,
                    toolTipFormatSettings: { thousandsSeparator: ',' },
                    valueAxis:
                    {
                        unitInterval: 10,
                        maxValue: 100,
                        minValue: 0,
                    },
                    series: [
                            { dataField: 'MarketShare', displayText: 'Market share', formatSettings: { prefix: "%"} }
                        ]
                }
            ]
    };

    // setup the chart
    $('#chartContainer').jqxChart(settings);

    $("#jqxslider1").jqxSlider({ width: 850, min: 0, max: 100, value: 50, step: 5 });
    $("#jqxslider2").jqxSlider({ width: 850, min: 0, max: 100, value: 50, step: 5 });
    $("#jqxslider3").jqxSlider({ width: 850, min: 0, max: 100, value: 50, step: 5 });
    $("#jqxslider4").jqxSlider({ width: 850, min: 0, max: 100, value: 50, step: 5 });
    $("#jqxslider5").jqxSlider({ width: 850, min: 0, max: 100, value: 50, step: 5 });
    $("#jqxslider6").jqxSlider({ width: 850, min: 0, max: 100, value: 50, step: 5 });

    $('#jqxslider1').on('change', function (event) {
        var value = event.args.value;
        sampleData[0].MarketShare = value;
        sampleData[2].MarketShare = value;
        $('#chartContainer').jqxChart("update");
    });
    
    $('#jqxslider2').on('change', function (event) {
        var value = event.args.value;
        sampleData[1].MarketShare =value;
        $('#chartContainer').jqxChart("update");
    });
    
    $('#jqxslider3').on('change', function (event) {
        var value = event.args.value;
        sampleData[2].MarketShare =value;
        $('#chartContainer').jqxChart("update");
    });
    
    $('#jqxslider4').on('change', function (event) {
        var value = event.args.value;
        sampleData[3].MarketShare =value;
        $('#chartContainer').jqxChart("update");
    });
    
    $('#jqxslider5').on('change', function (event) {
        var value = event.args.value;
        sampleData[4].MarketShare =value;
        $('#chartContainer').jqxChart("update");
    });

    $('#jqxslider6').on('change', function (event) {
        var value = event.args.value;
        sampleData[4].MarketShare =value;
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