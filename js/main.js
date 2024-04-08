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
  ".ads300-thumb",
  ".js-FeedAnimatedBlock",
  ".ads600x200",
  ".ads_600x200",
  ".adsbyyottos",
  ".trg-b-banner-block",
  ".CatalogSection:has(.BannerItem--cover_header)",
  "#ads_left",
  ".audio_subscribe_promo__content",
  "#apps_ads_wrap",
  "#ads_special_promo_wrap",
  "._ads_promoted_post_data_w",
  ".ads_ads_news_wrap",
  "div#left_ads",
  ".ads_ads_box",
  'div[id^="vk_ads_"]',
  'div[id^="post-"]:has(.wall_marked_as_ads)',
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"][-ext-has=\'div[class="wall_marked_as_ads"]\']',
  "div[id^=\"post-\"][-ext-has='> div._post_content > div.post_content > div.post_info > div.wall_text > div.wall_post_cont > div.wall_marked_as_ads']",
  "div[id^=\"post-\"][-ext-has='div._post_content > div.post_content > div.post_info > div.wall_text > div.wall_marked_as_ads']",
  ".wall_wrap div[id^=\"post-\"][-ext-has='div.post_content > div.post_info > div.wall_text > div.wall_post_cont > div.wall_marked_as_ads']",
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"]:has(div[class="wall_marked_as_ads"])',
  'div[class^="feed_row "] > div[id^="feed_repost-"]:has(.wall_marked_as_ads)',
  ".wall_marked_as_ads",
  "div.post_marked_as_ads",
  "[data-ad-block-uid]",
  'div[id^="post-"]:has(.ui_actions_menu_item[href*="ad_info.php"])',
  'div[id^="post-"]:has(.ui_actions_menu_item[data-task-click="AdsLight/copy_marker_id"])',
  'feed_rows > div[class="feed_row "]:has(.ui_actions_menu_item[href*="ad_info.php"])',
  'feed_rows > div[class="feed_row "]:has(.ui_actions_menu_item[data-task-click="AdsLight/copy_marker_id"])',
  'div[id^="post-"]:has(.Post__copyright)',
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"][-ext-has=\'div[class="Post__copyright"]\']',
  "div[id^=\"post-\"][-ext-has='> div._post_content > div.post_content > div.post_info > div.wall_text > div.wall_post_cont > div.Post__copyright']",
  "div[id^=\"post-\"][-ext-has='div._post_content > div.post_content > div.post_info > div.wall_text > div.Post__copyright']",
  ".wall_wrap div[id^=\"post-\"][-ext-has='div.post_content > div.post_info > div.wall_text > div.wall_post_cont > div.Post__copyright']",
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"]:has(div[class="Post__copyright"])',
  'div[class^="feed_row "] > div[id^="feed_repost-"]:has(.Post__copyright)',
  ".Post__copyright",
  "div.Post--copyright",
  '#feed_rows > div[class="feed_row "] > div.Post--copyright',
  'div[id^="post-"]:has(.wall_authors_rec)',
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"][-ext-has=\'div[class="wall_authors_rec"]\']',
  "div[id^=\"post-\"][-ext-has='> div._post_content > div.post_content > div.post_info > div.wall_text > div.wall_post_cont > div.wall_authors_rec']",
  "div[id^=\"post-\"][-ext-has='div._post_content > div.post_content > div.post_info > div.wall_text > div.wall_authors_rec']",
  ".wall_wrap div[id^=\"post-\"][-ext-has='div.post_content > div.post_info > div.wall_text > div.wall_post_cont > div.wall_authors_rec']",
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"]:has(div[class="wall_authors_rec"])',
  'div[class^="feed_row "] > div[id^="feed_repost-"]:has(.wall_authors_rec)',
  ".wall_authors_rec",
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"][-ext-has=\'div[class="wall_live_recommended"]\']',
  "div[id^=\"post-\"][-ext-has='> div._post_content > div.post_content > div.post_info > div.wall_text > div.wall_post_cont > div.wall_live_recommended']",
  "div[id^=\"post-\"][-ext-has='div._post_content > div.post_content > div.post_info > div.wall_text > div.wall_live_recommended']",
  ".wall_wrap div[id^=\"post-\"][-ext-has='div.post_content > div.post_info > div.wall_text > div.wall_post_cont > div.wall_live_recommended']",
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"]:has(div[class="wall_live_recommended"])',
  'div[class^="feed_row "] > div[id^="feed_repost-"]:has(.wall_live_recommended)',
  ".wall_live_recommended",
  'div[id^="post-"]:has(.ShortVideoFeedBlock)',
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"][-ext-has=\'div[class="ShortVideoFeedBlock"]\']',
  "div[id^=\"post-\"][-ext-has='> div._post_content > div.post_content > div.post_info > div.wall_text > div.wall_post_cont > div.ShortVideoFeedBlock']",
  "div[id^=\"post-\"][-ext-has='div._post_content > div.post_content > div.post_info > div.wall_text > div.ShortVideoFeedBlock']",
  ".wall_wrap div[id^=\"post-\"][-ext-has='div.post_content > div.post_info > div.wall_text > div.wall_post_cont > div.ShortVideoFeedBlock']",
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"]:has(div[class="ShortVideoFeedBlock"])',
  "div[class^='feed_row'] > div[id^=\"feed_repost-\"]:has(.ShortVideoFeedBlock)",
  ".ShortVideoFeedBlock",
  "#page_block.ShortVideoFeedBlock",
  ".apps_feedRightAppsBlock_new_apps.apps_feedRightAppsBlock.page_block",
  ".apps_feedRightAppsBlock_single_app.apps_feedRightAppsBlock.page_block",
  ".apps_feedRightAppsBlock_collaborative_recommend_apps.apps_feedRightAppsBlock.page_block",
  ".apps_feedRightAppsBlock__row",
  ".apps_feedRightAppsBlock",
  ".apps_feedRightAppsBlock_new_apps",
  ".NewMiniAppsRightBlock__root",
  ".RecommendedNarrativesBlock",
  ".RecommendedNarrativesBlockBase",
  "#groups_filters_wrap > .page_block",
  "#groups_filters_wrap",
  "#feed_recommends",
  ".feed_groups_recomm",
  ".feed_friends_recomm",
  "#profile_friends_recomm",
  "#friends_right_blocks_root",
  "#group_recom_wrap",
  ".GroupsRecommendationsBlock",
  ".FriendsSuggestionsBlock",
  "#friends_possible_block",
  "#feed_friends_recomm:not(.similar_groups_block)",
  "#block_aliexpress-recommendations-carousel",
  "#recommended_narratives",
  "#feed_right_blocks_root",
  "#groups_list_right_blocks_root",
  'div[id^="post-"]:has(.wall_text_name_explain_promoted_post)',
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"][-ext-has=\'div[class="wall_text_name_explain_promoted_post"]\']',
  'div[id^="post-"]:has(.MarketItemsFeedBlock)',
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"][-ext-has=\'div[class="MarketItemsFeedBlock"]\']',
  'div[id^="post-"]:has(.block_aliexpress-recommendations-carousel)',
  '#feed_rows > div[class="feed_row "] > div[class^="feed_repost-"][-ext-has=\'div[class="block_aliexpress-recommendations-carousel"]\']',
].join();
let intMedia = false;
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const createElement = document.createElement.bind(document);
const createTextNode = document.createTextNode.bind(document);
const fromId = document.getElementById.bind(document);

