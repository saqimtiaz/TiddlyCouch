#!/usr/bin/env sh

set -e

url="$*"

couchapp pushdocs fixtures $url
couchapp push $url
