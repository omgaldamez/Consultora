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
  main{
    background-color: aliceblue;
  }

  :root {
    background: linear-gradient(-60deg, #B05846, #e2725b, #B05846);
    background-size: 400% 400%;
    animation: gradient 20s ease infinite;
    background-repeat: no-repeat;
    margin: 0;
  }
  

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

</style>
