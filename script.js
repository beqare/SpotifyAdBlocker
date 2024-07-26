// ==UserScript==
// @name         SPOTIFY ADBLOCKER
// @version      1.1
// @description  no spotify ads
// @author       snoopti
// @match        https://*.spotify.com/*
// @grant        none
// @run-at       document-start
// @icon         https://www.google.com/s2/favicons?sz=64&domain=spotify.com
// @downloadURL https://raw.githubusercontent.com/snoopti/SpotifyAdBlocker/main/script.js
// @updateURL https://raw.githubusercontent.com/snoopti/SpotifyAdBlocker/main/script.js
// ==/UserScript==

!(async function () {
  async function queryAsync(query) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const element = document.querySelector(query);
        if (element) {
          clearInterval(interval);
          return resolve(element);
        }
      }, 250);
    });
  }

  function inject({ ctx, fn, middleware, transform }) {
    const original = ctx[fn];
    ctx[fn] = function () {
      if (!middleware || middleware.call(this, ...arguments) !== false) {
        const result = original.call(this, ...arguments);
        return transform ? transform.call(this, result, ...arguments) : result;
      }
    };
  }

  const nowPlayingBar = await queryAsync(".now-playing-bar");
  const playButton = await queryAsync(
    "button[title=Play], button[title=Pause]"
  );

  let audio;

  inject({
    ctx: document,
    fn: "createElement",
    transform(result, type) {
      if (type === "audio") {
        audio = result;
      }

      return result;
    },
  });

  let playInterval;
  new MutationObserver(() => {
    const link = document.querySelector(".now-playing > a");

    if (link) {
      if (!audio) {
        return console.error("error");
      }

      if (!playButton) {
        return console.error("error");
      }

      audio.src = "";
      playButton.click();
      if (!playInterval) {
        playInterval = setInterval(() => {
          if (
            !document.querySelector(".now-playing > a") &&
            playButton.title === "Pause"
          ) {
            clearInterval(playInterval);
            playInterval = null;
          } else {
            playButton.click();
          }
        }, 500);
      }
    }
  }).observe(nowPlayingBar, {
    characterData: true,
    childList: true,
    attributes: true,
    subtree: true,
  });

  document.body.appendChild(style);
})();
