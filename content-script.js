chrome.storage.local.get(['openCounter'], result => {
  console.log(result.openCounter);
  if ( result.openCounter > 3) {
    block.setAttribute("class", "hide");
  }
})

chrome.storage.local.get(['opened'], result => {
  if (!result.opened) {
    block.removeElement()
  }
})

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

closeButton.addEventListener("click", () => {
  
  block.setAttribute("class", "hide");

  chrome.storage.local.set(
    {
      opened: false
    }
  );
})

chrome.storage.local.get(['openCounter'], result => {

  console.log('open counter:', result.openCounter );

  chrome.storage.local.set(
    {
      openCounter: result.openCounter+1,
      opened: true
    }
  );
});


