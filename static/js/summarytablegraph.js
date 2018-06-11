
// Read data from the filtered selection made bu the user
// and render as a table



// Retail Table
function do_retail(rows){

    console.log(rows);

      var table = d3.select("#datatableretail").append("table");
          thead = table.append("thead");
          tbody = table.append("tbody");
    
      thead.append("th").text("");
      thead.append("th").text("Retail");
      thead.append("th").text("");
    
      var tr = tbody.selectAll("tr")
          .data(rows)
          .enter().append("tr");
    
      var td = tr.selectAll("td")
            .data(function(d) { return [d.Source, d.Retail]; })
          .enter().append("td")
            .text(function(d) { return d; });
    
      var width = 80,
          height = d3.select("table")[0][0].clientHeight,
          mx = 10,
          radius = 2;
    
      // Now add the chart column
      d3.select("#datatableretail tbody tr").append("td")
        .attr("id", "chartretail")
        .attr("width", width + "px")
        .attr("rowspan", rows.length);
    
      var chart = d3.select("#chartretail").append("svg")
          .attr("class", "chart")
          .attr("width", width)
          .attr("height", height);
    
      var maxCategory = 0;
      var minCategory = Number.MAX_VALUE;
      for (i=0; i < rows.length; i++) {
        if (rows[i].Retail > maxCategory) { maxCategory = rows[i].Retail; }
        if (rows[i].Retail < minCategory) { minCategory = rows[i].Retail; }
      }
    
      var xscale = d3.scale.linear()
        .domain([minCategory, maxCategory])
        .range([mx, width-mx])
        .nice();


    console.log(minCategory, maxCategory);
    
      var ydata = rows.map(function(t) { return t.Source; });
      
      var yscale = d3.scale.ordinal()
        .domain(ydata)
        .rangeBands([0, height]);
    
      chart.selectAll(".xaxislabel")
          .data(xscale.ticks(2))
        .enter().append("text")
          .attr("class", "xaxislabel")
          .attr("x", function(d) { return xscale(d); })
          .attr("y", 10)
          .attr("text-anchor", "middle")
          .text(String)
    
      chart.selectAll(".xaxistick")
          .data(xscale.ticks(2))
        .enter().append("line")
          .attr("x1", function(d) { return xscale(d); })
          .attr("x2", function(d) { return xscale(d); })
          .attr("y1", 10)
          .attr("y2", height)
          .attr("stroke", "#eee")
          .attr("stroke-width", 1);
    
          console.log(rows);

      chart.selectAll(".line")
          .data(rows)
        .enter().append("line")
          .attr("x1", function(d) { return xscale(d.Retail); })
          .attr("y1", function(d) { return yscale(d.Source) + yscale.rangeBand()/2; })
          .attr("x2", function(d,i) { return rows[i+1] ? xscale(rows[i+1].Retail) : xscale(d.Retail); })
          .attr("y2", function(d,i) { return rows[i+1] ? yscale(rows[i+1].Source) + yscale.rangeBand()/2 : yscale(d.Source) + yscale.rangeBand()/2; })
          .attr("stroke", "#777")
          .attr("stroke-width", 1);
    
    
      var pt = chart.selectAll(".pt")
          .data(rows)
        .enter().append("g")
          .attr("class", "pt")
          .attr("transform", function(d) { return "translate(" + xscale(d.Retail) + "," + (yscale(d.Source) + yscale.rangeBand()/2) + ")"; });
    
      pt.append("circle")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", radius)
          .attr("opacity", .5)
          .attr("fill", "#ff0000");
   
}

// Residential table

function do_residential(rows){

    console.log(rows);

      var table = d3.select("#datatableresid").append("table");
          thead = table.append("thead");
          tbody = table.append("tbody");
    
      thead.append("th").text("");
      thead.append("th").text("Residential");
      thead.append("th").text("");
    
      var tr = tbody.selectAll("tr")
          .data(rows)
          .enter().append("tr");
    
      var td = tr.selectAll("td")
            .data(function(d) { return [d.Source, d.Residential]; })
          .enter().append("td")
            .text(function(d) { return d; });
    
      var width = 80,
          height = d3.select("table")[0][0].clientHeight,
          mx = 10,
          radius = 2;
    
      // Now add the chart column
      d3.select("#datatableresid tbody tr").append("td")
        .attr("id", "chartresid")
        .attr("width", width + "px")
        .attr("rowspan", rows.length);
    
      var chart = d3.select("#chartresid").append("svg")
          .attr("class", "chart")
          .attr("width", width)
          .attr("height", height);
    
      var maxOffice = 0;
      var minOffice = Number.MAX_VALUE;
      for (i=0; i < rows.length; i++) {
        if (rows[i].Residential > maxOffice) { maxOffice = rows[i].Residential; }
        if (rows[i].Residential < minOffice) { minOffice = rows[i].Residential; }
      }
    
      var xscale = d3.scale.linear()
        .domain([minOffice, maxOffice])
        .range([mx, width-mx])
        .nice();


    console.log(minOffice, maxOffice);
    
      var ydata = rows.map(function(t) { return t.Source; });
      
      var yscale = d3.scale.ordinal()
        .domain(ydata)
        .rangeBands([0, height]);
    
      chart.selectAll(".xaxislabel")
          .data(xscale.ticks(2))
        .enter().append("text")
          .attr("class", "xaxislabel")
          .attr("x", function(d) { return xscale(d); })
          .attr("y", 10)
          .attr("text-anchor", "middle")
          .text(String)
    
      chart.selectAll(".xaxistick")
          .data(xscale.ticks(2))
        .enter().append("line")
          .attr("x1", function(d) { return xscale(d); })
          .attr("x2", function(d) { return xscale(d); })
          .attr("y1", 10)
          .attr("y2", height)
          .attr("stroke", "#eee")
          .attr("stroke-width", 1);
    
          console.log(rows);

      chart.selectAll(".line")
          .data(rows)
        .enter().append("line")
          .attr("x1", function(d) { return xscale(d.Residential); })
          .attr("y1", function(d) { return yscale(d.Source) + yscale.rangeBand()/2; })
          .attr("x2", function(d,i) { return rows[i+1] ? xscale(rows[i+1].Residential) : xscale(d.Residential); })
          .attr("y2", function(d,i) { return rows[i+1] ? yscale(rows[i+1].Source) + yscale.rangeBand()/2 : yscale(d.Source) + yscale.rangeBand()/2; })
          .attr("stroke", "#777")
          .attr("stroke-width", 1);
    
    
      var pt = chart.selectAll(".pt")
          .data(rows)
        .enter().append("g")
          .attr("class", "pt")
          .attr("transform", function(d) { return "translate(" + xscale(d.Residential) + "," + (yscale(d.Source) + yscale.rangeBand()/2) + ")"; });
    
      pt.append("circle")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", radius)
          .attr("opacity", .5)
          .attr("fill", "#ff0000");
   
}


