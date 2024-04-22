const newDesignFunctions = [
  "vkm_reforged_in_vkcom",
  "vkm_convo_profile",
  "me_fc_message_actions",
  "me_message_selecting",
  "me_fc_simple_composer",
  "vkm_chat_big_stickers",
  "vkm_mention_highlight_tertiary",
  "vkm_message_context_menu",
  "vkm_photo_viewer_owner",
  "vkm_photo_viewer_rotating",
  "vkm_photo_viewer_scaling",
  "vkm_profile_info_screen_name",
  "vkm_qr_code_chat_invitation",
  "vkm_ugc_stickers_in_keyboard",
  "vkm_video_messages_shapes",
  "vkm_video_messges_subtitles",
  "vkm_send_promoted_stickers",
  "vkm_settings_experimental",
  "vkm_hide_forward_author",
  "vkm_extended_reaction_picker",
  "vkm_composer_new",
  "me_community_messages_enabled",
  "vkm_convo_forbid_writing_all",
  "vkm_convo_member_temporary_ban",
  "vkm_create_avatar_from_sticker",
  "vkm_message_preview_on_hover",
  "vkm_mini_apps_attach_picker",
  "vkm_new_attach_track",
  "vkm_new_attach_video",
  "vkm_new_music_attaches",
  "vkm_recommended_folders",
  "vkm_upload_v2",
  "vkm_spam_message_types",
  "vkm_settings_hide_suggested",
  "vkm_send_private_message_link",
  "vkm_new_remove_empty_forwards",
  "vkm_theme_styles_settings",
  "vkm_forward_modal_multipick",
  "vkm_new_attach_post",
  "vkm_new_miniapp_attaches",
  "vkm_stickers_popup",
  "vkm_media_share",
  "vkm_reforged_in_vkcom",
  "me_vkcom_api_feature_flags",
  "vkm_hide_forward_author",
  "vkm_theme_styles_settings",
];
const adsSelector = [
  ".page_block.feed_blog_reminder_large",
  "._ads_block_data_w",
  ".mailru-visibility-check",
  "[class^=ads_ads_box]",
  "#ads_left",
  ".page_block.apps_feedRightAppsBlock.apps_feedRightAppsBlock_single_app--",
  ".ads_ad_box.ver.repeat_ver.size_site.adaptive_ad",
  ".profile_rate_warning",
  ".post_marked_as_ads",
  ".post[data-ad-block-uid]",
  ".apps_feedRightAppsBlock__row",
  ".apps_feedRightAppsBlock",
  ".apps_feedRightAppsBlock_new_apps",
  ".NewMiniAppsRightBlock__root",
];
const im = /(^|\/)al_im\.php|(^|\/)im(\?|$)|\/write-?\d+|\/im\/.*/;

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const createElement = document.createElement.bind(document);
const createTextNode = document.createTextNode.bind(document);
const fromId = document.getElementById.bind(document);

let intMedia = false;
var pollResultsValue = false;
var nechitalkaValue = false;
var nepisalkaValue = false;
var removePostReactions = false;
var secretFunctions = false;
let ajax_replaced = null;
window.urls = null;

function XHRListener() {
  const { send } = XMLHttpRequest.prototype;

  XMLHttpRequest.prototype.send = function (data) {
    //console.log(data)
    if (/type=typing/.test(data) && nepisalkaValue) {
      return this.abort();
    }
    if (/type=audiomessage/.test(data) && nepisalkaValue) {
      return this.abort();
    }

    if (/act=a_mark_read/.test(data) && nechitalkaValue) {
      return this.abort();
    }
    if (/act=a_mard_listened/.test(data) && nechitalkaValue) {
      return this.abort();
    }
    return send.apply(this, Array.prototype.slice.call(arguments));
  };
}

XHRListener();

let xuy = ["get_unread_notifications", "get_accounts"];

deferredCallback(
  () => {
    let log = vkApi.login;
    vkApi.login = function (e) {
      if (!xuy.includes(e)) localStorage.setItem("convo_history", "[]");
      return log.apply(this, Array.prototype.slice.call(arguments));
    };
  },
  { variable: "vkApi" }
);

window.addEventListener("message", async (event) => {
  switch (event.data.action) {
    case "integrationMedia": {
      intMedia = event.data.value;
      break;
    }
    case "nechitalka": {
      nechitalkaValue = event.data.value;
      //console.log("Нечиталка " + nechitalkaValue);
      deferredCallback(
        () => {
          MECommonContext.then((e) => {
            let j = e.browserEnv.api.fetch;
            e.browserEnv.api.fetch = function (e, n, ...o) {
              if (
                e === "execute" &&
                n.code &&
                n.code.includes("messages.markAsRead") &&
                nechitalkaValue
              ) {
                return new Promise(() => {});
              }
              if (e === "messages.setActivity" && nepisalkaValue) {
                return new Promise(() => {});
              }
              return j.apply(this, Array.prototype.slice.call(arguments));
            };
          });
        },
        { variable: "MECommonContext" }
      );
      break;
    }
    case "nepisalka": {
      nepisalkaValue = event.data.value;
      //console.log("Неписалка " + nepisalkaValue);
      break;
    }
    case "pollResults": {
      localStorage.setItem("pollResultsValue", event.data.value);
      break;
    }
    case "vkNewDesign": {
      // Замена функции ajax.post
      deferredCallback(
        () => {
          let orig_ajax = ajax.post;
          ajax.post = function (...e) {
            if ((newDesign(), "al_im.php" === e[0] && "im" === e[1]?.__query)) {
              const t = e[2].onDone;
              e[2].onDone = function (...e) {
                const n = t.apply(this, e);
                return (
                  n instanceof Promise
                    ? n.finally(() => newDesign())
                    : newDesign().catch(console.error),
                  n
                );
              };
            }
            const t = orig_ajax.apply(this, e);

            return newDesign, t;
          };
          ajax_replaced = true;
        },
        { variable: "ajax" }
      );
      break;
    }
    case "vkNewDesignOff": {
      OldDesign();
      break;
    }
    case "muteCalls": {
      //console.log("Calls muted");
      deferredCallback(
        () => {
          Calls.isIncomingModalHidden = true;
        },
        { variable: "Calls" }
      );
      window.addEventListener("callsQueueEvent", MuteCalls);
      break;
    }
    case "unmuteCalls": {
      window.removeEventListener("callsQueueEvent", MuteCalls);
      deferredCallback(
        () => {
          Calls.isIncomingModalHidden = false;
        },
        { variable: "Calls" }
      );
      break;
    }
    case "HotBarAppear": {
      globalThis.HotBarAppearVAL = event.data.value;
      break;
    }
    case "removePostReactions": {
      localStorage.setItem("removePostReactions", true);
      try {
        updateMarginLeft();
      } catch (error) {}
      break;
    }
    case "backPostReactions": {
      localStorage.setItem("removePostReactions", false);
      try {
        backPostReactionsFunc();
      } catch (error) {}
      break;
    }
    case "secretFunctionsEnabled": {
      localStorage.setItem("secretFunctions", true);
      try {
        updateMarginLeft();
      } catch (error) {}
      break;
    }
    case "secretFunctionsDisabled": {
      localStorage.setItem("secretFunctions", false);
      try {
        backPostReactionsFunc();
      } catch (error) {}
      break;
    }
    case "removeAway": {
      localStorage.setItem("removeAway", event.data.value);
      break;
    }
    case "Init": {
      window.noAdsAtAll = true;
      break;
    }
    case "Urls": {
      window.urls = event.data.urls;
      break;
    }
  }
});

document.arrive('.OwnerPageName__icons', { existing: true }, function (e) {
  updateUsers();
});
///ЗНАЧКИ В ПРОФИЛЯХ///
document.arrive(adsSelector, { existing: true }, function (e) {
  e.remove();
});
async function updateUsers() {
	const url = window.location.href;
    var parts = url.split("/");
    var objectId;
    var username = parts[parts.length - 1];
    if (username.includes("?")) {
      username = username.split("?")[0];
    }
	var i = await vkApi.api("users.get",{user_ids:username});
	objectId = i[0].id;
	switch(objectId) {
		case 185853506:
			appendIcons(['founder','dev','designer']);
			break;
		case 539793061:
			appendIcons(['dev']);
			break;
		case 86322416:
			appendIcons(['help','old']);
			break;
	}
}

