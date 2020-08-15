chrome.storage.local.get(['openCounter'], result => {
  if (result.openCounter < 4) {
    initialize()
  }
})

const initialize = () => {
  
  let block = document.createElement("div");
  block.setAttribute("class", "block");

  let closeButton = document.createElement("div")
  closeButton.setAttribute("id", "closeButton")
  closeButton.textContent = "+"

  let message = document.createElement("span")
  message.textContent = "Этот параграф был добавлен приложением.";
  message.setAttribute("id", "message");

  block.appendChild(closeButton);
  block.appendChild(message);
  document.body.appendChild(block);

  // chrome.storage.local.get(['openCounter'], result => {
  //   console.log(result.openCounter);
  //   if ( result.openCounter > 3) {
  //     block.setAttribute("class", "hide");
  //   }
  // })
  
  // Проверить скрываемость сообщения после назатия на крестик
  chrome.storage.local.get(['opened'], result => {
    if (!result.opened) {
      block.removeElement()
    }
  })

  closeButton.addEventListener("click", () => {
    
    block.setAttribute("class", "hide");

    chrome.storage.local.set(
      {
        opened: false
      }
    );
  })
}


chrome.storage.local.get(['openCounter'], result => {
  if (result.openCounter < 4) {
    console.log('open counter:', result.openCounter );

    chrome.storage.local.set(
      {
        openCounter: result.openCounter+1
        // openCounter: 0,
        // opened: true
      }
    );
  }  
});


