// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;

    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObject => sampleObject.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataarray = data.metadata.filter(sampleObject => sampleObject.id == sample);
    // Create a variable that holds the first sample in the array.
    var firstResult =  resultArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var metadata = metadataarray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = firstResult.otu_ids;
    var otu_labels = firstResult.otu_labels;
    var sample_values = firstResult.sample_values;
    

    // 3. Create a variable that holds the washing frequency.
   var washfrequency = parseFloat(metadata.wfreq);
    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    // Use Plotly to plot the bar data and layout.
   // 8. Create the trace for the bar chart. 
   var barData = [
    {
      y:yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    }
  ];
  // 9. Create the layout for the bar chart. 
  var barLayout = {
   title: "Top 10 Bacteria Cultures Found",
   margin: {t:30, l:150}
  };
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("bar", barData, barLayout);
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washfrequency,
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "black"},
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "yellowgreen" },
            { range: [8, 10], color: "green" }
          ],
        }
      }
    ];
    
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     width: 500,
     height: 425,
     margin: {t:0, b:0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);


    // Create the trace for the bubble chart.
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    // Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
    };

    // Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)
  });
}
