const intervalHour = 60000 * 60
let domain = {}
let getDomainList = fetch('http://www.softomate.net/ext/employees/list.json ')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            domain = data
          })

setInterval(() => {
  getDomainList()
}, intervalHour);

chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    for (let i = 0; i < domain.length; i++) {
      let domainName = domain[i].name;
      let regex = new RegExp(`^https:\/\/www\.${domainName}`)
      if (regex.test(current_tab_info.url)) {
        chrome.tabs.executeScript(null, { file: './foreground.js' }, )
      }
      }
    }
  )
})
