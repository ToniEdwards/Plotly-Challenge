function buildMetadata(sample) {

    // Filter the data for the object with the correct sample number
    
    // Use d3 to select the panel with id of `#sample-metadata`

    // Clear existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.


    // BONUS: Build the Gauge Chart
  
}

function buildCharts(sample) {
 
    // d3.json("samples.json").then(function(data) {
    //   // Filter the data for the object with the correct sample number
    //   object = data.samples.filter(function(objects) {
    //     objects.id==sample})[0];
    //   console.log(object);
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];

      let sample_values = result.sample_values;
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;
      

      // Build a Bubble Chart
      var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values,
          colorscale: 'Portland'
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'OTU Chart',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', data, layout);

      // Build a Bar Chart
    });
    
  };

function init() {
  // Save a reference to the select element


  // Use the list titled names to populate the select options

    // Build initial plots
    buildCharts(940)

}

function optionChanged(newSample) {
  // Rebuild plots and metadata each time the option is changed

}

// Initialize the dashboard
init();