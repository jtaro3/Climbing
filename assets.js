// Replace each PNG independently. Physics is independent of artwork.
window.BEAN_ASSETS = {
  sprites: {
    player: { src: 'assets/player.png', width: 49, height: 58 },
    leaf: { src: 'assets/leaf.png' },
    giant: { src: 'assets/giant.png' },
    vine: { src: 'assets/vine.png' },
    background: { src: null }
  },
};
window.BEAN_CONFIG = { width: 480, height: 800, gravity: 1200, jumpSpeed: 600, moveSpeed: 210, maxWindSpeed: 85, playerHalfWidth: 12, playerHeight: 35, goalHeight: 6065, stepHeight: 95 };
