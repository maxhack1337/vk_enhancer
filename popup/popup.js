console.log('Версия 3.9 Release');
var accentC = document.getElementById('oldaccent');
var msgreact = document.getElementById('messagereactions');
var recentgroups = document.getElementById('recentgroups');
var emojistatus = document.getElementById('emojistatus');
var altscrollbar = document.getElementById('altscrollbar');
var muteCalls = document.getElementById('muteCalls');
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
var addhotbar = document.getElementById('addhotbar');
var addemojitf = document.getElementById('addemojitf');
var emojigoDiv = document.getElementById('emojigo');
var cameraphoto = document.getElementById('cameraphoto');
var hidebutton = document.getElementById('hidebutton');
var newdesign = document.getElementById('newdesign');
var integrationmedia = document.getElementById('integrationmedia');
var nechitalka = document.getElementById('nechitalka');
var nepisalka = document.getElementById('nepisalka');
var saveSettings = document.getElementById('SaveSettings');
var loadSettings = document.getElementById('LoadSettings');
var clearSettings = document.getElementById('ClearSettings');
var loadSettingsInput = document.getElementById('LoadSettingsInput');
var pollresults = document.getElementById('pollresults');
var openinnewtab = document.getElementById('openinnewtab');
var removeaway = document.getElementById('removeaway');
var newprofiles = document.getElementById('newprofiles');
var middlename = document.getElementById('middlename');
var oldhover = document.getElementById('oldhover');
var tabletmenu = document.getElementById('tabletmenu');
var tab1 = document.getElementById('tab0');
var tab1 = document.getElementById('tab1');
var tab2 = document.getElementById('tab2');
var tab3 = document.getElementById('tab3');
var tab4 = document.getElementById('tab4');
var ID;

openinnewtab.addEventListener('click', function() {
    chrome.tabs.create({ url: 'popup/popup.html' });
  });

chrome.storage.local.get(['defaultTab'], function(result) {
    const storedValue = result.defaultTab;
    switch (storedValue) {
	    case "0":
            {
                defaultTab0();
                break;
            }
        case "1":
            {
                defaultTab1();
                break;
            }
        case "2":
            {
                defaultTab2();
                break;
            }
        case "3":
            {
                defaultTab3();
                break;
            }
        case "4":
            {
                defaultTab4();
                break;
            }
    }
    if (!storedValue) {
        defaultTab1();
    }
});

function defaultTab0() {
	if (document.getElementById("tabs1")) {
        document.getElementById("tabs1").remove();
    }
    if (document.getElementById("tabs2")) {
        document.getElementById("tabs2").remove();
    }
    if (document.getElementById("tabs3")) {
        document.getElementById("tabs3").remove();
    }
    if (document.getElementById("tabs4")) {
        document.getElementById("tabs4").remove();
    }
    let styleElement = document.getElementById("tabs0");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "tabs0";
        document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = '#tab0,#tab0>div>.vkuiTabbarItem__icon{color:var(--vkenhancer--chosen_tab)!important}#MiddleName,#NewProfiles,#idName,#postR,#GroupsRecent,#Photo,#NFT,#Emoji,.vkEnhancerHeaderRatio1{display:flex!important;}';
    chrome.storage.local.set({
        defaultTab: "0",
    });
}

function defaultTab1() {
	if (document.getElementById("tabs0")) {
        document.getElementById("tabs0").remove();
    }
    if (document.getElementById("tabs2")) {
        document.getElementById("tabs2").remove();
    }
    if (document.getElementById("tabs3")) {
        document.getElementById("tabs3").remove();
    }
    if (document.getElementById("tabs4")) {
        document.getElementById("tabs4").remove();
    }
    let styleElement = document.getElementById("tabs1");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "tabs1";
        document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = '#tab1,#tab1>div>.vkuiTabbarItem__icon{color:var(--vkenhancer--chosen_tab)!important}#TabletMenu,#ScrollBar,.vkEnhancerHeaderRatio2,.vkEnhancerHeaderRatioPseudo1{display:flex!important;}#CustomAccentChoose,#CustomTextChoose,#CustomTextChoose1,[aria-customfont="true"],[aria-custombg="true"],[aria-customlogo="true"],#SliderBlock{display:block!important}';
    chrome.storage.local.set({
        defaultTab: "1",
    });
}

function defaultTab2() {
	if (document.getElementById("tabs0")) {
        document.getElementById("tabs0").remove();
    }
    if (document.getElementById("tabs1")) {
        document.getElementById("tabs1").remove();
    }
    if (document.getElementById("tabs3")) {
        document.getElementById("tabs3").remove();
    }
    if (document.getElementById("tabs4")) {
        document.getElementById("tabs4").remove();
    }
    let styleElement = document.getElementById("tabs2");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "tabs2";
        document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = '#tab2,#tab2>div>.vkuiTabbarItem__icon{color:var(--vkenhancer--chosen_tab)!important}#OldHover,#Chitalka,#Pisalka,#MediaViewer,#NewMessenger,#msgR,#ReconnectInd,.vkEnhancerHeaderRatio3,.vkEnhancerHeaderRatioPseudo2{display:flex!important;}[aria-hotbar="true"]{display:block!important}';
    chrome.storage.local.set({
        defaultTab: "2",
    });
}

