console.log('BG script is running!');

function sendMessageToContentScript(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	
	
if (message.type === "nameAva" || message.type === "toggleOldAccent" || message.type === "toggleMsgReactions" || message.type === "toggleSecretFunctions" || message.type === "togglePostReactions" || message.type === "toggleHider" || message.type === "toggleEmojiStatus" || message.type === "toggleRecentGroups"  || message.type === "toggleAltSB") {
    // Отправка сообщения в активную вкладку (content_script.js)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const activeTabId = tabs[0].id;
        sendMessageToContentScript(activeTabId, message);
      }
    });
  }
  
 if(message.type === "addSticker")
 {
	 chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const activeTabId = tabs[0].id;
        sendMessageToContentScript(activeTabId, message);
      }
    });
 }
 
  if(message.type === "sliderValue")
 {
	 chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const activeTabId = tabs[0].id;
        sendMessageToContentScript(activeTabId, message);
      }
    });
 }
 
 if(message.type === "customAccent" || message.type === "colorPicker" || message.type === "colorPickerText")
 {
	 chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const activeTabId = tabs[0].id;
        sendMessageToContentScript(activeTabId, message);
      }
    });
 }
 
 if(message.type === "customLogo" || message.type === "customBg" || message.type === "customFont")
 {
	 chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const activeTabId = tabs[0].id;
        sendMessageToContentScript(activeTabId, message);
      }
    });
 }
});
