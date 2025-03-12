document.addEventListener('DOMContentLoaded', () => {
  // Show the modal card on mobile when an image is clicked
  document.querySelectorAll('.pokemon-container img').forEach((img) => {
    img.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        document.getElementById('pokemonModal').style.display = 'flex';
      }
    });
  });

  // Hide the modal card if the user clicks on the overlay (the modal card background)
  document.getElementById('pokemonModal').addEventListener('click', (e) => {
    // Close only if the click is outside the modal card's content
    // (For simplicity, if the modal card itself is clicked, hide it)
    if (e.target.id === 'pokemonModal') {
      document.getElementById('pokemonModal').style.display = 'none';
    }
  });
});
 
