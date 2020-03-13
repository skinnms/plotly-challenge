function buildMetadata(sample) {
    d3.json("samples.json").then(data => {
        var metadata = data.metadata;
        var resultList = metadata.filter(selection => selection.id == sample);
        var result = resultList[0];
        console.log("metadata", result);
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(function ([key, value]) {
            panel.append("p").text(`${key}: ${value}`);
        });
    });
}
function buildCharts(sample) {
    d3.json("samples.json").then(data => {
        var samples = data.samples;
        var resultList = samples.filter(selection => selection.id == sample);
        var result = resultList[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        console.log("chart data", result);
        var barChart = [
            {
                y: otu_ids,
                x: sample_values,
                text: otu_labels,
                type: "bar",
                orientation: "h"
            }
        ];
        var barLayout = {
            title: "Bacteria Cultures Found"
        };
        Plotly.newPlot("bar", barChart, barLayout);
    });
}
function init() {
    var dropDown = d3.select("#selDataset");
    d3.json("samples.json").then(data => {
        var sampleNames = data.names;
        console.log(sampleNames);
        sampleNames.forEach(function (sample) {
            dropDown
                .append("option")
                .text(sample)
                .property("value", sample);
        });
    });
}
init();
buildMetadata("1275");
buildCharts("1275");