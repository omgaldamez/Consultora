<!-- HierarchyMap.svelte -->
<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3'; // Import the d3 library

  const data = {
    name: 'Root',
    children: [
      {
        name: 'Node 1',
        children: [
          { name: 'Leaf 1.1' },
          { name: 'Leaf 1.2' }
        ]
      },
      {
        name: 'Node 2',
        children: [
          { name: 'Leaf 2.1' },
          { name: 'Leaf 2.2' }
        ]
      }
    ]
  };

  let svgElement;

  onMount(() => {
    // Set up dimensions
    const width = 400;
    const height = 200;

    // Create the tree layout
    const treeLayout = d3.tree().size([height, width]);

    // Create the SVG container
    const svg = d3.select(svgElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(40, 0)'); // Shift the tree to avoid cutting off nodes

    // Create a hierarchy from the data
    const root = d3.hierarchy(data);

    // Assign positions to each node using the tree layout
    treeLayout(root);

    // Create links between nodes
    const links = root.links();
    svg.selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)
      );

    // Create nodes
    const nodes = root.descendants();
    svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('cx', d => d.y)
      .attr('cy', d => d.x)
      .attr('r', 4);

    // Add labels to nodes
    svg.selectAll('.label')
      .data(nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => d.y + 10)
      .attr('y', d => d.x)
      .text(d => d.data.name);

    // Add interactivity to toggle children on click
    svg.selectAll('.node')
      .on('click', (event, d) => {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        treeLayout(root);
        update();
      });

    function update() {
      svg.selectAll('.node')
        .attr('cx', d => d.y)
        .attr('cy', d => d.x)
        .attr('fill', d => d._children ? 'blue' : 'white');

      svg.selectAll('.link')
        .attr('d', d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x)
        );

      // Update the position of labels
      svg.selectAll('.label')
        .attr('x', d => d.y + 10)
        .attr('y', d => d.x);
    }
  });
</script>

<div class="hierarchy-map"> <!-- Added class "hierarchy-map" -->
  <h1>Hierarchy Map with D3.js and Svelte</h1>
  <div bind:this={svgElement}></div>
</div>

<style>
  /* Add any custom styles here */
  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }

  .node {
    fill: white;
    stroke: steelblue;
    stroke-width: 1.5px;
  }

  .label {
    font-size: 12px;
  }
</style>
