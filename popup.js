console.log('It works!');

var accentC = document.getElementById('oldaccent');
var msgreact = document.getElementById('messagereactions');
var secretFuncC = document.getElementById('secretfunctions');
var postReactionsC = document.getElementById('postreactions');
var hiderC = document.getElementById('hider');
var addSticker = document.getElementById('addsticker');
var parseId = document.getElementById('parseid');
var copyLink = document.getElementById('copylink');
var customAccent = document.getElementById('color-picker-accent');
var colorPicker = document.getElementById('color-picker-selection');
var colorPickerText = document.getElementById('color-picker-selection-text');
var resetCaccent = document.getElementById('resetaccent');
var resetCsel = document.getElementById('resetsel');
var resetCtext = document.getElementById('resetseltext');
var customLogo = document.getElementById('customlogo');
var customBg = document.getElementById('custombg');
var customFont = document.getElementById('customfont');
var customLogoText = document.getElementById('customlogotb');
var customBgText = document.getElementById('custombgtb');
var customFontText = document.getElementById('customfonttb');
var resetLogo = document.getElementById('resetlogo');
var resetBg = document.getElementById('resetbg');
var resetFont = document.getElementById('resetfont');
var checkId = document.getElementById('checkid');
var nameAva = document.getElementById('nameava');
var themeChange = document.getElementById('themechange');
var isThemeChanged;
var changerButton = document.getElementById('changerb');
var ID;

const url1 = 'https://maxhack1337.github.io/checker/';
fetch(url1)
    .then(response => response.text())
    .then(html => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const versionElement = tempElement.querySelector('.version');
    const serverMessageElement = tempElement.querySelector('.server_message');
    const version = versionElement.textContent;
    const serverMessage = serverMessageElement.textContent;
	console.log(version + " " + serverMessage);
	var ver1 = document.getElementById('version');
	const styleElement = document.createElement("style");
	styleElement.id = "version";
	styleElement.innerHTML = "#version::after{content:'Версия "+version+" Release'}";
	document.head.appendChild(styleElement);
	
		if (version != "1.8.1.1")
		{
			var dialog = document.getElementById('updateAvailable');
			dialog.style.display = 'block';
			const styleElement = document.createElement("style");
			styleElement.id = "dialogOpen";
			styleElement.innerHTML = ".vkebhancerHome .vkebhancerInternalPanel_in{    pointer-events:none; filter: blur(10px) !important;}";
			document.head.appendChild(styleElement);
		}
		else
		{
			console.log("Вы используете последнюю версию расширения");
		}
		
		if (serverMessage != "null")
		{
		    var notcount = document.getElementById('top_notify_count');
			notcount.style.display = 'block';
			const styleElement1 = document.createElement("style");
			styleElement1.id = "serverMessage";
			styleElement1.innerHTML = "#noMessagesFromServer{display:none;}#serverMessageGet{display:block;} #serverMessageTextLow::after{content:"+"'"+serverMessage+"'"+"}";
			document.head.appendChild(styleElement1);
			
		}
		else
		{
			console.log("Вы используете последнюю версию расширения");
		}
		

      })
      .catch(error => {
        console.error('Ошибка url1:', error);
      });
	  
	 
	 document.getElementById("clearCacheUpdate").addEventListener('click', function() {
	
	chrome.browsingData.remove({
      "since": 0
    }, {
      "cache": true,
      "appcache": true
    }, function() {
      chrome.tabs.query({ url: "https://vk.com/*" }, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.reload(tab.id, { bypassCache: true });
        });
      });
    });
  });
	 
var servermessagesButton = document.getElementById("servermessages");
  var serverSidebar = document.getElementById("serverSidebar");
	servermessagesButton.addEventListener("click", function () {
    serverSidebar.classList.toggle("serverHidden");
	console.log("123");
  });

  document.getElementById('closeServerMessage').addEventListener('click', function() {
	  const customStyle = document.getElementById("serverMessage");
    if (customStyle) {
        customStyle.remove();
    }
    document.getElementById('serverMessage').style.display = 'none';
  });

document.querySelector('#updatenow').addEventListener('click', function() {
  chrome.tabs.create({ url: 'https://github.com/maxhack1337/vk_enhancer' });
});