function createSVG() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '20');
  svg.setAttribute('height', '20');
  svg.setAttribute('viewBox', '0 0 20 20');
  svg.setAttribute('fill', 'none');
  svg.style.marginLeft = '8px';
  svg.style.marginTop = '6px';

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('clip-path', 'url(#clip0_120_106)');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M0 9.6C0 5.0745 0 2.81177 1.40589 1.40589C2.81177 0 5.0745 0 9.6 0H10.4C14.9255 0 17.1882 0 18.5941 1.40589C20 2.81177 20 5.0745 20 9.6V10.4C20 14.9255 20 17.1882 18.5941 18.5941C17.1882 20 14.9255 20 10.4 20H9.6C5.0745 20 2.81177 20 1.40589 18.5941C0 17.1882 0 14.9255 0 10.4V9.6Z');
  path1.setAttribute('fill', '#2961F4');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('fill-rule', 'evenodd');
  path2.setAttribute('clip-rule', 'evenodd');
  path2.setAttribute('d', 'M18.5236 18.6629C17.1126 20.0001 14.8506 20.0001 10.4 20.0001H9.60002C5.14957 20.0001 2.88746 20.0001 1.47656 18.663V17.3155C1.47656 15.5734 2.88882 14.1611 4.63092 14.1611H15.3692C17.1113 14.1611 18.5236 15.5734 18.5236 17.3155V18.6629Z');
  path2.setAttribute('fill', '#589AFA');

  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('d', 'M11.0255 14.1612C6.21427 14.1612 3.47006 11.1884 3.35571 6.2417H5.76573C5.84489 9.87243 7.6216 11.4104 9.02887 11.7274V6.2417H9.363C12.0311 6.2417 13.7337 6.2417 14.8147 6.2417C15.8596 6.2417 16.5837 7.08876 16.5837 8.13369C16.5837 8.13369 12.9883 8.13369 11.2983 8.13369V9.45816H16.5837V11.2556H11.2983V12.5259H16.5837C16.5837 13.429 15.8516 14.1612 14.9485 14.1612H11.0255Z');
  path3.setAttribute('fill', 'white');

  g.appendChild(path1);
  g.appendChild(path2);
  g.appendChild(path3);
  svg.appendChild(g);

  return svg;
}

function createTooltipText(roles) {
  const tooltipText = document.createElement('div');
  tooltipText.style.position = 'absolute';
  tooltipText.style.fontSize = '13px';
  tooltipText.style.fontWeight = '400';
  tooltipText.style.backgroundColor = 'var(--vkui--color_background_tertiary)';
  tooltipText.style.borderRadius = '8px';
  tooltipText.style.border = '2px solid 1px solid var(--vkui--color_separator_primary)';
  tooltipText.style.color = '2px solid 1px solid var(--vkui--color_text_primary)';
  tooltipText.style.padding = '4px 24px';
  tooltipText.style.boxShadow = 'var(--vkui--elevation3)';
  tooltipText.style.zIndex = '999999';

roles.forEach(role => {
    let text;
    switch (role) {
        case 'founder':
            text = '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><rect width="20" height="20" rx="10" fill="url(#paint0_linear_35635_1132)"/><path d="M11.9853 7.37283L14.614 7.63087C15.5287 7.72065 15.8092 8.6348 15.1029 9.23539L13.0449 10.9854L13.8089 13.8362C14.0598 14.7724 13.2814 15.3392 12.5018 14.7757L10.0012 12.9686L7.50063 14.7757C6.72414 15.3369 5.94255 14.7726 6.19348 13.8362L6.95747 10.9854L4.8995 9.23539C4.19024 8.63228 4.46965 7.72106 5.38824 7.63087L8.01645 7.37283L9.17437 4.64137C9.53698 3.78598 10.4656 3.78641 10.828 4.64146L11.9853 7.37283Z" fill="white"/><defs><linearGradient id="paint0_linear_35635_1132" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#70B2FF"/><stop offset="1" stop-color="#5C9CE6"/></linearGradient></defs></svg><div style="margin-left: 8px;">Создатель расширения VK Enhancer</div></div>';
            break;
        case 'dev':
            text = '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="url(#paint0_linear_35635_1242)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.63935 15.1031C3.78688 14.2515 3.78688 12.8706 4.63935 12.0189L6.19473 10.465C6.30756 10.3522 6.34834 10.1873 6.31179 10.032C6.22658 9.67008 6.18151 9.29268 6.18151 8.90475C6.18151 6.19593 8.37945 4 11.0908 4C11.693 4 12.2699 4.10833 12.803 4.30656C13.0793 4.40932 13.1349 4.76017 12.9269 4.96912L11.036 6.86858C10.9546 6.95036 10.9089 7.06105 10.9089 7.17644V8.65467C10.9089 8.89567 11.1043 9.09104 11.3453 9.09104H12.8209C12.9362 9.09104 13.0469 9.04535 13.1287 8.96397L15.0309 7.07085C15.2398 6.86297 15.5905 6.91843 15.6933 7.19461C15.8916 7.72708 16 8.30328 16 8.90475C16 11.6136 13.8021 13.8095 11.0908 13.8095C10.7081 13.8095 10.3356 13.7658 9.97808 13.683C9.82346 13.6472 9.65948 13.688 9.5472 13.8002L7.98473 15.3612C7.13226 16.2129 5.75014 16.2129 4.89767 15.3612L4.63935 15.1031Z" fill="white"/><defs><linearGradient id="paint0_linear_35635_1242" x1="-11.3295" y1="-12.7168" x2="18.3815" y2="17.4567" gradientUnits="userSpaceOnUse"><stop stop-color="#FFB73D"/><stop offset="1" stop-color="#FFA000"/></linearGradient></defs></svg><div style="margin-left: 8px;">Разработчик расширения VK Enhancer</div></div>';
            break;
        case 'designer':
            text = '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="url(#paint0_radial_35635_1237)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.2494 4.7288C11.8594 5.41811 11.7951 6.47143 11.1058 7.08144L9.69121 8.33333H13.83C15.6712 8.33333 16.5343 10.6109 15.1554 11.8311L11.1058 15.4148C10.4165 16.0248 9.3632 15.9605 8.75319 15.2712C8.14317 14.5819 8.20746 13.5286 8.89678 12.9185L10.3114 11.6667H6.17262C4.3314 11.6667 3.46838 9.38911 4.84719 8.16892L8.89678 4.58521C9.58609 3.9752 10.6394 4.03948 11.2494 4.7288Z" fill="white"/><defs><radialGradient id="paint0_radial_35635_1237" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.52601 2.36994) rotate(45.4424) scale(21.173 27.2409)"><stop offset="0.0433247" stop-color="#FFD44C"/><stop offset="0.353531" stop-color="#FF962E"/><stop offset="0.702496" stop-color="#FF5773"/><stop offset="1" stop-color="#FA60A3"/></radialGradient></defs></svg><div style="margin-left: 8px;">Дизайнер расширения VK Enhancer</div></div>';
            break;
        case 'help':
            text = '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <rect width="20" height="20" rx="10" fill="url(#paint0_linear_35635_1261)"/> <path d="M6.2 6.5C6.53137 6.5 6.8 6.76863 6.8 7.1V9.3498C6.8 9.59833 7.00147 9.7998 7.25 9.7998V9.7998C7.49853 9.7998 7.7 9.59833 7.7 9.3498V5.6C7.7 5.26863 7.96863 5 8.3 5V5C8.63137 5 8.9 5.26863 8.9 5.6V8.8498C8.9 9.09833 9.10147 9.2998 9.35 9.2998V9.2998C9.59853 9.2998 9.8 9.09833 9.8 8.8498V4.89981C9.8 4.56843 10.0686 4.2998 10.4 4.2998V4.2998C10.7314 4.2998 11 4.56843 11 4.8998V8.8498C11 9.09833 11.2015 9.2998 11.45 9.2998V9.2998C11.6985 9.2998 11.9 9.09833 11.9 8.8498V5.8998C11.9 5.56843 12.1686 5.2998 12.5 5.2998V5.2998C12.8314 5.2998 13.1 5.56843 13.1 5.8998V11.3698L14.5154 9.80029C14.805 9.47916 15.3045 9.46601 15.6106 9.77146V9.77146C15.8876 10.048 15.9083 10.4895 15.6575 10.7901C15.0449 11.5242 13.9413 12.8469 13.2986 13.6182C12.2472 14.8799 10.7073 15.2999 9.54876 15.2999C5.76833 15.2999 5.6 12.7544 5.6 11.8928L5.6 7.1C5.6 6.76863 5.86863 6.5 6.2 6.5V6.5Z" fill="white"/> <defs> <linearGradient id="paint0_linear_35635_1261" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse"> <stop stop-color="#70B2FF"/> <stop offset="1" stop-color="#5C9CE6"/> </linearGradient> </defs> </svg><div style="margin-left: 8px;">Тестер расширения VK Enhancer</div></div>';
            break;
        case 'old':
            text = '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <rect width="20" height="20" rx="10" fill="url(#paint0_linear_35635_1259)"/> <path d="M9.54691 4.03936C9.5956 4.00469 9.65761 3.99211 9.71676 4.00488C9.82904 4.02913 9.89958 4.13616 9.87432 4.24395L9.87428 4.24394C9.84477 4.36985 9.80783 4.46569 9.76346 4.53147C8.19037 6.86335 8.88126 8.26503 9.94201 8.41565C11.0392 8.57145 11.8417 7.86577 11.67 6.3426C11.6404 6.08032 11.6157 5.85929 11.5958 5.67949C11.5912 5.63709 11.602 5.59444 11.6264 5.55884C11.6846 5.474 11.8035 5.45056 11.8919 5.50647L11.8919 5.50645C12.2484 5.73205 12.6751 6.14228 13.172 6.73714C14.9401 8.85418 15.0092 10.6262 14.9993 11.3883C14.9636 14.1208 12.8566 16 9.99964 16C7.1427 16 5 14.1212 5 11.3883C5.01265 9.31934 6.1013 6.40699 9.10674 4.34818C9.21899 4.27128 9.36571 4.16834 9.54691 4.03936Z" fill="white"/> <defs> <linearGradient id="paint0_linear_35635_1259" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse"> <stop stop-color="#FF5263"/> <stop offset="1" stop-color="#FF3347"/> </linearGradient> </defs> </svg><div style="margin-left: 8px;">Установил VK Enhancer до релиза в магазине Chrome</div></div>';
            break;
        default:
            text = '';
            break;
    }
    tooltipText.insertAdjacentHTML('beforeend', text);
});

  return tooltipText;
}

