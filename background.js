chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("set color is green.");
    });

    //
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'github.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});
  
// 注册回调，当收到请求的时候触发
chrome.extension.onRequest.addListener(({ tabId, args }) => {
    console.log("Register chrome.extension.onRequest");
    // 在给定tabId的tab页中执行脚本
    chrome.tabs.executeScript(tabId, {
        code: `console.log(...${JSON.stringify(args)});`,
    });
});