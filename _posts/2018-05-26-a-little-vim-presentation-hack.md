---
layout: post
date: 2018-05-26T09:40:41+0800
title: A little Vim presentation hack
category: computing
---

At the last Clojure meetup, I gave a talk about shell scripting in
ClojureScript. The talk was mostly based on my last blog post and consisted of
showing Planck's various features and talking about them.

I thought a lot about how to seamlessly do this. Most of my presentation-style
talks use Keynote, but that wasn't a good fit because most of what I wanted to
show was code and execute it in Planck, with minimal text.

I came across mdp, which is a nice command line tool for markdown-based
presentations.

------- (Getting too long)

Here's what it looked like:

(animated gif)

There are no plugins used. Here's what I did:

- The slides are a cljs file (for syntax highlighting) Every "slide" is
- sections of the same file separated by loads of newlines (enough that the
- next slide doesn't show on the screen at the same time).  Every slide starts
- with a title in comments Navigating between slides uses Vim's built in search
- functionality to search for the next comment. It looks for comments preceded
- by two newlines..  Disabling search highlighting "Previous" and "Next" slide
- Modeline to disable line numbers for the slides but keep them when navigating
- to other files
