<script>
  import arbol from "./reconstructed_dataMOD.json";
  import { onMount } from "svelte";
  import * as d3Utils from "./d3Utils"; // Import the functions from d3Utils.js
  import "../../styles/circleLayout.css";
  import * as d3 from "d3";

  let clickedChildrenNames = []; // Initialize an empty array to store children names

  let level = 0;

  let cardBackgroundImage = ""; // Initialize the variable for card background image

  // Define a variable to store the currently selected parent level
  let selectedParentLevel;

  // Get the root node from the tree data
  let originalRootNode = { ...arbol };

  // Array to keep track of the selected nodes at each level
  let selectedLevels = [originalRootNode];

  // Function to handle the selection of a parent level
  function handleParentLevelSelection(levelIndex) {
    // Get the selected parent node
    let selectedParent = selectedLevels[levelIndex];

    // If "back" option is selected, navigate to the previous level
    if (selectedParentLevel === "back" && selectedLevels.length > 1) {
      selectedLevels.pop();
      selectedParentLevel = ""; // Clear the selected parent level

      // Trigger the change event to update the options
      let selectElement = document.querySelector("#parentSelect");
      selectElement.dispatchEvent(new Event("change"));
    } else {
      // If a parent is selected, update the subsequent selected levels
      if (selectedParent) {
        let selectedChild = selectedParent.children.find(
          (child) => child.name === selectedParentLevel
        );
        if (selectedChild) {
          selectedLevels = selectedLevels.slice(0, levelIndex + 1); // Remove subsequent levels
          selectedLevels.push(selectedChild); // Add the selected child level
        }
      }
    }
    d3Utils.parentFunction(
      selectedLevels[selectedLevels.length - 1],
      selectedParentLevel
    );
  }

  // Function to navigate to the previous level
  function goBack() {
    if (selectedLevels.length > 1) {
      selectedLevels.pop();
      selectedParentLevel = ""; // Clear the selected parent level

      // Trigger the change event to update the options
      let selectElement = document.querySelector("#parentSelect");
      selectElement.dispatchEvent(new Event("change"));
    }
  }

  onMount(() => {
    // Call the parentFunction with the root node initially
    d3Utils.parentFunction(originalRootNode, null);

    // Listen for the custom event emitted by d3Utils
    document.addEventListener("circleClick", (event2) => {
      clickedChildrenNames = event2.detail;
      level = event.detail[0].level;

      console.log("SVE Clicked Children Names:", clickedChildrenNames);
      console.log("SVE LEVEL:", level);
  });
    d3.select(".clickTitle").style("background-image", function () {
      return `url(${d.data.img})`; // Set the background image URL
    });
  });
</script>

<div class="buttonGroup">
  <h2>Tree Structure</h2>
  <div class="rowButtons">
    <button
      on:click={() => {
        selectedParentLevel = "xd";
        selectedLevels = [originalRootNode];
        d3Utils.parentFunction(originalRootNode, null);
      }}>Inicio</button
    >
  
    <div>
      <button>
        Subnivel
        <select
          id="parentSelect"
          bind:value={selectedParentLevel}
          on:change={() =>
            handleParentLevelSelection(selectedLevels.length - 1)}
        >
          <option />
          {#each selectedLevels[selectedLevels.length - 1].children as child}
            {#if child.children}
              <!-- Check if the child has children -->
              <option
                value={child.name}
                selected={child.name === selectedParentLevel}
                >{child.name}</option
              >
            {/if}
          {/each}
        </select>
      </button>

      {#if selectedLevels.length > 1}
        <button on:click={goBack}>Atras</button>
      {/if}
    </div>
  </div>
</div>

<div class="contTree">
  <div id="chart" />

  {#if level === 2}
    <div class="dataTree">
      <div class="clickTitle">
        <div class="reportTitle" />
      </div>
      <div class="levelColumn">
        {#each clickedChildrenNames as artistContent}
          {#if artistContent.children}
            <div class="artistCard">
              <div
                class="cardArtist"
                style="background-image: url({artistContent.img})"
              >
                <div class="cardText">{artistContent.name}</div>
              </div>
            </div>
            <div class="artistItems">
              {#each artistContent.children as colectionContent}
                {#if colectionContent.children && colectionContent.children.length > 0}
                <div class="collectionWrapper">
                <div class="colectionCard">
                    <div class="card" style="background-image: url({colectionContent.img})">
                      <div class="cardText">{colectionContent.name}</div>
                    </div>
                  </div>
                    <div class="itemItems">
                      {#each colectionContent.children as itemContent}
                        <div class="itemCard">
                          <div
                            class="card"
                            style="background-image: url({itemContent.img})"
                          >
                            <div class="cardText">{itemContent.name}</div>
                          </div>
                        </div>
                      {/each}
                    </div>
                </div>
                {/if}
                {#if !colectionContent.children || colectionContent.children.length === 0}
                  <div class="itemCard">
                    <div
                      class="card"
                      style="background-image: url({colectionContent.img})"
                    >
                      <div class="cardText">{colectionContent.name}</div>
                    </div>
                  </div>
                {/if}
              {/each}
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>

<div class="controls">
  <div class="info">
    <ul>
      <li>Left mouse button - pan</li>
      <li>Mouse wheel - zoom</li>
    </ul>
  </div>
</div>

<style>
  li {
    color: brown;
  }

  #chart {
    width: 50vw;
  }

  :global(#gTree) {
    top: 0;
  }

  .artistItems {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .artistCard {
    display: flex;
    flex-direction: column;
    background-color: brown;
    border: 2px solid blue;
  }

  .colectionCard {
    background-color: blueviolet;
  }

  .collectionWrapper{
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .dataTree {
    display: flex;
    width: 50vw;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: auto;
    flex-direction: column;
  }

  .levelColumn {
    display: flex;
    flex-direction: column;
    background-color: antiquewhite;
    border: 2px solid black;
  }

  .card {
    width: 200px;
    height: 200px;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 10px;
  }

  .cardArtist {
    width: 300px;
    height: 300px;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 10px;
  }


  .clickTitle {
    width: 200px;
    height: 200px;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 10px;
  }

  .reportTitle {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px;
  }

  .cardText {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px;
  }
  .buttonGroup {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .contTree {
    display: flex;
    flex-wrap: nowrap;
  }

  .itemItems{
    background-color: aquamarine;
    display: flex;
    flex-direction: row;

  }

  .controls {
    position: fixed;
    top: 124px;
    left: 100px;
    padding: 12px;
    z-index: 10;
  }
</style>