// Table Office

function do_office(rows){
    

    console.log(rows);

      var table = d3.select("#datatableoffice").append("table");
          thead = table.append("thead");
          tbody = table.append("tbody");
    
      thead.append("th").text("");
      thead.append("th").text("Office Space");
      thead.append("th").text("");
    
      var tr = tbody.selectAll("tr")
          .data(rows)
          .enter().append("tr");
    
      var td = tr.selectAll("td")
            .data(function(d) { return [d.Source, d.Office]; })
          .enter().append("td")
            .text(function(d) { return d; });
    
      var width = 80,
          height = d3.select("table")[0][0].clientHeight,
          mx = 10,
          radius = 2;
    
      // Now add the chart column
      d3.select("#datatableoffice tbody tr").append("td")
        .attr("id", "chartoff")
        .attr("width", width + "px")
        .attr("rowspan", rows.length);
    
      var chart = d3.select("#chartoff").append("svg")
          .attr("class", "chart")
          .attr("width", width)
          .attr("height", height);
    
      var maxOffice = 0;
      var minOffice = Number.MAX_VALUE;
      for (i=0; i < rows.length; i++) {
        if (rows[i].Office > maxOffice) { maxOffice = rows[i].Office; }
        if (rows[i].Office < minOffice) { minOffice = rows[i].Office; }
      }
    
      var xscale = d3.scale.linear()
        .domain([minOffice, maxOffice])
        .range([mx, width-mx])
        .nice();


    console.log(minOffice, maxOffice);
    
      var ydata = rows.map(function(t) { return t.Source; });
      
      var yscale = d3.scale.ordinal()
        .domain(ydata)
        .rangeBands([0, height]);
    
      chart.selectAll(".xaxislabel")
          .data(xscale.ticks(2))
        .enter().append("text")
          .attr("class", "xaxislabel")
          .attr("x", function(d) { return xscale(d); })
          .attr("y", 10)
          .attr("text-anchor", "middle")
          .text(String)
    
      chart.selectAll(".xaxistick")
          .data(xscale.ticks(2))
        .enter().append("line")
          .attr("x1", function(d) { return xscale(d); })
          .attr("x2", function(d) { return xscale(d); })
          .attr("y1", 10)
          .attr("y2", height)
          .attr("stroke", "#eee")
          .attr("stroke-width", 1);
    
          console.log(rows);

      chart.selectAll(".line")
          .data(rows)
        .enter().append("line")
          .attr("x1", function(d) { return xscale(d.Office); })
          .attr("y1", function(d) { return yscale(d.Source) + yscale.rangeBand()/2; })
          .attr("x2", function(d,i) { return rows[i+1] ? xscale(rows[i+1].Office) : xscale(d.Office); })
          .attr("y2", function(d,i) { return rows[i+1] ? yscale(rows[i+1].Source) + yscale.rangeBand()/2 : yscale(d.Source) + yscale.rangeBand()/2; })
          .attr("stroke", "#777")
          .attr("stroke-width", 1);
    
    
      var pt = chart.selectAll(".pt")
          .data(rows)
        .enter().append("g")
          .attr("class", "pt")
          .attr("transform", function(d) { return "translate(" + xscale(d.Office) + "," + (yscale(d.Source) + yscale.rangeBand()/2) + ")"; });
    
      pt.append("circle")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", radius)
          .attr("opacity", .5)
          .attr("fill", "#ff0000");
   
}


// Read all csv data

d3.csv("../static/resources/filter/sample2.csv", function(error, csv) {
    rows = [];

    csv.forEach(function(row) {
        rows.push(row);
      });

    do_office(rows);
    do_residential(rows);
    do_retail(rows);
    
 
});