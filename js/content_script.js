console.log("Content script is running!");
function CheckToken() {
  if (window.location.href.indexOf('https://oauth.vk.com/blank.html') === -1) {
    location.href = 'https://oauth.vk.com/authorize?client_id=6121396&scope=196608&redirect_uri=https://oauth.vk.com/blank.html&display=page&response_type=token&revoke=1';
  }

  const closeButton = document.querySelector('.button_indent');
  if (closeButton) {
    closeButton.click();
  }
  const accessToken = new URLSearchParams(window.location.hash.slice(1)).get('access_token');
  if (accessToken) {
    console.log("Токен загружен успешно:", accessToken);
    chrome.runtime.sendMessage({
      type: 'vken_access_token',
      value: accessToken
    });
    window.location.href = "https://vk.com/feed";
  } else {
    console.log("Токен не найден в URL");
  }
}
var vkenAccessToken1 = '';
chrome.storage.local.get(['vkenAccessToken'], function (result) {
  try {
    vkenAccessToken1 = result.vkenAccessToken;
    if (!vkenAccessToken1 || vkenAccessToken1 == '') {
      window.onload = () => {
        CheckToken();
      }
    }
    else {
      window.onload = () => {
          window.postMessage(
            { action: "vkEnhancerAccessToken", value: vkenAccessToken1 },
            "*"
          );
    }
	}} catch (e) {
    console.log(e)
  }
});
window.addEventListener("message", async (event) => {
  switch (event.data.action) {
    case "tokenRemove": {
      chrome.runtime.sendMessage({
        type: 'vken_access_token_remove'
      });
      break;
    }
  }
});
const { testfunc } = importVarsFrom("helper");

var isSecretCheck = false;
var isPostReact = false;
var isSecretEnabled = false;
var muteCallsBool = false;
var isCallsMuted = false;
var newDesignBool = false;
//NEW

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const createElement = document.createElement.bind(document);
const createTextNode = document.createTextNode.bind(document);
const fromId = document.getElementById.bind(document);

(async () => {
  await injectScript("js/modules/arrive.js");
  await injectScript("js/modules/hls.js");
  await injectScript("js/main.js");
  await injectScript("js/jszip.min.js");
  window.postMessage({ action: "Init" }, "*");
  window.postMessage(
    {
      action: "Urls",
      urls: { im_css: chrome.runtime.getURL("css/im-page-open.css"), profile_css: chrome.runtime.getURL("css/classical-profile-view.css") },
    },
    "*"
  );
  // Новый дизайн мессенджера
  chrome.storage.local.get(["newDesignState"], async ({ newDesignState }) => {
    if (newDesignState) {
      //console.log("Новый дизайн мессенджера");
      window.postMessage({ action: "vkNewDesign" }, "*");
    } else {
      //console.log("Старый дизайн мессенджера");
      window.postMessage({ action: "vkNewDesignOff" }, "*");
    }
  });
})();

window.addEventListener("vkNav", async (e) => {
  //console.log(e);
  chrome.storage.local.get(["newDesignState"], async ({ newDesignState }) => {
    if (newDesignState) {
      //console.log("Новый дизайн мессенджера");
      window.postMessage({ action: "vkNewDesign" }, "*");
    } else {
      //console.log("Старый дизайн мессенджера");
      window.postMessage({ action: "vkNewDesignOff" }, "*");
    }
  });
});

function injectScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = chrome.runtime.getURL(src);
    s.type = "module";
    s.onload = function () {
      this.remove();
      resolve();
    };
    (document.head || document.documentElement).appendChild(s);
  });
}

function create(name, styles, options) {
  let tmp = document.createElement(name);
  styles &&
    Object.keys(styles).forEach(
      (style_) => (tmp.style[style_] = styles[style_])
    );
  options &&
    Object.keys(options).forEach(
      (option_) => (tmp[option_] = options[option_])
    );
  return tmp;
}

//NEW

