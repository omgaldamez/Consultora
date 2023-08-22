<script>
  import { onMount } from 'svelte';
  import { select, hierarchy, linkRadial, cluster, drag } from 'd3';
  import * as d3 from "d3";
  // Import the helper functions
  import { createHierarchy } from './d3Utils.js';

  // Load JSON data
  import data from './reconstructed_dataMOD.json';

  onMount(() => {
    const width = 928;
    const height = width;
    const cx = width * 0.5;
    const cy = height * 0.54;
    const radius = Math.min(width, height) / 2 - 80;

    const tree = d3.tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

      // Sort the tree and apply the layout.
  const root = tree(d3.hierarchy(data)
      .sort((a, b) => d3.ascending(a.data.name, b.data.name)));

    const svg = select('.chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-cx, -cy, width, height])
      .attr('style', 'width: 100%; height: auto; font: 10px sans-serif; background: rgba(0,0,0,0.5)');

      const zoom = d3.zoom()
    .scaleExtent([0.2, 5])
    .on("zoom", (event) => {
      svg.attr("transform", event.transform);
    });

  svg.call(zoom);


    svg.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll()
      .data(root.links())
      .join('path')
      .attr('d', linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));

    svg.append('g')
      .selectAll()
      .data(root.descendants())
      .join('circle')
      .attr('transform', d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr('fill', d => d.children ? '#555' : '#999')
      .attr('r', 5)
      .on("mouseover", function (d) {
          d3.select(this)
          .attr("fill", "orange")
            .transition()
            .duration(100)
            .attr("r", 12);
      })
      .on("mouseout", function (d) {
        d3.select(this)
        .attr("fill", d => d.children ? '#555' : '#999')
        .transition()
        .duration(100)
      .attr('r', 5);
      });

    svg.append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll()
      .data(root.descendants())
      .join('text')
      .attr('transform', d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr('dy', '0.31em')
      .attr('x', d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
      .attr('paint-order', 'stroke')
      .attr('stroke', 'none')
      .attr('fill', 'azure')
      .text(d => d.data.name);
  });

  let simulation; // Define the simulation variable
</script>

<div class="chart"></div>

<style>
  /* Add your custom styles here */
</style>
