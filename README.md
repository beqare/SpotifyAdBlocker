# Spotify Ad Blocker

Welcome to my script for Spotify that skips the annoying ads.

## How to Install

Follow these steps to install the Spotify Ad Blocker script:

### Step 1: Install Tampermonkey Addon

Install the [Tampermonkey Addon](https://www.tampermonkey.net/) for your browser.

### Step 2: Install

Download the latest version from [grasyfork](https://greasyfork.org/de/scripts/501822-spotify-adblocker)

---

## Support

If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/beqare/SpotifyAdBlocker/issues).

## Disclaimer

This script is for educational purposes only. Use it at your own risk.

---

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/beqare/SpotifyAdBlocker/blob/main/LICENSE) file for details.

---

## How it works (thanks to chatgpt for the explanation)

1. **Initialization and Querying Elements**:

   - The script begins with an asynchronous function.
   - It uses a helper function to repeatedly check for specific elements on the page, such as the now-playing bar and the play/pause button, until they are found.

2. **Extending `createElement` Function**:

   - Another helper function is used to modify the `document.createElement` method.
   - This modification checks if an audio element is being created and stores a reference to it.

3. **Observing `now-playing-bar` Element**:

   - A `MutationObserver` instance is created to watch for changes in the now-playing bar element.
   - This observation includes changes to character data, child elements, attributes, and subtrees of the now-playing bar.

4. **Skipping Ads**:
   - The `MutationObserver` continuously checks if a link appears within the now-playing container, indicating an ad is playing.
   - When an ad is detected, the script clears the audio source and repeatedly clicks the play/pause button.
   - This repeated clicking continues until the ad is skipped and regular music playback resumes.
