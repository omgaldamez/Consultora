
// Variables to implement touch-based drag and drop behavior for mobile
let touchStartX = 0;
let touchStartY = 0;
let isDragging = false;
let isClick = false; // Add this flag
let touchMoveTimer = null;
let inertiaFrames = 20;
let deltaXArray = [];

// Function to handle touch start event
export function handleTouchStart(event) {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    isDragging = true;
    isClick = true; // Initialize the isClick flag to true
    deltaXArray = [];
    // Clear the touchMoveTimer if it's set to stop scrolling after touch ends
    clearTimeout(touchMoveTimer);
}

// Function to handle touch move event
export function handleTouchMove(event) {
    event.preventDefault();
    if (!isDragging) return;

    const touch = event.touches[0];
    const touchMoveX = touch.clientX;
    const touchMoveY = touch.clientY;
    const deltaX = touchMoveX - touchStartX;
    const deltaY = touchMoveY - touchStartY;
    const scrollContainer = event.currentTarget;

    // Determine if the touch movement is more horizontal or vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        event.preventDefault();
        isClick = false; // If the touch movement is more horizontal, consider it a drag, not a click
    } else {
        scrollContainer.scrollLeft = scrollLeftOnTouchStart - deltaX; // Use scrollLeft here
    }

    // Store the delta X value for calculating the average velocity
    if (deltaXArray.length >= inertiaFrames) {
        deltaXArray.shift();
    }
    deltaXArray.push(deltaX);
}

// Function to handle touch end event
export function handleTouchEnd() {
    isDragging = false;
    // Calculate the average velocity of the swipe
    const avgDeltaX =
        deltaXArray.reduce((acc, curr) => acc + curr, 0) / deltaXArray.length;
    // Calculate the distance to scroll for the inertia effect
    const inertiaScrollDistance = avgDeltaX * 3;
    // Add a timer to apply the inertia effect for a few frames
    let frameCount = 0;

    if (isClick) {
        // If it's a click, reset the isClick flag to false and return early to avoid the inertia scroll animation
        isClick = false;
        return;
    }

    function inertiaScrollAnimation() {
        if (frameCount < inertiaFrames) {
            const cardsContainer = document.querySelector(".cards-wrapper");
            cardsContainer.scrollLeft -= inertiaScrollDistance / inertiaFrames;
            frameCount++;
            requestAnimationFrame(inertiaScrollAnimation);
        }
    }

    requestAnimationFrame(inertiaScrollAnimation);

    // Set a timer to stop scrolling after 1 second of touch end
    touchMoveTimer = setTimeout(() => {
        clearTimeout(touchMoveTimer);
        touchMoveTimer = null;
    }, 100);
}