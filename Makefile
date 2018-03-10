.PHONY: start build post date photos

start:
	jekyll serve

build:
	jekyll build

post:
	_scripts/new-post

date:
	@@ date +%FT%T%z

photos:
	_scripts/photos.cljs | jq .
