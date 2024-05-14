import strings from './stringLibrary.js';
function getCurrentLanguage() {
    var select = document.getElementById("languageSelect");
    return select.value;
}

function getLocalizedString(obj) {
    const currentLanguage = getCurrentLanguage();
    return obj[currentLanguage];
}

function fillStrings() {
    document.querySelector('#OldHover > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.standardTagInteraction);
    document.querySelector('#MiddleName > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.showPatronymic);
    document.querySelector('#NFT > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.removeAvatars);
    document.querySelector('#Emoji > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.removeEmojiStatus);
    document.querySelector('#Chitalka > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.disableReadingMessages);
    document.querySelector('#Pisalka > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.hideTextEntry);
    document.querySelector('#msgR > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.removeMessageReactions);
    document.querySelector('#postR > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.removePostReactions);
    document.querySelector('#AwayR > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.disableAway);
    document.querySelector('#HiderL > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.hideNamesAvatars);
    document.querySelector('#idName > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.avatarNameNear);
    document.querySelector('#GroupsRecent > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.hideRecentCommunities);
    document.querySelector('#ScrollBar > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.alternativeScrollbar);
    document.querySelector('#ReconnectInd > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.disableReconnectIndicator);
    document.querySelector('#MediaViewer > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.newMediaViewer);
    document.querySelector('#ReloadVKE > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.reloadFunctionsButton);
    document.querySelector('#SaveSettings > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.saveSettingsToFile);
    document.querySelector('#LoadSettings > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.loadSettingsFromFile);
    document.querySelector('#ClearSettings > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.resetSettings);
    document.querySelector('#Photo > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.returnCamera);
    document.querySelector('#PollsRes > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.showPollResults);
    document.querySelector('#CallsM > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.doNotDisturb);
	document.querySelector('#TabletMenu > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.tabletMenu);
    document.querySelector('#NewProfiles > div > div > .vkenhancerChoosePickerText1').innerHTML = '<span class="newSpan"><img class="newFire" src="assets/new.png"></span>' + getLocalizedString(strings.classicProfileInterface);
    document.querySelector('#NewMessenger > div > div > .vkenhancerChoosePickerText1').innerHTML = '<span class="newSpan"><img class="newFire" src="assets/new.png"></span>' + getLocalizedString(strings.newMessengerDesign);
    document.querySelector('#SecretOldDesign > div > div > .vkenhancerChoosePickerText1').textContent = getLocalizedString(strings.additionalVKEnhancerFunctions);
    document.querySelector('#SliderBlock > div > label').textContent = getLocalizedString(strings.blockTransparency);

    document.querySelector('div.footerInfo > h3:nth-child(1)').textContent = getLocalizedString(strings.usefulLinks);
    document.querySelector('div.footerInfo > a:nth-child(2) > h4').textContent = getLocalizedString(strings.vkEnhancerGitHub);
    document.querySelector('div.footerInfo > a:nth-child(2) > span').textContent = getLocalizedString(strings.vkEnhancerGitHubDescription);

    document.querySelector('div.footerInfo > a:nth-child(3) > h4').textContent = getLocalizedString(strings.vkEnhancerGroup);
    document.querySelector('div.footerInfo > a:nth-child(3) > span').textContent = getLocalizedString(strings.vkEnhancerGroupDescription);

    document.querySelector('div.footerInfo > a:nth-child(4) > h4').textContent = getLocalizedString(strings.vkEnhancerChat);
    document.querySelector('div.footerInfo > a:nth-child(4) > span').textContent = getLocalizedString(strings.vkEnhancerChatDescription);

    document.querySelector('div.footerInfo > h3:nth-child(5)').textContent = getLocalizedString(strings.team);
    document.querySelector('div.footerInfo > a:nth-child(6) > span').textContent = getLocalizedString(strings.extensionCreator);

    document.querySelector('div.footerInfo > a:nth-child(7) > span').textContent = getLocalizedString(strings.developer);

    document.querySelector('#CustomAccentChoose > h5').textContent = getLocalizedString(strings.customAccent);
    document.querySelector('#CustomTextChoose > h5').textContent = getLocalizedString(strings.highlightColor);
    document.querySelector('#CustomTextChoose1 > h5').textContent = getLocalizedString(strings.selectedTextColor);

    document.querySelector('#addstickertext').textContent = getLocalizedString(strings.emojiHotbar);
    document.querySelector('#parseidtext').textContent = getLocalizedString(strings.enterProfileGroupID);
    document.querySelector('[aria-customlogo="true"]>#colorgray').textContent = getLocalizedString(strings.customLogoHeader);
    document.querySelector('[aria-custombg="true"]>#colorgray').textContent = getLocalizedString(strings.customBackground);
    document.querySelector('[aria-customfont="true"]>#colorgray').textContent = getLocalizedString(strings.useCustomFont);

    document.querySelector('#dialog > p').textContent = getLocalizedString(strings.clearCacheDescription);
    document.querySelector('#yes > span > span').textContent = getLocalizedString(strings.globalYes);
    document.querySelector('#no > span > span').textContent = getLocalizedString(strings.globalNo);
    document.getElementById('openDialog').setAttribute('title', getLocalizedString(strings.clearCache));
    document.getElementById('changerb').setAttribute('title', getLocalizedString(strings.changeTheme));
    document.getElementById('openinnewtab').setAttribute('title', getLocalizedString(strings.openExtension));

    document.querySelector('#customlogo > span > span.vkenhancerButtonText__in').textContent = getLocalizedString(strings.set);
    document.querySelector('#custombg > span > span.vkenhancerButtonText__in').textContent = getLocalizedString(strings.set);
    document.querySelector('#customfontInput > span > span.vkenhancerButtonText__in').innerHTML = `<svg style="padding-right:4px;" aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--document_outline_20" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><use xlink:href="#document_outline_20" style="fill: currentcolor;"></use></svg>`+getLocalizedString(strings.set);

    document.querySelector('#resetlogo > svg > title').textContent = getLocalizedString(strings.resetFast);
    document.querySelector('#resetbg > svg > title').textContent = getLocalizedString(strings.resetFast);
    document.querySelector('#resetfont > svg > title').textContent = getLocalizedString(strings.resetFast);
    document.querySelector('#resetaccent > svg > title').textContent = getLocalizedString(strings.resetFast);
    document.querySelector('#resetsel > svg > title').textContent = getLocalizedString(strings.resetFast);
    document.querySelector('#resetseltext > svg > title').textContent = getLocalizedString(strings.resetFast);

    document.querySelector('#addemojitf').setAttribute('placeholder', getLocalizedString(strings.enterEmojiCodes));
    document.querySelector('#customlogotb').setAttribute('placeholder', getLocalizedString(strings.addLink));
    document.querySelector('#custombgtb').setAttribute('placeholder', getLocalizedString(strings.addLink));
    document.querySelector('#customfonttb').setAttribute('placeholder', getLocalizedString(strings.enterFontName));

    document.querySelector('#addhotbar > span.vkenhancerButtonText > span').textContent = getLocalizedString(strings.updateHotbar);
    document.querySelector('#checkid > span.vkenhancerButtonText > span').textContent = getLocalizedString(strings.knowID);

    document.querySelector('#version').textContent = getLocalizedString(strings.versionNumber);
    document.querySelector('#version1').textContent = getLocalizedString(strings.errorUpdating);
    document.querySelector('#langName').textContent = getLocalizedString(strings.lang);

    document.querySelector('#PollsRes > div.vkenhancerChoosePicker > div:nth-child(2) > span').textContent = getLocalizedString(strings.defaultPollHidden);
    document.querySelector('#CallsM > div.vkenhancerChoosePicker > div:nth-child(2) > span').textContent = getLocalizedString(strings.doNotDisturbDescription);
    document.querySelector('#NewProfiles > div.vkenhancerChoosePicker > div:nth-child(2) > span').innerHTML = getLocalizedString(strings.classicProfileInterfaceDescription);
    document.querySelector('#NewMessenger > div.vkenhancerChoosePicker > div:nth-child(2) > span').innerHTML = getLocalizedString(strings.newMessengerDesignDescription);
    document.querySelector('#textfieldprotip').textContent = getLocalizedString(strings.emojiHotbarDescription);
    document.querySelector('#textfieldprotipID').textContent = getLocalizedString(strings.enterProfileGroupIDDescription);

    document.querySelector("#tab1 > div.vkuiTabbarItem__in > div.vkuiTypography.vkuiTypography--normalize.vkuiTypography--weight-2.vkuiTabbarItem__text.vkuiFootnote").textContent = getLocalizedString(strings.appearance);
    document.querySelector("#tab2 > div.vkuiTabbarItem__in > div.vkuiTypography.vkuiTypography--normalize.vkuiTypography--weight-2.vkuiTabbarItem__text.vkuiFootnote").textContent = getLocalizedString(strings.messenger);
    document.querySelector("#tab3 > div.vkuiTabbarItem__in > div.vkuiTypography.vkuiTypography--normalize.vkuiTypography--weight-2.vkuiTabbarItem__text.vkuiFootnote").textContent = getLocalizedString(strings.other);
    document.querySelector("#tab4 > div.vkuiTabbarItem__in > div.vkuiTypography.vkuiTypography--normalize.vkuiTypography--weight-2.vkuiTabbarItem__text.vkuiFootnote").textContent = getLocalizedString(strings.information);
	document.querySelector("#tab0 > div.vkuiTabbarItem__in > div.vkuiTypography.vkuiTypography--normalize.vkuiTypography--weight-2.vkuiTabbarItem__text.vkuiFootnote").textContent = getLocalizedString(strings.oldDTab);
	
	
	document.querySelector('.vkEnhancerHeaderRatio1').textContent = getLocalizedString(strings.oldDTab);
	document.querySelector('.vkEnhancerHeaderRatio2').textContent = getLocalizedString(strings.appearance);
	document.querySelector('.vkEnhancerHeaderRatio3').textContent = getLocalizedString(strings.messenger);
	document.querySelector('.vkEnhancerHeaderRatio4').textContent = getLocalizedString(strings.other);
	
	document.querySelector('.vkEnhancerHeaderRatioPseudo1').textContent = getLocalizedString(strings.pseudoTab1);
	document.querySelector('.vkEnhancerHeaderRatioPseudo2').textContent = getLocalizedString(strings.pseudoTab2);
	document.querySelector('.vkEnhancerHeaderRatioPseudo3').textContent = getLocalizedString(strings.pseudoTab3);
	
	document.querySelector("#parseid").value = getLocalizedString(strings.notGroupOrUserId);;
}

document.getElementById("languageSelect").addEventListener("change", function() {
    var cached = document.getElementById("languageSelect").value;
    chrome.storage.local.set({
        currentLanguage: cached
    }, function() {
        fillStrings();
    });
});

chrome.storage.local.get(['currentLanguage'], function(result) {
    if (result.currentLanguage !== undefined) {
        document.getElementById("languageSelect").value = result.currentLanguage;
    } else {
        document.getElementById("languageSelect").value = "0";
    }
    fillStrings();
});