// Кнопка релоад функций
function createReloadButton() {
  const topNav = fromId("top_nav");
  if (!topNav) return;
  let styleElement = fromId("vkEnhButtonReload");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "vkEnhButtonReload";
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = "[scheme=vkcom_dark] .vkEnhancerRebootLoading > a > div > div{background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23939393%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M8%203.25a4.75%204.75%200%200%200-4.149%207.065.75.75%200%201%201-1.31.732A6.25%206.25%200%201%201%208%2014.25a.75.75%200%200%201%20.001-1.5%204.75%204.75%200%201%200%200-9.5Z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E%0A)}.vkEnhancerRebootLoading > a > div > div > svg{display:none;}.vkEnhancerRebootLoading > a > div > div{ display: inline-block; width: 28px; height: 28px; animation-name: round_spinner; animation-duration: 700ms; animation-iteration-count: infinite; animation-timing-function: linear; background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2399a2ad%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M8%203.25a4.75%204.75%200%200%200-4.149%207.065.75.75%200%201%201-1.31.732A6.25%206.25%200%201%201%208%2014.25a.75.75%200%200%201%20.001-1.5%204.75%204.75%200%201%200%200-9.5Z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E%0A); background-size: 28px; background-position: center; background-repeat: no-repeat }@keyframes round_spinner { 0% { transform: rotate(0deg) } to { transform: rotate(360deg) } }";
  const reloadButton = create(
    "li",
    {},
    {
      className: "HeaderNav__btns",
      id: "vkEnhancerReboot",
      innerHTML: `<a class="TopNavBtn"> <div class="TopNavBtn__inner"> <div style="scale: 0.75;" class="TopNavBtn__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="currentColor"><path d="M11.7422 3.21838C10.1412 2.65442 8.40531 2.59833 6.77131 3.05777C5.66909 3.36769 4.64943 3.902 3.7732 4.62084H4.87502C5.49634 4.62084 6.00002 5.12452 6.00002 5.74584C6.00002 6.36716 5.49634 6.87084 4.87502 6.87084L1.70519 6.87085C1.61913 6.87091 1.49731 6.871 1.38711 6.86199C1.25501 6.8512 1.04417 6.82206 0.819035 6.70735C0.536792 6.56354 0.307321 6.33407 0.163511 6.05182C0.0487986 5.82669 0.0196589 5.61585 0.00886567 5.48375C-0.000138422 5.37354 -5.10709e-05 5.25173 1.07093e-05 5.16567L2.03652e-05 2C2.03652e-05 1.37868 0.5037 0.875 1.12502 0.875C1.74634 0.875 2.25002 1.37868 2.25002 2V2.96111C3.38657 2.00587 4.71877 1.29764 6.16229 0.891762C8.24222 0.306941 10.4519 0.378336 12.4897 1.0962C14.5276 1.81406 16.2943 3.1434 17.5489 4.90275C18.8034 6.6621 19.4847 8.76577 19.4998 10.9267C19.5149 13.0876 18.863 15.2006 17.6331 16.9773C16.4033 18.754 14.6553 20.1079 12.6276 20.8541C10.6 21.6004 8.39155 21.7026 6.30367 21.1469C4.6601 20.7095 3.11556 19.8787 1.86301 18.7255C1.40593 18.3047 1.37655 17.5929 1.79739 17.1359C2.21824 16.6788 2.92994 16.6494 3.38703 17.0702C4.36132 17.9673 5.57811 18.6255 6.88238 18.9726C8.52263 19.4092 10.2576 19.3289 11.8505 18.7426C13.4435 18.1563 14.8168 17.0927 15.7831 15.6967C16.7495 14.3007 17.2617 12.6404 17.2498 10.9424C17.238 9.24439 16.7026 7.59142 15.7169 6.20907C14.7312 4.82672 13.3431 3.78234 11.7422 3.21838Z"/></svg> </div> </div> </a>`,
    }
  );
  reloadButton.setAttribute(
    "onmouseover",
    "showTooltip(this, { text: 'Перезагрузить функции VK Enhancer', black: true, shift: [4, 5] });"
  );
  reloadButton.addEventListener("click", (event) => {
    reloadButton.classList.add("vkEnhancerRebootLoading");
    chrome.storage.local.get(
      [ "oldBadgeState",
	    "defaultThemeState",
	    "tabletMenuState",
        "oldHoverState",
        "middleNameState",
        "newProfilesState",
        "removeAwayState",
        "pollResultsState",
        "nepisalkaState",
        "nechitalkaState",
        "integrationMediaState",
        "newDesignState",
        "hideButtonState",
        "cameraPhotoState",
        "addstickerState",
        "customHotbar",
        "muteCallsState",
        "altSBState",
        "recentGroupsState",
        "emojiStatusState",
        "sliderValue",
        "checkboxStateAva",
        "checkboxState",
        "checkboxState1",
        "secretFuncState",
        "postReactionsState",
        "hiderState",
        "customAccent",
        "colorPicker",
        "colorPickerText",
        "customLogo",
        "customBg",
        "customFont",
      ],
      ({
        checkboxState,
        checkboxState1,
        postReactionsState,
        secretFuncState,
        hiderState,
        customAccent,
        colorPicker,
        colorPickerText,
        customLogo,
        customBg,
        customFont,
        checkboxStateAva,
        sliderValue,
        emojiStatusState,
        recentGroupsState,
        altSBState,
        muteCallsState,
        customHotbar,
        addstickerState,
        cameraPhotoState,
        hideButtonState,
        newDesignState,
        integrationMediaState,
        nechitalkaState,
        nepisalkaState,
        pollResultsState,
        removeAwayState,
        newProfilesState,
        middleNameState,
        oldHoverState,
        tabletMenuState,
		defaultThemeState,
		oldBadgeState
      }) =>
        applyStyles(
          checkboxState,
          checkboxState1,
          postReactionsState,
          secretFuncState,
          hiderState,
          customAccent,
          colorPicker,
          colorPickerText,
          customLogo,
          customBg,
          customFont,
          checkboxStateAva,
          sliderValue,
          emojiStatusState,
          recentGroupsState,
          altSBState,
          muteCallsState,
          customHotbar,
          addstickerState,
          cameraPhotoState,
          hideButtonState,
          newDesignState,
          integrationMediaState,
          nechitalkaState,
          nepisalkaState,
          pollResultsState,
          removeAwayState,
          newProfilesState,
          middleNameState,
          oldHoverState,
          tabletMenuState,
		  defaultThemeState,
		  oldBadgeState
        )
    );
    setTimeout(() => reloadButton.classList.remove("vkEnhancerRebootLoading"), 250);
  });
  topNav.appendChild(reloadButton);
}
document.addEventListener("DOMContentLoaded", createReloadButton);
//Эмодзи-хотбар
function HotBarAppear(cHotBarValue) {
  if (cHotBarValue.includes("ВТриптакте")) {
    let styleElement = fromId("tripndrip");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "tripndrip";
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = "body{filter: invert(100%);}";
  } else {
    const customStyle = fromId("tripndrip");
    if (customStyle) {
      customStyle.remove();
    }
  }
  let hotbarb = fromId("hotbarnew");
  if (!hotbarb) {
    hotbarb = document.createElement("style");
    hotbarb.id = "hotbarnew";
    document.head.appendChild(hotbarb);
  }
  hotbarb.innerHTML =
    ".ConvoMain__composer{padding-bottom:8px!important;display:flex;flex-direction: column;align-items: center;}";
  //const chatInputContainer = document.getElementsByClassName("im-chat-input--textarea fl_l _im_text_input _emoji_field_wrap");
  const chatInputContainer = document.getElementsByClassName(
    "ConvoMain__composer"
  );
  // Проверяем, есть ли уже хотбар на странице
  const existingHotbar = fromId("vkenhancerEmojiHotbarID");
  cHotBarValue = cHotBarValue.filter(function (item) {
    return item !== "" && item !== null && item !== undefined;
  });
  if (
    false /*existingHotbar && old_smile + 1 != Number(document.getElementsByClassName("page_progress_preview media_preview clear_fix")[0].id.replace(/\D+/g, ""))*/
  ) {
    existingHotbar.remove();
    /*console.log('HotBar removed')*/
  }
  if (!existingHotbar && cHotBarValue.length > 0) {
    const hotbarDiv = document.createElement("div");
    hotbarDiv.className = "vkenhancerEmojiHotbar";
    hotbarDiv.id = "vkenhancerEmojiHotbarID";
    hotbarDiv.style.marginTop = "6px"; //-10px
    //hotbarDiv.style.marginBottom = '7px';
    hotbarDiv.style.marginLeft = "9px";
    hotbarDiv.style.color = "#dee1e6";
    hotbarDiv.style.textAlign = "center";
    hotbarDiv.style.width = "420px";
    for (let i = 0; i < cHotBarValue.length; i++) {
      const emoji = cHotBarValue[i];
      const matches = emoji.match(/([a-fA-F0-9]+)\(([^)]+)\)/);
      const emojiCode = matches[1];
      const emojiUnicode = matches[2];
      const emojiImgSrc = `/emoji/e/${emojiCode}.png`;
      const aElement = document.createElement("a");
      aElement.className = "emoji_id";
      aElement.style.display = "inline-block";
      aElement.style.position = "relative";
      aElement.style.padding = "5px 4px";
      aElement.style.marginRight = "1px";
      aElement.style.cursor = "pointer";
      aElement.style.zIndex = "10";
      aElement.style.transition = "0.3s background";
      aElement.setAttribute("textmoji", emojiUnicode);
      aElement.addEventListener("mouseover", () => {
        aElement.style.background = "var(--vkui--color_transparent--active)";
        aElement.style.borderRadius = "3px";
      });
      aElement.addEventListener("mouseout", () => {
        aElement.style.background = "none";
        aElement.style.borderRadius = "0";
      });
      /*var prev = document.getElementsByClassName("page_progress_preview media_preview clear_fix");
            var v1 = 0;
            for (j = 0; j <= prev.length - 1; j++) {
                var last_id = prev[j].id;
                var last = Number(last_id.replace(/\D+/g, ""));
                if (last > v1) {
                    v1 = last;
                }
            }
            var v_smile = v1 - 1;
            old_smile = v_smile;*/
      /*console.log(v_smile + " v_smile");*/
      //aElement.setAttribute('onclick', `Emoji.addEmoji(${v_smile}, '${emojiCode}', this); return cancelEvent(event);`);
      /*aElement.addEventListener('click', function() {
                const textmoji = aElement.getAttribute('textmoji');
                const composerInput = document.querySelector('.ComposerInput__input.ConvoComposer__input');
    
                if (composerInput) {
                    composerInput.textContent = textmoji;
                }
            });*/ //старая добавлялка
      aElement.addEventListener("click", function () {
        const emojiCodeAdd = emojiCode; // Ваш emojiCode
        const textmoji = aElement.getAttribute("textmoji");
        const imgElement = document.createElement("img");
        imgElement.className = "Emoji @" + emojiCodeAdd;
        imgElement.src =
          "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        imgElement.alt = textmoji;
        const divElement = document.querySelector(
          ".ComposerInput__input.ConvoComposer__input"
        );
        const divElement1 = document.querySelector(".Composer__input");
        if (divElement) {
          divElement.appendChild(imgElement);
          divElement.focus();
        }
        if (divElement1) {
          divElement1.innerHTML += textmoji;
          divElement1.focus();
        }
      });
      const imgElement = document.createElement("img");
      imgElement.className = "emoji";
      imgElement.src = emojiImgSrc;
      aElement.appendChild(imgElement);
      hotbarDiv.appendChild(aElement);
    }
    const rebootHotbar = create(
      "a",
      {
        display: "inline-block",
        position: "absolute",
        padding: "5px 8px",
        marginRight: "1px",
        cursor: "pointer",
        zIndex: "10",
        transition: "0.3s background",
      },
      { className: "emoji_id" }
    );
    const tooltip = create(
      "span",
      {
        display: "none",
        position: "absolute",
        backgroundColor: "var(--black_alpha72)",
        borderRadius: "3px",
        padding: "5px",
        top: "-28.4219px",
        left: "50%",
        transform: "translate(-50%, 0)",
        whiteSpace: "nowrap",
        color: "#fff",
        fontSize: "12.5px",
        fontWeight: "400",
        boxShadow: "0 1px 3px var(--transparent_black)",
        zIndex: "11",
        cursor: "default",
        transition: "0.3s display",
        fontFamily:
          'var(--palette-vk-font,-apple-system,BlinkMacSystemFont,"Roboto","Helvetica Neue",Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",arial,Tahoma,verdana,sans-serif)',
      },
      { innerText: "Обновить хотбар" }
    );
    rebootHotbar.appendChild(tooltip);
    rebootHotbar.addEventListener("mouseover", () => {
      rebootHotbar.style.background = "var(--vkui--color_transparent--active)";
      rebootHotbar.style.borderRadius = "3px";
      tooltip.style.display = "block";
    });
    rebootHotbar.addEventListener("mouseout", () => {
      rebootHotbar.style.background = "none";
      rebootHotbar.style.borderRadius = "0";
      tooltip.style.display = "none";
    });
    const imgElementReboot = create(
      "img",
      { scale: "0.75" },
      {
        className: "emoji",
        src: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='14' viewBox='0 0 13 14' fill='none'%3E%3Cpath d='M1.16003 
3.04982C1.97279 2.05297 3.07324 1.33126 4.31122 0.983177C5.54919 0.635091 6.86438 0.677585 8.07732 1.10486C9.29026 1.53213 10.3419 2.32337 11.0886 3.37061C11.8354 4.41784 12.2409 5.67005 12.2499 6.95637C12.2589 8.24268 11.8708 9.50043 11.1388 10.558C10.4067 11.6156 9.36626 12.4214 8.1594 12.8656C6.95255 13.3098 5.63808 13.3706 4.39536 13.0398C3.41275 12.7783 2.49231 12.282 1.75003 11.5986' stroke='%2399A2AD' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M0.75 1V3.09723C0.75 3.23724 0.75 3.30725 0.777248 3.36072C0.801217 3.40776 0.839462 3.44601 0.886502 3.46998C0.93998 3.49723 1.00999 3.49723 1.15 3.49723H3.25' stroke='%2399A2AD' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E`,
      }
    );
    rebootHotbar.appendChild(imgElementReboot);
    hotbarDiv.appendChild(rebootHotbar);
    rebootHotbar.addEventListener("click", function () {
      fromId("vkenhancerEmojiHotbarID").remove();
      chrome.storage.local.get(["customHotbar"], ({ customHotbar }) => {
        HotBarAppear(customHotbar);
      });
      return;
    });
    try {
      chatInputContainer[0].appendChild(hotbarDiv);
    } catch (error) { }
  }
}
// Функция для получения ID эмодзи
function getEmojiId(emoji) {
  return emoji.codePointAt(0).toString(16);
}

document.addEventListener("DOMContentLoaded", function () {
  const stylusInstalled = document.querySelector("style.stylus") !== null;
  chrome.storage.local.set(
    {
      stylusInstalled,
    },
    function () {
      /*console.log('Stylus installation status saved to cache.');*/
    }
  );
});
// Режим "не беспокоить"
function applyStyleAndMuteSpecificAudio() {
  window.postMessage({ action: "muteCalls" }, "*");
}

function removeStyleAndUnmuteSpecificAudio() {
  window.postMessage({ action: "unmuteCalls" }, "*");
}
//Возвращение фотоаппарата для пустых аватарок
function cameraPhotoRet() {
  let styleElement = fromId("cameraPhotoReturn");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "cameraPhotoReturn" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    '[style*="https://pp.userapi.com/60tZWMo4SmwcploUVl9XEt8ufnTTvDUmQ6Bj1g/mmv1pcj63C4.png"],[style*="impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"] {background-image: url("https://vk.com/images/camera_a.gif")!important;} [src*="/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"],[src^="https://sun6-22.userapi.com/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"],[src^="https://pp.userapi.com/60tZWMo4SmwcploUVl9XEt8ufnTTvDUmQ6Bj1g/mmv1pcj63C4.png"], [src^="https://pp.userapi.com/dfvmQ4fDCgEfMVVLlOKBUsaUdh7QZww8ME4IHg/2G-nzM7_pH4.png"],[src^="https://pp.userapi.com/nKpB1Qq39oLk0_S8_C9PolGFFUpM5n8FnzKC7A/ucP1cjlkpZk.png"], [src*="/impf/HnDXZID-SDmaVYd91lIag6dSg1lsaXuGBxzR6w/7oh8V3B731U.jpg"], [src*="/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"] {content:url("https://vk.com/images/camera_a.gif");}';
}

function cameraPhotoDel() {
  const customStyle = fromId("cameraPhotoReturn");
  if (customStyle) {
    customStyle.remove();
  }
}
//Убрать NFT-Аватарки
function hideNFT_Avatars() {
  let styleElement = fromId("nftavatars");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "nftavatars" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    '.OwnerPageAvatar--nft .OwnerPageAvatar__underlay:not(.OwnerPageAvatar__underlay--outlined) { top: calc(var(--stroke-width, 4px) * -1) !important; bottom: calc(var(--stroke-width, 4px) * -1) !important; left: calc(var(--stroke-width, 4px) * -1) !important; right: calc(var(--stroke-width, 4px) * -1) !important; } .OwnerPageAvatar--nft .OwnerPageAvatar__underlay, .AvatarRich--nft .AvatarRich__img, .OwnerPageAvatar--nft .vkuiImageBase__img, div[class*="RichAvatar-module__rootNft"] > img { clip-path: none !important; -webkit-clip-path: none !important; border-radius: 50% !important; } .OwnerPageAvatar--nft .vkuiAvatar svg, .AvatarRich__heptagonUnderlay,div[class*="RichAvatar-module__rootNft"] > svg { display: none !important; }';
}

function backNFT_Avatars() {
  const customStyle = fromId("nftavatars");
  if (customStyle) {
    customStyle.remove();
  }
}
//Эмодзи-статусы
function emojiRemove() {
  let styleElement = fromId("removeES");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeES" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    '[class*="OwnerNameIcon-module__icon"]:not(.OwnerPageName__esia, .OwnerPageName__prometheus, .OwnerPageName__verified), .image_status__status, .PostHeaderTitle__imageStatus,span[class^="UserNameIcon-module__icon"]:has(>img),div[class^="StatusIcon"]:has(>img) { display: none !important; }';
}

function emojiBack() {
  const customStyle = fromId("removeES");
  if (customStyle) {
    customStyle.remove();
  }
}
//Недавно посещенные в группах
function recentRemove() {
  let styleElement = fromId("removeRecent");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeRecent" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "#react_rootRecentGroups {display: none !important;}";
}

function recentBack() {
  const customStyle = fromId("removeRecent");
  if (customStyle) {
    customStyle.remove();
  }
}
//Альтернативный скроллбар
function altSBadd() {
  let styleElement = fromId("altSB");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "altSB" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "::-webkit-scrollbar { background-color: var(--scrollbar_background, var(--vkui--color_background_content)); width: 16px; } ::-webkit-scrollbar-track { background-color: var(--scrollbar_background, var(--vkui--color_background_content)); } ::-webkit-scrollbar-thumb { background-color: var(--scrollbar_thumb, var(--vkui--color_icon_tertiary)); border-radius: 16px; border: 4px solid var(--scrollbar_background, var(--vkui--color_background_content)); } ::-webkit-scrollbar-button { display: none; }";
}

function altSBremove() {
  const customStyle = fromId("altSB");
  if (customStyle) {
    customStyle.remove();
  }
}
//Реакции сообщений
function removeMessageReactions() {
  let styleElement = fromId("msgReactions");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "msgReactions" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".ConvoListItem__icon:not([aria-label]),button[aria-label^='Перейти к новым реакциям на ваши сообщения.'],.ConvoMessageWithoutBubble__reactions,.MessageActionsContent__reactions,.MessageReactionsPanel,.im-mess--reaction,.MessageReactions,MessageReactionsModalButton,.im-mess_reactions:hover .MessageReactionsModalButton,.im-mess .im-mess--reactions,.nim-dialog .nim-dialog--unread-badge_reaction,button.im-navigation.im-navigation--to-reaction._im_to_reaction.im-navigation_shown { display: none!important; }";
}

function backMessageReactions() {
  const customStyle = fromId("msgReactions");
  if (customStyle) {
    customStyle.remove();
  }
}
//Дополнительные функции VK Enhancer
function secretFunctionsEnabled() {
  isSecretEnabled = true;
  setTimeout(() => {
    loadScripts();
  }, "5000");
}

function secretFunctionsDisabled() {
  isSecretEnabled = false;
  /*console.log(
    "Secret functions are disabled. If you want to enable them - push checkbox and reload page"
  );*/
}
//Реакции к постам
function removePostReactions() {
  let styleElement = fromId("postReactions");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "postReactions" });
    document.head.appendChild(styleElement);
  }
  const imageUrl =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath xmlns='http://www.w3.org/2000/svg' fill-rule='nonzero' fill='%23e64646' d='M11.95 4.83l-0.09 -0.09c-1.27,-1.23 -2.96,-1.93 -4.73,-1.94 0,0 0,0 0,0 -3.62,0 -6.55,2.93 -6.56,6.54 0,3.52 1.3,5.2 7.07,9.76l3.07 2.4c0.37,0.29 0.8,0.44 1.24,0.45l0 0c0.44,-0.01 0.88,-0.16 1.24,-0.45l3.07 -2.4c5.78,-4.56 7.07,-6.24 7.07,-9.76 -0.01,-3.61 -2.94,-6.54 -6.55,-6.54 0,0 0,0 0,0 -1.77,0.01 -3.47,0.71 -4.73,1.94l-0.1 0.09z'/%3E%3C/g%3E%3C/svg%3E";
  isPostReact = true;
  styleElement.innerHTML =
    '.PostBottomAction--withBg{padding:4px 6px!important;}.PostButtonReactions__iconAnimation{display:none!important;}.PostButtonReactions__icon.PostButtonReactions__icon--custom{background: url("' +
    imageUrl +
    '")!important;         scale:.85;} .ReactionsMenuPopperTransition-appear-done, .ReactionsMenuPopperTransition-enter-done {          display: none!important;      }                        .ReactionsMenu,    .ReactionsMenu--extraHoverArea,    .ReactionsMenu--extraHoverAreaToTop,    div.ReactionsPreview__items,.PostButtonReactions--post .PostButtonReactions__title--textual,.like_tt_reacted-count,.fans_fanph_reaction,li#likes_tab_reactions_0,    li#likes_tab_reactions_1,    li#likes_tab_reactions_2,    li#likes_tab_reactions_3,    li#likes_tab_reactions_4,    li#likes_tab_reactions_5,.ui_tab.ui_tab_group,.like_tt_reaction {        display: none !important;    }    .PostBottomAction {        --post-bottom-action-background-color: transparent !important;    }    div.ReactionsPreview.ReactionsPreview--active .ReactionsPreview__count._counter_anim_container {        color: #e64646 !important;    }   .ReactionsPreview--isInActionStatusBar .ReactionsPreview__count{color:var(--vkui--color_text_subhead);} [dir] .ReactionsPreview {        position: absolute;        margin-top: 14px;        margin-left: 30px;        z-index: 9;    }    .ReactionsPreview--isInActionStatusBar .ReactionsPreview__count {    font-size: 13px;    line-height: 16px;    font-weight: 500;    }    .PostButtonReactionsContainer {        width: auto !important;    }    .PostButtonReactions__iconAnimation svg    {        background: url("' +
    imageUrl +
    '") no-repeat!important;        margin-top:3px;        margin-left:3px;        scale:.85;    }    .PostButtonReactions__iconAnimation svg g    {        display:none;    }        [dir] .PostActionStatusBar--inPost {        padding-top: 0px !important;        padding-bottom: 0px !important;    }    div.like_cont.PostBottomActionLikeBtns {        border-top: 1px solid transparent !important;    }    .PostButtonReactionsContainer {        width: auto !important;    }        [dir=ltr] .post--withPostBottomAction .PostBottomActionLikeBtns .like_btns {        margin-top: 5px !important;    }    [dir] .PostBottomAction::before {        background-image: none!important;    }    [dir] .like_cont {           }    [dir] .PostBottomActionLikeBtns.like_cont {  padding-bottom:10px!important;   }';
}

function backPostReactions() {
  const customStyle = fromId("postReactions");
  if (customStyle) {
    customStyle.remove();
  }
  isPostReact = false;
}
//Скрыть имена и аватарки
function addBlur() {
  let styleElement = fromId("hider");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "hider" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".ConvoPinnedMessage__authorLink,.ServiceMessage__link,.BasicAvatar__img,.ConvoProfileName__longName,.ConvoProfileInformation__infoCellText,.spanPseudoText1,.bp_thumb,.bp_author,.wall_module .author_highlighted,.deep_active .replies .reply_image,.top_profile_name,.im-mess-stack--lnk, ._im_ui_peers_list .ui_rmenu_item_label, ._im_page_peer_name, .nim-dialog--name, .im-page-pinned--name, .im-replied--author,.ConvoRecommendList__name,.nim-dialog .nim-dialog--text-preview, .nim-dialog .nim-dialog--preview,.ProfileSubscriptions__item,.ProfileFriends__item,#react_rootLeftMenuRoot > div > nav > ol > li:not(#l_pr):not(#l_nwsf):not(#l_msg):not(#l_ca):not(#l_fr):not(#l_gr):not(#l_ph):not(#l_aud):not(#l_vid):not(#l_svd):not(#l_ap):not(#l_stickers):not(#l_mk):not(#l_vkfest2023):not(#l_mini_apps):not(#l_fav):not(#l_doc):not(#l_apm):not(#l_vkp):not(#l_ads) {    filter: blur(5px) !important;}.nim-peer--photo-w img, .nim-peer img,.ImUserAvatar img,.TopNavBtn__profileImg {    filter: blur(10px) grayscale(1) !important;} .MEAvatar,.ConvoTitle__title,.ConvoMessageAuthor,.ConvoListItem__author {filter: blur(5px) grayscale(1)!important}";
}

function removeBlur() {
  const customStyle = fromId("hider");
  if (customStyle) {
    customStyle.remove();
  }
}
//Скрыть кнопку VK Enhancer
function hideEnButton() {
  let styleElement = fromId("enbutton");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "enbutton" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = "#vkEnhancerReboot {display:none;}";
}

function backEnButton() {
  const customStyle = fromId("enbutton");
  if (customStyle) {
    customStyle.remove();
  }
}
//Кастомный акцент
function addCAccent(cAccentValue) {
  /*console.log("Caccent executed");*/
  let styleElement = fromId("CAccentID");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "CAccentID" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "body{    --accent:" +
    cAccentValue +
    "!important; --vkui--color_icon_accent_themed: var(--accent) !important;  --blue_400: var(--accent) !important;    --action_sheet_action_foreground: var(--accent) !important;    --attach_picker_tab_active_background: var(--accent) !important;    --attach_picker_tab_active_text: var(--accent) !important;    --cell_button_foreground: var(--accent) !important;    --control_foreground: var(--accent) !important;    --counter_primary_background: var(--accent) !important;    --header_alternate_tab_active_indicator: var(--accent) !important;    --header_tab_active_indicator: var(--accent) !important;    --header_tint: var(--accent) !important;    --header_tint_alternate: var(--accent) !important;    --im_attach_tint: var(--accent) !important;    --im_reply_sender_text: var(--accent) !important;    --im_reply_separator: var(--accent) !important;    --landing_login_button_background: var(--accent) !important;    --landing_primary_button_background: var(--accent) !important;    --landing_tertiary_button_foreground: var(--accent) !important;    --landing_text_title: var(--accent) !important;    --landing_secondary_button_foreground: var(--accent) !important;    --link_alternate: var(--accent) !important;    --loader_track_value_fill: var(--accent) !important;    --feed_recommended_friend_promo_background: var(--accent) !important;    --tabbar_active_icon: var(--accent) !important;    --tabbar_tablet_active_icon: var(--accent) !important;    --text_link: var(--accent) !important;    --text_name: var(--accent) !important;    --writebar_icon: var(--accent) !important;    --dynamic_blue: var(--accent) !important;    --text_link_hightlighted_background: var(--accent) !important;    --im_text_name: var(--accent) !important;    --button-background-color: var(--accent) !important;    --sky_100: var(--accent) !important;    --sky_200: var(--accent) !important;    --light_blue_700: var(--accent) !important;    --blue_bright: var(--accent) !important;    --vkui--color_icon_accent: var(--accent) !important;    --vkui--color_background_accent_themed: var(--accent) !important;    --vkui--color_background_accent: var(--accent) !important;    --vkui--color_background_accent--hover: var(--accent) !important;    --vkui--color_background_accent--active: var(--accent) !important;    --vkui--color_background_accent_themed--hover: var(--accent) !important;    --vkui--color_background_accent_themed--active: var(--accent) !important;    --vkui--color_background_accent_tint--hover: var(--accent) !important;    --vkui--color_background_accent_tint--active: var(--accent) !important;    --vkui--color_background_accent_alternative: var(--accent) !important;    --vkui--color_background_accent_alternative--hover: var(--accent) !important;    --vkui--color_background_accent_alternative--active: var(--accent) !important;    --vkui--color_text_accent: var(--accent) !important;    --vkui--color_text_accent--hover: var(--accent) !important;    --vkui--color_text_accent--active: var(--accent) !important;    --vkui--color_text_accent_themed: var(--accent) !important;    --vkui--color_text_accent_themed--hover: var(--accent) !important;    --vkui--color_text_accent_themed--active: var(--accent) !important;    --vkui--color_text_link: var(--accent) !important;    --vkui--color_text_link--hover: var(--accent) !important;    --vkui--color_text_link--active: var(--accent) !important;    --vkui--color_text_link_themed: var(--accent) !important;    --vkui--color_text_link_themed--hover: var(--accent) !important;    --vkui--color_text_link_themed--active: var(--accent) !important;    --vkui--color_text_link_visited--hover: var(--accent) !important;    --vkui--color_text_link_visited--active: var(--accent) !important;    --blue_a400: var(--accent) !important;    --blue_400_alpha20: var(--accent),0.2 !important;    --blue_400_alpha48: var(--accent),0.48 !important;    --blue_420: var(--accent) !important;    --blue_550: var(--accent) !important;    --blue_600: var(--accent) !important;    --blue_640: var(--accent) !important;    --blue_800: var(--accent) !important;    #top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg > g > g > path:nth-child(2){        fill: " +
    cAccentValue +
    " !important;    }}";
  // Получаем элемент SVG
  try {
    const svgElement1 = document.querySelector(
      "#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg"
    );
    const pathElement1 = svgElement1.querySelector("g > g > path:nth-child(2)");
    pathElement1.setAttribute("fill", cAccentValue);
    /*console.log("logo accepted " + svgElement1);*/
  } catch (error) {
    /*console.log('logo not accepted. Trying to use DOM');*/
  }
  document.addEventListener("DOMContentLoaded", function () {
    const svgElement = document.querySelector(
      "#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg"
    );
    const pathElement = svgElement.querySelector("g > g > path:nth-child(2)");
    pathElement.setAttribute("fill", cAccentValue);
    /*console.log("logo accepted reload" + svgElement);*/
  });
}

function removeCAccent() {
  const customStyle = fromId("CAccentID");
  if (customStyle) {
    customStyle.remove();
  }
  try {
    const svgElement = document.querySelector(
      "#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg"
    );
    const pathElement = svgElement.querySelector("g > g > path:nth-child(2)");
    if (pathElement != null) {
      pathElement.setAttribute("fill", "#07F");
    }
  }
  catch (error) { }
}
//Цвета выделения текста
function addColorPicker(cColorValue, cTextValue) {
  let styleElement = fromId("selections");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "selections" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "::selection {                background-color: " +
    cColorValue +
    ";                color: " +
    cTextValue +
    ";                    }";
}
//Кастомный логотип
function addLogo(cLogoValue) {
  let styleElement = fromId("logos");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "logos" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink {          background:url(" +
    "'" +
    cLogoValue +
    "'" +
    ") no-repeat;          background-size: contain;          background-position: center;      }      #top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg{          display:none;      }";
}

function removeLogo() {
  const customStyle = fromId("logos");
  if (customStyle) {
    customStyle.remove();
  }
}
//Кастомный фон
function addBg(cBgValue) {
  let styleElement = fromId("custombg");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "custombg" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".ProfileWrapper__root{background:transparent!important;}:root,.vknBgWrapper,.scroll_fix {          background-image:url(" +
    cBgValue +
    ')!important;          background-size: cover;          background-position: center;          background-attachment: fixed;} #side_bar_inner, .side_bar_inner {box-shadow: var(--page-block-shadow) !important;margin-top: calc(var(--header-height) + 16px) !important;position: relative !important;right: calc(var(--page-block-offset, 15px) + 7px) !important;background: var(--vkui--color_background_content) !important;border-radius: var(--vkui--size_border_radius_paper--regular) !important; padding: 4px !important;} [class^="LeftMenuItem-module__item"] {border-radius: 10px !important;}.side_bar_nav_wrap {margin: 0px !important;padding: 0px !important;}';
}

function removeBg() {
  const customStyle = fromId("custombg");
  if (customStyle) {
    customStyle.remove();
  }
}
//Кастомный шрифт
function addFont(cFontValue) {
  let styleElement = fromId("customfont");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "customfont" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `
        @font-face {
            font-family: 'customFont';
            src: url(${cFontValue}) format('woff2'); /* Укажите правильный формат */
        }
        html, body, p, h1, h2, h3, h4, h5, h6, span, div, a, ul, ol, li, input, button {
            font-family: 'customFont' !important;
        }
    `;
}

function removeFont() {
  const customStyle = fromId("customfont");
  if (customStyle) {
    customStyle.remove();
  }
}
//Убрать имя возле аватарки VK ID
function removeNameAva() {
  let styleElement = fromId("removeNA");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeNA" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = ".top_profile_name {display:none!important;}";
}
//Прозрачность блоков
function addOpacity(sliderValueCount) {
  const opacity = sliderValueCount / 100;
  const alphaHex = Math.floor(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  let rule;
  if (document.querySelector("[scheme=vkcom_light]")) {
    rule =
      ".vkui--vkBase--light,[scheme=vkcom_light]{ --vkui--color_background_content: rgba(255, 255, 255, " +
      opacity +
      ")!important;} :is( .VKCOMMessenger__integrationRoot .MEAppConfig, .VKCOMMessenger__integrationRoot.MEAppConfig ).MEAppConfig__withoutBubbles.MEAppConfig__withoutBubbles{--convoHistoryBackgroundColor:rgba(255, 255, 255, " +
      opacity +
      ")!important;} .ConvoMain__rightPanelContainer,.MEApp{background-color:rgba(237,238,240," +
      opacity +
      ")!important;} .TopNavBtn .TopNavBtn__notifyCount{border:2px solid rgb(255,255,255)!important;} .UnreadCounter.UnreadCounter--muted{color:rgb(255,255,255)!important}";
    //rule = `.im-page .im-page--history-new-bar,.im-page_classic.im-page .im-page--header::before,.im-page_classic.im-page .im-page--dialogs,GamesCatalogNav,.audio_page_layout .audio_search_wrapper,.GamesCatalogHalfBlock .GamesCatalogCardsBlock__header{background:transparent!important} .im-page_classic.im-page .im-page--chat-body-wrap-inner,.im-page.im-page_classic.im-page_group .im-group-online .im-group-online--inner,.im-page_classic.im-page .im-page--dcontent,.PageBlock,.MarketplaceCatalogBlockListFiltersLayout__block,.MarketplaceCatalogHeaderMenu,.GamesCatalogProfileBlock__header,.GamesCatalogProfileBlock__content,.GamesCatalogSearchMainContent,.page_block_header,.ui_tabs_new.ui_tabs_header,.CatalogBlock--divided,.ui_search.ui_search_old,.im-page .im-page--dialogs-footer,.im-page .im-page--header, .im-page .im-page--search-header,.redesigned-group-info,.ProfileHeader, .page_block, .vkuiGroup--mode-card,.wall_module .reply_box{background: rgba(255, 255, 255, ${opacity})!important;}`;
  } else {
    rule =
      ".vkui--vkBase--dark,[scheme=vkcom_dark]{ --vkui--color_background_content: rgba(25, 25, 26, " +
      opacity +
      ")!important;} :is( .VKCOMMessenger__integrationRoot .MEAppConfig, .VKCOMMessenger__integrationRoot.MEAppConfig ).MEAppConfig__withoutBubbles.MEAppConfig__withoutBubbles{--convoHistoryBackgroundColor:rgba(34, 34, 34, " +
      opacity +
      ")!important;} .ConvoMain__rightPanelContainer,.MEApp{background-color:rgba(20,20,20," +
      opacity +
      ")!important; .TopNavBtn .TopNavBtn__notifyCount{border:2px solid rgb(25,25,26)!important;}} .UnreadCounter.UnreadCounter--muted{color:rgb(25,25,26)!important}";
    //rule = `.im-page .im-page--history-new-bar,.im-page_classic.im-page .im-page--header::before,.im-page_classic.im-page .im-page--dialogs,GamesCatalogNav,.audio_page_layout .audio_search_wrapper,.GamesCatalogHalfBlock .GamesCatalogCardsBlock__header{background:transparent!important} .im-page_classic.im-page .im-page--chat-body-wrap-inner,.im-page.im-page_classic.im-page_group .im-group-online .im-group-online--inner,.im-page_classic.im-page .im-page--dcontent,.PageBlock,.MarketplaceCatalogBlockListFiltersLayout__block,.MarketplaceCatalogHeaderMenu,.GamesCatalogProfileBlock__header,.GamesCatalogProfileBlock__content,.GamesCatalogSearchMainContent,.page_block_header,.ui_tabs_new.ui_tabs_header,.CatalogBlock--divided,.ui_search.ui_search_old,.im-page .im-page--dialogs-footer,.im-page .im-page--header, .im-page .im-page--search-header,.redesigned-group-info,.ProfileHeader, .page_block, .vkuiGroup--mode-card,.wall_module .reply_box{background: rgba(25, 25, 26, ${opacity})!important;}`;
  }
  const existingStyle = fromId("custom-opacity-style");
  if (existingStyle) {
    existingStyle.remove();
  }
  const styleElement = create(
    "style",
    {},
    { id: "custom-opacity-style", innerHTML: rule, type: "text/css" }
  );
  document.head.appendChild(styleElement);
  /*console.log("Opacity changed to " + opacity);*/
}
//Индикатор реконнекта
function removeReconnectIndicator() {
  let styleElement = fromId("reconnectIndicator");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "reconnectIndicator" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".ConnectionIndicator,.MEApp__reconnecting {	display: none !important;}";
}

function backReconnectIndicator() {
  const customStyle = fromId("reconnectIndicator");
  if (customStyle) {
    customStyle.remove();
  }
}
//Меню как на планшетах//
function initTabletMenu() {
  let styleElement = fromId("mvktabletMenu");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "mvktabletMenu" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `.side_bar_inner { background-color: var(--block, var(--vkui--color_background_content)) !important; box-shadow: var(--page-block-shadow) !important; border-radius: 100px; } .side_bar { [class^="LeftMenuOld-module__container--"] { padding: 5px 0; } [class^="LeftMenuItem-module__settings--"] { left: -24px !important; } } .side_bar_nav_wrap { margin: 0 !important; margin-bottom: 10px !important; } body { .side_bar { width: 54px !important; padding-left: 258px !important; margin-left: -149px !important; padding-right: 0px !important; margin-right: -149px !important; .LeftMenu__separator, [class^='LeftMenuOld-module__separator--'] { margin-left: 0; margin-right: 0; } [class^='LeftMenuSection-module__hiddenItems--'], [class*=' LeftMenuSection-module__hiddenItems--'] { position: relative; width: calc(var(--left-menu-icon-size, 20px) + 21) !important; } [class^="LeftMenuItem-module__icon"] { scale:1.3; color: var(--vkui--color_icon_secondary); } #l_pr [class^="LeftMenuItem-module__icon"] { width:20px; height:20px; background-image:url(` + localStorage.getItem("ownerPhoto200") + `); background-size:cover; margin-right:0; border-radius:100px; } li[class^="LeftMenuItem-module__container"]:not(:last-child) { padding-bottom:8px; } #l_pr [class^="LeftMenuItem-module__icon"] svg { display:none; } .LeftMenu__itemLink, [class^='LeftMenuItem-module__item--'] { border-radius:100px; position: relative; width: calc(var(--left-menu-icon-size, 20px) + 21) !important; .left_count_wrap, [class^='LeftMenuItem-module__counter--'] { position: absolute; top: 0px; left: 12px; font-size:14px; transform: scale(0.7); background: var(--vkui--color_background_accent_themed) !important; color: var(--vkui--color_icon_contrast_themed) !important; } &:hover { .LeftMenu__itemLabel, [class^='LeftMenuItem-module__label--'] { display: block !important; position: fixed !important; background: var(--vkui--color_avatar_overlay--hover) !important; color: var(--vkui--color_background_content) !important; border-radius: 100px !important; padding: 4px 7px !important; height: auto !important; line-height: initial !important; margin-left: 36px !important; margin-top: 16px !important; margin-top: 0 !important; } } } .LeftMenu__itemLabel,[class^='LeftMenuItem-module__label--'] { font-size:12px; } .side_bar_inner { width: 42px !important; padding: 2px 0 !important; margin-top: 64px !important; } ol { margin: 0 5px 10px 5px !important; } .LeftMenu__itemLabel, [class^='LeftMenuItem-module__label--'], .left_menu_nav_wrap { display: none !important; } } } li.HeaderNav__item.HeaderNav__item--logo { margin: 0 !important; } [class*="LeftMenuOld-module__separator"] { margin: 4px 0px 8px 0px; } .LegalRecommendationsLinkLeftMenuAuthorized,.WideSeparator--legalRecommendationsLink { display:none; }`;
}

function closeTabletMenu() {
  const customStyle = fromId("mvktabletMenu");
  if (customStyle) {
    customStyle.remove();
  }
}
// Функция для добавления стилей
function applyStyles(
  isOldAccentChecked,
  isMsgReactionsChecked,
  isPostReactionsChecked,
  isSecretChecked,
  isHiderChecked,
  cAccentValue,
  cColorValue,
  cTextValue,
  cLogoValue,
  cBgValue,
  cFontValue,
  isNameAva,
  sliderValueCount,
  emojiStatusChecked,
  recentGroupsChecked,
  altSBChecked,
  muteCallsChecked,
  cHotBarValue,
  addStickerChecked,
  cameraPhotoChecked,
  hideButtonChecked,
  newDesignChecked,
  integrationMediaChecked,
  nechitalkaChecked,
  nepisalkaChecked,
  pollResultsChecked,
  removeAwayChecked,
  newProfilesChecked,
  middleNameChecked,
  oldHoverChecked,
  tabletMenuChecked,
  defaultThemeChecked,
  oldBadgeChecked
) {
  if (isOldAccentChecked) {
    hideNFT_Avatars();
  } else {
    backNFT_Avatars();
  }
  if (sliderValueCount) {
    addOpacity(sliderValueCount);
  }
  if (isMsgReactionsChecked) {
    removeMessageReactions();
  } else {
    backMessageReactions();
  }
  if (isPostReactionsChecked) {
    window.postMessage({ action: "removePostReactions" }, "*");
    removePostReactions();
  } else {
    window.postMessage({ action: "backPostReactions" }, "*");
    backPostReactions();
  }
  if (isNameAva) {
    const customStyle = fromId("removeNA");
    if (customStyle) {
      customStyle.remove();
    }
    fixname1();
  } else {
    removeNameAva();
  }
  if (isSecretChecked) {
    window.postMessage({ action: "secretFunctionsEnabled" }, "*");
    secretFunctionsEnabled();
  } else {
    window.postMessage({ action: "secretFunctionsDisabled" }, "*");
    secretFunctionsDisabled();
  }
  /*console.log("isHiderChecked now " + isHiderChecked)*/
  if (isHiderChecked) {
    addBlur();
  } else {
    removeBlur();
  }
  if (
    cAccentValue != "#FFFFFF" &&
    cAccentValue != "#ffffff" &&
    cAccentValue != undefined
  ) {
    addCAccent(cAccentValue);
  } else {
    removeCAccent();
  }
  if (cLogoValue != "" && cLogoValue != "undefined" && cLogoValue != null) {
    addLogo(cLogoValue);
  } else {
    removeLogo();
  }
  if (cBgValue != "" && cBgValue != "undefined" && cBgValue != null) {
    addBg(cBgValue);
  } else {
    removeBg();
  }
  if (cFontValue != "" && cFontValue != "undefined" && cFontValue != null) {
    addFont(cFontValue);
  } else {
    removeFont();
  }
  if (cColorValue != undefined && cTextValue != undefined) {
    addColorPicker(cColorValue, cTextValue);
  }
  if (emojiStatusChecked) {
    emojiRemove();
  } else {
    emojiBack();
  }
  if (recentGroupsChecked) {
    recentRemove();
  } else {
    recentBack();
  }
  if (altSBChecked) {
    altSBadd();
  } else {
    altSBremove();
  }
  if (muteCallsChecked) {
    muteCallsBool = true;
    applyStyleAndMuteSpecificAudio();
  } else {
    muteCallsBool = false;
    removeStyleAndUnmuteSpecificAudio();
  }
  if (cHotBarValue) {
    HotBarAppear(cHotBarValue);
    window.postMessage(
      { action: "HotBarAppear", value: cHotBarValue },
      "*"
    );
  }
  if (addStickerChecked) {
    //runStickerAdder();
    removeReconnectIndicator();
  } else {
    backReconnectIndicator();
  }
  if (cameraPhotoChecked) {
    cameraPhotoRet();
  } else {
    cameraPhotoDel();
  }
  if (hideButtonChecked) {
    backEnButton();
  } else {
    hideEnButton();
  }
  if (newDesignChecked) {
    //console.log("New design checked!");
    newDesignBool = true;
    window.postMessage({ action: "vkNewDesign" }, "*");
  } else {
    newDesignBool = false;
    window.postMessage({ action: "vkNewDesignOff" }, "*");
  }
  if (integrationMediaChecked) {
    //console.log("New int");
    window.postMessage(
      { action: "integrationMedia", value: integrationMediaChecked },
      "*"
    );
  } else {
    //console.log("Old int");
    window.postMessage(
      { action: "integrationMedia", value: integrationMediaChecked },
      "*"
    );
  }
  if (nechitalkaChecked) {
    //console.log("Nechitalka true");
    window.postMessage(
      { action: "nechitalka", value: nechitalkaChecked },
      "*"
    );
  }
  else {
    //console.log("Nechitalka false");
    window.postMessage(
      { action: "nechitalka", value: nechitalkaChecked },
      "*"
    );
  }
  if (nepisalkaChecked) {
    //console.log("Nepisalka true");
    window.postMessage(
      { action: "nepisalka", value: nepisalkaChecked },
      "*"
    );
  }
  else {
    //console.log("Nepisalka false");
    window.postMessage(
      { action: "nepisalka", value: nepisalkaChecked },
      "*"
    );
  }
  if (pollResultsChecked) {
    //console.log("Polls true");
    window.postMessage(
      { action: "pollResults", value: pollResultsChecked },
      "*"
    );
  }
  else {
    //console.log("Polls false");
    window.postMessage(
      { action: "pollResults", value: pollResultsChecked },
      "*"
    );
  }
  if (removeAwayChecked) {
    window.postMessage(
      { action: "removeAway", value: removeAwayChecked },
      "*"
    );
  }
  else {
    window.postMessage(
      { action: "removeAway", value: removeAwayChecked },
      "*"
    );
  }
  if (newProfilesChecked) {
    window.postMessage(
      { action: "newProfiles", value: newProfilesChecked },
      "*"
    );
  }
  else {
    window.postMessage(
      { action: "newProfiles", value: newProfilesChecked },
      "*"
    );
  }
  if (middleNameChecked) {
    window.postMessage(
      { action: "middleName", value: middleNameChecked },
      "*"
    );
  }
  else {
    window.postMessage(
      { action: "middleName", value: middleNameChecked },
      "*"
    );

  }
  if (oldHoverChecked) {
    window.postMessage(
      { action: "oldHover", value: oldHoverChecked },
      "*"
    );
  }
  else {
    window.postMessage(
      { action: "oldHover", value: oldHoverChecked },
      "*"
    );
  }
  if (tabletMenuChecked) {
    initTabletMenu();
  }
  else {
    closeTabletMenu();
  }
    if (defaultThemeChecked) {
    window.postMessage(
      { action: "defaultThemeFix", value: defaultThemeChecked },
      "*"
    );
  }
  else {
    window.postMessage(
      { action: "defaultThemeFix", value: defaultThemeChecked },
      "*"
    );
  }
      if (oldBadgeChecked) {
    window.postMessage(
      { action: "oldBadge", value: oldBadgeChecked },
      "*"
    );
  }
  else {
    window.postMessage(
      { action: "oldBadge", value: oldBadgeChecked },
      "*"
    );
  }
}
// Функция для получения состояния чекбоксов из локального хранилища и применения стилей
function applySavedStyles() {
  chrome.storage.local.get(
    [
	  "oldBadgeState",
	  "defaultThemeState",
      "tabletMenuState",
      "oldHoverState",
      "middleNameState",
      "newProfilesState",
      "removeAwayState",
      "pollResultsState",
      "nepisalkaState",
      "nechitalkaState",
      "integrationMediaState",
      "newDesignState",
      "hideButtonState",
      "cameraPhotoState",
      "addstickerState",
      "customHotbar",
      "muteCallsState",
      "altSBState",
      "recentGroupsState",
      "emojiStatusState",
      "sliderValue",
      "checkboxStateAva",
      "checkboxState",
      "checkboxState1",
      "secretFuncState",
      "postReactionsState",
      "hiderState",
      "customAccent",
      "colorPicker",
      "colorPickerText",
      "customLogo",
      "customBg",
      "customFont",
    ],
    function (items) {
      const isOldAccentChecked = items.checkboxState;
      const isMsgReactionsChecked = items.checkboxState1;
      const isPostReactionsChecked = items.postReactionsState;
      const isSecretChecked = items.secretFuncState;
      const isHiderChecked = items.hiderState;
      const cAccentValue = items.customAccent;
      const cColorValue = items.colorPicker;
      const cTextValue = items.colorPickerText;
      const cLogoValue = items.customLogo;
      const cBgValue = items.customBg;
      const cFontValue = items.customFont;
      const isNameAva = items.checkboxStateAva;
      const sliderValueCount = items.sliderValue;
      const emojiStatusChecked = items.emojiStatusState;
      const recentGroupsChecked = items.recentGroupsState;
      const altSBChecked = items.altSBState;
      const muteCallsChecked = items.muteCallsState;
      const cHotBarValue = items.customHotbar;
      const addStickerChecked = items.addstickerState;
      const cameraPhotoChecked = items.cameraPhotoState;
      const hideButtonChecked = items.hideButtonState;
      const newDesignChecked = items.newDesignState;
      const integrationMediaChecked = items.integrationMediaState;
      const nechitalkaChecked = items.nechitalkaState;
      const nepisalkaChecked = items.nepisalkaState;
      const pollResultsChecked = items.pollResultsState;
      const removeAwayChecked = items.removeAwayState;
      const newProfilesChecked = items.newProfilesState;
      const middleNameChecked = items.middleNameState;
      const oldHoverChecked = items.oldHoverState;
      const tabletMenuChecked = items.tabletMenuState;
	  const defaultThemeChecked = items.defaultThemeState;
	  const oldBadgeChecked = items.oldBadgeState;
      applyStyles(
        isOldAccentChecked,
        isMsgReactionsChecked,
        isPostReactionsChecked,
        isSecretChecked,
        isHiderChecked,
        cAccentValue,
        cColorValue,
        cTextValue,
        cLogoValue,
        cBgValue,
        cFontValue,
        isNameAva,
        sliderValueCount,
        emojiStatusChecked,
        recentGroupsChecked,
        altSBChecked,
        muteCallsChecked,
        cHotBarValue,
        addStickerChecked,
        cameraPhotoChecked,
        hideButtonChecked,
        newDesignChecked,
        integrationMediaChecked,
        nechitalkaChecked,
        nepisalkaChecked,
        pollResultsChecked,
        removeAwayChecked,
        newProfilesChecked,
        middleNameChecked,
        oldHoverChecked,
        tabletMenuChecked,
		defaultThemeChecked,
		oldBadgeChecked
      );
    }
  );
}
// При загрузке страницы применяем сохраненные стили
document.addEventListener("DOMContentLoaded", applySavedStyles);
// Обработчик сообщений от background.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (
    message.type === "nameAva" ||
    message.type === "toggleOldAccent" ||
    message.type === "toggleMsgReactions" ||
    message.type === "toggleSecretFunctions" ||
    message.type === "togglePostReactions" ||
    message.type === "toggleHider" ||
    message.type === "toggleEmojiStatus" ||
    message.type === "toggleRecentGroups" ||
    message.type === "toggleAltSB" ||
    message.type === "toggleMuteStatus" ||
    message.type === "customAccent" ||
    message.type === "colorPicker" ||
    message.type === "colorPickerText" ||
    message.type === "customLogo" ||
    message.type === "customBg" ||
    message.type === "customFont" ||
    message.type === "sliderValue" ||
    message.type === "customHotbar" ||
    message.type === "addSticker" ||
    message.type === "toggleCameraPhoto" ||
    message.type === "toggleHideButton" ||
    message.type === "toggleNewDesign" ||
    message.type === "toggleIntegrationMedia" ||
    message.type === "toggleNechitalka" ||
    message.type === "toggleNepisalka" ||
    message.type === "togglePollResults" ||
    message.type === "toggleRemoveAway" ||
    message.type === "toggleNewProfiles" ||
    message.type === "toggleMiddleName" ||
    message.type === "toggleOldHover" ||
    message.type === "toggleTabletMenu" ||
    message.type === "toggleDefaultTheme" ||
    message.type === "toggleOldBadge"
  ) {
    applySavedStyles();
  }
  if (message.type === "checkId") {
    checkId();
  }
});

function checkId() {
  const url = window.location.href;
  var parts = url.split("/");
  var username = parts[parts.length - 1];
  if (username.includes("?")) {
    username = username.split("?")[0];
  }
  var objectId;
  /*console.log("Username:" + username);*/
  const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      objectId = data.response.object_id;
      chrome.runtime.sendMessage({
        greeting: objectId,
      });
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}
//Добавление стикера во вложения ВК(старый мессенджер, в новом не работает)
function runStickerAdder() {
  const existingStickerLink = document.querySelector(".ms_item_sticker");
  if (existingStickerLink) {
    return;
  }
  let styleElement = fromId("vken_box_sticker");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "vken_box_sticker";
    document.head.appendChild(styleElement);
  }
  styleElement.id = "vken_box_sticker";
  styleElement.innerHTML = `#vken_box_layer_bg {    top: 0;    left: 0;    width: 100%;    overflow: hidden;}#vken_box_layer_bg > div > div:nth-child(3) > svg{    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' display='block' class='vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20' viewBox='0 0 20 20' width='20' height='20' style='width: 20px; height: 20px;'%3E%3Cpath fill='%23e1e3e6' fill-rule='evenodd' d='M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E") no-repeat;}#vken_box_layer_bg > div > div:nth-child(3){    right:-40px!important;    background-color:rgba(0, 0, 0, 0.44);    border-radius:999px;    padding:4px;    cursor:pointer;}#vken_box_layer_bg > div > button{    color:var(--vkui--color_text_contrast_themed);    background-color:var(--vkui--color_background_accent_themed);    border:0px;    border-radius:5px;    padding:6px 12px 6px 12px;    cursor:pointer;}#vken_box_layer_bg > div > button:hover{    background-color:var(--vkui--color_background_accent_themed--hover);}#vken_box_layer_bg > div > input[type=text]{    background: 0 0;    padding: 8px 4px 8px 4px;    color: var(--vkui--color_text_primary);        font-size: var(--vkui--font_text--font_size--compact);    font-family: var(--palette-vk-font, -apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",arial,Tahoma,verdana,sans-serif);    outline: 0;    box-shadow: none;    border: 1px solid var(--vkui--vkontakte_color_input_border);    border-radius: 6px;    overflow: hidden;    position: relative;}#vken_box_layer_bg > div > div.box_title{    padding-left:0px!important;    font-size: 14px;    color: var(--vkui--color_text_primary);    line-height: 32px;    height:32px;    margin-bottom:8px;    overflow: hidden;    text-overflow: ellipsis;    white-space: nowrap;}`;
  const moreItemsContainer = document.querySelector(
    ".ms_items_more._more_items"
  );
  if (!moreItemsContainer) {
    /*console.error('Контейнер не найден');*/
    return;
  }
  const stickerLink = document.createElement("a");
  stickerLink.classList.add("ms_item", "ms_item_sticker", "_type_sticker");
  stickerLink.tabIndex = "0";
  stickerLink.innerHTML =
    '<span class="MediaSelector__mediaIcon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49a3.3 3.3 0 0 0 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13 4.04 4.04 0 0 1-.97.83 5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26Zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5Zm-3-9.4a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8ZM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0Z" clip-rule="evenodd"></path></svg></span>Стикер';
  moreItemsContainer.appendChild(stickerLink);
  stickerLink.addEventListener("click", function () {
    const overlay = create(
      "div",
      {
        height: "100vh",
        zIndex: "9999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: "1",
        background: "#000000B3",
      },
      { id: "vken_box_layer_bg", className: "fixed" }
    );
    const popupContainer = create(
      "div",
      {
        width: "400px",
        backgroundColor: "var(--vkui--color_background_modal)",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        position: "relative",
      },
      { className: "popup_box_container", tabIndex: "0" }
    );
    const title = create(
      "div",
      {},
      { className: "box_title", textContent: "Прикрепление стикера" }
    );
    const textBox = create(
      "input",
      { width: "100%", marginBottom: "10px" },
      { type: "text", placeholder: "Введите ID стикера", pattern: "d*" }
    );
    textBox.addEventListener("input", function () {
      const existingButton = document.querySelector(".add-button");
      if (existingButton) {
        existingButton.remove();
      }
      createAddButton();
    });

    function createAddButton() {
      const stickerId = textBox.value;
      const addButton = document.createElement("button");
      addButton.textContent = "Добавить";
      const command = `cur.chooseMedia('sticker', '${stickerId}', {performer: '${stickerId}', title: '${stickerId}', info: ${stickerId}, duration: '${stickerId}'});`;
      addButton.setAttribute("onclick", command);
      addButton.classList.add("add-button");
      popupContainer.appendChild(addButton);
      addButton.addEventListener("click", function () {
        overlay.remove();
      });
    }
    const closeButton = create(
      "div",
      { position: "absolute", top: "10px", right: "10px" },
      {}
    );
    closeButton.addEventListener("click", function () {
      overlay.remove();
    });
    const closeIcon = create(
      "svg",
      { width: "20px", height: "20px", display: "block" },
      {}
    );
    closeIcon.setAttribute("aria-hidden", "true");
    closeIcon.classList.add(
      "vkuiIcon",
      "vkuiIcon--20",
      "vkuiIcon--w-20",
      "vkuiIcon--h-20",
      "vkuiIcon--cancel_20"
    );
    closeIcon.setAttribute("viewBox", "0 0 20 20");
    closeIcon.setAttribute("width", "20");
    closeIcon.setAttribute("height", "20");
    closeIcon.style.width = "20px";
    closeIcon.style.height = "20px";
    closeIcon.style.display = "block";
    const path = document.createElement("path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute(
      "d",
      "M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06"
    );
    overlay.addEventListener("click", function (event) {
      if (!popupContainer.contains(event.target)) {
        overlay.remove();
      }
    });
    closeIcon.appendChild(path);
    closeButton.appendChild(closeIcon);
    popupContainer.appendChild(title);
    popupContainer.appendChild(textBox);
    popupContainer.appendChild(closeButton);
    overlay.appendChild(popupContainer);
    document.body.appendChild(overlay);
  });
}
//Функция копирования в буфер обмена
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
//Загрузка скриптов из доп. функций - ниже тоже
function loadScripts() {
  if (document.querySelector("#NNVAFTTSLJUUDLPQ")) {
    console.log(
      "Элемент NNVAFTTSLJUUDLPQ найден на странице. Нет смысла запускать скрипты"
    );
  } else {
    console.log(
      "Элемент NNVAFTTSLJUUDLPQ не найден на странице. Запускаю скрипты"
    );
    isSecretCheckFunc();
    buttonrun();
    favicons();
    document.querySelectorAll("a.LeftMenuItem-module__item--XMcN9")[7].href =
      "https://vk.com/videos";
    if (window.location.href.startsWith("https://vk.com/im")) {
      console.log("Обнаружена вкладка диалогов. Активирую нужные скрипты");
      imfixer();
      starmouse();
    }
    vkbynmh;
    if (window.location.href.startsWith("https://vk.com/video")) {
      console.log("Обнаружена вкладка видео. Активирую нужные скрипты");
      videoinject();
    }
    var element = document.createElement("div");
    element.id = "NNVAFTTSLJUUDLPQ";
    var parent = document.querySelector("body");
    parent.appendChild(element);
  }
}
let isFaviconReplaced = false;
let isTitleReplaced = false;

