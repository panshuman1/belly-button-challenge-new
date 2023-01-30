// Get the endpoint
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json' ;


function buildMetadata(sample) {
/**
   * buildMetadata () 
   * Author: AP | Date:13/Jan/2022  
   * Comment: This program is resposible to popular card containing ID's details  
*/

    d3.json(url).then((data) => {
      let metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
      
      
      // Use d3 to select the panel with id of `#sample-metadata`
      let PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      
      for (key in result) {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
      };

      //Old code 13Jan2022 Ireion Anthony 
      // Object.entries(result).forEach(([key, value]) => {
      //   PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      // });
  
    });
  };

 
  
  function builddummycharts(sample) {
     /**
   * builddummycharts () 
   * Author: AP | Date:13/Jan/2022  
   * Comment: This program is builds dummy charts are the begning of the program  
  */ 
     let sampleArrayDummy =[] ;
     //Call a function plot dummy plot so that they can be updated later 
     d3.json(url).then((data) => {
      
      let xx_samples = data.samples;
      
      // Filter the data for the object with the desired sample number
      let sampleArray = xx_samples.filter(sampleObj => sampleObj.id == sample);
      let result = sampleArray[0];

      // console.log(`The new dataset : ${result}`)
      // console.log(result.id);
      // console.log(result.sample_values[0]);
      // console.log(result.sample_values);
      // console.log(result.otu_labels);
      
      //Storing values inside new variable - better represntation
      let plot_sample_id =  result.id ;  
      let plot_sample_values =  result.sample_values;
      let plot_otu_ids =  result.otu_ids ;
      let plot_otu_labels=  result.otu_labels ;

      //Slicing top 10 values 
      let tten_sample_values =  plot_sample_values.slice(0,10);
      let tten_otu_ids =        plot_otu_ids.slice(0,10) ;
      let tten_otu_labels=      plot_otu_labels.slice(0,10) ;

      //Concatenating y-axis with OTU
      let y_otus = tten_otu_ids.map(item=> `OTU ${item}`);
      

      //Plotting Bar chart START  
      let trace = {
        x: tten_sample_values.reverse(),
        y: y_otus.reverse(),//tten_otu_ids,
        text: tten_otu_labels.reverse(),
        //name: "Bar Plot xxx",
      // width:100 ,
        type: "bar",
        orientation: "h"
      };
      let traceData = [trace];
    
      let layout = {
        title: "Top 10 OTU's",
      // bargap: 59,
        margin: {
            l: 100,
            t: 30
          } 
      };
    
      Plotly.newPlot("bar", traceData, layout);

    //Plotting Bar chart END 
    
    //Plotting Scatter chart
    let trace_bubble = {
        x:    plot_otu_ids,
        y:    plot_sample_values,
        text: plot_otu_labels,
        mode: 'markers',
        marker: {
          color: plot_otu_ids,
          size:  plot_sample_values,
          colorscale: "Earth"
        }
      };
      
      let data_bubble = [trace_bubble];
      
      let layout_bubble = {
        title: 'Bubble Chart',
        showlegend: false,
        height: 600,
        width: 1000
      };
      
      Plotly.newPlot('bubble', data_bubble, layout_bubble);
     
    });
  } ; 


  function buildCharts(sample) {
  /**
   * buildCharts () 
   * Author: AP | Date:13/Jan/2022  
   * Comment: This program is resposible to plot bar chart and bubble chart 
  */ 
  //This function will create dummy charts which will later be 
  builddummycharts(sample);
  let sampleArray =[] ;
  
  //Call a function plot dummy plot so that they can be updated later 
    d3.json(url).then((data) => {
      
      let xx_samples = data.samples;
      
      // Filter the data for the object with the desired sample number
      let sampleArray = xx_samples.filter(sampleObj => sampleObj.id == sample);
      let result = sampleArray[0];

      // console.log(`The new dataset : ${result}`)
      // console.log(result.id);
      // console.log(result.sample_values[0]);
      // console.log(result.sample_values);
      // console.log(result.otu_labels);
      
      //Storing values inside new variable - better represntation
      let plot_sample_id =  result.id ;  
      let plot_sample_values =  result.sample_values;
      let plot_otu_ids =  result.otu_ids ;
      let plot_otu_labels=  result.otu_labels ;

      //Slicing top 10 values 
      let tten_sample_values =  plot_sample_values.slice(0,10);
      let tten_otu_ids =        plot_otu_ids.slice(0,10) ;
      let tten_otu_labels=      plot_otu_labels.slice(0,10) ;

      //Concatenating y-axis with OTU
      let y_otus = tten_otu_ids.map(item=> `OTU ${item}`);


      // Call updatePlotly() when a change takes place to the DOM
      d3.selectAll("#selDataset").on("change", updatePlotly);
      let listItem = d3.select(this);
      console.log(`The ID value changed  ${listItem}`);

      function updatePlotly() {

        console.log(`Updating plotly`);  

        // Use D3 to select the dropdown menu
        // let dropdownMenu = d3.select("#selDataset");
        x = tten_sample_values.reverse();
        y = y_otus.reverse();
        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [y]);

      };  
      
      //When ID change charts should be updated 
      //d3.selectAll("#selDataset").on("change", function() {
      // What will be logged out? What is `this` in this case?
      //let listItem = d3.select(this);
      //console.log(`The value is ${listItem}`);
      //Update Plotly Bar Chart 
      //Update Plotly Dubble Chart 
      //});


     
     
    });
  };

function init() {
  /**
   * Init () 
   * Author: AP | Date:13/Jan/2022  
   * Comment: This is a wrapper program which call all other Programs. 
  */
  
    // Reference to the dropdown select element
    let selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json(url).then((data) => {
      let sampleNames = data.names;


    //Code to populate Test Subject ID No:
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      // Use the first sample from the list to build the initial plots
      let firstSample = sampleNames[0];
      buildCharts(firstSample); 
      buildMetadata(firstSample);
    });
  
  }; 
  
  //Added this function Ireion Anthony
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  };

  //Initiliazing the main function
  init();
