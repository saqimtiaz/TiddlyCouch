/***
|''Name''|CouchDBAdaptor|
|''Description''|adaptor for interacting with CouchDB|
|''Author:''|FND|
|''Version''|0.1.0|
|''Status''|@@experimental@@|
|''Source''|[TBD]|
|''CodeRepository''|[TBD]|
|''License''|[[BSD|http://www.opensource.org/licenses/bsd-license.php]]|
|''CoreVersion''|2.5|
|''Keywords''|serverSide CouchDB|
!Code
***/
//{{{
(function($) {

var adaptor = config.adaptors.couchdb = function() {};
adaptor.prototype = new AdaptorBase();

adaptor.serverType = "couchdb";
adaptor.serverLabel = "CouchDB";
adaptor.mimeType = "application/json";

adaptor.prototype.putTiddler = function(tiddler, context, userParams, callback) {
	context = this.setContext(context, userParams, callback);
	context.title = tiddler.title;
	context.tiddler = tiddler;
	context.host = context.host || this.fullHostName(tiddler.fields["server.host"]);
	context.workspace = context.workspace || tiddler.fields["server.workspace"];

	var payload = {
		type: tiddler.fields["server.content-type"] || null,
		text: tiddler.text,
		tags: tiddler.tags,
		fields: $.extend({}, tiddler.fields)
	};
	delete payload.fields.changecount;
	$.each(payload.fields, function(key, value) {
		if(key.indexOf("server.") == 0) {
			delete payload.fields[key];
		}
	});

	var options = {
		url: context.host + "/" + encodeURIComponent(workspace),
		type: null,
		contentType: adaptor.mimeType,
		data: $.toJSON(payload),
		success: function(data, status, xhr) {
			context.responseData = responseData;
			adaptor.putTiddlerCallback(xhr.status, context,
				xhr.responseText, uri, xhr);
		},
		error: function(xhr, error, exc) {
			adaptor.putTiddlerCallback(xhr.status, context,
				xhr.responseText, uri, xhr);
		}
	};
	var id = tiddler.fields["server.id"];
	if(id) {
		options.url += "/" + id;
		options.type = "PUT";
	} else {
		options.type = "POST";
	}
	return $.ajax(options);
};

adaptor.putTiddlerCallback = function(status, context, responseText, uri, xhr) {
	context.status = [201, 202].contains(xhr.status);
	context.statusText = xhr.statusText;
	context.httpStatus = xhr.status;
	if(context.responseData) {
		context.tiddler.fields["server.id"] = context.responseData.id;
	}
	if(context.callback) {
		context.callback(context, context.userParams);
	}
};

})(jQuery);
//}}}