function favicons() {
  if (document.title == "Мессенджер") {
    document.title = "Сообщения";
  } else if (document.title == "VK Видео — смотреть онлайн бесплатно") {
    document.title = "Видеокаталог";
  } else if (document.title == "Реакции") {
    document.title = "Понравилось";
  } else if (document.title == "Приложения") {
    let side = document.querySelector("div#side_bar");
    side.style.setProperty("display", "none", "important");
  }
  if (document.title == "Сообщения" || document.title == "Messages") {
    document.querySelector("link[rel='shortcut icon']").href =
      "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlElEQVR4AWNwL/BhCGrcURfYuOMpEP8F4v8E8F+QWpAekF6Y5v/kYJBeBqjN/8nETxnwO5uwdxiQBWoWnPz/8v23/3///fuPBkBiIDmwGmQ9yAaAFRAAIDU4DcBmMzaX4DaASECxC2gXBpTHArbwuPHo/f+k3n040wLOhPTu84//2049/B/avBNvQqI4KVOcmSjOzgBou+P2cojtUQAAAABJRU5ErkJggg==";
  } else {
    document.querySelector("link[rel='shortcut icon']").href =
      "https://vk.com/images/faviconnew.ico?6";
  }
  isFaviconReplaced = true;
  isTitleReplaced = true;
  if (isFaviconReplaced) {
    console.log("Favicons replaced succesfully!");
  }
  if (isTitleReplaced) {
    console.log("Titles replaced succesfully!");
  }
}

