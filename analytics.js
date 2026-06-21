// ===== GoatCounter analytics =====
// Setup (do this once):
//   1. Sign up at https://www.goatcounter.com and choose a "code"
//      (it becomes your subdomain, e.g. beach-safety-china.goatcounter.com).
//   2. Replace MYCODE below with that code.
//   3. Publish the site. View your stats by logging in at
//      https://MYCODE.goatcounter.com
//
// Note: GoatCounter only counts visits on the live website, not when you
// open the files locally (file://...). So you won't see data until it's published.

window.goatcounter = {
  endpoint: 'https://waruiboi.goatcounter.com/count'
};

// Load GoatCounter's tiny counter script.
(function () {
  var s = document.createElement('script');
  s.async = true;
  s.src = '//gc.zgo.at/count.js';
  document.head.appendChild(s);
})();
