---
title: "FlickrFortune"
subtitle: "Get a picture with your fortune."
layout: post
---
{% include md_helpers.md %}

This post is **out of date**.  It is only here for posterity.
{:note}

Ah the sweet smell of Python in the morning.  It's true, I have fallen for the sweet embrace which Python offers; the easy to read coding style, the amazing documentation system, django, all of it.  It speaks to me like no other language has.  I would like to start this post by quoting directly from the Python Interactive Shell:

{% highlight python %}
  >>> import this
  The Zen of Python, by Tim Peters

  Beautiful is better than ugly.
  Explicit is better than implicit.
  Simple is better than complex.
  Complex is better than complicated.
  Flat is better than nested.
  Sparse is better than dense.
  Readability counts.
  Special cases aren't special enough to break the rules.
  Although practicality beats purity.
  Errors should never pass silently.
  Unless explicitly silenced.
  In the face of ambiguity, refuse the temptation to guess.
  There should be one-- and preferably only one --obvious way to do it.
  Although that way may not be obvious at first unless you're Dutch.
  Now is better than never.
  Although never is often better than *right* now.
  If the implementation is hard to explain, it's a bad idea.
  If the implementation is easy to explain, it may be a good idea.
  Namespaces are one honking great idea -- let's do more of those!
{% endhighlight %}

Moving on.

### FlickrWhat?
FlickrFortune is the product of my imagination.  I wanted to create an innovative way of twisting together the massive power of the <a title="Flickr API" href="http://www.flickr.com/services/api/">FlickrAPI</a> and the often overlooked insight of fortune.  Fortune is a program included on most Unix operating systems that retrieves a random fortune cookie or quote from a database included with the program. You can read more here: <a title="Fortune" href="http://en.wikipedia.org/wiki/Fortune_%28Unix%29">Fortune</a>.  FlickrFortune is implemented as a Python script which accesses the FlickrAPI using <a title="Beej's Python module" href="http://stuvel.eu/projects/flickrapi">Beej's Python module</a> after extracting the largest word in a random fortune (from the fortune program).  That's the gist of it.

### First some "live-coding"
If you want to follow along with the following code you will need the FlickrAPI for python referenced above, a flickr API key, and the fortune program included on most linux/unix systems.  Also Python 2.5.2 would be helpful.

Disclaimer: I will try to explain some of the flickr/fortune related concepts, but you're on your own when it comes to the Python.  Also the next couple code snippets are all in a single Python Interactive Shell, thus imports are at the top.
{:note}

{% highlight python lineno %}
>>> import flickrapi
>>> import os
>>> pipe = os.popen("fortune -s")
>>> fortune = pipe.read()
>>> pipe.close()
>>> fortune
'Among the lucky, you are the chosen one.'
>>>
{% endhighlight %}

So what's happened.  In line 3 we create a pipe connected to "fortune -s"; the flag specifies "short fortunes".  In line 4 we grab the output of the fortune pipe and store it for later.  So far so good.

{% highlight python lineno %}
>>> apikey = "YOUR API KEY HERE"
>>> flickr = flickrapi.FlickrAPI(apikey)
>>> tag = "chosen"    # Put the biggest word in the fortune here
>>> photos = flickr.photos_search(tags=tag,sort="relevance",per_page="1")
>>> photos.attrib['stat']    # Ensure photo was found
'ok'
>>> photo = photos.find('photos').findall('photo')[0]
>>> photoURLFormat = "http://farm%s.static.flickr.com/%s/%s_%s_b.jpg"
>>> photoURL = photoURLFormat % (photo.attrib['farm'],
             photo.attrib['server'],photo.attrib['id'],photo.attrib['secret'])
>>> photoURL
'http://farm1.static.flickr.com/9/12379604_20464c804d_b.jpg'
>>>
{% endhighlight %}

What does the above code do?  Well, first we initialize a flickrapi object (line: 2), which is followed by using said object to search flickr (line: 4).  If line 5 doesn't return "ok" then search Flickr using a different tag.  On line 6 we get a list of photos returned by the search and choose the first one (there should only be one because we specified "per_page="1"").  Finally after running the various attributes of the photo through the string formatter we have the url.

So there you have it.  We are practically done.  Just need to wrap all of the above into a script and then...  Oh, right, image manipulation.  The essence of image manipulation is that it's easier to do when you are not working in the interpreter, so let's start laying out the script!

### Round 1

In the design process of round one I just had a basic program in mind.

1. Get the fortune
2. Get the tag
3. Get the flickrImage
4. Make the wallpaper
5. Update the desktop background

As this was satisfactory, I started programming.

### A couple hours later

Now don't get me wrong: this should not take a couple hours.  However, this is the first program I have written in Python and thus I spent awhile understanding how to use the FlickrAPI as well as debugging my python code.  Unfortunately, since I wrote this program before I decided to create this website, I am unable to show you code revisions at each step, so instead I'll go over some things I ran into.

