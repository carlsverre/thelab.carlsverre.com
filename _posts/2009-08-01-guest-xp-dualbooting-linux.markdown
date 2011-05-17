---
title: "XP + Linux"
subtitle: "A dual booting nightmare"
layout: post
author: "Kris Koiner"
---
Hello there!  The following post regarding Windows XP, dual booting and Linux has been contributed by my friend Kris Koiner.  It is quite a heavy article, but I believe its a good read.  It is posted here solely in the hope that it will benefit someone somehow sometime... somewhere.

Disclaimer: If you try anything described in the following article and ruin your computer, its not our problem.  If you don't agree with this, then don't read the article.  Thank you.
{:note}

Let me just say that I am really starting to hate the arrogance of Windows XP. I've just spent the last week and a bit trying to get XP to dual-boot with Ubuntu on my main machine. I know what you're thinking: "That's not that hard, I've done that many times." Normally, you'd be right, the process should be relatively simple, however there were a multitude of reasons why this one didn't.

Firstly, the current setup:

* Intel Core 2 Duo E6550 @ 2.33GHz
* Asus P5E-VM HDMI with 6GB OCZ DDR2-800
* 200GB, 320GB, 1000GB SATA drives
* Ubuntu 8.04 LTS 64-bit

The main drives are the 200GB (sda) and the 320GB (sdc); why the 320GB is not sdb I don't know, but it works, so I'm not fixing it. The 1000GB is irrelevant, although crucial in the entire process, but for all intensive purposes, it could have been a flash drive.

The 200GB and 320GB are split into 3 partitions and raided together:

* md1: 100MB: raid1: sda1 & sdc1: /boot
* md2: 140GB: raid0: sda2 + sdc2: /
* md3: 120GB: raid1: sda3 & sdc3: /home

As you can see, there's ~120GB of unused space at the end of the 320GB. The idea is to install Windows XP on the fourth primary partition formatted as NTFS. Seems simple, right? Let's begin.

### Definitions

* **BIOS**:  Basic Input-Output System: the config file for your computer.
* **MBR**:   Master Boot Record: the first 512 bytes of a hard drive, contains
the partition entries, and the boot loader.
* **PBR**:   Partition Boot Record: the first 512 bytes of a partition, contains
boot loader code for the partition.
* **NTLDR**: NT Loader: the windows boot loader.
* **LILO**:  The Linux boot loader, but of course has more features.
* **GRUB**:  Another Linux boot loader, newer than LILO and more popular among
Ubuntu distros.
* **FAT**:   File Allocation Table: an old and outdated file system that works,
so everybody uses it.
* **NTFS**:  New-Technology File System: the Windows preferred file system.
* **PATA**:  Parallel ATA: a drive interface used in the olden days.
* **SATA**:  Serial ATA: PATA's replacement.
* **RAID**:  Redundant Array of Inexpensive Disks: a way of joining multiple disks
for an added benefit, usually speed or redundancy.
* **LBA**:   Logical Block Addressing: a new way of addressing hard drives that allow
up to 2.0TB on a single disk.
* **NIC**:   Network Interface Card.

### Forward
Before you begin reading this lengthy rant about Windows XP, let me apologize for the spelling, grammar, and inconsistencies in this article. I have written it over the course of many days, and each day brought a different perspective to the writing.

This article requires a certain level of computer knowledge. I use quite a few *nix terms, make reference to particular programs, and don't go in to a lot of depth explaining things. If you have installed a dual-boot before and have used the *nix shell, you'll probably be fine. If not, there are hopefully enough analogies and comedic material in here to at least provide some entertainment.

One last thing, I flip between "Windows" and "XP" as if they were the same thing. Also, not everything I say is completely accurate, most things are simplified to keep them short and on-track, if you think it's really bad...  too bad.

For those of you in a hurry, or hoping for a solution to the problem, just skip to the last section.

### Hour 1
For this task, I'll be using a Windows XP Professional SP3 disc. I decided to use this version as it would avoid installing the service packs on top of older versions. So I put the disc in, say goodbye to Linux for a while, reboot, and set the CD to boot in the BIOS.

>Problem 1: Windows disc won't get past the "Setup is inspecting your hardware."

Windows shows the message, then the message goes away, and nothing else comes up; the screen just stays black. Ctrl+Alt+Del to try it again and the same error, so we're already off to a great start.

After some google searching, because after all isn't that always the case: complaining to google to see if anybody else in the world has the same problems as you, I came across something that said that the Windows XP disc boot loader doesn't like SATA drives, so you have to disable them in the BIOS. Okay, we can try that.

>Fix 1: Disable all SATA drives in the BIOS.

