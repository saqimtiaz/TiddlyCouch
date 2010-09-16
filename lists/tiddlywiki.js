function(head, req) {

var Mustache = require("vendor/couchapp/lib/mustache");

var ddoc = this;
var templates = ddoc.templates;
var tiddler = "{{#tiddlers}}" + templates.tiddlywiki.tiddler + "{{/tiddlers}}";

provides("html", function() {
	//start(headers); // TODO
	var row, tiddlers = [];
	while(row = getRow()) {
		row.value.tags = "[[" + row.value.tags.join("]] [[") + "]]"; // XXX: hacky
		tiddlers.push(row.value);
	}
	tiddlers = Mustache.to_html(tiddler, { tiddlers: tiddlers });
	return templates.tiddlywiki.empty.replace('<div id="storeArea">',
		'<div id="storeArea">\n' + tiddlers);
});

}
