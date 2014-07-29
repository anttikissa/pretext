
function untabify(text) {
	result = '';
	column = 0;
	for (var i = 0, len = text.length; i < len; i++) {
		var c = text[i];
		if (c == '\t') {
			result += ' ';
			while (++column % 4 != 0) {
				result += ' ';
			}
			continue;
		} else if (c == '\n') {
			column = 0;
		} else {
			column++;
		}
		result += c;
	}
	return result;
}

function trim(text) {
	var withoutBlankLines = text.replace(/\n[ \f\r\t\v]*$/gm, '\n');
	var withoutStartingOrLeadingNewlines = withoutBlankLines.replace(/(^\n*)|(\n*$)/g, '');
	return withoutStartingOrLeadingNewlines;
}

function split(text) {
	return text.split(/\n\n+/);
}

function escape(text) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function escapeCode(text) {
	return escape(text)
		.replace(/\\(.)/g, '$1');
}

// Escape HTML special characters but keep existing character references like
// &auml; and &#39; untouched.
function escapeSome(text) {
	var escapedCharacterReference = /&amp;(#(?:x?[0-9]+)|(?:[a-zA-Z]+?));/gi;
	return escape(text).replace(escapedCharacterReference, '&$1;');
}

// The filter that handles most of the "normal" text.  (For example, all of the
// the text -- apart from the markup -- in headings, list items, and
// paragraphs.)
// 
// The text might contain inline code and HTML tags, which are handled by
// 'codify' and 'textWithHtml' filters.
function text(text) {
	var codified = codify(text);

	var restPattern = /(^|<\/code>)([^]*?)(<code>|$)/g;
	return codified.replace(restPattern, function(match, p1, p2, p3) {
		return p1 + textWithHtml(p2) + p3;
	});
}

// Process text that may contain HTML tags (but not inline code).  Leave the
// HTML tags alone and run the text sequences in between them through
// 'plainText' filter.
function textWithHtml(text) {
	// Find text between things that look like HTML tags.
	var betweenPattern = /(^|[^=<>]\s*>)([^]*?)(<\/?\b|$)/g;
	// This is the right one
	// TODO what's this?
	//var betweenPattern = /(^|[^=<>]\s*\/?>)([^]*?)(<\/?\b|$)/g;

	return text.replace(betweenPattern, function(match, p1, p2, p3) {
		return p1 + plainText(p2) + p3;
	});
}

var plainTextFilters = [
	escapeSome,
	italicize,
	boldify,
	linkify,
	dashify
]

// Process plain text (which does not contain HTML tags or inline code) by
// running it through all text filters.
function plainText(text) {
	var result = text;

	plainTextFilters.forEach(function(filter) {
		result = filter(result);
	});

	return result;
}

// Replace code blocks (`...`) in text by <code>...</code>.  The contents
// are run through filter escapeCode.
function codify(text) {
	// Match `contents`, where 'contents' does not contain a `.
	// 'contents' may be contain one ore more escaped `, that is, \`.
	// Does not match if the first ` is preceded by \.  This lets you quote
	// `'s both inside and outside of code blocks.
	var pattern = /([^\\]|^)`([^\\`]*(?:\\.[^`\\]*)*)`/g;

	return text.replace(pattern, function(match, p1, p2) {
		return p1 + '<code>' + escapeCode(p2) + '</code>';
	});
}

// Replace /contents/ with <i>contents</i>.
//
// 'contents' must be non-empty.
//
// The starting slash must not be preceded with a word character (\w), and
// must not be followed by a white space character (\s).  
// The ending slash must not be preceded with a white space character (\s), and
// must not be followed by a word character (\w).  
//
// Try to not match URLs.  (Though it is possible to contruct a valid URL that
// will be matched, such as http://foo.com/bar+/zot/.  Eventually we need a way
// around those.)
//
// Slashes that are part of URLs are not matched.
function italicize(text) {
	var pattern = /([^<:\/]|^)\B\/(?!\s)([^]*?[^:\/\s])\/\B/g;
	return text.replace(pattern, '$1<i>$2</i>');
}

// Replace *contents* with <b>contents</b>.
//
// 'contents' must be non-empty.
//
// The starting asterisk must not be preceded with a word character (\w), and
// must not be followed by a white space character (\s).  
// The ending asterisk must not be preceded with a white space character (\s), and
// must not be followed by a word character (\w).  
function boldify(text) {
	var pattern = /\B\*(?!\s)([^]*?[^\s])\*\B/g;
	return text.replace(pattern, '<b>$1</b>');
}

// Replace _link text_ (url) with <a href='url'>link text</a>.
//
// Nested parentheses inside the URLs are supported to two levels of nesting:
//
// _link_ (http://domain.com/this(is(url))) ->
// <a href='http://domain.com/this(is(url))'>link</a>
function linkify(text) {
	var pattern = /\b_(?!\s)([^]*?[^\s])_(?:\s*\(((?:[^\(\)]*\((?:[^\(\)]*\([^\(\)]*\))*[^\(\)]*\))*[^\(\)]*)\)|\b)/g;

	return text.replace(pattern, function(match, p1, p2, p3) {
		var href = p2 ? " href='" + escapeSome(p2) + "'" : "";
		return '<a' + href + '>' + p1 + '</a>';
	});
}

// Replace -- with &ndash; and --- with &mdash;.
function dashify(text) {
	var pattern = /(^|[^!-])(---?)([^->]|$)/g;
	return text.replace(pattern, function(match, p1, p2, p3) {
		return p1 + '&' + (p2.length === 2 ? 'n' : 'm') + 'dash;' + p3;
	});
}

function type(element) {
	if (/^#{1,6} /.test(element)) {
		return 'heading';
	} else if (/^    /.test(element)) {
		return 'codeBlock';
	} else if (/^\*   /.test(element)) {
		return 'codeBlock';
	} else if (/^- /.test(element)) {
		return 'ul';
	} else if (/^[0-9]+\. /.test(element)) {
		return 'ol';
	} else if (/^> /.test(element)) {
		return 'blockquote';
	} else if (/^\s*</.test(element)) {
		return 'html';
	} else {
		return 'paragraph';
	}
}

function handle(element) {
	return handlers[type(element)](element);
}

function li(item) {
	var content = item.replace(/^(- |[0-9]+. )/, '');
	return "<li>" + text(content);
}

function ul(element) {
	var separator = /\n- /;
	var result = "<ul>\n";
	element.split(separator).forEach(function(item) {
		result += li(item) + '\n';
	});
	result += "</ul>";
	return result;
}

function ol(element) {
	var separator = /\n(?:[0-9]+)\. /;
	var first = element.match(/^([0-9]+)\. /)[1];
	if (first == 1) {
		var result = "<ol>\n";
	} else {
		var result = "<ol start=" + first + ">\n";
	}

	element.split(separator).forEach(function(item) {
		result += li(item) + '\n';
	});
	result += "</ol>";
	return result;
}

var handlers = {
	paragraph: function(element) {
		return "<p>" + text(element);
	},
	heading: function(element) {
		var form = /^(#{1,6}) ([^]*)$/;
		var match = element.match(form);
		var level = match[1].length;
		var content = text(match[2]);
		return "<h" + level + ">" + content + "</h" + level + ">";
	},
	codeBlock: function(element) {
		var lines = element.split('\n');
		function deindent(line) {
			var form = /^(\*| )   (.*)$/;
			var match = line.match(form);
			if (!match) {
				return escape(line);
			}
			if (match[1] == '*') {
				return "<b>" + escape(match[2]) + "</b>";
			} else {
				return escape(match[2]);
			}
		}
		var content = lines.map(deindent).join('\n');

		return "<pre class=code>" + content + "</pre>";
	},
	ul: function(element) {
		return ul(element);
	},
	ol: function(element) {
		return ol(element);
	},
	html: function(element) {
		return element;
	},
	blockquote: function(element) {
		var stripped = element.replace(/^>( |$)/gm, '');
		return "<blockquote>" + mk(stripped) + "</blockquote>";
	}
};

function joinCodeBlocks(parts) {
	var result = [];
	for (var i = 0, len = parts.length; i < len; i++) {
		var part = parts[i];
		if (result.length) {
			prevIdx = result.length - 1;
			if (type(part) == 'codeBlock' && type(result[prevIdx]) == 'codeBlock') {
				result[prevIdx] += '\n    \n' + part;
				continue;
			} 
		}
		result.push(part);
	}
	return result;
}

function handleAll(parts) {
	return parts.map(handle);
}

function joinParts(parts) {
	return parts.join('\n') + '\n';
}

var topLevelFilters = [
	trim,
	untabify,
	split,
	joinCodeBlocks,
	handleAll,
	joinParts
]

// TODO - replace 'phase' with 'filter' or similar more suitable
//
function mk(text) {
	result = text;

	topLevelFilters.forEach(function(filter) {
		result = filter(result);
	});

	return result;
}

mk.trim = trim;
mk.untabify = untabify;
mk.split = split;
mk.type = type;
mk.handle = handle;
mk.escape = escape;
mk.escapeCode = escapeCode;
mk.textWithHtml = textWithHtml;
mk.text = text;
mk.codify = codify;
mk.italicize = italicize;
mk.boldify = boldify;
mk.linkify = linkify;
mk.dashify = dashify;

module.exports = mk;

