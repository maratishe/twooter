$.ioutils.nolog = true;
$.ioutils.nostats = true;
var action = chrome.browserAction;  
var runtime = chrome.runtime;  // onMessage
var storage = chrome.storage.local; // QUOTA_BYTES, getBytesInUse(), get(), set(), remove(), clear()
var $hidden = $( 'body').ioover().css({ left: '-10px', width: '5px', height: '5px'})
//var $popup = $( 'body').ioover({ position: 'fixed', right: '5px', top: '5px', width: '40%', height: 'auto', 'z-index': 1000000}).attr( 'id', 'twooterPopup').ioground( '#000', 0.9).ioover( true).css({ padding: '5px', color: '#fff'});
//var $slide = $( 'body').ioover({ position: 'fixed', top: '10%', height: '80%', right: '-5px', width: '85%', 'z-index': 1000000})
//var $SLIDE; var slide = null; $slide.sideslideright( 'summary', $.io.defs.fonts.small, function( b) { slide = b; $SLIDE = slide.inner().mockvframe().inner(); }, '#000,0.9') ; 
function popup( text) { $popup.ioanimoutemptyin( 'slow', function() { $popup.append( 'Msg: ' + text); })}
var KVS = null; $hidden.kvstorage( function( kvs) { KVS = kvs; }); 
var B = {}; var H = {};
$( 'button[id="global-new-tweet-button"]').click( function() { $hidden.stopTime().oneTime( '1s', function() { 
	$.log( 'click');
	var $box = $( 'div[id="global-tweet-dialog"]').first(); $box.find( '#twooter').remove();
	var $boxB = $( '[class="js-first-tabstop"]').first();
	var $box2 = $box.find( 'div[id="global-tweet-dialog-dialog"]').first()
	var $box3 = $box.ioover({ position: 'absolute', top: Math.round( $box2.position().top + $box2.height() + 15) + 'px', left: Math.round( $box2.position().left) + 'px', width: Math.round( $box2.width()) + 'px', height: 'auto', border: '3px solid #fff'})
	.ioground( '#000', 0.3).attr( 'id', 'twooter').css({ overflow: 'visible'});
	var T = ''; var T2 = ''; var $T;
	var TAGS = {}; var $TAGS = $box3.ioover( true).css({ 'font-size': $.io.font.bigger, color: '#fff', margin: '5px 1%', width: '98%'}); var tags;
	var onchange = function( text) { $box3.stopTime().oneTime( '1s', function() { 
		$.log( 'onchange()! ', text);
		if ( ! $boxB.isindom()) return;	// probably disappeared
		var L = $.ttl( text, ' ');
		for ( var i in L) { 
			var t = L[ i]; if ( ! t || ! $.trim( t)) continue;
			if ( t.length < 2) continue; 
			var s = '!';
			var L2 = $.ttl( L[ i], '!'); if ( L2[ 1]) s = "'";
			var t2 = L2[ 0]; $.log( 'onchange() t2', t2);
			if ( t2.substr( 0, 1) == '#') tags( t2); // new hashtag
			if ( TAGS[ '#' + t2] === 1) { t2 = '#' + t2; tags( t2); } // convert this to a hashtag
			L2[ 0] = t2; L[ i] = $.ltt( L2, s);
		}
		T2 = $.ltt( L, ' '); tags(); 
	})}
	tags = function( t) { $.log( 'tags() t', $.any2json( t)); if ( t) { delete TAGS[ t]; TAGS[ t] = 1; }; $hidden.stopTime().oneTime( '2s', function() { $TAGS.ioanimoutemptyin( 'fast', function() {  
		$.log( 'tags() TAGS', $.any2json( TAGS));
		var L = $.ttl( T2, ' '); for ( var i in L) if ( L[ i].length > 1 && L[ i].substr( 0, 1) == '#') L[ i] = '<span>' + L[ i] + '</span>';
		$TAGS.empty().append( $.ltt( L, ' '));
		$TAGS.find( 'span').css({ color: '#FF4', 'font-weight': 'bold'});
		$TAGS.append( ' -- <strong>done</strong> - <strong>clear</strong>').find( 'strong').iotextbutton( function( k) { if ( k == 'clear') return KVS.clear(); T = T2; $T.empty().append( T); }, '#F45');
		L = []; for ( var k in TAGS) L.unshift( k);
		$TAGS.ioover( true).append( $.ltt( L, ' ')).css({ 'font-size': $.io.defs.fonts.small, color: '#7CF'}) 
		// store current TAGS setup
		KVS.set({ twooter: $.h2jsonutf8( TAGS, true)});
	})})}
	var one = function() { $box2.stopTime().oneTime( '200ms', function() { 
		if ( ! $boxB.isindom()) return;	// probably disappeared
		$T = $box2.find( '[id="tweet-box-global"]').first().find( 'div').first();
		var text = $.trim( $T.text()); //$.log( 'one() text', text);
		if ( text != T) { onchange( text); T = text; }
		one();
	})}
	KVS.get( 'twooter', function( h) { if ( h && h.twooter) TAGS = $.json2hutf8( h.twooter, true); one(); tags(); })
})})
