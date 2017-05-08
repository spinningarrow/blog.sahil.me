---
layout: post
date: 2017-05-08T02:17:55+0800
title: Simple web services and Java
category: computing
---

Monday night a few weeks ago found me mashing my keyboard in frustration. I had
spent most of the day trying to figure out how to build a dead simple web
service in Java. I knew how to do it [in Node.js][express], [in Python][flask],
[in Ruby][sinatra], [in Go][go-mux], and [in Clojure][ring]. I even knew how to
write a complex API using gRPC and Protocol buffers in Java. A simple web API,
however, was proving to be a different story altogether.

I wanted something similar to the libraries in the aforementioned languages –
the ability to define an API of simple routes and their corresponding handlers,
no extraneous framework-y fluff.

The following recounts how it went.

***

An initial Google search leads me to [Jersey][]. I vaguely remember it from my
last job as something the backend devs kept saying they were in the middle of
migrating; nevertheless, I click through to the home page, and open up a few
tutorials alongside for good measure.

The _Getting Started_ guide mentions a whole bunch of things: "maven
archetypes" (I'm using Gradle, so I'm not sure what that maps to), a "Grizzly
container"… okay, looks like I need to write some classes and annotate them. A
little verbose, but it could work. Let me check on StackOverflow on how to set
this up with Gradle. Ah, so that's the dependency I need! Now how do I fire up
the server? Oh, I need a config file.  Wait, XML to configure the server?!
Nope. Nuh-uh.

The next thing that catches my eye is [Spring Boot][], having heard it
mentioned by nearly every Java developer I know. Their home page tells me that
it is "designed to get you up and running as quickly as possible". Sounds good.
Their "quick start" clearly mentions the dependency need for Gradle. The
example looks too much like the one from Jersey though, and the bad taste left
in my mouth by that still lingers. I'll pass for now.

[DropWizard][] is another name that comes by; let's see what that feels like.
The home page describes itself as a "stable, light-weight package that lets you
focus on getting things done." I do, indeed, have things that need getting
done, so let's take a look!

The guide declaims their love for all things Maven. It's not too hard to
convert a single Maven-style dependency into a Gradle one, so I plough on. I
need a "configuration class" it appears. Once again, annotations abound. Then I
also need an "application class". And a "representation class". And a "resource
class", which is the "meat and potatoes" of the application, you say?

Arghhh.

I'm this close to giving up. Is it really that difficult to elegantly expose
one single endpoint in Java without wanting to kill myself?

Almost at the end of my patience, I decide to Google just that. Lo and behold,
[there's a Quora question with that exact sentiment][quora-link] (probably not
that surprising in retrospect). Normally I avoid Quora as much as possible
because of their dark UX habits but the title sums up my state of mind with
such precision that I can't resist.

All the usual suspects are present. I skim past them. Somewhere near the bottom
is a link without a description – [Spark Framework][]. Hoping that it has
nothing to do with [the data processing engine][apache-spark] (since I don't
think that can solve the problem at hand), I click through.

There is a nice big example right on top:

```java
import static spark.Spark.*;

public class HelloWorld {
    public static void main(String[] args) {
        get("/hello", (req, res) -> "Hello World");
    }
}
```

It's five lines, has a simple handler without annotations, and even uses Java 8
lambda-style functions! I think I'm going to cry tears of joy!

Less than five minutes later, I have my simple web service up and running.

***

And _that_ sums up my adventures with writing a web service in Java.

[express]: https://expressjs.com/
[flask]: http://flask.pocoo.org/
[sinatra]: http://www.sinatrarb.com/
[go-mux]: https://golang.org/pkg/net/http/#example_ServeMux_Handle
[ring]: https://github.com/ring-clojure/ring
[Jersey]: https://jersey.java.net/
[Spring Boot]: https://projects.spring.io/spring-boot/
[DropWizard]: http://www.dropwizard.io/
[quora-link]: https://www.quora.com/How-can-I-write-a-small-Java-REST-API-without-killing-myself
[Spark Framework]: http://sparkjava.com/
[apache-spark]: http://spark.apache.org/
