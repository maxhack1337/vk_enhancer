console.log('Content script is running!');
var isSecretCheck = false;
var isPostReact = false;
var isSecretEnabled = false;
/*хотбар*/
function HotBarAppear(cHotBarValue) {
    const chatInputContainer = document.getElementsByClassName("im-chat-input--textarea fl_l _im_text_input _emoji_field_wrap");
    // Проверяем, есть ли уже хотбар на странице
    const existingHotbar = document.getElementById('vkenhancerEmojiHotbarID');
    cHotBarValue = cHotBarValue.filter(function(item) {
        return item !== '' && item !== null && item !== undefined;
    });
    if (!existingHotbar && cHotBarValue.length > 0) {
        const hotbarDiv = document.createElement('div');
        hotbarDiv.className = 'vkenhancerEmojiHotbar';
        hotbarDiv.id = 'vkenhancerEmojiHotbarID';
        hotbarDiv.style.marginTop = '-10px';
        hotbarDiv.style.marginBottom = '7px';
        hotbarDiv.style.marginLeft = '9px';
        hotbarDiv.style.color = '#dee1e6';
        hotbarDiv.style.textAlign = 'center';
        hotbarDiv.style.width = '420px';
        for (let i = 0; i < cHotBarValue.length; i++) {
            const emojiCode = cHotBarValue[i];
            const emojiImgSrc = `/emoji/e/${emojiCode}.png`;
            const aElement = document.createElement('a');
            aElement.className = 'emoji_id';
            aElement.style.display = 'inline-block';
            aElement.style.position = 'relative';
            aElement.style.padding = '5px 4px';
            aElement.style.marginRight = '1px';
            aElement.style.cursor = 'pointer';
            aElement.style.zIndex = '10';
            aElement.style.transition = '0.3s background'
            aElement.addEventListener('mouseover', () => {
                aElement.style.background = 'var(--vkui--color_transparent--active)';
                aElement.style.borderRadius = '3px';
            });
            aElement.addEventListener('mouseout', () => {
                aElement.style.background = 'none';
                aElement.style.borderRadius = '0';
            });
            aElement.setAttribute('onclick', `Emoji.addEmoji(0, '${emojiCode}', this);`);
            const imgElement = document.createElement('img');
            imgElement.className = 'emoji';
            imgElement.src = emojiImgSrc;
            aElement.appendChild(imgElement);
            hotbarDiv.appendChild(aElement);
        }
        try {
            chatInputContainer[0].appendChild(hotbarDiv);
        } catch (error) {}
    }
}
// Функция для получения ID эмодзи
function getEmojiId(emoji) {
    return emoji.codePointAt(0).toString(16);
}
/*Фикс маргина для лайков*/
function updateMarginLeft() {
    if (window.location.href.includes("wall") && (isPostReact || isSecretEnabled)) {
        //console.log("Change margin for likes")
        const reactionsPreviewCount = document.querySelector('.ReactionsPreview__count[data-section-ref="like-button-count"]');
        if (reactionsPreviewCount) {
            const textLength = reactionsPreviewCount.textContent.length;
            const newMarginLeft = 8 + ((textLength - 1) * 4);
            const likeBtns = document.querySelectorAll('.PostBottomActionLikeBtns--withBgButtons .like_btns>.PostBottomAction:not(:first-child), .PostBottomActionLikeBtns--withBgButtons .like_btns>.PostBottomActionContainer:not(:first-child)');
            likeBtns.forEach(function(element) {
                element.style.marginLeft = `${newMarginLeft}px`;
            });
        }
    }
}
document.addEventListener('DOMContentLoaded', updateMarginLeft);
window.addEventListener('hashchange', updateMarginLeft);
window.addEventListener('load', updateMarginLeft);
window.addEventListener('popstate', updateMarginLeft);

function handleWlPostMutation(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && (isPostReact || isSecretEnabled) && mutation.addedNodes.length > 0 && window.location.href.includes("?w=wall")) {
            const wlPostElement = document.getElementById('wl_post');
            if (wlPostElement) {
                //console.log('Элемент с id "wl_post" появился на странице');
                updateMarginLeft()
            }
        }
    }
}

function handleWlPostMutation1(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && window.location.href.includes("im")) {
            const wlPostElement = document.getElementById('im_editable0');
            if (wlPostElement) {
                //console.log('Элемент с id "im_editable0" появился на странице');
                chrome.storage.local.get(["customHotbar"], function(items) {
                    HotBarAppear(items.customHotbar)
                });
            }
        }
    }
}
const observer = new MutationObserver(handleWlPostMutation);
const observerOptions = {
    childList: true,
    subtree: true
};
observer.observe(document, observerOptions);
const observer1 = new MutationObserver(handleWlPostMutation1);
const observerOptions1 = {
    childList: true,
    subtree: true
};
observer1.observe(document, observerOptions1);
document.addEventListener('DOMContentLoaded', function() {
    const stylusInstalled = document.querySelector('style.stylus') !== null;
    chrome.storage.local.set({
        stylusInstalled
    }, function() {
        console.log('Stylus installation status saved to cache.');
    });
});
// Режим "не беспокоить"
function applyStyleAndMuteSpecificAudio() {
    const styleElement = document.createElement("style");
    styleElement.id = "muteCalls";
    styleElement.innerHTML = '.CallModal.CallModal--isIncoming{display:none;}';
    document.head.appendChild(styleElement);
    const targetSrc = '/mp3/call_incoming.mp3';
    const audioElements = document.querySelectorAll('#calls audio');
    audioElements.forEach(function(audio) {
        if (audio.src.endsWith(targetSrc)) {
            audio.muted = true;
        }
    });
}
// Отключение режима "не беспокоить"
function removeStyleAndUnmuteSpecificAudio() {
    const customStyle = document.getElementById("muteCalls");
    if (customStyle) {
        customStyle.remove();
    }
    const targetSrc = '/mp3/call_incoming.mp3';
    const audioElements = document.querySelectorAll('#calls audio');
    audioElements.forEach(function(audio) {
        if (audio.src.endsWith(targetSrc)) {
            audio.muted = false;
        }
    });
}
// Функция для добавления стиля
function addStyle() {
    const styleElement = document.createElement("style");
    styleElement.id = "removeBadges";
    styleElement.innerHTML = '.OwnerPageAvatar--nft .OwnerPageAvatar__underlay:not(.OwnerPageAvatar__underlay--outlined) { top: calc(var(--stroke-width, 4px) * -1) !important; bottom: calc(var(--stroke-width, 4px) * -1) !important; left: calc(var(--stroke-width, 4px) * -1) !important; right: calc(var(--stroke-width, 4px) * -1) !important; } .OwnerPageAvatar--nft .OwnerPageAvatar__underlay, .AvatarRich--nft .AvatarRich__img { clip-path: none !important; -webkit-clip-path: none !important; border-radius: 50% !important; } .AvatarRich__heptagonUnderlay { display: none !important; }';
    document.head.appendChild(styleElement);
}

function removeStyle() {
    const customStyle = document.getElementById("removeBadges");
    if (customStyle) {
        customStyle.remove();
    }
}
// Функция для добавления стиля
function emojiRemove() {
    const styleElement = document.createElement("style");
    styleElement.id = "removeES";
    styleElement.innerHTML = '[class*="OwnerNameIcon-module__icon"]:not(.OwnerPageName__esia, .OwnerPageName__prometheus), .image_status__status, .PostHeaderTitle__imageStatus { display: none !important; }';
    document.head.appendChild(styleElement);
}

function emojiBack() {
    const customStyle = document.getElementById("removeES");
    if (customStyle) {
        customStyle.remove();
    }
}
// Функция для добавления стиля
function recentRemove() {
    const styleElement = document.createElement("style");
    styleElement.id = "removeRecent";
    styleElement.innerHTML = '#react_rootRecentGroups {display: none !important;}';
    document.head.appendChild(styleElement);
}

function recentBack() {
    const customStyle = document.getElementById("removeRecent");
    if (customStyle) {
        customStyle.remove();
    }
}

function altSBadd() {
    const styleElement = document.createElement("style");
    styleElement.id = "altSB";
    styleElement.innerHTML = 'body { --scrollbar_thumb:#eee; --vklScroll: var(--scrollbar_background, var(--background_content)); --vklScrollThumb: var(--scrollbar_thumb, var(--button_secondary_background_highlighted)); } ::-webkit-scrollbar { background-color: var(--vklScroll); width: 16px; } ::-webkit-scrollbar-track { background-color: var(--vklScroll); } ::-webkit-scrollbar-thumb { background-color: var(--vklScrollThumb); border-radius: 16px; border: 4px solid var(--vklScroll); } ::-webkit-scrollbar-button { display: none; }';
    document.head.appendChild(styleElement);
}

