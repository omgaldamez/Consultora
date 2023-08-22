<script>
  import Landing from "../routes/landing/+page.svelte"
  import Servicios from "../routes/services/+page.svelte"
  import Portfolio from "../routes/portfolio/+page.svelte"
</script>


<Landing />
  
<!-- <Servicios/> -->
  
<Portfolio />

<div class="endOmia"></div>

<style>
.endOmia {
    position: relative;
    width: 100vw;
    margin: 0;
    background-image: url("./endOmia.png");
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center calc(50% - 24px); /* Translate background image 24px up */
}


  /* Responsive styles for mobile */
  @media (max-width: 640px) {
    .endOmia {
    position: relative;
    width: 100vw;
    margin: 0;
    background-image: url("./endOmia.png");
    height: 60vh;
    background-repeat: no-repeat;
    background-position: center calc(50% - 0px); /* Translate background image 24px up */
}
  }
</style>