function defaultTab3() {
	if (document.getElementById("tabs0")) {
        document.getElementById("tabs0").remove();
    }
    if (document.getElementById("tabs1")) {
        document.getElementById("tabs1").remove();
    }
    if (document.getElementById("tabs2")) {
        document.getElementById("tabs2").remove();
    }
    if (document.getElementById("tabs4")) {
        document.getElementById("tabs4").remove();
    }
    let styleElement = document.getElementById("tabs3");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "tabs3";
        document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = '#tab3,#tab3>div>.vkuiTabbarItem__icon{color:var(--vkenhancer--chosen_tab)!important}#AwayR,#PollsRes,#SaveSettings,#ClearSettings,#LoadSettings,#ReloadVKE,#SecretOldDesign,#HiderL,#CallsM,.vkEnhancerHeaderRatio4,.vkEnhancerHeaderRatioPseudo3{display:flex!important;}[aria-id="true"]{display:block!important}';
    chrome.storage.local.set({
        defaultTab: "3",
    });
}

function defaultTab4() {
	if (document.getElementById("tabs0")) {
        document.getElementById("tabs0").remove();
    }
    if (document.getElementById("tabs1")) {
        document.getElementById("tabs1").remove();
    }
    if (document.getElementById("tabs2")) {
        document.getElementById("tabs2").remove();
    }
    if (document.getElementById("tabs3")) {
        document.getElementById("tabs3").remove();
    }
    let styleElement = document.getElementById("tabs4");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "tabs4";
        document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = '#tab4,#tab4>div>.vkuiTabbarItem__icon{color:var(--vkenhancer--chosen_tab)!important}.footerInfo{display:flex!important;flex-direction: column;align-items: center;}';
    chrome.storage.local.set({
        defaultTab: "4",
    });
}
tab0.addEventListener('click', (event) => {
    defaultTab0();
});
tab1.addEventListener('click', (event) => {
    defaultTab1();
});
tab2.addEventListener('click', (event) => {
    defaultTab2();
});
tab3.addEventListener('click', (event) => {
    defaultTab3();
});
tab4.addEventListener('click', (event) => {
    defaultTab4();
});

document.getElementById('customlogoInput').addEventListener('click', function() {
	let inputLogo = document.querySelector('.vkEnhancerCustomLogoInput');
    inputLogo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
});

document.querySelector('.vkEnhancerCustomLogoInput').addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('customlogotb').value = e.target.result;
            document.getElementById('customlogo').click();
        };
        reader.readAsDataURL(file);
    }
});




document.getElementById('custombgInput').addEventListener('click', function() {
	let inputBG = document.querySelector('.vkEnhancerCustomBGInput');
    inputBG.dispatchEvent(new MouseEvent('click', { bubbles: true }));
});

document.querySelector('.vkEnhancerCustomBGInput').addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('custombgtb').value = e.target.result;
            document.getElementById('custombg').click();
        };
        reader.readAsDataURL(file);
    }
});





document.getElementById('customfontInput').addEventListener('click', function() {
    let inputFont = document.querySelector('.vkEnhancerCustomFontInput');
    inputFont.dispatchEvent(new MouseEvent('click', { bubbles: true }));
});

document.querySelector('.vkEnhancerCustomFontInput').addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
			const fontData = arrayBufferToBase64(e.target.result);;
            const fontUrl = 'data:application/font-woff2;base64,' + fontData;
			document.getElementById('customfonttb').value = fontUrl;
			document.getElementById('customfont').click();
        };
        reader.readAsArrayBuffer(file);
    }
});

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

saveSettings.addEventListener('click', (event) => {
	var jsonData = null;
    var JSONSettings = {};
	chrome.storage.local.get(["tabletMenuState","oldHoverState","middleNameState","newProfilesState","removeAwayState","sliderValue","pollResultsState","nepisalkaState","nechitalkaState","integrationMediaState","newDesignState", "hideButtonState", "cameraPhotoState", "addstickerState", "issThemeChanged", "checkboxStateAva", "checkboxState", "checkboxState1", "secretFuncState", "postReactionsState", "hiderState", "customAccent", "colorPicker", "colorPickerText", "customLogo", "customBg", "customFont", "emojiStatusState", "recentGroupsState", "altSBState", "muteCallsState", "customHotbar"], function(items) {
		console.log(items);
		jsonData = JSON.stringify(items);
		console.log(jsonData);
		var blob = new Blob([jsonData], { type: 'text/json' });
		var a = document.createElement('a');

		a.download = 'VKEnhancerSettings.json';
		a.href = window.URL.createObjectURL(blob);
		a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
		a.click();
	});
});