document.addEventListener('DOMContentLoaded', function() {
	var dialog = document.getElementById('dialog');
	var openDialogButton = document.getElementById('openDialog');
	var yesButton = document.getElementById('yes');
	var noButton = document.getElementById('no');
	openDialogButton.addEventListener('click', function() {
	const styleElement = document.createElement("style");
	styleElement.id = "dialogOpen";
	styleElement.innerHTML = ".vkebhancerHome .vkebhancerInternalPanel_in{    pointer-events:none; filter: blur(10px) !important;}";
	document.head.appendChild(styleElement);
    dialog.style.display = 'block';
  });

	yesButton.addEventListener('click', function() {
    dialog.style.display = 'none';
	const customStyle = document.getElementById("dialogOpen");
    if (customStyle) {
        customStyle.remove();
    }
	chrome.browsingData.remove({
      "since": 0
    }, {
      "cache": true,
      "appcache": true
    }, function() {
      chrome.tabs.query({ url: "https://vk.com/*" }, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.reload(tab.id, { bypassCache: true });
        });
      });
    });
  });
  noButton.addEventListener('click', function() {
	  const customStyle = document.getElementById("dialogOpen");
    if (customStyle) {
        customStyle.remove();
    }
    dialog.style.display = 'none';
  });
});

document.querySelector('.vkenhancerLogo').addEventListener('click', function() {
  chrome.tabs.create({ url: 'https://vk.com/vkenhancer' });
});

document.querySelector('#github').addEventListener('click', function() {
  chrome.tabs.create({ url: 'https://github.com/maxhack1337/vk_enhancer' });
});

themeChange.addEventListener('click', (event) => {
	if(!isThemeChanged)
	{
	const styleElement = document.createElement("style");
	chrome.storage.local.set({ issThemeChanged: true });
	isThemeChanged = true;
	styleElement.id = "lightTheme";
	changerButton.title = 'Сменить тему на тёмную';
	var imageurl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28' width='24' height='24' style='display: block;'%3E%3Cg fill-rule='nonzero' fill='none'%3E%3Cpath d='M0 0h28v28H0z'%3E%3C/path%3E%3Cpath d='M24.166 15.685a1 1 0 0 1 1.277 1.275c-.569 1.614-1.445 3.046-2.632 4.229-4.418 4.418-11.58 4.417-15.997 0-4.419-4.417-4.419-11.58 0-15.998C8 4.006 9.431 3.129 11.042 2.559a1 1 0 0 1 1.276 1.277c-1.194 3.372-.394 7.133 2.16 9.69 2.554 2.553 6.317 3.353 9.688 2.16Zm-11.102-.746a11.25 11.25 0 0 1-3.163-9.643c-.61.37-1.17.806-1.673 1.309-3.637 3.637-3.637 9.534 0 13.17a9.311 9.311 0 0 0 13.17-.002 8.75 8.75 0 0 0 1.31-1.671a11.247 11.247 0 0 1-9.644-3.163Z' fill='%232483e4'%3E%3C/path%3E%3C/g%3E%3C/svg%3E ";
    styleElement.innerHTML = "#inMessage{color:black!important;}#serverSidebar{background-color:#fff;  box-shadow: 0px 9px 10px gray;}.serverMessage > div > a,.dialog > p, .updateAvailable > p, .serverMessage > div > p{color:black!important;} .dialog,.updateAvailable,.serverMessage{background-color:#fff; box-shadow: 0px 0px 10px gray;}.vkenhancerCheckBoxClass__in:checked+.vkenhancerCB::after{	 background-color:#2688eb!important;}.vkenhancerCheckBoxClass__in:checked+.vkenhancerCB::before{	background-color:#2483e4}#colorgray{	color:rgba(0,0,0,0.8);}#addstickertext,#parseidtext{	color:black;}#scrollableBlock::-webkit-scrollbar-thumb{	background-color:#e5e5e7;}#themechange > button{	background: url("+'"'+imageurl+'"'+") 24px no-repeat;}.vkenhancerButton1{	color:#2483e4!important;}#themechange > button > svg > g > path:nth-child(2){	fill:#2483e4!important;}.vkenhancerVersionText{	color:rgba(0, 0, 0, 0.5)!important;}.vkenhancerSep1{	color:#e1e3e6!important;}.vkenhancerPlaceHolder__in{	 color: rgba(50, 50, 50)!important;}.ButtonInstallpreload,.vkenhancerButton4.vkenhancerButton8{	 background-color:#2483e4;}.vkenhancerButtonText__in,.ButtonInstallpreload > span > span.vkenhancerPresentation{	 color:#fff!important;}.vkenhancerLogo > svg > g > path:nth-child(3){	 fill:black;}.vkenhancerInput__in.vkenhancerInput--withPH--ios .vkenhancerPlaceHolderEmpty,.vkenhancerPlaceHolderEmpty{	 border-color:rgba(0, 0, 0, 0.24)!important;}.vkenhancerChooseLabel{	 color:black;}.Y1aohYZJ5QjB1Nuw,.ie6jnmeUOSRv1qMj{	 background-color:#f2f3f5;}.config-reset-icon > svg{	 color:black;}.vkenhancerLowTextInner{	 color:black;}.vkenhancerWarningBox__in{color:gray;}.vkenhancerCB::after {	 background:rgba(0, 0, 0, 0.24);}.vkebhancerHome .vkebhancerInternalPanel_in, .vkebhancerHome::before,.vkenhancerPreLogo,.vkenhancerInput--withPH--ios,.vkenhancerInput__in{	 background-color:#fff;} #textfieldprotipID,.textfieldpro,.vkenhancerLogo__after,.y2tAdaKbIKTTIdCH::after,.betathing {	 background-color:#f5f5f5;	 color:#6d7885;}";
	document.head.appendChild(styleElement);
	}
	else
	{
	changerButton.title = 'Сменить тему на светлую';
	const customStyle = document.getElementById("lightTheme");
    if (customStyle) {
        customStyle.remove();
    }
	isThemeChanged = false;
	chrome.storage.local.set({ issThemeChanged: false });
	}
});

