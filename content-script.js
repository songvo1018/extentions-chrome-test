const MAX_MESSAGE_REPEAT_COUNT = 3;

function matchCurrentUrlWithDomains() {
  if (document) {
    chrome.storage.local.get(['data'], result => {
      const domains = result.data

      for (let i = 0; i < domains.length; i++) {
        let domainName = domains[i].domain;
        let domainNameWithWWW = `www.${domains[i].domain}`;

        let domainMessage = domains[i].message;
        let hostname = document.location.hostname;

        if (hostname == domainName || hostname == domainNameWithWWW) {
          console.log('match');
          chrome.storage.local.set({
            veryfiedDomian: true,
            message: domainMessage
          })
          return
        }
      }
    })
  }
}

const initializeContent = () => {
  let block = document.createElement("div");
  block.classList.add("block");

  let closeButton = document.createElement("a")
  closeButton.classList.add("close")

  closeButton.addEventListener("click", () => {
    block.classList.add("hide");
    chrome.storage.local.set({
      opened: false
    });
  })

  let message = document.createElement("span")

  chrome.storage.local.get(['message'], result => {
    message.textContent = `${result.message}`;
  })

  message.classList.add("message");

  block.appendChild(closeButton);
  block.appendChild(message);
  document.body.prepend(block);



}

let incrementOpenCounter = () => {
  chrome.storage.local.get(['openCounter'], result => {
    if (result.openCounter <= MAX_MESSAGE_REPEAT_COUNT) {
      console.log('open counter:', result.openCounter);

      chrome.storage.local.set({
        openCounter: result.openCounter + 1
      });
    }
  });
}

let veryfiedUrl = () => {
  chrome.storage.local.get(['veryfiedDomian'], result => {
    if (result.veryfiedDomian) {
      injectContent()
    }
  })

}


let injectContent = () => {
  chrome.storage.local.get(['openCounter'], result => {
    if (result.openCounter < MAX_MESSAGE_REPEAT_COUNT) {
      console.log('openCounter ', result.openCounter);
      chrome.storage.local.get(['opened'], result => {
        if (result.opened) {
          initializeContent()
        } else {
          console.log('message has closed user');
        }
      })
    }
  })

  incrementOpenCounter()
}

veryfiedUrl()
matchCurrentUrlWithDomains()