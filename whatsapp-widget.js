/**
 * Tazkirah Online — Floating WhatsApp Button Widget
 * Injects a site-wide floating WhatsApp button.
 * Styles live in site-enhancements.css (#tz-wa-float)
 */
(function () {
  'use strict';

  var WA_NUMBER = '447828702523';
  var WA_MESSAGE = encodeURIComponent('Assalamu Alaikum! I\'d like to know more about your Quran & Arabic courses.');
  var WA_HREF = 'https://wa.me/' + WA_NUMBER + '?text=' + WA_MESSAGE;

  function injectButton() {
    if (document.getElementById('tz-wa-float')) return; // Already injected

    var btn = document.createElement('a');
    btn.id = 'tz-wa-float';
    btn.href = WA_HREF;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('aria-label', 'Chat with us on WhatsApp');
    btn.setAttribute('title', 'Chat on WhatsApp');

    btn.innerHTML = [
      '<span class="tz-wa-label">Chat with us!</span>',
      '<span class="tz-wa-bubble">',
        // Official WhatsApp SVG logo path
        '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">',
          '<path d="M16.002 3C9.373 3 4 8.373 4 15.002c0 2.122.557 4.112 1.527 5.838L4 29l8.368-1.504A11.94 11.94 0 0016.002 29C22.629 29 28 23.627 28 17.002 28 10.373 22.629 5 16.002 3zm0 21.77a9.728 9.728 0 01-5.022-1.393l-.36-.213-3.734.671.683-3.63-.235-.374a9.724 9.724 0 01-1.49-5.13c0-5.38 4.378-9.758 9.758-9.758 5.378 0 9.757 4.378 9.757 9.757-.001 5.38-4.378 9.07-9.757 9.07zm5.353-7.3c-.293-.147-1.734-.856-2.003-.953-.268-.098-.464-.147-.659.147-.196.293-.758.953-.929 1.149-.17.195-.341.22-.634.073-.293-.147-1.238-.456-2.358-1.455-.872-.778-1.46-1.739-1.63-2.032-.171-.293-.018-.451.128-.597.132-.131.293-.341.44-.512.147-.17.195-.293.293-.488.098-.196.049-.366-.025-.513-.073-.147-.659-1.588-.903-2.174-.238-.571-.48-.494-.659-.503l-.562-.01c-.195 0-.512.073-.781.366-.268.293-1.025 1.002-1.025 2.443 0 1.44 1.05 2.833 1.196 3.028.147.196 2.065 3.155 5.003 4.424.7.302 1.245.482 1.671.617.702.223 1.342.192 1.847.116.563-.084 1.734-.709 1.978-1.393.244-.685.244-1.272.17-1.393-.07-.12-.265-.195-.558-.342z"/>',
        '</svg>',
      '</span>',
      '<span class="tz-wa-dot" aria-hidden="true"></span>',
    ].join('');

    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }
})();
