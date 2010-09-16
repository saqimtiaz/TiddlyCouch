function(head, req) {
	var db = req.info.db_name;
	var host = req.headers.Host;
	var row;
	var tiddlers = [];
	
	while(row = getRow()) {
		var tiddler = {};
		var r = row.value;

		var map = function(oldkey,newkey) {
			if(r[oldkey])
				tiddler[newkey] = r[oldkey];
		}

		map("title","title");
		if (req.query && req.query.key) //not foolproof - we only want to include the tiddler text in the response when fetching a single tiddler as json
			map("text","text");
		map("tags","tags");
		map("created","created");
		map("modified","modified");
		map("modifier","modifier");
		map("creator","creator");
		map("_rev","revision");
		map("_id","id");
		map("fields","fields");
		tiddler.host = host;
		tiddler.workspace = db;
		tiddlers.push(tiddler);
	}
	return toJSON(tiddlers);

}

