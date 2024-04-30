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

function getLocalValue(item) {
  let store = localStorage.getItem(item);
  return store !== "undefined" && JSON.parse(store)
}


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

/*deferredCallback(
    () => {
        MECommonContext.then((e) => {
            if (e.store.featureFlags) {
                newDesignFunctions.forEach((flag) => {
                    e.store.dispatch({
                        type: "UserChangedBubblesTheme",
                        value: "disabled"
                    });
                });
                console.log("UserChangedBubblesTheme is set to true");
            } else {
                console.error("Dispatch is not available");
            }
        });
    }, {
        variable: "MECommonContext"
});*/

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
                return new Promise(() => { });
              }
              if (e === "messages.setActivity" && nepisalkaValue) {
                return new Promise(() => { });
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
	  localStorage.setItem("isNewDesign", false);
      //console.info("[VK ENH] Messenger injection disabled.");
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
      } catch (error) { }
      break;
    }
    case "backPostReactions": {
      localStorage.setItem("removePostReactions", false);
      try {
        backPostReactionsFunc();
      } catch (error) { }
      break;
    }
    case "secretFunctionsEnabled": {
      localStorage.setItem("secretFunctions", true);
      try {
        updateMarginLeft();
      } catch (error) { }
      break;
    }
    case "secretFunctionsDisabled": {
      localStorage.setItem("secretFunctions", false);
      try {
        backPostReactionsFunc();
      } catch (error) { }
      break;
    }
    case "removeAway": {
      localStorage.setItem("removeAway", event.data.value);
      break;
    }
    case "newProfiles": {
      localStorage.setItem("isClassicalProfileDesign", event.data.value);
      break;
    }
    case "middleName": {
      localStorage.setItem("isMiddleName", event.data.value);
      break;
    }
    case "oldHover": {
      localStorage.setItem("isOldHover", event.data.value);
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

document.arrive(".OwnerPageName__icons", { existing: true }, function (e) {
  updateUsers();
});
///НАЧАЛО ДОБАВЛЕНИЯ ОТЧЕСТВА///
if (getLocalValue("isMiddleName")) {
  document.arrive("#owner_page_name", { existing: true }, async function (e) {
    let styleElement = fromId("vken_expand_username");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "vken_expand_username";
      styleElement.innerHTML = `.OwnerPageName{width:300px!important;max-width:300px!important;}`;
      document.head.appendChild(styleElement);
    }
    styleElement.id = "vken_expand_username";
    let objectId = await getId();
    let userDataMiddle = await getUserMiddleName(objectId);
    if (userDataMiddle[0].nickname && userDataMiddle[0].nickname !== "") {
      let ownerNameElement = document.querySelector(".OwnerPageName");
      let ownerName = ownerNameElement.firstChild.textContent.trim();
      let nickname = userDataMiddle[0].nickname.trim();

      if (ownerName.includes(" ")) {
        let lastNameIndex = ownerName.lastIndexOf(" ");
        let firstName = ownerName.substring(0, lastNameIndex);
        let lastName = ownerName.substring(lastNameIndex + 1);
        ownerNameElement.firstChild.textContent = `${firstName} ${nickname} ${lastName}`;
      } else {
		let antiIcons = document.querySelector('.OwnerPageName__noWrapText');
		if(antiIcons) {
			let antiIconsText = antiIcons.textContent.trim();
			let lastNameIndex = antiIconsText.lastIndexOf(" ");
			let firstName = antiIconsText.substring(0, lastNameIndex);
			let lastName = antiIconsText.substring(lastNameIndex + 1);
			if(antiIcons.textContent.trim().includes(" ")) {
				antiIcons.textContent = '';
				ownerNameElement.firstChild.textContent = `${firstName} ${nickname} ${lastName}`;
			}
			else { 
				ownerNameElement.firstChild.textContent += ` ${nickname} ​`;	
			}
		}
		else {
			ownerNameElement.firstChild.textContent += ` ${nickname} ​`;		
		}
      }
    }
  });

  async function getUserMiddleName(objectId) {
    try {
      var response = await vkApi.api("users.get", {
        user_ids: objectId,
        fields: "nickname",
      });
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function getId() {
    const url = window.location.href;
    var parts = url.split("/");
    var username = parts[parts.length - 1];
    if (username.includes("?")) {
      username = username.split("?")[0];
    }
    const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
    try {
      const response = await fetch(url1);
      const data = await response.json();
      return data.response.object_id;
    } catch (error) {
      console.error(error);
      return 1;
    }
  }
} else {
  const customStyle = document.getElementById("vken_expand_username");
  if (customStyle) {
    customStyle.remove();
  }
}
///КОНЕЦ ДОБАВЛЕНИЯ ОТЧЕСТВА///
///НАЧАЛО КЛАССИЧЕСКОГО ДИЗАЙНА ПРОФИЛЯ///
deferredCallback(
  () => {
    if (
      getLocalValue("isClassicalProfileDesign")
    ) {
      const cssLinkClassic = document.createElement("link");
      cssLinkClassic.rel = "stylesheet";
      cssLinkClassic.type = "text/css";
      cssLinkClassic.href = urls["profile_css"];

      document.head.appendChild(cssLinkClassic);
      document.arrive(
        "#profile_redesigned",
        { existing: true },
        async function (e) {
          try {
            let styleElement = fromId("vken_box_message_classic");
            if (!styleElement) {
              styleElement = document.createElement("style");
              styleElement.id = "vken_box_message_classic";
              document.head.appendChild(styleElement);
            }
            styleElement.id = "vken_box_message_classic";
            styleElement.innerHTML =
              `.ProfileHeaderButton > button:has(> span > span > svg.vkuiIcon--user_check_outline_20) > span:before{content:"` +
              getLang("global_friends") +
              `"}.ProfileHeaderButton>a:has(>span>span>svg.vkuiIcon--message_outline_20) > span:before,.ProfileHeaderButton >a[href*="/im"] >span:before{content: "` +
              getLang("profile_send_msg") +
              `"}`;
            var objectId1 = await getId();
            var userData = await getUserData(objectId1);
			if(!userData[0].hidden) {
				var photoUrl = userData[0].photo_200;
			}
            var activityText = userData[0].activity;
            appendActivityText(activityText);
			await appearStarts(userData);
			if(!userData[0].blacklisted == 1 && !userData[0].deactivated && !userData[0].is_service && !userData[0].hidden){
				const customStyle = fromId("classicalProfilesDELETED");
				if (customStyle) {
					customStyle.remove();
				}
				const customStyle1 = fromId("classicalProfilesBlackListed");
				if (customStyle1) {
					customStyle1.remove();
				}
				const customStyle2 = fromId("classicalProfilesDeactivated");
				if (customStyle2) {
					customStyle2.remove();
				}
				const customStyle3 = fromId("classicalProfilesService");
				if (customStyle3) {
					customStyle3.remove();
				}
				const customStyle4 = fromId("classicalProfilesHidden");
				if (customStyle4) {
					customStyle4.remove();
				}
				addCounters(userData[0], userData[0].counters);
				appearVariable();
				if (userData[0].can_write_private_message === 0) {
					buttonrun();
				}
				expandMore(userData);
			}
			else {
				let pMoreInfo = document.querySelector('.profile_more_info');
					pMoreInfo.style.display = 'none';
				let styleElement = fromId("classicalProfilesDELETED");
				if (!styleElement) {
					styleElement = create("style", {}, { id: "classicalProfilesDELETED" });
					document.head.appendChild(styleElement);
				}
				styleElement.innerHTML = ".vkuiInternalGroup:has(>.PlaceholderMessageBlock) {display: none !important;}";
				let pInfoShort = document.querySelector('.profile_info.profile_info_short');
				let pModuleText = document.querySelector('.vkuiInternalGroup:has(>.PlaceholderMessageBlock) [class^="Placeholder-module__text"]').innerHTML;
				let pModuleDiv = document.createElement('div');
				let pModuleSpan = document.createElement('span');
				pModuleSpan.innerHTML = pModuleText;
				pModuleDiv.classList.add("vkEnhancerOffProfile");
				pModuleDiv.style.display = "flex";
				pModuleDiv.style.justifyContent = "center";
				pModuleDiv.style.width = "100%";
				pModuleSpan.classList.add("vkEnhancerOffProfile__in");
				pModuleSpan.style.padding = "32px 32px";
				pModuleSpan.style.fontSize = "14px";
				pModuleSpan.style.lineHeight = "18px";
				pModuleSpan.style.fontWeight = "400";
				pModuleSpan.style.textAlign = "center";
				pModuleSpan.style.color = "var(--vkui--color_text_secondary)";
				pModuleDiv.appendChild(pModuleSpan);
				pInfoShort.appendChild(pModuleDiv);
				if(userData[0].blacklisted == 1 && !userData[0].deactivated) {
					let styleElement = fromId("classicalProfilesBlackListed");
					if (!styleElement) {
						styleElement = create("style", {}, { id: "classicalProfilesBlackListed" });
						document.head.appendChild(styleElement);
					}
				styleElement.innerHTML = ".ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:280px!important;}.ProfileHeaderActions__buttons:not(:has(>.ProfileHeaderButton a[href='/edit'])){top:230px!important;}div.ProfileHeaderActions__moreButtonContainer > div > button > span.vkuiButton__in{width:100%!important}div.ProfileHeaderActions__moreButtonContainer > div > button > span.vkuiButton__in > span{display:block!important}div.ProfileHeaderActions__moreButtonContainer > div > button > span{background:none!important;}.ProfileHeaderActions__moreButtonContainer {margin-left:0px; !important;} div.ProfileHeaderActions__moreButtonContainer > div > button {min-width:206px!important;}";
				}
				if(userData[0].deactivated) {
					let styleElement = fromId("classicalProfilesDeactivated");
					if (!styleElement) {
						styleElement = create("style", {}, { id: "classicalProfilesDeactivated" });
						document.head.appendChild(styleElement);
					}
				styleElement.innerHTML = ".ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:234px!important;}.ProfileHeaderActions__buttons:not(:has(>.ProfileHeaderButton a[href='/edit'])){display:none!important}";
				}
				if(userData[0].is_service) {
					addCounters(userData[0], userData[0].counters);
					let styleElement = fromId("classicalProfilesService");
					if (!styleElement) {
						styleElement = create("style", {}, { id: "classicalProfilesService" });
						document.head.appendChild(styleElement);
					}
				styleElement.innerHTML = ".page_current_info.current_text{border-bottom:none!important;}.ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:234px!important;}";
				}
				if(userData[0].hidden) {
					let styleElement = fromId("classicalProfilesHidden");
					if (!styleElement) {
						styleElement = create("style", {}, { id: "classicalProfilesHidden" });
						document.head.appendChild(styleElement);
					}
				styleElement.innerHTML = ".ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:234px!important;}";
				}
			}
			} catch (error) {
            console.error(error);
          }
        }
      );

      document.arrive(".label.fl_l", { existing: true }, async function (e) {
        appearVariable();
      });

      async function appearVariable() {
        var profileInfo = document.querySelector(".ProfileInfo");
        var profileInfoHeight = profileInfo.offsetHeight;
        document.documentElement.style.setProperty(
          "--vkenhancer-info-height",
          profileInfoHeight + "px"
        );
      }
	  

      async function expandMore(userData) {
        var profileMoreInfo = document.querySelector(".profile_more_info");
        let ProfileInfo = document.querySelector(".ProfileInfo");
        var profileLessLabel = document.querySelector(".profile_label_less");
        var profileMoreLabel = document.querySelector(".profile_label_more");
        profileMoreInfo.addEventListener("click", async function (event) {
          if (!event.target.closest(".vkEnhancerMoreItems")) {
            if (profileMoreLabel.style.display !== "none") {
              var moreItemsLoaded = document.createElement("div");
              moreItemsLoaded.classList.add("vkEnhancerMoreItems");

              if (
                (userData[0].home_town && userData[0].home_town != "") ||
                (userData[0].personal && userData[0].personal.langs_full) ||
                (userData[0].relatives && userData[0].relatives.length > 0)
              ) {
                var commonDiv = document.createElement("div");
                commonDiv.classList.add("vkEnhancerSectionProfile");
                var innerText = document.createElement("div");
                innerText.textContent = getLang("profile_private");
                innerText.classList.add("vkEnhancerSectionText");
                var inner = document.createElement("div");
                inner.classList.add("vkEnhancerSectionInner");
                commonDiv.appendChild(innerText);
                commonDiv.appendChild(inner);
                moreItemsLoaded.appendChild(commonDiv);

                var hometown = userData[0].home_town;
                if (hometown) {
                  var hometownLink = document.createElement("a");
                  hometownLink.href = `/search/people?c[name]=0&c[hometown]=${hometown}`;
                  hometownLink.classList.add(
                    "vkuiLink",
                    "Link-module__link--V7bkY",
                    "ProfileModalInfoLink",
                    "vkuiTappable",
                    "vkuiInternalTappable",
                    "vkuiTappable--hasActive",
                    "vkui-focus-visible"
                  );
                  hometownLink.textContent = hometown;
                  var hometownDiv = document.createElement("div");
                  hometownDiv.classList.add("label", "fl_l");
                  hometownDiv.textContent = getLang("Nat_town");
                  var hometownRow = document.createElement("div");
                  hometownRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  hometownRow.appendChild(hometownDiv);
                  hometownRow.appendChild(hometownLink);
                  moreItemsLoaded.appendChild(hometownRow);
                }

                try {
                  var langsFull = userData[0].personal.langs_full;
                } catch (error) {
                  var langsFull = "авыловаыловаылоаывллоавы";
                }
                try {
                  if (langsFull != "авыловаыловаылоаывллоавы") {
                    var langsText = langsFull
                      .map(
                        (lang) =>
                          `<a href="/search/people?c[name]=0&c[lang]=${lang.id}" class="vkuiLink Link-module__link--V7bkY ProfileModalInfoLink vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">${lang.native_name}</a>`
                      )
                      .join(", ");
                    var langsDiv = document.createElement("div");
                    langsDiv.classList.add("label");
                    langsDiv.classList.add("fl_l");
                    langsDiv.innerHTML = getLang("profile_langs");
                    var langsList = document.createElement("div");
                    langsList.classList.add("labeled");
                    langsList.innerHTML = langsText;
                    var clFix = document.createElement("div");
                    clFix.classList.add("clear_fix");
                    clFix.classList.add("profile_info_row");
                    clFix.appendChild(langsDiv);
                    clFix.appendChild(langsList);
                    moreItemsLoaded.appendChild(clFix);
                  }
                } catch (error) { }
                await addRelatives(userData, moreItemsLoaded);
              }

              if (
                (userData[0].home_phone && userData[0].home_phone != "") ||
                (userData[0].mobile_phone && userData[0].mobile_phone != "") ||
                (userData[0].skype && userData[0].skype != "")
              ) {
                var commonDiv = document.createElement("div");
                commonDiv.classList.add("vkEnhancerSectionProfile");
                var innerText = document.createElement("div");
                innerText.textContent = getLang("profile_contact");
                innerText.classList.add("vkEnhancerSectionText");
                var inner = document.createElement("div");
                inner.classList.add("vkEnhancerSectionInner1");
                commonDiv.appendChild(innerText);
                commonDiv.appendChild(inner);
                moreItemsLoaded.appendChild(commonDiv);

                var mobile_phone = userData[0].mobile_phone;
                if (mobile_phone) {
                  var mobile_phoneLink = document.createElement("div");
                  mobile_phoneLink.textContent = mobile_phone;
                  var mobile_phoneDiv = document.createElement("div");
                  mobile_phoneDiv.classList.add("label", "fl_l");
                  mobile_phoneDiv.textContent = getLang("Contact_mob_tel_abbr");
                  var mobile_phoneRow = document.createElement("div");
                  mobile_phoneRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  mobile_phoneRow.appendChild(mobile_phoneDiv);
                  mobile_phoneRow.appendChild(mobile_phoneLink);
                  moreItemsLoaded.appendChild(mobile_phoneRow);
                }

                var home_phone = userData[0].home_phone;
                if (home_phone) {
                  var home_phoneLink = document.createElement("div");
                  home_phoneLink.textContent = home_phone;
                  var home_phoneDiv = document.createElement("div");
                  home_phoneDiv.classList.add("label", "fl_l");
                  home_phoneDiv.textContent = getLang("Contact_home_tel_abbr");
                  var home_phoneRow = document.createElement("div");
                  home_phoneRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  home_phoneRow.appendChild(home_phoneDiv);
                  home_phoneRow.appendChild(home_phoneLink);
                  moreItemsLoaded.appendChild(home_phoneRow);
                }
                var skype = userData[0].skype;
                if (skype) {
                  var skypeLink = document.createElement("a");
                  skypeLink.href = `skype:` + skype + `?call`;
                  skypeLink.classList.add(
                    "vkuiLink",
                    "Link-module__link--V7bkY",
                    "ProfileModalInfoLink",
                    "vkuiTappable",
                    "vkuiInternalTappable",
                    "vkuiTappable--hasActive",
                    "vkui-focus-visible"
                  );
                  skypeLink.textContent = skype;
                  var skypeDiv = document.createElement("div");
                  skypeDiv.classList.add("label", "fl_l");
                  skypeDiv.textContent = getLang("profile_skype");
                  var skypeRow = document.createElement("div");
                  skypeRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  skypeRow.appendChild(skypeDiv);
                  skypeRow.appendChild(skypeLink);
                  moreItemsLoaded.appendChild(skypeRow);
                }
              }

              var career = userData[0].career;

              if (career && career.length > 0) {
                var commonDiv = document.createElement("div");
                commonDiv.classList.add("vkEnhancerSectionProfile");
                var innerText = document.createElement("div");
                innerText.textContent = getLang("Work_place");
                innerText.classList.add("vkEnhancerSectionText");
                var inner = document.createElement("div");
                inner.classList.add("vkEnhancerSectionInner2");
                commonDiv.appendChild(innerText);
                commonDiv.appendChild(inner);
                moreItemsLoaded.appendChild(commonDiv);
                // Создаем массив промисов для каждой работы
                var jobPromises = career.map(async (job) => {
                  var careerDiv = document.createElement("div");
                  careerDiv.classList.add("label", "fl_l");
                  careerDiv.textContent = `${getLang("Work_place")}`;
                  var careerList = document.createElement("div");
                  careerList.classList.add("labeled");

                  var groupName;
                  try {
                    if (job.group_id) {
                      var groupData = await vkApi.api("groups.getById", {
                        group_ids: job.group_id,
                      });
                      groupName = groupData["groups"][0].name;
                    }
                  } catch (error) {
                    console.error("Error fetching group data:", error);
                    groupName = "Unknown";
                  }

                  var groupLink;
                  if (job.group_id) {
                    groupLink = document.createElement("a");
                    groupLink.href = `https://vk.com/club${job.group_id}`;
                    groupLink.textContent = groupName;
                    groupLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                  } else if (job.company) {
                    groupLink = document.createElement("a");
                    groupLink.href = `https://vk.com/search/people?c[company]=${job.company}&c[name]=0`;
                    groupLink.textContent = job.company;
                    groupLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                  }

                  var additionalS = document.createElement("div");
                  additionalS.classList.add("vkEnhancerAdditionalJob");
                  if (job.position) {
                    var positionLink = document.createElement("a");
                    positionLink.href = `/search/people?c[name]=0&c[position]=${job.position}`;
                    positionLink.textContent = job.position + " ";
                    positionLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                    additionalS.appendChild(positionLink);
                  }
                  if (job.from && job.until) {
                    var PIZDA = document.createElement("div");
                    PIZDA.textContent = ` ${job.from}-${job.until}`;
                    additionalS.appendChild(PIZDA);
                  } else if (job.from) {
                    var fromLink = document.createElement("div");
                    fromLink.textContent = getLang(
                      "profile_places_year_from"
                    ).replace("%s", job.from);
                    additionalS.appendChild(fromLink);
                  } else if (job.until) {
                    var untilLink = document.createElement("div");
                    untilLink.textContent = getLang(
                      "profile_places_year_to"
                    ).replace("%s", job.until);
                    additionalS.appendChild(untilLink);
                  }
                  if (job.city_name) {
                    var city_nameLink = document.createElement("div");
                    city_nameLink.textContent = ", " + job.city_name;
                    additionalS.appendChild(city_nameLink);
                  }

                  var jobRow = document.createElement("div");
                  jobRow.classList.add("job_row");
                  jobRow.appendChild(careerDiv);
                  jobRow.appendChild(groupLink);
                  jobRow.appendChild(additionalS);

                  var careerRow = document.createElement("div");
                  careerRow.classList.add("clear_fix", "profile_info_row");
                  careerRow.appendChild(jobRow);

                  return careerRow;
                });
                Promise.all(jobPromises).then((jobRows) => {
                  jobRows.forEach((jobRow) => {
                    moreItemsLoaded.appendChild(jobRow);
                  });
                  if (
                    (userData[0].schools && userData[0].schools.length > 0) ||
                    (userData[0].universities &&
                      userData[0].universities.length > 0)
                  ) {
                    var commonDiv = document.createElement("div");
                    commonDiv.classList.add("vkEnhancerSectionProfile");
                    var innerText = document.createElement("div");
                    innerText.textContent = getLang("profile_educat");
                    innerText.classList.add("vkEnhancerSectionText");
                    var inner = document.createElement("div");
                    inner.classList.add("vkEnhancerSectionInner3");
                    commonDiv.appendChild(innerText);
                    commonDiv.appendChild(inner);
                    moreItemsLoaded.appendChild(commonDiv);
                  }
                  nextExpander(userData, moreItemsLoaded, inner);
                });
              } else {
                if (
                  (userData[0].schools && userData[0].schools.length > 0) ||
                  (userData[0].universities &&
                    userData[0].universities.length > 0)
                ) {
                  var commonDiv = document.createElement("div");
                  commonDiv.classList.add("vkEnhancerSectionProfile");
                  var innerText = document.createElement("div");
                  innerText.textContent = getLang("profile_educat");
                  innerText.classList.add("vkEnhancerSectionText");
                  var inner = document.createElement("div");
                  inner.classList.add("vkEnhancerSectionInner3");
                  commonDiv.appendChild(innerText);
                  commonDiv.appendChild(inner);
                  moreItemsLoaded.appendChild(commonDiv);
                }
                nextExpander(userData, moreItemsLoaded, inner);
              }

              profileMoreInfo.appendChild(moreItemsLoaded);

              profileLessLabel.style.display = "flex";
              profileMoreLabel.style.display = "none";
            } else {
              var profileMoreLink = profileMoreInfo.querySelector(
                ".profile_more_info_link"
              );
              profileMoreInfo.innerHTML = "";
              if (profileMoreLink) {
                profileMoreInfo.appendChild(profileMoreLink);
              }
              profileLessLabel.style.display = "none";
              profileMoreLabel.style.display = "flex";
            }
          }
          appearVariable();
        });
      }

      async function nextExpander(userData, moreItemsLoaded, educationInner) {
        var education = userData[0].universities;
        var educationDiv = document.createElement("div");
        if (education) {
          education.forEach((edu) => {
            var educationInfo = document.createElement("div");
            educationInfo.classList.add("education_info");
            var universityInfo = document.createElement("div");
            var facultyInfo = document.createElement("div");
            var chairInfo = document.createElement("div");
            var educationFormInfo = document.createElement("div");
            var statusInfo = document.createElement("div");
            if (edu.name) {
              var universityLink = document.createElement("a");
              universityLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=153&c[university]=${edu.id}`;
              universityLink.textContent = edu.name;
              universityLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var graduationYearText = "";
              if (edu.graduation && edu.graduation != 0) {
                graduationYearText = `'${edu.graduation.toString().slice(-2)}`;
              }

              var graduationLink = document.createElement("a");
              graduationLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=119&c[university]=${edu.university}&c[uni_year]=${edu.graduation}`;
              graduationLink.textContent = graduationYearText;
              graduationLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var universityDiv = document.createElement("div");
              universityDiv.classList.add("label", "fl_l");
              universityDiv.textContent = getLang("Univ");
              universityInfo.classList.add("education_row");
              universityInfo.appendChild(universityDiv);
              universityInfo.appendChild(universityLink);
              if (graduationYearText !== "") {
                universityInfo.appendChild(graduationLink);
              }
            }
            // Факультет
            if (edu.faculty_name) {
              var facultyLink = document.createElement("a");
              facultyLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=153&c[university]=${edu.university}&c[faculty]=${edu.faculty}`;
              facultyLink.textContent = edu.faculty_name;
              facultyLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var facultyDiv = document.createElement("div");
              facultyDiv.classList.add("label", "fl_l");
              facultyDiv.textContent = getLang("Faculty");
              facultyInfo.classList.add("education_row");
              facultyInfo.appendChild(facultyDiv);
              facultyInfo.appendChild(facultyLink);
            }
            // Специальность
            if (edu.chair_name) {
              var chairLink = document.createElement("a");
              chairLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=1&c[university]=2&c[faculty]=23&c[chair]=${edu.chair}`;
              chairLink.textContent = edu.chair_name;
              chairLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var chairDiv = document.createElement("div");
              chairDiv.classList.add("label", "fl_l");
              chairDiv.textContent = getLang("Chair");
              chairInfo.classList.add("education_row");
              chairInfo.appendChild(chairDiv);
              chairInfo.appendChild(chairLink);
            }

            // Форма обучения
            if (edu.education_form) {
              var educationFormLink = document.createElement("a");
              educationFormLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=153&c[university]=${edu.university}&c[edu_form]=${edu.education_form_id}`;
              educationFormLink.textContent = edu.education_form;
              educationFormLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var educationFormDiv = document.createElement("div");
              educationFormDiv.classList.add("label", "fl_l");
              educationFormDiv.textContent = getLang("Form");
              educationFormInfo.classList.add("education_row");
              educationFormInfo.appendChild(educationFormDiv);
              educationFormInfo.appendChild(educationFormLink);
            }
            // Статус
            if (edu.education_status) {
              var statusLink = document.createElement("a");
              statusLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=1&c[university]=2&c[edu_status]=${edu.education_status_id}`;
              statusLink.textContent = edu.education_status;
              statusLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var statusDiv = document.createElement("div");
              statusDiv.classList.add("label", "fl_l");
              statusDiv.textContent = getLang("global_edustatus");
              statusInfo.classList.add("education_row");
              statusInfo.appendChild(statusDiv);
              statusInfo.appendChild(statusLink);
            }

            educationInfo.appendChild(universityInfo);
            educationInfo.appendChild(facultyInfo);
            educationInfo.appendChild(chairInfo);
            educationInfo.appendChild(educationFormInfo);
            educationInfo.appendChild(statusInfo);
            moreItemsLoaded.appendChild(educationInfo);
          });

          moreItemsLoaded.appendChild(educationDiv);
        }
        var schools = userData[0].schools;
        if (schools) {
          schools.forEach((school) => {
            var schoolInfo = document.createElement("div");
            schoolInfo.classList.add("school_info");

            // Школа
            if (school.name) {
              var schoolDiv = document.createElement("div");
              schoolDiv.classList.add("label", "fl_l");
              schoolDiv.textContent = getLang("admin2_school");
              schoolInfo.appendChild(schoolDiv);

              var schoolLink = document.createElement("a");
              schoolLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}`;
              schoolLink.textContent = school.name;
              schoolLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );
              schoolInfo.appendChild(schoolLink);
            }

            // Годы обучения и класс
            if (school.year_from && school.year_to) {
              var yearClassDiv = document.createElement("div");
              yearClassDiv.classList.add("yearClassDiv");

              var yearRangeDiv = document.createElement("div");
              yearRangeDiv.textContent = `${school.year_from}-${school.year_to} `;
              yearClassDiv.appendChild(yearRangeDiv);

              // Класс
              if (school.class) {
                var classLink = document.createElement("a");
                classLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}&c[school_year]=${school.year_graduated}&c[school_class]=${school.class}`;
                classLink.textContent = `(${school.class})`;
                classLink.classList.add(
                  "classLinkA",
                  "vkuiLink",
                  "Link-module__link--V7bkY",
                  "ProfileModalInfoLink",
                  "vkuiTappable",
                  "vkuiInternalTappable",
                  "vkuiTappable--hasActive",
                  "vkui-focus-visible"
                );
                yearClassDiv.appendChild(classLink);
              }

              schoolInfo.appendChild(yearClassDiv);
            } else if (school.year_from) {
              var yearFromDiv = document.createElement("div");
              yearFromDiv.textContent = `с ${school.year_from}`;
              schoolInfo.appendChild(yearFromDiv);

              // Класс
              if (school.class) {
                var classLink = document.createElement("a");
                classLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}&c[school_year]=${school.year_graduated}&c[school_class]=${school.class}`;
                classLink.textContent = `(${school.class})`;
                classLink.classList.add(
                  "classLinkA",
                  "vkuiLink",
                  "Link-module__link--V7bkY",
                  "ProfileModalInfoLink",
                  "vkuiTappable",
                  "vkuiInternalTappable",
                  "vkuiTappable--hasActive",
                  "vkui-focus-visible"
                );
                schoolInfo.appendChild(classLink);
              }
            }

            // Специальность
            if (school.speciality) {
              var specialityLink = document.createElement("a");
              specialityLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}&c[school_spec]=${school.speciality}`;
              specialityLink.textContent = school.speciality;
              specialityLink.classList.add(
                "specialityLinkA",
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );
              schoolInfo.appendChild(specialityLink);
            }

            moreItemsLoaded.appendChild(schoolInfo);
          });
        }

        if (userData[0].military && userData[0].military.length > 0) {
          var commonDiv = document.createElement("div");
          commonDiv.classList.add("vkEnhancerSectionProfile");
          var innerText = document.createElement("div");
          innerText.textContent = getLang("profile_military");
          innerText.classList.add("vkEnhancerSectionText");
          var inner = document.createElement("div");
          inner.classList.add("vkEnhancerSectionInner6");
          commonDiv.appendChild(innerText);
          commonDiv.appendChild(inner);
          moreItemsLoaded.appendChild(commonDiv);
          var military = userData[0].military;
          if (military) {
            military.forEach((voin) => {
              var voinInfo = document.createElement("div");
              voinInfo.classList.add("voin_info");

              // Школа
              if (voin.unit) {
                var voinDiv = document.createElement("div");
                voinDiv.classList.add("label", "fl_l");
                voinDiv.textContent = getLang("Military_place");
                voinInfo.appendChild(voinDiv);

                var voinLink = document.createElement("a");
                voinLink.href = `/search/people?c[name]=0&c[mil_country]=${voin.country_id}&c[mil_unit]=${voin.unit_id}`;
                voinLink.textContent = voin.unit;
                voinLink.classList.add(
                  "vkuiLink",
                  "Link-module__link--V7bkY",
                  "vkuiTappable",
                  "vkuiInternalTappable",
                  "vkuiTappable--hasActive",
                  "vkui-focus-visible"
                );
                voinInfo.appendChild(voinLink);
              }

              // Годы обучения и класс
              if (voin.from && voin.until) {
                var voinClassDiv = document.createElement("div");
                voinClassDiv.classList.add("voinClassDiv");

                var voinRangeDiv = document.createElement("div");
                voinRangeDiv.textContent = `${voin.from}-${voin.until} `;
                voinClassDiv.appendChild(voinRangeDiv);

                voinInfo.appendChild(voinClassDiv);
              } else if (voin.from) {
                var voinFromDiv = document.createElement("div");
                voinFromDiv.textContent = `с ${voin.from}`;
                voinInfo.appendChild(voinFromDiv);
              }
              moreItemsLoaded.appendChild(voinInfo);
            });
          }
        }

        if (
          userData[0].personal &&
          ((userData[0].personal.alcohol &&
            userData[0].personal.alcohol != 0) ||
            (userData[0].personal.life_main &&
              userData[0].personal.life_main != 0) ||
            (userData[0].personal.people_main &&
              userData[0].personal.people_main != 0) ||
            (userData[0].personal.smoking &&
              userData[0].personal.smoking != 0) ||
            (userData[0].personal.inspired_by &&
              userData[0].personal.inspired_by != "") ||
            (userData[0].personal.religion &&
              userData[0].personal.religion != "")) &&
          Object.keys(userData[0].personal).length > 0
        ) {
          var commonDiv = document.createElement("div");
          commonDiv.classList.add("vkEnhancerSectionProfile");
          var innerText = document.createElement("div");
          innerText.textContent = getLang("profile_beliefs");
          innerText.classList.add("vkEnhancerSectionText");
          var inner = document.createElement("div");
          inner.classList.add("vkEnhancerSectionInner5");
          commonDiv.appendChild(innerText);
          commonDiv.appendChild(inner);
          moreItemsLoaded.appendChild(commonDiv);

          var lifePos = document.createElement("div");
          lifePos.classList.add("life_info");

          // 1. Политические предпочтения
          var politicalLabels = [
            getLang("politics_comm"),
            getLang("politics_soc"),
            getLang("politics_moder"),
            getLang("politics_liber"),
            getLang("politics_cons"),
            getLang("politics_mon"),
            getLang("politics_ucons"),
            getLang("politics_indiff"),
            getLang("politics_libert"),
          ];
          var political = userData[0].personal.political;
          if (political) {
            var politicalDiv = document.createElement("div");
            politicalDiv.classList.add("politicalRow");

            var politicalLabel = document.createElement("div");
            politicalLabel.textContent = getLang("profile_politics");
            politicalLabel.classList.add("label", "fl_l");
            politicalDiv.appendChild(politicalLabel);

            var politicalLink = document.createElement("div");
            politicalLink.classList.add("vkEnhancerPoliticalInfo");
            politicalLink.textContent = politicalLabels[political - 1];

            politicalDiv.appendChild(politicalLink);
            lifePos.appendChild(politicalDiv);
          }

          // 2. Мировоззрение
          var religion = userData[0].personal.religion;
          if (religion) {
            var religionDiv = document.createElement("div");
            religionDiv.classList.add("religionRow");

            var religionLabel = document.createElement("div");
            religionLabel.textContent = getLang("profile_religion");
            religionLabel.classList.add("label", "fl_l");
            religionDiv.appendChild(religionLabel);

            var religionLink = document.createElement("a");
            religionLink.href = `/search/people?c[name]=0&c[religion]=${encodeURIComponent(
              religion
            )}`;
            religionLink.textContent = religion;
            religionLink.classList.add(
              "vkuiLink",
              "Link-module__link--V7bkY",
              "ProfileModalInfoLink",
              "vkuiTappable",
              "vkuiInternalTappable",
              "vkuiTappable--hasActive",
              "vkui-focus-visible"
            );

            religionDiv.appendChild(religionLink);
            lifePos.appendChild(religionDiv);
          }

          // 3. Главное в жизни
          var lifeMainLabels = [
            getLang("Personal_priority1"),
            getLang("Personal_priority2"),
            getLang("Personal_priority3"),
            getLang("Personal_priority4"),
            getLang("Personal_priority5"),
            getLang("Personal_priority6"),
            getLang("Personal_priority7"),
            getLang("Personal_priority8"),
          ];
          var lifeMain = userData[0].personal.life_main;
          if (lifeMain) {
            var lifeMainDiv = document.createElement("div");
            lifeMainDiv.classList.add("lifeMainRow");

            var lifeMainLabel = document.createElement("div");
            lifeMainLabel.textContent = getLang("profile_personal_priority");
            lifeMainLabel.classList.add("label", "fl_l");
            lifeMainDiv.appendChild(lifeMainLabel);

            var lifeMainLink = document.createElement("a");
            lifeMainLink.href = `/search/people?c[name]=0&c[personal_priority]=${encodeURIComponent(
              lifeMain
            )}`;
            lifeMainLink.textContent = lifeMainLabels[lifeMain - 1];
            lifeMainLink.classList.add(
              "vkuiLink",
              "Link-module__link--V7bkY",
              "ProfileModalInfoLink",
              "vkuiTappable",
              "vkuiInternalTappable",
              "vkuiTappable--hasActive",
              "vkui-focus-visible"
            );

            lifeMainDiv.appendChild(lifeMainLink);
            lifePos.appendChild(lifeMainDiv);
          }

          // 4. Главное в людях
          var peopleMainLabels = [
            getLang("Important_in_others1"),
            getLang("Important_in_others2"),
            getLang("Important_in_others3"),
            getLang("Important_in_others4"),
            getLang("Important_in_others5"),
            getLang("Important_in_others6"),
          ];
          var peopleMain = userData[0].personal.people_main;
          if (peopleMain) {
            var peopleMainDiv = document.createElement("div");
            peopleMainDiv.classList.add("peopleMainRow");

            var peopleMainLabel = document.createElement("div");
            peopleMainLabel.textContent = getLang(
              "profile_important_in_others"
            );
            peopleMainLabel.classList.add("label", "fl_l");
            peopleMainDiv.appendChild(peopleMainLabel);

            var peopleMainLink = document.createElement("a");
            peopleMainLink.href = `/search/people?c[name]=0&c[people_priority]=${encodeURIComponent(
              peopleMain
            )}`;
            peopleMainLink.textContent = peopleMainLabels[peopleMain - 1];
            peopleMainLink.classList.add(
              "vkuiLink",
              "Link-module__link--V7bkY",
              "ProfileModalInfoLink",
              "vkuiTappable",
              "vkuiInternalTappable",
              "vkuiTappable--hasActive",
              "vkui-focus-visible"
            );

            peopleMainDiv.appendChild(peopleMainLink);
            lifePos.appendChild(peopleMainDiv);
          }

          // 5. Отношение к курению
          var smokingLabels = [
            getLang("Smoking_like1"),
            getLang("Smoking_like2"),
            getLang("Smoking_like3"),
            getLang("Smoking_like4"),
            getLang("Smoking_like5"),
          ];
          var smoking = userData[0].personal.smoking;
          if (smoking) {
            var smokingDiv = document.createElement("div");
            smokingDiv.classList.add("smokingRow");

            var smokingLabel = document.createElement("div");
            smokingLabel.textContent = getLang("profile_smoking_like");
            smokingLabel.classList.add("label", "fl_l");
            smokingDiv.appendChild(smokingLabel);

            var smokingLink = document.createElement("a");
            smokingLink.href = `/search/people?c[name]=0&c[smoking]=${encodeURIComponent(
              smoking
            )}`;
            smokingLink.textContent = smokingLabels[smoking - 1];
            smokingLink.classList.add(
              "vkuiLink",
              "Link-module__link--V7bkY",
              "ProfileModalInfoLink",
              "vkuiTappable",
              "vkuiInternalTappable",
              "vkuiTappable--hasActive",
              "vkui-focus-visible"
            );

            smokingDiv.appendChild(smokingLink);
            lifePos.appendChild(smokingDiv);
          }

          // 6. Отношение к алкоголю
          var alcoholLabels = [
            getLang("Alcohol_like1"),
            getLang("Alcohol_like2"),
            getLang("Alcohol_like3"),
            getLang("Alcohol_like4"),
            getLang("Alcohol_like5"),
          ];
          var alcohol = userData[0].personal.alcohol;
          if (alcohol) {
            var alcoholDiv = document.createElement("div");
            alcoholDiv.classList.add("alcoholRow");

            var alcoholLabel = document.createElement("div");
            alcoholLabel.textContent = getLang("profile_alcohol_like");
            alcoholLabel.classList.add("label", "fl_l");
            alcoholDiv.appendChild(alcoholLabel);

            var alcoholLink = document.createElement("a");
            alcoholLink.href = `/search/people?c[name]=0&c[alcohol]=${encodeURIComponent(
              alcohol
            )}`;
            alcoholLink.textContent = alcoholLabels[alcohol - 1];
            alcoholLink.classList.add(
              "vkuiLink",
              "Link-module__link--V7bkY",
              "ProfileModalInfoLink",
              "vkuiTappable",
              "vkuiInternalTappable",
              "vkuiTappable--hasActive",
              "vkui-focus-visible"
            );

            alcoholDiv.appendChild(alcoholLink);
            lifePos.appendChild(alcoholDiv);
          }

          // 7. Источники вдохновения
          var inspiredBy = userData[0].personal.inspired_by;
          if (inspiredBy) {
            var inspiredByDiv = document.createElement("div");
            inspiredByDiv.classList.add("inspired_by_info");

            var inspiredByLabel = document.createElement("div");
            inspiredByLabel.textContent = getLang("profile_inspired_by");
            inspiredByLabel.classList.add("label", "fl_l");
            inspiredByDiv.appendChild(inspiredByLabel);

            var inspiredBySpan = document.createElement("span");

            var inspiredByLinks = inspiredBy.split(", ");
            inspiredByLinks.forEach((inspiration, index) => {
              var inspirationLink = document.createElement("a");
              inspirationLink.href = `/search/people?c[name]=0&c[q]=${encodeURIComponent(
                inspiration
              )}`;
              inspirationLink.textContent = inspiration;
              inspirationLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );
              inspiredBySpan.appendChild(inspirationLink);

              if (index !== inspiredByLinks.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                inspiredBySpan.appendChild(commaSpan);
              }
            });

            inspiredByDiv.appendChild(inspiredBySpan);
            lifePos.appendChild(inspiredByDiv);
          }

          moreItemsLoaded.appendChild(lifePos);
        }

        if (
          (userData[0].activities && userData[0].activities != "") ||
          (userData[0].interests && userData[0].interests != "") ||
          (userData[0].music && userData[0].music != "") ||
          (userData[0].movies && userData[0].movies != "") ||
          (userData[0].tv && userData[0].tv != "") ||
          (userData[0].books && userData[0].books != "") ||
          (userData[0].games && userData[0].games != "") ||
          (userData[0].quotes && userData[0].quotes != "") ||
          (userData[0].about && userData[0].about != "")
        ) {
          var commonDiv = document.createElement("div");
          commonDiv.classList.add("vkEnhancerSectionProfile");
          var innerText = document.createElement("div");
          innerText.textContent = getLang("profile_interests");
          innerText.classList.add("vkEnhancerSectionText");
          var inner = document.createElement("div");
          inner.classList.add("vkEnhancerSectionInner4");
          commonDiv.appendChild(innerText);
          commonDiv.appendChild(inner);
          moreItemsLoaded.appendChild(commonDiv);

          var activities = userData[0].activities;
          if (activities) {
            var interestsDiv = document.createElement("div");
            interestsDiv.classList.add("interests_info");

            var activitiesLabel = document.createElement("div");
            activitiesLabel.textContent = getLang("Activities");
            activitiesLabel.classList.add("label", "fl_l");
            interestsDiv.appendChild(activitiesLabel);

            var activitiesSpan = document.createElement("span");

            var interests = activities.split(", ");
            interests.forEach((interest, index) => {
              var interestLink = document.createElement("a");
              interestLink.href = `/search/people?c[name]=0&c[hometown]=${encodeURIComponent(
                interest
              )}`;
              interestLink.textContent = interest;
              interestLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              activitiesSpan.appendChild(interestLink);

              if (index !== interests.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                activitiesSpan.appendChild(commaSpan);
              }
            });

            interestsDiv.appendChild(activitiesSpan);
            moreItemsLoaded.appendChild(interestsDiv);
          }

          var interests = userData[0].interests;
          if (interests && interests.length > 0) {
            var interestsDiv = document.createElement("div");
            interestsDiv.classList.add("interests_info");

            var interestsLabel = document.createElement("div");
            interestsLabel.textContent = getLang("profile_interests");
            interestsLabel.classList.add("label", "fl_l");
            interestsDiv.appendChild(interestsLabel);

            var interestsSpan = document.createElement("span");

            var interestList = interests.split(", ");
            interestList.forEach((interest, index) => {
              var interestLink = document.createElement("a");
              interestLink.href = `/search/people?c[name]=0&c[q]=${encodeURIComponent(
                interest
              )}`;
              interestLink.textContent = interest;
              interestLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              interestsSpan.appendChild(interestLink);

              if (index !== interestList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                interestsSpan.appendChild(commaSpan);
              }
            });

            interestsDiv.appendChild(interestsSpan);
            moreItemsLoaded.appendChild(interestsDiv);
          }

          var music = userData[0].music;
          if (music) {
            var musicDiv = document.createElement("div");
            musicDiv.classList.add("music_info");

            var musicLabel = document.createElement("div");
            musicLabel.textContent = getLang("Fave_music");
            musicLabel.classList.add("label", "fl_l");
            musicDiv.appendChild(musicLabel);

            var musicSpan = document.createElement("span");

            var musicList = music.split(", ");
            musicList.forEach((genre, index) => {
              var genreLink = document.createElement("a");
              genreLink.href = `/search/audio?c[name]=0&c[q]=${encodeURIComponent(
                genre
              )}`;
              genreLink.textContent = genre;
              genreLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              musicSpan.appendChild(genreLink);

              if (index !== musicList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                musicSpan.appendChild(commaSpan);
              }
            });

            musicDiv.appendChild(musicSpan);
            moreItemsLoaded.appendChild(musicDiv);
          }

          var movies = userData[0].movies;
          if (movies) {
            var moviesDiv = document.createElement("div");
            moviesDiv.classList.add("movies_info");

            var moviesLabel = document.createElement("div");
            moviesLabel.textContent = getLang("Fave_movies");
            moviesLabel.classList.add("label", "fl_l");
            moviesDiv.appendChild(moviesLabel);

            var moviesSpan = document.createElement("span");

            var movieList = movies.split(", ");
            movieList.forEach((movie, index) => {
              var movieLink = document.createElement("a");
              movieLink.href = `https://vk.com/search/video?c[name]=0&c[q]=${encodeURIComponent(
                movie
              )}`;
              movieLink.textContent = movie;
              movieLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              moviesSpan.appendChild(movieLink);

              if (index !== movieList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                moviesSpan.appendChild(commaSpan);
              }
            });

            moviesDiv.appendChild(moviesSpan);
            moreItemsLoaded.appendChild(moviesDiv);
          }

          var tv = userData[0].tv;
          if (tv) {
            var moviesDiv = document.createElement("div");
            moviesDiv.classList.add("movies_info");

            var moviesLabel = document.createElement("div");
            moviesLabel.textContent = getLang("Fave_tvshows");
            moviesLabel.classList.add("label", "fl_l");
            moviesDiv.appendChild(moviesLabel);

            var moviesSpan = document.createElement("span");

            var movieList = tv.split(", ");
            movieList.forEach((movie, index) => {
              var movieLink = document.createElement("a");
              movieLink.href = `https://vk.com/search/video?c[name]=0&c[q]=${encodeURIComponent(
                movie
              )}`;
              movieLink.textContent = movie;
              movieLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              moviesSpan.appendChild(movieLink);

              if (index !== movieList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                moviesSpan.appendChild(commaSpan);
              }
            });

            moviesDiv.appendChild(moviesSpan);
            moreItemsLoaded.appendChild(moviesDiv);
          }

          var books = userData[0].books;
          if (books) {
            var booksDiv = document.createElement("div");
            booksDiv.classList.add("books_info");

            var booksLabel = document.createElement("div");
            booksLabel.textContent = getLang("Fave_books");
            booksLabel.classList.add("label", "fl_l");
            booksDiv.appendChild(booksLabel);

            var booksSpan = document.createElement("span");

            var bookList = books.split(", ");
            bookList.forEach((book, index) => {
              var bookLink = document.createElement("a");
              bookLink.href = `https://vk.com/search/people?c[name]=0&c[q]=${encodeURIComponent(
                book
              )}`;
              bookLink.textContent = book;
              bookLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              booksSpan.appendChild(bookLink);

              if (index !== bookList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                booksSpan.appendChild(commaSpan);
              }
            });

            booksDiv.appendChild(booksSpan);
            moreItemsLoaded.appendChild(booksDiv);
          }

          var games = userData[0].games;
          if (games) {
            var gamesDiv = document.createElement("div");
            gamesDiv.classList.add("games_info");

            var gamesLabel = document.createElement("div");
            gamesLabel.textContent = getLang("Fave_games");
            gamesLabel.classList.add("label", "fl_l");
            gamesDiv.appendChild(gamesLabel);

            var gamesSpan = document.createElement("span");

            var gameList = games.split(", ");
            gameList.forEach((game, index) => {
              var gameLink = document.createElement("a");
              gameLink.href = `https://vk.com/search/people?c[name]=0&c[q]=${encodeURIComponent(
                game
              )}`;
              gameLink.textContent = game;
              gameLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              gamesSpan.appendChild(gameLink);

              if (index !== gameList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                gamesSpan.appendChild(commaSpan);
              }
            });

            gamesDiv.appendChild(gamesSpan);
            moreItemsLoaded.appendChild(gamesDiv);
          }

          var quotes = userData[0].quotes;
          if (quotes) {
            var quotesDiv = document.createElement("div");
            quotesDiv.classList.add("quotes_info");

            var quotesLabel = document.createElement("div");
            quotesLabel.textContent = getLang("Fave_quotes");
            quotesLabel.classList.add("label", "fl_l");
            quotesDiv.appendChild(quotesLabel);

            var quotesText = quotes.replace(/\n/g, "<br>");
            var quotesSpan = document.createElement("span");
            quotesSpan.innerHTML = quotesText;

            quotesDiv.appendChild(quotesSpan);
            moreItemsLoaded.appendChild(quotesDiv);
          }

          var about = userData[0].about;
          if (about) {
            var aboutDiv = document.createElement("div");
            aboutDiv.classList.add("about_info");

            var aboutLabel = document.createElement("div");
            aboutLabel.textContent = getLang("Aboutme");
            aboutLabel.classList.add("label", "fl_l");
            aboutDiv.appendChild(aboutLabel);

            var aboutText = about.replace(/\n/g, "<br>");
            var aboutSpan = document.createElement("span");

            var regex = /(?:https?:\/\/|www\.)\S+/g;
            var match;
            var lastIndex = 0;
            while ((match = regex.exec(aboutText)) !== null) {
              var link = match[0];
              var linkText =
                link.length > 20 ? link.substring(0, 20) + "..." : link;
              if (!link.startsWith("http://") && !link.startsWith("https://")) {
                link = "https://" + link;
              }
              var beforeText = aboutText.substring(lastIndex, match.index);
              lastIndex = match.index + link.length;
              aboutSpan.innerHTML += beforeText;
              aboutSpan.innerHTML += `<a href="${link}">${linkText}</a>`;
            }
            aboutSpan.innerHTML += aboutText.substring(lastIndex);

            aboutDiv.appendChild(aboutSpan);
            moreItemsLoaded.appendChild(aboutDiv);
          }
        }
      }

      function sortObject(obj, order) {
        let sorted = {};
        order.forEach((key) => {
          if (obj.hasOwnProperty(key)) {
            sorted[key] = obj[key];
            delete obj[key];
          }
        });
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            sorted[key] = obj[key];
          }
        }
        return sorted;
      }

      function addCounters(userData, countersData) {
        var countsModule = document.createElement("div");
        countsModule.classList.add("counts_module");
        let order = [
          "mutual_friends",
          "friends",
          "followers",
          "photos",
          "user_photos",
          "videos",
          "audios",
          "posts",
        ];
		if(countersData) {
        countersData = sortObject(countersData, order);
		}
		else
		{
		return;	
		}
        for (var counterType in countersData) {
          var value = countersData[counterType];
          if (value !== 0) {
            var counterDiv = document.createElement("a");
            counterDiv.classList.add("counter");

            var valueDiv = document.createElement("div");
            valueDiv.classList.add("value");
            valueDiv.textContent = value;
            counterDiv.appendChild(valueDiv);

            var labelDiv = document.createElement("div");
            labelDiv.classList.add("label");

            labelDiv.textContent = getCounterLabel(counterType, value);
            if (labelDiv.textContent != "") {
              counterDiv.appendChild(labelDiv);
              countsModule.appendChild(counterDiv);
            }
            let labelHref;
            let labelOnclick;
            let labelClass;
            switch (counterType) {
              case "photos":
                labelClass = "vkenhancerCounterPhoto";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/albums${userData.id}?profile=1`;
                  labelOnclick = `return showAlbums(${userData.id}, {noHistory: true}, event);`;
                }
                break;
              case "audios":
                labelClass = "vkenhancerCounterAudios";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/audios${userData.id}`;
                  labelOnclick = `return page.showPageAudios(event, ${userData.id});`;
                }
                break;
              case "followers":
                labelClass = "vkenhancerCounterFollowers";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/friends?id=${userData.id}&section=subscribers`;
                  labelOnclick = `return page.showPageMembers(event, ${userData.id}, 'followers');`;
                }
                break;
              case "friends":
                labelClass = "vkenhancerCounterFriends";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/friends?id=${userData.id}&section=friends`;
                  labelOnclick = `return page.showPageMembers(event, ${userData.id}, 'friends');`;
                }
                break;
              case "user_photos":
                labelClass = "vkenhancerCounterUserPhotos";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/tag${userData.id}`;
                  labelOnclick = `return showPhotoTags(${userData.id}, {noHistory: true}, event);`;
                }
                break;
              case "mutual_friends":
                labelClass = "vkenhancerCounterMutual";
                labelHref = `https://vk.com/friends?id=${userData.id}&section=common`;
                labelOnclick = `return page.showPageMembers(event, ${userData.id}, 'common');`;
                break;
              case "videos":
                labelClass = "vkenhancerCounterVideos";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/videos${userData.id}`;
                  labelOnclick = `return page.showPageVideos(event, ${userData.id});`;
                }
                break;
              case "posts":
                labelClass = "vkenhancerCounterPages";
                break;
            }
            if (labelHref && counterDiv) {
              counterDiv.href = labelHref;
              counterDiv.classList.add(labelClass);
              counterDiv.setAttribute("onclick", labelOnclick);
            }
          }
        }

        var pageCounter = document.createElement("a");
        pageCounter.classList.add("page_counter");
        pageCounter.appendChild(countsModule);

        var countsContainer = document.querySelector(".ProfileInfo");
        countsContainer.appendChild(pageCounter);
      }

      function getLangBottom(e, t, n) {
        const o = window.langConfig;
        if (!t || !o) {
          if (!(0, r.isNumeric)(e)) {
            const t = new Error("Non-numeric value passed to langNumeric");
            throw (console.log(e, t), t);
          }
          return String(e);
        }
        let i;
        Array.isArray(t)
          ? ((i = t[1]),
            e != Math.floor(e)
              ? (i = t[o.numRules.float])
              : (o.numRules.int || []).some((n) => {
                if ("*" === n[0]) return (i = t[n[2]]), !0;
                const r = n[0] ? e % n[0] : e;
                return Array.isArray(n[1]) && n[1].includes(r)
                  ? ((i = t[n[2]]), !0)
                  : void 0;
              }))
          : (i = t);
        let a = String(e);
        if (n) {
          const e = a.split("."),
            t = [];
          for (let n = e[0].length - 3; n > -3; n -= 3)
            t.unshift(e[0].slice(n > 0 ? n : 0, n + 3));
          (e[0] = t.join(o.numDel)), (a = e.join(o.numDec));
        }
        return (i = (i || "%s").replace("%s", "")), i;
      }

      function getLang1(key, type) {
        let arr = getLang(key, type);
        if (type === "raw") {
          arr = arr.map((item) => item.replace("{count} ", ""));
        }
        return arr;
      }

      function removeStringsVideo(arr) {
        return arr.map((item) => item.replace(/^.+?%s /, ""));
      }

      function getCounterLabel(counterType, value) {
        //console.log(vk.lang,cur.options.wall_counts);
        switch (counterType) {
          case "photos": {
            return getLangBottom(
              value,
              getLang("profile_user_content_albums_photos_count", "raw")
            );
          }
          case "audios": {
            return getLangBottom(
              value,
              getLang1("audio_playlist_audios_count", "raw")
            );
          }
          case "followers": {
            return getLangBottom(value, getLang("profile_count_fans", "raw"));
          }
          case "friends": {
            return getLangBottom(
              value,
              getLang("profile_count_friends_new", "raw")
            );
          }
          case "user_photos": {
            return getLangBottom(
              value,
              getLang("photos_tags_modal_count", "raw")
            );
          }
          case "mutual_friends": {
            return getLangBottom(
              value,
              getLang("profile_mutual_label_short", "raw")
            );
          }
          case "videos": {
            return getLangBottom(value, getLang("video_playlist_size", "raw"));
            //return getLangBottom(value,removeStringsVideo(getLang("video_found_videos_global", "raw")))
          }
          case "posts": {
            return getLangBottom(value, getPostLangKey(vk.lang));
          }
        }
      }

      function getPostLangKey(lang) {
        switch (lang) {
          case 0:
            addLangKeys({
              vkenhancer_wall_counts: ["", "запись", "записи", "записей"],
            });
            break;
          case 3:
            addLangKeys({
              vkenhancer_wall_counts: ["", "post", "posts", "posts"],
            });
            break;
          case 777:
            addLangKeys({
              vkenhancer_wall_counts: ["", "тема", "темы", "тем"],
            });
            break;
          case 57:
            addLangKeys({
              vkenhancer_wall_counts: ["", "yazı", "yazı", "yazı"],
            });
            break;
          case 69:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "pucuk pesan",
                "pucuk pesan",
                "pucuk pesan",
              ],
            });
            break;
          case 72:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s post", "%s posta", "%s postova"],
            });
            break;
          case 64:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s opslag",
                "%s opslag",
                "%s opslag",
              ],
            });
            break;
          case 6:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s Eintrag",
                "%s Einträge",
                "%s Einträge",
              ],
            });
            break;
          case 22:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s sissekanne",
                "%s sissekannet",
                "%s sissekannet",
              ],
            });
            break;
          case 4:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s entrada",
                "%s entradas",
                "%s entradas",
              ],
            });
            break;
          case 555:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s afiŝo",
                "%s afiŝoj",
                "%s afiŝoj",
              ],
            });
            break;
          case 183:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "argitalpen bat",
                "%s argitalpen",
                "%s argitalpen",
              ],
            });
            break;
          case 16:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s statut",
                "%s statuts",
                "%s statuts",
              ],
            });
            break;
          case 7:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s messaggio",
                "%s messaggi",
                "%s messaggi",
              ],
            });
            break;
          case 9:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s zapis",
                "%s zapisa",
                "%s zapisa",
              ],
            });
            break;
          case 95:
            addLangKeys({
              vkenhancer_wall_counts: ["", "Posti %s", "Posti %s", "Posti %s"],
            });
            break;
          case 56:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s pieraksts",
                "%s pieraksti",
                "%s pieraksti",
              ],
            });
            break;
          case 19:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s įrašas",
                "%s įrašų",
                "%s įrašai",
              ],
            });
            break;
          case 10:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s bejegyzés",
                "%s bejegyzés",
                "%s bejegyzés",
              ],
            });
            break;
          case 66:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s postare",
                "%s postări",
                "%s postări",
              ],
            });
            break;
          case 61:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s bericht",
                "%s berichten",
                "%s berichten",
              ],
            });
            break;
          case 55:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s innlegg", "%s innlegg"],
            });
            break;
          case 65:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s yozuv", "%s yozuv", "%s yozuv"],
            });
            break;
          case 15:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s post", "%s posty", "%s postów"],
            });
            break;
          case 12:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s entrada",
                "%s entradas",
                "%s entradas",
              ],
            });
            break;
          case 73:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s recado",
                "%s recados",
                "%s recados",
              ],
            });
            break;
          case 54:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s postare",
                "%s postări",
                "%s de postări",
              ],
            });
            break;
          case 71:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s komentar",
                "%s komentarja",
                "%s komentarji",
                "%s komentarjev",
              ],
            });
            break;
          case 5:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s viesti",
                "%s viestiä",
                "%s viestiä",
              ],
            });
            break;
          case 60:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s post", "%s poster", "%s poster"],
            });
            break;
          case 79:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s paskil",
                "%s mga paskil",
                "%s mga paskil",
              ],
            });
            break;
          case 75:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s đăng tải",
                "%s đăng tải",
                "%s đăng tải",
              ],
            });
            break;
          case 373:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s гылә нывыштәj",
                "%s гылә нывыштәj",
                "%s гылә нывыштәj",
              ],
            });
            break;
          case 62:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s ýazgy", "%s ýazgy", "%s ýazgy"],
            });
            break;
          case 82:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s yazı", "%s yazı", "%s yazı"],
            });
            break;
          case 21:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s zpráva",
                "%s zprávy",
                "%s zpráv",
                "",
              ],
            });
            break;
          case 14:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s καταχώριση",
                "%s καταχωρίσεις",
                "%s καταχωρίσεις",
              ],
            });
            break;
          case 379:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s kirjutuš",
                "%s kirjutušta",
                "%s kirjutušta",
              ],
            });
            break;
          case 53:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s zápis", "%s zápisy", ""],
            });
            break;
          case 102:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "зы тхыгъэ",
                "тхыгъэ %s",
                "тхыгъэ %s",
              ],
            });
            break;
          case 103:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s нҵамҭак",
                "%s нҵамҭак",
                "%s нҵамҭақәа",
              ],
            });
            break;
          case 51:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s яҙма", "%s яҙма", "%s яҙма"],
            });
            break;
          case 114:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s запіс",
                "%s запісы",
                "%s запісаў",
              ],
            });
            break;
          case 2:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s запіс",
                "%s запісы",
                "%s запісаў",
              ],
            });
            break;
          case 8:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s публикация",
                "%s публикации",
                "%s публикации",
              ],
            });
            break;
          case 100:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s высказыванiе",
                "%s высказыванiя",
                "%s высказыванiй",
              ],
            });
            break;
          case 91:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s фыст", "%s фысты", "%s фысты"],
            });
            break;
          case 375:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s гижöд", "%s гижöд", "%s гижöд"],
            });
            break;
          case 87:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s жазуу", "%s жазуу", "%s жазуу"],
            });
            break;
          case 118:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s кхьин", "%s кхьин", "%s кхьин"],
            });
            break;
          case 108:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s возымаш",
                "%s возымаш",
                "%s возымаш",
              ],
            });
            break;
          case 80:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s бичлэг",
                "%s бичлэг",
                "%s бичлэг",
              ],
            });
            break;
          case 298:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s запис", "%s записӱв"],
            });
            break;
          case 50:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s язма", "%s язма", "%s язма"],
            });
            break;
          case 105:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s суруйуу",
                "%s суруйуу",
                "%s суруйуу",
              ],
            });
            break;
          case 70:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s сабт", "%s сабтҳо", "%s сабтҳо"],
            });
            break;
          case 11:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s запис",
                "%s записа",
                "%s записа",
              ],
            });
            break;
          case 52:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s çырни", "%s çырни", "%s çырни"],
            });
            break;
          case 230:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s пазылых",
                "%s пазылых",
                "%s пазылых",
              ],
            });
            break;
          case 357:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s бичлг", "%s бичлг", "%s бичлг"],
            });
            break;
          case 107:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s гожтэм",
                "%s гожтэм",
                "%s гожтэм",
              ],
            });
            break;
          case 1:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s запис",
                "%s записи",
                "%s записів",
              ],
            });
            break;
          case 454:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s запись",
                "%s записей",
                "%s записей",
              ],
            });
            break;
          case 97:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s жазба", "%s жазба", "%s жазба"],
            });
            break;
          case 83:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s पोस्ट",
                "%s पोस्टहरु",
                "%s पोस्टहरु",
              ],
            });
            break;
          case 76:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s घोषणा ",
                "%s घोषणाएँ",
                "%s घोषणाएँ",
              ],
            });
            break;
          case 78:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s টি পোস্ট",
                "%s টি পোস্ট",
                "%s টি পোস্ট",
              ],
            });
            break;
          case 94:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s ಅಂಚೆ",
                "%s ಅಂಚೆಗಳು",
                "%s ಅಂಚೆಗಳು",
              ],
            });
            break;
          case 77:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                " පෝස්ට් %s",
                "පෝස්ට්ස් %s ",
                "පෝස්ට්ස් %s ",
              ],
            });
            break;
          case 68:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "โพสต์ %s โพสต์",
                "โพสต์ %s โพสต์",
                "โพสต์ %s โพสต์",
              ],
            });
            break;
          case 63:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s ჩანაწერი",
                "%s ჩანაწერი",
                "%s ჩანაწერი",
              ],
            });
            break;
          case 81:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "မှတ်တမ်း %s ခု",
                "မှတ်တမ်း %s ခု",
                "မှတ်တမ်း %s ခု",
              ],
            });
            break;
          case 20:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s件の投稿",
                "%s件の投稿",
                "%s件の投稿",
              ],
            });
            break;
          case 13:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s条动态", "%s条动态", "%s条动态"],
            });
            break;
          case 119:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s 公告", "%s 公告 ", "%s 公告 "],
            });
            break;
          case 17:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s개의 글",
                "%s개의 글",
                "%s개의 글",
              ],
            });
            break;
          case 58:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s գրառում",
                "%s գրառում",
                "%s գրառում",
              ],
            });
            break;
          case 99:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "רשימה %s",
                "%s רשימות",
                "%s רשימות",
              ],
            });
            break;
          case 85:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s پوسٹ", "%s پوسٹس", "%s پوسٹس"],
            });
            break;
          case 98:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s كتابة ",
                "%s كتابات",
                "%s كتابات",
              ],
            });
            break;
          case 74:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s نوشته",
                "%s نوشته ",
                "%s نوشته ",
              ],
            });
            break;
          case 90:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s پوسٹ", "%s پوسٹس", "%s پوسٹس"],
            });
            break;
        }
        return getLang("vkenhancer_wall_counts", "raw");
      }

      function declOfNum(number, words) {
        return words[
          number % 100 > 4 && number % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
        ];
      }

      async function addRelatives(userData, moreItemsLoaded) {
        var relatives = userData[0].relatives;
        if (relatives) {
          var relativesByType = {};

          relatives.forEach((relative) => {
            if (relative.type) {
              if (!relativesByType[relative.type]) {
                relativesByType[relative.type] = [];
              }
              relativesByType[relative.type].push(relative);
            }
          });

          // Добавление родственников по типам
          Object.keys(relativesByType).forEach(async (type) => {
            var relativesOfType = relativesByType[type];
            var relativesDiv = document.createElement("div");
            relativesDiv.classList.add("label", "fl_l");
            relativesDiv.textContent = `${getTypeName(type)} `;
            var relativesList = document.createElement("div");
            relativesList.classList.add("labeled");
            var isFirst = true;
            relativesOfType.forEach(async (relative) => {
              var relativeLink;
              if (relative.name) {
                var id = relative.id.toString();
                if (id.startsWith("-")) {
                  id = id.substring(1);
                  relativeLink = document.createTextNode(relative.name);
                } else {
                  relativeLink = document.createElement("a");
                  relativeLink.href = `/id${id}`;
                  relativeLink.textContent = relative.name;
                  relativeLink.classList.add(
                    "vkuiLink",
                    "Link-module__link--V7bkY",
                    "ProfileModalInfoLink",
                    "vkuiTappable",
                    "vkuiInternalTappable",
                    "vkuiTappable--hasActive",
                    "vkui-focus-visible"
                  );
                }
              } else if (relative.id) {
                var relativeData = await getUserDataWithoutOnline(relative.id);
                if (relativeData) {
                  var name = `${relativeData[0].first_name} ${relativeData[0].last_name}`;
                  var id = relative.id.toString();
                  if (id.startsWith("-")) {
                    id = id.substring(1);
                    relativeLink = document.createTextNode(name);
                  } else {
                    relativeLink = document.createElement("a");
                    relativeLink.href = `/id${id}`;
                    relativeLink.textContent = name;
                    relativeLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                  }
                }
              }
              if (relativeLink) {
                if (!isFirst) {
                  relativesList.appendChild(document.createTextNode(", "));
                } else {
                  isFirst = false;
                }
                relativesList.appendChild(relativeLink);
              }
            });
            var relativesRow = document.createElement("div");
            relativesRow.classList.add("clear_fix", "profile_info_row");
            relativesRow.appendChild(relativesDiv);
            relativesRow.appendChild(relativesList);
            moreItemsLoaded.appendChild(relativesRow);
          });
        }
      }

      function getTypeName(type) {
        switch (type) {
          case "child":
            return getLang("profile_children_label");
          case "sibling":
            return getLang("profile_siblings_label");
          case "parent":
            return getLang("profile_parents_label");
          case "grandparent":
            return getLang("profile_grandparents_label");
          case "grandchild":
            return getLang("profile_grandchildren_label");
          default:
            return "";
        }
      }

      function buttonrun() {
        //console.log("buttonrun executed");
        var count = 0;
        var interval = setInterval(function () {
          if (count >= 1) {
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
              //console.log("ID fetched successfully: " + objectId);
              var newElement = document.createElement("div");
              newElement.className = "ProfileGifts__all";
              newElement.innerHTML = `
                        <a onclick="window.Profile.showGiftBox(${objectId},${vk.id
                },'profile_module')" class="Button-module__root--enpNU vkuiButton vkuiButton--size-s vkuiButton--mode-secondary vkuiButton--appearance-accent vkuiButton--align-center vkuiButton--stretched vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible">
                            <span class="vkuiButton__in">
                                <span class="vkuiButton__content">${getLang(
                  "profile_send_gift"
                )}</span>
                            </span>
                        </a>
                    `;
              var headerButtons = document.querySelector(
                ".ProfileHeader__wrapper .ProfileHeaderActions__buttons"
              );
              var theFirstChild = headerButtons.firstChild;
              headerButtons.insertBefore(newElement, theFirstChild);
            })
            .catch((error) => {
              console.error("Ошибка:", error);
            });
          count++;
        }, 1); // 10 секунд
      }
      function FuckName(relation, sex, user) {
        switch (relation) {
          case 2:
          case 3:
          case 5:
          case 8: {
            return `${user.first_name_ins} ${user.last_name_ins}`;
          }
          case 4: {
            return sex === 2
              ? `${user.first_name_dat} ${user.last_name_dat}`
              : `${user.first_name_ins} ${user.last_name_ins}`;
          }
          case 7: {
            return `${user.first_name_acc} ${user.last_name_acc}`;
          }
        }
      }

      function getMoreInfoLang(lang) {
        switch (lang) {
          case 0:
            return [
              "Показать подробную информацию",
              "Скрыть подробную информацию",
            ];
            break;
          case 1:
            return [
              "Показать подробную информацию",
              "Скрыть подробную информацию",
            ];
            break;
          case 454:
            return [
              "Показати детальну інформацію",
              "Приховати детальну інформацію",
            ];
            break;
          case 114:
            return [
              "Паказаць падрабязную інфармацыю",
              "Схаваць падрабязную інфармацыю",
            ];
            break;
          case 2:
            return [
              "Паказаць падрабязную інфармацыю",
              "Схаваць падрабязную інфармацыю",
            ];
            break;
          case 777:
            return ["Раскрыть детальное досье", "Убрать детальное досье"];
            break;
          case 97:
            return ["Толық ақпаратты көрсету", "Толық ақпаратты жасыру"];
            break;
          case 100:
            return [
              "Показать подробную информацiю",
              "Скрыть подробную информацiю",
            ];
            break;
          default:
            return ["Show detailed information", "Hide detailed information"];
            break;
        }
      }

      async function appearStarts(userData) {
        var pageCurrentInfo = document.querySelector(".ProfileInfo");

        var profileShort = document.createElement("div");
        profileShort.classList.add("profile_info", "profile_info_short");
        profileShort.id = "profile_short";

        var birthdayRow = createProfileInfoRow(
          getLang("profile_info_birth_date"),
          formatBirthday(userData[0].bdate)
        );
        if (birthdayRow) {
          profileShort.appendChild(birthdayRow);
        }

        var relationText = await getRelationText(userData[0].relation);
        var relationRow = createProfileInfoRow(
          getLang("profile_family"),
          relationText
        );
        if (relationRow) {
          profileShort.appendChild(relationRow);
        }

        var cityRow = createProfileInfoRow(
          getLang("Town"),
          userData[0].city
            ? `<a href="https://vk.com/search?c[name]=0&c[section]=people&c[country]=1&c[city]=${userData[0].city.id}">${userData[0].city.title}</a>`
            : null
        );
        if (cityRow) {
          profileShort.appendChild(cityRow);
        }

        var occupation = userData[0].occupation;
        var companyRow;
        if (occupation && occupation.type === "work") {
          var company = occupation.name;
          var comid = occupation.id;
          var companyLink = comid
            ? `https://vk.com/club${comid}`
            : `https://vk.com/search/people?c[company]=${company}&c[name]=0`;
          companyRow = createProfileInfoRow(
            `${getLang("Work_place")}:`,
            `<a href="${companyLink}">${company}</a>`
          );
        }
        if (occupation && occupation.type === "university") {
          var company = occupation.name;
          var comid = occupation.id;
          var graduate = "";
          var companyLink = `/search/people?c[name]=10&c[uni_country]=${occupation.country_id}&c[uni_city]=${occupation.city_id}&c[university]=${comid}`;
          if (occupation.graduate_year) {
            graduate = `<a href="/search/people?c[name]=20&c[uni_country]=${occupation.country_id
              }&c[uni_city]=${occupation.city_id
              }&c[university]=${comid}&c[uni_year]=${occupation.graduate_year
              }">'${occupation.graduate_year.toString().slice(-2)}</a>`;
          }
          companyRow = createProfileInfoRow(
            `${getLang("profile_education")}`,
            `<a href="${companyLink}">${company}</a>${graduate}`
          );
        }
        if (companyRow) {
          profileShort.appendChild(companyRow);
        }

        var site = userData[0].site;
        var siteRow = null;
        if (site) {
          var siteText = site;
		  if (site.startsWith("[")) {
			const match = site.match(/\[id(\d+)\|([^|\]]+)\]/);
			if (match) {
				const id = match[1];
				const name = match[2];
				site = "https://vk.com/id" + id;
				siteText = name;
			}
		  }
          if (!site.startsWith("http://") && !site.startsWith("https://")) {
            site = "https://" + site;
          }
          siteRow = createProfileInfoRow(
            getLang("Contact_site"),
            `<a href="${site}" target="_blank">${siteText}</a>`
          );
        }
        if (siteRow) {
          profileShort.appendChild(siteRow);
        }

        var profileMoreInfo = document.createElement("div");
        profileMoreInfo.classList.add("profile_more_info");
        var profileMoreInfoLink = document.createElement("a");
        profileMoreInfoLink.classList.add("profile_more_info_link");
        var profileLabelMore = document.createElement("span");
        profileLabelMore.classList.add("profile_label_more");
        profileLabelMore.style.display = "flex";
        profileLabelMore.textContent = getMoreInfoLang(vk.lang)[0];
        var profileLabelLess = document.createElement("span");
        profileLabelLess.classList.add("profile_label_less");
        profileLabelLess.textContent = getMoreInfoLang(vk.lang)[1];
        profileMoreInfoLink.appendChild(profileLabelMore);
        profileMoreInfoLink.appendChild(profileLabelLess);
        profileMoreInfo.appendChild(profileMoreInfoLink);

        profileShort.appendChild(profileMoreInfo);

        pageCurrentInfo.appendChild(profileShort);

        function createProfileInfoRow(label, content) {
          if (!content) return null;
          var clearFix = document.createElement("div");
          clearFix.classList.add("clear_fix", "profile_info_row");
          var labelDiv = document.createElement("div");
          labelDiv.classList.add("label", "fl_l");
          labelDiv.textContent = label;
          var labeledDiv = document.createElement("div");
          labeledDiv.classList.add("labeled");
          labeledDiv.innerHTML = content;
          clearFix.appendChild(labelDiv);
          clearFix.appendChild(labeledDiv);
          return clearFix;
        }

        function formatBirthday(bdate) {
          if (!bdate) return null;
          var parts = bdate.split(".");
          var day = parts[0];
          var month = getMonthName(parts[1]);
          var year = parts[2];
          var formattedDate = `${day} ${month}`;
          var profileBDayYearLetter = getLang("profile_birthday_year_date");
          let regex = /{year}(.*?){\/link_year}/;
          let match = profileBDayYearLetter.match(regex);
          let formattedYearLetter = match ? match[1].replace(/\s/g, "") : "";
          var yearLink = year
            ? `<a href="https://vk.com/search?c[section]=people&c[byear]=${year}">${year} ${formattedYearLetter}</a>`
            : "";
          if (year) {
            formattedDate += ` ${yearLink}`;
          }
          return `<a href="https://vk.com/search?c[section]=people&c[bday]=${day}&c[bmonth]=${parts[1]}">${formattedDate}</a>`;
        }

        function langReplacePrep(e, t) {
          if (!t) return e;
          const n = window.langConfig.prep;
          if (n.length) {
            const r = n
              .map((t) => {
                const [n, r, o] = t,
                  [i, a] = n.split(","),
                  [s, l] = o.split(","),
                  c = new RegExp(i).test(e),
                  u = new RegExp(a).test(e);
                return c ? [i, r, s] : !!u && [a, r, l];
              })
              .filter((e) => !!e);
            if (2 === r.length) {
              const [n, o] = r,
                [i, a, s] = o;
              if (
                !a.split(",").find((e) => {
                  const n = e.replace("*", "");
                  return n && new RegExp(`^${n}`).test(t);
                })
              ) {
                const [r, o, i] = n;
                if (
                  o.split(",").find((e) => {
                    const n = e.replace("*", "");
                    return n && new RegExp(`^${n}`).test(t);
                  })
                )
                  return e.replace(r, i);
              }
              return e.replace(i, s);
            }
          }
          return e;
        }
        async function getRelationText(relation) {
          if (!relation) return "";
          var relationText = "";
          var relationPartner = userData[0].relation_partner;
          var sex = userData[0].sex;
          if (relationPartner) {
            var partnerData = relationPartner.id
              ? await getUserDataWithoutOnline(relationPartner.id)
              : null;
            var formatted_name = FuckName(relation, sex, partnerData[0]);
          }
          //console.log(formatted_name)
          switch (relation) {
            case 1:
              relationText =
                sex === 2
                  ? getLang("profile_m_not_married")
                  : getLang("profile_fm_not_married");
              break;
            case 2:
              relationText =
                sex === 2
                  ? getLang("profile_m_has_friend")
                  : getLang("profile_fm_has_friend");
              if (relationPartner) {
                relationText = langReplacePrep(
                  getLang("profile_meet_with_partner"),
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id}">${formatted_name}</a>`
                );
              }
              break;
            case 3:
              relationText =
                sex === 2
                  ? getLang("profile_m_engaged")
                  : getLang("profile_fm_engaged");
              if (relationPartner) {
                relationText =
                  sex === 2
                    ? getLang("profile_engaged_with_partner", "raw")[1]
                    : getLang("profile_engaged_with_partner", "raw")[2];
                relationText = langReplacePrep(
                  relationText,
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id}">${formatted_name}</a>`
                );
              }
              break;
            case 4:
              relationText =
                sex === 2
                  ? getLang("profile_m_married")
                  : getLang("profile_fm_married");
              if (relationPartner) {
                relationText =
                  sex === 2
                    ? getLang("profile_married_with_partner", "raw")[1]
                    : getLang("profile_married_with_partner", "raw")[2];
                relationText = langReplacePrep(
                  relationText,
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id}">${formatted_name}</a>`
                );
              }
              break;
            case 5:
              relationText = getLang("profile_complicated");
              if (relationPartner) {
                relationText = getLang("profile_complic_with_partner", "raw");
                relationText = langReplacePrep(
                  relationText,
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id}">${formatted_name}</a>`
                );
              }
              break;
            case 6:
              relationText = getLang("profile_in_search");
              break;
            case 7:
              relationText =
                sex === 2
                  ? getLang("profile_m_in_love")
                  : getLang("profile_f_in_love");
              if (relationPartner) {
                relationText =
                  sex === 2
                    ? getLang("profile_love_with_partner", "raw")[1]
                    : getLang("profile_love_with_partner", "raw")[2];
                relationText = langReplacePrep(
                  relationText,
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id}">${formatted_name}</a>`
                );
              }
              break;
            case 8:
              relationText = getLang("profile_civil_married");
              if (relationPartner) {
                relationText = getLang("profile_civil_married_with", "raw");
                relationText = langReplacePrep(
                  relationText,
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id}">${formatted_name}</a>`
                );
              }
              break;
            default:
              return "";
          }
          return relationText;
        }

        function getMonthName(month) {
          var monthNames = [
            getLang("month1_of"),
            getLang("month2_of"),
            getLang("month3_of"),
            getLang("month4_of"),
            getLang("month5_of"),
            getLang("month6_of"),
            getLang("month7_of"),
            getLang("month8_of"),
            getLang("month9_of"),
            getLang("month10_of"),
            getLang("month11_of"),
            getLang("month12_of"),
          ];
          return monthNames[parseInt(month) - 1];
        }
      }

      function getTimeString(onlineInfo) {
        let currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
        let secondsAgo = currentTime - onlineInfo.last_seen;
        let justNow = getLang("global_just_now");
        let secsAgo = getLang("global_secs_ago", "raw");
        let minsAgo = getLang("global_mins_ago", "raw");
        let hoursAgo = getLang("global_hours_ago", "raw");
		let hours12345 = getLang("global_word_hours_ago", "raw");
		let minutes12345 = getLang("mobile_profile_status_word_mins_ago", "raw");
        let longAgo = getLang("vkui_common_short_date_time", "raw");

        if (secondsAgo == 0) {
          return justNow;
        } else if (secondsAgo < 60) {
          let secString = getLangTime(secondsAgo, secsAgo);
          return secString;
        } else if (secondsAgo < 3600) {
		  let minutesAgo = Math.floor(secondsAgo / 60);
		  let minString;
		  if(minutesAgo<6)
		  {
			minString = minutes12345[minutesAgo];
		  }
		  else {
          minString = getLangTime(minutesAgo, minsAgo);
		  }
          return minString;
        } else if (secondsAgo < 14400) {
		  let hourssAgo = Math.floor(secondsAgo / 3600);
          let hourString;
		  hourString = hours12345[hourssAgo];
          return hourString;
        } else {
          let lastSeenDate = new Date(onlineInfo.last_seen * 1000);
          let day = lastSeenDate.getDate();
          let month = getMonthNameOnline(lastSeenDate.getMonth() + 1);
          let hour = lastSeenDate.getHours();
          let minute = lastSeenDate.getMinutes().toString().padStart(2, "0");

          let dateString;
          if (secondsAgo < 86400) {
            dateString = longAgo[3]
              .replace("{hour}", hour)
              .replace("{minute}", minute);
          } else if (secondsAgo < 172800) {
            dateString = longAgo[2]
              .replace("{hour}", hour)
              .replace("{minute}", minute);
          } else {
            dateString = longAgo[1]
              .replace("{day}", day)
              .replace("{month}", month)
              .replace("{hour}", hour)
              .replace("{minute}", minute);
          }

          if (dateString.includes("{am_pm}")) {
            let am_pm = hour >= 12 ? "PM" : "AM";
            let newHour = hour % 12 || 12; // Преобразуем часы в формат 12-часового времени
            dateString = dateString
              .replace(hour, newHour)
              .replace("{am_pm}", am_pm);
          }

          return dateString;
        }
      }

      function getLangTime(e, t, n) {
        const o = window.langConfig;
        if (!t || !o) {
          if (!(0, r.isNumeric)(e)) {
            const t = new Error("Non-numeric value passed to langNumeric");
            throw (console.log(e, t), t);
          }
          return String(e);
        }
        let i;
        Array.isArray(t)
          ? ((i = t[1]),
            e != Math.floor(e)
              ? (i = t[o.numRules.float])
              : (o.numRules.int || []).some((n) => {
                if ("*" === n[0]) return (i = t[n[2]]), !0;
                const r = n[0] ? e % n[0] : e;
                return Array.isArray(n[1]) && n[1].includes(r)
                  ? ((i = t[n[2]]), !0)
                  : void 0;
              }))
          : (i = t);
        let a = String(e);
        if (n) {
          const e = a.split("."),
            t = [];
          for (let n = e[0].length - 3; n > -3; n -= 3)
            t.unshift(e[0].slice(n > 0 ? n : 0, n + 3));
          (e[0] = t.join(o.numDel)), (a = e.join(o.numDec));
        }
        return (i = (i || "%s").replace("%s", a)), i;
      }

      function getMonthNameOnline(month) {
        var monthNames = [
          getLang("month1_of"),
          getLang("month2_of"),
          getLang("month3_of"),
          getLang("month4_of"),
          getLang("month5_of"),
          getLang("month6_of"),
          getLang("month7_of"),
          getLang("month8_of"),
          getLang("month9_of"),
          getLang("month10_of"),
          getLang("month11_of"),
          getLang("month12_of"),
        ];
        return monthNames[parseInt(month) - 1];
      }
      async function getUserData(objectId) {
        try {
          var response = await vkApi.api("users.get", {
            user_ids: objectId,
            fields:
              "quotes, games, movies, music, photo_400_orig, universities, activities, about, books, bdate, can_see_audio, can_write_private_message, career, city, connections, contacts, counters, country, crop_photo, education, has_photo, home_town, interests, military, nickname, occupation, online, personal, quotes, relatives, relation, schools, sex, site, tv, id,first_name,first_name_gen,first_name_acc,last_name,last_name_gen,last_name_acc,sex,has_photo,photo_id,photo_50,photo_100,photo_200,contact_name,occupation,bdate,city,screen_name,online_info,verified,blacklisted,blacklisted_by_me,can_call,can_write_private_message,can_send_friend_request,can_invite_to_chats,friend_status,followers_count,profile_type,contacts,employee_mark,employee_working_state,is_service_account,image_status,name,type,members_count,member_status,is_closed,can_message,deactivated,activity,ban_info,is_messages_blocked,can_post_donut,site,reposts_disabled,description,action_button,menu,role,first_name_nom,first_name_gen,first_name_dat,first_name_acc,first_name_ins,last_name_gen,last_name_dat,last_name_acc,last_name_ins,nickname,maiden_name,screen_name,first_name,last_name",
          });
          console.info("[VK ENH] Profile fetched");
          console.log(response[0]);
		  if(!response[0].hidden) {
          let wasInSetb = getLang("profile_last_seen", "raw");
          let newLangArray = wasInSetb.map((item) => item.replace(/%s/, ""));
          let index = response[0].sex === 1 ? 2 : 1;
          let zahodil = newLangArray[index];
          if (zahodil == "") {
            zahodil = newLangArray[response[0].sex];
          }
          let onlineInfo = getTimeString(response[0].online_info);
          let zahodilString = zahodil + " " + onlineInfo;
          try {
            let onlineBadgeByl = document.querySelector(
              ".ProfileIndicatorBadge__badgeLastSeen"
            );
            onlineBadgeByl.textContent = zahodilString;

            if (response[0].online_info.is_mobile) {
              let mobileDiv = document.createElement("div");
              mobileDiv.className = "vkEnhancerMobileWas";
              onlineBadgeByl.appendChild(mobileDiv);
            }
          } catch (error) { }
          try {
            let onlineBadgeComp = document.querySelector(
              ".ProfileIndicatorBadge__badgeOnline"
            );
            onlineBadgeComp.textContent = "Online";
          } catch (error) { }
          try {
            let onlineBadgeMob = document.querySelector(
              ".ProfileIndicatorBadge__badgeOnlineMobile"
            );
            onlineBadgeMob.textContent = "Onlineᅠ​";
		} catch (error) { }}
          /*let styleElement = fromId("vken_box_online_classic");
          if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = "vken_box_online_classic";
            document.head.appendChild(styleElement);
          }
          styleElement.id = "vken_box_online_classic";
          let wasInSetb = getLang("profile_last_seen","raw");
          let newLangArray = wasInSetb.map(item => item.replace(/%s/, ""));
          styleElement.innerHTML = `.ProfileIndicatorBadge__badgeLastSeen::before {content:"`+newLangArray[response[0].sex === 2 ? 1 : 2]+`​ ​"}`;*/
          return response;
        } catch (error) {
          console.error(error);
          return [];
        }
      }

      async function getUserDataWithoutOnline(objectId) {
        try {
          var response = await vkApi.api("users.get", {
            user_ids: objectId,
            fields:
              "quotes, games, movies, music, photo_400_orig, universities, activities, about, books, bdate, can_see_audio, can_write_private_message, career, city, connections, contacts, counters, country, crop_photo, education, has_photo, home_town, interests, military, nickname, occupation, online, personal, quotes, relatives, relation, schools, sex, site, tv, id,first_name,first_name_gen,first_name_acc,last_name,last_name_gen,last_name_acc,sex,has_photo,photo_id,photo_50,photo_100,photo_200,contact_name,occupation,bdate,city,screen_name,online_info,verified,blacklisted,blacklisted_by_me,can_call,can_write_private_message,can_send_friend_request,can_invite_to_chats,friend_status,followers_count,profile_type,contacts,employee_mark,employee_working_state,is_service_account,image_status,name,type,members_count,member_status,is_closed,can_message,deactivated,activity,ban_info,is_messages_blocked,can_post_donut,site,reposts_disabled,description,action_button,menu,role,first_name_nom,first_name_gen,first_name_dat,first_name_acc,first_name_ins,last_name_gen,last_name_dat,last_name_acc,last_name_ins,nickname,maiden_name,screen_name,first_name,last_name",
          });
          //console.log("[VK ENH] Profile fetched" + response);
          return response;
        } catch (error) {
          console.error(error);
          return [];
        }
      }

      async function getId() {
        const url = window.location.href;
        var parts = url.split("/");
        var username = parts[parts.length - 1];
        if (username.includes("?")) {
          username = username.split("?")[0];
        }
        const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
        try {
          const response = await fetch(url1);
          const data = await response.json();
          return data.response.object_id;
        } catch (error) {
          console.error(error);
          return 1;
        }
      }

      function appendProfilePhoto(photoUrl) {
        var img = document.createElement("img");
        img.src = photoUrl;
        var profileAva = document.querySelector(
          ".ProfileWrapper__root .ProfileHeader__ava"
        );
        profileAva.appendChild(img);
      }