nameAva.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({ checkboxStateAva: checked });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "nameAva", isChecked: checked });
    });
});

checkId.addEventListener('click', (event) => {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "checkId" });
    });
});

resetLogo.addEventListener('click', (event) => {
	customLogoText.value="undefined";
	chrome.storage.local.set({
    customLogo: customLogoText.value,
  });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "customLogo", cLogo: customLogoText.value });
    });
});

resetFont.addEventListener('click', (event) => {
	customFontText.value="undefined";
	chrome.storage.local.set({
    customFont: customFontText.value,
  });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "customFont", cLogo: customFontText.value });
    });
});

resetBg.addEventListener('click', (event) => {
	customBgText.value="undefined";
	chrome.storage.local.set({
    customBg: customBgText.value,
  });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "customBg", cLogo: customBgText.value });
    });
});

customLogo.addEventListener('click', (event) => {
	 event.preventDefault();
	chrome.storage.local.set({
    customLogo: customLogoText.value,
  });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "customLogo", cLogo: customLogoText.value });
    });
});

customBg.addEventListener('click', (event) => {
	 event.preventDefault();
	chrome.storage.local.set({
    customBg: customBgText.value,
  });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "customBg", cBg: customBgText.value });
    });
});

customFont.addEventListener('click', (event) => {
	 event.preventDefault();
	chrome.storage.local.set({
    customFont: customFontText.value,
  });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "customFont", cFont: customFontText.value });
    });
});

resetCaccent.addEventListener('click', (event) => {
	customAccent.value="#FFFFFF";
	chrome.storage.local.set({
    customAccent: customAccent.value,
  });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "customAccent", cAccent: customAccent.value });
    });
});

resetCsel.addEventListener('click', (event) => {
	colorPicker.value="#3291ff";
	chrome.storage.local.set({
    colorPicker: colorPicker.value,
  });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "colorPicker", cAccent: colorPicker.value });
    });
});

resetCtext.addEventListener('click', (event) => {
	colorPickerText.value="#FFFFFF";
	chrome.storage.local.set({
    colorPickerText: colorPickerText.value,
  });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "colorPickerText", cAccent: colorPickerText.value });
    });
});


