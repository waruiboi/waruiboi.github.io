// Pan the fixed background image downward as the page scrolls.
// Same effect as the home page. Starts at 10% (matching the CSS) and
// pans to at most 90%, so the image never runs off and shows white.
window.addEventListener('scroll', () => {
  const percent = Math.min(10 + window.scrollY * 0.05, 90);
  document.body.style.backgroundPositionY = percent + '%';
});
