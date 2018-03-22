.PHONY: start build post date photos categories

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

categories:
	egrep  'category: ' _posts/* | cut -d ':' -f3 | sort -u
