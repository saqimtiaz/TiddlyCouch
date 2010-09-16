function(doc) {
	if(doc.title && doc.text) {
		emit(doc.title, doc);
	}
}
