---
title: "Static Hosting"
subtitle: "Github sprinkles on an App Engine cupcake"
layout: post
draft: true
---
{% include md_helpers.md %}

[Carlsverre.com][carl] has just shifted from [Hostingrails.com][hr] to a combination
of [Github][gh] and [Google App Engine][gae]. The transfer was prompted because
my Hosting Rails account is expiring in 4 days. At first I was just going to renew
but the more I thought about the joyous union of Git commits and appengine pulls,
the more my mind was made up.  So now that I got all the kinks worked out, here is
a short tutorial for those of you who want to do it yourselves.

{% highlight bash %}
$ cd ~/dev
{% endhighlight %}

### DryDrop

[DryDrop][dd] is the key to the whole process. Developed by Antonin Hildebrand,
DryDrop allows anyone to quickly deploy to Google App Engine from a Github repo.
Essentially DryDrop is a Python application which grabs all the files in your
repo, stores them in the Google cloud and serves them on your App Engine URL.
Grab DryDrop from its Github repo like so:

{% highlight bash %}
$ git clone git://github.com/darwin/drydrop.git
{% endhighlight %}

You will also need the Google App Engine SDK which you can get on this page:
[Google App Engine SDK][gaes]

### Getting the right info

To setup DryDrop you will need a bit of info from Github.  Also you will need
a repo setup with some static (preferably html) files committed.

* TODO: get the raw/master url
* TODO: note about jekyll integration later

### Setting up App Engine

The next step is to get your appengine project registered. Login using your
Google account to the [App Engine management console][gaem] and click
**Create an Application**{:highlight}. Once you have created an application
head back to the terminal to upload DryDrop.

Make sure you replace YOURPROJECTNAME and other obvious variables with your own words.
{:note}

{% highlight bash %}
$ cd ~/dev/drydrop
$ rake upload project=$YOURPROJECTNAME
{% endhighlight %}

### Initializing DryDrop

Now that you have uploaded DryDrop its configuration time.  Head to your shiny
new project url (YOURPROJECTNAME.appspot.com) and click **admin section**{:highlight}.
The only setting we will change right now is the **Content Source** which you can find
in the **Settings** tab on the left.

* TODO: Finish initialize drydrop
* TODO: Pictures?
* TODO: Example rakefile
* TODO: Jekyll integration


[hr]: http://hostingrails.com
[gh]: http://github.com
[gae]: http://code.google.com/appengine
[gaem]: http://appengine.google.com
[gaes]: http://code.google.com/appengine/downloads.html
[dd]: http://drydrop.binaryage.com
[jk]: http://jekyllrb.com
