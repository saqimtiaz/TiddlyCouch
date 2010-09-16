(function($) {

var saveTiddler = function() {
	$.couch.db("tiddlydb").saveDoc({
		_id: "XXX",
		tags: ["foo", "bar"]
	}, {
		success: function(id, ok, rev) {
			console.log("success", this, arguments);
		},
		error: function(id, ok, rev) {
			console.log("error", this, arguments);
		}
	});
};

if($.couch) {
	saveTiddler();
} else {
	$.getScript("/_utils/script/jquery.couch.js", saveTiddler);
}

})(jQuery);
