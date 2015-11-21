Paintbrush
==========

Paintbrush is an ascii coloring tool for nodejs.

It depends only on `util.inspect`.

Synopsis
--------

```javascript
var paint = require ('paintbrush');

paint ('red', 'red text');

paint ('red+black_bg', 'red text on black');

paint.redOnBlack = paint.bind ('red+black_bg');

// actually this is main reason to publish another one module
paint.redOnBlack ('red text on black');


```
