console.log('from foreground');
chrome.storage.local.get(['data'], result => {
  const domain = result.data
  console.log('work', domain);
  for (let i = 0; i < domain.length; i++) {
    let domainName = domain[i].domain;
    let domainNameWithWWW = `www.${domain[i].domain}`;

    let domainMessage = domain[i].message;
    console.log(domainName);
    let hostname = document.location.hostname
    console.log(domainName, hostname, domainMessage);

    if (hostname == domainName || hostname == domainNameWithWWW) {
      console.log('matched', domainName);
      chrome.storage.local.set({
          veryfiedDomian: true,
          message: domainMessage
      })
      return
    }
    chrome.storage.local.get([''], result => {
      console.log(result);
    })

    
    
    // chrome.storage.local.get(['domainName'], result => {
    //   console.log(result.domainName);
    // })
}
})