function saveToCache() {
  if(customAccent.value!=undefined)
  {
  var customAccentValue = customAccent.value;
  }
  else
  {
  var customAccentValue = "#FFFFFF";
  }
  if(colorPicker.value!=undefined)
  {
  var colorPickerValue = colorPicker.value;
  }
  else
  {
  var colorPickerValue = "#3291FF";
  }
  if(colorPickerText.value!=undefined)
  {
  var colorPickerTextValue = colorPickerText.value;
  }
  else
  {
  var colorPickerTextValue = "#FFFFFF";  
  }

  chrome.storage.local.set({
    customAccent: customAccentValue,
    colorPicker: colorPickerValue,
    colorPickerText: colorPickerTextValue,
  });
  
  console.log("Changed:"+customAccentValue+" "+colorPickerValue+" "+colorPickerTextValue)
  
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "customAccent", cAccent: customAccentValue });
		chrome.tabs.sendMessage(activeTabId, { type: "colorPicker", cPicker: colorPickerValue });
		chrome.tabs.sendMessage(activeTabId, { type: "colorPickerText", cText: colorPickerTextValue });
    });
}

customAccent.addEventListener('change', saveToCache);
colorPicker.addEventListener('change', saveToCache);
colorPickerText.addEventListener('change', saveToCache);


copyLink.addEventListener('click', (event) => {
	if(parseId.value != "Данный элемент не является пользователем или группой")
	{
		copyToClipboard(parseId.value);
		parseId.value = "Скопировано в буфер!";
	}
});

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.greeting) {
	 console.log("Greetings "+message.greeting);
	if(message.greeting == "undefined")
	{
		parseId.value = "Данный элемент не является пользователем или группой";
	}
    parseId.value = message.greeting;
  }
});

accentC.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({ checkboxState: checked });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "toggleOldAccent", isChecked: checked });
    });
});

msgreact.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({ checkboxState1: checked });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "toggleMsgReactions", isChecked: checked });
    });
});

secretFuncC.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({ secretFuncState: checked });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "toggleSecretFunctions", isChecked: checked });
    });
});

postReactionsC.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({ postReactionsState: checked });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "togglePostReactions", isChecked: checked });
    });
});

hiderC.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({ hiderState: checked });
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { type: "toggleHider", isChecked: checked });
    });
});