function videoinject() {
  const subtitleElements = document.querySelectorAll(".js-video-subtitle");
  if (subtitleElements.length >= 5) {
    subtitleElements[4].textContent = "Альбомы";
  }
  console.log(subtitleElements[4]);
  var newElement = document.createElement("div");
  newElement.className = "VideoActions__item VideoActions__item--secondary";
  newElement.setAttribute("data-task-click", "VideoShowcase/create_playlist");
  newElement.setAttribute("data-owner-id", "185853506");
  newElement.setAttribute(
    "data-task-mouseover",
    "VideoShowcase/show_main_action_tooltip"
  );
  newElement.setAttribute("data-task-mouseout", "VideoShowcase/hide_tooltip");
  newElement.setAttribute("data-text", "Создать альбом");
  newElement.setAttribute("aria-label", "Создать альбом");
  newElement.style.fontSize = "13px";
  newElement.textContent = "Создать альбом";
  var parentElement = document.querySelector(".VideoActions ");
  parentElement.appendChild(newElement);
  //Видео by @notmaxhack
  const videoActionsElement = document.querySelector(".VideoActions");
  const headerExtraElements = document.querySelectorAll(
    ".page_block_header_extra._header_extra"
  );
  headerExtraElements[1].insertBefore(
    videoActionsElement,
    headerExtraElements[1].firstChild
  );
  const uploadVideoBtns = document.querySelectorAll(
    '[data-task-click="VideoShowcase/upload_video"]'
  );
  // проверяем, что второй элемент существует
  if (uploadVideoBtns.length >= 2) {
    // выбираем второй элемент из массива и меняем его текст
    uploadVideoBtns[1].style.fontSize = "13px";
    uploadVideoBtns[1].textContent = "Добавить видео";
  }
  const uploadVideoBtns1 = document.querySelector(
    '[data-task-click="VideoShowcase/create_live"]'
  );
  uploadVideoBtns1.style.fontSize = "13px";
  uploadVideoBtns1.textContent = "Создать трансляцию";
  setInterval(function () {
    let uploadModal = document.querySelector(
      "#box_layer > div.popup_box_container.video_upload_box"
    );
    if (uploadModal) {
      const brElements = document.querySelectorAll(".video_upload_title br");
      // Удалить элементы <br>
      brElements.forEach((br) => {
        br.remove();
      });
      console.log("Injected! Video");
      const textElements = uploadModal.querySelectorAll(".video_upload_title");
      textElements.forEach(function (textElement) {
        if (
          textElement.innerHTML.includes(
            "Перед загрузкой советуем ознакомиться"
          )
        ) {
          textElement.innerHTML = textElement.innerHTML.replace(
            "Перед загрузкой советуем ознакомиться",
            ""
          );
        }
        if (
          textElement.innerHTML.includes("рекомендациями для авторов видео")
        ) {
          textElement.innerHTML = textElement.innerHTML.replace(
            "рекомендациями для авторов видео",
            "Подробнее о правилах"
          );
        }
        if (
          textElement.innerHTML.includes(
            " Чтобы начать загрузку, выберите файл "
          )
        ) {
          textElement.innerHTML = textElement.innerHTML.replace(
            " Чтобы начать загрузку, выберите файл ",
            "Чтобы нaчать загрузку, выберите файл на"
          );
        }
        if (textElement.innerHTML.includes(" с&nbsp;")) {
          textElement.innerHTML = textElement.innerHTML.replace(" с&nbsp;", "");
        }
        if (
          textElement.innerHTML.includes(
            " на&nbsp;компьютере или перетащите его в это окно. "
          )
        ) {
          textElement.innerHTML = textElement.innerHTML.replace(
            "на&nbsp;компьютере или перетащите его в это окно.",
            "компьютере или перетащите видеозапись в это&nbsp; окно"
          );
        }
        document.querySelector(".box_title").textContent = "Новое видео";
      });
    }
  }, 500);
  setInterval(function () {
    let uploadModal1 = document.querySelector(
      "#box_layer > div.popup_box_container.VideoPlaylistPopup"
    );
    if (uploadModal1) {
      console.log("Injected! Album");
      const textElements = uploadModal1.querySelectorAll(".box_body");
      textElements.forEach(function (textElement) {
        if (textElement.innerHTML.includes("Название плейлиста")) {
          textElement.innerHTML = textElement.innerHTML.replace(
            "Название плейлиста",
            "Название альбома"
          );
        }
        if (textElement.innerHTML.includes("Введите название плейлиста")) {
          textElement.innerHTML = textElement.innerHTML.replace(
            "Введите название плейлиста",
            "Введите название альбома"
          );
        }
        if (
          textElement.innerHTML.includes(
            "Кто может просматривать этот плейлист?"
          )
        ) {
          textElement.innerHTML = textElement.innerHTML.replace(
            "Кто может просматривать этот плейлист?",
            "Кто может просматривать этот альбом?"
          );
        }
        document.querySelector(".box_title").textContent = "Создание альбома";
      });
    }
  }, 500);
  var search = document.querySelector(
    ".ui_search_new.ui_search.ui_search_field_empty.video_search_input.VideoSearchInput.ui_search_custom.ui_search_with_custom_controls._wrap"
  );
  if (search) {
    search.classList =
      "ui_search_new ui_search ui_search_field_empty video_search_input ui_search_btn_large _wrap";
    // Передвижение поиска
    var parent = document.querySelector(
      "div#video_main_block h2.page_block_h2"
    );
    var child = document.querySelector(
      ".ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap"
    );
    parent.appendChild(child);
  }
  var search1 = document.querySelector(
    ".ui_search_new.ui_search.ui_search_field_empty.video_search_input.VideoSearchInput.ui_search_custom.ui_search_with_custom_controls._wrap"
  );
  var header = document.querySelector("div#video_block_header");
  if (search1) {
    search1.classList =
      "ui_search_new ui_search ui_search_field_empty video_search_input ui_search_btn_large _wrap";
    header.after(search1);
  }
  seacrh2();
  seacrh4();

  function seacrh2() {
    console.log("s2");
    // Установка старого поиска
    var search = document.querySelector(
      ".ui_search_new.ui_search.ui_search_field_empty.video_search_input.VideoSearchInput.ui_search_custom.ui_search_with_custom_controls._wrap"
    );
    if (search) {
      search.classList =
        "ui_search_new ui_search ui_search_field_empty video_search_input ui_search_btn_large _wrap";
      // Передвижение поиска
      var parent = document.querySelector(
        ".ui_gallery__arrow.ui_gallery__arrow_left"
      );
      var child = document.querySelector(
        ".ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap"
      );
      if (parent) {
        parent.before(child);
      }
    }
  }

  function seacrh4() {
    console.log("s4");
    // Передвижение поиска
    var parent = document.querySelector(
      "ul.ui_tabs.clear_fix.ui_tabs_header.ui_tabs_with_progress.ui_my_vid"
    );
    var child = document.querySelector(
      ".ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap"
    );
    if (parent) {
      parent.after(child);
    }
  }
}

