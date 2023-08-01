<script>
  import { page} from '$app/stores';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import "../../styles/circleLayout.css";

  let linkClicked = false;
  let transitionEnded = false;

  // Perform actions on component mount
  onMount(() => {
    setTimeout(() => {
      transitionEnded = true;
    }, 300); // Adjust the timeout value to match the transition duration in CSS
  });

  console.log("PAGE DATA: ", $page.route.id);
</script>


<main
  class="global-gradient">
  <slot></slot>
  <!-- Move the SVG element inside the slotContent -->
</main>

<style>
  /* CSS styles for the header, main, and footer */


</style>
