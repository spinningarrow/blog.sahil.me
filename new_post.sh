#!/usr/bin/env bash

echo -n "Post title: "
read post_title

filename=`date +%F`-`echo -n $post_title | \
	tr '[:upper:]' '[:lower:]' | \
	sed s/\ /-/g`.md

cat > _posts/$filename << EOF
---
layout: post
date: `date +%FT%T%z`
title: $post_title
category: ????
---
EOF
