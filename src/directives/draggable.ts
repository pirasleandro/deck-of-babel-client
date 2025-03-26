import type { Directive } from 'vue';
import type { Offset, Position } from 'src/types/util';

export const vDraggable: Directive<HTMLElement, Position | undefined> = {
  mounted(el, binding) {
    const originalComputedStyle = window.getComputedStyle(el);
    const originalOffset: Offset = {
      left: parseInt(originalComputedStyle.left),
      top: parseInt(originalComputedStyle.top),
    };

    let isDragging = false;
    let startPos: Position = { x: 0, y: 0 };
    let initalOffset: Offset = { left: 0, top: 0 };

    function reset() {
      if (binding.value) {
        el.style.left = `${binding.value.x}px`;
        el.style.top = `${binding.value.y}px`;
      } else {
        el.style.left = `${originalOffset.left}px`;
        el.style.top = `${originalOffset.top}px`;
      }

      isDragging = false;
      startPos = { x: 0, y: 0 };
      initalOffset = { left: 0, top: 0 };
    }

    reset();

    // Create a flag to track dragging state

    // Handler for mouse down event
    const handleMouseDown = (event: MouseEvent) => {
      // Prevent text selection during drag
      event.preventDefault();
      event.stopPropagation();

      // Get the current computed style of the element
      const computedStyle = window.getComputedStyle(el);

      // Store initial mouse and element positions
      startPos = { x: event.clientX, y: event.clientY };

      // Get current left and top values, defaulting to 0 if not set
      initalOffset = {
        left: parseInt(computedStyle.left) ?? 0,
        top: parseInt(computedStyle.top) ?? 0,
      };

      isDragging = true;

      // Add move and up event listeners to document
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    // Handler for mouse move event
    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (!isDragging) return;

      // Calculate new position
      const delta: Position = {
        x: event.clientX - startPos.x,
        y: event.clientY - startPos.y,
      };

      // Update element position
      el.style.left = `${initalOffset.left + delta.x}px`;
      el.style.top = `${initalOffset.top + delta.y}px`;
    };

    // Handler for mouse up event
    const handleMouseUp = () => {
      isDragging = false;

      // Remove move and up event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // Add mouse down listener to the element
    el.onmousedown = handleMouseDown;

    // DEBUG: reset position on double click
    el.addEventListener('dblclick', (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      reset();
    });
  },

  // Cleanup directive when component is unmounted
  unmounted(el) {
    el.onmousedown = null;
  },
};
