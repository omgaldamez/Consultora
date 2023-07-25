<script>
  import { onMount } from 'svelte';

  let transitionEnded = false;
  let isMenuOpen = false;

  onMount(() => {
    setTimeout(() => {
      transitionEnded = true;
    }, 300);
    window.addEventListener('load', () => {
      transitionEnded = true;
    });
  });

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  let icon1, icon2, icon3;

  function handleIconClick() {
    if (icon1 && icon3) {
      if (!isMenuOpen) {
        icon1.style.setProperty('--icon-bg-color', 'burlywood');
        icon1.style.transform = 'translateY(-8px) rotate(0)';
        icon2.style.setProperty('opacity', '1');
        icon3.style.setProperty('--icon-bg-color', 'burlywood');
        icon3.style.transform = 'translateY(8px) rotate(0)';
      } else {
        icon1.style.setProperty('--icon-bg-color', 'cornsilk');
        icon1.style.transform = 'translateY(0) rotate(45deg)';
        icon2.style.setProperty('opacity', '0');
        icon3.style.setProperty('--icon-bg-color', 'cornsilk');
        icon3.style.transform = 'translateY(0) rotate(-45deg)';
      }
    }
  }

  

</script>

<button
  class="hamburger-icon"
  on:click={() => {
    toggleMenu();
    handleIconClick();
  }}
>
  <div class="icon-1" id="a"></div>
  <div class="icon-2" id="b"></div>
  <div class="icon-3" id="c"></div>
  <div class="clear"></div>
</button>

<nav class="links" class:open={isMenuOpen}>
  <p></p>
  <p></p>
  <p></p>
  <a href="/" target="_top"><li>Home</li></a>
  <a href="/cards" target="_top"><li>Cards</li></a>
  <a href="/rect" target="_top"><li>Bar Graph</li></a>
  <a href="/circle" target="_top"><li>Circle</li></a>
  <a href="https://crearcirc.z19.web.core.windows.net/" target="_blank"><li>Circle D3</li></a>
  <a href="/circleA" target="_top"><li>Circle A</li></a>
  <a href="/circleB" target="_top"><li>Circle B</li></a>
  <a href="/circleC" target="_top"><li>Circle C</li></a>
  <a href="https://dvizhealtheconomics.z19.web.core.windows.net/" target="_blank"><li>Health Economics</li></a>
  <a href="/guides" target="_top"><li>Guides</li></a>
</nav>

<style>

  .hamburger-icon {
    position: fixed;
    left: 10px;
    top: 10px;
    z-index: 1000;
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    background: rgba(255, 255, 255, 0.2);
  }

  .hamburger-icon:hover {
    transform: scale(1.2);
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 1);
  }

  .icon-1,
  .icon-2,
  .icon-3 {
    position: absolute;
    left: 25%;
    top: 50%;
    width: 32px;
    height: 3px;
    background-color: var(--icon-bg-color, burlywood);
    transition: all 400ms cubic-bezier(0.84, 0.06, 0.52, 1.8);
    opacity: 1;
  }

  .icon-1 {
    transform: translateY(-8px);
    animation-delay: 100ms;
  }  
  
  .icon-3 {
    transform: translateY(8px);
    animation-delay: 250ms;
  }

  .clear {
    clear: both;
  }

li{
  
  list-style: none;
  font-size: 24px;
  line-height: 2.2;
  text-transform: uppercase;
  letter-spacing: 1.7px;
    width: 25vw;    
    color: burlywood;
    text-decoration: none;
    transition: opacity 0.3s;
    margin: 0;
}

li:hover{
    background-color: rgba(0, 0, 0, 0.5);  
    color: aliceblue;

}


  /* CSS styles for the links in the header */
  .links {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 25vw;
    height: 100vh;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex:1;
    transform: translateX(-100%);
  transition: all 600ms cubic-bezier(0.62, 0.04, 0.3, 1.56);
  transition-delay: 100ms;
    z-index: 999; /* Added z-index to bring the menu to the front */
    overflow: scroll;
  }

  .links.open {
    transform: translateX(0);
  }
  
nav:hover{
    background-color: rgba(255, 255, 255, 0.1);
}

  a {
    margin-bottom: 1rem;
    color: burlywood;
    text-decoration: none;
    transition: opacity 0.3s;
    padding-right: 50px;
    flex:1;
  }

  a:hover {
    opacity: 0.8;
  }

  @media (max-width: 640px) {
    /* Mobile styles */
    .links {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    transform: translateX(-100%);
  transition: all 600ms cubic-bezier(0.62, 0.04, 0.3, 1.56);
  transition-delay: 100ms;
    z-index: 999; /* Added z-index to bring the menu to the front */
  }

  .links.open {
    transform: translateX(0);
  }
  
  .hamburger-icon {
    position: fixed;
    left: 8px;
    top: 12px;
    z-index: 1000;
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    background: rgba(255, 255, 255, 0.2);
  }

  .hamburger-icon:hover {
    transform: scale(1.2);
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 1);
  }
  .icon-1,
  .icon-2,
  .icon-3 {
    position: absolute;
    left: 25%;
    top: 50%;
    width: 15px;
    height: 2px;
    background-color: burlywood;
    transition: all 400ms cubic-bezier(0.84, 0.06, 0.52, 1.8);
  }
  .icon-1 {
    transform: translateY(-4px);
    animation-delay: 100ms;
  }  
  
  .icon-3 {
    transform: translateY(4px);
    animation-delay: 250ms;
  }

  nav:hover{
    background-color: rgba(0, 0, 0, 0.8);
}

  a {
    margin-bottom: 1rem;
    color: burlywood;
    text-decoration: none;
    transition: opacity 0.3s;
    padding-right: 50px;
  }

  a:hover {
    opacity: 0.8;
  }
  li{
  
  list-style: none;
  font-size: 24px;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 1.7px;
    width: 100vw;    
    color: burlywood;
    text-decoration: none;
    transition: opacity 0.3s;
    margin: 0;
    text-align: center;
}
    }
</style>