function getIdAntiAsync() {
      const url = window.location.href;
  var parts = url.split("/");
  var username = parts[parts.length - 1];
  if (username.includes("?")) {
    username = username.split("?")[0];
  }
  const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
  return fetch(url1)
    .then(response => response.json())
    .then(data => data.response.object_id)
    .catch(error => {
      console.error(error);
      return 1;
    });
}

async function changeBroadcastState() {
	let expVa = await ajax.promisifiedPost("al_audio.php?act=status_tt", {});
	let expVal = expVa[1].is_profile_active;
	let j = ap.getCurrentAudio();
	try {
		let o = `${j[1]}_${j[0]}`;
	}
	catch(error) {
		return;
	}
	await ajax.promisifiedPost("al_audio.php?act=toggle_status", {
        exp: +!expVal,
        oid: window.vk.id,
        hash: window.vk.statusExportHash,
        id:o,
        top: 0,
        access_key: ""
    })
	let statusVK = document.querySelector('.page_current_info');
	statusVK.remove();
}

function getPhotoEditHash() {
    let script = Array.from(document.querySelectorAll('script')).find(e=>e.innerHTML.includes('window.initReactApplication'));
    let scriptContent = script.innerHTML;
    let startIndex = scriptContent.indexOf('"hashes":{');
    let endIndex = scriptContent.indexOf('}', startIndex) + 1;
    let hashesString = scriptContent.substring(startIndex, endIndex);
    let braceIndex = hashesString.indexOf('{');
    hashesString = hashesString.substring(braceIndex);
    let hashesObject = JSON.parse(hashesString);
    let avatarEditHash = hashesObject.avatarEdit;
    return avatarEditHash;
}

