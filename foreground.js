if (document) {
  chrome.storage.local.get(['data'], result => {
    const domain = result.data

    for (let i = 0; i < domain.length; i++) {
      let domainName = domain[i].domain;
      let domainNameWithWWW = `www.${domain[i].domain}`;

      let domainMessage = domain[i].message;
      let hostname = document.location.hostname;

      if (hostname == domainName || hostname == domainNameWithWWW) {
        chrome.storage.local.set({
          veryfiedDomian: true,
          message: domainMessage
        })
        return
      }
    }
  })
}