import { useEffect, useRef } from "react";

// Custom hook to handle auto-scrolling to the bottom of an element
function useScroll(dep: any) {
  const ref = useRef<HTMLElement>(); // Reference to the scrollable element

  useEffect(() => {
    // Scroll to the bottom of the element when the dependency changes
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight; // Set the scroll position to the bottom
      }
    }, 100); // Delay to ensure the DOM updates before scrolling
  }, [dep]); // Dependency array to trigger the effect when `dep` changes

  return ref; // Return the reference to be attached to the scrollable element
}

export default useScroll;
