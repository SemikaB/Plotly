// Deliverable 1
  
  // 1. Create the buildCharts function.
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("JS/data/samples.json").then((data) => {
      // 3. Create a variable that holds the samples array. 
      var samples = data.samples;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      //  5. Create a variable that holds the first sample in the array.
      var result = resultArray[0];
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var  ids = result.otu_ids;
      var labels = result.otu_labels.slice(0, 10).reverse();
      var values = result.sample_values.slice(0,10).reverse();
  
      var bubbleLabels = result.otu_labels;
      var bubbleValues = result.sample_values;
  
      // 7. Create the yticks for the bar chart.
    
      var yticks = ids.map(sampleObj => "OTU " + sampleObj).slice(0,10).reverse();
  
      console.log(yticks)
  
      // 8. Create the trace for the bar chart. 
      var barData = [{
        x: values,
        y: yticks,
        type: "bar",
        orientation: "h",
        text: labels 
      }];
      // 9. Create the layout for the bar chart. 
      var barLayout = {
       title: "Top 10 Bacteria Cultures Discovered"
      };
      // 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout);
  
      // 1. Create the trace for the bubble chart.
      
      var bubbleData = [{
        x: ids,
        y: bubbleValues,
        text: bubbleLabels,
        mode: "markers",
         marker: {
           size: bubbleValues,
           color: bubbleValues,
           colorscale: "Portland" 
         }
      }];
    
      // 2. Create the layout for the bubble chart.
      var bubbleLayout = {
          title: "Bacteria Cultures Per Sample",
          xaxis: {title: "OTU ID"},
          automargin: true,
          hovermode: "closest"
      };
    
      // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", bubbleData, bubbleLayout)
  
      // 1. Create a variable that filters the metadata array for the object with the desired sample number.
      var metadata = data.metadata;
      var gaugeArray = metadata.filter(metaObj => metaObj.id == sample);
  
      // Create a variable that holds the first sample in the array.
      // 2. Create a variable that holds the first sample in the metadata array.
      
      var gaugeResult = gaugeArray[0];
  
      // Create variables that hold the otu_ids, otu_labels, and sample_values.
      // 3. Create a variable that holds the washing frequency.
     
      var wfreqs = gaugeResult.wfreq;
      console.log(wfreqs)
  
      // 4. Create the trace for the gauge chart.
      var gaugeData = [{
        value: wfreqs,
        type: "indicator",
        mode: "gauge+number",
        title: {text: "<b> Belly Button Washing Frequency </b> <br></br> Scrubs Per Week"},
        gauge: {
          axis: {range: [null,10], dtick: "2"},
  
          bar: {color: "black"},
          steps:[
            {range: [0, 2], color: "red"},
            {range: [2, 4], color: "orange"},
            {range: [4, 6], color: "yellow"},
            {range: [6, 8], color: "lightgreen"},
            {range: [8, 10], color: "green"}
          ],
          dtick: 2
        }
      }];
      
      // 5. Create the layout for the gauge chart.
      var gaugeLayout = { 
       automargin: true
      };
  
      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gaugeData, gaugeLayout)
    });
  }
  