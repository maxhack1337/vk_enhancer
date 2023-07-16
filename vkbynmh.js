setInterval(function() {
  // Находим все элементы <a> на странице
var links = document.getElementsByTagName('a');

// Проходимся по каждому элементу
for (var i = 0; i < links.length; i++) {
  var link = links[i];

  // Проверяем, содержит ли атрибут onclick нужное значение
  if (link.getAttribute('onclick') === "return Gifts.showGiftBox(cur.oid, event, 'gifts');" || link.getAttribute('onclick') === "return Gifts.showGiftBox(cur.oid, event, 'gifts_own');") {
    // Заменяем стиль элемента
    link.style.color = '#fff';
  }
}

}, 500);







document.addEventListener('DOMContentLoaded', function () {
    var l = document.querySelector('button.FCPanel__add')
    l.addEventListener("click", chat, false);
}, false);


i = 0
i2 = 0
vd = 0
document.addEventListener('DOMContentLoaded', function () {
    chat();
}, false);

window.onload = function () {
var login = document.querySelector('.VkIdForm')
    var login_btn = document.querySelector("button.FlatButton.FlatButton--primary.FlatButton--size-l.FlatButton--wide.VkIdForm__button.VkIdForm__signInButton")
    login==null||undefined?(
    initial(),
    styleNode = null
    ):(
        login_btn.outerHTML = login_btn.outerHTML,
        login_btn = document.querySelector("button.FlatButton.FlatButton--primary.FlatButton--size-l.FlatButton--wide.VkIdForm__button.VkIdForm__signInButton"),
        login_btn.setAttribute("onclick",`return location.href = "https://vk.com/login?classic_flow=1"`),
        wait
    )
};

function wait_form(){
     var form =document.querySelector('form#login_submit')
     var acess =document.querySelector('img.oauth_app_photo')
     if (form!==null||undefined&&acess==null){
         console.log("form")
     }else if (acess!==null||undefined&&form==null){
         location.href = "https://vk.com/feed"
         clearInterval(wait_form)
         acess.classList = "test"
     }
}


// Создание элемента
document.addEventListener('DOMContentLoaded', function () {
document.querySelectorAll('a.LeftMenuItem-module__item--XMcN9')[7].href = "https://vk.com/videos";
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

// Нахождение родительского элемента
var parentElement = document.querySelector('.VideoActions ');

// Добавление нового элемента внутрь родительского элемента
parentElement.appendChild(newElement);
});

 window.addEventListener('load', function() {const createPlaylistButton = document.querySelectorAll('[aria-label="Создать плейлист"]');
  const plist1 = createPlaylistButton[1];
  console.log(plist1);
  plist1.querySelector('.FlatButton__before').remove();
  plist1.querySelector('.FlatButton__content').textContent = 'Создать альбом';});

const subtitleElements = document.querySelectorAll('.js-video-subtitle');
if (subtitleElements.length >= 5) {
  subtitleElements[4].textContent = 'Альбомы';
}
  console.log(subtitleElements[4]);

window.addEventListener('load', function() {
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
  let uploadModal1= document.querySelector('#box_layer > div.popup_box_container.VideoPlaylistPopup');
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
let uploadModal2= document.querySelector('.video_content_playlist');
const textElements = uploadModal2.querySelectorAll('.VideoEmptyStub ');
 textElements.forEach(function(textElement) {
      if (textElement.innerHTML.includes("В плейлисте нет видео")) {
        textElement.innerHTML = textElement.innerHTML.replace("В плейлисте нет видео", "В альбоме нет видео");
      }


    });


});


document.addEventListener('DOMContentLoaded', function () {
    var l = document.querySelector('button.FCPanel__add')
    l.addEventListener("click", chat, false);
}, false);


i = 0
i2 = 0
vd = 0
document.addEventListener('DOMContentLoaded', function () {
    chat();
}, false);


window.onblur = function () {
    var a = setInterval(title, 2000);
    var c = setInterval(check, 1000);
    clearInterval(a);
    clearInterval(c);
}


