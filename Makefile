.PHONY: up build post date

up:
	jekyll serve

build:
	jekyll build

post:
	_scripts/new-post

date:
	@@ date +%FT%T%z