function altSBremove() {
    const customStyle = document.getElementById("altSB");
    if (customStyle) {
        customStyle.remove();
    }
}
// Функция для добавления стиля к сообщениям
function addStyle1() {
    const styleElement = document.createElement("style");
    styleElement.id = "msgReactions";
    styleElement.innerHTML = ".MessageReactionsPanel,.im-mess--reaction,.MessageReactions,MessageReactionsModalButton,.im-mess_reactions:hover .MessageReactionsModalButton,.im-mess .im-mess--reactions,.nim-dialog .nim-dialog--unread-badge_reaction,button.im-navigation.im-navigation--to-reaction._im_to_reaction.im-navigation_shown { display: none!important; }";
    document.head.appendChild(styleElement);
}

function removeStyle1() {
    const customStyle = document.getElementById("msgReactions");
    if (customStyle) {
        customStyle.remove();
    }
}

function addStyle3() {
    isSecretEnabled = true;
    setTimeout(() => {
        loadScripts();
    }, "5000");
}

function removeStyle3() {
    isSecretEnabled = false;
    console.log("Secret functions are disabled. If you want to enable them - push checkbox and reload page");
}

function addStyle2() {
    const styleElement = document.createElement("style");
    const imageUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath xmlns='http://www.w3.org/2000/svg' fill-rule='nonzero' fill='%23e64646' d='M11.95 4.83l-0.09 -0.09c-1.27,-1.23 -2.96,-1.93 -4.73,-1.94 0,0 0,0 0,0 -3.62,0 -6.55,2.93 -6.56,6.54 0,3.52 1.3,5.2 7.07,9.76l3.07 2.4c0.37,0.29 0.8,0.44 1.24,0.45l0 0c0.44,-0.01 0.88,-0.16 1.24,-0.45l3.07 -2.4c5.78,-4.56 7.07,-6.24 7.07,-9.76 -0.01,-3.61 -2.94,-6.54 -6.55,-6.54 0,0 0,0 0,0 -1.77,0.01 -3.47,0.71 -4.73,1.94l-0.1 0.09z'/%3E%3C/g%3E%3C/svg%3E";
    styleElement.id = "postReactions";
    isPostReact = true;
    styleElement.innerHTML = ".PostButtonReactions__iconAnimation{display:none;}.PostButtonReactions__icon.PostButtonReactions__icon--custom{background: url(\"" + imageUrl + "\")!important;         scale:.85;} .ReactionsMenuPopperTransition-appear-done, .ReactionsMenuPopperTransition-enter-done {          display: none!important;      }                        .ReactionsMenu,    .ReactionsMenu--extraHoverArea,    .ReactionsMenu--extraHoverAreaToTop,    div.ReactionsPreview__items,.PostButtonReactions--post .PostButtonReactions__title--textual,.like_tt_reacted-count,.fans_fanph_reaction,li#likes_tab_reactions_0,    li#likes_tab_reactions_1,    li#likes_tab_reactions_2,    li#likes_tab_reactions_3,    li#likes_tab_reactions_4,    li#likes_tab_reactions_5,.ui_tab.ui_tab_group,.like_tt_reaction {        display: none !important;    }    .PostBottomAction {        --post-bottom-action-background-color: transparent !important;    }    div.ReactionsPreview.ReactionsPreview--active .ReactionsPreview__count._counter_anim_container {        color: #e64646 !important;    }   .ReactionsPreview--isInActionStatusBar .ReactionsPreview__count{color:var(--vkui--color_text_subhead);} [dir] .ReactionsPreview {        position: absolute;        margin-top: 14px;        margin-left: 30px;        z-index: 9;    }    .ReactionsPreview--isInActionStatusBar .ReactionsPreview__count {    font-size: 13px;    line-height: 16px;    font-weight: 500;    }    .PostButtonReactionsContainer {        width: auto !important;    }    .PostButtonReactions__iconAnimation svg    {        background: url(\"" + imageUrl + "\") no-repeat!important;        margin-top:3px;        margin-left:3px;        scale:.85;    }    .PostButtonReactions__iconAnimation svg g    {        display:none;    }        [dir] .PostActionStatusBar--inPost {        padding-top: 0px !important;        padding-bottom: 0px !important;    }    div.like_cont.PostBottomActionLikeBtns {        border-top: 1px solid transparent !important;    }    .PostButtonReactionsContainer {        width: auto !important;    }        [dir=ltr] .post--withPostBottomAction .PostBottomActionLikeBtns .like_btns {        margin-top: 5px !important;    }    [dir] .PostBottomAction::before {        background-image: none!important;    }    [dir] .like_cont {           }    [dir] .PostBottomActionLikeBtns.like_cont {  padding-bottom:10px!important;   }";
    document.head.appendChild(styleElement);
}

function removeStyle2() {
    const customStyle = document.getElementById("postReactions");
    if (customStyle) {
        customStyle.remove();
    }
    isPostReact = false;
}

function addStyle4() {
    console.log("hider executed");
    const styleElement = document.createElement("style");
    styleElement.id = "hider";
    styleElement.innerHTML = ".bp_thumb,.bp_author,.wall_module .author_highlighted,.deep_active .replies .reply_image,.top_profile_name,.im-mess-stack--lnk, ._im_ui_peers_list .ui_rmenu_item_label, ._im_page_peer_name, .nim-dialog--name, .im-page-pinned--name, .im-replied--author,.ConvoRecommendList__name,.nim-dialog .nim-dialog--text-preview, .nim-dialog .nim-dialog--preview,.ProfileSubscriptions__item,.ProfileFriends__item,#react_rootLeftMenuRoot > div > nav > ol > li:not(#l_pr):not(#l_nwsf):not(#l_msg):not(#l_ca):not(#l_fr):not(#l_gr):not(#l_ph):not(#l_aud):not(#l_vid):not(#l_svd):not(#l_ap):not(#l_stickers):not(#l_mk):not(#l_vkfest2023):not(#l_mini_apps):not(#l_fav):not(#l_doc):not(#l_apm):not(#l_vkp):not(#l_ads) {    filter: blur(5px) !important;}.nim-peer--photo-w img, .nim-peer img,.ImUserAvatar img,.TopNavBtn__profileImg,.MEAvatar {    filter: blur(10px) grayscale(1) !important;}";
    document.head.appendChild(styleElement);
}

function removeStyle4() {
    const customStyle = document.getElementById("hider");
    if (customStyle) {
        customStyle.remove();
    }
}