document.arrive(adsSelector, { existing: true }, function (e) {
  e.remove();
});
document.arrive(
  ".ComposerInput.ConvoComposer__inputWrapper",
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
    nav.addNavigationStartListener(() => {
      window.dispatchEvent(new CustomEvent("vkNav"));
    });
  },
  { variable: "nav" }
);

window.addEventListener("message", (event) => {
  switch (event.data.action) {
	case "integrationMedia": {
		intMedia = event.data.value;
		break;
	}
    case "vkNewDesign": {
      newDesign();
      break;
    }
    case "vkNewDesignOff": {
      OldDesign();
      break;
    }
    case "muteCalls": {
      console.log("Calls muted");
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
  }
});

function newDesign() {
  deferredCallback(
    (_vk) => {
      newDesignFunctions.forEach((flag) => {
        window.vk.pe[flag] = 1;
      });
	  window.vk.pe.vkm_integration_media_viewer = intMedia ? 1:0;
      window.vk.pe.vkm_reforged_in_vkcom = 1;
      window.vk.pe.me_vkcom_api_feature_flags = 1;
      window.vk.pe.vkm_hide_forward_author = 1;
      window.vk.pe.vkm_theme_styles_settings = 1;
      console.log("Injection completed. vk.pe flags are set to 1");
    },
    { variable: "vk" }
  );
  deferredCallback(
    (_MECommonContext) => {
      _MECommonContext
        .then((e) => {
          if (e.store.featureFlags) {
            newDesignFunctions.forEach((flag) => {
              e.store.featureFlags[flag] = true;
            });
			e.store.featureFlags["vkm_integration_media_viewer"] = intMedia;
            console.log("Injection completed. Feature flags are set to true");
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
  setTimeout(() => {
    deferredCallback(
      (_wrap3) => {
        // _wrap3.childNodes.forEach(e => e.remove())
      },
      { element: ".body_im #wrap3" }
    );
  }, 100);
}
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
      HotBarAppear(globalThis.HotBarAppearVAL);
      return;
    });
    try {
      chatInputContainer[0].appendChild(hotbarDiv);
    } catch (error) {}
  }
}
function OldDesign() {
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
      console.log("Injection completed. vk.pe flags are set to 0");
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