addSticker.addEventListener('click', () => {
  const stickerId = document.getElementById('addstickertextfield').value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTabId = tabs[0].id;
    chrome.tabs.sendMessage(activeTabId, { type: "addSticker", stickerId });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // Получение состояния из Local Storage
		chrome.storage.local.get(["issThemeChanged","checkboxStateAva","checkboxState", "checkboxState1", "secretFuncState", "postReactionsState", "hiderState", "customAccent", "colorPicker", "colorPickerText","customLogo","customBg","customFont"], function(items) {
		accentC.checked = items.checkboxState;
        msgreact.checked = items.checkboxState1;
        secretFuncC.checked = items.secretFuncState;
        postReactionsC.checked = items.postReactionsState;
        hiderC.checked = items.hiderState;
		customAccent.value = items.customAccent;
		colorPicker.value = items.colorPicker;
		colorPickerText.value = items.colorPickerText;
		customLogoText.value = items.customLogo;
		customBgText.value = items.customBg;
		customFontText.value = items.customFont;
		nameAva.checked = items.checkboxStateAva;
		if(items.issThemeChanged)
		{
			const styleElement = document.createElement("style");
			chrome.storage.local.set({ issThemeChanged: true });
			styleElement.id = "lightTheme";
			changerButton.title = 'Сменить тему на тёмную';
			var imageurl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28' width='24' height='24' style='display: block;'%3E%3Cg fill-rule='nonzero' fill='none'%3E%3Cpath d='M0 0h28v28H0z'%3E%3C/path%3E%3Cpath d='M24.166 15.685a1 1 0 0 1 1.277 1.275c-.569 1.614-1.445 3.046-2.632 4.229-4.418 4.418-11.58 4.417-15.997 0-4.419-4.417-4.419-11.58 0-15.998C8 4.006 9.431 3.129 11.042 2.559a1 1 0 0 1 1.276 1.277c-1.194 3.372-.394 7.133 2.16 9.69 2.554 2.553 6.317 3.353 9.688 2.16Zm-11.102-.746a11.25 11.25 0 0 1-3.163-9.643c-.61.37-1.17.806-1.673 1.309-3.637 3.637-3.637 9.534 0 13.17a9.311 9.311 0 0 0 13.17-.002 8.75 8.75 0 0 0 1.31-1.671a11.247 11.247 0 0 1-9.644-3.163Z' fill='%232483e4'%3E%3C/path%3E%3C/g%3E%3C/svg%3E ";
			styleElement.innerHTML = "#inMessage{color:black!important;}#serverSidebar{background-color:#fff;  box-shadow: 0px 9px 10px gray;}.serverMessage > div > a,.dialog > p, .updateAvailable > p, .serverMessage > div > p{color:black!important;} .dialog,.updateAvailable,.serverMessage{background-color:#fff; box-shadow: 0px 0px 10px gray;}.vkenhancerCheckBoxClass__in:checked+.vkenhancerCB::after{	 background-color:#2688eb!important;}.vkenhancerCheckBoxClass__in:checked+.vkenhancerCB::before{	background-color:#2483e4}#colorgray{	color:rgba(0,0,0,0.8);}#addstickertext,#parseidtext{	color:black;}#scrollableBlock::-webkit-scrollbar-thumb{	background-color:#e5e5e7;}#themechange > button{	background: url("+'"'+imageurl+'"'+") 24px no-repeat;}.vkenhancerButton1{	color:#2483e4!important;}#themechange > button > svg > g > path:nth-child(2){	fill:#2483e4!important;}.vkenhancerVersionText{	color:rgba(0, 0, 0, 0.5)!important;}.vkenhancerSep1{	color:#e1e3e6!important;}.vkenhancerPlaceHolder__in{	 color: rgba(50, 50, 50)!important;}.ButtonInstallpreload,.vkenhancerButton4.vkenhancerButton8{	 background-color:#2483e4;}.vkenhancerButtonText__in,.ButtonInstallpreload > span > span.vkenhancerPresentation{	 color:#fff!important;}.vkenhancerLogo > svg > g > path:nth-child(3){	 fill:black;}.vkenhancerInput__in.vkenhancerInput--withPH--ios .vkenhancerPlaceHolderEmpty,.vkenhancerPlaceHolderEmpty{	 border-color:rgba(0, 0, 0, 0.24)!important;}.vkenhancerChooseLabel{	 color:black;}.Y1aohYZJ5QjB1Nuw,.ie6jnmeUOSRv1qMj{	 background-color:#f2f3f5;}.config-reset-icon > svg{	 color:black;}.vkenhancerLowTextInner{	 color:black;}.vkenhancerWarningBox__in{color:gray;}.vkenhancerCB::after {	 background:rgba(0, 0, 0, 0.24);}.vkebhancerHome .vkebhancerInternalPanel_in, .vkebhancerHome::before,.vkenhancerPreLogo,.vkenhancerInput--withPH--ios,.vkenhancerInput__in{	 background-color:#fff;} #textfieldprotipID,.textfieldpro,.vkenhancerLogo__after,.y2tAdaKbIKTTIdCH::after,.betathing {	 background-color:#f5f5f5;	 color:#6d7885;}";
			document.head.appendChild(styleElement);
			isThemeChanged = true;
		}

        // Отправка сообщения в content_script.js
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTabId = tabs[0].id;
            chrome.tabs.sendMessage(activeTabId, { type: "toggleOldAccent", isChecked: items.checkboxState });
            chrome.tabs.sendMessage(activeTabId, { type: "toggleMsgReactions", isChecked: items.checkboxState1 });
			chrome.tabs.sendMessage(activeTabId, { type: "toggleSecretFunctions", isChecked: items.secretFuncState });
			chrome.tabs.sendMessage(activeTabId, { type: "togglePostReactions", isChecked: items.postReactionsState });
			chrome.tabs.sendMessage(activeTabId, { type: "toggleHider", isChecked: items.hiderState });
			chrome.tabs.sendMessage(activeTabId, { type: "customAccent", cAccent: items.customAccent });
			chrome.tabs.sendMessage(activeTabId, { type: "colorPicker", cPicker: items.colorPicker });
			chrome.tabs.sendMessage(activeTabId, { type: "colorPickerText", cText: items.colorPickerText });
			chrome.tabs.sendMessage(activeTabId, { type: "customLogo", cLogo: items.customLogo });
			chrome.tabs.sendMessage(activeTabId, { type: "customBg", cBg: items.customBg });
			chrome.tabs.sendMessage(activeTabId, { type: "customFont", cFont: items.customFont });
			chrome.tabs.sendMessage(activeTabId, { type: "nameAva" });
        });
    });
});
