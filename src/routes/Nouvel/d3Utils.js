/*
   D3 Tree Visualization with Interactive Circles and Text
   This code defines a parent function to create a tree layout visualization using the D3 library.
   The visualization includes clickable circles, dynamic linking paths, and text labels.

   Functions:
   - updateChildrenNames(data): Updates an array with children names when a circle is clicked.
   - parentFunction(jsondata, updateValue): Renders the tree layout and interactive elements.

   Libraries:
   - d3: Data-driven documents (D3) library for visualizations.

   Variables:
   - childrenNames: Array to store names of children nodes.
   - mouseX: Horizontal position for interactive elements.
   - buttonTracker: Array to track clicked buttons.
   - rootNode: Root hierarchy of the data.
   - pathLinks: Links between nodes for path elements.
   - circleLinks: Array of descendant nodes for circle elements.
   - textLinks: Array of descendant nodes for text elements.
   - rootName: Name of the root node in the data.
   - dim: Dimensions for the SVG canvas.
   - svg: SVG container for the visualization.
   - zoom: Zoom behavior for the SVG canvas.
   - g: Group element for the tree layout.
   - layout: D3 tree layout function.

   Functions:
   - update(data): Updates path elements with dynamic linking.
   - updateCircles(data): Updates circle elements with interactions.
   - updateText(data): Updates text elements with interactions.

   Usage:
   - Call parentFunction(jsondata, updateValue) to render the visualization.

*/

import * as d3 from "d3";

// Clear the console
console.clear();

// Initialize an array to store children names
export let childrenNames = [];

// Update the childrenNames array when a circle is clicked
export function updateChildrenNames(data) {
  childrenNames = data.map(child => child);
}

