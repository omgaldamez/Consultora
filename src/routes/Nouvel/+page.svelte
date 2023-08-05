<script>
  import arbol from "./treedata.json";
  import { onMount } from "svelte";
  import * as d3 from "d3"; // Import the d3 library

  onMount(() => {
    let data = arbol;
    console.log("data: ", data);
    console.log("Test");
    parentFunction(data);


});


function parentFunction(jsondata) {
    console.log("the data is");
    console.log(jsondata);

    let mouseX = 0; // Initialize mouseX to the initial position (e.g., width of SVG)

    //these global variables I should later get via closure
    let buttonTracker = [];
    let rootNode = d3.hierarchy(jsondata, (d) => d.children);
    var pathLinks = rootNode.links();
    var updatePathLinks;

    var circleLinks = rootNode.descendants();
    var updateCircleLinks;

    var textLinks = rootNode.descendants();
    var updateTextLinks;

    let dim = {
    'width': window.screen.width, 
    'height': window.screen.height*2, 
    'margin': 50    

};
    console.log("ROOT NODE: ",rootNode)
    console.log("pathLinks: ",pathLinks)
    console.log("circleLinks: ",circleLinks)
    console.log("textLinks: ",textLinks)
    console.log("dim: ",dim)
    console.log("mouseX: ",mouseX)



let svg = d3.select('#chart').append('svg')
    .style('background', 'black')
    .attr('width', dim.width)
    .attr('height', dim.height)
    .attr('margin', dim.margin);



     document.querySelector("#chart").classList.add("center");

    let g = svg.append('g')
            .attr('transform', 'translate(140,50)');

    let layout = d3.tree().size([dim.height-50, dim.width-320]);

    layout(rootNode);
    console.log(rootNode.links());
    console.log("----------------------");
    console.log(rootNode.descendants());
    //console.log(rootNode.descendants());
   //first lets create a path 
   let lines = g.selectAll('path');  


   function update(data) {

    
    console.log("X:", mouseX)
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
          .attr("d", linkGenerator) // Use the link generator here;
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
        .attr("d", linkGenerator) // Use the link generator here
        .attr("id", function (d, i) {
          return "path" + i;
        })
    );
}
    update(pathLinks); //rootNode.links()


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
          .attr("r", 16);
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
        console.log(
          "CLICK: ",
          d3.select(this)["_groups"][0][0]["attributes"].id.value
        );
        mouseX = d3.select(this)["_groups"][0][0]["attributes"].cx.value;
        //check to see if button already exists aka has been clicked
        //if it does, we need to send that data to update function
        //and remove that object

        let checkButtonExists = buttonTracker.filter(
          (button) => button.buttonId == buttonId
        );

        console.log("EXISTE", checkButtonExists[0]);
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
        console.log("AAAAAAAAAAAAAAAAA: ",valueArray);

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
          .text((d) => d.data.name);
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
        .attr('fill', 'yellow')
    );
}

updateText(textLinks);


  }
  

</script>


<div id="chart">
  
<div class="buttonGroup">
  <p>Tree Structure</p>
</div>
</div>

<style>
  /* All styles are defined as global */



  :global(p) {
    font-size: 14px;
    color: #fff;
  }

  :global(#chart) {
    overflow: visible;
  }

  :global(.center) {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
  }

  :global(.svg) {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  :global(.buttonGroup) {
    display: flex;
    justify-content: center;
  }

  :global(.buttonGroup button) {
    width: 120px;
    height: 30px;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    transition: transform 0.5s;
  }

  :global(.buttonGroup button:active) {
    transform: scale(1.2);
  }

  :global(.unselected) {
    background-color: rgb(77, 60, 224);
  }

  :global(.selected) {
    background-color: rgb(12, 189, 50);
  }

  :global(.buttonGroup button:nth-child(2)) {
    margin: 0 10px;
  }

  :global(.buttonGroup button:nth-child(3)) {
    margin-right: 10px;
  }

  :global(.tooltip) {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: #fff;
    min-width: 120px;
  }
</style>