function appendActivityText(activityText) {
    getIdAntiAsync().then(objectId => {
		let broadcast = document.querySelector('.ProfileInfo__broadcast');
		if(!broadcast) {
        if (vk.id != objectId) {
            var activitySpan = document.createElement("span");
            activitySpan.classList.add("page_current_info");
            activitySpan.classList.add("current_text");
            activitySpan.textContent = activityText;
            
            var ownerPageName = document.getElementById("owner_page_name");
            ownerPageName.insertAdjacentElement('afterend', activitySpan); 
        } else {
			var ip_h = vk.ip_h;
            var activitySpan = document.createElement("div");
            activitySpan.style.width = "100%";
			if(activityText != '') {
				activitySpan.innerHTML = '<div class="page_current_info" id="page_current_info"><div id="currinfo_editor" class="page_status_editor clear" onclick="cancelEvent(event)" style="display: none;"> <div class="editor"> <div class="page_status_input_wrap _emoji_field_wrap"> <div class="emoji_smile_wrap _emoji_wrap"> <div class="emoji_smile _emoji_btn" role="button" title="Используйте TAB, чтобы быстрее открывать смайлы" onmouseenter="return Emoji.show(this, event);" onmouseleave="return Emoji.hide(this, event);" onclick="return cancelEvent(event);" aria-label="Добавить эмодзи или стикер"> <div class="emoji_smile_icon_inline_svg emoji_smile_icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49s1.39-.25 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13c-.27.33-.61.6-.97.83a5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.1a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8zM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0z" fill="currentColor"></path></svg></div> </div> </div> <div class="page_status_input" id="currinfo_input" contenteditable="true" role="textbox">' + activityText + '</div> </div> <div class="page_status_audio checkbox" id="currinfo_audio" onclick="checkbox(this);" role="checkbox" aria-checked="false" tabindex="0">Транслировать музыку в статус</div> <div class="page_status_app checkbox on unshown" id="currinfo_app" onclick="checkbox(this); Profile.appStatusUpdate(`' + ip_h+ '`)" role="checkbox" aria-checked="true" tabindex="0">Показывать приложение в статусе</div> <button class="flat_button button_small page_status_btn_save" id="currinfo_save">Сохранить</button> </div> </div> <div id="currinfo_wrap" onclick="return Page.infoEdit();" tabindex="0" role="button" style="display: block;"> <span id="current_info" class="current_info"><span class="my_current_info"><span class="current_text">' + activityText + '</span></span></span> </div> <div id="currinfo_fake" style="display: none;"><span class="my_current_info"><span class="current_text">' + activityText + '</span></span></div></div>';
			}
			else {
				activitySpan.innerHTML = '<div class="page_current_info" id="page_current_info"><div id="currinfo_editor" class="page_status_editor clear" onclick="cancelEvent(event)" style="display: none;"> <div class="editor"> <div class="page_status_input_wrap _emoji_field_wrap"> <div class="emoji_smile_wrap _emoji_wrap"> <div class="emoji_smile _emoji_btn" role="button" title="Используйте TAB, чтобы быстрее открывать смайлы" onmouseenter="return Emoji.show(this, event);" onmouseleave="return Emoji.hide(this, event);" onclick="return cancelEvent(event);" aria-label="Добавить эмодзи или стикер"> <div class="emoji_smile_icon_inline_svg emoji_smile_icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49s1.39-.25 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13c-.27.33-.61.6-.97.83a5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.1a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8zM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0z" fill="currentColor"></path></svg></div> </div> </div> <div class="page_status_input" id="currinfo_input" contenteditable="true" role="textbox"></div> </div> <div class="page_status_audio checkbox" id="currinfo_audio" onclick="checkbox(this);" role="checkbox" aria-checked="false" tabindex="0">Транслировать музыку в статус</div> <div class="page_status_app checkbox on unshown" id="currinfo_app" onclick="checkbox(this); Profile.appStatusUpdate(`' + ip_h+ '`)"="" role="checkbox" aria-checked="true" tabindex="0">Показывать приложение в статусе</div> <button class="flat_button button_small page_status_btn_save" id="currinfo_save" style="">Сохранить</button> </div> </div> <div id="currinfo_wrap" onclick="return Page.infoEdit();" tabindex="0" role="button" style="display: block;"> <span id="current_info" class="current_info"><span class="no_current_info">установить статус</span></span> </div> <div id="currinfo_fake" style="display: none;"><span class="no_current_info">установить статус</span></div></div>';
			}
			var ownerPageName = document.getElementById("owner_page_name");
            ownerPageName.insertAdjacentElement('afterend', activitySpan);
			var checkBoxChecked;
			document.arrive('#currinfo_audio', { existing: true }, function (e) {
				e.addEventListener("click", function() {
					checkBoxChecked = e.getAttribute("aria-checked");
					var saveButtonStatus = document.querySelector("#currinfo_save");
					if(checkBoxChecked == "true") {
						let statusInput = document.querySelector('.page_status_input');
						statusInput.setAttribute("contenteditable", false);
						console.log("Event listener added");
						saveButtonStatus.addEventListener("click", changeBroadcastState);
					}
					else {
						let statusInput = document.querySelector('.page_status_input');
						statusInput.setAttribute("contenteditable", true);
						console.log("Event listener removed");
						saveButtonStatus.removeEventListener("click", changeBroadcastState);
					}
				});
			});
			document.arrive('.ProfileBroadcast__checkbox', { existing: true }, function (e) {
				e.addEventListener("click", ()=>{page.audioStatusUpdate(window.vk.statusExportHash)});
			});
			let pHeaderAva = document.querySelectorAll('.OwnerPageAvatar')[1];
			console.log(pHeaderAva);
			pHeaderAva.remove();
			let pHeaderAva1 = document.querySelectorAll('.ProfileHeader__ava')[1];
			pHeaderAva1.style.position = "relative";
			pHeaderAva1.style.left = "-200px";
			let pHeaderIn = document.querySelectorAll('.ProfileHeader__in')[1];
			let jopa = document.createElement("div");
			jopa.classList.add("owner_photo_wrap");
			jopa.classList.add("actions_with_effects");
			jopa.style.zIndex = "10";
			jopa.style.position = "relative";
			jopa.style.left = "-8px";
			jopa.style.top = "-5px";
			jopa.id = "owner_photo_wrap";
			let userDataOwner;
			getUserDataPhoto(vk.id).then(e=>{
				userDataOwner = e;
				let userPhotoAva = userDataOwner[0].photo_id;
				let photo200 = userDataOwner[0].photo_200;
				deferredCallback(
					() => {
						try {
						jopa.innerHTML = `<div class="owner_photo_top_bubble_wrap"> <div class="owner_photo_top_bubble"> <div class="ui_thumb_x_button" onclick="showFastBox(getLang('global_warning'), getLang('profile_really_delete_photo'), getLang('global_delete'),()=>{ vkApi.api('users.get',{fields:'photo_id'}).then(e=>{ vkApi.api('photos.delete',{owner_id:`+vk.id+`,photo_id:`+userDataOwner[0].photo_id.split("_")[1]+`}).then(e=>{ window.curBox().hide(true);location.reload(true); }) }) },getLang('global_cancel'))" data-title=`+getLang('profile_delete_photo')+` onmouseover="showTitle(this);" tabindex="0" role="button" aria-label=`+getLang('profile_delete_photo')+`> <div class="ui_thumb_x"></div> </div> </div> </div> <div class="page_avatar_wrap" id="page_avatar_wrap"> <aside aria-label="Фотография"> <div id="page_avatar" class="page_avatar"><a id="profile_photo_link" href="https://vk.com/photo`+userPhotoAva+`" onclick="return showPhoto('`+userPhotoAva+`', 'album`+vk.id+`_0/rev', {&quot;temp&quot;:{&quot;x&quot;:&quot;`+photo200+`&amp;quality=95&amp;sign=0449f67717df7848702286a3d078dbf3&amp;type=album&quot;,&quot;y&quot;:&quot;`+photo200+`;quality=95&amp;sign=850d65bf30f3e8721f1a76410c013d90&amp;type=album&quot;,&quot;z&quot;:&quot;`+photo200+`&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,&quot;w&quot;:&quot;`+photo200+`&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,&quot;x_&quot;:[&quot;`+photo200+`&amp;quality=95&amp;sign=0449f67717df7848702286a3d078dbf3&amp;type=album&quot;,604,499],&quot;y_&quot;:[&quot;`+photo200+`&amp;quality=95&amp;sign=850d65bf30f3e8721f1a76410c013d90&amp;type=album&quot;,807,667],&quot;z_&quot;:[&quot;`+photo200+`&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,1080,893],&quot;w_&quot;:[&quot;`+photo200+`&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,1080,893],&quot;base&quot;:&quot;&quot;},&quot;jumpTo&quot;:{&quot;z&quot;:&quot;albums`+vk.id+`&quot;}}, event)"><img class="page_avatar_img" src="`+photo200+`"></a> </div> </aside> </div> <div class="owner_photo_bubble_wrap"> <div class="owner_photo_bubble"> <div class="owner_photo_bubble_action owner_photo_bubble_action_update" data-task-click="Page/owner_new_photo" data-options="{&quot;useNewForm&quot;:true,&quot;ownerId&quot;:`+vk.id+`}" tabindex="0" role="button"> <span class="owner_photo_bubble_action_in">`+getLang('profile_update_photo')+`</span> </div> <div class="owner_photo_bubble_action owner_photo_bubble_action_crop" data-task-click="Page/owner_edit_photo" data-options="{&quot;useNewForm&quot;:true,&quot;ownerId&quot;:`+vk.id+`,&quot;hash&quot;:&quot;`+getPhotoEditHash()+`&quot;}" tabindex="0" role="button"> <span class="owner_photo_bubble_action_in">`+getLang('profile_edit_small_copy')+`</span> </div> <div class="owner_photo_bubble_action owner_photo_bubble_action_effects" onclick="Page.ownerPhotoEffects('`+userPhotoAva+`', `+vk.id+`)" tabindex="0" role="button"> <span class="owner_photo_bubble_action_in">`+getLang('profile_photo_action_effects')+`</span> </div> </div> </div>`;
						}
						catch(error) {
							jopa.innerHTML = `<div class="page_avatar_wrap" id="page_avatar_wrap"> <aside aria-label="Фотография"> <div id="page_avatar" class="page_avatar"> <a id="profile_photo_link" href="https://vk.com/photo` + userPhotoAva + `" onclick="return showPhoto('` + userPhotoAva + `', 'album` + vk.id + `_0/rev', {&quot;temp&quot;:{&quot;x&quot;:&quot;` + photo200 + `&amp;quality=95&amp;sign=0449f67717df7848702286a3d078dbf3&amp;type=album&quot;,&quot;y&quot;:&quot;` + photo200 + `;quality=95&amp;sign=850d65bf30f3e8721f1a76410c013d90&amp;type=album&quot;,&quot;z&quot;:&quot;` + photo200 + `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,&quot;w&quot;:&quot;` + photo200 + `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,&quot;x_&quot;:[&quot;` + photo200 + `&amp;quality=95&amp;sign=0449f67717df7848702286a3d078dbf3&amp;type=album&quot;,604,499],&quot;y_&quot;:[&quot;` + photo200 + `&amp;quality=95&amp;sign=850d65bf30f3e8721f1a76410c013d90&amp;type=album&quot;,807,667],&quot;z_&quot;:[&quot;` + photo200 + `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,1080,893],&quot;w_&quot;:[&quot;` + photo200 + `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,1080,893],&quot;base&quot;:&quot;&quot;},&quot;jumpTo&quot;:{&quot;z&quot;:&quot;albums` + vk.id + `&quot;}}, event)"><img class="page_avatar_img" src="` + photo200 + `"></a> </div> </aside> </div> <div class="owner_photo_bubble_wrap"> <div class="owner_photo_bubble"> <div class="owner_photo_bubble_action owner_photo_bubble_action_update owner_photo_no_ava" data-task-click="Page/owner_new_photo" data-options="{&quot;useNewForm&quot;:true,&quot;ownerId&quot;:` + vk.id + `}" tabindex="0" role="button"> <span class="owner_photo_bubble_action_in">`+getLang('profile_load_photo')+`</span> </div> </div> </div>`;
							let styleElement = fromId("vkenNoAva");
							if (!styleElement) {
								styleElement = document.createElement("style");
								styleElement.id = "vkenNoAva";
								document.head.appendChild(styleElement);
							}
							styleElement.id = "vkenNoAva";
							styleElement.innerHTML = `.owner_photo_bubble_wrap:has(>.owner_photo_bubble>.owner_photo_no_ava){margin-top:-35px;height:36px;}`;
						}
					},
				{ variable: "MECommonContext" }
				);
				pHeaderIn.prepend(jopa);
			});
		}
	}
		appearVariable();
    });
}

