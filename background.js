// Content script
function main() {
  const intervalHour = 60000 * 60

  function getOneTimesOnHour() {
    let url = 'https://www.softomate.net/ext/employees/list.json';
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        chrome.storage.local.set({
          data
        })
      })
  }
  getOneTimesOnHour()

  setInterval(() => {
    getOneTimesOnHour()
  }, intervalHour);

  // Set up content script
  chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.executeScript(null, {
      file: './foreground.js'
    }, result => {
      const lastErr = chrome.runtime.lastError;
      if (lastErr) console.log(' lastError: ' + JSON.stringify(lastErr));
    });
  })

}

function destructor() {
  // Destruction is needed only once
  document.removeEventListener(destructionEvent, destructor);
  // Tear down content script: Unbind events, clear timers, restore DOM, etc.
}

var destructionEvent = 'destructmyextension_' + chrome.runtime.id;
// Unload previous content script if needed
document.dispatchEvent(new CustomEvent(destructionEvent));
document.addEventListener(destructionEvent, destructor);
main();