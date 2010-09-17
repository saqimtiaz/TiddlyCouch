/***
|''Name''|CouchdbConfig|
|''Description''|configuration settings for Couchdb - based on TiddlyWebConfig|
|''Author''|Saq & FND|
|''Version''|0.1|
|''Status''|experimental|
|''License''|[[BSD|http://www.opensource.org/licenses/bsd-license.php]]|
|''Requires''|CouchdbAdaptor ServerSideSavingPlugin|
|''Keywords''|serverSide couchdb|
!Code
***/

//{{{
(function($) {

if(!config.extensions.ServerSideSavingPlugin) {
	throw "Missing dependency: ServerSideSavingPlugin";
}
if(!config.adaptors.couchdb) {
	throw "Missing dependency: CouchdbAdaptor";
}

if(window.location.protocol != "file:") {
	config.options.chkAutoSave = true;
}

var plugin = config.extensions.couchdb = {
	host: tiddler.fields["server.host"].replace(/\/$/, ""),
};

config.defaultCustomFields = {
	"server.type": tiddler.getServerType(),
	"server.host": plugin.host,
	"server.workspace": tiddler.fields["server.workspace"]
};

})(jQuery);
//}}}