function addCAccent(cAccentValue) {
    console.log("Caccent executed");
    const styleElement = document.createElement("style");
    styleElement.id = "CAccentID";
    styleElement.innerHTML = "body{    --accent:" + cAccentValue + "!important;    --blue_400: var(--accent) !important;    --action_sheet_action_foreground: var(--accent) !important;    --attach_picker_tab_active_background: var(--accent) !important;    --attach_picker_tab_active_text: var(--accent) !important;    --cell_button_foreground: var(--accent) !important;    --control_foreground: var(--accent) !important;    --counter_primary_background: var(--accent) !important;    --header_alternate_tab_active_indicator: var(--accent) !important;    --header_tab_active_indicator: var(--accent) !important;    --header_tint: var(--accent) !important;    --header_tint_alternate: var(--accent) !important;    --im_attach_tint: var(--accent) !important;    --im_reply_sender_text: var(--accent) !important;    --im_reply_separator: var(--accent) !important;    --landing_login_button_background: var(--accent) !important;    --landing_primary_button_background: var(--accent) !important;    --landing_tertiary_button_foreground: var(--accent) !important;    --landing_text_title: var(--accent) !important;    --landing_secondary_button_foreground: var(--accent) !important;    --link_alternate: var(--accent) !important;    --loader_track_value_fill: var(--accent) !important;    --feed_recommended_friend_promo_background: var(--accent) !important;    --tabbar_active_icon: var(--accent) !important;    --tabbar_tablet_active_icon: var(--accent) !important;    --text_link: var(--accent) !important;    --text_name: var(--accent) !important;    --writebar_icon: var(--accent) !important;    --dynamic_blue: var(--accent) !important;    --text_link_hightlighted_background: var(--accent) !important;    --im_text_name: var(--accent) !important;    --button-background-color: var(--accent) !important;    --sky_100: var(--accent) !important;    --sky_200: var(--accent) !important;    --light_blue_700: var(--accent) !important;    --blue_bright: var(--accent) !important;    --vkui--color_icon_accent: var(--accent) !important;    --vkui--color_background_accent_themed: var(--accent) !important;    --vkui--color_background_accent: var(--accent) !important;    --vkui--color_background_accent--hover: var(--accent) !important;    --vkui--color_background_accent--active: var(--accent) !important;    --vkui--color_background_accent_themed--hover: var(--accent) !important;    --vkui--color_background_accent_themed--active: var(--accent) !important;    --vkui--color_background_accent_tint--hover: var(--accent) !important;    --vkui--color_background_accent_tint--active: var(--accent) !important;    --vkui--color_background_accent_alternative: var(--accent) !important;    --vkui--color_background_accent_alternative--hover: var(--accent) !important;    --vkui--color_background_accent_alternative--active: var(--accent) !important;    --vkui--color_text_accent: var(--accent) !important;    --vkui--color_text_accent--hover: var(--accent) !important;    --vkui--color_text_accent--active: var(--accent) !important;    --vkui--color_text_accent_themed: var(--accent) !important;    --vkui--color_text_accent_themed--hover: var(--accent) !important;    --vkui--color_text_accent_themed--active: var(--accent) !important;    --vkui--color_text_link: var(--accent) !important;    --vkui--color_text_link--hover: var(--accent) !important;    --vkui--color_text_link--active: var(--accent) !important;    --vkui--color_text_link_themed: var(--accent) !important;    --vkui--color_text_link_themed--hover: var(--accent) !important;    --vkui--color_text_link_themed--active: var(--accent) !important;    --vkui--color_text_link_visited--hover: var(--accent) !important;    --vkui--color_text_link_visited--active: var(--accent) !important;    --blue_a400: var(--accent) !important;    --blue_400_alpha20: var(--accent),0.2 !important;    --blue_400_alpha48: var(--accent),0.48 !important;    --blue_420: var(--accent) !important;    --blue_550: var(--accent) !important;    --blue_600: var(--accent) !important;    --blue_640: var(--accent) !important;    --blue_800: var(--accent) !important;    #top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg > g > g > path:nth-child(2){        fill: " + cAccentValue + " !important;    }}";
    document.head.appendChild(styleElement);
    // Получаем элемент SVG
    try {
        const svgElement1 = document.querySelector('#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg');
        const pathElement1 = svgElement1.querySelector('g > g > path:nth-child(2)');
        pathElement1.setAttribute('fill', cAccentValue);
        console.log("logo accepted " + svgElement1);
    } catch (error) {
        console.log('logo not accepted. Trying to use DOM');
    }
    document.addEventListener('DOMContentLoaded', function() {
        const svgElement = document.querySelector('#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg');
        const pathElement = svgElement.querySelector('g > g > path:nth-child(2)');
        pathElement.setAttribute('fill', cAccentValue);
        console.log("logo accepted reload" + svgElement);
    });
}

function removeCAccent() {
    const customStyle = document.getElementById("CAccentID");
    if (customStyle) {
        customStyle.remove();
    }
    const svgElement = document.querySelector('#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg');
    const pathElement = svgElement.querySelector('g > g > path:nth-child(2)');
    if (pathElement != null) {
        pathElement.setAttribute('fill', '#07F');
    }
}

function addColorPicker(cColorValue, cTextValue) {
    const styleElement = document.createElement("style");
    styleElement.id = "selections";
    styleElement.innerHTML = "::selection {                background-color: " + cColorValue + ";                color: " + cTextValue + ";                    }";
    document.head.appendChild(styleElement);
}

function addLogo(cLogoValue) {
    const styleElement = document.createElement("style");
    styleElement.id = "logos";
    styleElement.innerHTML = "#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink {          background:url(" + "'" + cLogoValue + "'" + ") no-repeat;          background-size: contain;          background-position: center;      }      #top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg{          display:none;      }";
    document.head.appendChild(styleElement);
}

function removeLogo() {
    const customStyle = document.getElementById("logos");
    if (customStyle) {
        customStyle.remove();
    }
}

function addBg(cBgValue) {
    const styleElement = document.createElement("style");
    styleElement.id = "custombg";
    styleElement.innerHTML = ':root,.vknBgWrapper,.scroll_fix {          background-image:url(' + cBgValue + ')!important;          background-size: contain;          background-position: center;          background-attachment: fixed;      }                        #side_bar {              background-color:var(--vkui--color_background_content);              width:15%;              margin-left:-20px!important;              border-radius:12px;              padding-left:12px;          }    .body_im .side_bar {        background-color:var(--vkui--color_background_content);       visibility:visible;        padding-right:0;    }    [scheme="vkcom_dark"] #side_bar {       background-color:var(--vkui--color_background_content);             width:15%;              margin-left:-20px!important;              border-radius:12px;              padding-left:12px;    }        [scheme="vkcom_dark"] .body_im .side_bar {        background-color:var(--vkui--color_background_content);       visibility:visible;        padding-right:0;    }.vkui--sizeX-regular{background:transparent!important;}.MarketplaceCatalogHeaderMenu{border-radius:12px!important;}';
    document.head.appendChild(styleElement);
}

function removeBg() {
    const customStyle = document.getElementById("custombg");
    if (customStyle) {
        customStyle.remove();
    }
}

function addFont(cFontValue) {
    const styleElement = document.createElement("style");
    styleElement.id = "customfont";
    styleElement.innerHTML = "html, body, p, h1, h2, h3, h4, h5, h6, span, div, a, ul, ol, li,input,button {  font-family: " + cFontValue + "!important;}";
    document.head.appendChild(styleElement);
}

function removeFont() {
    const customStyle = document.getElementById("customfont");
    if (customStyle) {
        customStyle.remove();
    }
}

function removeNameAva() {
    const styleElement = document.createElement("style");
    styleElement.id = "removeNA";
    styleElement.innerHTML = ".top_profile_name {display:none!important;}";
    document.head.appendChild(styleElement);
}

