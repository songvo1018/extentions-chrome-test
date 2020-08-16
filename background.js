const intervalHour = 60000 * 60

let url = 'https://www.softomate.net/ext/employees/list.json';
let getDomainList = fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    chrome.storage.local.set({data})
  })

// setInterval(() => {
//   getDomainList()
// }, intervalHour);


chrome.tabs.onActivated.addListener(tab => {
  // chrome.storage.local.set({
  //   message: 'what'
  // })
      chrome.tabs.executeScript(null, { file: './foreground.js' }, result => {
          const lastErr = chrome.runtime.lastError;
          if (lastErr) console.log(' lastError: ' + JSON.stringify(lastErr));
      });

    // // chrome.tabs.executeScript(null, {file: './foreground.js'})
    // chrome.tabs.get(tab.tabId, current_tab_info => {    
      
    // })
  })
  


// chrome.storage.local.set({
//   data: response
// })