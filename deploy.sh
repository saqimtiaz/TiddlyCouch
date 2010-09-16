#!/usr/bin/env sh

set -e

url="$*"

curl -s "http://svn.tiddlywiki.org/Trunk/association/plugins/ServerSideSavingPlugin.js" | \
	./js2tiddler > fixtures/ServerSideSavingPlugin.json

./js2tiddler plugins/adaptor.js > fixtures/adaptor.json
couchapp pushdocs fixtures $url

couchapp push $url
