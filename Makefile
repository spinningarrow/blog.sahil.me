.PHONY: up build post

up:
	jekyll serve

build:
	jekyll build

post:
	_scripts/new-post
