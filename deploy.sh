#!/usr/bin/env sh

set -e

url="$*"

./js2tiddler plugins/adaptor.js > fixtures/adaptor.json
couchapp pushdocs fixtures $url

couchapp push $url
