<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import jsonData from "./output.json";

  let svg;

  onMount(() => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 1200 - margin.left - margin.right;
    const height = 900 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    const angleStep = (2 * Math.PI) / jsonData.nodes.length;

    svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

      const container = svg
      .append("g")
      .attr("transform", `translate(${width / 2 + margin.left},${height / 2 + margin.top})`); // Center the visualization with margins

    const data = jsonData;

    const nodeCount = data.nodes.length;

const x = d3.scalePoint()
  .range([0, 2 * Math.PI])
  .domain(data.nodes.map((d) => d.id))
  .padding(0.01); // Adjust the padding as needed

const nodes = container
  .selectAll("circle")
  .data(data.nodes)
  .enter()
  .append("circle")
  .attr("cx", (d) => radius * Math.cos(x(d.id)))
  .attr("cy", (d) => radius * Math.sin(x(d.id)))
  .attr("r", 15)
  .style("fill", "#69b3a2");

  const labels = container
  .selectAll("mylabels")
  .data(data.nodes)
  .enter()
  .append("text")
  .text((d) => d.nameArtist)
  .style("text-anchor", "middle")
  .attr("transform", (d) => {
    const angle = (x(d.id) * 180) / Math.PI - 90;
    const labelRadius = radius + 25; // Adjust this value to control distance from the circle

    // Calculate the x and y offsets based on quadrant
    let xOffset, yOffset;
    if (angle > -90 && angle < 90) {
      xOffset = labelRadius * Math.cos(x(d.id));
      yOffset = labelRadius * Math.sin(x(d.id));
    } else {
      xOffset = labelRadius * Math.cos(x(d.id));
      yOffset = labelRadius * Math.sin(x(d.id)); // Keep top labels at the top
    }

    return `translate(${xOffset}, ${yOffset}) rotate(${angle})`;
  });


    const idToNode = {};
    data.nodes.forEach(function (n) {
      idToNode[n.id] = n;
    });

    const links = container
      .selectAll("mylinks")
      .data(data.links)
      .enter()
      .append("path")
      .attr("d", function (d) {
        const sourceNode = idToNode[d.source];
        const targetNode = idToNode[d.target];
        const sourceX = radius * Math.cos(x(sourceNode.id));
        const sourceY = radius * Math.sin(x(sourceNode.id));
        const targetX = radius * Math.cos(x(targetNode.id));
        const targetY = radius * Math.sin(x(targetNode.id));

        const controlX = (sourceX + targetX) / 2;
        const controlY = (sourceY + targetY) / 2;

        return `M${sourceX},${sourceY}Q${controlX},${controlY},${targetX},${targetY}`;
      })
      .style("fill", "none")
      .attr("stroke", "black");

      nodes
  .on("mouseover", function (node) {
    const hoveredNodeId = node.id;
    console.log("Hovered Node ID:", hoveredNodeId);

    // Highlight the hovered node
    d3.select(this).style("fill", "#69b3b2");

    // Highlight the connected links
    links
      .style("stroke", link_d =>
        link_d.source.id === hoveredNodeId || link_d.target.id === hoveredNodeId
          ? "#69b3b2"
          : "#b8b8b8"
      )
      .style("stroke-width", link_d =>
        link_d.source.id === hoveredNodeId || link_d.target.id === hoveredNodeId ? 4 : 1
      );

    // Get the IDs of connected nodes
    const connectedNodeIds = links
      .filter(link_d => link_d.source.id === hoveredNodeId || link_d.target.id === hoveredNodeId)
      .data()
      .flatMap(link_d => [link_d.source.id, link_d.target.id]);

    // Highlight connected nodes
    nodes
      .style("fill", node => (connectedNodeIds.includes(node.id) ? "#69b3b2" : "#B8B8B8"));
  })
  .on("mouseout", function () {
    // Reset the node, link, and label styles
    nodes.style("fill", "#69b3a2");
    links.style("stroke", "black").style("stroke-width", "1");
  });



    container
      .append("text")
      .attr("text-anchor", "middle")
      .style("fill", "#B8B8B8")
      .style("font-size", "17px")
      .attr("x", 50)
      .attr("y", -height / 2 + 60);
  });
</script>

<div id="my_dataviz"></div>

<style>
  :global(svg) {
    display: flex;
  }

  :global(g) {
    display: flex;
  }

  #my_dataviz {
    height: 100vh;
  }
</style>
