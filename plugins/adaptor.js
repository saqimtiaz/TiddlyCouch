(function($) {
var saveTiddler=function(tiddler){
    $.couch.db("tiddlydb").saveDoc(tiddler,{
        success:function(resp){
            console.log("success",this,arguments);
            tiddler.fields["id"] = resp.id;
            tiddler.fields["rev"] = resp.rev;
        },
        error: function(resp){
            console.log("error",this,arguments);}
    })
};
if($.couch) {
	saveTiddler(store.getTiddler("Foo"));
} else {
	$.getScript("/_utils/script/jquery.couch.js", saveTiddler(store.getTiddler("Foo")));
}
})(jQuery);