async function getUserDataPhoto(objectId) {
        try {
          var response = await vkApi.api("users.get", {
            user_ids: objectId,
            fields:
              "photo_id,photo_200",
          });
          return response;
        } catch (error) {
          console.error(error);
          return [];
        }
      }
    }
  },
  { variable: "urls" }
);
///КОНЕЦ КЛАССИЧЕСКОГО ДИЗАЙНА ПРОФИЛЯ///
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
  var i = await vkApi.api("users.get", { user_ids: username });
  objectId = i[0].id;
  switch (objectId) {
    case 185853506:
      appendIcons(["founder", "dev", "designer"]);
      break;
    case 539793061:
      appendIcons(["dev"]);
      break;
    case 86322416:
      appendIcons(["help", "old"]);
      break;
  }
}

function createSVG() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");
  svg.setAttribute("viewBox", "0 0 20 20");
  svg.setAttribute("fill", "none");
  svg.classList.add("vkEnhancerBadgeStaff");
  svg.style.marginLeft = "8px";
  svg.style.marginTop = "6px";

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("clip-path", "url(#clip0_120_106)");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M0 9.6C0 5.0745 0 2.81177 1.40589 1.40589C2.81177 0 5.0745 0 9.6 0H10.4C14.9255 0 17.1882 0 18.5941 1.40589C20 2.81177 20 5.0745 20 9.6V10.4C20 14.9255 20 17.1882 18.5941 18.5941C17.1882 20 14.9255 20 10.4 20H9.6C5.0745 20 2.81177 20 1.40589 18.5941C0 17.1882 0 14.9255 0 10.4V9.6Z"
  );
  path1.setAttribute("fill", "#2961F4");

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("fill-rule", "evenodd");
  path2.setAttribute("clip-rule", "evenodd");
  path2.setAttribute(
    "d",
    "M18.5236 18.6629C17.1126 20.0001 14.8506 20.0001 10.4 20.0001H9.60002C5.14957 20.0001 2.88746 20.0001 1.47656 18.663V17.3155C1.47656 15.5734 2.88882 14.1611 4.63092 14.1611H15.3692C17.1113 14.1611 18.5236 15.5734 18.5236 17.3155V18.6629Z"
  );
  path2.setAttribute("fill", "#589AFA");

  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute(
    "d",
    "M11.0255 14.1612C6.21427 14.1612 3.47006 11.1884 3.35571 6.2417H5.76573C5.84489 9.87243 7.6216 11.4104 9.02887 11.7274V6.2417H9.363C12.0311 6.2417 13.7337 6.2417 14.8147 6.2417C15.8596 6.2417 16.5837 7.08876 16.5837 8.13369C16.5837 8.13369 12.9883 8.13369 11.2983 8.13369V9.45816H16.5837V11.2556H11.2983V12.5259H16.5837C16.5837 13.429 15.8516 14.1612 14.9485 14.1612H11.0255Z"
  );
  path3.setAttribute("fill", "white");

  g.appendChild(path1);
  g.appendChild(path2);
  g.appendChild(path3);
  svg.appendChild(g);

  return svg;
}

