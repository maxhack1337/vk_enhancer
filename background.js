// Функция для отправки сообщения в content_script.js
function sendMessageToContentScript(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "toggleOldAccent" || message.type === "toggleMsgReactions") {
    // Отправка сообщения в активную вкладку (content_script.js)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const activeTabId = tabs[0].id;
        sendMessageToContentScript(activeTabId, message);
      }
    });
  }
});
