console.log('It works!');

var accentC = document.getElementById('oldaccent');
var msgreact = document.getElementById('messagereactions');

accentC.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({ checkboxState: checked });

    // Отправка сообщения в content_script.js
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "toggleOldAccent", isChecked: checked });
    });
});

msgreact.addEventListener('change', (event) => {
    const checked1 = event.target.checked;
    chrome.storage.local.set({ checkboxState1: checked1 });

    // Отправка сообщения в content_script.js
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId1 = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId1, { type: "toggleMsgReactions", isChecked: checked1 });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Получение состояния чекбоксов из Local Storage
    chrome.storage.local.get(["checkboxState", "checkboxState1"], function(items) {
        accentC.checked = items.checkboxState;
        msgreact.checked = items.checkboxState1;

        // Отправка сообщения в content_script.js
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTabId = tabs[0].id;
            chrome.tabs.sendMessage(activeTabId, { type: "toggleOldAccent", isChecked: items.checkboxState });
            chrome.tabs.sendMessage(activeTabId, { type: "toggleMsgReactions", isChecked: items.checkboxState1 });
        });
    });
});
