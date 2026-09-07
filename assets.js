// Change image paths and crop rectangles here. Physics is independent of artwork.
window.BEAN_ASSETS = {
  atlas: 'assets/storybook.png',
  sprites: {
    player: { crop: [65, 5, 445, 530], width: 49, height: 58 },
    leaf: { crop: [545, 135, 705, 345] },
    giant: { crop: [10, 540, 805, 714] },
    vine: { crop: [850, 495, 390, 759] },
    background: { src: null }
  },
  // Set src instead of crop for individual transparent PNG / WebP / SVG files.
  // player: { src: 'assets/player.png', width: 64, height: 64 }
};
window.BEAN_CONFIG = { width: 480, height: 800, gravity: 1200, jumpSpeed: 600, moveSpeed: 210, maxWindSpeed: 85, playerHalfWidth: 12, playerHeight: 35, goalHeight: 6065, stepHeight: 95 };
