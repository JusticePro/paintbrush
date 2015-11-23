var assert = require ('assert');

var paint  = require ('../');

describe ('paint test', function () {
	
	it ('should paint string with color', function () {
		var s = "Man arrested in Fifth Ave Apple Store trying to slash prices with real samurai sword";
		assert.equal(paint ('bold', s), '\x1B[1m' + s + '\x1B[22m');
		assert.equal(paint.italic (s), '\x1B[3m' + s + '\x1B[23m');

		assert.equal(paint ('red+underline', s), '\x1B[31m\x1B[4m' + s + '\x1B[39m\x1B[24m');
		assert.equal(paint (['red', 'underline'], s), '\x1B[31m\x1B[4m' + s + '\x1B[39m\x1B[24m');
		
		assert.equal(paint (['unicorn'], s), s);
		
		assert.equal(paint (null, s), s);
		//assert.equal(paint ('red+underline', s), '\x1B[31m\x1B[4m' + s + '\x1B[39m\x1B[24m');
		//assert.equal(s.inverse, '\x1B[7m' + s + '\x1B[27m');
	});

	it ('should discard color', function () {
		var s = "Man arrested in Fifth Ave Apple Store trying to slash prices with real samurai sword";
		var ss = paint ('red+underline', s);
		assert (s === paint.discardColor (ss));
		assert (s === paint.stripColor (ss));
		// if we got something unexpected, just return it
		paint.stripColor ();
	});

	it ('should fill color', function () {
		var s1 = "Man arrested in ",
			s2 = "Fifth Ave Apple Store",
			s3 = " trying to slash prices with real samurai sword";
		var ss1 = s1 + paint ('red', s2) + s3;
		var ss2 = paint ('grey', s1) + paint ('red', s2) + paint ('grey', s3);
		
		assert.equal(paint.fillUnpainted (null, s1), s1);

		//var util = require ('util');

		//console.log (util.inspect (paint.fillUnpainted ('grey', ss1)));
		//console.log (util.inspect (ss2));

		assert (paint.fillUnpainted ('grey', ss1) === ss2.replace (/\x1B\[39m/mg, "") + "\x1B[0m");
	});

});
