
console.log("popup window started");
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function (element) {
  console.log("change color clicked");
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (!tabs.length) return;
    tabs.forEach((tab) => {
      chrome.scripting.executeScript(
        {
          files: ['popup/contentScript.js'],
          target: {
            tabId: tab.id,
            allFrames: true
          }
        }
      ).then(() => console.log("script injected"));;
      // error at v3
      // chrome.tabs.executeScript(
      //   tabs[0].id,
      //   { code: 'document.body.style.backgroundColor = "' + color + '";' });
    });
  })
};