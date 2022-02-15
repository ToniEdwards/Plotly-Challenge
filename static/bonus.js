const file = "data/samples"

d3.json(file).then(function(samples) {
    console.log(samples)
});


var sample_values = d3.select(samples.sample_values)
var otu_ids = d3.select(samples.otu_ids)
var otu_labels = d3.select(samples.otu_labels)