clearSettings.addEventListener('click', async function() {
        var result = {"addstickerState":false,"altSBState":false,"cameraPhotoState":false,"checkboxState":false,"checkboxState1":false,"checkboxStateAva":false,"colorPicker":"#3291ff","colorPickerText":"#ffffff","customAccent":"#ffffff","customBg":"undefined","customFont":"undefined","customHotbar":[],"customLogo":"undefined","emojiStatusState":false,"hideButtonState":false,"hiderState":false,"integrationMediaState":false,"issThemeChanged":false,"muteCallsState":false,"nechitalkaState":false,"nepisalkaState":false,"newDesignState":false,"pollResultsState":false,"postReactionsState":false,"recentGroupsState":false,"removeAwayState":false,"newProfilesState":false,"middleNameState":false,"oldHoverState":false,"tabletMenuState":false,"secretFuncState":false,"sliderValue":"100"}; 
		for (item of Object.keys(result)) {
			let item123 = {};
			item123[item] = result[item];
			await chrome.storage.local.set(item123);
		}
		loadSavedCheckBoxes();
});

loadSettingsInput.addEventListener('change', function() {
      if (loadSettingsInput.files.length > 0) 
      {
        var reader = new FileReader();
        reader.addEventListener('load', async function() {
          var result = JSON.parse(reader.result); 
		for (item of Object.keys(result)) {
			let item123 = {};
			item123[item] = result[item];
			await chrome.storage.local.set(item123);
		}
		loadSavedCheckBoxes();
		loadSettingsInput.value = null;
        });
        
        reader.readAsText(loadSettingsInput.files[0]);
      }
    });
	
	
tabletmenu.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        tabletMenuState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleTabletMenu",
            isChecked: checked
        });
    });
});

oldhover.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        oldHoverState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleOldHover",
            isChecked: checked
        });
    });
});

middlename.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        middleNameState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleMiddleName",
            isChecked: checked
        });
    });
});

newprofiles.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        newProfilesState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleNewProfiles",
            isChecked: checked
        });
    });
});

removeaway.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        removeAwayState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleRemoveAway",
            isChecked: checked
        });
    });
});

pollresults.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        pollResultsState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "togglePollResults",
            isChecked: checked
        });
    });
});

nepisalka.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        nepisalkaState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleNepisalka",
            isChecked: checked
        });
    });
});

nechitalka.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        nechitalkaState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleNechitalka",
            isChecked: checked
        });
    });
});

integrationmedia.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        integrationMediaState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleIntegrationMedia",
            isChecked: checked
        });
    });
});

addhotbar.addEventListener('click', (event) => {
    event.preventDefault();
    const emojiArray = addemojitf.value.split(',').map(emoji => emoji.trim());
    chrome.storage.local.set({
        customHotbar: emojiArray,
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "customHotbar",
            cHotbar: emojiArray
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['stylusInstalled'], function(result) {
        const stylusInstalled = result.stylusInstalled;
        const labelElement = document.querySelector('.vkenhancerOldLabel');
        const warningElement = document.querySelector('.vkenhancerOldWarning');
        // Если расширение "Stylus" установлено
        if (stylusInstalled) {
            warningElement.style.display = 'none';
            labelElement.style.pointerEvents = 'auto';
            labelElement.style.opacity = '1';
            return;
        }
        // Если расширение "Stylus" не установлено
        warningElement.style.display = 'block';
        labelElement.style.pointerEvents = 'none';
        labelElement.style.opacity = '0.5';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('slider-value');

    function updateSliderColor(value) {
        sliderValue.textContent = value + "%";
        const percentage = value;
        const colorBefore = `linear-gradient(to right, #397dcc ${percentage}%, #ffffff ${percentage}%)`;
        slider.style.background = colorBefore;
    }

    function saveSliderValue(value) {
        chrome.storage.local.set({
            sliderValue: value
        });
    }
    slider.addEventListener('input', function() {
        const value = slider.value;
        updateSliderColor(value);
        saveSliderValue(value);
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
                type: 'sliderValue',
                value
            });
        });
    });
    slider.addEventListener('change', function() {
        const value = slider.value;
        updateSliderColor(value);
        saveSliderValue(value);
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
                type: 'sliderValue',
                value
            });
        });
    });
    chrome.storage.local.get(['sliderValue'], function(result) {
        const storedValue = result.sliderValue;
        if (storedValue === undefined) {
            const defaultValue = 100;
            slider.value = defaultValue;
            updateSliderColor(defaultValue);
            saveSliderValue(defaultValue);
        } else {
            slider.value = storedValue;
            updateSliderColor(storedValue);
        }
    });
});

    /*const styleElementVersion = document.createElement("style");
    styleElementVersion.id = "version";
    styleElementVersion.innerHTML = "#version::after{content:'Версия 3.3 Release'} #version1::after{content:'Не обновляется расширение? Нажмите CTRL+M в любом месте браузера и расширение перезагрузится, при этом, обновившись до новейшей версии'}";
    document.head.appendChild(styleElementVersion);*/
    

