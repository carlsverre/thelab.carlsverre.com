---
title: "Static Hosting"
subtitle: "Github sprinkles on an App Engine cupcake"
layout: post
draft: true
---
{% include md_helpers.md %}

[Carlsverre.com][carl] has just shifted from [Hostingrails.com][hr] to a combination
of [Github][gh] and [Google App Engine][gae]. The transfer was prompted because
my Hosting Rails account expires in 4 days. At first I was just going to renew,
but the more I thought about the joyous union of Git commits and appengine pulls,
the more my mind was made up.  So now that I got all the kinks worked out, here is
a short tutorial for those of you who want to do it yourselves.

{% highlight bash %}
$ cd ~/dev
{% endhighlight %}

### DryDrop

[DryDrop][dd] is the key to the whole process. Developed by Antonin Hildebrand,
DryDrop allows anyone to quickly deploy to Google App Engine from a Github repo.
DryDrop is a Python application which grabs all the files in your repo, stores
them in the Google cloud and serves them on your App Engine URL. Grab DryDrop
from its Github repo like so:

{% highlight bash %}
$ git clone git://github.com/darwin/drydrop.git
{% endhighlight %}

You will also need the Google App Engine SDK which you can get [here][gaes].

### Getting the right info

To follow with this tutorial you will need a Github repo full of static files.
Something similar to my [Carlsverre.com repo][csgh] would be perfect. Once you
have your repo setup you will need to figure out what your raw pulling url is.
A generic raw pulling url looks like this:

> http://github.com/USERNAME/REPONAME/raw/BRANCHNAME

_USERNAME_ and _REPONAME_ should be obvious. Use master for _BRANCHNAME_ unless you
have another branch full of static files. My raw pulling url looks like this:

> http://github.com/carlsverre/carlsverre.github.com/raw/master

To test it out, try navigating to the url followed by the name of a file in
the repo. If you have the url right, the current version of the file in the
specified branch should be returned.

Take a note of your raw pulling url now - we will need it later.

### Setting up App Engine

The next step is to get your appengine project registered. Login using your
Google account to the [App Engine management console][gaem] and click
**Create an Application**{:highlight}. Once you have created an application,
head back to the terminal to upload DryDrop.

Make sure you replace PROJECTNAME and other obvious variables with your own words.
{:note}

{% highlight bash %}
$ cd ~/dev/drydrop
$ rake upload project=$PROJECTNAME
{% endhighlight %}

### Initializing DryDrop

Now that you have uploaded DryDrop, it's configuration time.  Head to your shiny
new project url (PROJECTNAME.appspot.com) and click **admin section**{:highlight}.
The only setting we will change right now is the **Content Source** which you can find
in the **Settings** tab on the left.

![The DryDrop settings tab](/images/statichosting_drydropsettings.jpg)

Click on the pulling from url and change it to the raw pulling url you created
earlier. Woo we are 99% there!

### The last step

All you have left to do is setup a post-commit hook from your Github repo to
your shiny new DryDrop app. Follow these steps and your set:

1.  Go to the Admin section of your Github repo
2.  Click the **Service Hooks**{:highlight} tab
3.  Click **Post-Receive URLs**{:highlight} on the left
4.  Add the following url (with keywords replaced) to your Post-Receive URLS:

> http://YOURGOOGLEAPPNAME.appspot.com/hook/github

### Can I use Jekyll with DryDrop?

A growing number of Github users are using [Jekyll][jk] to create static sites
for their Github projects. I use it to power this blog and am extremely happy
with the result. As for using Jekyll with Drydrop I suggest one of two options:

1.  Create a **\_site.yaml** file in the root of your Github repo which wrangles
    Drydrop into pointing requests in the right direction
2.  Commit Jekyll's output directory into a different branch and point Drydrop
    to that branch rather than your master

I am eventually going to switch to option #2 as I see that as being a cleaner
solution. For reference on how to set up your **\_site.yaml** file you can
check out mine [here][sy].

### Comments? Suggestions?

This is the first tutorial posted on my shiny new Jekyll blog, so I would love
any feedback that you'd care to share. I currently haven't setup a main feedback
system, but it is in the workings. For now you can get in touch with me via
[Twitter][tc].

[hr]: http://hostingrails.com
[gh]: http://github.com
[gae]: http://code.google.com/appengine
[gaem]: http://appengine.google.com
[gaes]: http://code.google.com/appengine/downloads.html
[dd]: http://drydrop.binaryage.com
[jk]: http://jekyllrb.com
[csgh]: http://github.com/carlsverre/carlsverre.github.com
[sy]: http://github.com/carlsverre/thelab.carlsverre.com/blob/master/_site.yaml
[tc]: http://www.twitter.com/carlsverre