#### The PIL
The PIL is the [Python Imaging Library](http://www.pythonware.com/products/pil/) which adds a ton of image related operations to the already huge Python feature set.  Here is how I used it:

{% highlight python lineno %}
from PIL import Image
import ImageDraw
import ImageFont

def createWallpaper(flickrImage, fortune, prefix):
    wallpaper = Image.new("RGB", wallpaperSize, "black")
    draw = ImageDraw.Draw(wallpaper)

    flickrImage = Image.open(localDir + flickrImage)
    x,y = flickrImage.size

    x0 = (wallpaperSize[0]-x) / 2
    y0 = (wallpaperSize[1]-y) / 2

    x1 = x0+x
    y1 = y0+y

    wallpaper.paste(flickrImage, (x0,y0,x1,y1))

    boxMargin = 10

    font = ImageFont.truetype(localDir + "Sugo.ttf", fontsize)
    textSize = draw.textsize(fortune, font=font)
    textTopLeft = (wallpaperSize[0]/2 - textSize[0]/2,
                 wallpaperSize[1]-textSize[1]*4)

    boxTopLeft = (textTopLeft[0]-boxMargin, textTopLeft[1])
    boxBottomRight = (wallpaperSize[0]/2 + textSize[0]/2 + boxMargin,
                    wallpaperSize[1]-textSize[1]*3+boxMargin)

    draw.rectangle([boxTopLeft, boxBottomRight], fill="white")

    draw.text(textTopLeft, fortune, font=font, fill="black")

    del draw

    filename = wallpaperDir + prefix+"_"+wallpaperPrefix+".jpg"
    wallpaper.save(filename, "JPEG")
    return filename
{% endhighlight %}

It should be quite straight forward but for those who want a bit of a breakdown here it is:

* Make a new blank image
* Create a draw object which provides various image-manipulation operations
* Open the previously downloaded Flickr image
* "Paste" the Flickr image into the center of the wallpaper
* The next 11 lines create a font instance using the Sugo font, calculate its position, draw a white box and finally draw the fortune.
* Finally we save and return the file name of the new wallpaper

Simple as pie.  I realize that the above code is heavily unoptimized, however this will be fixed in version two (discussed later).

#### Downloading and saving the Flickr image

{% highlight python lineno %}
import urllib2

def getImageData(url):
    try:
        return urllib2.urlopen(url).read()
    except urllib2.URLError:
        print urlib2_URLError
        exit(1)

def saveFlickrImage(imageData, prefix):
    fileName = prefix+"_"+flickrPrefix+".jpg"

    try:
        f = open(localDir + fileName, 'w')
    except IOError:
        print IOError
        exit(1)

    f.write(imageData)
    f.close()

    return fileName
{% endhighlight %}

I love urllib2.  Oh and Python's file handling.  Anyways, this code is extremely self explanatory.  The reason this process was divided into two functions is that I wasn't sure if I needed to use the save function multiple times and so I seperated it.  In the end I only used it once, and thus it might be merged with getImageData in V2.

### Dealing with arguments
At this point you have seen most of the code I used in the final script; the fortune/Flickr accessing part from our Python Interactive Shell experience, and the above two code snippets.  However after I wrote the script I added a couple other simple features which required the usage of program arguments.  These new features were:

* Looping n times (bulk generate wallpapers)
* Add color to the output (using bash shell color codes)
* Only change the desktop background if the -s flag is provided

This of course brings me to one of my favorite modules in Python: getopt.

{% highlight python lineno %}
try:
    opts, args = getopt.getopt(argv, optsString, optsList)
except getopt.GetoptError:
    usage()

for opt, arg in opts:
    if opt in ("-h", "--help"):
        usage()
    elif opt in ('-n', "--number"):
        numWallpapers = int(arg)
    elif opt == '-s':
        updateBackground = True
    elif opt == '-c':
        colors = True
{% endhighlight %}

Wow.  That is way too easy.  I recently implemented my own version of getopt for a class assignment and its a significant amount of code that is a pain to write.  I assume that the getopt module is implemented in c which is another benefit of using python's implementation.

### So whats left?
* [Download Version 1](http://github.com/carlsverre/FlickrFortune/tarball/release_v1)
* [FlickrFortune @ GitHub](http://github.com/carlsverre/FlickrFortune/)

### Next Steps
As I said above in a number of places I am planning on continuing the development of FlickrFortune.  Here are the following changes which will be implemented:

* Make the code smarter, lighter and more optimized.  Specifically the create wallpaper function.
* Create an interface for setting the desktop background so that it can be easily implemented on other systems.
* A smarter searching algorithm which will choose a different tag from the fortune if the first one did not return a usable image (or any image).
* Allow the user to specify a file of fortunes and create a wallpaper for each one
* Give the option to generate wallpapers in multiple sizes