This works! We now get into the Windows "loading drivers..." screen, all in those beautiful white-on-blue colors. One thought occurs: we disabled the drives, so how will Windows install? We'll deal with that when it shows up.

After about 8 minutes of "loading drivers" and "getting ready to install Windows", the system partitions are listed, and XP asks where you'd like it to deploy itself. So, apparently, while it was loading drivers, it discovered a bunch of drives, so we wonder why we had to disable the drives in the first place: confusion++.

After being presented with a list of 8 locations to install XP, I selected the unformatted space at the end of my 320GB. Windows asks me if I would like to create a partition, I say yes, and it tells me it can't.

>Problem 2: Windows cannot create a fourth primary partition.

This problem makes little sense, but upon reconsideration, it is fairly logical: the MBR only has space for 4 entries (thus, 4 primary partitions), yet, it is possible to have more than 4 partitions by using extended (or logical) partitions. This takes up an entry in the MBR and allows a second partition table somewhere else on the disk to deal with extended partitions. I assume that Windows reserves the fourth entry in the primary partition table for an extended partition, thereby not allowing a fourth primary partition. Makes sense (still stupid). Aside: it might be possible to install XP on an extended partition, but I had my mind set on the fourth primary, so I needed a fix. Maybe Linux can help me out...

>Fix 2: Boot into Linux, install NTFS drivers, create fourth primary partition as NTFS.

This process went relatively smoothly, so no real complaints. Don't forget to re-enable the drives or you won't be able to get into Linux. Also, after creating the partition and rebooting, don't forget to disable the drives before trying to load Windows.

### Hour 2

Back into Windows install, waiting... Okay, choose your partition. Now we get to choose the Linux-made NTFS partition. Windows likes it, but isn't satisfied and would like the first partition on the 200GB as well.

>Problem 3: Windows wants first partition on first drive.

You can imagine how I feel, here I am giving over 100GB to XP and taking time from my Linux and it wants more. I guess this is XP's way of bargaining: to install it on the second drive, you must also give it space on the first. This brings up an issue however, my 200GB is full with raided partitions, so I can't give XP what it wants without breaking something. Luckily for me though, the first partition is mirrored and only 100MB, so I'd be able to restore it somewhat easily.

After careful consideration, I decided that XP could have the first partition on the first disk, as it would only be temporary, and once XP was set up, I would take it back.

>Fix 3: Give it what it wants, take it back later.

So XP happily removes the partition, breaks my /boot mirror and puts a nice FAT16 partition in it's place. Good news is, that with XP happy, it starts to copy files. Time to take a nap.

### Hour 2.5
After waking up, imagine my surprise to find Windows install back at square one asking me where I would like to install XP. Once again, it becomes clear: the drives were disabled, so when the computer rebooted, all the BIOS found was the CD and we repeated the process.

No big deal, just F3 to quit the install, reboot the computer, re-enable the drives, and let Windows carry on. Everything but the last step ended up working: just before getting into Windows, however, we are told that XP cannot find "Hal.dll" in it's system root and we come to a stand-still.

>Problem 4: XP cannot boot: Hal.dll not found or corrupt.

Let's ask google, but first, some background: Hal.dll is for the Hardware Abstraction Layer. It let's Windows and your applications pretend that all computers are the same, in simplistic terms. After some good ol' internet prodding, I find out that it might be because XP is installed on the second drive, and NTLDR doesn't know this. Therefore, we must edit the boot.ini configuration file in the first partition of the first disk.

>Fix 4: Edit boot.ini to reflect non-standard setup.

Since it's a FAT16 partition, Linux (which is already installed) will be able to modify it. Let's just boot that back up. Oh wait, XP wrote over the MBR and /boot partition.

>Problem 5: XP was naughty, and didn't make a backup: wrote over MBR.

So before we can modify our corrupted boot.ini file, we must now fix Ubuntu. Pop in the Ubuntu install disk, boot up the live CD, open a terminal, and rewrite GRUB to the MBR. That works. Shutdown the live CD, and reboot into our own version of Ubuntu. It informs us that our /boot partition is degraded, and we tell it to forget about it and just deal with it.

>Fix 5: Use a Linux live-CD to reinstall GRUB.

After logging in, we mount the first partition and open the boot.ini file in our favorite editor (mine is vim). Just as I suspected, the XP entries point to the fourth partition on the first disk. Each boot.ini entry contains three fields: the controller, the disk, and the partition. Now since SATA only hosts one drive per controller (okay, not quite true, but roll with it), we know that the disk will be '0', as opposed to in olden days when you would differentiate between the master and the slave drive. Thus, we could bet that the correct path to the XP partition would be 1-0-4; the controller and disk numbers start at zero whereas the partitions start at one, why, I don't know, but that's a different rant. Just to be safe, I'll make a bunch more entries with the different combinations so that I don't have to repeat this process over and over again.

