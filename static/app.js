function buildMetadata(sample) {

  d3.json("static/samples.json").then(data => {
    let objects = data.metadata;
    // Filter the data for the object with the correct sample number
    let resultArray = objects.filter(object => object.id==sample)[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");
    // Clear existing metadata
    panel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(resultArray).forEach(
      ([key,value]) => { panel.append("h5").text(`${key}:${value}`)
      });
  });
}

function buildCharts(sample) {
 
    // d3.json("samples.json").then(function(data) {
    //   // Filter the data for the object with the correct sample number
    //   object = data.samples.filter(function(objects) {
    //     objects.id==sample})[0];
    //   console.log(object);
    d3.json("static/samples.json").then((data) => {
      let objects = data.samples;
      let objectArray = objects.filter(object => object.id == sample);
      let result = objectArray[0];

      let sample_values = result.sample_values;
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;

      // Build a Bubble Chart
      var trace1 = {
        x: otu_ids.map(id =>`OTU${id}`),
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values,
          colorscale: 'Portland'
        }
      };
      
      var details = [trace1];
      
      var layout = {
        title: 'Overall Bacteria Sample Sizes',
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot('bubble', details, layout);

      // Build a Bar Chart
      var trace2 = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(id =>`OTU${id}`).reverse(),
        text: otu_labels.slice(0,10),
        type: "bar",
        orientation: "h",
        marker: {
          // color: otu_ids,
          colorscale: 'Portland'
        }
      };
      
      var details2 = [trace2];
      
      var layout2 = {
        title: 'Top 10 OTU Bacteria Samples',
        yaxis:{
          tickmode: "linear"
        },
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 30
        }
      };
      
      Plotly.newPlot('bar', details2, layout2);
    });
    
  };


function init() {
  // Save a reference to the select element
  
  // Use the list titled names to populate the select options
  d3.json("static/samples.json").then((data) => {

    console.log(data.names);

    let sample_options = data.names;
    
    let dataset = d3.select("#selDataset");

    sample_options.forEach(function(option) {
      dataset.append("option").text(option).property("value", option);
    });

    // Build initial plots;
    buildMetadata(sample_options[0]);
    buildCharts(sample_options[0]);
});

}

function optionChanged(newSample) {
  // Rebuild plots and metadata each time the option is changed
  buildCharts(newSample)
  buildMetadata(newSample)
};

// Initialize the dashboard
init();