// defines Global ajaxurl if needed

if ( ( typeof ajaxurl === 'undefined' ) && ( typeof wp.media.view.l10n.mla_strings.ajaxurl === 'string' ) ) {
	var ajaxurl = wp.media.view.l10n.mla_strings.ajaxurl;
}
