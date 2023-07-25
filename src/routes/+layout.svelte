<script>
  import { page} from '$app/stores';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Menu from "./menu.svelte"

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

<Menu />


<main>
<slot/>
  
</main>

<style>
  /* CSS styles for the header, main, and footer */
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

</style>
