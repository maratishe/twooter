$.ioutils.nolog = false;
$.ioutils.nostats = true;
var action = chrome.browserAction;  
var runtime = chrome.runtime;  // onMessage
var storage = chrome.storage.local; // QUOTA_BYTES, getBytesInUse(), get(), set(), remove(), clear()
var $hidden = $( 'body').ioover().css({ left: '-10px', width: '5px', height: '5px'})
var $popup = $( 'body').ioover({ position: 'fixed', right: '5px', top: '5px', width: '40%', height: 'auto', 'z-index': 1000000}).attr( 'id', 'twooterPopup').ioground( '#000', 0.9).ioover( true).css({ padding: '5px', color: '#fff'});
var $slide = $( 'body').ioover({ position: 'fixed', top: '10%', height: '80%', right: '-5px', width: '85%', 'z-index': 1000000})
var $SLIDE;
var slide = null; $slide.sideslideright( 'summary', $.io.defs.fonts.small, function( b) { slide = b; $SLIDE = slide.inner().mockvframe().inner(); }, '#000,0.9') ; 
function popup( text) { $popup.ioanimoutemptyin( 'slow', function() { $popup.append( 'Msg: ' + text); })}
var KVS = null; $hidden.kvstorage( function( kvs) { KVS = kvs; }); 
var B = {}; var H = {};
function one() { $hidden.stopTime().oneTime( '20s', function() { storage.get( [ 'twooter'], function( h) {
	one(); // for the next time, just in case this one breaks
	if ( h && h.twooter && h.twooter.B) B = h.twooter.B;
	var $C = $( 'div[class="content-header"]').next()
	var $L = $C.last().find( 'ol').first(); // first is if there is search
	// process current content
	var photo = function( $box) { $box.simulate( 'click'); $box.oneTime( '3s', function() { // type, url, time 
		var $box2 = $box.parent().next().find( 'img').first();
		var url = $box2.attr( 'src');
		if ( H[ url]) H[ url].time = $.iotime();
		if ( url && ! H[ url]) H[ url] = { type: 'photo', url: url, time: $.iotime(), code: url};
		$box.simulate( 'click');
		$.log( 'photo', url);
	})}
	var video = function( $box) { $box.simulate( 'click'); $box.oneTime( '3s', function() { // type, url, content, time 
		var $box2 = $box.parent().parent().parent().parent();
		var content = $box2.get( 0).innerHTML;
		var url = $box.parent().next().find( 'iframe').first().attr( 'src');
		var code = $.ttl( url, '?').shift();
		if ( H[ code]) H[ code].time = $.iotime();
		if ( code && ! H[ code]) H[ code] = { type: 'video', url: url, content: content, time: $.iotime(), code: code};
		$.log( 'video code', code);
		$box.simulate( 'click');
	})}
	$L.children().each( function() {
		var $b = $( this);
		var $c = $( this).find( 'div[class="content"]').first(); var $t = null;
		var account = null; 
		$t = $c.find( 'div[class="stream-item-header"]').find( 'a').first().find( 'span').last().find( 'b').first();
		if ( ! $t.isindom()) return; account = $.trim( $t.text()); if ( ! account) return;
		if ( B[ account]) return $b.ioanimoutemptyin( 'fast', function() { $b.remove(); }); // blocked
		// look for images
		$b.find( 'span').each( function() { 
			var $me = $( this); if ( $.trim( $me.text()) != 'View photo') return;
			photo( $me.parent().parent());
		})
		// look for video
		$b.find( 'span').each( function() { 
			var $me = $( this); if ( $.trim( $me.text()) != 'View media') return;
			video( $me.parent().parent());
		})
		
	})
	// simulate click on when link with all messages pops up
	//$C.stopTime().oneTime( '7s', function() { $.log( 'ok'); storage.set( { twooter: $.h2jsonutf8({ B: B, H: $.hv( H)}, true)}, function() { }); })
	var showphoto = function( $b2, h2) { var $b3 = $b2.ioover( { position: 'relative', display: 'block', width: '100%', heigh: 'auto'}, 'img', { src: h2.url}); $b3.ioatomsPlainButton({ dotnodraw: true, donotwrap: true}).onclick( function() { 
		$b2.css({ width: '70%'});
	})}
	var showvideo = function( $b2, h2) { 
		$b2.css({ width: '47%'}); 
		$b2.css({ height: Math.round( 0.7 * $b2.width()) + 'px', overflow: 'hidden'})
		var $b3 = $b2.ioover().css({ top: '-35px'}).append( h2.content);
		$b2.oneTime( '3s', function() { var $frame = $b3.find( 'iframe').first(); $b3.empty().append( $frame); })
	}
	var showclose = function( $b2, h2) { $b2.ioover({ position: 'absolute', right: '3px', top: '3px', width: '30px', height: '30px'}).iodrawClose().ioatomsPlainButton({ donotwrap: true, donodraw: true}).onclick( function() { $b2.ioanimoutremove( 'fast'); delete H[ h2.code]; }); }
	$SLIDE.stopTime().oneTime( '5s', function() { $SLIDE.ioloop( $.hk( H), '1ms', function( dom, value, sleep, c) { 
		$.log( 'value', value);
		if ( ! value.length) { $SLIDE.ioover( true).css({ clear: 'both'}); c(); return; }
		var k = value.shift();
		var h2 = H[ k];	// type, url, time, [content]
		if ( h2.box) return c( value);
		if ( h2.time < $.iotime() - 1000 * 60 * 60 * 12) { if ( h2.box) h2.box.ioanimoutremove( 'fast'); delete H[ k]; return c( value); } // timeout for this content
		var $b = $SLIDE.iounder( true).css({ float: 'left', position: 'relative', margin: '3px', border: '0px', width: '18%', height: 'auto'})
		$b.ioground( '#fff', 0.2); H[ k].box = $b;
		if ( h2.type == 'photo') showphoto( $b, h2);
		else showvideo( $b, h2);
		showclose( $b, h2);
		c( value);
	})})
	var $S = $C.children().filter( '[class="stream-item"]'); $S.find( 'div').simulate( 'click');
	popup( $.iotime());
})})}
one();