function addOpacity(sliderValueCount) {
    const opacity = sliderValueCount / 100;
    const alphaHex = Math.floor(opacity * 255).toString(16).padStart(2, '0');
    let rule;
    if (document.querySelector('[scheme=vkcom_light]')) {
        rule = `.im-page .im-page--history-new-bar,.im-page_classic.im-page .im-page--header::before,.im-page_classic.im-page .im-page--dialogs,GamesCatalogNav,.audio_page_layout .audio_search_wrapper,.GamesCatalogHalfBlock .GamesCatalogCardsBlock__header{background:transparent!important} .im-page_classic.im-page .im-page--chat-body-wrap-inner,.im-page.im-page_classic.im-page_group .im-group-online .im-group-online--inner,.im-page_classic.im-page .im-page--dcontent,.PageBlock,.MarketplaceCatalogBlockListFiltersLayout__block,.MarketplaceCatalogHeaderMenu,.GamesCatalogProfileBlock__header,.GamesCatalogProfileBlock__content,.GamesCatalogSearchMainContent,.page_block_header,.ui_tabs_new.ui_tabs_header,.CatalogBlock--divided,.ui_search.ui_search_old,.im-page .im-page--dialogs-footer,.im-page .im-page--header, .im-page .im-page--search-header,.redesigned-group-info,.ProfileHeader, .page_block, .vkuiGroup--mode-card,.wall_module .reply_box{background: rgba(255, 255, 255, ${opacity})!important;}`;
    } else {
        rule = `.im-page .im-page--history-new-bar,.im-page_classic.im-page .im-page--header::before,.im-page_classic.im-page .im-page--dialogs,GamesCatalogNav,.audio_page_layout .audio_search_wrapper,.GamesCatalogHalfBlock .GamesCatalogCardsBlock__header{background:transparent!important} .im-page_classic.im-page .im-page--chat-body-wrap-inner,.im-page.im-page_classic.im-page_group .im-group-online .im-group-online--inner,.im-page_classic.im-page .im-page--dcontent,.PageBlock,.MarketplaceCatalogBlockListFiltersLayout__block,.MarketplaceCatalogHeaderMenu,.GamesCatalogProfileBlock__header,.GamesCatalogProfileBlock__content,.GamesCatalogSearchMainContent,.page_block_header,.ui_tabs_new.ui_tabs_header,.CatalogBlock--divided,.ui_search.ui_search_old,.im-page .im-page--dialogs-footer,.im-page .im-page--header, .im-page .im-page--search-header,.redesigned-group-info,.ProfileHeader, .page_block, .vkuiGroup--mode-card,.wall_module .reply_box{background: rgba(25, 25, 26, ${opacity})!important;}`;
    }
    const existingStyle = document.getElementById('custom-opacity-style');
    if (existingStyle) {
        existingStyle.remove();
    }
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = rule;
    styleElement.id = 'custom-opacity-style';
    document.head.appendChild(styleElement);
    console.log("Opacity changed to " + opacity);
}
// Функция для добавления стилей
function applyStyles(isOldAccentChecked, isMsgReactionsChecked, isPostReactionsChecked, isSecretChecked, isHiderChecked, cAccentValue, cColorValue, cTextValue, cLogoValue, cBgValue, cFontValue, isNameAva, sliderValueCount, emojiStatusChecked, recentGroupsChecked, altSBChecked, muteCallsChecked, cHotBarValue, addStickerChecked) {
    if (isOldAccentChecked) {
        addStyle();
    } else {
        removeStyle();
    }
    if (sliderValueCount) {
        addOpacity(sliderValueCount);
    }
    if (isMsgReactionsChecked) {
        addStyle1();
    } else {
        removeStyle1();
    }
    if (isPostReactionsChecked) {
        addStyle2();
    } else {
        removeStyle2();
    }
    if (isNameAva) {
        const customStyle = document.getElementById("removeNA");
        if (customStyle) {
            customStyle.remove();
        }
        fixname1();
    } else {
        removeNameAva();
    }
    if (isSecretChecked) {
        addStyle3();
    } else {
        removeStyle3();
    }
    if (isHiderChecked) {
        addStyle4();
    } else {
        removeStyle4();
    }
    if (cAccentValue != "#FFFFFF" && cAccentValue != "#ffffff" && cAccentValue != undefined) {
        addCAccent(cAccentValue);
    } else {
        removeCAccent();
    }
    if (cLogoValue != '' && cLogoValue != 'undefined' && cLogoValue != null) {
        addLogo(cLogoValue);
    } else {
        removeLogo();
    }
    if (cBgValue != '' && cBgValue != 'undefined' && cBgValue != null) {
        addBg(cBgValue);
    } else {
        removeBg();
    }
    if (cFontValue != '' && cFontValue != 'undefined' && cFontValue != null) {
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
        applyStyleAndMuteSpecificAudio();
    } else {
        removeStyleAndUnmuteSpecificAudio();
    }
    if (cHotBarValue) {
        HotBarAppear(cHotBarValue);
    }
    if (addStickerChecked) {
        runStickerAdder();
    }
}
// Функция для получения состояния чекбоксов из локального хранилища и применения стилей
function applySavedStyles() {
    chrome.storage.local.get(["addstickerState", "customHotbar", "muteCallsState", "altSBState", "recentGroupsState", "emojiStatusState", "sliderValue", "checkboxStateAva", "checkboxState", "checkboxState1", "secretFuncState", "postReactionsState", "hiderState", "customAccent", "colorPicker", "colorPickerText", "customLogo", "customBg", "customFont"], function(items) {
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
        applyStyles(isOldAccentChecked, isMsgReactionsChecked, isPostReactionsChecked, isSecretChecked, isHiderChecked, cAccentValue, cColorValue, cTextValue, cLogoValue, cBgValue, cFontValue, isNameAva, sliderValueCount, emojiStatusChecked, recentGroupsChecked, altSBChecked, muteCallsChecked, cHotBarValue, addStickerChecked);
    });
}
// При загрузке страницы применяем сохраненные стили
document.addEventListener('DOMContentLoaded', applySavedStyles);
// Обработчик сообщений от background.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "nameAva" || message.type === "toggleOldAccent" || message.type === "toggleMsgReactions" || message.type === "toggleSecretFunctions" || message.type === "togglePostReactions" || message.type === "toggleHider" || message.type === "toggleEmojiStatus" || message.type === "toggleRecentGroups" || message.type === "toggleAltSB" || message.type === "toggleMuteStatus" || message.type === "customAccent" || message.type === "colorPicker" || message.type === "colorPickerText" || message.type === "customLogo" || message.type === "customBg" || message.type === "customFont" || message.type === "sliderValue" || message.type === "customHotbar" || message.type === "addSticker") {
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
    console.log("Username:" + username);
    const url1 = `https://api.vk.com/method/utils.resolveScreenName?api_id=6798836&method=utils.resolveScreenName&format=json&v=5.131&screen_name=${username}&lang=ru&access_token=vk1.a.tB9ubsHJxOM__fNHm9JQxarecZlO_LnkXuhVxQekQc7t_4khdCkcXBXQf9Ekk-bIdedbAD6UvqaPxjIhnIYUzUwDIMC3M1f7ZD8YG8D3IxHKkgL7vcRdVlPRPN1BpDsRjmQNMRfZ6reFXu2kw_U1IuwWONdcAvO9Mmm34wgBSxZW3D6iqhzfKktcWjz1Wod-KJcWYis18C9wFAR04mF1EA&request_id=7`;
    fetch(url1).then(response => response.json()).then(data => {
        objectId = data.response.object_id;
        chrome.runtime.sendMessage({
            greeting: objectId
        });
    }).catch(error => {
        console.error('Ошибка:', error);
    });
}
//Добавление стикера во вложения ВК
function runStickerAdder() {
    const existingStickerLink = document.querySelector('.ms_item_sticker');
    if (existingStickerLink) {
        return;
    }
    const styleElement = document.createElement("style");
    styleElement.id = "vken_box_sticker";
    styleElement.innerHTML = `#vken_box_layer_bg {    top: 0;    left: 0;    width: 100%;    overflow: hidden;}#vken_box_layer_bg > div > div:nth-child(3) > svg{    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' display='block' class='vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20' viewBox='0 0 20 20' width='20' height='20' style='width: 20px; height: 20px;'%3E%3Cpath fill='%23e1e3e6' fill-rule='evenodd' d='M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E") no-repeat;}#vken_box_layer_bg > div > div:nth-child(3){    right:-40px!important;    background-color:rgba(0, 0, 0, 0.44);    border-radius:999px;    padding:4px;    cursor:pointer;}#vken_box_layer_bg > div > button{    color:var(--vkui--color_text_contrast_themed);    background-color:var(--vkui--color_background_accent_themed);    border:0px;    border-radius:5px;    padding:6px 12px 6px 12px;    cursor:pointer;}#vken_box_layer_bg > div > button:hover{    background-color:var(--vkui--color_background_accent_themed--hover);}#vken_box_layer_bg > div > input[type=text]{    background: 0 0;    padding: 8px 4px 8px 4px;    color: var(--vkui--color_text_primary);        font-size: var(--vkui--font_text--font_size--compact);    font-family: var(--palette-vk-font, -apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",arial,Tahoma,verdana,sans-serif);    outline: 0;    box-shadow: none;    border: 1px solid var(--vkui--vkontakte_color_input_border);    border-radius: 6px;    overflow: hidden;    position: relative;}#vken_box_layer_bg > div > div.box_title{    padding-left:0px!important;    font-size: 14px;    color: var(--vkui--color_text_primary);    line-height: 32px;    height:32px;    margin-bottom:8px;    overflow: hidden;    text-overflow: ellipsis;    white-space: nowrap;}`;
    document.head.appendChild(styleElement);
    const moreItemsContainer = document.querySelector('.ms_items_more._more_items');
    if (!moreItemsContainer) {
        console.error('Контейнер не найден');
        return;
    }
    const stickerLink = document.createElement('a');
    stickerLink.classList.add('ms_item', 'ms_item_sticker', '_type_sticker');
    stickerLink.tabIndex = '0';
    stickerLink.innerHTML = '<span class="MediaSelector__mediaIcon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49a3.3 3.3 0 0 0 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13 4.04 4.04 0 0 1-.97.83 5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26Zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5Zm-3-9.4a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8ZM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0Z" clip-rule="evenodd"></path></svg></span>Стикер';
    moreItemsContainer.appendChild(stickerLink);
    stickerLink.addEventListener('click', function() {
        const overlay = document.createElement('div');
        overlay.id = 'vken_box_layer_bg';
        overlay.className = 'fixed';
        overlay.style.height = '100vh';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.opacity = '1';
        overlay.style.background = '#000000B3';
        const popupContainer = document.createElement('div');
        popupContainer.className = 'popup_box_container';
        popupContainer.tabIndex = '0';
        popupContainer.style.width = '400px';
        popupContainer.style.backgroundColor = 'var(--vkui--color_background_modal)';
        popupContainer.style.padding = '20px';
        popupContainer.style.borderRadius = '8px';
        popupContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        popupContainer.style.position = 'relative';
        const title = document.createElement('div');
        title.className = 'box_title';
        title.textContent = 'Прикрепление стикера';
        const textBox = document.createElement('input');
        textBox.type = 'text';
        textBox.placeholder = 'Введите ID стикера';
        textBox.pattern = '\\d*';
        textBox.style.width = '100%';
        textBox.style.marginBottom = '10px';
        textBox.addEventListener('input', function() {
            const existingButton = document.querySelector('.add-button');
            if (existingButton) {
                existingButton.remove();
            }
            createAddButton();
        });

        function createAddButton() {
            const stickerId = textBox.value;
            const addButton = document.createElement('button');
            addButton.textContent = 'Добавить';
            const command = `cur.chooseMedia('sticker', '${stickerId}', {performer: '${stickerId}', title: '${stickerId}', info: ${stickerId}, duration: '${stickerId}'});`;
            addButton.setAttribute('onclick', command);
            addButton.classList.add('add-button');
            popupContainer.appendChild(addButton);
        }
        const closeButton = document.createElement('div');
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.addEventListener('click', function() {
            overlay.remove();
        });
        const closeIcon = document.createElement('svg');
        closeIcon.setAttribute('aria-hidden', 'true');
        closeIcon.classList.add('vkuiIcon', 'vkuiIcon--20', 'vkuiIcon--w-20', 'vkuiIcon--h-20', 'vkuiIcon--cancel_20');
        closeIcon.setAttribute('viewBox', '0 0 20 20');
        closeIcon.setAttribute('width', '20');
        closeIcon.setAttribute('height', '20');
        closeIcon.style.width = '20px';
        closeIcon.style.height = '20px';
        closeIcon.style.display = 'block';
        const path = document.createElement('path');
        path.setAttribute('fill', 'currentColor');
        path.setAttribute('fill-rule', 'evenodd');
        path.setAttribute('d', 'M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06');
        overlay.addEventListener('click', function(event) {
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

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function loadScripts() {
    if (document.querySelector("#NNVAFTTSLJUUDLPQ")) {
        console.log('Элемент NNVAFTTSLJUUDLPQ найден на странице. Нет смысла запускать скрипты');
    } else {
        console.log('Элемент NNVAFTTSLJUUDLPQ не найден на странице. Запускаю скрипты');
        isSecretCheckFunc();
        buttonrun();
        favicons();
        document.querySelectorAll('a.LeftMenuItem-module__item--XMcN9')[7].href = "https://vk.com/videos";
        if (window.location.href.startsWith("https://vk.com/im")) {
            console.log("Обнаружена вкладка диалогов. Активирую нужные скрипты");
            imfixer();
            starmouse();
        }
        vkbynmh
        if (window.location.href.startsWith("https://vk.com/video")) {
            console.log("Обнаружена вкладка видео. Активирую нужные скрипты");
            videoinject();
        }
        var element = document.createElement("div");
        element.id = "NNVAFTTSLJUUDLPQ";
        var parent = document.querySelector('body');
        parent.appendChild(element);
    }
}
let isFaviconReplaced = false;
let isTitleReplaced = false;

function favicons() {
    if (document.title == 'Мессенджер') {
        document.title = 'Сообщения';
    } else if (document.title == 'VK Видео — смотреть онлайн бесплатно') {
        document.title = 'Видеокаталог';
    } else if (document.title == 'Реакции') {
        document.title = 'Понравилось';
    } else if (document.title == 'Приложения') {
        let side = document.querySelector('div#side_bar')
        side.style.setProperty("display", "none", "important")
    }
    if (document.title == 'Сообщения' || document.title == 'Messages') {
        document.querySelector("link[rel='shortcut icon']").href = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlElEQVR4AWNwL/BhCGrcURfYuOMpEP8F4v8E8F+QWpAekF6Y5v/kYJBeBqjN/8nETxnwO5uwdxiQBWoWnPz/8v23/3///fuPBkBiIDmwGmQ9yAaAFRAAIDU4DcBmMzaX4DaASECxC2gXBpTHArbwuPHo/f+k3n040wLOhPTu84//2049/B/avBNvQqI4KVOcmSjOzgBou+P2cojtUQAAAABJRU5ErkJggg==";
    } else {
        document.querySelector("link[rel='shortcut icon']").href = "https://vk.com/images/faviconnew.ico?6";
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
    const subtitleElements = document.querySelectorAll('.js-video-subtitle');
    if (subtitleElements.length >= 5) {
        subtitleElements[4].textContent = 'Альбомы';
    }
    console.log(subtitleElements[4]);
    var newElement = document.createElement('div');
    newElement.className = 'VideoActions__item VideoActions__item--secondary';
    newElement.setAttribute('data-task-click', 'VideoShowcase/create_playlist');
    newElement.setAttribute('data-owner-id', '185853506');
    newElement.setAttribute('data-task-mouseover', 'VideoShowcase/show_main_action_tooltip');
    newElement.setAttribute('data-task-mouseout', 'VideoShowcase/hide_tooltip');
    newElement.setAttribute('data-text', 'Создать альбом');
    newElement.setAttribute('aria-label', 'Создать альбом');
    newElement.style.fontSize = '13px';
    newElement.textContent = 'Создать альбом';
    var parentElement = document.querySelector('.VideoActions ');
    parentElement.appendChild(newElement);
    //Видео by @notmaxhack
    const videoActionsElement = document.querySelector('.VideoActions');
    const headerExtraElements = document.querySelectorAll('.page_block_header_extra._header_extra');
    headerExtraElements[1].insertBefore(videoActionsElement, headerExtraElements[1].firstChild);
    const uploadVideoBtns = document.querySelectorAll('[data-task-click="VideoShowcase/upload_video"]');
    // проверяем, что второй элемент существует
    if (uploadVideoBtns.length >= 2) {
        // выбираем второй элемент из массива и меняем его текст
        uploadVideoBtns[1].style.fontSize = "13px";
        uploadVideoBtns[1].textContent = "Добавить видео";
    }
    const uploadVideoBtns1 = document.querySelector('[data-task-click="VideoShowcase/create_live"]');
    uploadVideoBtns1.style.fontSize = "13px";
    uploadVideoBtns1.textContent = "Создать трансляцию";
    setInterval(function() {
        let uploadModal = document.querySelector('#box_layer > div.popup_box_container.video_upload_box');
        if (uploadModal) {
            const brElements = document.querySelectorAll('.video_upload_title br');
            // Удалить элементы <br>
            brElements.forEach((br) => {
                br.remove();
            });
            console.log("Injected! Video");
            const textElements = uploadModal.querySelectorAll('.video_upload_title');
            textElements.forEach(function(textElement) {
                if (textElement.innerHTML.includes("Перед загрузкой советуем ознакомиться")) {
                    textElement.innerHTML = textElement.innerHTML.replace("Перед загрузкой советуем ознакомиться", "");
                }
                if (textElement.innerHTML.includes("рекомендациями для авторов видео")) {
                    textElement.innerHTML = textElement.innerHTML.replace("рекомендациями для авторов видео", "Подробнее о правилах");
                }
                if (textElement.innerHTML.includes(" Чтобы начать загрузку, выберите файл ")) {
                    textElement.innerHTML = textElement.innerHTML.replace(" Чтобы начать загрузку, выберите файл ", "Чтобы нaчать загрузку, выберите файл на");
                }
                if (textElement.innerHTML.includes(" с&nbsp;")) {
                    textElement.innerHTML = textElement.innerHTML.replace(" с&nbsp;", "");
                }
                if (textElement.innerHTML.includes(" на&nbsp;компьютере или перетащите его в это окно. ")) {
                    textElement.innerHTML = textElement.innerHTML.replace("на&nbsp;компьютере или перетащите его в это окно.", "компьютере или перетащите видеозапись в это&nbsp; окно");
                }
                document.querySelector('.box_title').textContent = 'Новое видео';
            });
        }
    }, 500);
    setInterval(function() {
        let uploadModal1 = document.querySelector('#box_layer > div.popup_box_container.VideoPlaylistPopup');
        if (uploadModal1) {
            console.log("Injected! Album");
            const textElements = uploadModal1.querySelectorAll('.box_body');
            textElements.forEach(function(textElement) {
                if (textElement.innerHTML.includes("Название плейлиста")) {
                    textElement.innerHTML = textElement.innerHTML.replace("Название плейлиста", "Название альбома");
                }
                if (textElement.innerHTML.includes("Введите название плейлиста")) {
                    textElement.innerHTML = textElement.innerHTML.replace("Введите название плейлиста", "Введите название альбома");
                }
                if (textElement.innerHTML.includes("Кто может просматривать этот плейлист?")) {
                    textElement.innerHTML = textElement.innerHTML.replace("Кто может просматривать этот плейлист?", "Кто может просматривать этот альбом?");
                }
                document.querySelector('.box_title').textContent = 'Создание альбома';
            });
        }
    }, 500);
    var search = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.VideoSearchInput.ui_search_custom.ui_search_with_custom_controls._wrap')
    if (search) {
        search.classList = 'ui_search_new ui_search ui_search_field_empty video_search_input ui_search_btn_large _wrap'
            // Передвижение поиска
        var parent = document.querySelector('div#video_main_block h2.page_block_h2')
        var child = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap')
        parent.appendChild(child)
    }
    var search1 = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.VideoSearchInput.ui_search_custom.ui_search_with_custom_controls._wrap')
    var header = document.querySelector('div#video_block_header')
    if (search1) {
        search1.classList = 'ui_search_new ui_search ui_search_field_empty video_search_input ui_search_btn_large _wrap'
        header.after(search1)
    }
    seacrh2();
    seacrh4();

    function seacrh2() {
        console.log("s2");
        // Установка старого поиска
        var search = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.VideoSearchInput.ui_search_custom.ui_search_with_custom_controls._wrap')
        if (search) {
            search.classList = 'ui_search_new ui_search ui_search_field_empty video_search_input ui_search_btn_large _wrap'
                // Передвижение поиска
            var parent = document.querySelector('.ui_gallery__arrow.ui_gallery__arrow_left')
            var child = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap')
            if (parent) {
                parent.before(child)
            }
        }
    }

    function seacrh4() {
        console.log("s4");
        // Передвижение поиска
        var parent = document.querySelector('ul.ui_tabs.clear_fix.ui_tabs_header.ui_tabs_with_progress.ui_my_vid')
        var child = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap')
        if (parent) {
            parent.after(child)
        }
    }
}

function isSecretCheckFunc() {
    try {
        var parentlnk = document.querySelector('div#top_profile_menu')
        var lnk = document.querySelector('li#l_pr a')
        var setlnk = document.querySelector('a#top_settings_link');
        var suplnk = document.querySelector('a#top_support_link');
        var loglnk = document.querySelector('a#top_logout_link');
        var name = document.querySelector('img.TopNavBtn__profileImg');
        var name2 = document.querySelector('a[href*="connect.vk.com"] div[style="color: var(--text_primary);"]')
        var name3 = document.querySelector('[style="background-color: var(--content_tint_background); border-radius: 8px; width: 254px; font-family: inherit;"]')
        if (name) {
            var namealt = name.alt
        }
        var s = document.querySelector('a#top_profile_link');
        var q = document.createElement('div');
        var w = document.createElement('a');
        var wtext = document.createTextNode("Моя страница");
        var ewtext = document.createTextNode("My profile");
        var n = document.createElement('a');
        var ntext = document.createTextNode("Редактировать");
        var entext = document.createTextNode("Edit");
        var u = document.createElement('div');
        var k = document.createElement('div');
        var b1
        w.classList.add("top_profile_mrow");
        n.classList.add("top_profile_mrow");
        w.setAttribute("id", "top_myprofile_link");
        n.setAttribute("id", "top_edit_link");
        n.href = ("https://vk.com/edit");
        u.classList.add("top_profile_sep");
        k.classList.add("top_profile_sep");
        if (document.querySelector('.top_profile_name')) {
            console.log('Элемент top_profile_name найден на странице. Нет смысла запускать скрипт');
        } else {
            q.classList.add("top_profile_name");
        }
        document.getElementById("top_profile_menu").classList.remove('top_profile_menu_new');
        document.getElementById("top_profile_menu").classList.add('top_profile_menu');
        if (document.querySelector('a#top_profile_link[aria-label="Настройки страницы"]')) {
            w.appendChild(wtext);
            n.appendChild(ntext);
        }
        if (document.querySelector('a#top_profile_link[aria-label="Profile settings"]')) {
            w.appendChild(ewtext);
            n.appendChild(entext);
        }
        if (document.querySelector('.top_profile_name')) {
            console.log('Элемент top_profile_name найден на странице. Нет смысла запускать скрипт');
        } else {
            q.innerHTML = `` + namealt + ``;
        }
        if (lnk) {
            w.href = lnk.href
        }
        if (namealt != null) {
            s.insertBefore(q, s.firstChild)
            setlnk.insertAdjacentElement('beforeBegin', w);
            var home = document.querySelector('a#top_home_link')
            parentlnk.insertBefore(u, setlnk)
            parentlnk.insertBefore(k, loglnk)
            parentlnk.insertBefore(n, setlnk)
        }
    } catch (e) {}
    const styleElement = document.createElement("style");
    styleElement.id = "top_name";
    styleElement.innerHTML = ".top_profile_name {padding-right: 10px;}";
    document.head.appendChild(styleElement);
}

function fixname1() {
    if (document.querySelector('.top_profile_name')) {
        console.log('Элемент top_profile_name найден на странице. Нет смысла запускать скрипт');
    } else {
        console.log("fixname");
        try {
            var parentlnk = document.querySelector('div#top_profile_menu')
            var lnk = document.querySelector('li#l_pr a')
            var setlnk = document.querySelector('a#top_settings_link');
            var suplnk = document.querySelector('a#top_support_link');
            var loglnk = document.querySelector('a#top_logout_link');
            var name = document.querySelector('img.TopNavBtn__profileImg');
            var name2 = document.querySelector('a[href*="connect.vk.com"] div[style="color: var(--text_primary);"]')
            var name3 = document.querySelector('[style="background-color: var(--content_tint_background); border-radius: 8px; width: 254px; font-family: inherit;"]')
            if (name) {
                var namealt = name.alt
            }
            var s = document.querySelector('a#top_profile_link');
            var q = document.createElement('div');
            var w = document.createElement('a');
            var wtext = document.createTextNode("Моя страница");
            var ewtext = document.createTextNode("My profile");
            var n = document.createElement('a');
            var ntext = document.createTextNode("Редактировать");
            var entext = document.createTextNode("Edit");
            var u = document.createElement('div');
            var k = document.createElement('div');
            q.classList.add("top_profile_name");
            q.innerHTML = `` + namealt + ``;
            if (lnk) {
                w.href = lnk.href
            }
            if (namealt != null) {
                s.insertBefore(q, s.firstChild)
                setlnk.insertAdjacentElement('beforeBegin', w);
                var home = document.querySelector('a#top_home_link')
                parentlnk.insertBefore(u, setlnk)
                parentlnk.insertBefore(k, loglnk)
                parentlnk.insertBefore(n, setlnk)
            }
        } catch (e) {}
        const styleElement = document.createElement("style");
        styleElement.id = "top_name";
        styleElement.innerHTML = ".top_profile_name {padding-right: 10px;}";
        document.head.appendChild(styleElement);
    }
}

function buttonrun() {
    console.log("buttonrun executed");
    var count = 0;
    var interval = setInterval(function() {
        if (count >= 3) {
            console.log(count + " passed")
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
        const url1 = `https://api.vk.com/method/utils.resolveScreenName?api_id=6798836&method=utils.resolveScreenName&format=json&v=5.131&screen_name=${username}&lang=ru&access_token=vk1.a.tB9ubsHJxOM__fNHm9JQxarecZlO_LnkXuhVxQekQc7t_4khdCkcXBXQf9Ekk-bIdedbAD6UvqaPxjIhnIYUzUwDIMC3M1f7ZD8YG8D3IxHKkgL7vcRdVlPRPN1BpDsRjmQNMRfZ6reFXu2kw_U1IuwWONdcAvO9Mmm34wgBSxZW3D6iqhzfKktcWjz1Wod-KJcWYis18C9wFAR04mF1EA&request_id=7`;
        fetch(url1).then(response => response.json()).then(data => {
            objectId = data.response.object_id;
            console.log("ID fetched succesfully: " + objectId);
            if (!document.querySelector('a[aria-label="Написать сообщение"]') && !document.querySelector('a[href^="/im"]:not([class^="LeftMenuItem-module__item"])')) {
                if (objectId !== "185853506") {
                    var newElement = document.createElement("a");
                    newElement.className = "ms_item ms_item_gift _type_gift";
                    newElement.tabIndex = "0";
                    newElement.style.position = "absolute";
                    newElement.style.marginTop = "-50px";
                    newElement.style.display = "block";
                    newElement.style.color = "rgb(40, 84, 115)";
                    newElement.innerHTML = 'Отправить подарок';
                    newElement.href = "/gifts" + objectId + "?act=send&ref=profile_module";
                    document.querySelector("#profile_redesigned").appendChild(newElement);
                }
            } else {
                console.log("Найдена кнопка 'Написать сообщение'. Нет смысла создавать кнопку подарка")
            }
        }).catch(error => {
            console.error('Ошибка:', error);
        });
        count++;
    }, 1000); // 10 секунд
}

function imfixer() {
    const buttonElement = document.querySelector('.im-page--dialogs-header-control_call');
    const linkElement = document.createElement('a');
    linkElement.setAttribute('tabindex', '0');
    linkElement.setAttribute('role', 'link');
    linkElement.classList.add('ui_actions_menu_item', 'im-action', 'im-action_favorites', '_im_search_more_action');
    linkElement.setAttribute('data-action', 'favorites');
    linkElement.innerText = '';
    linkElement.style = 'margin-top: 8px; padding-left: 20px; background-color: #fff; background: url(https://sun9-33.userapi.com/impg/cAWfwzC-vRiWXCNs6daC4kJswRmLn_XL7Zi1sw/VgHLi5kumV4.jpg?size=24x24&quality=96&sign=71effcfb859fb3a838d3a04f312b2a8f&type=album) no-repeat; background-position: 15px 6.7px; background-size: 45% auto; opacity: .7';
    linkElement.removeEventListener('mouseover', null);
    buttonElement.parentNode.replaceChild(linkElement, buttonElement);
    var svgElement = linkElement.querySelector('svg');
    if (svgElement) {
        svgElement.remove();
    }
}

function starmouse() {
    setTimeout(function() {
        const el1ement = document.querySelector('div.ui_actions_menu_wrap._ui_menu_wrap.im-page--dialogs-call-wrap');
        el1ement.removeAttribute('onmouseover');
        el1ement.removeAttribute('onmouseout');
        console.log("Star executed!")
    }, 10000)
}

function vkbynmh() {
    setInterval(function() {
        var links = document.getElementsByTagName('a');
        // Проходимся по каждому элементу
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (link.getAttribute('onclick') === "return Gifts.showGiftBox(cur.oid, event, 'gifts');" || link.getAttribute('onclick') === "return Gifts.showGiftBox(cur.oid, event, 'gifts_own');") {
                link.style.color = '#fff';
            }
        }
    }, 500);
    document.addEventListener('DOMContentLoaded', function() {
        var l = document.querySelector('button.FCPanel__add')
        l.addEventListener("click", chat, false);
    }, false);
    i = 0
    i2 = 0
    vd = 0
    document.addEventListener('DOMContentLoaded', function() {
        chat();
    }, false);
    window.onload = function() {
        var login = document.querySelector('.VkIdForm')
        var login_btn = document.querySelector("button.FlatButton.FlatButton--primary.FlatButton--size-l.FlatButton--wide.VkIdForm__button.VkIdForm__signInButton")
        login == null || undefined ? (initial(), styleNode = null) : (login_btn.outerHTML = login_btn.outerHTML, login_btn = document.querySelector("button.FlatButton.FlatButton--primary.FlatButton--size-l.FlatButton--wide.VkIdForm__button.VkIdForm__signInButton"), login_btn.setAttribute("onclick", `return location.href = "https://vk.com/login?classic_flow=1"`), wait)
    };

    function wait_form() {
        var form = document.querySelector('form#login_submit')
        var acess = document.querySelector('img.oauth_app_photo')
        if (form !== null || undefined && acess == null) {
            console.log("form")
        } else if (acess !== null || undefined && form == null) {
            location.href = "https://vk.com/feed"
            clearInterval(wait_form)
            acess.classList = "test"
        }
    }
    // Создание элемента
    window.addEventListener('load', function() {
        const createPlaylistButton = document.querySelectorAll('[aria-label="Создать плейлист"]');
        const plist1 = createPlaylistButton[1];
        console.log(plist1);
        plist1.querySelector('.FlatButton__before').remove();
        plist1.querySelector('.FlatButton__content').textContent = 'Создать альбом';
    });
    document.addEventListener('DOMContentLoaded', function() {
        var l = document.querySelector('button.FCPanel__add')
        l.addEventListener("click", chat, false);
    }, false);
    i = 0
    i2 = 0
    vd = 0
    document.addEventListener('DOMContentLoaded', function() {
        chat();
    }, false);
    window.onblur = function() {
        var a = setInterval(title, 2000);
        var c = setInterval(check, 1000);
        clearInterval(a);
        clearInterval(c);
    }
    window.onfocus = function() {
        var ad_n = parseInt(localStorage.getItem("ad"));
        setInterval(title, 2000);
        setInterval(check, 1000);
        //fix_name();
    }

    function initial() {
        var ad_n = parseInt(localStorage.getItem("ad"));
        var settings_n = parseInt(localStorage.getItem("settings"));
        console.log('Скрипт запущен');
        setInterval(title, 2000);
        setInterval(check, 1000);
    }
    // Проверка
    function check() {
        check_vid();
        feed_check();
    }

    function feed_check() {
        if ((window.location.href.includes('feed'))) {
            _class();
            _class2();
        }
        var k = document.querySelector('.like_cont.PostBottomActionLikeBtns.PostBottomActionLikeBtns--withBgButtons')
        if (k) {
            _class();
            _class2();
        }
    }

    function _class2() {
        var g
        var k = document.querySelectorAll('.ui_actions_menu._ui_menu.ui_actions_menu--actionSheet');
        for (g = 0; g < k.length; g++) {
            k[g].className = 'ui_actions_menu _ui_menu ';
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function _class() {
        await sleep(2000)
        var u, k
        var old2 = document.querySelectorAll('.PostButtonReactions__icon.PostButtonReactions__icon--custom.PostButtonReactions__icon--animationActive')
        for (k = 0; k < old2.length; k++) {
            old2[k].style.background = `background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m0%200h24v24h-24z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22m17%202.9a6.43%206.43%200%200%201%206.4%206.43c0%203.57-1.43%205.36-7.45%2010l-2.78%202.16a1.9%201.9%200%200%201%20-2.33%200l-2.79-2.12c-6.05-4.68-7.45-6.47-7.45-10.04a6.43%206.43%200%200%201%206.4-6.43%205.7%205.7%200%200%201%205%203.1%205.7%205.7%200%200%201%205-3.1z%22%20fill%3D%22%23ff3347%22%2F%3E%3C%2Fsvg%3E);`
        }
    }

    function chat() {
        var a = document.querySelectorAll('.MEAvatar__online')
        console.log(a.length)
            //var b,c
            //for (b = 0; b < a.length; b++) {
            //   c = a[b].previousElementSibling.firstElementChild
            //  console.log(c.alt)
            //}
    }
    window.addEventListener('scroll', function() {
        KPP.add('.PostButtonReactions', function(reactions) {
            var count = reactions.dataset.reactionCounts;
            if (count && !(reactions.dataset.reactionButtonTextIsCounter)) {
                count = JSON.parse(count);
                if (!Array.isArray(count)) {
                    count = Object.values(count)
                }
                var likes = count.reduce(function(previous, current) {
                    return previous + current
                })
                reactions.getElementsByClassName('PostButtonReactions__title')[0].textContent = likes;
            }
            reactions.dataset.reactionButtonTextIsCounter = '1';
            var target = reactions.dataset.reactionTargetObject;
            if (target) {
                reactions.setAttribute('onmouseover', 'Likes.showLikes(this,\'' + target + '\')')
            }
        });
    });
    // Название
    function title() {}
    const element = document.querySelector('a.ui_actions_menu_item.im-action.im-action_favorites._im_search_more_action');
    const listeners = window.getEventListeners(element);
    const eventListener = listeners.click[0].listener;
    const favoritesBtn = document.querySelector('button[data-action="favorrites"]');
    favoritesBtn.addEventListener('click', eventListener);
    const listeners1 = window.getEventListeners(favoritesBtn);
    console.log("resultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresult");
    console.log(listeners1.click);
    // Лучше дома
    const besthomelogolink = document.querySelector("#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink")
    if (document.querySelector('a#top_profile_link[aria-label="Настройки страницы"]')) {
        besthomelogolink.setAttribute("onmouseover", `this.className.indexOf(\'bugtracker_logo\') === -1 && bodyNode.className.indexOf(\'WideScreenAppPage\') === -1 && showTooltip(this,\r\n{\r\n  text: \"<div class=\\\"CovidTooltip__logo\\\"><\\\/div><div class=\\\"CovidTooltip__title\\\">\u041E\u0441\u0442\u0430\u0432\u0430\u0439\u0442\u0435\u0441\u044C \u0434\u043E\u043C\u0430<\\\/div><div class=\\\"CovidTooltip__text\\\">\u041C\u043E\u0439\u0442\u0435 \u0440\u0443\u043A\u0438, \u0438\u0437\u0431\u0435\u0433\u0430\u0439\u0442\u0435 \u0441\u043A\u043E\u043F\u043B\u0435\u043D\u0438\u044F \u043B\u044E\u0434\u0435\u0439, \u043F\u043E \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u043D\u0435 \u0432\u044B\u0445\u043E\u0434\u0438\u0442\u0435 \u0438\u0437 \u0434\u043E\u043C\u0430 \u0438 \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u0435 <a href=\\\"\\\/feed?section=stayhome\\\" onclick=\\\"return typeof window.statlogsValueEvent !== &#39;undefined&#39; &amp;&amp; window.statlogsValueEvent(&#39;coronavirus_tooltip_click&#39;, 1) || nav.go(this, event)\\\">\u0432\u0440\u0435\u043C\u044F \u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0439<\\\/a>.<\\\/div>\",\r\n  className: \'CovidTooltip\',\r\n  width: 356,\r\n  dir: \'top\',\r\n  shift: [0, 0, 6],\r\n  hidedt: 60, showdt: 600,\r\n  hasover: true,\r\n  onShowStart: function() {window.statlogsValueEvent !== \'undefined\' && window.statlogsValueEvent(\'coronavirus_tooltip_show\', 1)}\r\n})
`);
    }
    if (document.querySelector('a#top_profile_link[aria-label="Profile settings"]')) {
        besthomelogolink.setAttribute("onmouseover", `this.className.indexOf(\'bugtracker_logo\') === -1 && bodyNode.className.indexOf(\'WideScreenAppPage\') === -1 && showTooltip(this,\r\n{\r\n  text: \"<div class=\\\"CovidTooltip__logo\\\"><\\\/div><div class=\\\"CovidTooltip__title\\\">Stay home<\\\/div><div class=\\\"CovidTooltip__text\\\">Wash your hands, maintain social distancing, stay at home if you can, and <a href=\\\"\\\/feed?section=stayhome\\\" onclick=\\\"return typeof window.statlogsValueEvent !== &#39;undefined&#39; &amp;&amp; window.statlogsValueEvent(&#39;coronavirus_tooltip_click&#39;, 1) || nav.go(this, event)\\\">keep busy<\\\/a>.<\\\/div>\",\r\n  className: \'CovidTooltip\',\r\n  width: 356,\r\n  dir: \'top\',\r\n  shift: [0, 0, 6],\r\n  hidedt: 60, showdt: 600,\r\n  hasover: true,\r\n  onShowStart: function() {window.statlogsValueEvent !== \'undefined\' && window.statlogsValueEvent(\'coronavirus_tooltip_show\', 1)}\r\n})
`);
    }
    //Шестеренка дофикс
    function handleClick() {
        const element = document.querySelector('.LeftMenuItem-module__settings--YcqyH');
        if (element) {
            element.style.opacity = '1';
            console.log('Opacity changment successful!')
        }
    }
    const clickableElement = document.querySelector('.LeftMenuItem-module__settings--YcqyH');
    if (clickableElement) {
        clickableElement.addEventListener('click', handleClick);
    }
    // Меню и Имя возле иконки
    const styleremove = document.createElement('style');
    styleremove.innerHTML = `
      .ReactionsMenuPopper,.fans_fanph_reaction,li#likes_tab_reactions_0, li#likes_tab_reactions_1, li#likes_tab_reactions_2, li#likes_tab_reactions_3, li#likes_tab_reactions_4, li#likes_tab_reactions_5,.ui_tab.ui_tab_group,.menu_item_icon,#react_rootEcosystemAccountMenuEntry {
        display: none !important;
      }
    `;
    styleremove.classList = 'NewRemover';
    document.head.appendChild(styleremove);
    // Фикс в видео
    function check_vid() {
        var h2
        var myvd = document.querySelector('li#l_pr a.left_row')
        if (myvd) {
            var h = myvd.href
        }
        if (h) {
            h2 = h.split('vk.com/')[1];
        }
        //console.log(h2)
        if (!window.location.href.includes(h2) && (!window.location.href.includes('/video/@'))) {
            seacrh2();
            pop_vid();
        }
        if (window.location.href.includes(h2)) {
            my_vid();
            seacrh();
        }
        if (window.location.href.includes('https://vk.com/video/@') && !window.location.href.includes(h2)) {
            seacrh3();
        }
    }
    if (window.location.href.includes('https://vk.com/settings?act=classicsecurity')) {
        var securtiypage = document.querySelector('.wide_column_wrap');
        securtiypage.innerHTML = ``
    }

    function seacrh() {
        // Установка старого поиска
    }

    function seacrh3() {}

    function my_vid() {
        var head = document.querySelectorAll('.page_block_header.clear_fix')
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
  </ul>`
            var t = document.querySelector('button.flat_button[style="margin-left: 0"]')
            var t2 = document.querySelector('button#video_create_live_btn')
            var vid = document.querySelector('ul.ui_tabs.clear_fix.ui_tabs_header.ui_tabs_with_progress.ui_pop_vid')
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
        var search = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.VideoSearchInput.ui_search_custom.ui_search_with_custom_controls._wrap')
        if (search) {
            search.classList = 'ui_search_new ui_search ui_search_field_empty video_search_input ui_search_btn_large _wrap'
                // Передвижение поиска
            var parent = document.querySelector('.ui_gallery__arrow.ui_gallery__arrow_left')
            var child = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap')
            if (parent) {
                parent.before(child)
            }
        }
    }

    function seacrh4() {
        // Передвижение поиска
        var parent = document.querySelector('ul.ui_tabs.clear_fix.ui_tabs_header.ui_tabs_with_progress.ui_my_vid')
        var child = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap')
        if (parent) {
            parent.after(child)
        }
    }

    function pop_vid() {
        var head2 = document.querySelector('ul#video_main_tabs')
        var head = document.createElement('ul')
        head.classList = 'gg'
            //console.log(head2)
        var slider = document.querySelector('.ui_gallery.VideoTabsSlider.js-video-slider')
        if (slider) {
            slider.classList = 'ui_gallery VideoTabsSlider'
        }
        var search = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap')
        if (head2 == null) {
            if (search) {
                search.before(head)
                head2 = document.querySelector('ul.gg')
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
  </ul>`
                head2 = document.querySelector('ul#video_main_tabs')
                var vid = document.querySelector('ul.ui_tabs.clear_fix.ui_tabs_header.ui_tabs_with_progress.ui_my_vid')
                if (vid) {
                    vid.remove();
                }
            }
        }
    }

    function add() {
        var h = document.querySelector('.VideoActions__item[aria-label="Добавить видео"]')
        h.click();
    }

    function add1() {
        var h = document.querySelector('.VideoActions__item.VideoActions__item--secondary')
        h.click();
    }
    var KPP
    KPP = {
        _list: [],
        _actions: [],
        _addedTag: function(observer, mutations, tag, callback, once) {
            for (var i = 0, l = mutations.length; i < l; i++) {
                for (var j = 0, m = mutations[i].addedNodes.length; j < m; j++) {
                    if (mutations[i].addedNodes[j].tagName === tag) {
                        callback();
                        if (once) observer.disconnect();
                    }
                }
            }
        },
        _police: new MutationObserver(function(mutations) {
            for (var i = 0, l = mutations.length; i < l; i++) {
                for (var j = 0, m = mutations[i].addedNodes.length; j < m; j++) {
                    if (mutations[i].addedNodes[j].nodeType === 1) {
                        for (var k = KPP._list.length; k--;) {
                            if (mutations[i].addedNodes[j].matches(KPP._list[k])) { // Обрабатывает только существующие элементы до DOMContentLoaded
                                if (!mutations[i].addedNodes[j].KPPPassed) {
                                    KPP._actions[k](mutations[i].addedNodes[j]);
                                    mutations[i].addedNodes[j].KPPPassed = true;
                                }
                            } else {
                                var n = mutations[i].addedNodes[j].querySelectorAll(KPP._list[k]);
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
        head: function(callback) {
            if (!document.head) {
                var observer = new MutationObserver(function(mutations, observer) {
                    KPP._addedTag(observer, mutations, 'HEAD', callback, true)
                });
                observer.observe(document.documentElement, {
                    childList: true
                });
            } else callback();
        },
        body: function(callback) {
            if (!document.body) {
                var observer = new MutationObserver(function(mutations, observer) {
                    KPP._addedTag(observer, mutations, 'BODY', callback, true)
                });
                observer.observe(document.documentElement, {
                    childList: true
                });
            } else callback();
        },
        add: function(selector, callback) {
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
                subtree: true
            })
        },
        remove: function(selector) {
            var s = KPP._list.indexOf(selector);
            if (s !== -1) {
                KPP._list.splice(s, 1);
                KPP._actions.splice(s, 1);
                if (KPP._list.length < 1) {
                    KPP._police.disconnect();
                    return true
                }
            }
            return false
        },
        stop: function(full) {
            KPP._police.disconnect();
            if (full) {
                KPP._list = [];
                KPP._actions = [];
            }
        }
    };
}