function isSecretCheckFunc() {
  try {
    var parentlnk = document.querySelector("div#top_profile_menu");
    var lnk = document.querySelector("li#l_pr a");
    var setlnk = document.querySelector("a#top_settings_link");
    var suplnk = document.querySelector("a#top_support_link");
    var loglnk = document.querySelector("a#top_logout_link");
    var name = document.querySelector("img.TopNavBtn__profileImg");
    var name2 = document.querySelector(
      'a[href*="connect.vk.com"] div[style="color: var(--text_primary);"]'
    );
    var name3 = document.querySelector(
      '[style="background-color: var(--content_tint_background); border-radius: 8px; width: 254px; font-family: inherit;"]'
    );
    if (name) {
      var namealt = name.alt;
    }
    var s = document.querySelector("a#top_profile_link");
    var q = document.createElement("div");
    var w = document.createElement("a");
    var wtext = document.createTextNode("Моя страница");
    var ewtext = document.createTextNode("My profile");
    var n = document.createElement("a");
    var ntext = document.createTextNode("Редактировать");
    var entext = document.createTextNode("Edit");
    var u = document.createElement("div");
    var k = document.createElement("div");
    var b1;
    w.classList.add("top_profile_mrow");
    n.classList.add("top_profile_mrow");
    w.setAttribute("id", "top_myprofile_link");
    n.setAttribute("id", "top_edit_link");
    n.href = "https://vk.com/edit";
    u.classList.add("top_profile_sep");
    k.classList.add("top_profile_sep");
    if (document.querySelector(".top_profile_name")) {
      console.log(
        "Элемент top_profile_name найден на странице. Нет смысла запускать скрипт"
      );
    } else {
      q.classList.add("top_profile_name");
    }
    fromId("top_profile_menu").classList.remove("top_profile_menu_new");
    fromId("top_profile_menu").classList.add("top_profile_menu");
    if (
      document.querySelector(
        'a#top_profile_link[aria-label="Настройки страницы"]'
      )
    ) {
      w.appendChild(wtext);
      n.appendChild(ntext);
    }
    if (
      document.querySelector(
        'a#top_profile_link[aria-label="Profile settings"]'
      )
    ) {
      w.appendChild(ewtext);
      n.appendChild(entext);
    }
    if (document.querySelector(".top_profile_name")) {
      console.log(
        "Элемент top_profile_name найден на странице. Нет смысла запускать скрипт"
      );
    } else {
      q.innerHTML = `` + namealt + ``;
    }
    if (lnk) {
      w.href = lnk.href;
    }
    if (namealt != null) {
      s.insertBefore(q, s.firstChild);
      setlnk.insertAdjacentElement("beforeBegin", w);
      setlnk.insertAdjacentElement("beforeBegin", n);
      n.insertAdjacentElement("beforeBegin", u);
      loglnk.insertAdjacentElement("beforeBegin", k);
      var home = document.querySelector("a#top_home_link");
      parentlnk.insertBefore(u, setlnk);
      parentlnk.insertBefore(k, loglnk);
      parentlnk.insertBefore(n, setlnk);
    }
  } catch (e) { }
  const styleElement = document.createElement("style");
  styleElement.id = "top_name";
  styleElement.innerHTML = ".top_profile_name {padding-right: 10px;}";
  document.head.appendChild(styleElement);
}

