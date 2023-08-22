  // Initialize variables to store the window width and height
  let windowWidth = 0;

  // Define your media breakpoints and corresponding card sizes
  export const desktopBreakpoint = 768;
  export let cardSizeBase
  export let cardSizeHover
  export let cardSizeClicked

  export let contentBackgBase =
    "background-color: rgba(0, 0, 0, 0.4)"
    export let contentBackgHover =
    "background-color: rgba(0, 0, 0, 0.3)";
    export let contentBackgClicked =
    "background-color: rgba(0, 0, 0, 0.5)";

  // Function to update the window size when the resize event is triggered
  export const updateWindowSize = () => {
    windowWidth = window.innerWidth;
    // console.log("WINDOW WIDTH: ", windowWidth);
    if (windowWidth <= desktopBreakpoint) {
      // console.log("ES MENOR");
      cardSizeBase = "width: 60vw; height: 40vh; opacity: 0.95";
      cardSizeClicked = "width: 80vw; height: 50vh; opacity: 1";
    }
    if (windowWidth > desktopBreakpoint) {
      // console.log("ES MAYOR");
      cardSizeBase = "width: 30vw; height: 60vh; opacity: 0.9";
  cardSizeHover = "width: 40vw; height: 70vh; opacity: 0.95";
  cardSizeClicked = "width: 60vw; height: 70vh; opacity: 1";
    }
  };