function createTooltipText(roles) {
  const tooltipText = document.createElement("div");
  tooltipText.style.position = "absolute";
  tooltipText.style.fontSize = "13px";
  tooltipText.style.fontWeight = "400";
  tooltipText.style.backgroundColor = "var(--vkui--color_background_tertiary)";
  tooltipText.style.borderRadius = "8px";
  tooltipText.style.border =
    "2px solid 1px solid var(--vkui--color_separator_primary)";
  tooltipText.style.color =
    "2px solid 1px solid var(--vkui--color_text_primary)";
  tooltipText.style.padding = "4px 24px";
  tooltipText.style.boxShadow = "var(--vkui--elevation3)";
  tooltipText.style.zIndex = "999999";

  roles.forEach((role) => {
    let text;
    switch (role) {
      case "founder":
        text =
          '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><rect width="20" height="20" rx="10" fill="url(#paint0_linear_35635_1132)"/><path d="M11.9853 7.37283L14.614 7.63087C15.5287 7.72065 15.8092 8.6348 15.1029 9.23539L13.0449 10.9854L13.8089 13.8362C14.0598 14.7724 13.2814 15.3392 12.5018 14.7757L10.0012 12.9686L7.50063 14.7757C6.72414 15.3369 5.94255 14.7726 6.19348 13.8362L6.95747 10.9854L4.8995 9.23539C4.19024 8.63228 4.46965 7.72106 5.38824 7.63087L8.01645 7.37283L9.17437 4.64137C9.53698 3.78598 10.4656 3.78641 10.828 4.64146L11.9853 7.37283Z" fill="white"/><defs><linearGradient id="paint0_linear_35635_1132" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#70B2FF"/><stop offset="1" stop-color="#5C9CE6"/></linearGradient></defs></svg><div style="margin-left: 8px;">Создатель расширения VK Enhancer</div></div>';
        break;
      case "dev":
        text =
          '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="url(#paint0_linear_35635_1242)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.63935 15.1031C3.78688 14.2515 3.78688 12.8706 4.63935 12.0189L6.19473 10.465C6.30756 10.3522 6.34834 10.1873 6.31179 10.032C6.22658 9.67008 6.18151 9.29268 6.18151 8.90475C6.18151 6.19593 8.37945 4 11.0908 4C11.693 4 12.2699 4.10833 12.803 4.30656C13.0793 4.40932 13.1349 4.76017 12.9269 4.96912L11.036 6.86858C10.9546 6.95036 10.9089 7.06105 10.9089 7.17644V8.65467C10.9089 8.89567 11.1043 9.09104 11.3453 9.09104H12.8209C12.9362 9.09104 13.0469 9.04535 13.1287 8.96397L15.0309 7.07085C15.2398 6.86297 15.5905 6.91843 15.6933 7.19461C15.8916 7.72708 16 8.30328 16 8.90475C16 11.6136 13.8021 13.8095 11.0908 13.8095C10.7081 13.8095 10.3356 13.7658 9.97808 13.683C9.82346 13.6472 9.65948 13.688 9.5472 13.8002L7.98473 15.3612C7.13226 16.2129 5.75014 16.2129 4.89767 15.3612L4.63935 15.1031Z" fill="white"/><defs><linearGradient id="paint0_linear_35635_1242" x1="-11.3295" y1="-12.7168" x2="18.3815" y2="17.4567" gradientUnits="userSpaceOnUse"><stop stop-color="#FFB73D"/><stop offset="1" stop-color="#FFA000"/></linearGradient></defs></svg><div style="margin-left: 8px;">Разработчик расширения VK Enhancer</div></div>';
        break;
      case "designer":
        text =
          '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="url(#paint0_radial_35635_1237)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.2494 4.7288C11.8594 5.41811 11.7951 6.47143 11.1058 7.08144L9.69121 8.33333H13.83C15.6712 8.33333 16.5343 10.6109 15.1554 11.8311L11.1058 15.4148C10.4165 16.0248 9.3632 15.9605 8.75319 15.2712C8.14317 14.5819 8.20746 13.5286 8.89678 12.9185L10.3114 11.6667H6.17262C4.3314 11.6667 3.46838 9.38911 4.84719 8.16892L8.89678 4.58521C9.58609 3.9752 10.6394 4.03948 11.2494 4.7288Z" fill="white"/><defs><radialGradient id="paint0_radial_35635_1237" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.52601 2.36994) rotate(45.4424) scale(21.173 27.2409)"><stop offset="0.0433247" stop-color="#FFD44C"/><stop offset="0.353531" stop-color="#FF962E"/><stop offset="0.702496" stop-color="#FF5773"/><stop offset="1" stop-color="#FA60A3"/></radialGradient></defs></svg><div style="margin-left: 8px;">Дизайнер расширения VK Enhancer</div></div>';
        break;
      case "help":
        text =
          '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <rect width="20" height="20" rx="10" fill="url(#paint0_linear_35635_1261)"/> <path d="M6.2 6.5C6.53137 6.5 6.8 6.76863 6.8 7.1V9.3498C6.8 9.59833 7.00147 9.7998 7.25 9.7998V9.7998C7.49853 9.7998 7.7 9.59833 7.7 9.3498V5.6C7.7 5.26863 7.96863 5 8.3 5V5C8.63137 5 8.9 5.26863 8.9 5.6V8.8498C8.9 9.09833 9.10147 9.2998 9.35 9.2998V9.2998C9.59853 9.2998 9.8 9.09833 9.8 8.8498V4.89981C9.8 4.56843 10.0686 4.2998 10.4 4.2998V4.2998C10.7314 4.2998 11 4.56843 11 4.8998V8.8498C11 9.09833 11.2015 9.2998 11.45 9.2998V9.2998C11.6985 9.2998 11.9 9.09833 11.9 8.8498V5.8998C11.9 5.56843 12.1686 5.2998 12.5 5.2998V5.2998C12.8314 5.2998 13.1 5.56843 13.1 5.8998V11.3698L14.5154 9.80029C14.805 9.47916 15.3045 9.46601 15.6106 9.77146V9.77146C15.8876 10.048 15.9083 10.4895 15.6575 10.7901C15.0449 11.5242 13.9413 12.8469 13.2986 13.6182C12.2472 14.8799 10.7073 15.2999 9.54876 15.2999C5.76833 15.2999 5.6 12.7544 5.6 11.8928L5.6 7.1C5.6 6.76863 5.86863 6.5 6.2 6.5V6.5Z" fill="white"/> <defs> <linearGradient id="paint0_linear_35635_1261" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse"> <stop stop-color="#70B2FF"/> <stop offset="1" stop-color="#5C9CE6"/> </linearGradient> </defs> </svg><div style="margin-left: 8px;">Тестер расширения VK Enhancer</div></div>';
        break;
      case "old":
        text =
          '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <rect width="20" height="20" rx="10" fill="url(#paint0_linear_35635_1259)"/> <path d="M9.54691 4.03936C9.5956 4.00469 9.65761 3.99211 9.71676 4.00488C9.82904 4.02913 9.89958 4.13616 9.87432 4.24395L9.87428 4.24394C9.84477 4.36985 9.80783 4.46569 9.76346 4.53147C8.19037 6.86335 8.88126 8.26503 9.94201 8.41565C11.0392 8.57145 11.8417 7.86577 11.67 6.3426C11.6404 6.08032 11.6157 5.85929 11.5958 5.67949C11.5912 5.63709 11.602 5.59444 11.6264 5.55884C11.6846 5.474 11.8035 5.45056 11.8919 5.50647L11.8919 5.50645C12.2484 5.73205 12.6751 6.14228 13.172 6.73714C14.9401 8.85418 15.0092 10.6262 14.9993 11.3883C14.9636 14.1208 12.8566 16 9.99964 16C7.1427 16 5 14.1212 5 11.3883C5.01265 9.31934 6.1013 6.40699 9.10674 4.34818C9.21899 4.27128 9.36571 4.16834 9.54691 4.03936Z" fill="white"/> <defs> <linearGradient id="paint0_linear_35635_1259" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse"> <stop stop-color="#FF5263"/> <stop offset="1" stop-color="#FF3347"/> </linearGradient> </defs> </svg><div style="margin-left: 8px;">Установил VK Enhancer до релиза в магазине Chrome</div></div>';
        break;
      default:
        text = "";
        break;
    }
    tooltipText.insertAdjacentHTML("beforeend", text);
  });

  return tooltipText;
}

