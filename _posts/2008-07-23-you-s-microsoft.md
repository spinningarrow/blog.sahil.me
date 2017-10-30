---
layout: post
date: 2008-07-23T20:41:00+05:30
title: This is what happens when you regularly update Windows
category: computing
---

I'm not, [UPDATE: Oops ... I meant to say 'unlike' and not 'like'. Silly me.] <del>like</del> unlike many people I know, some kind of anti-Microsoft person (in general). But stuff like this (almost) makes me flip over to the Other Side.

So for six days - six *whole* flaming days, I was cut off from the internet. Millions of tantrums and endless tries at MTNL's 1504 service (which, let me tell you, does *not* work) later; after being given all kinds of (untrue) reasons why the net wasn't working, finally managing to get through to an SDO (who was of no use whatsoever), buggering Dad to no end, tearing my hair out and generally feeling totally ticked off, I finally managed to hit the problem on its abominable head.

Yesterday, while wallowing in despair (this was after my talk with the aforementioned SDO) I, on a whim, decided to turn my firewall off. And guess what? Oh joy, the net worked! [That moment in time, by the way, now ranks at the top of my Most Irritating Moments That Make Me Feel Like Frying My Brain list. The fact that that's partly because nothing else comes to mind right now is, of course, another story.]

Anyway, this was - from one point of view - an extremely relieving thing, but on the other hand (for those who know what a firewall is) it was way off the wall. I mean, what the heck, a firewall is supposed to protect your computer from being attacked - it's not supposed to get over-excited and *prevent* you from accessing the net at all! Doubtfully wondering if my firewall had indeed gone bonkers (I've had ZoneAlarm Firewall for quite some time now and it's not like I'd changed any settings recently) I did a quick Google search. I found out (from [ZoneAlarm's website][1]) that those *eejits* who designed my OS were Behind It All. Apparently, Microsoft recently released an update for Windows XP (I naturally update my Windows regularly) which prevented people using ZoneAlarm from accessing the net ... ! Flaming weirdos.

The miscreant in question is Microsoft Update KB951748. If you're facing the same problem, you'll need to disable your firewall and [download the latest version of ZoneAlarm][2]. On the other hand, if your net really isn't working, I'm not sure you'll be reading this at all :).

More soon. Right now I have to go and read the "1000+" unread items sitting in [my feed reader][3]. Ciao for now (wow, that rhymes).

UPDATE: Just to clarify, I was *not* using the built-in Windows firewall - I was using ZoneAlarm Firewall. The Windows Firewall is a miserable excuse for a software program.

[1]: http://forums.zonealarm.org/zonelabs/
[2]: http://download.zonealarm.com/bin/free/pressReleases/2008/LossOfInternetAccessIssue.html
[3]: http://google.com/reader