Upon rebooting, all boot.ini possibilities resulted in the same "Hal.dll might be missing or corrupt" error. This lead me to believe that despite all its efforts, XP really didn't want to run from a second hard drive. Since the situation wasn't about to change, and knowing that an alternate boot loader, LILO, can boot Windows from a second hard drive, I figured I'd try LILO instead of GRUB.

### Hour 4
After some pondering as to the easiest way to install LILO, I decided to install it from my Backtrack live-CD. An aside: I really like Backtrack, it is probably one of the most advanced and complete live-CDs out there.

Long-story-short, between the man pages of LILO and google, I was fighting my way through the LILO install. Maybe I was doing it wrong, or maybe it was because I was trying to install it off a live-CD, but it wasn't working very well, and in the end, I decided that I could probably make it work just fine with GRUB.

Knowing that GRUB can chain-load boot records, I would need a Windows XP boot record on my XP partition. But, XP installs it on the first partition of the first drive, remember?

>Problem 6: Need XP boot record on fourth partition.

So here's the idea: we're going to take the boot record from the first drive, first partition and move it to the second hard drive, fourth partition. At which point GRUB can go in the MBR, load its stage2 from the first drive, and then chain-load to the second drive.

But, we have another problem: the XP install creates the first partition on the first drive as FAT16, whereas our fourth partition is NTFS, so we can't directly copy the PBR. So, we're going to repeat the entire install process, but this time on a FAT32 partition so that we can transfer the PBR.

>Fix 6: Reinstall XP on a FAT32 partition and transfer the PBR.

Okay, here we go.

### Hour 5
Reboot the computer, disable the drives, wait for the installer to load everything it needs, delete the old partition, create the new... oops, forgot, Windows can't create a fourth partition. Reboot, enable the drives, boot into Linux, open parted, delete the NTFS partition, create a FAT32 partition, save, reboot. Disable drives, wait for the installer, XP needs first partition on first drive? Yes, take a nap.

Wake up to the start screen again, reboot, enable drives, this time, however, we're not expecting XP to load, and it doesn't, so no surprises.

### Hour 6
Now that that's done, we need to get our PBR and move it to our XP partition.

>Problem 7: GRUB is once again broken, but we can't fix it, because we need     what has replaced it, which is of course, also broken.

So we turn to our invaluable Backtrack once again. Using it, I made a copy of all the PBRs and MBRs around for further investigation. I also had a copy of my GRUB MBR and partition (that I made after re-installing GRUB the first time) so I copied that back on to the drive, rebooted, and got back into Linux a little easier.

>Fix 7: Use Backtrack. Make copies.

Now back in my own Linux, I start analysing all the boot records I've collected and start piecing together a new one for the XP partition.

### Hour 8
Okay, I lied that last step took more than two hours, but when it was done, I had my own boot record for the XP partition. Copied it over to the now FAT32 partition, adjusted GRUB's menu.lst and prepared to reboot.

As I'm sure you probably could have guessed, it didn't work (I had gotten my hopes up unfortunately), but I got a different error: referring to a "hardware detection error". Unlike the "hal.dll" error, this one seemed more upstream, but like the "hal.dll" error, it too resided in the NTLDR.

>Problem 8: Tried own boot loader, new error, same problem.

By this time, I was just getting frustrated with all the problems that XP was throwing at me and eventually decided that it might be more efficient to give in a little more. After all, I was already okay with XP breaking my /boot partition every time.

>Fix 8: Give up, comply with XP and give it space on the first drive.

### Hour 9
I decided that I would flip the 200GB and 320GB drives so that the 320GB was the first drive and the 200GB was the second. This would make the XP partition the fourth partition on the first drive, where XP would hopefully be a little happier. But first, I have to restore everything the way it was before I started, or my Linux might stop working.

Loading Linux again, I deleted the Windows partitions, re-created my raid partitions, re-added them, and rebuilt the arrays. Turned off the computer, opened it up, swapped the SATA cables, and powered it back on. Load into Linux, make sure all the drives are still in the arrays, adjust any mount points that have been broken. Overall, system looks good, time to try Windows again.

Open parted, create NTFS partition, now on the first hard drive, reboot, disable drives, insert Windows disc, wait for install. This is getting kind of repetitive isn't it? This time however, XP install did not ask for the first partition on the first disk. The install worked fine, rebooted, enabled the drives, get to the boot loader... nope, still doesn't work: back to a "hal.dll" error.

>Problem 9: XP still doesn't work, wants more than the first drive?

