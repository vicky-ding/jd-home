/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'YISHOU\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-add': '&#xe90d;',
		'icon-all': '&#xe90e;',
		'icon-banner': '&#xe90f;',
		'icon-drag': '&#xe910;',
		'icon-font': '&#xe911;',
		'icon-new': '&#xe912;',
		'icon-sales': '&#xe913;',
		'icon-dele': '&#xe914;',
		'icon-shift_down': '&#xe915;',
		'icon-shift_up': '&#xe916;',
		'icon-close': '&#xe900;',
		'icon-alert1': '&#xe901;',
		'icon-alert2': '&#xe902;',
		'icon-alert3': '&#xe903;',
		'icon-alert4': '&#xe904;',
		'icon-arrow_down': '&#xe905;',
		'icon-arrow_right': '&#xe906;',
		'icon-arrow_up': '&#xe907;',
		'icon-head': '&#xe908;',
		'icon-icon1': '&#xe909;',
		'icon-icon2': '&#xe90a;',
		'icon-menu': '&#xe90b;',
		'icon-notice': '&#xe90c;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
