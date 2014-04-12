$.ioutils.nolog = false;
$.ioutils.nostats = true;
$.ioutils.callbacktimeout = '20s';
var $body = $( 'body').css({ 'font-size': $.io.defs.fonts.big})
var AS, STR, AUTH, DRILLS, DOCS, KS; AUTH = null; DRILLS = null; DOCS = {};
//var action = null; action = chrome.browserAction;  
//var runtime = null; runtime = chrome.runtime;  // onMessage
var storage = chrome.storage.local; // QUOTA_BYTES, getBytesInUse(), get(), set(), remove(), clear()
$body.css({ width: '500px', height: 'auto', 'background-color': '#eee', color: '#555', margin: '5px', padding: '0px', 'font-size': $.io.font.small})
$body.append( 'There is nothing here, everything in on the page.');
if ( 0) $body.kvstorage( function( kvs) { storage.get( [ 'twooter'], function( h) { 
	if ( ! h || ! h.twooter) h = { B: {}, H: []};
	else h = $.json2hutf8( h.twooter, true);
	var $box = $body.ioover( true);
	var doadd, save, blocks;
	var add = $box.ioover( true).css({ float: 'left', position: 'relative', width: '60%', height: '1.2em', 'font-size': $.io.defs.fonts.normal}).guiTextBox( 'add', doadd, 'account to block', '#000,0.3', { color: '#000'}, true);
	doadd = function() { }
	save = function() { }
	blocks = function() { }
	var $box2 = $box.ioover( true).css({ float: 'left', position: 'relative', width: 'auto', height: 'auto', 'font-size': $.io.defs.fonts.normal})
	var L = $.ttl( 'blocks,clear'); for ( var i in L) L[ i] = '<strong>' + L[ i] + '</strong>';
	$box2.append( ' - ' + $.ltt( L, ' - ')).find( 'strong').iotextbutton( function( k) { 
		if ( k == 'clear') { h.H = {}; return save(); }
		if ( k == 'blocks') return blocks();
	}, '#555');
	$box.ioover( true).css({ clear: 'both'});
	var photo = function( $b2, h2) { var $b3 = $b2.ioover( { position: 'relative', display: 'block', width: '100%', heigh: 'auto'}, 'img', { src: h2.url}); $b3.ioatomsPlainButton({ dotnodraw: true, donotwrap: true}).onclick( function() { 
		$b2.css({ width: '70%'});
	})}
	var video = function( $b2, h2) {
		var $b3 = $b2.ioover().attr({ id: 'Container', 'class': 'Container'});
		var $b4 = $b3.ioover().ioover({ width: 'auto', height: 'auto'}, 'a', { href: h2.url, 'class': h2[ 'class']}).append( 'Show media');
		$b4.oneTime( '10s', function() { $b4.simulate( 'click');}) 
	}
	var H2 = []; for ( var i in h.H) if ( h.H[ i].time > $.iotime() - 1000 * 60 * 60 * 12) H2.push( h.H[ i]);
	h.H = H2;
	$box.ioloop( $.hk( H2), '1ms', function( dom, value, sleep, c) { 
		if ( ! value.length) return c();
		var h2 = H2[ value.shift()];
		var $b = $box.ioover( true).css({ float: 'left', position: 'relative', margin: '3px', border: '0px', width: '23%', height: 'auto'})
		if ( h2.type == 'photo') photo( $b, h2); else video( $b, h2);
		c( value);
	})
	save();
}); })