document.addEventListener('DOMContentLoaded', function() {
    var dialog = document.getElementById('dialog');
    var openDialogButton = document.getElementById('openDialog');
    var vkebhancerInternalPanel = document.querySelector('.vkebhancerInternalPanel_in');
    var yesButton = document.getElementById('yes');
    var noButton = document.getElementById('no');
    openDialogButton.addEventListener('click', function() {
        const styleElement = document.createElement("style");
        styleElement.id = "dialogOpen";
        styleElement.innerHTML = ".vkebhancerHome .vkebhancerInternalPanel_in{    pointer-events:none; filter: blur(10px); transition: filter 0.5s ease-in-out;}";
        document.head.appendChild(styleElement);
        dialog.style.opacity = '1';
        dialog.style.visibility = 'visible';
    });
    yesButton.addEventListener('click', function() {
        const customStyle = document.getElementById("dialogOpen");
        dialog.style.opacity = '0';
        const animationPromise = new Promise(resolve => {
            dialog.addEventListener('transitionend', resolve, {
                once: true
            });
        });
        animationPromise.then(() => {
            dialog.style.visibility = 'hidden';
            vkebhancerInternalPanel.style.filter = 'blur(0px)';
            setTimeout(() => {
                if (customStyle) {
                    vkebhancerInternalPanel.style.filter = '';
                    customStyle.remove();
                }
            }, 500);
        });
        chrome.browsingData.remove({
            "since": 0
        }, {
            "cache": true,
            "appcache": true
        }, function() {
            chrome.tabs.query({
                url: "https://vk.com/*"
            }, function(tabs) {
                tabs.forEach(function(tab) {
                    chrome.tabs.reload(tab.id, {
                        bypassCache: true
                    });
                });
            });
        });
    });
    noButton.addEventListener('click', function() {
        const customStyle = document.getElementById("dialogOpen");
        dialog.style.opacity = '0';
        const animationPromise = new Promise(resolve => {
            dialog.addEventListener('transitionend', resolve, {
                once: true
            });
        });
        animationPromise.then(() => {
            dialog.style.visibility = 'hidden';
            vkebhancerInternalPanel.style.filter = 'blur(0px)';
            setTimeout(() => {
                if (customStyle) {
                    vkebhancerInternalPanel.style.filter = '';
                    customStyle.remove();
                }
            }, 500);
        });
    });
});
document.querySelector('.vkenhancerLogo').addEventListener('click', function() {
    chrome.tabs.create({
        url: 'https://vk.com/vkenhancer'
    });
});
themeChange.addEventListener('click', (event) => {
    if (!isThemeChanged) {
        const styleElement = document.createElement("style");
        chrome.storage.local.set({
            issThemeChanged: true
        });
        isThemeChanged = true;
        styleElement.id = "lightTheme";
        var imageurl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28' width='24' height='24' style='display: block;'%3E%3Cg fill-rule='nonzero' fill='none'%3E%3Cpath d='M0 0h28v28H0z'%3E%3C/path%3E%3Cpath d='M24.166 15.685a1 1 0 0 1 1.277 1.275c-.569 1.614-1.445 3.046-2.632 4.229-4.418 4.418-11.58 4.417-15.997 0-4.419-4.417-4.419-11.58 0-15.998C8 4.006 9.431 3.129 11.042 2.559a1 1 0 0 1 1.276 1.277c-1.194 3.372-.394 7.133 2.16 9.69 2.554 2.553 6.317 3.353 9.688 2.16Zm-11.102-.746a11.25 11.25 0 0 1-3.163-9.643c-.61.37-1.17.806-1.673 1.309-3.637 3.637-3.637 9.534 0 13.17a9.311 9.311 0 0 0 13.17-.002 8.75 8.75 0 0 0 1.31-1.671a11.247 11.247 0 0 1-9.644-3.163Z' fill='%232483e4'%3E%3C/path%3E%3C/g%3E%3C/svg%3E ";
        styleElement.innerHTML = ".vkEnHeaderRatioMain,.vkEnPseudoSectionLabel{color:#99A2AD!important} #scrollableBlock::-webkit-scrollbar-thumb{border: 4px solid #fff!important;}body{background-color:#fff;}:root {--vkui--color_separator_primary:#e1e3e6!important;--vkui--color_background_secondary:#00103d0a!important;--vkui--color_text_primary:black!important;--vkui--color_background_content:#fff!important;--vkui--color_transparent--hover:rgba(0, 16, 61, 0.04)!important;--vkenhancer--chosen_tab:#0077FF!important}.vkuiTabbar{	border-top:1px solid #d3d3d3;);background-color:#fff;}.CardLink_CardLink__title{color:#000;}.CardLink_CardLink:hover{background-color:#00103d1f;}.CardLink_CardLink{background-color:#00103d0a;}.custom-slider::-webkit-slider-thumb{	  box-shadow: 0px 0px 5px #ccc;}#inMessage{color:black!important;}#serverSidebar{background-color:#fff;  box-shadow: 0px 9px 10px gray;}.serverMessage > div > a,.dialog > p, .updateAvailable > p, .serverMessage > div > p{color:black!important;} .dialog,.updateAvailable,.serverMessage{background-color:#fff; box-shadow: 0px 0px 10px gray;}.vkenhancerCheckBoxClass__in:checked+.vkenhancerCB::after{	 background-color:#2688eb!important;}.vkenhancerCheckBoxClass__in:checked+.vkenhancerCB::before{	background-color:#2483e4}#colorgray{	color:rgba(0,0,0,0.8);}#addstickertext,#parseidtext{	color:black;}#scrollableBlock::-webkit-scrollbar-thumb{	background-color:#e5e5e7;}#themechange > button{	background: url(" + '"' + imageurl + '"' + ") 4px no-repeat;}.vkenhancerButton1{	color:#2483e4!important;}#themechange > button > svg > g > path:nth-child(2){	fill:#2483e4!important;}.vkenhancerVersionText{	color:rgba(0, 0, 0, 0.5)!important;}.vkenhancerSep1{	color:#e1e3e6!important;}.vkenhancerPlaceHolder__in{	 color: rgba(50, 50, 50)!important;}.ButtonInstallpreload,.vkenhancerButton4.vkenhancerButton8{	 background-color:#2483e4;}.vkenhancerButtonText__in,.ButtonInstallpreload > span > span.vkenhancerPresentation{	 color:#fff!important;}.vkenhancerLogo > svg > g > g > path{	 fill:black;}.vkenhancerInput__in.vkenhancerInput--withPH--ios .vkenhancerPlaceHolderEmpty,.vkenhancerPlaceHolderEmpty{	 border-color:rgba(0, 0, 0, 0.24)!important;}.vkenhancerChooseLabel{	 color:black;}.Y1aohYZJ5QjB1Nuw,.ie6jnmeUOSRv1qMj{	 background-color:#f2f3f5;}.config-reset-icon > svg{	 color:black;}.vkenhancerLowTextInner{	 color:black;}.vkenhancerWarningBox__in{color:gray;}.vkenhancerCB::after {	 background:rgba(0, 0, 0, 0.24);}.vkebhancerHome .vkebhancerInternalPanel_in, .vkebhancerHome::before,.vkenhancerPreLogo,.vkenhancerInput--withPH--ios,.vkenhancerInput__in{	 background-color:#fff;} #textfieldprotipID,.textfieldpro,.vkenhancerLogo__after,.y2tAdaKbIKTTIdCH::after,.betathing {	 background-color:#f5f5f5;	 color:#6d7885;}";
        document.head.appendChild(styleElement);
    } else {
        const customStyle = document.getElementById("lightTheme");
        if (customStyle) {
            customStyle.remove();
        }
        isThemeChanged = false;
        chrome.storage.local.set({
            issThemeChanged: false
        });
    }
});
nameAva.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        checkboxStateAva: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "nameAva",
            isChecked: checked
        });
    });
});
cameraphoto.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        cameraPhotoState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleCameraPhoto",
            isChecked: checked
        });
    });
});
hidebutton.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        hideButtonState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleHideButton",
            isChecked: checked
        });
    });
});
newdesign.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        newDesignState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleNewDesign",
            isChecked: checked
        });
    });
});
checkId.addEventListener('click', (event) => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "checkId"
        });
    });
});
resetLogo.addEventListener('click', (event) => {
    customLogoText.value = "";
    chrome.storage.local.set({
        customLogo: customLogoText.value,
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "customLogo",
            cLogo: customLogoText.value
        });
    });
});
resetFont.addEventListener('click', (event) => {
    customFontText.value = "";
    chrome.storage.local.set({
        customFont: customFontText.value,
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "customFont",
            cLogo: customFontText.value
        });
    });
});
resetBg.addEventListener('click', (event) => {
    customBgText.value = "";
    chrome.storage.local.set({
        customBg: customBgText.value,
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "customBg",
            cLogo: customBgText.value
        });
    });
});
customLogo.addEventListener('click', (event) => {
    event.preventDefault();
    chrome.storage.local.set({
        customLogo: customLogoText.value,
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "customLogo",
            cLogo: customLogoText.value
        });
    });
});
customBg.addEventListener('click', (event) => {
    event.preventDefault();
    chrome.storage.local.set({
        customBg: customBgText.value,
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "customBg",
            cBg: customBgText.value
        });
    });
});
customFont.addEventListener('click', (event) => {
    event.preventDefault();
    chrome.storage.local.set({
        customFont: customFontText.value,
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "customFont",
            cFont: customFontText.value
        });
    });
});
resetCaccent.addEventListener('click', (event) => {
    customAccent.value = "#FFFFFF";
    chrome.storage.local.set({
        customAccent: customAccent.value,
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "customAccent",
            cAccent: customAccent.value
        });
    });
});
resetCsel.addEventListener('click', (event) => {
    colorPicker.value = "#3291ff";
    chrome.storage.local.set({
        colorPicker: colorPicker.value,
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "colorPicker",
            cAccent: colorPicker.value
        });
    });
});
resetCtext.addEventListener('click', (event) => {
    colorPickerText.value = "#FFFFFF";
    chrome.storage.local.set({
        colorPickerText: colorPickerText.value,
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "colorPickerText",
            cAccent: colorPickerText.value
        });
    });
});