function appendIcons(roles) {
  const iconsContainer = document.querySelector('.OwnerPageName__icons');
  if (!iconsContainer) return;

  const svg = createSVG();
  const tooltipText = createTooltipText(roles);

  const tooltip = document.createElement('div');
  tooltip.style.opacity = '0';
  tooltip.style.position = 'absolute';
  tooltip.style.transition = 'opacity 0.3s ease';
  tooltip.style.zIndex = '999999';
  tooltip.appendChild(tooltipText);

  svg.addEventListener('mouseenter', function() {
    tooltip.style.opacity = '1';
  });

  svg.addEventListener('mouseleave', function() {
    tooltip.style.opacity = '0';
  });

  iconsContainer.appendChild(svg);
  iconsContainer.appendChild(tooltip);
}

///КОНЕЦ ЗНАЧКОВ В ПРОФИЛЯХ///
///УБРАТЬ AWAY.PHP///
if (localStorage.getItem("removeAway") == "true") {
  const awayHrefs = [
    'a[href^="https://vk.com/away.php"]',
    'a[href^="/away.php"]',
  ];
  document.arrive(awayHrefs, { existing: true }, function (link) {
    const url = new URL(link.href);
    const toParam = url.searchParams.get("to");
    if (toParam) {
      const decodedUrl = decodeURIComponent(toParam);
      link.href = decodedUrl;
    }
  });
}


function removeAway(str) {
  const decodeMap = {};
  const win1251 = new TextDecoder("windows-1251");
  for (let i = 0x00; i <= 0xff; i++) {
    const hex = (i <= 0x0f ? "0" : "") + i.toString(16).toUpperCase();
    decodeMap[hex] = win1251.decode(Uint8Array.from([i]));
  }
  return str.replace(/%([0-9A-F]{2})/g, (match, hex) => decodeMap[hex]);
}
///КОНЕЦ УБРАТЬ AWAY.PHP///
///ДЛЯ НОВОГО ДИЗАЙНА ССЫЛКИ В ЛС ИЗ ПРОФИЛЯ///
if (localStorage.getItem("isNewDesign") === "true") {
  const imHrefs = ['a[href^="/im?sel="]', 'a[href^="https://vk.com/im?sel="]'];
  document.arrive(imHrefs, { existing: true }, function (e) {
    const links = document.querySelectorAll(imHrefs.join(", "));
    links.forEach((link) => {
      const href = link.href;
      let newHref = href;
      if (href.includes("https://vk.com")) {
        newHref = href.replace("https://vk.com", "");
      }
      newHref = newHref.replace(/\/im\?sel=(-?\d+)/, "/im/convo/$1");
      link.href = newHref;
      const onclickValue = link.getAttribute("onclick");
      if (onclickValue && onclickValue.startsWith("return WriteBox.toFull")) {
        link.removeAttribute("onclick");
      }
    });
  });
}
///КОНЕЦ ДЛЯ НОВОГО ДИЗАЙНА ССЫЛКИ В ЛС ИЗ ПРОФИЛЯ///
function backPostReactionsFunc() {
  if (localStorage.getItem("removePostReactions") != "true") {
    const likeBtns = document.querySelectorAll(
      ".PostBottomActionLikeBtns--withBgButtons .like_btns>.PostBottomAction:first-child, .PostBottomActionLikeBtns--withBgButtons .like_btns>.PostBottomActionContainer:first-child"
    );
    likeBtns.forEach(function (element) {
      if (!element.closest("#profile_redesigned")) {
        element.style.paddingRight = `0px`;
      }
    });
    const isDonate = document.querySelector(".PostActionStatusBar__rightInner");
    if (isDonate) {
      const likeTop = document.querySelectorAll(
        ".ReactionsPreview--isInActionStatusBar"
      );
      likeTop.forEach(function (element) {
        if (!element.closest("#profile_redesigned")) {
          element.style.marginTop = `0px`;
        }
      });
    }
    const customStyle = fromId("postReactionsMargin24");
    if (customStyle) {
      customStyle.remove();
    }
  }
}

