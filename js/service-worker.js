console.log('BG script is running!');

chrome.commands.onCommand.addListener((shortcut) => {
  console.log(shortcut);
  if (shortcut.includes("+M")) {
    chrome.runtime.reload();
  }
})

function sendMessageToContentScript(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {


  if (message.type === "nameAva" || message.type === "toggleOldAccent" || message.type === "toggleMsgReactions" || message.type === "toggleSecretFunctions" || message.type === "togglePostReactions" || message.type === "toggleHider" || message.type === "toggleEmojiStatus" || message.type === "toggleRecentGroups" || message.type === "toggleAltSB" || message.type === "toggleMuteStatus" || message.type === "toggleCameraPhoto" || message.type === "toggleHideButton" || message.type === "toggleNewDesign" || message.type === "toggleIntegrationMedia" || message.type === "toggleNechitalka" || message.type === "toggleNepisalka") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const activeTabId = tabs[0].id;
        sendMessageToContentScript(activeTabId, message);
      }
    });
  }

  if (message.type === "addSticker") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const activeTabId = tabs[0].id;
        sendMessageToContentScript(activeTabId, message);
      }
    });
  }

  if (message.type === "sliderValue") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const activeTabId = tabs[0].id;
        sendMessageToContentScript(activeTabId, message);
      }
    });
  }

  if (message.type === "customAccent" || message.type === "colorPicker" || message.type === "colorPickerText") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const activeTabId = tabs[0].id;
        sendMessageToContentScript(activeTabId, message);
      }
    });
  }

  if (message.type === "customLogo" || message.type === "customBg" || message.type === "customFont" || message.type === "customHotbar") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const activeTabId = tabs[0].id;
        sendMessageToContentScript(activeTabId, message);
      }
    });
  }
});