function fixname1() {
  if (document.querySelector(".top_profile_name")) {
    /*console.log(
      "Элемент top_profile_name найден на странице. Нет смысла запускать скрипт"
    );*/
  } else {
    //console.log("fixname");
    try {
      var parentlnk = document.querySelector("div#top_profile_menu");
      var lnk = document.querySelector("li#l_pr a");
      var setlnk = document.querySelector("a#top_settings_link");
      var suplnk = document.querySelector("a#top_support_link");
      var loglnk = document.querySelector("a#top_logout_link");
      var name = document.querySelector("img.TopNavBtn__profileImg");
      var name2 = document.querySelector(
        'a[href*="connect.vk.com"] div[style="color: var(--text_primary);"]'
      );
      var name3 = document.querySelector(
        '[style="background-color: var(--content_tint_background); border-radius: 8px; width: 254px; font-family: inherit;"]'
      );
      if (name) {
        var namealt = name.alt;
      }
      var s = document.querySelector("a#top_profile_link");
      var q = document.createElement("div");
      var w = document.createElement("a");
      var wtext = document.createTextNode("Моя страница");
      var ewtext = document.createTextNode("My profile");
      var n = document.createElement("a");
      var ntext = document.createTextNode("Редактировать");
      var entext = document.createTextNode("Edit");
      var u = document.createElement("div");
      var k = document.createElement("div");
      q.classList.add("top_profile_name");
      q.innerHTML = `` + namealt + ``;
      if (lnk) {
        w.href = lnk.href;
      }
      if (namealt != null) {
        s.insertBefore(q, s.firstChild);
        setlnk.insertAdjacentElement("beforeBegin", w);
        var home = document.querySelector("a#top_home_link");
        parentlnk.insertBefore(u, setlnk);
        parentlnk.insertBefore(k, loglnk);
        parentlnk.insertBefore(n, setlnk);
      }
    } catch (e) { }
    const styleElement = document.createElement("style");
    styleElement.id = "top_name";
    styleElement.innerHTML = ".top_profile_name {padding-right: 10px;}";
    document.head.appendChild(styleElement);
  }
}

