
let main = () => {
  const intervalHour = 60000 * 60

  let getOneTimesOnHour= () => {
    console.log('interval has work');
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

  chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.executeScript(null, {
      file: './foreground.js'
    }, result => {
      const lastErr = chrome.runtime.lastError;
      if (lastErr) console.log(' lastError: ' + JSON.stringify(lastErr));
    });
  })

}

let  destructor= () => {
  document.removeEventListener(destructionEvent, destructor);
}

var destructionEvent = 'destructmyextension_' + chrome.runtime.id;

document.dispatchEvent(new CustomEvent(destructionEvent));
document.addEventListener(destructionEvent, destructor);
main();