///ОТПРАВКА ФОТО И ВИДЕО///
/*
document.arrive(".ConvoComposer__inputPanel", { existing: true }, function (e) {
var clmno = document.createElement("a");
clmno.innerHTML = '<div class="PhotoMenuPopper onmouseover="showTooltip(this, { text: '+'Прикрепить фото или видео'+', black: true, shift: [4, 5] });""><div class="PhotoMenuPopper__trigger"><button class="ConvoComposer__button" aria-label="Прикрепить фото или видео"><i role="img" class="ConvoComposer__buttonIcon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.46 3h3.08c.29 0 .53 0 .76.03.7.1 1.35.47 1.8 1.03.25.3.4.64.62.96.2.28.5.46.85.48.3.02.58-.01.88.02a3.9 3.9 0 0 1 3.53 3.53c.02.18.02.37.02.65v4.04c0 1.09 0 1.96-.06 2.66a5.03 5.03 0 0 1-.47 1.92 4.9 4.9 0 0 1-2.15 2.15c-.57.29-1.2.41-1.92.47-.7.06-1.57.06-2.66.06H9.26c-1.09 0-1.96 0-2.66-.06a5.03 5.03 0 0 1-1.92-.47 4.9 4.9 0 0 1-2.15-2.15 5.07 5.07 0 0 1-.47-1.92C2 15.7 2 14.83 2 13.74V9.7c0-.28 0-.47.02-.65a3.9 3.9 0 0 1 3.53-3.53c.3-.03.59 0 .88-.02.34-.02.65-.2.85-.48.21-.32.37-.67.61-.96A2.9 2.9 0 0 1 9.7 3.03c.23-.03.47-.03.76-.03Zm0 1.8-.49.01a1.1 1.1 0 0 0-.69.4c-.2.24-.33.56-.52.82A2.9 2.9 0 0 1 6.54 7.3c-.28.01-.55-.02-.83 0a2.1 2.1 0 0 0-1.9 1.91l-.01.53v3.96c0 1.14 0 1.93.05 2.55.05.62.15.98.29 1.26.3.58.77 1.05 1.35 1.35.28.14.64.24 1.26.29.62.05 1.42.05 2.55.05h5.4c1.13 0 1.93 0 2.55-.05.62-.05.98-.15 1.26-.29a3.1 3.1 0 0 0 1.35-1.35c.14-.28.24-.64.29-1.26.05-.62.05-1.41.05-2.55V9.21a2.1 2.1 0 0 0-1.91-1.9c-.28-.03-.55 0-.83-.01a2.9 2.9 0 0 1-2.22-1.27c-.19-.26-.32-.58-.52-.83a1.1 1.1 0 0 0-.69-.39 3.92 3.92 0 0 0-.49-.01h-3.08Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 9.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm-4.5 2.7a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z" fill="currentColor"></path></svg></i></button></div></div><input aria-label="Прикрепить фото или видео" style="display:none!important;" tabindex="0" id="im_full_upload" class="im-chat-input--attach-file" type="file" size="28" multiple="true" accept="image/jpeg,image/png,image/gif,video/*" name="media"> ';
e.appendChild(clmno);
var inputPhoto = document.getElementById('im_full_upload');
clmno.addEventListener('click', function() {
        inputPhoto.click();
});
inputPhoto.addEventListener('change', function() {
    if (inputPhoto.files.length > 0) {
handleUpload();          
    }
  });

async function handleUpload() {
  const audioFileInput = document.getElementById('im_full_upload');
  const file = audioFileInput.files[0];
  await sendPhotoMessage(file);
}
async function sendPhotoMessage (fileNameOutput) {
  if(fileNameOutput.type.includes('image'))
  {

  }
  if(fileNameOutput.type.includes('video')) {
	
  }
}

async function uploadFile(uploadUrl, fileNameOutput) {
    const formData = new FormData();
    formData.append('file', fileNameOutput);
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error('Upload failed. Status: ' + xhr.status));
            }
        };

        xhr.onerror = function() {
            reject(new Error('Upload failed. Network error'));
        };

        xhr.open('POST', uploadUrl);
        xhr.send(formData);
    });
}
});
*/
///КОНЕЦ ОТПРАВКИ ФОТО И ВИДЕО///
///СКАЧИВАНИЕ ГС///
document.arrive(
  ".AttachVoice",
  {
    existing: true,
  },
  function (e) {
    let styleElement = fromId("vkEnhancerDownloadAudioButtonStyle");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "vkEnhancerDownloadAudioButtonStyle";
      document.head.appendChild(styleElement);
    }
    var bgImageUri = `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'%3E%3Cpath fill='%23447bba' fill-rule='evenodd' d='M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E");`;
    styleElement.innerHTML =
      ".vkEnhancerDownloadAudioButton:hover:before{background:#8fadc880;opacity:1}.vkEnhancerDownloadAudioButton{color:var(--vkui--color_icon_accent);" +
      bgImageUri +
      'background-position: center;background-repeat: no-repeat;isolation: isolate;position: relative; align-items:center; justify-content: center;display: flex;cursor: pointer;border-radius: 100px; margin-left: 6px; margin-right: 4px; order: 3; top: 2px;height: 24px; width: 24px;}.vkEnhancerDownloadAudioButton:before {background: #8fadc84d;color: var(--blue_400);opacity: 1;transition: background-color .14s; border-radius:100px; bottom: 0;content: "";left: 0; position: absolute;right: 0;top: 0;z-index:-1;}';
    let download_name = getLink(document.querySelector(".AttachVoice"))
      .split("/")
      .at(-1);
    let link = getLink(e);
    let fileNameAud = getAudioId(e);
    let download = create(
      "a",
      {},
      {
        href: getLink(e),
        innerHTML: "",
        download: download_name,
        "data-link": link,
      }
    );
    download.classList.add("vkEnhancerDownloadAudioButton");
    download.addEventListener("click", async function (e) {
      e.preventDefault();
      const a = document.createElement("a");
      a.rel = "noopener";
      a.target = "_blank";
      a.download = fileNameAud;
      const a_ = await globalThis.fetch(e.target.href, {
        method: "GET",
      });
      let o = await a_.blob();
      a.href = URL.createObjectURL(o);
      setTimeout(() => {
        URL.revokeObjectURL(o);
      }, 4e4);
      setTimeout(() => {
        const a__ = document.createEvent("MouseEvents");
        a__.initMouseEvent(
          "click",
          !0,
          !0,
          window,
          0,
          0,
          0,
          80,
          20,
          !1,
          !1,
          !1,
          !1,
          0,
          null
        );
        a.dispatchEvent(a__);
      }, 0);
    });
    e.children[0].appendChild(download);
  }
);

function getLink(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactFiber")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  return t.fiber.return.memoizedProps.voice.linkMp3;
}

function getAudioId(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactFiber")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  var o = t.fiber.return.memoizedProps.voice.ownerId;
  var a = t.fiber.return.memoizedProps.voice.id;
  var i = [o, a].join("_");
  return `audio_message${i}.mp3`;
}
///КОНЕЦ СКАЧИВАНИЯ ГС///
///ОТПРАВКА АУДИО КАК ГОЛОСОВОГО///
document.arrive(
  ".VKCOMMessenger__reforgedModalRoot > .MEConfig > .MEPopper > div > .ActionsMenu",
  { existing: true },
  function (e) {
    let styleElement = fromId("MEPopperStyle");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "MEPopperStyle";
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML =
      ".VKCOMMessenger__reforgedModalRoot > .MEConfig > .MEPopper{top:517px!important;}";
    var clmno = document.createElement("a");
    clmno.innerHTML =
      '<button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular AudioMenuPopper"><i class="ActionsMenuAction__icon"><svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--money_transfer_outline_20" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><use xlink:href="#voice_outline_24" style="fill: currentcolor;"></use></svg></i><span class="ActionsMenuAction__title">Голосовое</span></button>';
    var newpanel = document.querySelector(
      ".VKCOMMessenger__reforgedModalRoot > .MEConfig > .MEPopper > div > .ActionsMenu"
    );
    var setElement = document.querySelector(".AudioMenuPopper");
    if (!setElement) {
      newpanel.appendChild(clmno);
    }
    setElement = document.querySelector(".AudioMenuPopper");
    var eventListenerSet = false;
    if (!eventListenerSet) {
      setElement.addEventListener("click", function () {
        var contAudio =
          "Прежде чем загружать аудиосообщение, убедитесь в том, что оно записано не в стерео, а в моно. Иначе оно не будет воспроизводиться в приложении на смартфонах";
        VKEnhancerMessageBox(
          "Внимание!",
          contAudio,
          "Загрузить",
          "Отмена",
          "yes",
          "no",
          function () {
            audioFileInput.click();
          }
        );
      });
      eventListenerSet = true;
    }

    async function VKEnhancerMessageBox(
      title,
      content,
      buttonCont,
      buttonCont2,
      color,
      color2,
      callback
    ) {
      var i = new MessageBox();
      i.addButton(
        buttonCont,
        function () {
          if (callback) {
            callback();
          }
        },
        color
      );
      i.addButton(buttonCont2, !1, color2);
      i.setOptions({
        title: title,
        bodyStyle:
          "overflow: hidden; text-overflow: ellipsis; color: var(--vkenhancer)",
      });
      i.content(content);
      i.show();
      const appendHere = document.querySelector(
        '.box_body[style="overflow: hidden; text-overflow: ellipsis; color: var(--vkenhancer);"]'
      );
      var inputWrap = document.createElement("a");
      inputWrap.innerHTML =
        '<input style="display:none;" type="file" id="audioFileInput" accept="audio/mp3,audio/ogg,audio/wav">';
      appendHere.appendChild(inputWrap);
      const audioFileInput = document.getElementById("audioFileInput");
      audioFileInput.addEventListener("change", function () {
        if (audioFileInput.files.length > 0) {
          handleUpload();
          i.hide();
        }
      });
    }

    async function handleUpload() {
      const audioFileInput = document.getElementById("audioFileInput");
      const file = audioFileInput.files[0];
      await sendAudioMessage(file);
    }
    async function sendAudioMessage(fileNameOutput) {
      /** Получаем URL для загрузки */
      const uploadUrl1 = await vkApi.api("docs.getMessagesUploadServer", {
        peer_id: vk.id,
        type: "audio_message",
      });
      const uploadUrl = uploadUrl1["upload_url"];

      /** Загружаем файл */
      let file = await uploadFile(uploadUrl, fileNameOutput);
      /** Сохраняем */
      const data = JSON.parse(file);
      console.log("[VK ENH] File uploaded: " + data["file"]);
      let doc = await vkApi.api("docs.save", { file: data["file"] });
      doc = doc.audio_message;

      /** Отправляем */
      var peerId = new URL(window.location.href).pathname.split("/").at(-1);
      await vkApi.api("messages.send", {
        peer_id: peerId,
        attachment: `doc${doc.owner_id}_${doc.id}_${doc.access_key}`,
        random_id: Math.floor(Math.random() * 2147483647),
      });
    }

    async function uploadFile(uploadUrl, fileNameOutput) {
      const formData = new FormData();
      formData.append("file", fileNameOutput);
      const xhr = new XMLHttpRequest();
      return new Promise((resolve, reject) => {
        xhr.onload = function () {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(new Error("Upload failed. Status: " + xhr.status));
          }
        };

        xhr.onerror = function () {
          reject(new Error("Upload failed. Network error"));
        };

        xhr.open("POST", uploadUrl);
        xhr.send(formData);
      });
    }
  }
);