function buttonrun() {
  console.log("buttonrun executed");
  var count = 0;
  var interval = setInterval(function () {
    if (count >= 3) {
      console.log(count + " passed");
      clearInterval(interval);
      return;
    }
    const url = window.location.href;
    var parts = url.split("/");
    var username = parts[parts.length - 1];
    if (username.includes("?")) {
      username = username.split("?")[0];
    }
    var objectId;
    const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
    fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        objectId = data.response.object_id;
        console.log("ID fetched succesfully: " + objectId);
        if (
          !document.querySelector('a[aria-label="Написать сообщение"]') &&
          !document.querySelector(
            'a[href^="/im"]:not([class^="LeftMenuItem-module__item"])'
          )
        ) {
          if (objectId !== "185853506") {
            var newElement = document.createElement("a");
            newElement.className = "ms_item ms_item_gift _type_gift";
            newElement.tabIndex = "0";
            newElement.style.position = "absolute";
            newElement.style.marginTop = "-50px";
            newElement.style.display = "block";
            newElement.style.color = "rgb(40, 84, 115)";
            newElement.innerHTML = "Отправить подарок";
            newElement.href =
              "/gifts" + objectId + "?act=send&ref=profile_module";
            document
              .querySelector("#profile_redesigned")
              .appendChild(newElement);
          }
        } else {
          console.log(
            "Найдена кнопка 'Написать сообщение'. Нет смысла создавать кнопку подарка"
          );
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
    count++;
  }, 1000); // 10 секунд
}

function imfixer() {
  const buttonElement = document.querySelector(
    ".im-page--dialogs-header-control_call"
  );
  const linkElement = document.createElement("a");
  linkElement.setAttribute("tabindex", "0");
  linkElement.setAttribute("role", "link");
  linkElement.classList.add(
    "ui_actions_menu_item",
    "im-action",
    "im-action_favorites",
    "_im_search_more_action"
  );
  linkElement.setAttribute("data-action", "favorites");
  linkElement.innerText = "";
  linkElement.style =
    "margin-top: 8px; padding-left: 20px; background-color: #fff; background: url(https://sun9-33.userapi.com/impg/cAWfwzC-vRiWXCNs6daC4kJswRmLn_XL7Zi1sw/VgHLi5kumV4.jpg?size=24x24&quality=96&sign=71effcfb859fb3a838d3a04f312b2a8f&type=album) no-repeat; background-position: 15px 6.7px; background-size: 45% auto; opacity: .7";
  linkElement.removeEventListener("mouseover", null);
  buttonElement.parentNode.replaceChild(linkElement, buttonElement);
  var svgElement = linkElement.querySelector("svg");
  if (svgElement) {
    svgElement.remove();
  }
}

function starmouse() {
  setTimeout(function () {
    const el1ement = document.querySelector(
      "div.ui_actions_menu_wrap._ui_menu_wrap.im-page--dialogs-call-wrap"
    );
    el1ement.removeAttribute("onmouseover");
    el1ement.removeAttribute("onmouseout");
    console.log("Star executed!");
  }, 10000);
}

function vkbynmh() {
  setInterval(function () {
    var links = document.getElementsByTagName("a");
    // Проходимся по каждому элементу
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (
        link.getAttribute("onclick") ===
        "return Gifts.showGiftBox(cur.oid, event, 'gifts');" ||
        link.getAttribute("onclick") ===
        "return Gifts.showGiftBox(cur.oid, event, 'gifts_own');"
      ) {
        link.style.color = "#fff";
      }
    }
  }, 500);
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      var l = document.querySelector("button.FCPanel__add");
      l.addEventListener("click", chat, false);
    },
    false
  );
  i = 0;
  i2 = 0;
  vd = 0;
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      chat();
    },
    false
  );
  window.onload = function () {
    var login = document.querySelector(".VkIdForm");
    var login_btn = document.querySelector(
      "button.FlatButton.FlatButton--primary.FlatButton--size-l.FlatButton--wide.VkIdForm__button.VkIdForm__signInButton"
    );
    login == null || undefined
      ? (initial(), (styleNode = null))
      : ((login_btn.outerHTML = login_btn.outerHTML),
        (login_btn = document.querySelector(
          "button.FlatButton.FlatButton--primary.FlatButton--size-l.FlatButton--wide.VkIdForm__button.VkIdForm__signInButton"
        )),
        login_btn.setAttribute(
          "onclick",
          `return location.href = "https://vk.com/login?classic_flow=1"`
        ),
        wait);
  };

  function wait_form() {
    var form = document.querySelector("form#login_submit");
    var acess = document.querySelector("img.oauth_app_photo");
    if (form !== null || (undefined && acess == null)) {
      console.log("form");
    } else if (acess !== null || (undefined && form == null)) {
      location.href = "https://vk.com/feed";
      clearInterval(wait_form);
      acess.classList = "test";
    }
  }
  // Создание элемента
  window.addEventListener("load", function () {
    const createPlaylistButton = document.querySelectorAll(
      '[aria-label="Создать плейлист"]'
    );
    const plist1 = createPlaylistButton[1];
    console.log(plist1);
    plist1.querySelector(".FlatButton__before").remove();
    plist1.querySelector(".FlatButton__content").textContent = "Создать альбом";
  });
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      var l = document.querySelector("button.FCPanel__add");
      l.addEventListener("click", chat, false);
    },
    false
  );
  i = 0;
  i2 = 0;
  vd = 0;
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      chat();
    },
    false
  );
  window.onblur = function () {
    var a = setInterval(title, 2000);
    var c = setInterval(check, 1000);
    clearInterval(a);
    clearInterval(c);
  };
  window.onfocus = function () {
    var ad_n = parseInt(localStorage.getItem("ad"));
    setInterval(title, 2000);
    setInterval(check, 1000);
    //fix_name();
  };

  function initial() {
    console.log("Скрипт запущен");
    setInterval(title, 2000);
    setInterval(check, 1000);
  }
  // Проверка
  function check() {
    check_vid();
    feed_check();
  }

  function feed_check() {
    if (window.location.href.includes("feed")) {
      _class();
      _class2();
    }
    var k = document.querySelector(
      ".like_cont.PostBottomActionLikeBtns.PostBottomActionLikeBtns--withBgButtons"
    );
    if (k) {
      _class();
      _class2();
    }
  }

  function _class2() {
    var g;
    var k = document.querySelectorAll(
      ".ui_actions_menu._ui_menu.ui_actions_menu--actionSheet"
    );
    for (g = 0; g < k.length; g++) {
      k[g].className = "ui_actions_menu _ui_menu ";
    }
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function _class() {
    await sleep(2000);
    var u, k;
    var old2 = document.querySelectorAll(
      ".PostButtonReactions__icon.PostButtonReactions__icon--custom.PostButtonReactions__icon--animationActive"
    );
    for (k = 0; k < old2.length; k++) {
      old2[
        k
      ].style.background = `background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m0%200h24v24h-24z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22m17%202.9a6.43%206.43%200%200%201%206.4%206.43c0%203.57-1.43%205.36-7.45%2010l-2.78%202.16a1.9%201.9%200%200%201%20-2.33%200l-2.79-2.12c-6.05-4.68-7.45-6.47-7.45-10.04a6.43%206.43%200%200%201%206.4-6.43%205.7%205.7%200%200%201%205%203.1%205.7%205.7%200%200%201%205-3.1z%22%20fill%3D%22%23ff3347%22%2F%3E%3C%2Fsvg%3E);`;
    }
  }

  function chat() {
    var a = document.querySelectorAll(".MEAvatar__online");
    console.log(a.length);
    //var b,c
    //for (b = 0; b < a.length; b++) {
    //   c = a[b].previousElementSibling.firstElementChild
    //  console.log(c.alt)
    //}
  }
  window.addEventListener("scroll", function () {
    KPP.add(".PostButtonReactions", function (reactions) {
      var count = reactions.dataset.reactionCounts;
      if (count && !reactions.dataset.reactionButtonTextIsCounter) {
        count = JSON.parse(count);
        if (!Array.isArray(count)) {
          count = Object.values(count);
        }
        var likes = count.reduce(function (previous, current) {
          return previous + current;
        });
        reactions.getElementsByClassName(
          "PostButtonReactions__title"
        )[0].textContent = likes;
      }
      reactions.dataset.reactionButtonTextIsCounter = "1";
      var target = reactions.dataset.reactionTargetObject;
      if (target) {
        reactions.setAttribute(
          "onmouseover",
          "Likes.showLikes(this,'" + target + "')"
        );
      }
    });
  });
  // Название
  function title() { }
  const element = document.querySelector(
    "a.ui_actions_menu_item.im-action.im-action_favorites._im_search_more_action"
  );
  const listeners = window.getEventListeners(element);
  const eventListener = listeners.click[0].listener;
  const favoritesBtn = document.querySelector(
    'button[data-action="favorrites"]'
  );
  favoritesBtn.addEventListener("click", eventListener);
  const listeners1 = window.getEventListeners(favoritesBtn);
  console.log(
    "resultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresult"
  );
  console.log(listeners1.click);
  // Лучше дома
  const besthomelogolink = document.querySelector(
    "#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink"
  );
  if (
    document.querySelector(
      'a#top_profile_link[aria-label="Настройки страницы"]'
    )
  ) {
    besthomelogolink.setAttribute(
      "onmouseover",
      `this.className.indexOf(\'bugtracker_logo\') === -1 && bodyNode.className.indexOf(\'WideScreenAppPage\') === -1 && showTooltip(this,\r\n{\r\n  text: \"<div class=\\\"CovidTooltip__logo\\\"><\\\/div><div class=\\\"CovidTooltip__title\\\">\u041E\u0441\u0442\u0430\u0432\u0430\u0439\u0442\u0435\u0441\u044C \u0434\u043E\u043C\u0430<\\\/div><div class=\\\"CovidTooltip__text\\\">\u041C\u043E\u0439\u0442\u0435 \u0440\u0443\u043A\u0438, \u0438\u0437\u0431\u0435\u0433\u0430\u0439\u0442\u0435 \u0441\u043A\u043E\u043F\u043B\u0435\u043D\u0438\u044F \u043B\u044E\u0434\u0435\u0439, \u043F\u043E \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u043D\u0435 \u0432\u044B\u0445\u043E\u0434\u0438\u0442\u0435 \u0438\u0437 \u0434\u043E\u043C\u0430 \u0438 \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u0435 <a href=\\\"\\\/feed?section=stayhome\\\" onclick=\\\"return typeof window.statlogsValueEvent !== &#39;undefined&#39; &amp;&amp; window.statlogsValueEvent(&#39;coronavirus_tooltip_click&#39;, 1) || nav.go(this, event)\\\">\u0432\u0440\u0435\u043C\u044F \u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0439<\\\/a>.<\\\/div>\",\r\n  className: \'CovidTooltip\',\r\n  width: 356,\r\n  dir: \'top\',\r\n  shift: [0, 0, 6],\r\n  hidedt: 60, showdt: 600,\r\n  hasover: true,\r\n  onShowStart: function() {window.statlogsValueEvent !== \'undefined\' && window.statlogsValueEvent(\'coronavirus_tooltip_show\', 1)}\r\n})
`
    );
  }
  if (
    document.querySelector('a#top_profile_link[aria-label="Profile settings"]')
  ) {
    besthomelogolink.setAttribute(
      "onmouseover",
      `this.className.indexOf(\'bugtracker_logo\') === -1 && bodyNode.className.indexOf(\'WideScreenAppPage\') === -1 && showTooltip(this,\r\n{\r\n  text: \"<div class=\\\"CovidTooltip__logo\\\"><\\\/div><div class=\\\"CovidTooltip__title\\\">Stay home<\\\/div><div class=\\\"CovidTooltip__text\\\">Wash your hands, maintain social distancing, stay at home if you can, and <a href=\\\"\\\/feed?section=stayhome\\\" onclick=\\\"return typeof window.statlogsValueEvent !== &#39;undefined&#39; &amp;&amp; window.statlogsValueEvent(&#39;coronavirus_tooltip_click&#39;, 1) || nav.go(this, event)\\\">keep busy<\\\/a>.<\\\/div>\",\r\n  className: \'CovidTooltip\',\r\n  width: 356,\r\n  dir: \'top\',\r\n  shift: [0, 0, 6],\r\n  hidedt: 60, showdt: 600,\r\n  hasover: true,\r\n  onShowStart: function() {window.statlogsValueEvent !== \'undefined\' && window.statlogsValueEvent(\'coronavirus_tooltip_show\', 1)}\r\n})
`
    );
  }
  //Шестеренка дофикс
  function handleClick() {
    const element = document.querySelector(
      ".LeftMenuItem-module__settings--YcqyH"
    );
    if (element) {
      element.style.opacity = "1";
      console.log("Opacity changment successful!");
    }
  }
  const clickableElement = document.querySelector(
    ".LeftMenuItem-module__settings--YcqyH"
  );
  if (clickableElement) {
    clickableElement.addEventListener("click", handleClick);
  }
  // Меню и Имя возле иконки
  const styleremove = document.createElement("style");
  styleremove.innerHTML = `
      .ReactionsMenuPopper,.fans_fanph_reaction,li#likes_tab_reactions_0, li#likes_tab_reactions_1, li#likes_tab_reactions_2, li#likes_tab_reactions_3, li#likes_tab_reactions_4, li#likes_tab_reactions_5,.ui_tab.ui_tab_group,.menu_item_icon,#react_rootEcosystemAccountMenuEntry {
        display: none !important;
      }
    `;
  styleremove.classList = "NewRemover";
  document.head.appendChild(styleremove);
  // Фикс в видео
  function check_vid() {
    var h2;
    var myvd = document.querySelector("li#l_pr a.left_row");
    if (myvd) {
      var h = myvd.href;
    }
    if (h) {
      h2 = h.split("vk.com/")[1];
    }
    //console.log(h2)
    if (
      !window.location.href.includes(h2) &&
      !window.location.href.includes("/video/@")
    ) {
      seacrh2();
      pop_vid();
    }
    if (window.location.href.includes(h2)) {
      my_vid();
      seacrh();
    }
    if (
      window.location.href.includes("https://vk.com/video/@") &&
      !window.location.href.includes(h2)
    ) {
      seacrh3();
    }
  }
  if (
    window.location.href.includes("https://vk.com/settings?act=classicsecurity")
  ) {
    var securtiypage = document.querySelector(".wide_column_wrap");
    securtiypage.innerHTML = ``;
  }

  function seacrh() {
    // Установка старого поиска
  }

  function seacrh3() { }

  function my_vid() {
    var head = document.querySelectorAll(".page_block_header.clear_fix");
    if (head[1]) {
      head[1].outerHTML = `<ul class="ui_tabs clear_fix ui_tabs_header ui_tabs_with_progress ui_my_vid" onmouseover="uiTabs.tryInit(this)" id="video_main_tabs" data-inited="1">
    <li id="videocat_tab_all">
  <a href="#" class="ui_tab ui_tab_sel" onclick="document.querySelector('a.MenuList__item.MenuList__item--expandable').click();">
    Мои видео
  </a>
</li><li id="videocat_tab_catalog">
  <a href="/video" class="ui_tab" onclick="return uiTabs.goTab(this, event, 1);">
    Видеокаталог
  </a>
</li><li>
  <div class="ui_tab_plain ui_tabs_progress" role="link">


  </div>
</li>  <button style="margin-left: 0" class="flat_button">Добавить видео</button><button class="flat_button secondary" id="video_create_live_btn">Создать альбом</button>  <button class="flat_button secondary" id="video_add_album_btn" onclick="return Video.createAlbum(event);" style="">Создать альбом</button>
    <div class="ui_tabs_slider _ui_tabs_slider" style="width: 83.6875px; margin-left: 14px;"></div>
  </ul>`;
      var t = document.querySelector(
        'button.flat_button[style="margin-left: 0"]'
      );
      var t2 = document.querySelector("button#video_create_live_btn");
      var vid = document.querySelector(
        "ul.ui_tabs.clear_fix.ui_tabs_header.ui_tabs_with_progress.ui_pop_vid"
      );
      if (vid) {
        vid.remove();
        seacrh4();
      }
      t.addEventListener("click", add, false);
      t2.addEventListener("click", add1, false);
    }
  }

  function seacrh2() {
    // Установка старого поиска
    var search = document.querySelector(
      ".ui_search_new.ui_search.ui_search_field_empty.video_search_input.VideoSearchInput.ui_search_custom.ui_search_with_custom_controls._wrap"
    );
    if (search) {
      search.classList =
        "ui_search_new ui_search ui_search_field_empty video_search_input ui_search_btn_large _wrap";
      // Передвижение поиска
      var parent = document.querySelector(
        ".ui_gallery__arrow.ui_gallery__arrow_left"
      );
      var child = document.querySelector(
        ".ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap"
      );
      if (parent) {
        parent.before(child);
      }
    }
  }

  function seacrh4() {
    // Передвижение поиска
    var parent = document.querySelector(
      "ul.ui_tabs.clear_fix.ui_tabs_header.ui_tabs_with_progress.ui_my_vid"
    );
    var child = document.querySelector(
      ".ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap"
    );
    if (parent) {
      parent.after(child);
    }
  }

  function pop_vid() {
    var head2 = document.querySelector("ul#video_main_tabs");
    var head = document.createElement("ul");
    head.classList = "gg";
    //console.log(head2)
    var slider = document.querySelector(
      ".ui_gallery.VideoTabsSlider.js-video-slider"
    );
    if (slider) {
      slider.classList = "ui_gallery VideoTabsSlider";
    }
    var search = document.querySelector(
      ".ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap"
    );
    if (head2 == null) {
      if (search) {
        search.before(head);
        head2 = document.querySelector("ul.gg");
        head2.outerHTML = `<ul class="ui_tabs clear_fix ui_tabs_header ui_tabs_with_progress ui_pop_vid" onmouseover="uiTabs.tryInit(this)" id="video_main_tabs" data-inited="1">
    <li id="videocat_tab_all">
  <a href="#" class="ui_tab" onclick="document.querySelector('a.MenuList__item.MenuList__item--expandable').click();">
    Мои видео
  </a>
</li><li id="videocat_tab_catalog">
  <a href="/video" class="ui_tab ui_tab_sel" onclick="return uiTabs.goTab(this, event, 1);">
    Видеокаталог
  </a>
</li><li>
  <div class="ui_tab_plain ui_tabs_progress" role="link">
  </div>
</li>  <button style="margin-left: 0" class="flat_button" onclick="document.querySelectorAll('.VideoActions__item')[0].click();">Добавить видео</button><button class="flat_button secondary" id="video_create_live_btn" onclick="document.querySelector('.VideoActions__item.VideoActions__item--secondary').click();">Создать альбом</button>  <button class="flat_button secondary" id="video_add_album_btn" onclick="return Video.createAlbum(event);" style="display: none;">Создать альбом</button>
    <div class="ui_tabs_slider _ui_tabs_slider" style="width: 103.906px; margin-left: 14px; transform: translateX(92px);"></div>
  </ul>`;
        head2 = document.querySelector("ul#video_main_tabs");
        var vid = document.querySelector(
          "ul.ui_tabs.clear_fix.ui_tabs_header.ui_tabs_with_progress.ui_my_vid"
        );
        if (vid) {
          vid.remove();
        }
      }
    }
  }

  function add() {
    var h = document.querySelector(
      '.VideoActions__item[aria-label="Добавить видео"]'
    );
    h.click();
  }

  function add1() {
    var h = document.querySelector(
      ".VideoActions__item.VideoActions__item--secondary"
    );
    h.click();
  }
  var KPP;
  KPP = {
    _list: [],
    _actions: [],
    _addedTag: function (observer, mutations, tag, callback, once) {
      for (var i = 0, l = mutations.length; i < l; i++) {
        for (var j = 0, m = mutations[i].addedNodes.length; j < m; j++) {
          if (mutations[i].addedNodes[j].tagName === tag) {
            callback();
            if (once) observer.disconnect();
          }
        }
      }
    },
    _police: new MutationObserver(function (mutations) {
      for (var i = 0, l = mutations.length; i < l; i++) {
        for (var j = 0, m = mutations[i].addedNodes.length; j < m; j++) {
          if (mutations[i].addedNodes[j].nodeType === 1) {
            for (var k = KPP._list.length; k--;) {
              if (mutations[i].addedNodes[j].matches(KPP._list[k])) {
                // Обрабатывает только существующие элементы до DOMContentLoaded
                if (!mutations[i].addedNodes[j].KPPPassed) {
                  KPP._actions[k](mutations[i].addedNodes[j]);
                  mutations[i].addedNodes[j].KPPPassed = true;
                }
              } else {
                var n = mutations[i].addedNodes[j].querySelectorAll(
                  KPP._list[k]
                );
                for (var o = 0, p = n.length; o < p; o++) {
                  if (!n[o].KPPPassed) {
                    KPP._actions[k](n[o]);
                    n[o].KPPPassed = true;
                  }
                }
              }
              //if (n.length > 0) break
            }
          }
        }
      }
    }),
    head: function (callback) {
      if (!document.head) {
        var observer = new MutationObserver(function (mutations, observer) {
          KPP._addedTag(observer, mutations, "HEAD", callback, true);
        });
        observer.observe(document.documentElement, {
          childList: true,
        });
      } else callback();
    },
    body: function (callback) {
      if (!document.body) {
        var observer = new MutationObserver(function (mutations, observer) {
          KPP._addedTag(observer, mutations, "BODY", callback, true);
        });
        observer.observe(document.documentElement, {
          childList: true,
        });
      } else callback();
    },
    add: function (selector, callback) {
      var q = document.querySelectorAll(selector);
      if (q.length > 0) {
        for (var i = q.length; i--;) {
          callback(q[i]);
        }
      }
      KPP._list.push(selector);
      KPP._actions.push(callback);
      KPP._police.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    },
    remove: function (selector) {
      var s = KPP._list.indexOf(selector);
      if (s !== -1) {
        KPP._list.splice(s, 1);
        KPP._actions.splice(s, 1);
        if (KPP._list.length < 1) {
          KPP._police.disconnect();
          return true;
        }
      }
      return false;
    },
    stop: function (full) {
      KPP._police.disconnect();
      if (full) {
        KPP._list = [];
        KPP._actions = [];
      }
    },
  };
}
