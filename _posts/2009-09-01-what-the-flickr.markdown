---
title: "What the flickr?!"
subtitle: Making a game out of words and images
layout: post
---
I have once again delved into the world of imagery, and conjured up a interesting project combining <a title="Google App Engine" href="http://code.google.com/appengine/">Google App Engine</a>, <a title="Django" href="http://www.djangoproject.com/">Django</a>, <a title="Python" href="http://www.python.org/">Python</a>, <a href="http://code.google.com/p/flickrpy/">FlickrPy</a> and <a title="Flickr" href="http://www.flickr.com/">Flickr</a>.  The project's idea is that with Flickr's huge resource of images one should be able to create a game similar to <a title="pictionary" href="http://en.wikipedia.org/wiki/Pictionary">pictionary</a>, with the player guessing and Flickr "drawing".  My attempt at making this game is called **What the Flickr?!**

### That sounds easy!
Well your wrong.  Unfortunately, playing **What the Flickr?!** is difficult due to the Flickr search engine being based on crowd-sourcing.  Since all of their terms are user-generated, some search terms come up with completely unrelated results.  Thus my first order of business was to figure out a way of getting around this problem.

Unfortunately I haven't found it yet.  So I thought about other methods of making the game easier, and the one I came up with was to make a extremely targeted word list.  I wanted words which were commonly used.  After scouring the interwebs I found <a title="Ryota's word list" href="http://www2.educ.fukushima-u.ac.jp/~ryota/word-list.html" target="_blank">this site</a>.  I grabbed all the words except for the "operations" column and plugged it into the Google datastore.

### So what happened next?
A bunch of coding, then no coding for awhile followed by a bunch more coding.  Essentially I completed the whole site in about 3 hours broken up into three sessions.  Not bad for someone who has only done the Django tutorial.

The reason why I am failing at doing a nice code breakdown is for a couple reasons.  First, I am keeping the code internal for now because I have some different plans for it as well as it being pretty unfinished.  Second, I am completely exhausted and sick.  If you have a problem, bite me.

### So, can I play?
Of course!  That is the reason I made this post (and to fulfill my 1 project a month goal).  <a title="What the Flickr?!" href="http://whattheflickr.appspot.com">You can play the game here</a>.

Have fun, and hopefully next month I will have something a bit more interesting!
