<script>
  // Initialize positions: current and target for smooth interpolation.
  let lastMouseX = window.innerWidth / 2;
  let lastMouseY = window.innerHeight / 2;
  let targetX = lastMouseX;
  let targetY = lastMouseY;
  let idleTimer = null;
  let idleAnimation = null;

  // Get the falcon container (custom cursor element)
  const falconContainer = document.querySelector('.hero-animation');

  // Smoothly update the falcon position using requestAnimationFrame.
  function updateFalconPosition() {
    // Optionally, you can add easing by interpolating the current position toward the target:
    // For example, use a simple lerp (linear interpolation):
    const currentX = parseFloat(falconContainer.style.left) || targetX;
    const currentY = parseFloat(falconContainer.style.top) || targetY;
    // Adjust the speed factor (between 0 and 1) for smoother or snappier motion:
    const speed = 0.15;
    const newX = currentX + (targetX - currentX) * speed;
    const newY = currentY + (targetY - currentY) * speed;
    falconContainer.style.left = (newX - falconContainer.offsetWidth / 2) + 'px';
    falconContainer.style.top = (newY - falconContainer.offsetHeight / 2) + 'px';
    requestAnimationFrame(updateFalconPosition);
  }
  // Start the animation loop.
  requestAnimationFrame(updateFalconPosition);

  // Function to start the idle orbit animation
  function startIdleAnimation() {
    let angle = 0;
    const radius = 50; // Orbit radius in pixels
    idleAnimation = setInterval(() => {
      angle += 0.05; // Adjust orbit speed here
      // Update target position based on circular orbit around the last mouse coordinates.
      targetX = lastMouseX + radius * Math.cos(angle);
      targetY = lastMouseY + radius * Math.sin(angle);
    }, 16); // Roughly 60 frames per second
  }

  // Function to stop idle orbit animation
  function stopIdleAnimation() {
    if (idleAnimation) {
      clearInterval(idleAnimation);
      idleAnimation = null;
    }
  }

  // Listen for mouse movements
  document.addEventListener('mousemove', function(e) {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    // When the mouse moves, immediately set the target to the current mouse position.
    targetX = e.clientX;
    targetY = e.clientY;
    // Stop any idle orbit animation if it's running.
    stopIdleAnimation();
    // Reset the idle timer; if no movement for 1.5 seconds, start orbiting.
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
    idleTimer = setTimeout(startIdleAnimation, 1500);
  });
</script>
