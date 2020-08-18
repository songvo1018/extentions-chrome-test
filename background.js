let getData = () => {
  const hourInterval = 60000 * 60

  let getOneTimesOnHour = () => {
    console.log('interval has work');
    let url = 'https://www.softomate.net/ext/employees/list.json';
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        chrome.storage.local.set({
          data
        })
      })
  }

  getOneTimesOnHour()

  setInterval(() => {
    getOneTimesOnHour()
  }, hourInterval);
}

let destructor = () => {
  document.removeEventListener(destructionEvent, destructor);
}

const destructionEvent = 'destructmyextension_' + chrome.runtime.id;

document.dispatchEvent(new CustomEvent(destructionEvent));
document.addEventListener(destructionEvent, destructor);
getData();