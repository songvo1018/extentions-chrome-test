chrome.storage.local.get(['data'], result => {
  let domainArray = result.data;
  let domainList = [];

  for (let i = 0; i < domainArray.length; i++) {
    const domainName = domainArray[i].domain;
    domainList.push(domainName)
  }
  chrome.storage.local.set({
    domainList: domainList
  })
})

const list = document.querySelector('#domainList')
chrome.storage.local.get(['domainList'], result => {

  for (let i = 0; i < result.domainList.length; i++) {
    const element = result.domainList[i];

    let li = document.createElement('li');
    let link = `https://www.${element}/`
    let anchor = document.createElement('a');
    anchor.textContent = element;

    anchor.addEventListener('click', () => {
      chrome.tabs.create({
        url: link
      })
    })

    li.appendChild(anchor);
    
    list.appendChild(li)
  }
})