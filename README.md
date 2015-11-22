Paintbrush
==========

[![build](https://travis-ci.org/apla/paintbrush.svg)](https://travis-ci.org/apla/paintbrush)
[![NPM Version](http://img.shields.io/npm/v/paintbrush.svg?style=flat)](https://www.npmjs.org/package/paintbrush)
[![codecov.io](https://codecov.io/github/apla/paintbrush/coverage.svg?branch=master)](https://codecov.io/github/apla/paintbrush?branch=master)

Paintbrush is an ascii coloring tool for nodejs.

It depends only on `util.inspect`.

Synopsis
--------

```javascript
var paint = require ('paintbrush');

console.log (paint ('red', 'red text'));

console.log (paint ('red+black_bg', 'red text on black'));

paint.redOnBlack = paint.bind (paint, 'red+black_bg');
paint.error      = paint.bind (paint, "red+white_bg");
paint.path       = paint.cyan.bind (paint);

// actually this is main reason to publish another one module
console.log (paint.redOnBlack ('red text on black'));


// use to discard colors and repaint output from another program
var httpProcess = child_process.spawn (
	'/usr/bin/env',
	['dataflows', 'daemon', '--no-fork'], {
		stdio: ['pipe', 'pipe', 'pipe']
	}
);

httpProcess.stderr.on ('data', function (data) {
	// paint grey every string chunk without color information
	// to differentiate between server and client output
	process.stdout.write (paint.fillUnpainted ('grey', data.toString()));
});

httpProcess.stdout.on ('data', function (data) {
	if (verbose) {
		process.stdout.write (paint.fillUnpainted ('grey', data.toString()));
	}
	if (!ignoreStdout) shellOutput += data;
	if (!ignoreStdout) {
		var m = paint.stripColor (shellOutput).match (/http initiator running at http:\/\/([^:]+):([^\/]+)/);
		if (m) {
		// …
		}
	}
});

```

API
---

``` javascript

var paint = require ('paintbrush');

```

**paint** function allows you to write colored messages. First parameter is a color attribute
specification. You can use `bold`, `italic`, `underline` and `inverse` modifiers;
`white`, `grey`, `black`, `blue`, `cyan`, `green`, `magenta`, `red` and `yellow` colors;
also every color you can use as background, just add `_bg`.
Any following arguments joined with space character between them.

``` javascript
console.log (
	paint ("black+italic+cyan_bg", "will paint black italic text", "on cyan", "background")
);
```

**paint.stripColor** can be used to discard any color information from string.
Also you can use **paint.discardColor** as an alias.

**paint.fillUnpainted** will fill any color-absent chunks to color you want.
Take a look into example in [Synopsis](#synopsis) to get idea how it works.
