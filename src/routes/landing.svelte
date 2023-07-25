<script>

  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import "../styles/global.css";
  import { tweened } from 'svelte/motion';

  // Initialize variables for tracking link clicks and transition status
  let linkClicked = false;
  let transitionEnded = false;
  let visible = false;


  // Create a tweened store for scroll position
  const scrollY = tweened(0, { duration: 500, easing: t => t * t * t });

  // Function to handle smooth scrolling
  function smoothScroll(targetY) {
    scrollY.set(window.scrollY);
    scrollY.update(value => targetY);
  }

  // Perform actions on component mount
  onMount(() => {
    // Set transitionEnded to true after a timeout
    setTimeout(() => {
      transitionEnded = true;
    }, 300); // Adjust the timeout value to match the transition duration in CSS
    visible = true;
    // Listen to the window load event to trigger the transition after navigation
    window.addEventListener("load", () => {
      transitionEnded = true;
    });
  });


// Function to handle link clicks
function handleLinkClick(e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href')); // Get the target element
  target.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the target element
  linkClicked = true;
  // Reset linkClicked to false after a short delay
  setTimeout(() => {
    linkClicked = false;
  }, 500); // Adjust the timeout value to your preference
}

</script>
<div id="Pag1" class="landBkg">
<div 
  class="slotContent"
  transition:fade={{ duration: 300 }}
  class:page-transition={linkClicked && transitionEnded}