So XP won't even work when it's given space on the first drive, what could it possibly want? The first partition? It can't have that because it's too big to fit in the space of my /boot partition, and I'm not going to spend the next day shuffling my raid partitions to give it more space. At this point, it's getting really frustrating to deal with XP and all of its "me" attitude, so I decided to grab an old laptop hard drive, an 80GB SATA, and just see if XP would install on that. I know the drive has some bad sectors on it, hence why I was avoiding it before, but if XP finds a way to get at least to the second part of the install, I'd be happy.

>Fix 9: Completely abandon all plans and just give XP its own drive.

### Hour 10
Open the computer again, install the now-fourth hard drive, disable the drives, wait for the installer, point it to the fourth drive this time, and for some reason, it doesn't want the first partition on the first drive. That's weird, so it only must have it when it's not the first partition or on the first drive. Moving on, it installs for a while, reboots, I enable the drives again, and... no way, it actually boots in to the second part of the install. Victory!

So now we get to sit back and laugh in disgust at all the propaganda that is shown to us during the install: "..faster and more reliable" "..easiest Windows yet", "..latest hardware and software", "most dependable Windows...", "..safety, security, and privacy", the list just keeps going and going.

Finally, it reboots again and we get our first glimpse of the Windows' user interface. I open IE in order to download Firefox, but for some reasons, XP didn't install the drivers for my network card.

>Problem 10: No NIC drivers.

Hahaha, we go through all this trouble, and XP can't even get us a little bit of out-of-the-box Internet? Wasn't there a quote in the install about supporting the latest hardware?

Rather than switch to Linux right away, I just used my other computer to download the NIC driver, store it to a flash drive, wait for XP to detect the drive, install the drivers for the flash drive... Okay, now I can install my network card. Ten minutes later, I'm downloading Firefox, then my graphics card drivers, then my sound drivers...

>Fix 10: Use another computer.

Now that XP is finally getting settled in, completely unaware and ungrateful of all the things that I've done for it, it's time to get Linux back and integrated.

### Hour 12
A simple boot into Backtrack, replace the MBR from my GRUB backup, reboot, and we're back into Linux. Make sure all the raids are intact, and edit the GRUB menu.lst to chain-load Windows on the fourth drive. Reboot again to confirm that everything works, and it does, unbelievable.

Now, something I noticed in XP: it detected the old broken install of its predecessor on fourth partition of the first hard drive and decided that it would be a good idea to call that one "C:" and the working copy "L:". It choose "L" because it noticed that there were a lot of other partitions that one day would surely be visible to XP (since they're empty now) and reserved letters for them, how nice.

Unfortunately, because Windows had commandeered and adopted itself a "C:" drive, I couldn't tell it to let it go and call the working version of Windows "C:". So now, because I'm not going through the install process again, I get the added luxury of changing the install paths of all my programs. Either way, it works, so I'm not touching it. It can figure out the hard drive is corrupt on its own.

### Final Thoughts
Although it seems like I was able to complete the entire process in about 12 hours, it actually took more like 48 hours spread out over a little more than a week; a couple of things contributed.

Firstly, I needed the Linux portion working throughout the day, every day. So, when it got around to midnight, I stopped the "progress" and began restoring the computer. This included rebuilding the /boot partition, rewriting the MBR, and lots of rebooting.

Secondly, with the amount of reboots, the mount-count for each partition increased quite rapidly. Once it hits a certain number, Linux checks the entire partition for errors, which is good, but takes a couple of hours where you can't do anything else but watch it.

I described attempting to put a PBR on the FAT32 partition, well, I also tried it on an NTFS partition after that. I pretty much went through every single possibility of the above process and then just chose the best one to write about. What I didn't like about the NTFS partition was that it has reserved files, as opposed to FAT's reserved sectors. This makes it harder to edit the drive in a hex editor and maintain consistency.

Speaking of possibilities, at one point I figured my XP-CD was corrupt, so I tried some other discs, including an older XP disc and a Windows 2000 disc. I did not know this, but apparently Microsoft took a while to get on the large-hard-drive bandwagon as neither discs used LBA and had a 128GiB size limit. Waiting each time for the installer to load files, rebooting, enabling and disabling drives, these all took many hours of headache.

And finally, the countless hours spent searching through google and online forums every time I hit a brick wall.

**Start reading here if you skipped the article.**

So in the end, I actually never got XP to do what I wanted. I tinkered a lot with it, got frustrated at it, learned a lot about it, but at some point in the process, deemed it a waste of time, and just gave in to XP's forceful demands. I feel like I was just bullied into installing an unsafe, unappreciative, and unimpressive OS just to play a couple of games. But after all, that was the whole point: to play games, so I can't complain too much.

Moral of the story: XP doesn't play well with others, but we knew that, I mean, just at look at his parents...
