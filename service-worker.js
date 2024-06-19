console.log('BG script is running!');

chrome.commands.onCommand.addListener((shortcut) => {
  console.log(shortcut);
  if (shortcut.includes("+M")) {
    chrome.runtime.reload();
  }
});

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'install') {
        chrome.tabs.create({ url: 'install.html' });
    } else if (details.reason === 'update') {
        chrome.tabs.create({ url: 'update.html' });
    }
});

function sendMessageToContentScript(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

  if(message.type === "vken_access_token") {
	 chrome.storage.local.set({
		vkenAccessToken: message.value
	  });
  }
  if(message.type === "vken_access_token_remove") {
	 chrome.storage.local.set({
		vkenAccessToken: ''
	  });
  }
  if (message.type === "nameAva" || message.type === "toggleOldAccent" || message.type === "toggleMsgReactions" || message.type === "toggleSecretFunctions" || message.type === "togglePostReactions" || message.type === "toggleHider" || message.type === "toggleEmojiStatus" || message.type === "toggleRecentGroups" || message.type === "toggleAltSB" || message.type === "toggleMuteStatus" || message.type === "toggleCameraPhoto" || message.type === "toggleHideButton" || message.type === "toggleNewDesign" || message.type === "toggleIntegrationMedia" || message.type === "toggleNechitalka" || message.type === "toggleNepisalka" || message.type === "togglePollResults" || message.type === "toggleRemoveAway" || message.type === "toggleNewProfiles" || message.type === "toggleMiddleName" || message.type === "toggleOldHover" || message.type === "toggleTabletMenu" || message.type === "toggleDefaultTheme" || message.type === "toggleOldBadge" || message.type === "toggleFixMenu") {
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