>
{#if visible}
  <div class="hero">
    <!-- Agregar esqIzq en intro -->
    <div class="intro">
        <h1 transition:fly={{ y: 50, duration: 1000, delay: 500 }}>
          {@html `<strong>Somos</strong>`}
        </h1>
        <h1 transition:fly={{ y: 50, duration: 1000, delay: 500 }}>
          {@html `<strong style="color: burlywood;">C</strong><strong>ynthia</strong> <strong>Herrera<br> </strong>y 
          <strong style="color: cornsilk;">O</strong><strong>mar</strong> <strong>Galdámez</strong>`}
        </h1>
        <h2
          class="h2Intro"
          transition:fly={{ x: -200, duration: 1000, delay: 1500 }}
        >
          Consultores en soluciones de visualización y análisis de datos
        </h2>
        <p class="lastLinkIntro" transition:fly={{ y: 50, duration: 1000, delay: 2500 }}>
          {@html `Transformamos <strong>datos</strong> complejos en <strong>visualizaciones</strong> con <strong>data storytelling</strong>`}
        </p>
    </div>
    <!-- Agregar esqDer en side -->
      <div
        class="side"
      >

      <a href="#Pag2" target="_top" on:click={handleLinkClick}
      transition:fly={{ y: 50, duration: 2000, delay: 3500 }}
      >Portafolio</a>


      </div>
  </div>
  {/if}
</div>
</div>

<style>

a {
    margin-bottom: 1rem;
    color: cornsilk;
    text-decoration: none;
    transition: opacity 0.3s;
    padding-right: 50px;
    font-size: 1.5vw;
    margin: 8px 0;
    cursor: pointer;
    z-index: 2;
      margin-left: 36px;
  }

  a:hover {
    color: aliceblue;
      text-decoration: aliceblue;
  }


.landBkg{
    background: linear-gradient(-60deg, #B05846, #e2725b, #B05846);
    background-size: 400% 400%;
    animation: gradient 20s ease infinite;
    background-repeat: no-repeat;
    margin: 0;
    position: relative;
    width: 100vw;
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

  .esqIzq {
    /* ... Other styles ... */
    position: relative;
    border-radius: 3px;
    z-index: 5;
  }

  .esqIzq::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    border-radius: 5px;
    border-style: solid;
    /* background-color: rgba(0, 0, 0, 0.1); */
    z-index: -1; /* Push the pseudo-element behind the content of .intro */
    animation: animatedgradient 20s ease alternate infinite;
    background-size: 200% 200%; /* Add the background-size property for animation */
  }

  @keyframes animatedgradient {
    0% {
      transform: scaleX(0.5);
      transform-origin: left;
      border: 10px solid #B05846;
box-shadow: -10px -5px 5px rgba(63, 62, 62, 0.3);
    border-bottom: none;
    border-right: none;
    }
    50% {
      transform: scaleX(1);
      transform-origin: left;
      border: 5px solid #C96551;
box-shadow: -10px -5px 5px rgba(63, 62, 62, 0.3);
    border-bottom: none;
    border-right: none;
    }
    75% {
      transform: scaleX(1);
      transform-origin: left;
      border: 5px solid #C96551;
box-shadow: -10px -5px 5px rgba(63, 62, 62, 0.3);
    border-bottom: none;
    border-right: none;
    }
    100% {
      transform: scaleX(0.5);
      transform-origin: left;
      border: 10px solid #B05846;
box-shadow: -10px -5px 5px rgba(63, 62, 62, 0.3);
    border-bottom: none;
    border-right: none;
    }
  }
 


  .esqDer {
    /* ... Other styles ... */
    position: relative;
    border-radius: 3px;
    z-index: 5;
  }

  .esqDer::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50%;
    border-radius: 5px;
    border-style: solid;
    /* background-color: rgba(0, 0, 0, 0.1); */
    z-index: -1; /* Push the pseudo-element behind the content of .intro */
    animation: animatedgradient-d 20s ease alternate infinite;
    background-size: 200% 200%; /* Add the background-size property for animation */
  }

  @keyframes animatedgradient-d {
    0% {
      transform: scaleX(0.5);
      transform-origin: right;
      border: 10px solid #B05846;
box-shadow: 10px 5px 5px rgba(63, 62, 62, 0.3);
    border-top: none;
    border-left: none;
    }
    50% {
      transform: scaleX(1);
      transform-origin: right;
      border: 5px solid #C96551;
box-shadow: 10px 5px 5px rgba(63, 62, 62, 0.3);
    border-top: none;
    border-left: none;
    }
    75% {
      transform: scaleX(1);
      transform-origin: right;
      border: 5px solid #C96551;
box-shadow: 10px 5px 5px rgba(63, 62, 62, 0.3);
    border-top: none;
    border-left: none;
    }
    100% {
      transform: scaleX(0.5);
      transform-origin: right;
      border: 10px solid #B05846;
box-shadow: 10px 5px 5px rgba(63, 62, 62, 0.3);
    border-top: none;
    border-left: none;
    }
  }


  .lastLinkIntro{
margin-bottom: 36px;
  }

  .slotContent {
    /* background-color: rgba(255, 255, 255, 0.2); */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90vw;
    height: 100vh;
    text-align: left;
    position: relative;
    margin: 0 10vh;
  }

  .hero {
    /* background-color: rgba(158, 74, 74, 0.2); */
    width: 80vw;
    height: 60vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .intro {
    /* background-color: rgba(158, 74, 74, 0.2); */
    height: 60vh;
    max-height: 60vh;
    width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
  }

  .side {
    /* background-color: rgba(15, 124, 42, 0.2); */
    height: 60vh;
    width: 50vw;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
  

  .page-transition {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h1 {
    color: aliceblue;
    font-family: "Montserrat", sans-serif;
    font-size: 4vw;
    margin: 0 24px;
  }

  h2 {
    color: aliceblue;
    font-family: "Montserrat", sans-serif;
    font-size: 1.5vw;
    margin: 24px;
  }

  p {
    color: aliceblue;
    font-family: "Montserrat", sans-serif;
    font-size: 1vw;
    margin: 24px;
  }


  /* Adjust font size for smaller window width */
  @media screen and (max-width: 640px) {
    .hero {
      /* background-color: rgba(255, 255, 255, 0.2); */
      flex-direction: column;
      text-align: center;
    }
    .intro {
      /* background-color: rgba(158, 74, 74, 0.2); */
      flex: 1;
      height: 60vh;
      width: 80vw;
      max-height: 60vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      margin: 0;
    }

    .side {
      /* background-color: rgba(15, 124, 42, 0.2); */
      flex: 1;
      height: 60vh;
      width: 80vw;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      border-top: 2px solid #375066;
      border-left: 0px solid #375066;
    }

  

    .slotContent {
      /* background-color: rgba(255, 255, 255, 0.2); */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      text-align: center;
      margin: 0;
    }

    a {
      font-size: 1rem;
      margin-left: 36px;
    }

    h1 {
      font-size: 2rem;
      text-align: left;
      margin: 8px 24px;
    }

    h2 {
      font-size: 1rem;
      margin: 8px 24px;
      margin-bottom: 8px;
    }

    p {
      font-size: 0.8rem;
      text-align: center;
      align-items: center;
      margin: 24px;
    }
  }
</style>
