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
	var fields = tiddler.fields;
	context = this.setContext(context, userParams, callback);
	context.title = tiddler.title;
	context.tiddler = tiddler;
	context.host = context.host || this.fullHostName(fields["server.host"]);
	context.workspace = context.workspace || fields["server.workspace"];
	var payload = {
		type: fields["server.content-type"] || null,
		title: tiddler.title,
		modified: tiddler.modified? tiddler.modified.convertToYYYYMMDDHHMM() : '',
		created: tiddler.created? tiddler.created.convertToYYYYMMDDHHMM() : '',
		creator: tiddler.creator,
		modifier: tiddler.modifier,
		text: tiddler.text,
		tags: tiddler.tags,
		fields: $.extend({}, fields)
	};
	if(tiddler.created) {
		payload.created = tiddler.created;
	}
	if(tiddler.creator) {
		payload.creator = tiddler.creator;
	}
	delete payload.fields.changecount;
	$.each(payload.fields, function(key, value) {
		if(key.indexOf("server.") == 0) {
			delete payload.fields[key];
		}
	});

	var options = {
		url: context.host + "/" + encodeURIComponent(context.workspace),
		type: null,
		contentType: adaptor.mimeType,
		data: $.toJSON(payload),
		success: function(data, status, xhr) {
			context.responseData = data;
			adaptor.putTiddlerCallback(xhr.status, context,
				xhr.responseText, options.url, xhr);
		},
		error: function(xhr, error, exc) {
			adaptor.putTiddlerCallback(xhr.status, context,
				xhr.responseText, options.url, xhr);
		}
	};
	var id = fields["server.id"];
	if(id) {
		options.url += "/" + id;
		options.type = "PUT";
		payload._id = fields["server.id"];
		payload._rev = fields["server.page.revision"];
		options.data = $.toJSON(payload);
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
		var fields = context.tiddler.fields;
		fields["server.id"] = context.responseData.id;
		fields["server.page.revision"] = context.responseData.rev;
	}
	if(context.callback) {
		context.callback(context, context.userParams);
	}
};

})(jQuery);
//}}}