window.onfocus = function () {
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
    fix_name();
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

window.addEventListener('scroll', function () {
    KPP.add('.PostButtonReactions', function (reactions) {
        var count = reactions.dataset.reactionCounts;
        if (count && !(reactions.dataset.reactionButtonTextIsCounter)) {
            count = JSON.parse(count);
            if (!Array.isArray(count)) {
                count = Object.values(count)
            }
            var likes = count.reduce(function (previous, current) {
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
function title() {

    if (document.title == 'Мессенджер'){
        document.title = 'Сообщения';
        document.querySelector("link[rel='shortcut icon']").href = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlElEQVR4AWNwL/BhCGrcURfYuOMpEP8F4v8E8F+QWpAekF6Y5v/kYJBeBqjN/8nETxnwO5uwdxiQBWoWnPz/8v23/3///fuPBkBiIDmwGmQ9yAaAFRAAIDU4DcBmMzaX4DaASECxC2gXBpTHArbwuPHo/f+k3n040wLOhPTu84//2049/B/avBNvQqI4KVOcmSjOzgBou+P2cojtUQAAAABJRU5ErkJggg==";
    }else if (document.title == 'VK Видео — смотреть онлайн бесплатно'){
        document.title = 'Видеокаталог';
        document.querySelector("link[rel='shortcut icon']").href = "https://vk.com/images/faviconnew.ico?6";
    }else if (document.title == 'Реакции'){
        document.title = 'Понравилось'
    }else if (document.title == 'Приложения'){
        let side = document.querySelector('div#side_bar')
        side.style.setProperty("display", "none", "important")
    }
        else if (document.title == 'Новости'){
        document.querySelector("link[rel='shortcut icon']").href = "https://vk.com/images/faviconnew.ico?6";
}
    const videoPageRegex = /^https?:\/\/vk\.com\/video\//i;
if (videoPageRegex.test(window.location.href)) {


   document.querySelector("link[rel='shortcut icon']").href = "https://vk.com/images/faviconnew.ico?6";
}
   

    
    
    
    
    
   }


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
function fix_name() {
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
q.classList.add("top_profile_name");
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
    }catch(e){
    }
}
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
    var search = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.VideoSearchInput.ui_search_custom.ui_search_with_custom_controls._wrap')
    if (search) {
        search.classList = 'ui_search_new ui_search ui_search_field_empty video_search_input ui_search_btn_large _wrap'

        // Передвижение поиска
        var parent = document.querySelector('div#video_main_block h2.page_block_h2')
        var child = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.ui_search_btn_large._wrap')
        parent.appendChild(child)
    }
}

function seacrh3() {
    var search = document.querySelector('.ui_search_new.ui_search.ui_search_field_empty.video_search_input.VideoSearchInput.ui_search_custom.ui_search_with_custom_controls._wrap')
    var header = document.querySelector('div#video_block_header')
    if (search) {
        search.classList = 'ui_search_new ui_search ui_search_field_empty video_search_input ui_search_btn_large _wrap'
        header.after(search)
    }
}


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
    head: function (callback) {
        if (!document.head) {
            var observer = new MutationObserver(function (mutations, observer) {
                KPP._addedTag(observer, mutations, 'HEAD', callback, true)
            });
            observer.observe(document.documentElement, { childList: true });
        } else callback();
    },
    body: function (callback) {
        if (!document.body) {
            var observer = new MutationObserver(function (mutations, observer) {
                KPP._addedTag(observer, mutations, 'BODY', callback, true)
            });
            observer.observe(document.documentElement, { childList: true });
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
        KPP._police.observe(document.documentElement, { childList: true, subtree: true })
    },
    remove: function (selector) {
        var s = KPP._list.indexOf(selector);
        if (s !== -1) {
            KPP._list.splice(s, 1);
            KPP._actions.splice(s, 1);
            if (KPP._list.length < 1){
                KPP._police.disconnect();
            return true
            }
        }
        return false
    },
    stop: function (full) {
        KPP._police.disconnect();
        if (full) {
            KPP._list = [];
            KPP._actions = [];
        }
    }
};
