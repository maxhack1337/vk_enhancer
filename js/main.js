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
  ".Post--copyright",
  ".post_marked_as_ads",
  ".post[data-ad-block-uid]",
  ".apps_feedRightAppsBlock__row",
  ".apps_feedRightAppsBlock",
  ".apps_feedRightAppsBlock_new_apps",
  ".NewMiniAppsRightBlock__root",
].join();
const im = /(^|\/)al_im\.php|(^|\/)im(\?|$)|\/write-?\d+|\/im\/.*/;

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const createElement = document.createElement.bind(document);
const createTextNode = document.createTextNode.bind(document);
const fromId = document.getElementById.bind(document);

let intMedia = false;
var nechitalkaValue = false;
var nepisalkaValue = false;
let ajax_replaced = null;
window.urls = null;

function XHRListener() {
            const { send } = XMLHttpRequest.prototype

            XMLHttpRequest.prototype.send = function (data) {
                //console.log(data)
                if (/type=typing/.test(data) && nepisalkaValue) {
                    return this.abort()
                }
                if (/type=audiomessage/.test(data) && nepisalkaValue) {
                    return this.abort()
                }

                if (/act=a_mark_read/.test(data) && nechitalkaValue) {
                    return this.abort()

                }
                if (/act=a_mard_listened/.test(data) && nechitalkaValue) {
                    return this.abort()
                }
                return send.apply(this, Array.prototype.slice.call(arguments))
            }
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
			MECommonContext.then(e=>{
			let j = e.browserEnv.api.fetch;
			e.browserEnv.api.fetch = function (e, n, ...o) {
				if (e === "execute" && n.code && n.code.includes("messages.markAsRead") && nechitalkaValue){
					return new Promise(() => {});
				}
				if (e === "messages.setActivity" && nepisalkaValue){
					return  new Promise(() => {});
				}
				return j.apply(this, Array.prototype.slice.call(arguments));
			}
		})
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


document.arrive(adsSelector, { existing: true }, function (e) {
  e.remove();
});

document.arrive(".BurgerMenu__actionsMenu", { existing: true }, function (e) {
  var burgerim = document.querySelector(
    ".BurgerMenu__actionsMenu > div > div > div"
  );
  const changeDesign = document.createElement("button");
  changeDesign.classList.add("ActionsMenuAction");
  changeDesign.classList.add("ActionsMenuAction--secondary");
  changeDesign.classList.add("ActionsMenuAction--size-regular");
  const isCentralDesign = localStorage.getItem("isCentralDesign") || false;
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
  burgerim.addEventListener("click", function () {
    const currentValue = localStorage.getItem("isCentralDesign") === "true";
    localStorage.setItem("isCentralDesign", currentValue ? "false" : "true");
    location.reload();
  });
});
//console.log(localStorage.getItem("isCentralDesign"));
///НАЧАЛО ЦЕНТРАЛЬНОГО ДИЗАЙНА///

	  if(!im.test(window.location.href)) {
		let styleElement = fromId("rightBarClassicRemove");
		if (!styleElement) {
			styleElement = document.createElement("style");
			styleElement.id = "rightBarClassicRemove";
			document.head.appendChild(styleElement);
			}
			styleElement.innerHTML = ".MainRightRoot{display:none;}";
	  }
	  else {
		const customStyle = fromId("rightBarClassicRemove");
		if (customStyle) {
			customStyle.remove();
		}
	  }

deferredCallback(
  () => {
    if (JSON.parse(localStorage.getItem("isCentralDesign")) && JSON.parse(localStorage.getItem("isVKMReforgedDesign"))) {
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

      document.arrive(".ConvoHeader", { existing: true }, async function (e) {
        // Проверяем, существует ли элемент div с классом simplebar-content
        var simplebarContentDiv = document.querySelector(".simplebar-content");
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
        let user = obj.items.find((e) => e.peer.id == id);
        let unread = user.unread_count ? user.unread_count : 0;
        let muted = user?.push_settings?.no_sound ? true : false;
        if (!convo_other) {
          if (!simplebarContentDiv) {
            // Если элемент .simplebar-content не существует, добавляем новый элемент внутрь элемента section с классом vkenhancer--right-section
            var sectionElement = document.querySelector(
              "section.vkenhancer--right-section"
            );
            sectionElement.appendChild(
              addConvoItem(ConvoTitle__title, ConvoHref, true, unread, muted)
            );
            closeButtons();
          } else {
            simplebarContentDiv.appendChild(
              addConvoItem(ConvoTitle__title, ConvoHref, false, unread, muted)
            );
            closeButtons();
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
      });

      document.arrive(
        "#spa_root > .vkui__root",
        { existing: false, fireOnAttributesModification: true },
        async function (e) {
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
            } else {
              simplebarContentDiv.appendChild(
                addConvoItem(item.name, item.href, false, unread, muted)
              );
              closeButtons();
            }
          }
        }
      );
    }
  },
  { variable: "urls" }
);
/// КОНЕЦ ЦЕНТРАЛЬНОГО ДИЗАЙНА///
document.arrive(
  ".ConvoComposer__inputWrapper",
  { existing: true },
  function (e) {
	console.log(globalThis.HotBarAppearVAL);
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
	console.log(".ConvoMain__composer .ComposerSelecting");
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
	  if(!im.test(window.location.href)) {
		let styleElement = fromId("rightBarClassicRemove");
		if (!styleElement) {
			styleElement = document.createElement("style");
			styleElement.id = "rightBarClassicRemove";
			document.head.appendChild(styleElement);
			}
			styleElement.innerHTML = ".MainRightRoot{display:none;}";
	  }
	  else {
		const customStyle = fromId("rightBarClassicRemove");
		if (customStyle) {
			customStyle.remove();
		}
	  }
    });
  },
  { variable: "nav" }
);

function newDesign() {
  return new Promise((resolve, reject) => {
    let url = window.location.href;
    if (im.test(url)) {
      const e = document.querySelector(".body_im #wrap3");
      if (e) for (const t of e.childNodes) e.removeChild(t);
	  if (new URL(window.location.href).searchParams.get("sel") || new URL(window.location.href).searchParams.get("peers")) {
        const t = { ...window.nav.objLoc };
		window.location.href = '/im';
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
	localStorage.setItem("isVKMReforgedDesign",true)

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
	  localStorage.setItem("isVKMReforgedDesign",false)
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