function saveToCache() {
    if (customAccent.value != undefined) {
        var customAccentValue = customAccent.value;
    } else {
        var customAccentValue = "#FFFFFF";
    }
    if (colorPicker.value != undefined) {
        var colorPickerValue = colorPicker.value;
    } else {
        var colorPickerValue = "#3291FF";
    }
    if (colorPickerText.value != undefined) {
        var colorPickerTextValue = colorPickerText.value;
    } else {
        var colorPickerTextValue = "#FFFFFF";
    }
    chrome.storage.local.set({
        customAccent: customAccentValue,
        colorPicker: colorPickerValue,
        colorPickerText: colorPickerTextValue,
    });
    console.log("Changed:" + customAccentValue + " " + colorPickerValue + " " + colorPickerTextValue)
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "customAccent",
            cAccent: customAccentValue
        });
        chrome.tabs.sendMessage(activeTabId, {
            type: "colorPicker",
            cPicker: colorPickerValue
        });
        chrome.tabs.sendMessage(activeTabId, {
            type: "colorPickerText",
            cText: colorPickerTextValue
        });
    });
}
customAccent.addEventListener('change', saveToCache);
colorPicker.addEventListener('change', saveToCache);
colorPickerText.addEventListener('change', saveToCache);
document.querySelector('#emojigo').addEventListener('click', function() {
    chrome.tabs.create({
        url: 'https://nimble-wisp-54a226.netlify.app/emoji.html'
    });
});
copyLink.addEventListener('click', (event) => {
    if (parseId.value != getLocalizedString(strings.notGroupOrUserId)) {
        copyToClipboard(parseId.value);
        parseId.value = getLocalizedString(strings.copiedToCB);
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

function getCurrentLanguage() {
    var select = document.getElementById("languageSelect");
    return select.value;
}
const strings = {
    notGroupOrUserId: ['Данный элемент не является пользователем или группой', 'This element is not a user profile or group', 'Цей елемент не є користувачем або групою'],
    copiedToCB: ['Скопировано в буфер!', 'Successfully copied to clipboard!', 'Скопійовано у буфер!'],	
	}
function getLocalizedString(obj) {
    const currentLanguage = getCurrentLanguage();
    return obj[currentLanguage];
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.greeting) {
        console.log("Greetings " + message.greeting);
        if (message.greeting == "undefined") {
            parseId.value = getLocalizedString(strings.notGroupOrUserId);
        }
        parseId.value = message.greeting;
    }
});
accentC.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        checkboxState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleOldAccent",
            isChecked: checked
        });
    });
});
msgreact.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        checkboxState1: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleMsgReactions",
            isChecked: checked
        });
    });
});
recentgroups.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        recentGroupsState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleRecentGroups",
            isChecked: checked
        });
    });
});
altscrollbar.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        altSBState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleAltSB",
            isChecked: checked
        });
    });
});
emojistatus.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        emojiStatusState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleEmojiStatus",
            isChecked: checked
        });
    });
});
muteCalls.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        muteCallsState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleMuteStatus",
            isChecked: checked
        });
    });
});
secretFuncC.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        secretFuncState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleSecretFunctions",
            isChecked: checked
        });
    });
});
postReactionsC.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        postReactionsState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "togglePostReactions",
            isChecked: checked
        });
    });
});
hiderC.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        hiderState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "toggleHider",
            isChecked: checked
        });
    });
});
addSticker.addEventListener('change', (event) => {
    const checked = event.target.checked;
    chrome.storage.local.set({
        addstickerState: checked
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            type: "addSticker",
            isChecked: checked
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
loadSavedCheckBoxes();
});

function loadSavedCheckBoxes() {
    // Получение состояния из Local Storage
    chrome.storage.local.get(["tabletMenuState","oldHoverState","middleNameState","newProfilesState","removeAwayState","sliderValue","pollResultsState","nepisalkaState","nechitalkaState","integrationMediaState","newDesignState", "hideButtonState", "cameraPhotoState", "addstickerState", "issThemeChanged", "checkboxStateAva", "checkboxState", "checkboxState1", "secretFuncState", "postReactionsState", "hiderState", "customAccent", "colorPicker", "colorPickerText", "customLogo", "customBg", "customFont", "emojiStatusState", "recentGroupsState", "altSBState", "muteCallsState", "customHotbar"], function(items) {
        accentC.checked = items.checkboxState;
        msgreact.checked = items.checkboxState1;
        recentgroups.checked = items.recentGroupsState;
        emojistatus.checked = items.emojiStatusState;
        altscrollbar.checked = items.altSBState;
        muteCalls.checked = items.muteCallsState;
        secretFuncC.checked = items.secretFuncState;
        postReactionsC.checked = items.postReactionsState;
        hiderC.checked = items.hiderState;
		integrationmedia.checked = items.integrationMediaState;
		nechitalka.checked = items.nechitalkaState;
		nepisalka.checked = items.nepisalkaState;
		pollresults.checked = items.pollResultsState;
		removeaway.checked = items.removeAwayState;
		newprofiles.checked = items.newProfilesState;
		middlename.checked = items.middleNameState;
		oldhover.checked = items.oldHoverState;
		tabletmenu.checked = items.tabletMenuState;
        slider.value = items.sliderValue;
		const sliderValue = document.getElementById('slider-value');
        sliderValue.textContent = slider.value + "%";
        const percentage = slider.value;
        const colorBefore = `linear-gradient(to right, #397dcc ${percentage}%, #ffffff ${percentage}%)`;
        slider.style.background = colorBefore;
        if (typeof items.customAccent === "undefined") {
            customAccent.value = "#FFFFFF";
            chrome.storage.local.set({
                customAccent: customAccent.value,
            });
        } else {
            customAccent.value = items.customAccent;
        }
        if (typeof items.colorPicker === "undefined") {
            colorPicker.value = "#3291FF";
            chrome.storage.local.set({
                colorPicker: colorPicker.value,
            });
        } else {
            colorPicker.value = items.colorPicker;
        }
        if (typeof items.colorPickerText === "undefined") {
            colorPickerText.value = "#FFFFFF";
            chrome.storage.local.set({
                colorPickerText: colorPickerText.value,
            });
        } else {
            colorPickerText.value = items.colorPickerText;
        }
		if(items.customLogo && items.customLogo != "undefined") {
			customLogoText.value = items.customLogo;
		}
		if(items.customBgText && items.customBgText != "undefined") {
			customBgText.value = items.customBg;
		}
		if(items.customFont && items.customFont != "undefined") {
			customFontText.value = items.customFont;
		}
        addSticker.checked = items.addstickerState;
        cameraphoto.checked = items.cameraPhotoState;
        hidebutton.checked = items.hideButtonState;
        newdesign.checked = items.newDesignState;
        if (items.customHotbar) {
            addemojitf.value = items.customHotbar;
        } else {
            addemojitf.value = "";
        }
        nameAva.checked = items.checkboxStateAva;
        if (items.issThemeChanged) {
            const styleElement = document.createElement("style");
            chrome.storage.local.set({
                issThemeChanged: true
            });
            styleElement.id = "lightTheme";
            var imageurl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28' width='24' height='24' style='display: block;'%3E%3Cg fill-rule='nonzero' fill='none'%3E%3Cpath d='M0 0h28v28H0z'%3E%3C/path%3E%3Cpath d='M24.166 15.685a1 1 0 0 1 1.277 1.275c-.569 1.614-1.445 3.046-2.632 4.229-4.418 4.418-11.58 4.417-15.997 0-4.419-4.417-4.419-11.58 0-15.998C8 4.006 9.431 3.129 11.042 2.559a1 1 0 0 1 1.276 1.277c-1.194 3.372-.394 7.133 2.16 9.69 2.554 2.553 6.317 3.353 9.688 2.16Zm-11.102-.746a11.25 11.25 0 0 1-3.163-9.643c-.61.37-1.17.806-1.673 1.309-3.637 3.637-3.637 9.534 0 13.17a9.311 9.311 0 0 0 13.17-.002 8.75 8.75 0 0 0 1.31-1.671a11.247 11.247 0 0 1-9.644-3.163Z' fill='%232483e4'%3E%3C/path%3E%3C/g%3E%3C/svg%3E ";
            styleElement.innerHTML = ".vkEnHeaderRatioMain,.vkEnPseudoSectionLabel{color:#99A2AD!important} #scrollableBlock::-webkit-scrollbar-thumb{border: 4px solid #fff!important;}body{background-color:#fff;}:root {--vkui--color_separator_primary:#e1e3e6!important;--vkui--color_background_secondary:#00103d0a!important;--vkui--color_text_primary:black!important;--vkui--color_background_content:#fff!important;--vkui--color_transparent--hover:rgba(0, 16, 61, 0.04)!important;--vkenhancer--chosen_tab:#0077FF!important}.vkuiTabbar{	border-top:1px solid #d3d3d3;);background-color:#fff;}.CardLink_CardLink__title{color:#000;}.CardLink_CardLink:hover{background-color:#00103d1f;}.CardLink_CardLink{background-color:#00103d0a;}.custom-slider::-webkit-slider-thumb{	  box-shadow: 0px 0px 5px #ccc;}#inMessage{color:black!important;}#serverSidebar{background-color:#fff;  box-shadow: 0px 9px 10px gray;}.serverMessage > div > a,.dialog > p, .updateAvailable > p, .serverMessage > div > p{color:black!important;} .dialog,.updateAvailable,.serverMessage{background-color:#fff; box-shadow: 0px 0px 10px gray;}.vkenhancerCheckBoxClass__in:checked+.vkenhancerCB::after{	 background-color:#2688eb!important;}.vkenhancerCheckBoxClass__in:checked+.vkenhancerCB::before{	background-color:#2483e4}#colorgray{	color:rgba(0,0,0,0.8);}#addstickertext,#parseidtext{	color:black;}#scrollableBlock::-webkit-scrollbar-thumb{	background-color:#e5e5e7;}#themechange > button{	background: url(" + '"' + imageurl + '"' + ") 4px no-repeat;}.vkenhancerButton1{	color:#2483e4!important;}#themechange > button > svg > g > path:nth-child(2){	fill:#2483e4!important;}.vkenhancerVersionText{	color:rgba(0, 0, 0, 0.5)!important;}.vkenhancerSep1{	color:#e1e3e6!important;}.vkenhancerPlaceHolder__in{	 color: rgba(50, 50, 50)!important;}.ButtonInstallpreload,.vkenhancerButton4.vkenhancerButton8{	 background-color:#2483e4;}.vkenhancerButtonText__in,.ButtonInstallpreload > span > span.vkenhancerPresentation{	 color:#fff!important;} .vkenhancerLogo > svg > g > g > path{	 fill:black;}.vkenhancerInput__in.vkenhancerInput--withPH--ios .vkenhancerPlaceHolderEmpty,.vkenhancerPlaceHolderEmpty{	 border-color:rgba(0, 0, 0, 0.24)!important;}.vkenhancerChooseLabel{	 color:black;}.Y1aohYZJ5QjB1Nuw,.ie6jnmeUOSRv1qMj{	 background-color:#f2f3f5;}.config-reset-icon > svg{	 color:black;}.vkenhancerLowTextInner{	 color:black;}.vkenhancerWarningBox__in{color:gray;}.vkenhancerCB::after {	 background:rgba(0, 0, 0, 0.24);}.vkebhancerHome .vkebhancerInternalPanel_in, .vkebhancerHome::before,.vkenhancerPreLogo,.vkenhancerInput--withPH--ios,.vkenhancerInput__in{	 background-color:#fff;} #textfieldprotipID,.textfieldpro,.vkenhancerLogo__after,.y2tAdaKbIKTTIdCH::after,.betathing {	 background-color:#f5f5f5;	 color:#6d7885;}";
            document.head.appendChild(styleElement);
            isThemeChanged = true;
        }
        // Отправка сообщения в content_script.js
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            const activeTabId = tabs[0].id;
			chrome.tabs.sendMessage(activeTabId, {
                type: "toggleNewDesign",
                isChecked: items.newDesignState
            });
			chrome.tabs.sendMessage(activeTabId, {
                type: "toggleTabletMenu",
                isChecked: items.tabletMenuState
            });
			chrome.tabs.sendMessage(activeTabId, {
                type: "toggleOldHover",
                isChecked: items.oldHoverState
            });
			chrome.tabs.sendMessage(activeTabId, {
                type: "toggleMiddleName",
                isChecked: items.middleNameState
            });
			chrome.tabs.sendMessage(activeTabId, {
                type: "toggleNewProfiles",
                isChecked: items.newProfilesState
            });
			chrome.tabs.sendMessage(activeTabId, {
                type: "toggleRemoveAway",
                isChecked: items.removeAwayState
            });
			chrome.tabs.sendMessage(activeTabId, {
                type: "togglePollResults",
                isChecked: items.pollResultsState
            });
			chrome.tabs.sendMessage(activeTabId, {
                type: "toggleIntegrationMedia",
                isChecked: items.integrationMediaState
            });
			chrome.tabs.sendMessage(activeTabId, {
                type: "toggleNepisalka",
                isChecked: items.nepisalkaState
            });
			chrome.tabs.sendMessage(activeTabId, {
                type: "toggleNechitalka",
                isChecked: items.nechitalkaState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "toggleOldAccent",
                isChecked: items.checkboxState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "toggleMsgReactions",
                isChecked: items.checkboxState1
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "toggleEmojiStatus",
                isChecked: items.emojiStatusState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "toggleAltSB",
                isChecked: items.altSBState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "toggleHideButton",
                isChecked: items.hideButtonState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "toggleCameraPhoto",
                isChecked: items.cameraPhotoState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "toggleMuteStatus",
                isChecked: items.muteCallsState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "toggleRecentGroups",
                isChecked: items.recentGroupsState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "toggleSecretFunctions",
                isChecked: items.secretFuncState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "togglePostReactions",
                isChecked: items.postReactionsState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "toggleHider",
                isChecked: items.hiderState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "addSticker",
                isChecked: items.addstickerState
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "customAccent",
                cAccent: items.customAccent
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "colorPicker",
                cPicker: items.colorPicker
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "colorPickerText",
                cText: items.colorPickerText
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "customLogo",
                cLogo: items.customLogo
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "customHotbar",
                cHotbar: items.customHotbar
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "customBg",
                cBg: items.customBg
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "customFont",
                cFont: items.customFont
            });
            chrome.tabs.sendMessage(activeTabId, {
                type: "nameAva"
            });
        });
    });	
}