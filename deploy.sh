#!/usr/bin/env sh

set -e

url="$*"

./js2tiddler "http://svn.tiddlywiki.org/Trunk/association/plugins/ServerSideSavingPlugin.js" \
	> fixtures/ServerSideSavingPlugin.json
./js2tiddler "http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js" \
	> fixtures/jquery-json.json
./js2tiddler plugins/adaptor.js > fixtures/adaptor.json

couchapp pushdocs fixtures $url

couchapp push $url
