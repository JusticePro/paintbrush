var util    = require ('util');
var uColors = util.inspect.colors;

var isNode = typeof process !== 'undefined'; // && process.argv[0].lastIndexOf ("node") === process.argv[0].length - 4)

function getColors (colorNames) {
	var color_attrs = colorNames.constructor === Array ? colorNames : colorNames.split("+");
	var strPrefix = "", strPostfix = "";
	for (var i = 0, attr; attr = color_attrs[i]; i++) {
		strPrefix  += "\033[" + uColors[attr][0] + "m";
		strPostfix += "\033[" + uColors[attr][1] + "m";
	}
	return {start: strPrefix, end: strPostfix};
}

function color () {
	var args = [].slice.apply (arguments);
	var colorNames = args.shift();
	var str = args.join (' ');

	if (!isNode && !colorNames)
		return str;

	var ansiColors = getColors (colorNames);
	var ansiStr = ansiColors.start + str + ansiColors.end;

	return ansiStr;
}

for (var colorName in uColors) {
	// real colors like black and red have 39 as second array element
	if (uColors[colorName][1] === 39) {
		if (isNode) {
			uColors[colorName+'_bg'] = [uColors[colorName][0] + 10, 49];
		}
	}
	color[colorName] = color.bind (color, colorName);
}

/**
 * Discard color information from string
 * @param   {string} str colored string
 * @returns {string} monochrome string
 */
color.clearString = function (str) {
	return str.replace(/\x1b\[[0-9;]*m/g, "");
}

/**
 * Fill color information for colorless chunks
 * @returns {string} resulting string
 */
color.fillString = function () {
	var args = [].slice.apply (arguments);
	var colorNames = args.shift();
	var str = args.join (' ');
	var chunks = str.split (/\x1b\[(?:39|0)m/gm);

	if (!isNode && !colorNames)
		return str;

	var result = '';

	chunks.forEach (function (chunk) {
		var ansiColors = getColors (colorNames);
		result += ansiColors.start + chunk;
	});

	// cleanup
	result += "\x1b[0m";

	return result;
}

module.exports = color;