// Define the parent function for rendering the tree layout
export function parentFunction(jsondata, updateValue) {
  // Initialize variables and retrieve hierarchy of data
  let mouseX = 0;
  let buttonTracker = [];
  let rootNode = d3.hierarchy(jsondata, (d) => d.children);
  var pathLinks = rootNode.links();
  var updatePathLinks;

  var circleLinks = rootNode.descendants();
  var updateCircleLinks;

  var textLinks = rootNode.descendants();
  var updateTextLinks;

  let rootName = jsondata.name;

  // Define dimensions of the SVG canvas
  let dim = {
    width: window.screen.width * 0.5,
    height: rootName === "Nouvel" ? window.screen.height * 2 : window.screen.height * 0.8,
    margin: 50,
  };

  // Select or create the SVG element
  let chartContainer = document.querySelector("#chart");
  let existingSvg = chartContainer.querySelector("svg");

  if (existingSvg) {
    existingSvg.remove();
  }

  let svg = d3.select("#chart").append("svg")
    .style("background", "rgba(0,0,0,0.4)")
    .attr("id", "svg")
    .attr("width", dim.width)
    .attr("height", dim.height)
    .attr("margin", dim.margin);

  // Define zoom behavior
  const zoom = d3.zoom()
    .scaleExtent([0.2, 5])
    .filter(function (event) {
      // Disable zoom on double click events
      return event.type !== "dblclick";
    })
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

  svg.call(zoom);

  // Create a group for the tree layout
  let g = svg.append("g")
    .attr("id", "gTree")
    .attr("transform", "translate(140,50)")
    .attr("width", dim.width)
    .attr("height", dim.height)
    .attr("margin", dim.margin);

  // Create a tree layout and calculate positions
  let layout = d3.tree().size([dim.height - 50, dim.width - 320]);
  layout(rootNode);

  // Function to update path links
  function update(data) {
    const linkGenerator = d3.linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    let group = g
      .selectAll("path")
      .data(data, (d, i) => d.target.data.name)
      .join(
        // Enter selection
        function (enter) {
          return enter.append("path")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("d", linkGenerator);
        },
        // Update selection
        function (update) {
          return update;
        },
        // Exit selection
        function (exit) {
          return exit.call((path) =>
            path
              .transition()
              .duration(300)
              .remove()
          );
        }
      )
      .call((path) =>
        path
          .transition()
          .duration(1000)
          .attr("d", linkGenerator)
          .attr("id", function (d, i) {
            return "path" + i;
          })
      );
  }

  // Update path links
  update(pathLinks);
  
  // Function to update circle elements
  function updateCircles(data) {
    g.selectAll("circle")
      .data(data, (d) => d.data.name)
      .join(
        // Enter selection
        function (enter) {
          return enter
            .append("circle")
            .attr("cx", (d) => mouseX)
            .attr("cy", (d) => d.x)
            .attr("r", 12)
            .attr("fill", (d) => (d.children === undefined ? "red" : "green"))
            .attr("id", (d, i) => d.data.name)
            .attr("data-value", (d, i) => d.data.value)
            .attr("data-connectsTo", (d, i) => d.data.connectsTo)
            .attr("data-img", (d, i) => d.data.img)
            .attr("data-level", (d, i) => d.data.level)
            .attr("class", "sel"); 
        },
        // Update selection
        function (update) {
          return update;
        },
        // Exit selection
        function (exit) {
          return exit.call((circle) =>
            circle
              .transition()
              .duration(300)
              .remove()
              .attr("cx", (d) => mouseX)
              .attr("r", (d) => 0)
          );
        }
      )
      .call((circle) =>
        circle
          .transition()
          .duration(1000)
          .attr("cx", (d) => d.y)
      )
      .on("mouseover", function (d) {

        
        d3.select(this)
          .attr("fill", "orange")
          .transition()
          .duration(100)
          .attr("r", 12);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .attr("fill", (d) => (d.children === undefined ? "red" : "green"))
          .transition()
          .duration(100)
          .attr("r", 12);
      })
      .on("click", function (event, d) {
        d3.select(".reportTitle")
          .text(function () {
            return d.data.name; // Set the text content to the circle's ID
          });
        // Change the style of .clickTitle
        d3.select(".clickTitle")
          .style("background-image", function () {
            return `url(${d.data.img})`; // Set the background image URL
          });

        // Update the childrenNames array when a circle is clicked
        updateChildrenNames(d.data.children);

        // Emit a custom event with the childrenNames array
        const event2 = new CustomEvent("circleClick", { detail: childrenNames });
        document.dispatchEvent(event2);
      })
      .on("dblclick", async function (d) {
        let buttonId = d3.select(this)["_groups"][0][0]["attributes"].id.value;
        mouseX = d3.select(this)["_groups"][0][0]["attributes"].cx.value;
        //check to see if button already exists aka has been clicked
        //if it does, we need to send that data to update function
        //and remove that object

        let checkButtonExists = buttonTracker.filter(
          (button) => button.buttonId == buttonId
        );

        if (checkButtonExists[0] != undefined) {
          //also remove this item from button tracker
          buttonTracker = buttonTracker.filter(
            (button) => button.buttonId != buttonId
          );

          //handle path update
          pathLinks = checkButtonExists[0].buttonPathData.concat(pathLinks);

          update(pathLinks);

          //handle  circle update
          circleLinks = checkButtonExists[0].buttonCircleData.concat(circleLinks);
          updateCircles(circleLinks);

          //handle text update
          textLinks = checkButtonExists[0].buttonTextData.concat(textLinks);
          updateText(textLinks);

          return;
        }

        // Get the hierarchical node containing the children of the clicked node
        const hierarchicalNode = circleLinks.find(node => node.data.name === buttonId);


        var valueArray = processedlinks(hierarchicalNode); // Pass the clicked node to processedlinks function
        updatePathLinks = pathLinks.filter(function (item) {
          return !valueArray.includes(item.target.data.name);
        });

        //now run the filter to get unfiltered items
        var clickedPathData = pathLinks.filter(function (item) {
          return valueArray.includes(item.target.data.name);
        });

        updateCircleLinks = circleLinks.filter(function (item) {
          return !valueArray.includes(item.data.name);
        });

        var clickedCircleData = circleLinks.filter(function (item) {
          return valueArray.includes(item.data.name);
        });

        updateTextLinks = textLinks.filter(function (item) {
          return !valueArray.includes(item.data.name);
        });

        var clickedTextData = textLinks.filter(function (item) {
          return valueArray.includes(item.data.name);
        });

        //now we push the circleData to an array
        buttonTracker.push({
          buttonId: buttonId,
          buttonPathData: clickedPathData,
          buttonCircleData: clickedCircleData,
          buttonTextData: clickedTextData,
        });

        update(updatePathLinks);
        updateCircles(updateCircleLinks);
        updateText(updateTextLinks);

        function processedlinks(node) {
          var valueArray = [];

          if (node.children && Array.isArray(node.children)) {
            for (const child of node.children) {
              valueArray.push(child.data.name);
              // Recursively call the function for each child to get their children
              const childrenValues = processedlinks(child);
              valueArray.push(...childrenValues);
            }
          }
          return valueArray;
        }

        pathLinks = updatePathLinks;
        circleLinks = updateCircleLinks;
        textLinks = updateTextLinks;
      });

  }

  updateCircles(circleLinks);

  // Function to update text elements
  function updateText(data) {
    g.selectAll('text')
      .data(data, (d) => d.data.name)
      .join(
        // Enter selection
        function (enter) {
          return enter
            .append('text')
            .attr('x', (d) => mouseX)
            .attr('y', (d) => d.x)
            .attr('font-size', 0)
            .text((d) => d.data.name)
            .on("mouseenter", function (event, d) {
              let buttonId = d.data.name;

              // Find the circle with the same 'connectsTo' attribute
              let connectedCircle = g.select(`circle[data-connectsTo='${buttonId}']`);

              if (!connectedCircle.empty()) {
                // Change the fill of the connected circle to black
                connectedCircle.attr("fill", "black");

                // Find the text associated with the connected circle
                let connectedText = g.select(`text[id='${connectedCircle.attr("id")}']`);

                if (!connectedText.empty()) {
                  // Change the fill color of the connected text to black
                  connectedText.attr("fill", "black");
                  // Add cursor pointer style
                  connectedText.attr('cursor', 'pointer');
                }
              }
            })
            .on("mouseleave", function (event, d) {
              let buttonId = d.data.name;

              // Find the circle with the same 'connectsTo' attribute
              let connectedCircle = g.select(`circle[data-connectsTo='${buttonId}']`);

              if (!connectedCircle.empty()) {
                // Find the text associated with the connected circle
                let connectedText = g.select(`text[id='${connectedCircle.attr("id")}']`);

                if (!connectedText.empty()) {
                  // Change the fill color of the connected text back to its original color
                  connectedText.attr("fill", "black");
                  // Remove cursor pointer style
                  connectedText.attr('cursor', 'auto');
                }

                // Change the fill of the connected circle back to its original color
                connectedCircle.attr("fill", (d) => (d.children === undefined ? "red" : "green"));
              }
            });
        },
        function (update) {
          return update;
        },
        function (exit) {
          return exit.call((text) =>
            text
              .transition()
              .duration(300)
              .remove()
              .attr('x', (d) => mouseX)
              .attr('font-size', 0)
          );
        }
      )
      .call((text) =>
        text
          .transition()
          .duration(1000)
          .attr('x', (d) => d.y + 20)
          .attr('font-size', 15)
          .attr('fill', 'black')
      );

  }

  updateText(textLinks);

}
