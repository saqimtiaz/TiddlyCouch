function(head, req) {

var Mustache = require("vendor/couchapp/lib/mustache");
var db = req.info.db_name;
var host = req.headers.Host;

var ddoc = this;
var templates = ddoc.templates;
var tiddler = "{{#tiddlers}}" + templates.tiddlywiki.tiddler + "{{/tiddlers}}";

provides("html", function() {
	//start(headers); // TODO
	var row, tiddlers = [];
	while(row = getRow()) {
		row.value.tags = "[[" + row.value.tags.join("]] [[") + "]]"; // XXX: hacky
		row.value.text = row.value.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		tiddlers.push(row.value);
	}
	tiddlers = Mustache.to_html(tiddler, { tiddlers: tiddlers, db: db, host: host });
	return templates.tiddlywiki.empty.replace('<div id="storeArea">',
		'<div id="storeArea">\n' + tiddlers);
});

}
