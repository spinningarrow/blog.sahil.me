.PHONY: start build post date

start:
	jekyll serve

build:
	jekyll build

post:
	_scripts/new-post

date:
	@@ date +%FT%T%z