///КОНЕЦ ОТПРАВКИ АУДИО КАК ГОЛОСОВОГО///
///МАРГИН ДЛЯ ЛАЙКОВ ПРИ ВЫКЛЮЧЕННЫХ РЕАКЦИЯХ///
if (
  localStorage.getItem("removePostReactions") == "true" ||
  localStorage.getItem("secretFunctions") == "true"
) {
  const wallSel = [".PostActionStatusBar--inPost"];
  document.arrive(wallSel, { existing: true }, function (e) {
    updateMarginLeft();
  });
  document.arrive('.post--withPostBottomAction:not(.post--withActionStatusBar)', { existing: true }, function (e) {
    var postId = e.getAttribute('id');
    var postButton = e.querySelector('.PostBottomAction.PostBottomAction--withBg.PostButtonReactions.PostButtonReactions--post');
    if (postButton) {
        postButton.removeAttribute('onmouseenter');
		postButton.removeAttribute('onkeydown');
        postButton.setAttribute('onmouseover', "Likes.showLikes(this, '" + postId.replace('post', 'wall') + "', {isFromReactionsPreview:1})");
    }
  });
}

function updateMarginLeft() {
  if (
    window.location.href.includes("wall") &&
    (localStorage.getItem("removePostReactions") == "true" ||
      localStorage.getItem("secretFunctions") == "true")
  ) {
    const reactionsPreviewCount = document.querySelector(
      '.ReactionsPreview__count[data-section-ref="like-button-count"]'
    );
    //console.log(reactionsPreviewCount);
    if (reactionsPreviewCount) {
      const textLength = reactionsPreviewCount.textContent.length;
      const newMarginLeft = 12 + (textLength - 1) * 4;
      const likeBtns = document.querySelectorAll(
        ".PostBottomActionLikeBtns--withBgButtons .like_btns>.PostBottomAction:first-child, .PostBottomActionLikeBtns--withBgButtons .like_btns>.PostBottomActionContainer:first-child"
      );
      likeBtns.forEach(function (element) {
        if (!element.closest("#profile_redesigned")) {
          element.style.paddingRight = `${newMarginLeft}px`;
        }
      });
      let styleElement = fromId("postReactionsMargin24");
      if (!styleElement) {
        styleElement = create("style", {}, { id: "postReactionsMargin24" });
        document.head.appendChild(styleElement);
      }
      styleElement.innerHTML = ".ReactionsPreview{margin-left:24px!important;}";
    }
    const isDonate = document.querySelector(".PostActionStatusBar__rightInner");
    if (isDonate) {
      const likeTop = document.querySelectorAll(
        ".ReactionsPreview--isInActionStatusBar"
      );
      likeTop.forEach(function (element) {
        if (!element.closest("#profile_redesigned")) {
          element.style.marginTop = `25px`;
        }
      });
    }
  }
}
///КОНЕЦ МАРГИНА ДЛЯ ЛАЙКОВ ПРИ ВЫКЛЮЧЕННЫХ РЕАКЦИЯХ///
///РЕЗУЛЬТАТЫ ОПРОСА БЕЗ ГОЛОСОВАНИЯ///
if (localStorage.getItem("pollResultsValue") == "true") {
  document.arrive(
    "[class^='PollPrimaryAttachment-module__voting']",
    { existing: true },
    function (e) {
      let styleElement = fromId("PollResultsShow");
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "PollResultsShow";
        document.head.appendChild(styleElement);
      }
      styleElement.innerHTML =
        '.VKEnhancer-module__votingOptionsVoted [class^="PollOptions-module__votingOptionVotes"] { opacity: .4; } .VKEnhancer-module__votingOptionsVoted [class^="PollOptions-module__votingOptionRight"] { opacity: 1; transform: translateX(0);} [class*="PollOptions-module__votingOptionsVoted"] [class^="PollOptions-module__votingOptionRight"]{ margin-right:0px!important;} div:has(>[class^="PollOptions-module__votingOptionCheckboxIcon"]>svg) > [class^="PollOptions-module__votingOptionRight"] {margin-right:28px;} [class*="PollOptions-module__votingOptionsVoted"] [class^="PollOptions-module__votingOptionCheckboxIcon"]{display:none!important;}.VKEnhancer-module__votingOptionsVoted [class^="PollOptions-module__votingOptionFill"] { opacity:.06 } [class*="PollOptions-module__votingOptionsDark"].VKEnhancer-module__votingOptionsVoted [class^="PollOptions-module__votingOptionFill"] { opacity:.12 } ';
      var polls = document.querySelectorAll(
        '[class^="PollOptions-module__votingOptions"]'
      );
      for (var poll of polls) {
        poll.classList.add("VKEnhancer-module__votingOptionsVoted");
      }
      var percentageElements = document.querySelectorAll(
        '[class^="PollOptions-module__votingOptionRight"]'
      );
      percentageElements.forEach(function (element) {
        var percentage = parseFloat(element.textContent.replace("%", ""));
        var parentElement = element.closest(
          '[class^="PollOptions-module__votingOptionWrapper"]'
        );
        var fillElement = parentElement.querySelector(
          '[class^="PollOptions-module__votingOptionFill"]'
        );
        fillElement.style.width = percentage + "%";
      });
    }
  );
}
///КОНЕЦ РЕЗУЛЬТАТОВ ОПРОСА БЕЗ ГОЛОСОВАНИЯ///
document.arrive(".BurgerMenu__actionsMenu", { existing: true }, function (e) {
  var burgerim = document.querySelector(
    ".BurgerMenu__actionsMenu > div > div > div"
  );
  const changeDesign = document.createElement("button");
  changeDesign.classList.add("ActionsMenuAction");
  changeDesign.classList.add("ActionsMenuAction--secondary");
  changeDesign.classList.add("ActionsMenuAction--size-regular");
  const isCentralDesign = localStorage.getItem("isCentralDesign") || "false";
  const newInterfaceSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"><path fill-rule="evenodd" d="M4.01 2.53C4.66 2.18 5.31 2 7.08 2h5.84c1.77 0 2.42.18 3.07.53.64.34 1.14.84 1.48 1.48.35.65.53 1.3.53 3.07v5.84c0 1.77-.18 2.42-.53 3.07A3.57 3.57 0 0116 17.47c-.65.35-1.3.53-3.07.53H7.08c-1.77 0-2.42-.18-3.07-.53A3.57 3.57 0 012.53 16c-.35-.65-.53-1.3-.53-3.07V7.08c0-1.77.18-2.42.53-3.07.34-.64.84-1.14 1.48-1.48zm11.27 13.62c-.34.18-.7.35-2.36.35H9v-13h3.92c1.66 0 2.02.17 2.36.35.38.2.67.5.87.87.18.34.35.7.35 2.36v5.84c0 1.66-.17 2.02-.35 2.36-.2.38-.5.67-.87.87zM7.08 3.5c-1.66 0-2.02.17-2.36.35-.38.2-.67.5-.87.87-.18.34-.35.7-.35 2.36v5.84c0 1.66.17 2.02.35 2.36.2.38.5.67.87.87.34.18.7.35 2.36.35h.42v-13h-.42z"/></svg>';
  const classicInterfaceSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"><path d="M7.08 3.5c-1.66 0-2.02.17-2.36.35-.38.2-.67.5-.87.87-.18.34-.35.7-.35 2.36v5.84c0 1.66.17 2.02.35 2.36.2.38.5.67.87.87.34.18.7.35 2.36.35h5.84c1.66 0 2.02-.17 2.36-.35.38-.2.67-.5.87-.87.18-.34.35-.7.35-2.36V7.08c0-1.66-.17-2.02-.35-2.36-.2-.38-.5-.67-.87-.87-.34-.18-.7-.35-2.36-.35H7.08zm-3.07-.97C4.66 2.18 5.31 2 7.08 2h5.84c1.77 0 2.42.18 3.07.53.64.34 1.14.84 1.48 1.48.35.65.53 1.3.53 3.07v5.84c0 1.77-.18 2.42-.53 3.07A3.57 3.57 0 0116 17.47c-.65.35-1.3.53-3.07.53H7.08c-1.77 0-2.42-.18-3.07-.53A3.57 3.57 0 012.53 16c-.35-.65-.53-1.3-.53-3.07V7.08c0-1.77.18-2.42.53-3.07.34-.64.84-1.14 1.48-1.48z"/><path d="M13.5 11.55a2.15 2.15 0 01-.85 1.8c-.3.23-.64.4-1 .5-.37.1-.83.15-1.4.15H7V6h2.87c.6 0 1.05.02 1.35.07.31.04.6.14.87.28.3.15.51.36.65.62.15.25.22.55.22.89 0 .39-.1.74-.3 1.04-.2.3-.47.53-.82.67v.05c.5.1.9.31 1.2.64.3.31.46.75.46 1.29zm-2.61-3.29a.88.88 0 00-.1-.4.6.6 0 00-.32-.3c-.13-.05-.3-.08-.48-.08l-.82-.01h-.14v1.69h.26l.73-.01c.14 0 .29-.05.43-.11a.65.65 0 00.34-.32c.06-.13.1-.28.1-.46zm.5 3.25a.97.97 0 00-.14-.58.93.93 0 00-.46-.31c-.13-.05-.3-.08-.52-.08l-.86-.01h-.38v2H10.24c.2-.01.41-.06.62-.15a.8.8 0 00.4-.35c.1-.15.14-.32.14-.52z"/></svg>';
  const designText =
    isCentralDesign === "true" ? "Новый интерфейс" : "Классический интерфейс";
  const designSVG =
    isCentralDesign === "true" ? newInterfaceSVG : classicInterfaceSVG;
  changeDesign.innerHTML = `<i class="ActionsMenuAction__icon">${designSVG}</i><span class="ActionsMenuAction__title">${designText}</span>`;
  burgerim.appendChild(changeDesign);
  /*if(isCentralDesign == "true") {
  document.querySelector('.ActionsMenuAction:has(>i>svg.vkuiIcon--gear_outline_20)').addEventListener("click", function () {
    window.location.href = '/im/settings';
  });
  }*/
  changeDesign.addEventListener("click", function () {
    const currentValue = localStorage.getItem("isCentralDesign") === "true";
    localStorage.setItem("isCentralDesign", currentValue ? "false" : "true");
    location.reload();
  });
});
//console.log(localStorage.getItem("isCentralDesign"));
///НАЧАЛО ЦЕНТРАЛЬНОГО ДИЗАЙНА///

