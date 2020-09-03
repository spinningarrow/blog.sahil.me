.PHONY: start build post date categories

start:
	jekyll serve

build:
	jekyll build

post:
	_scripts/new-post

date:
	@@ date +%FT%T%z

categories:
	egrep  'category: ' _posts/* | cut -d ':' -f3 | sort -u
