const intervalHour = 60000 * 60
let domain = {}
const getDomainList = fetch('http://www.softomate.net/ext/employees/list.json ')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            domain = data
          })

setTimeout(() => {
  console.log(domain);
}, 1000);

setInterval(() => {
  getDomainList()
}, intervalHour);

chrome.tabs.onActivated.addListener(tab => {
  let activeTab = '';
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
