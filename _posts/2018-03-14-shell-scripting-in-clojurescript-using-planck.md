---
layout: post
date: 2018-03-28:38:45+0800
title: Shell Scripting in ClojureScript using Planck
category: computing
---

Even though I've been playing with Clojure for a really long time, I realised I
don’t feel entirely as comfortable with it because of never having used it in a
proper project. Clojure’s still pretty niche when it comes to taking over the
programming world, especially in the conservative confines of the Singapore
enterprise space. My recent side projects have also mostly been of the tiny
frontend app variety, for which Clojure[Script] wasn't a great fit.

I do a fair bit of shell-scripting though — mostly for data munging for the
aforementioned side projects. While I quite enjoy working with shell scripts,
dealing with structured data (usually JSON) with Unix tools isn't too pleasant.
I’m a fan of jq but it defines its own DSL, which I've never found very
intuitive except for simple tasks.

In looking for a chance do use more Clojure for Real Stuff &trade;, I thought why
not try it out for those shell scripts? Clojure, has a fantastic standard
library of functions for data transformation so I recently began to look at
using Clojure for writing those scripts. The startup time for Clojure is
notoriously prohibitive (I’m trying to replace shell scripts after all), but I
had some fun playing around with the Planck REPL, and decided to take that for
a spin. Turns out that it’s actually has really good support for writing shell
scripts I've been so happy with it that I've started converting some more
gnarly scripts to use Planck + ClojureScript.

Here are some of the useful tools Planck provides for dealing with some of the
tasks I commonly use shell scripts for:

#### Shebang-support

Not surprisingly, Planck supports the shebang.

```shell
#!/usr/bin/env planck
```

and a `chmod +x script.cljs` and you can invoke it with `./script.cljs`.

#### Invoking shell commands with sh

Planck can easily execute shell tools and return the result using the `sh`
function.

```clojure
(require '[planck.something :refer sh])

(sh "ls -al")
```

It returns a map containing the exit code and...

```clojure
{:thing 1
 :thing-2 :hi}
```

#### Reading files

Unlike Clojure, ClojureScript doesn't have the `slurp` builtin, since it
was originally aimed at running in browsers. Planck however includes
`slurp` in the `planck.core` namespace. To use it in a script, it can be
required like so:

```clojure
(require '[planck.core :refer slurp])

(slurp "path/to/myfile")
```

#### Bonus: fetching web pages with slurp

While `sh` allows you to use `curl` or any other tool to fetch URLs, an easy
way to `GET` remote resources is with `slurp`. Just give it a URL and it'll
return the response body as a string.

```clojure
(slurp "https://myremoteresourc.es/data.json")
```

#### Reading from standard input

I love the pipeline nature of Unix command line tools and try to write scripts
that would fit in such a pipeline (i.e. reading from standard input and writing
to standard output/standard error) as far as possible, which allows for much
nicer composition JSON manipulation with all of the Clojure standard library
goodness.

```clojure
(require '[planck.sh :refer *in*])

(pr (str "Hello from Planck! You said: " *in*)
```

If you save this as `script.cljs` and make it executable, it'll read whatever
is piped in and then print it back out. For example:

```shell
echo "whoa!" | ./echo.cljs
```

will print `Hello from Planck! You said: whoa!` on the terminal.

#### JSON parsing and serialisation

This is where Planck being a Clojure_Script_ REPL actually helps a lot -- you
don't need an external module to parse and serialise JSON! Just use the good
old `JSON.parse` and `JSON.stringify` from JS-land.

```clojure
;; result: #js [1 2 3 4]
(JSON.parse "[1, 2, 3, 4]")

;; result: "[1,2,3,4]"
(JSON.stringify #js [1 2 3 4])
```

#### Converting JS objects to Clojure data structures

You may have noticed the `#js`-tagged results in the previous example. We don't
want to deal with those! We want to be able to use all of the lovely Clojure
vector and map manipulation functions in our scripts. Luckily, ClojureScript
comes with two aptly-named helpers for just that.

```clojure
; js->clj converts JS objects to equivalent Clojure ones

;; result: [1 2 3 4]
(js->clj #js [1 2 3 4])

;; result: {"x" 1, "y" 2}
(js->clj #js {:x 1, :y 2})

;; keywordizing map keys is super useful
;; result: {:x 1, :y 2}
(js->clj #js {:x 1, :y 2} :keywordize-keys true)

; clj->js works similarly, but in the opposite direction

;; result: #js [1, 2, 3, 4]
(clj->js [1 2 3 4])
```

#### Threading macro wins

A nice thing about Unix tools is being able to transform data by successively
piping it through various tools. Threading macro emulates this pattern, and I
do most of my manipulations this way

```clojure
;; instead of
(select-keys
  (js->clj
    (JSON.parse (slurp "data.json"))
    :keywordize-keys true)
  [:x :y])

;; try the more Unix-y
(-> "data.json"
    slurp
    JSON.parse
    (js->clj :keywordize-keys true)
    (select-keys [:x :y]))
```

It reads a lot better, making it much easier to visualise the data
transformations, and is also more consistent with how you'd pipe the data
through various Unix tools.

#### Example script that does stuff

Here's a script that reads in some JSON input from `stdin`, and does stuff

That's it! If you liked this, check Planck's other useful features here.
