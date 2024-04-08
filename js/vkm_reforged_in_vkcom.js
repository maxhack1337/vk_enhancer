const newDesignFunctions = ["vkm_reforged_in_vkcom", "vkm_convo_profile", "me_fc_message_actions", "me_message_selecting", "me_fc_simple_composer", "vkm_chat_big_stickers", "vkm_mention_highlight_tertiary", "vkm_message_context_menu", "vkm_photo_viewer_owner", "vkm_photo_viewer_rotating", "vkm_photo_viewer_scaling", "vkm_profile_info_screen_name", "vkm_qr_code_chat_invitation", "vkm_ugc_stickers_in_keyboard", "vkm_video_messages_shapes", "vkm_video_messges_subtitles", "vkm_send_promoted_stickers", "vkm_settings_experimental", "vkm_hide_forward_author", "vkm_extended_reaction_picker", "vkm_composer_new", "me_community_messages_enabled", "vkm_convo_forbid_writing_all", "vkm_convo_member_temporary_ban", "vkm_create_avatar_from_sticker", "vkm_message_preview_on_hover", "vkm_mini_apps_attach_picker", "vkm_new_attach_track", "vkm_new_attach_video", "vkm_new_music_attaches", "vkm_recommended_folders", "vkm_upload_v2", "vkm_spam_message_types", "vkm_settings_hide_suggested", "vkm_send_private_message_link", "vkm_new_remove_empty_forwards", "vkm_theme_styles_settings", "vkm_forward_modal_multipick", "vkm_new_attach_post", "vkm_new_miniapp_attaches", "vkm_stickers_popup", "vkm_media_share", "vkm_reforged_in_vkcom", "me_vkcom_api_feature_flags", "vkm_hide_forward_author", "vkm_theme_styles_settings"];
let intMedia = false;
window.addEventListener("message", (event) => {
	switch (event.data.action) {
	case "integrationMedia": {
		intMedia = event.data.value;
		break;
	}
	}
});
function executeCode() {
    if (window.vk && window.MECommonContext && window.vk.pe) { 
        newDesignFunctions.forEach(flag => {
            window.vk.pe[flag] = 1;
        });
		window.vk.pe.vkm_integration_media_viewer = intMedia ? 1:0;
		window.vk.pe.vkm_reforged_in_vkcom = 1;
		window.vk.pe.me_vkcom_api_feature_flags = 1;
		window.vk.pe.vkm_hide_forward_author = 1;
		window.vk.pe.vkm_theme_styles_settings = 1;
        window.MECommonContext.then(e => {
            if (e.store.featureFlags) {
                newDesignFunctions.forEach(flag => {
                    e.store.featureFlags[flag] = true;
                });
				e.store.featureFlags["vkm_integration_media_viewer"] = intMedia;
            }
        }).catch(error => {
        });
    } else {
    }
}

const peProxy = new Proxy(window.vk && window.vk.pe || {}, {
    set(target, property, value) {
        executeCode();
        return Reflect.set(...arguments);
    }
});

const meCommonContextProxy = new Proxy(window.MECommonContext || {}, {
    set(target, property, value) {
        executeCode();
        return Reflect.set(...arguments);
    }
});

function checkVariables() {
    if (!window.location.href.includes("vk.com/im")) {
        
    } else {
        executeCode();
    }
}

const interval = setInterval(checkVariables, 100);
