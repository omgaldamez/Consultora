  // Initialize variables to store the window width and height
  let windowWidth = 0;
  let windowHeight = 0;

  // Define your media breakpoints and corresponding card sizes
  export const desktopBreakpoint = 768;
  export let cardSizeBase = "width: 20vw; height: 60vh; opacity: 0.95";
  export let cardSizeHover = "width: 30vw; height: 70vh; opacity: 1";
  export let cardSizeClicked = "width: 60vw; height: 70vh; opacity: 1";

  export let contentBackgBase =
    "background-color: rgba(0, 0, 0, 0.4)"
    export let contentBackgHover =
    "background-color: rgba(0, 0, 0, 0.3)";
    export let contentBackgClicked =
    "background-color: rgba(0, 0, 0, 0.5)";

  // Function to update the window size when the resize event is triggered
  export const updateWindowSize = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    console.log("WINDOW WIDTH: ", windowWidth);
    if (windowWidth <= desktopBreakpoint) {
      console.log("ES MENOR");
      cardSizeBase = "width: 30vw; height: 20vh; opacity: 0.95";
      cardSizeClicked = "width: 80vw; height: 60vh; opacity: 1";
    }
    if (windowWidth > desktopBreakpoint) {
      console.log("ES MAYOR");
      cardSizeBase = "width: 20vw; height: 60vh; opacity: 0.95";
  cardSizeHover = "width: 30vw; height: 70vh; opacity: 1";
  cardSizeClicked = "width: 60vw; height: 70vh; opacity: 1";
    }
  };