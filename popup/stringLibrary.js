const strings = {
    clearCacheDescription: ['Вы уверены, что хотите очистить кеш?', 'Are you sure you want to clear cache?', 'Ви впевнені, що хочете очистити кеш?'],
    globalYes: ['Да', 'Yes', 'Так'],
    globalNo: ['Нет', 'No', 'Ні'],
    clearCache: ['Очистить кеш', 'Clear cache', 'Очистити кеш'],
    changeTheme: ['Сменить тему', 'Change theme color', 'Змінити тему'],
    openExtension: ['Открыть расширение в новом окне', 'Open extension in new window', 'Відкрити розширення в новому вікні'],
    returnCamera: ['Вернуть "фотоаппарат"', 'Return camera profile avatar', 'Повернутися до "фотоапарату"'],
    showPatronymic: ['Отображать отчество', 'Show nickname', 'Показувати по-батькові'],
    removeAvatars: ['Убрать NFT-аватарки', 'Remove NFT avatars', 'Видалити NFT аватари'],
    removeEmojiStatus: ['Убрать эмодзи-статусы', 'Remove emoji statuses', 'Видалити емодзі-статуси'],
    disableReadingMessages: ['Отключить чтение сообщений', 'Disable reading messages', 'Вимкнути читання повідомлень'],
    hideTextEntry: ['Скрывать набор текста', 'Hide text entry', 'Приховувати введення тексту'],
    removeMessageReactions: ['Убрать реакции на сообщения', 'Remove message reactions', 'Видалити реакції на повідомлення'],
    removePostReactions: ['Убрать реакции на посты', 'Remove post reactions', 'Видалити реакції на пости'],
    disableAway: ['Отключить vk.com/away.php', 'Disable vk.com/away.php', 'Вимкнути vk.com/away.php'],
    hideNamesAvatars: ['Скрыть имена и аватарки', 'Blur names and avatars', 'Приховати імена та аватари'],
    showPollResults: ['Показывать результаты опросов', 'Show poll results', 'Показувати результати опитувань'],
    defaultPollHidden: ['По умолчанию результаты опроса скрыты до выбора ответа', 'Default poll hidden', 'За замовчуванням результати опитування приховані до вибору відповіді'],
    avatarNameNear: ['Имя возле аватарки VK ID', 'Name next to VK ID avatar', "Ім'я біля аватарки VK ID"],
    hideRecentCommunities: ['Скрыть "недавно посещали" в сообществах', 'Hide recent communities', 'Приховати "недавно відвідані" в спільнотах'],
    doNotDisturb: ['Режим "не беспокоить"', 'Do not disturb', 'Режим "не турбувати"'],
    doNotDisturbDescription: ['Данная функция отключает входящие звонки. Звонящий не будет знать, что вы отключили звонки', 'This function disables incoming calls. The caller will not know that you have turned them off', 'Ця функція вимикає вхідні дзвінки. Дзвінокер не буде знати, що ви вимкнули дзвінки'],
    alternativeScrollbar: ['Альтернативный скроллбар', 'Alternative scrollbar', 'Альтернативний скролбар'],
	tabletMenu: ['Левое меню, как на планшетах', 'Tablet-style left menu', 'Ліве меню, як на планшетах'],
    disableReconnectIndicator: ['Отключить индикатор реконнекта в мессенджере', 'Disable reconnect indicator', 'Вимкнути індикатор перепідключення в месенджері'],
    newMediaViewer: ['Новый просмотрщик медиа', 'New media viewer', 'Новий переглядач медіа'],
    standardTagInteraction: ['Стандартное взаимодействие с тегом', 'Standard tag interaction', 'Стандартна взаємодія з тегом'],
    emojiHotbar: ['Эмодзи-хотбар', 'Emoji hotbar', 'Емодзі-хотбар'],
    emojiHotbarDescription: ['Нажмите на смайлик ниже, чтобы выбрать нужные эмодзи для хотбара, затем, вставьте сформированную строку сюда. Если хотите отключить хотбар - очистите поле ввода. Далее нажмите кнопку "Обновить хотбар" и перезагрузите страницу', 'Click on the emoticon below to select the desired emoji for the hotbar, then paste the generated string here. If you want to disable the hotbar, clear the input field. Next, click the "Update hotbar" button and reload the page', 'Натисніть на смайлика нижче, щоб вибрати потрібні емодзі для хотбару, потім вставте сформований рядок сюди. Якщо хочете вимкнути хотбар - очистіть поле введення. Потім натисніть кнопку "Оновити хотбар" і перезавантажте сторінку'],
    enterEmojiCodes: ['Введите строку с кодами эмодзи...', 'Enter emoji codes...', 'Введіть рядок з кодами емодзі...'],
    updateHotbar: ['Обновить хотбар', 'Update hotbar', 'Оновити хотбар'],
    enterProfileGroupID: ['ID пользователя/группы', 'User profile/group ID', 'ID користувача/групи'],
    enterProfileGroupIDDescription: ['Перейдите в профиль пользователя/в группу и нажмите кнопку "Узнать ID"', 'Go to the user profile/group and click the "Find out ID" button', 'Перейдіть у профіль користувача/у групу та натисніть кнопку "Дізнатися ID"'],
    notUserOrGroup: ['Данный элемент не является пользователем или группой', 'This element is not a user or group', 'Цей елемент не є користувачем або групою'],
    knowID: ['Узнать ID', 'Get ID', 'Дізнатися ID'],
    customLogoHeader: ['Свой логотип в шапке профиля', 'Custom logo header', 'Власний логотип у шапці профілю'],
    addLink: ['Добавьте ссылку...', 'Add link...', 'Додайте посилання...'],
    set: ['Установить', 'Set', 'Встановити'],
    resetFast: ['Сброс', 'Reset', 'Скидання'],
    customBackground: ['Свой фон страницы', 'Custom background', 'Власний фон сторінки'],
    useCustomFont: ['Использовать свой шрифт', 'Use custom font', 'Використовувати власний шрифт'],
    enterFontName: ['Введите название шрифта...', 'Enter font name...', 'Введіть назву шрифту...'],
    classicProfileInterface: ['Классический интерфейс профилей', 'Classic profile interface', 'Класичний інтерфейс профілів'],
    classicProfileInterfaceDescription: ['Возвращает старый дизайн профиля, который был изменён ВК 28 августа 2022 года<br>После включения/выключения функции обновите страницу', 'Returns the old profile design, which was changed by VK on August 28, 2022<br>After enabling/disabling the function, refresh the page', 'Повертає старий дизайн профілю, який був змінений ВК 28 серпня 2022 року<br>Після включення/вимкнення функції оновіть сторінку'],
    blockTransparency: ['Прозрачность блоков', 'Block transparency', 'Прозорість блоків'],
    additionalVKEnhancerFunctions: ['Дополнительные функции VK Enhancer', 'Additional VK Enhancer functions', 'Додаткові функції VK Enhancer'],
    additionalFunctionsDescription: ['Данные функции работают только совместно с старым дизайном VK от @notmaxhack', 'These functions only work in conjunction with the old VK design from @notmaxhack', 'Ці функції працюють тільки разом зі старим дизайном VK від @notmaxhack'],
    customAccent: ['Кастомный акцент', 'Custom accent', 'Кастомний акцент'],
    highlightColor: ['Цвет выделения', 'Highlight color', 'Колір виділення'],
    selectedTextColor: ['Цвет выделенного текста', 'Selected text color', 'Колір виділеного тексту'],
    newMessengerDesign: ['Новый дизайн мессенджера', 'New messenger design', 'Новий дизайн месенджера'],
    newMessengerDesignDescription: ['Внимание! Это экспериментальная функция. Активируйте её на свой страх и риск<br>После включения/выключения функции обновите страницу', 'Attention! This is an experimental feature. Activate it at your own risk<br>After enabling/disabling the function, refresh the page', 'Увага! Ця експериментальна функція. Активуйте її на свій страх і ризик<br>Після включення/вимкнення функції оновіть сторінку'],
    reloadFunctionsButton: ['Кнопка перезагрузки функций', 'Reload button', 'Кнопка перезавантаження функцій'],
    saveSettingsToFile: ['Сохранить настройки в файл', 'Save settings', 'Зберегти налаштування в файл'],
    loadSettingsFromFile: ['Загрузить настройки из файла', 'Load settings from file', 'Завантажити налаштування з файлу'],
    resetSettings: ['Сбросить настройки', 'Reset settings', 'Скинути налаштування'],
    usefulLinks: ['Полезные ссылки', 'Useful links', 'Корисні посилання'],
    vkEnhancerGitHub: ['VK Enhancer на GitHub', 'VK Enhancer on GitHub', 'VK Enhancer на GitHub'],
    vkEnhancerGitHubDescription: ['Исходный код и новые версии расширения', 'Source code and new versions of the extension', 'Вихідний код та нові версії розширення'],
    vkEnhancerGroup: ['Группа VK Enhancer ВКонтакте', 'VK Enhancer group', 'Група VK Enhancer ВКонтакті'],
    vkEnhancerGroupDescription: ['Новости, информация об обновлениях', 'News and information about updates', 'Новини, інформація про оновлення'],
    vkEnhancerChat: ['Чат VK Enhancer ВКонтакте', 'VK Enhancer chat', 'Чат VK Enhancer ВКонтакті'],
    vkEnhancerChatDescription: ['Обсуждение новинок и ошибок расширения, общение на любые темы', 'Discussion of new functions and extension errors, communication on any topic', 'Обговорення новинок і помилок розширення, спілкування на будь-які теми'],
    team: ['Команда', 'Team', 'Команда'],
    extensionCreator: ['Создатель расширения, разработчик, дизайнер', 'Extension creator, developer, designer', 'Розробник розширення, розробник, дизайнер'],
    developer: ['Разработчик', 'Developer', 'Розробник'],
    appearance: ['Внешний вид', 'Appearance', 'Зовнішній вигляд'],
    messenger: ['Мессенджер', 'Messenger', 'Месенджер'],
    other: ['Прочее', 'Other', 'Інше'],
    information: ['Информация', 'Information', 'Інформація'],
	versionNumber: ['Версия 3.8 Release', 'v. 3.8 Release', 'Версія 3.8 Release'],
	errorUpdating: ['Не обновляется расширение? Нажмите CTRL+M в любом месте браузера и расширение перезагрузится, при этом, обновившись до новейшей версии', 'Extension not updating? Press CTRL+M anywhere in the browser and the extension will reload, updating to the latest version', 'Чи не оновлюється розширення? Натисніть CTRL+M будь-де браузера і розширення перезавантажиться, при цьому, оновившись до новітньої версії'],
	lang: ['Язык:', 'Language:', 'Мова:'],
	notGroupOrUserId: ['Данный элемент не является пользователем или группой', 'This element is not a user profile or group', 'Цей елемент не є користувачем або групою'],
};

export default strings;