function appendIcons(roles) {
  const iconsContainer = document.querySelector(".OwnerPageName__icons");
  if (!iconsContainer) return;

  const svg = createSVG();
  const tooltipText = createTooltipText(roles);

  const tooltip = document.createElement("div");
  tooltip.style.opacity = "0";
  tooltip.style.pointerEvents = "none";
  tooltip.style.position = "absolute";
  tooltip.style.transition = "opacity 0.3s ease";
  tooltip.style.zIndex = "999999";
  tooltip.appendChild(tooltipText);

  svg.addEventListener("mouseenter", function () {
    tooltip.style.opacity = "1";
  });

  svg.addEventListener("mouseleave", function () {
    tooltip.style.opacity = "0";
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
function getAudioDescriptionText(lang) {
  switch (lang) {
    case 0:
      return "Прежде чем загружать аудиосообщение, убедитесь в том, что оно записано не в стерео, а в моно. Иначе оно не будет воспроизводиться в приложении на смартфонах";
      break;
    case 1:
      return "Перш ніж завантажувати аудіоповідомлення, переконайтеся в тому, що воно записане не в стерео, а в моно. Інакше воно не буде відтворюватися в додатку на смартфонах";
      break;
    case 454:
      return "Перш ніж завантажувати аудіоповідомлення, переконайтеся в тому, що воно записане не в стерео, а в моно. Інакше воно не буде відтворюватися в додатку на смартфонах";
      break;
    case 114:
      return "Перш чым загружаць аўдыяпаведамленне, пераканайцеся ў тым, што яно запісана не ў стэрэа, а ў мона. Інакш яно не будзе прайгравацца ў праграме на смартфонах";
      break;
    case 2:
      return "Перш чым загружаць аўдыяпаведамленне, пераканайцеся ў тым, што яно запісана не ў стэрэа, а ў мона. Інакш яно не будзе прайгравацца ў праграме на смартфонах";
      break;
    case 777:
      return "Прежде чем загружать радиограмму, убедитесь в том, что оно записано не в стерео, а в моно. Иначе оно не будет воспроизводиться в программе на карманных ЭВМ";
      break;
    case 97:
      return "Аудио хабарламаны жүктеп салу алдында оның стерео емес, моно форматта жазылғанына көз жеткізіңіз. Әйтпесе, ол смартфондардағы қолданбада ойнатылмайды";
      break;
    case 100:
      return "Прѣждѣ чемъ загружать аудiосообщенiя, убѣдитѣсь въ томъ, что оно записано не въ стѣрѣо, а въ моно. Иначе оно не будѣтъ воспроизводиться въ прiложѣнiи на смартфонахъ";
      break;
    default:
      return "Before you upload an audio message, make sure that it is not recorded in stereo, but in mono. Otherwise it will not play in the app on smartphones";
      break;
  }
}
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
      ".VKCOMMessenger__reforgedModalRoot > .MEConfig > .MEPopper{margin-top:-36px!important;}";
    var clmno = document.createElement("a");
    clmno.innerHTML =
      '<button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular AudioMenuPopper"><i class="ActionsMenuAction__icon"><svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--money_transfer_outline_20" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><use xlink:href="#voice_outline_24" style="fill: currentcolor;"></use></svg></i><span class="ActionsMenuAction__title">' +
      getLang("mail_audio_message") +
      "</span></button>";
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
        var contAudio = getAudioDescriptionText(vk.lang);
        VKEnhancerMessageBox(
          getLang("docs_upload_type_info_title"),
          contAudio,
          getLang("calls_translation_planned_preview_download"),
          getLang("global_cancel"),
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
      console.info("[VK ENH] File uploaded");
      console.log(data["file"]);
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
  document.arrive(
    ".post--withPostBottomAction:not(.post--withActionStatusBar)",
    { existing: true },
    function (e) {
      var postId = e.getAttribute("id");
      var postButton = e.querySelector(
        ".PostBottomAction.PostBottomAction--withBg.PostButtonReactions.PostButtonReactions--post"
      );
      if (postButton) {
        postButton.removeAttribute("onmouseenter");
        postButton.removeAttribute("onkeydown");
        postButton.setAttribute(
          "onmouseover",
          "Likes.showLikes(this, '" +
          postId.replace("post", "wall") +
          "', {isFromReactionsPreview:1})"
        );
      }
    }
  );
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
///НАЧАЛО ХОВЕРА НА ТЕГ В НОВОМ ДИЗАЙНЕ///
if (getLocalValue("isOldHover")) {
  var hoverTags = [
    'a.MessageText__link[href^="/"]',
    'a.MessageText__link[href*="vk.com"]',
  ];

  document.arrive(hoverTags, { existing: true }, function (e) {
    let href = e.getAttribute("href");
    let mentionId = href.substring(href.lastIndexOf("/") + 1);

    e.setAttribute("href", href);
    e.classList.add("mem_link");
    e.setAttribute("mention", "");
    e.setAttribute("mention_id", mentionId);
    e.removeAttribute("onclick");
    e.setAttribute(
      "onclick",
      `window.open('${href}', '_blank'); return false;`
    );
    e.setAttribute("onmouseover", "mentionOver(this)");
  });
}
///КОНЕЦ ХОВЕРА НА ТЕГ В НОВОМ ДИЗАЙНЕ///
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
    isCentralDesign === "true"
      ? getSwitchInterface(vk.lang)[0]
      : getSwitchInterface(vk.lang)[1];
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

function getSwitchInterface(lang) {
  switch (lang) {
    case 0:
      return ["Новый интерфейс", "Классический интерфейс"];
      break;
    case 1:
      return ["Новий інтерфейс", "Класичний інтерфейс"];
      break;
    case 454:
      return ["Новий інтерфейс", "Класичний інтерфейс"];
      break;
    case 114:
      return ["Новы інтэрфейс", "Класічны інтэрфейс"];
      break;
    case 2:
      return ["Новы інтэрфейс", "Класічны інтэрфейс"];
      break;
    case 777:
      return ["Новый телеграф", "Классический телеграф"];
      break;
    case 97:
      return ["Жаңа интерфейс", "Классикалық интерфейс"];
      break;
    case 100:
      return ["Новый интѣрфейс", "Классическiй интѣрфейс"];
      break;
    default:
      return ["New interface", "Classic interface"];
      break;
  }
}

async function getAllChatTabs(lang) {
  switch (lang) {
    case 0:
      return "Все чаты";
      break;
    case 1:
      return "Усі чати";
      break;
    case 454:
      return "Усі чати";
      break;
    case 114:
      return "Усе гутаркі";
      break;
    case 2:
      return "Усе гутаркі";
      break;
    case 777:
      return "Все телеграммы";
      break;
    case 97:
      return "Барлық чат";
      break;
    case 100:
      return "Всѣ бесѣды";
      break;
    case 3:
      return "All chats";
      break;
    default:
      return getLang("me_folder_list_all");
      break;
  }
}

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

if (
  im.test(window.location.href) &&
  getLocalValue("isVKMReforgedDesign")
) {
  function getNewMessengerError(lang) {
    switch (lang) {
      case 0:
        return [
          "Не удалось загрузить новый дизайн мессенджера<br><br>Нажмите, чтобы попробовать ещё раз",
          "Выполняется загрузка модуля... Ожидайте",
          "Не удалось загрузить модуль. Перезагрузите страницу",
        ];
        break;
      case 1:
        return [
          "Не вдалося завантажити новий дизайн месенджера<br><br>Натисніть, щоб спробувати ще раз",
          "Завантаження модуля... Очікуйте",
          "Не вдалося завантажити модуль. Перезавантажте сторінку",
        ];
        break;
      case 454:
        return [
          "Не вдалося завантажити новий дизайн месенджера<br><br>Натисніть, щоб спробувати ще раз",
          "Завантаження модуля... Очікуйте",
          "Не вдалося завантажити модуль. Перезавантажте сторінку",
        ];
        break;
      case 114:
        return [
          "Не атрымалася загрузіць новы дызайн мэсэнджара<br><br>Націсніце, каб паспрабаваць яшчэ раз",
          "Выконваецца загрузка модуля... Чакайце",
          "Немагчыма загрузіць модуль. Перазагрузіце старонку",
        ];
        break;
      case 2:
        return [
          "Не атрымалася загрузіць новы дызайн мэсэнджара<br><br>Націсніце, каб паспрабаваць яшчэ раз",
          "Выконваецца загрузка модуля... Чакайце",
          "Немагчыма загрузіць модуль. Перазагрузіце старонку",
        ];
        break;
      case 777:
        return [
          "Возникла оказия при загрузке новой конструкции телеграфа!<br><br>Нажмите, чтобы попробовать ещё раз, товарищ!",
          "Партия загружает модуль... Ожидайте, гражданин!",
          "Произошла непредвиденная оказия. Следует перезагрузить страницу",
        ];
        break;
      case 97:
        return [
          "Жаңа мессенджер дизайнын жүктеу мүмкін болмады<br><br>Қайталап көру үшін басыңыз",
          "Модуль жүктелуде... Күте тұрыңыз",
          "Модуль жүктелмеді. Бетті қайта жүктеңіз",
        ];
        break;
      case 100:
        return [
          "Нѣ удалось загрузить новый дизайнъ бесѣдки<br><br>Нажмитѣ, чтобъ попробовать ещё раз",
          "Выполняется загрузка модуля... Ожидайтѣ",
          "Нѣ удалось загрузить модуль. Пѣрѣзагрузите странiцу",
        ];
        break;
      default:
        return [
          "Failed to load new messenger design<br><br>Click to try again",
          "Module loading... Please wait",
          "Failed to load module. Please, reload the page",
        ];
        break;
    }
  }

  let arriveTimer;

  document.arrive(
    "#spa_root > .vkui__root:not(:has( > .VKCOMMessenger__reforgedRoot))",
    { existing: true },
    function (e) {
      vk.pe.vkm_theme_styles_settings = 1;
      let spaRoot = e;
      let rebootDiv = document.createElement("div");
      rebootDiv.classList.add("vkEnhancerRebootDiv");
      rebootDiv.style.height = "calc(100vh - var(--header-height, 0) - 32px)";
      rebootDiv.style.display = "flex";
      rebootDiv.style.justifyContent = "center";
      rebootDiv.style.alignItems = "center";
      rebootDiv.style.position = "absolute";
      rebootDiv.style.backgroundColor = "var(--vkui--color_background_content)";
      rebootDiv.style.borderRadius =
        "var(--vkui--size_border_radius_paper--regular)";
      rebootDiv.style.marginTop = "var(--page-block-offset, 15px)";
      rebootDiv.style.boxShadow =
        "inset 0 0 0 var(--vkui--size_border--regular) var(--vkui--color_field_border_alpha)";
      if (getLocalValue("isCentralDesign")) {
        rebootDiv.style.width = "550px";
      } else {
        rebootDiv.style.width = "911px";
      }
      let aReboot = document.createElement("a");
      if (window.location.href != "https://vk.com/im/?tab=all") {
        aReboot.href = "/im/?tab=all";
      } else {
        aReboot.href = "/im";
      }
      aReboot.textDecoration = "none!important";
      aReboot.style.width = "350px";
      aReboot.style.textAlign = "center";
      aReboot.innerHTML = getNewMessengerError(vk.lang)[0];
      rebootDiv.appendChild(aReboot);
      if (spaRoot) {
        spaRoot.appendChild(rebootDiv);
      }
      aReboot.addEventListener("click", async function () {
        let isMainRightRoot = document.querySelector(".MainRightRoot");
        aReboot.innerHTML = getNewMessengerError(vk.lang)[1];
        aReboot.style.pointerEvents = "none";
        if (
          !isMainRightRoot &&
          getLocalValue("isCentralDesign")
        ) {
          //console.log("MainRightRoot comeback");
          await mainRightRootComeback();
        }
        vk.pe.vkm_theme_styles_settings = 1;

        // Устанавливаем новый таймер
        clearTimeout(arriveTimer);
        arriveTimer = setTimeout(function () {
          let rebootDivDisplay = document.querySelector(".vkEnhancerRebootDiv");
          if (rebootDivDisplay) {
            aReboot.innerHTML = getNewMessengerError(vk.lang)[2];
          }
        }, 10000);
      });
    }
  );

  document.arrive(
    ".VKCOMMessenger__reforgedRoot",
    { existing: true },
    function (e) {
      clearTimeout(arriveTimer);
      let rebootDivDisplay = document.querySelector(".vkEnhancerRebootDiv");
      if (rebootDivDisplay) {
        rebootDivDisplay.style.display = "none";
      }
    }
  );

  function addConvoItem(title, href, primary, unread, muted) {
    let newElement = document.createElement("div");

    if (!primary) {
      newElement.innerHTML = `<a class="ARightRoot1 ARightRoot2 ARightRoot3 ARightRoot4 ARightRoot5 ARightRoot6" href="${href}"><span class="SpanTextRightRoot"><span class="spanPseudoText"><span class="spanPseudoText1 vkenhancerInternalCasper__text">${title}</span><div></div></span></span><i class="Y8xaRbiBmSsC_Tpc"><span class="vkuiTypography--GPQtx vkuiTypography--normalize--vH74W vkuiInternalCounter vkuiCounter--OFQXo vkuiCounter--mode-secondary--NgDxW vkuiCounter--size-s--bEhhU unreadRightCounter vkuiCaption--level-1--Wnyxa" data-muted="${muted}" data-unread="${unread ? true : false
        }">${unread}</span><svg aria-hidden="true" display="block" color="var(--vkui--color_icon_secondary)" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20 cancelButton" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06"></path></svg></i></a>`;
    } else {
      newElement.innerHTML = `<div data-simplebar="init" style="max-height: 749.5px;" class=""><div class="simplebar-wrapper" style="margin: 0px;"><div class="simplebar-height-auto-observer-wrapper"><div class="simplebar-height-auto-observer"></div></div><div class="simplebar-mask"><div class="simplebar-offset" style="right: 0px; bottom: 0px;"><div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" style="height: auto; overflow: hidden;"><div class="simplebar-content" style="padding: 0px;"><div role="separator" class="F2l1IgGrOaY823Rc"></div><a class="ARightRoot1 ARightRoot2 ARightRoot3 ARightRoot4 ARightRoot5 ARightRoot6" href="${href}"><span class="SpanTextRightRoot"><span class="spanPseudoText"><span class="spanPseudoText1 vkenhancerInternalCasper__text">${title}</span><div></div></span></span><i class="Y8xaRbiBmSsC_Tpc"><span class="vkuiTypography--GPQtx vkuiTypography--normalize--vH74W vkuiInternalCounter vkuiCounter--OFQXo vkuiCounter--mode-secondary--NgDxW vkuiCounter--size-s--bEhhU unreadRightCounter vkuiCaption--level-1--Wnyxa " data-muted="${muted}" data-unread="${unread ? true : false
        }">${unread}</span><svg aria-hidden="true" display="block" color="var(--vkui--color_icon_secondary)" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20 cancelButton" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06"></path></svg></i></a></div></div></div></div></div><div class="simplebar-track jDJiKDg_3kqgM68F simplebar-horizontal" style="visibility: hidden;"><div class="simplebar-scrollbar" style="width: 0px; display: none;"></div></div><div class="simplebar-track jDJiKDg_3kqgM68F simplebar-vertical" style="visibility: hidden;"><div class="simplebar-scrollbar" style="height: 0px; display: none;"></div></div></div>`;
    }

    return newElement;
  }

  function removeFromConvoHistory(href) {
    const convoHistory =
      getLocalValue("convo_history") || [];
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
        const simplebarContent = document.querySelector(".simplebar-content");
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

  async function mainRightRootComeback() {
    var currentPageURL12 = window.location.href;
    if (currentPageURL12.includes("/convo/")) {
      let styleElement = fromId("MEApp__mainPanel1234");
      if (!styleElement) {
        styleElement = create("style", {}, { id: "MEApp__mainPanel1234" });
        document.head.appendChild(styleElement);
      }
      styleElement.innerHTML = ".MEApp__mainPanel {display:none;}";
    }

    const vkuiRoot = document.querySelector(
      "#spa_root > .vkui__root:not(.VKCOMMessenger__reforgedRoot--settingsScreen)"
    );

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
    spanAllChats.textContent = await getAllChatTabs(vk.lang);

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
    spanArchiveChats.textContent = getLang("me_archive_title");

    linkArchive.appendChild(spanArchiveChats);

    section.appendChild(linkArchive);

    container.appendChild(nestedDiv);
    nestedDiv.appendChild(section);

    // Добавляем созданный элемент в DOM
    vkuiRoot.appendChild(container);

    let simplebarContentDiv = document.querySelector(".simplebar-content");
    let history = getLocalValue("convo_history") ?? [];
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
            history = getLocalValue("convo_history") ?? [];
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
                user_elem.dataset.unread = user.unreadCount > 0 ? true : false;
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
}

deferredCallback(
  () => {
    if (
      getLocalValue("isCentralDesign") &&
      getLocalValue("isVKMReforgedDesign")
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
          newElement.innerHTML = `<a class="ARightRoot1 ARightRoot2 ARightRoot3 ARightRoot4 ARightRoot5 ARightRoot6" href="${href}"><span class="SpanTextRightRoot"><span class="spanPseudoText"><span class="spanPseudoText1 vkenhancerInternalCasper__text">${title}</span><div></div></span></span><i class="Y8xaRbiBmSsC_Tpc"><span class="vkuiTypography--GPQtx vkuiTypography--normalize--vH74W vkuiInternalCounter vkuiCounter--OFQXo vkuiCounter--mode-secondary--NgDxW vkuiCounter--size-s--bEhhU unreadRightCounter vkuiCaption--level-1--Wnyxa" data-muted="${muted}" data-unread="${unread ? true : false
            }">${unread}</span><svg aria-hidden="true" display="block" color="var(--vkui--color_icon_secondary)" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20 cancelButton" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06"></path></svg></i></a>`;
        } else {
          newElement.innerHTML = `<div data-simplebar="init" style="max-height: 749.5px;" class=""><div class="simplebar-wrapper" style="margin: 0px;"><div class="simplebar-height-auto-observer-wrapper"><div class="simplebar-height-auto-observer"></div></div><div class="simplebar-mask"><div class="simplebar-offset" style="right: 0px; bottom: 0px;"><div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" style="height: auto; overflow: hidden;"><div class="simplebar-content" style="padding: 0px;"><div role="separator" class="F2l1IgGrOaY823Rc"></div><a class="ARightRoot1 ARightRoot2 ARightRoot3 ARightRoot4 ARightRoot5 ARightRoot6" href="${href}"><span class="SpanTextRightRoot"><span class="spanPseudoText"><span class="spanPseudoText1 vkenhancerInternalCasper__text">${title}</span><div></div></span></span><i class="Y8xaRbiBmSsC_Tpc"><span class="vkuiTypography--GPQtx vkuiTypography--normalize--vH74W vkuiInternalCounter vkuiCounter--OFQXo vkuiCounter--mode-secondary--NgDxW vkuiCounter--size-s--bEhhU unreadRightCounter vkuiCaption--level-1--Wnyxa " data-muted="${muted}" data-unread="${unread ? true : false
            }">${unread}</span><svg aria-hidden="true" display="block" color="var(--vkui--color_icon_secondary)" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20 cancelButton" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06"></path></svg></i></a></div></div></div></div></div><div class="simplebar-track jDJiKDg_3kqgM68F simplebar-horizontal" style="visibility: hidden;"><div class="simplebar-scrollbar" style="width: 0px; display: none;"></div></div><div class="simplebar-track jDJiKDg_3kqgM68F simplebar-vertical" style="visibility: hidden;"><div class="simplebar-scrollbar" style="height: 0px; display: none;"></div></div></div>`;
        }

        return newElement;
      }

      function removeFromConvoHistory(href) {
        const convoHistory =
          getLocalValue("convo_history") || [];
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
            const simplebarContent = document.querySelector(
              ".simplebar-content"
            );
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
          var simplebarContentDiv = document.querySelector(
            ".simplebar-content"
          );
          var ConvoTitle__title = document.querySelector(
            ".ConvoHeader__infoContainer >.ConvoTitle > .ConvoTitle__title"
          ).textContent;
          var ConvoUrl = new URL(window.location.href);
          var ConvoHref = ConvoUrl.pathname;

          // Создаем новый элемент

          let history = getLocalValue("convo_history") ?? [];
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
                    getLocalValue("convo_history") ?? [];
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
          spanAllChats.textContent = await getAllChatTabs(vk.lang);

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
          spanArchiveChats.textContent = getLang("me_archive_title");

          linkArchive.appendChild(spanArchiveChats);

          section.appendChild(linkArchive);

          container.appendChild(nestedDiv);
          nestedDiv.appendChild(section);

          // Добавляем созданный элемент в DOM
          vkuiRoot.appendChild(container);

          let simplebarContentDiv = document.querySelector(
            ".simplebar-content"
          );
          let history = getLocalValue("convo_history") ?? [];
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
                    getLocalValue("convo_history") ?? [];
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
document.arrive(".ConvoComposer__inputWrapper", { existing: true }, function (
  e
) {
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
});
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
          //console.info("[VK ENH] Messenger injection completed.");
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
      }); //старая добавлялка
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
            });*/ aElement.addEventListener(
        "click",
        function () {
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
        }
      );
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
    } catch (error) { }
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
