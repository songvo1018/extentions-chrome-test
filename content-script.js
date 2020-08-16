function injectContent() {

  let devBlock = document.createElement("div")
  devBlock.setAttribute("class", "block")
  let btn = document.createElement('button')
  btn.textContent = 'dev';
  btn.setAttribute('id', 'devBtn')
  btn.addEventListener('click', () => {
    chrome.storage.local.set({
      opened: true,
      openCounter: 0
    })
    console.log('dev btn clicked');
  })
  devBlock.appendChild(btn);
  document.body.appendChild(devBlock);

  chrome.storage.local.get(['openCounter'], result => {
    if (result.openCounter < 3) {
      console.log('openCounter ', result.openCounter);
      chrome.storage.local.get(['opened'], result => {
        if (result.opened) {
          console.log('opened: ', result.opened);
          initialize()
        } else {
          console.log('message has closed user');
        }
      })
    }
  })

  const initialize = () => {


    let block = document.createElement("div");
    block.setAttribute("class", "block");

    let closeButton = document.createElement("div")
    closeButton.setAttribute("id", "closeButton")
    closeButton.textContent = "+"

    let message = document.createElement("span")
    
    chrome.storage.local.get(['message'], result => {
      message.textContent = `${result.message}`;
    })
    
    message.setAttribute("id", "message");

    block.appendChild(closeButton);
    block.appendChild(message);
    document.body.prepend(block);


    closeButton.addEventListener("click", () => {
      block.setAttribute("class", "hide");
      chrome.storage.local.set({
        opened: false
      });
    })
  }


  chrome.storage.local.get(['openCounter'], result => {
    if (result.openCounter < 4) {
      console.log('open counter:', result.openCounter);

      chrome.storage.local.set({
        openCounter: result.openCounter + 1
      });
    }
  });

}

chrome.storage.local.get(['veryfiedDomian'], result => {
  if (result.veryfiedDomian) {
    injectContent()
  }
})