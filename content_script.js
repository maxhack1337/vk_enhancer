console.log('Content script is running!');

// Функция для добавления стиля
function addStyle() {
    const styleElement = document.createElement("style");
    styleElement.id = "oldAccent";
    styleElement.innerHTML = "body {  --vkui--color_background_accent:#447BBA!important;	            --vkui--color_background_accent--hover:#4177B5!important;                --vkui--color_background_accent--active:#3F72B0!important;	            --vkui--color_background_accent_themed--hover:#4177B5!important;	            --vkui--color_background_accent_themed--active:#3F72B0!important;	            --vkui--color_background_accent_tint:#5a9eff!important;	            --vkui--color_background_accent_tint--hover:#5698F7!important;	            --vkui--color_background_accent_tint--active:#5393EF!important;	            --vkui--color_background_accent_alternative:#447BBA!important;	            --vkui--color_background_accent_alternative--hover:#4177B5!important;	            --vkui--color_background_accent_alternative--active:#3F72B0!important;	            --vkui--color_text_accent--hover:#4177B5!important;	            --vkui--color_text_accent--active:#3F72B0!important;	            --vkui--color_text_accent_themed:#447BBA!important;	            --vkui--color_text_accent_themed--hover:#4177B5!important;	            --vkui--color_text_accent_themed--active:#3F72B0!important;	            --vkui--color_text_link--hover:#285582!important;	            --vkui--color_text_link--active:#27527F!important;	            --vkui--color_text_link_themed:#2A5885!important;	            --vkui--color_text_link_themed--hover:#285582!important;    	        --vkui--color_text_link_themed--active:#27527F!important;                --vkui--color_accent_blue:#5181b8!important;                --vk-sans-display:var(--palette-vk-font);                --vkui--color_text_accent:#2a5885!important;                --vkui--color_icon_accent:#5181b8!important;                --vkui--color_text_link:#2a5885!important;                --vkui--color_background_accent_themed:#5181b8!important;                --vkui--color_write_bar_icon: var(--steel_gray_400)!important;                --vkui--color_write_bar_icon--hover: var(--steel_gray_400)!important;                --vkui--color_write_bar_icon--active: var(--steel_gray_400)!important;                --vkui--color_stroke_accent:#6387ac!important;                --vkui--color_stroke_accent--hover:#6387ac!important;                --vkui--color_stroke_accent--active:#6387ac!important;                --vkui--color_stroke_accent_themed:#6387ac!important;                --vkui--color_stroke_accent_themed--hover:#6387ac!important;                --vkui--color_stroke_accent_themed--active:#6387ac!important;                --accent_alternate: #447bba!important;                --text_link:#2a5885!important;                --text_name:#2a5885!important;                --accent:#447bba!important;                --button_tertiary_foreground:#447BBA!important;                --button_primary_background:#447BBA!important;                --button_outline_foreground: #447BBA!important;                --button_outline_border: #447BBA!important;                --button_muted_foreground:#447BBA!important; }";
    document.head.appendChild(styleElement);
}

function removeStyle() {
    const customStyle = document.getElementById("oldAccent");
    if (customStyle) {
        customStyle.remove();
    }
}

// Функция для добавления стиля к сообщениям
function addStyle1() {
    const styleElement = document.createElement("style");
    styleElement.id = "msgReactions";
    styleElement.innerHTML = ".MessageReactionsPanel,.im-mess--reaction,.MessageReactions,MessageReactionsModalButton,.im-mess_reactions:hover .MessageReactionsModalButton,.im-mess .im-mess--reactions { display: none!important; }";
    document.head.appendChild(styleElement);
}

function removeStyle1() {
    const customStyle = document.getElementById("msgReactions");
    if (customStyle) {
        customStyle.remove();
    }
}

// Функция для добавления стилей
function applyStyles(isOldAccentChecked, isMsgReactionsChecked) {
  if (isOldAccentChecked) {
    addStyle();
  } else {
    removeStyle();
  }

  if (isMsgReactionsChecked) {
    addStyle1();
  } else {
    removeStyle1();
  }
}

// Функция для получения состояния чекбоксов из локального хранилища и применения стилей
function applySavedStyles() {
  chrome.storage.local.get(["checkboxState", "checkboxState1"], function (items) {
    const isOldAccentChecked = items.checkboxState;
    const isMsgReactionsChecked = items.checkboxState1;
    applyStyles(isOldAccentChecked, isMsgReactionsChecked);
  });
}

// При загрузке страницы применяем сохраненные стили
applySavedStyles();

// Обработчик сообщений от background.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "toggleOldAccent" || message.type === "toggleMsgReactions") {
    applySavedStyles();
  }
});
