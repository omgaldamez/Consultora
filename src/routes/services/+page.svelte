<script>
    import { onMount } from "svelte";
    import "../../styles/circleLayout.css";
    // Data
    const cardsData = [
      { "title": "ANÁLISIS DE DATOS", "content": "Lorem ipsum dolor sit amet consectetur adipiscing elite fringilla sodales dolor de arcu sagittis ultrices felis.","color":"rgba(130, 128, 128, 0.1)" },
      { "title": "VISUALIZACIÓN DE DATOS", "content": "Lorem ipsum dolor sit amet consectetur adipiscing elite fringilla sodales dolor de arcu sagittis ultrices felis.","color":"rgba(0, 0, 0, 0.2)" },
      
      { "title": "DESARROLLO WEB", "content": "Lorem ipsum dolor sit amet consectetur adipiscing elite fringilla sodales dolor de arcu sagittis ultrices felis.","color":"rgba(0, 0, 0, 0.2)" },
      { "title": "BUSINESS INTELLIGENCE", "content": "Lorem ipsum dolor sit amet consectetur adipiscing elite fringilla sodales dolor de arcu sagittis ultrices felis.","color":"rgba(0, 0, 0, 0.2)" },
      { "title": "DATA STORYTELLING", "content": "Lorem ipsum dolor sit amet consectetur adipiscing elite fringilla sodales dolor de arcu sagittis ultrices felis.","color":"rgba(0, 0, 0, 0.2)" },
      { "title": "DATA MINING", "content": "Lorem ipsum dolor sit amet consectetur adipiscing elite fringilla sodales dolor de arcu sagittis ultrices felis.","color":"rgba(0, 0, 0, 0.2)" }
    ];

  </script>


<!-- <iframe src='https://flo.uri.sh/visualisation/14515079/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='no' style='width:100vw;height:100vh;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/14515079/?utm_source=embed&utm_campaign=visualisation/14515079' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>

<iframe src='https://flo.uri.sh/visualisation/14515056/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='no' style='width:100vw;height:100vh;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/14515056/?utm_source=embed&utm_campaign=visualisation/14515056' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>
 -->

<div id="Pag3" class="servBkg">
    
<header>
    <h1>Servicios</h1>
    </header>
  <div class="cards-container">
    {#each cardsData as card, index}
    <div
    class="card"
    role="button"
    tabindex="0"
    on:mouseenter={() => card.hover = true}
    on:mouseleave={() => card.hover = false}
    style="background-color: {card.hover ? card.color : 'transparent'};"
  >
        <div class="content-container">
          <svg width="100" height="100">
            <rect width="100" height="100" fill="blue" />
          </svg>
          <h2>{card.title}</h2>
          <h3>{card.content}</h3>
        </div>
      </div>
    {/each}
  </div>
  </div>
  
  <style>

header{
  height: 10vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 80vw;
}

    .cards-container {
      width: 80vw;
      height: 90vh;
      display: flex;
      flex-wrap: wrap; /* Allows cards to wrap into new rows */
      border: 1px solid #ccc;
      align-items: stretch; /* Stretch items to occupy full height */
      justify-content: space-evenly; /* Distribute items evenly */
      flex: 1;
      padding: 10px;
      box-sizing: border-box;
    }

    .cards-container .card {
    /* ... Your existing styles ... */
    background: linear-gradient(to top right, transparent 50%, rgba(255, 255, 255, 0.2));
    background-size: 200% 200%;
    transition: background-position 0.5s ease-in;
  }

  .cards-container .card:hover {
    background-position: -100% -100%;
  }
    .card {
      width: 30%; /* Set the card width */
      min-width: 200px; /* Set the minimum card width */
      height: 45%; /* Set the card height */
      min-height: 200px; /* Set the minimum card height */
      margin: 10px; /* Adding margin to each card */
      display: flex;
      flex-direction: column;
      border: 1px solid #ed0909;
      flex-grow: 1; /* Allow cards to grow and shrink within the container */
      flex-shrink: 1;
    }
  
    .card * {
      border: 1px solid #ccc; /* Adding border to all elements inside each card */
      padding: 5px; /* Optional padding to separate the border from the content */
      margin: 0;
    }
  
    .card:hover {
    cursor: pointer;
    /* You can add additional styles when the card is hovered here if needed */
  }

    .content-container {
      flex-grow: 1; /* Allow content to expand within the container */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; /* Space between elements in the container */
      padding: 10px;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
  
    .content-container h2 {
        height: 10%;
        width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1rem; /* Use proportional font size */
      text-align: left;
    }

    .content-container h3 {
        height: 40%;
        width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1rem; /* Use proportional font size */
      text-align: left;
    }
  
    .content-container svg {
        height: 50%;
      overflow: hidden;
    }
  
    h3 {
      color: #787C80;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      font-weight: normal;
      font-size: 1rem; /* Use proportional font size */
    }
  
    h2 {
      color: #3C3E40;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      font-weight: normal;
      font-size: 1.2rem; /* Use proportional font size */
    }

    h1{
      color: #3C3E40;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      font-weight: normal;
      font-size: 2rem; /* Use proportional font size */
    }
  </style>
  