---
layout: post
date: 2018-03-28T10:38:45+0800
title: Shell Scripting in ClojureScript using Planck
category: computing
---

I've been doing a fair bit of shell-scripting recently, mostly data munging for
some of my [side][vinylwhere] [projects][twsg-clinics].  While I quite enjoy
working with command line tools, dealing with structured data (JSON) isn't too
pleasant.  [jq][] is nice but it defines its own DSL, which I've never found
very intuitive except for simple tasks.

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

#### Invoking external shell commands with sh

Planck can easily execute other shell tools and return the results using the
`sh` function.

```clojure
(require '[planck.shell :refer [sh]])

(sh "echo" "hello")
```

It returns a map containing the exit code and the results of `stdout` and
`stderr`.

```clojure
{:exit 0
 :out "hello\n",
 :err ""}
```

Remember to separate the command name from its arguments (i.e. `(sh "ls"
"-al")` instead of `(sh "ls -al")`); otherwise a cryptic "launch path is not
accessible" error is shown.

#### Reading from standard input

In my scripts, I try to read from standard input and write to standard output
as far as possible. This makes it easy to compose multiple shell scripts.

```clojure
(require '[planck.core :refer [*in* slurp]])

(pr (str "Planck says: " (slurp *in*) "!"))
```

Saving this as `script.cljs` and running

```shell
echo -n whoa | planck script.cljs
```

will print `Planck says: whoa!` on the terminal.

#### Passing arguments to the script

If you invoke a script with arguments, all the arguments are stored in
`*command-line-args*`.

```clojure
(pr *command-line-args*)
```

When saved and run as `planck script.cljs time for an argument`, this will
print `("time" "for" "an" "argument")`.

#### Reading files

ClojureScript -- unlike Clojure -- doesn't have the `slurp` builtin since it
mainly targets browser JavaScript. Planck helpfully includes this in the
`planck.core` namespace, which can be used like so:

```clojure
(require '[planck.core :refer [slurp]])

(slurp "path/to/myfile")
```

#### Fetching web pages with slurp

A nice bonus feature of `slurp` is its support for URLs -- just give it a URL
and it'll return the response body as a string.

```clojure
(slurp "https://myresourc.es/data.json")
```

#### JSON parsing and serialisation

This is where Planck being a Clojure<em>Script</em> REPL helps a lot -- you
don't need an external dependency to parse and serialise JSON! Good old
`JSON.parse` and `JSON.stringify` from JS-land are available directly.

```clojure
(JSON.parse "[1, 2, 3, 4]")
;; => #js [1 2 3 4]

(JSON.stringify #js [1 2 3 4])
;; => "[1,2,3,4]"
```

#### Converting JS objects to Clojure data structures

You may have noticed the `#js`-tagged results in the previous example. We don't
want to deal with those! We want to be able to use all of the lovely Clojure
vector and map manipulation functions in our scripts. Luckily, ClojureScript
comes with two aptly-named helpers for just that.

`js->clj` converts JS objects to equivalent Clojure ones:

```clojure
(js->clj #js [1 2 3 4])
;; => [1 2 3 4]

(js->clj #js {:x 1, :y 2})
;; => {"x" 1, "y" 2}

;; keywordizing map keys is super useful
(js->clj #js {:x 1, :y 2} :keywordize-keys true)
;; => {:x 1, :y 2}
```

`clj->js` works similarly, but in the opposite direction:

```clojure
(clj->js [1 2 3 4])
;; => #js [1, 2, 3, 4]
```

#### Using the threading macro

The Clojure threading macro inverts nested function calls to "flatten" them
out. I do most of my manipulations this way.

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

#### Putting it all together

Here's a script that reads in a JSON string, parses it, and returns the sum of
the values of the `"x"` key from every object in the list.

```clojure
#!/usr/bin/env planck

(require '[planck.core :refer [*in* slurp]])

(def in (-> *in*
            slurp
            JSON.parse
            (js->clj :keywordize-keys true)))

(->> in
     (map :x)
     (apply +)
     pr)
```

Save this as `script.cljs` and make it executable using `chmod +x script.cljs`.
Running the following command

```shell
echo '[{"x": 1, "y": 2}, {"x": 3, "y": 4}]' | ./script.cljs
```

should print `4` on the terminal.

That's it! Besides what I've described here, Planck has many more nifty
features -- check them out on the [Planck User Guide][] and give it a spin!

[vinylwhere]: https://github.com/spinningarrow/vinylwhere
[twsg-clinics]: https://github.com/spinningarrow/twsg-clinics-map
[jq]: https://stedolan.github.io/jq/
[Planck User Guide]: http://planck-repl.org/guide.html