if (!im.test(window.location.href)) {
  let styleElement = fromId("rightBarClassicRemove");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "rightBarClassicRemove";
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = ".MainRightRoot{display:none;}";
} else {
  const customStyle = fromId("rightBarClassicRemove");
  if (customStyle) {
    customStyle.remove();
  }
}

deferredCallback(
  () => {
    if (
      JSON.parse(localStorage.getItem("isCentralDesign")) &&
      JSON.parse(localStorage.getItem("isVKMReforgedDesign"))
    ) {
      //console.log("Classical design activated");
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.type = "text/css";
      cssLink.href = urls["im_css"];

      document.head.appendChild(cssLink);
      function addConvoItem(title, href, primary, unread, muted) {
        let newElement = document.createElement("div");

        if (!primary) {
          newElement.innerHTML = `<a class="ARightRoot1 ARightRoot2 ARightRoot3 ARightRoot4 ARightRoot5 ARightRoot6" href="${href}"><span class="SpanTextRightRoot"><span class="spanPseudoText"><span class="spanPseudoText1 vkenhancerInternalCasper__text">${title}</span><div></div></span></span><i class="Y8xaRbiBmSsC_Tpc"><span class="vkuiTypography--GPQtx vkuiTypography--normalize--vH74W vkuiInternalCounter vkuiCounter--OFQXo vkuiCounter--mode-secondary--NgDxW vkuiCounter--size-s--bEhhU unreadRightCounter vkuiCaption--level-1--Wnyxa" data-muted="${muted}" data-unread="${
            unread ? true : false
          }">${unread}</span><svg aria-hidden="true" display="block" color="var(--vkui--color_icon_secondary)" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20 cancelButton" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06"></path></svg></i></a>`;
        } else {
          newElement.innerHTML = `<div data-simplebar="init" style="max-height: 749.5px;" class=""><div class="simplebar-wrapper" style="margin: 0px;"><div class="simplebar-height-auto-observer-wrapper"><div class="simplebar-height-auto-observer"></div></div><div class="simplebar-mask"><div class="simplebar-offset" style="right: 0px; bottom: 0px;"><div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" style="height: auto; overflow: hidden;"><div class="simplebar-content" style="padding: 0px;"><div role="separator" class="F2l1IgGrOaY823Rc"></div><a class="ARightRoot1 ARightRoot2 ARightRoot3 ARightRoot4 ARightRoot5 ARightRoot6" href="${href}"><span class="SpanTextRightRoot"><span class="spanPseudoText"><span class="spanPseudoText1 vkenhancerInternalCasper__text">${title}</span><div></div></span></span><i class="Y8xaRbiBmSsC_Tpc"><span class="vkuiTypography--GPQtx vkuiTypography--normalize--vH74W vkuiInternalCounter vkuiCounter--OFQXo vkuiCounter--mode-secondary--NgDxW vkuiCounter--size-s--bEhhU unreadRightCounter vkuiCaption--level-1--Wnyxa " data-muted="${muted}" data-unread="${
            unread ? true : false
          }">${unread}</span><svg aria-hidden="true" display="block" color="var(--vkui--color_icon_secondary)" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20 cancelButton" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06"></path></svg></i></a></div></div></div></div></div><div class="simplebar-track jDJiKDg_3kqgM68F simplebar-horizontal" style="visibility: hidden;"><div class="simplebar-scrollbar" style="width: 0px; display: none;"></div></div><div class="simplebar-track jDJiKDg_3kqgM68F simplebar-vertical" style="visibility: hidden;"><div class="simplebar-scrollbar" style="height: 0px; display: none;"></div></div></div>`;
        }

        return newElement;
      }

      function removeFromConvoHistory(href) {
        const convoHistory =
          JSON.parse(localStorage.getItem("convo_history")) || [];
        const index = convoHistory.findIndex((item) => item.href === href);
        if (index !== -1) {
          convoHistory.splice(index, 1);
          localStorage.setItem("convo_history", JSON.stringify(convoHistory));
        }
      }

      function closeButtons() {
        const cancelButtons = document.querySelectorAll(".cancelButton");
        cancelButtons.forEach(function (cancelButton) {
          cancelButton.addEventListener("click", function (event) {
            event.preventDefault();
            const parentLink = cancelButton.closest("a");
            const href = parentLink.getAttribute("href");
            const simplebarContent =
              document.querySelector(".simplebar-content");
            if (parentLink) {
              parentLink.removeAttribute("href");
              parentLink.remove();
              removeFromConvoHistory(href);
            }
            if (simplebarContent) {
              const remainingItems = document.querySelectorAll(".ARightRoot6");
              if (remainingItems.length === 0) {
                simplebarContent.remove();
              }
            }
            if (window.location.href.includes(href)) {
              window.nav.go({ ...window.nav.objLoc, 0: "im" });
            }
          });
        });
      }

      document.arrive(
        ".ConvoHeader__infoContainer",
        { existing: true },
        async function (e) {
          // Проверяем, существует ли элемент div с классом simplebar-content
          var simplebarContentDiv =
            document.querySelector(".simplebar-content");
          var ConvoTitle__title = document.querySelector(
            ".ConvoHeader__infoContainer >.ConvoTitle > .ConvoTitle__title"
          ).textContent;
          var ConvoUrl = new URL(window.location.href);
          var ConvoHref = ConvoUrl.pathname;

          // Создаем новый элемент

          let history = JSON.parse(localStorage.getItem("convo_history")) ?? [];
          let convo = { name: ConvoTitle__title, href: ConvoHref };
          history.find((e) => e.href === ConvoHref)
            ? null
            : (history.push(convo),
              localStorage.setItem("convo_history", JSON.stringify(history)));
          let convo_other = Array.from(
            document.querySelectorAll("a.ARightRoot1")
          ).find((e) => e.href === ConvoUrl.href);
          let ids = "";
          history.forEach((e) => (ids += e.href.split("/").at(-1) + ","));
          ids = ids.slice(0, -1);
          let obj = ids
            ? await vkApi.api("messages.getConversationsById", {
                peer_ids: ids,
              })
            : null;
          let id = ConvoUrl.href.split("/").at(-1);
          if (id.includes("?")) {
            var match = ConvoUrl.pathname.match(/\/(\d+)$/);
            id = match[1];
            convo_other = Array.from(
              document.querySelectorAll("a.ARightRoot1")
            ).find((e) => e.href === `https://vk.com/im/convo/${id}`);
          }
          let user = obj.items.find((e) => e.peer.id == id);
          let unread = user.unread_count ? user.unread_count : 0;
          let muted = user?.push_settings?.no_sound ? true : false;
          if (!convo_other) {
            if (!simplebarContentDiv) {
              // Если элемент .simplebar-content не существует, добавляем новый элемент внутрь элемента section с классом vkenhancer--right-section
              var sectionElement = document.querySelector(
                "section.vkenhancer--right-section"
              );
              try {
                sectionElement.appendChild(
                  addConvoItem(
                    ConvoTitle__title,
                    ConvoHref,
                    true,
                    unread,
                    muted
                  )
                );
              } catch (error) {
                location.reload;
              }
              closeButtons();
              checkPickerOfIm();
            } else {
              simplebarContentDiv.appendChild(
                addConvoItem(ConvoTitle__title, ConvoHref, false, unread, muted)
              );
              closeButtons();
              checkPickerOfIm();
            }
          }
          deferredCallback(
            () => {
              MECommonContext.then((e) => {
                e.store.subscribe((e) => {
                  history =
                    JSON.parse(localStorage.getItem("convo_history")) ?? [];
                  let allhistory = e.convos;
                  for (let item of history) {
                    let id = Number(item.href.split("/").at(-1));
                    let user = allhistory.get(id);
                    if (user) {
                      let elem = Array.from(
                        document.querySelectorAll("a.ARightRoot1")
                      ).find((e) => e.href.indexOf(id) !== -1);
                      if (!elem) return;
                      let user_elem = elem.querySelector("i > span");
                      user_elem.dataset.muted = user.push.mode !== "everything";
                      user_elem.dataset.unread =
                        user.unreadCount > 0 ? true : false;
                      user_elem.innerText = user.unreadCount;
                    }
                  }
                });
              });
            },
            { variable: "MECommonContext" }
          );
          const convoHeader = document.querySelector(".ConvoHeader");
          // Создаем элемент div
          const backButtonDiv = document.createElement("a");
          backButtonDiv.classList.add("iconBackChats");
          backButtonDiv.classList.add("ConvoHeader__back");
          backButtonDiv.setAttribute("aria-describedby", ":r0:");
          backButtonDiv.href = "/im";
          // Создаем элемент SVG
          const svgElement = document.createElement("svg");
          svgElement.innerHTML =
            '<svg aria-hidden="true" display="block" aria-label="Назад" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-16 vkuiIcon--h-24 vkuiIcon--chevron_compact_left_24" viewBox="0 0 16 24" width="16" height="24" style="width: 16px; height: 24px;"><path fill="currentColor" d="M11.293 7.706a1 1 0 0 0 0-1.412l-.088-.088a.997.997 0 0 0-1.414.002l-5.084 5.084a1 1 0 0 0 0 1.416l5.084 5.084c.39.391 1.026.39 1.414.002l.088-.088a.995.995 0 0 0 0-1.412L7 12z"></path></svg>';

          // Добавляем SVG-элемент в div с классом backButtonDiv
          backButtonDiv.appendChild(svgElement);

          // Добавляем SVG-элемент в div с классом ConvoHeader
          convoHeader.prepend(backButtonDiv);
          convoHeader.classList.add("ConvoHeader__backButtonAvailable");
        }
      );

      document.arrive(
        "#spa_root > .vkui__root:not(.VKCOMMessenger__reforgedRoot--settingsScreen)",
        { existing: false, fireOnAttributesModification: true },
        async function (e) {
          var currentPageURL12 = window.location.href;

          // Проверяем, содержит ли текущий адрес страницы '/convo/'
          if (currentPageURL12.includes("/convo/")) {
            let styleElement = fromId("MEApp__mainPanel1234");
            if (!styleElement) {
              styleElement = create(
                "style",
                {},
                { id: "MEApp__mainPanel1234" }
              );
              document.head.appendChild(styleElement);
            }
            styleElement.innerHTML = ".MEApp__mainPanel {display:none;}";
          }

          const vkuiRoot = e;

          const currentURL = window.location.href;
          // Создаем элемент div
          const container = document.createElement("div");

          // Добавляем классы к элементу
          container.classList.add("MainRightRoot");
          container.classList.add("vkui__root");
          container.classList.add("vkui__root--embedded");
          container.classList.add("vkui--vkIOS--light");
          container.classList.add("vkui--sizeX-none");
          container.classList.add("vkui--sizeY-none");

          // Создаем вложенный div
          const nestedDiv = document.createElement("div");
          nestedDiv.classList.add("SecondaryRightRoot");
          nestedDiv.classList.add("vkuiAppRoot--wGiqT");
          nestedDiv.classList.add("vkuiAppRoot--pointer-none--qVNj5");
          nestedDiv.classList.add("SecondaryRightRoot1");

          // Создаем секцию
          const section = document.createElement("section");
          section.classList.add("vkuiInternalGroup");
          section.classList.add("vkuiGroup--H9z2H");
          section.classList.add("vkuiGroup--sizeX-none--N5LBL");
          section.classList.add("vkuiInternalGroup--sizeX-none");
          section.classList.add("vkuiGroup--mode-none--grX74");
          section.classList.add("vkuiInternalGroup--mode-none");
          section.classList.add("vkuiGroup--padding-m--JoaTI");
          section.classList.add("vkenhancer--right-section");
          // Создаем ссылки
          const linkAllChats = document.createElement("a");
          linkAllChats.classList.add("ARightRoot1");
          linkAllChats.classList.add("ARightRoot2");
          linkAllChats.classList.add("ARightRoot3");
          linkAllChats.classList.add("ARightRoot4");
          //linkAllChats.classList.add('isChosen');
          linkAllChats.classList.add("ARightRoot5");
          linkAllChats.href = "/im";

          const spanAllChats = document.createElement("span");
          spanAllChats.classList.add("SpanTextRightRoot");
          spanAllChats.textContent = "Все чаты";

          // Добавляем элементы в DOM
          linkAllChats.appendChild(spanAllChats);
          section.appendChild(linkAllChats);

          const linkArchive = document.createElement("a");
          linkArchive.classList.add("ARightRoot1");
          linkArchive.classList.add("ARightRoot2");
          linkArchive.classList.add("ARightRoot3");
          linkArchive.classList.add("ARightRoot4");
          linkArchive.classList.add("ARightRoot5");
          linkArchive.href = "/im/?tab=archive";

          const spanArchiveChats = document.createElement("span");
          spanArchiveChats.classList.add("SpanTextRightRoot");
          spanArchiveChats.textContent = "Архив";

          linkArchive.appendChild(spanArchiveChats);

          section.appendChild(linkArchive);

          container.appendChild(nestedDiv);
          nestedDiv.appendChild(section);

          // Добавляем созданный элемент в DOM
          vkuiRoot.appendChild(container);

          let simplebarContentDiv =
            document.querySelector(".simplebar-content");
          let history = JSON.parse(localStorage.getItem("convo_history")) ?? [];
          let ids = "";
          history.forEach((e) => (ids += e.href.split("/").at(-1) + ","));
          ids = ids.slice(0, -1);
          let obj = ids
            ? await vkApi.api("messages.getConversationsById", {
                peer_ids: ids,
              })
            : null;
          deferredCallback(
            () => {
              MECommonContext.then((e) => {
                e.store.subscribe((e) => {
                  history =
                    JSON.parse(localStorage.getItem("convo_history")) ?? [];
                  let allhistory = e.convos;
                  for (let item of history) {
                    let id = Number(item.href.split("/").at(-1));
                    let user = allhistory.get(id);
                    if (user) {
                      let elem = Array.from(
                        document.querySelectorAll("a.ARightRoot1")
                      ).find((e) => e.href.indexOf(id) !== -1);
                      if (!elem) return;
                      let user_elem = elem.querySelector("i > span");
                      user_elem.dataset.muted = user.push.mode !== "everything";
                      user_elem.dataset.unread =
                        user.unreadCount > 0 ? true : false;
                      user_elem.innerText = user.unreadCount;
                    }
                  }
                });
              });
            },
            { variable: "MECommonContext" }
          );

          for (let item of history) {
            let id = item.href.split("/").at(-1);
            let user = obj.items.find((e) => e.peer.id == id);
            let unread = user.unread_count ? user.unread_count : 0;
            let muted = user?.push_settings?.no_sound ? true : false;
            simplebarContentDiv = document.querySelector(".simplebar-content");
            if (!simplebarContentDiv) {
              // Если элемент .simplebar-content не существует, добавляем новый элемент внутрь элемента section с классом vkenhancer--right-section
              var sectionElement = document.querySelector(
                "section.vkenhancer--right-section"
              );

              sectionElement.appendChild(
                addConvoItem(item.name, item.href, true, unread, muted)
              );
              closeButtons();
              checkPickerOfIm();
            } else {
              simplebarContentDiv.appendChild(
                addConvoItem(item.name, item.href, false, unread, muted)
              );
              closeButtons();
              checkPickerOfIm();
            }
          }
        }
      );
    } else {
      localStorage.setItem("isCentralDesign", "false");
    }
  },
  { variable: "urls" }
);
/// КОНЕЦ ЦЕНТРАЛЬНОГО ДИЗАЙНА///
document.arrive(
  ".ConvoComposer__inputWrapper",
  { existing: true },
  function (e) {
    //console.log(globalThis.HotBarAppearVAL);
    const container = document.querySelector(".ConvoMain__composer");
    if (container && document.getElementById("vkenhancerEmojiHotbarID")) {
      const emojiHotbar = document.getElementById("vkenhancerEmojiHotbarID");
      const lastDiv = container.lastElementChild;
      if (lastDiv && lastDiv !== emojiHotbar) {
        container.removeChild(emojiHotbar);
        container.appendChild(emojiHotbar);
      }
    }
    HotBarAppear(globalThis.HotBarAppearVAL);
  }
);
document.arrive(
  ".ConvoMain__composer .ComposerSelecting",
  { existing: true },
  function (e) {
    const container = document.querySelector(".ConvoMain__composer");
    if (container && document.getElementById("vkenhancerEmojiHotbarID")) {
      const emojiHotbar = document.getElementById("vkenhancerEmojiHotbarID");
      const lastDiv = container.lastElementChild;
      if (lastDiv && lastDiv !== emojiHotbar) {
        container.removeChild(emojiHotbar);
        container.appendChild(emojiHotbar);
      }
    }
  }
);
deferredCallback(
  (_vk) => {
    nav.subscribeOnModuleEvaluated(() => {
      window.dispatchEvent(new CustomEvent("vkNav"));
      if (!im.test(window.location.href)) {
        let styleElement = fromId("rightBarClassicRemove");
        if (!styleElement) {
          styleElement = document.createElement("style");
          styleElement.id = "rightBarClassicRemove";
          document.head.appendChild(styleElement);
        }
        styleElement.innerHTML = ".MainRightRoot{display:none;}";
      } else {
        const customStyle = fromId("rightBarClassicRemove");
        if (customStyle) {
          customStyle.remove();
        }
      }
      var currentPageURL = window.location.href;

      // Проверяем, содержит ли текущий адрес страницы '/convo/'
      if (
        currentPageURL.includes("/convo/") &&
        localStorage.getItem("isCentralDesign") == "true"
      ) {
        let styleElement = fromId("MEApp__mainPanel1234");
        if (!styleElement) {
          styleElement = create("style", {}, { id: "MEApp__mainPanel1234" });
          document.head.appendChild(styleElement);
        }
        styleElement.innerHTML = ".MEApp__mainPanel {display:none;}";
      } else {
        const customStyle = fromId("MEApp__mainPanel1234");
        if (customStyle) {
          customStyle.remove();
        }
      }
      checkPickerOfIm();
      if (
        currentPageURL.includes("/im/settings") &&
        localStorage.getItem("isCentralDesign") == "true"
      ) {
        let styleElement = fromId("settingsRightRoot");
        if (!styleElement) {
          styleElement = document.createElement("style");
          styleElement.id = "settingsRightRoot";
          document.head.appendChild(styleElement);
        }
        styleElement.innerHTML = ".MainRightRoot{display:none;}";
      } else {
        const customStyle = fromId("settingsRightRoot");
        if (customStyle) {
          customStyle.remove();
        }
      }
	  //updateUsers();
      //updateMarginLeft();
    });
  },
  { variable: "nav" }
);

