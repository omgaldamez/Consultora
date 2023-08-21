import * as d3 from "d3";

export function createHierarchy(jsondata) {
  return d3.hierarchy(jsondata, (d) => d.children);
}



export function parentFunction(jsondata, updateValue) {
  let mouseX = 0;
  let buttonTracker = [];
  let rootNode = d3.hierarchy(jsondata, (d) => d.children);
  var pathLinks = rootNode.links();
  var updatePathLinks;

  var circleLinks = rootNode.descendants();
  var updateCircleLinks;

  var textLinks = rootNode.descendants();
  var updateTextLinks;

  let dim = {
    width: window.screen.width * 0.6,
    height: window.screen.height * 3,
    margin: 50,
  };

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

  const zoom = d3.zoom()
    .scaleExtent([0.2, 5])
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

  svg.call(zoom);

  let g = svg.append("g")
  .attr("id", "gTree")
    .attr("transform", "translate(140,50)");

  let layout = d3.tree().size([dim.height - 50, dim.width - 320]);
  layout(rootNode);

  function update(data) {
    const linkGenerator = d3.linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    let group = g
      .selectAll("path")
      .data(data, (d, i) => d.target.data.name)
      .join(
        function (enter) {
          return enter.append("path")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("d", linkGenerator);
        },
        function (update) {
          return update;
        },
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

  update(pathLinks);

  function updateCircles(data) {
    g.selectAll("circle")
      .data(data, (d) => d.data.name)
      .join(
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
            .attr("class", "sel");
        },
        function (update) {
          return update;
        },
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
      .on("click", async function (d) {
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

  function updateText(data) {
    g.selectAll('text')
      .data(data, (d) => d.data.name)
      .join(
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