function checkPickerOfIm() {
  const currentPath = window.location.href;
  const links = document.querySelectorAll("a.ARightRoot5");
  let styleElement = fromId("aHoverRightRoot");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "aHoverRightRoot";
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "a.ARightRoot1:hover{background-color:var(--vkui--vkontakte_background_hover_alpha)!important;}";

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (currentPath.includes(href)) {
      link.style.backgroundColor =
        "var(--vkui--vkontakte_background_hover_alpha)";
    } else {
      link.style.backgroundColor = "transparent";
    }
    if (currentPath != "https://vk.com/im") {
      links[0].style.backgroundColor = "transparent";
    }
  });
}

function newDesign() {
  localStorage.setItem("isNewDesign", true);
  return new Promise((resolve, reject) => {
    let url = window.location.href;
    if (im.test(url)) {
      const e = document.querySelector(".body_im #wrap3");
      if (e) for (const t of e.childNodes) e.removeChild(t);
      if (
        new URL(window.location.href).searchParams.get("sel") ||
        new URL(window.location.href).searchParams.get("peers")
      ) {
        console.log(new URL(window.location.href).searchParams);
        const t = { ...window.nav.objLoc };
        window.location.href = "/im";
      }
    }
    newDesignFunctions.forEach((flag) => {
      window.vk.pe[flag] = 1;
    });
    window.vk.pe.vkm_integration_media_viewer = intMedia ? 1 : 0;
    window.vk.pe.vkm_reforged_in_vkcom = 1;
    window.vk.pe.me_vkcom_api_feature_flags = 1;
    window.vk.pe.vkm_hide_forward_author = 1;
    window.vk.pe.vkm_theme_styles_settings = 1;
    localStorage.setItem("isVKMReforgedDesign", true);

    window.MECommonContext &&
      window.MECommonContext.then((e) => {
        if (e.store.featureFlags) {
          newDesignFunctions.forEach((flag) => {
            e.store.featureFlags[flag] = true;
          });
          e.store.featureFlags["vkm_integration_media_viewer"] = intMedia;
          resolve(true);
          //console.log("Injection completed. Feature flags are set to true");
        } else {
          console.error("Feature flags object is not available");
        }
      }).catch((error) => {
        console.error("Error while setting feature flags:", error);
      });
  });
}
function HotBarAppear(cHotBarValue) {
  if (!cHotBarValue) return;
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
      HotBarAppear(globalThis.HotBarAppearVAL);
      return;
    });
    try {
      chatInputContainer[0].appendChild(hotbarDiv);
    } catch (error) {}
  }
}
function OldDesign() {
  localStorage.setItem("isNewDesign", false);
  deferredCallback(
    (_vk) => {
      newDesignFunctions.forEach((flag) => {
        _vk.pe[flag] = 0;
        1;
      });
      _vk.pe.vkm_reforged_in_vkcom = 0;
      _vk.pe.me_vkcom_api_feature_flags = 0;
      _vk.pe.vkm_integration_media_viewer = 0;
      _vk.pe.vkm_hide_forward_author = 0;
      _vk.pe.vkm_integration_media_viewer = 0;
      _vk.pe.vkm_theme_styles_settings = 0;
      localStorage.setItem("isVKMReforgedDesign", false);
      //console.log("Injection completed. vk.pe flags are set to 0");
    },
    { variable: "vk" }
  );
  deferredCallback(
    (_MECommonContext) => {
      _MECommonContext
        .then((e) => {
          if (e.store.featureFlags) {
            newDesignFunctions.forEach((flag) => {
              e.store.featureFlags[flag] = false;
            });
            e.store.featureFlags["vkm_integration_media_viewer"] = false;
          } else {
            console.error("Feature flags object is not available");
          }
        })
        .catch((error) => {
          console.error("Error while setting feature flags:", error);
        });
    },
    { variable: "MECommonContext" }
  );
}
function MuteCalls() {
  Calls.isIncomingModalHidden = true;
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
function deferredCallback(callback, opt) {
  let { variable, element } = opt;
  let updated = variable ? window[variable] : document.querySelector(element);
  if (!updated) {
    setTimeout(() => {
      deferredCallback(callback, opt);
    }, 10);
  } else {
    callback(updated);
  }
}
