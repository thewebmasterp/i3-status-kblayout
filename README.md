# i3-status-kblayout 

[i3-status](https://github.com/fehmer/i3-status) module for showing the keyboard layout of your desktop.

## Installation

Use [npm](https://www.npmjs.com/) to install i3-status-kblayout.

```bash
npm install i3-status-kblayout
```

## Preparation

The module has to be configured in dependence of your current setup.

 I run Arch Linux, so to make xorg toggle between Bulgarian (bg) and English (en)
keyboard layouts, I had to add this to ``/etc/X11/xorg.conf``
```
Section "InputClass"
        Identifier "system-keyboard"
	MatchIsKeyboard "on"
	Option "XkbLayout" "us,bg"
	Option "XkbModel" "pc104"
	Option "XkbOptions" "grp:alt_shift_toggle"
EndSection
```

Then, you need to have an already installed and configured [i3-status](https://github.com/fehmer/i3-status).

## Configuration

It all works in the following way. Each layout, be it bulgarian, bulgarian with caps lock on, english, english with caps lock on, has a corresponding binary number (like ``00001001``) that you can obtain
by setting the desired layout and then running
```
xset -q | grep LED | awk '{ print $10 }'
```
 In order for this module to recognize and display the current layout on you i3-status, it runs the
same command but all it gets is just the binary number.
 And you're the one that has to map this binary number to a string that will be shown in your i3-status!

To do this, let me walk you through the following example configuration.
### Example
 Go ahead and open ``./config/default.json`` from the root folder of the project to have it when we need it. It should look like this:
```
{
    "codes": {
        "00000000": "EN",        
        "00000001": "EN 🟢",
        "00001000": "BG",
        "00001001": "BG 🟢",
        "undefined": "Error! Wrong i3-status-kblayout configuration"
    }
}
```
Note: This configuration file is part of the npm package itself. You should probably first fork it to make those changes to it, unless you want your config deleted on your next update.

Let's suppose you want to toggle between bulgarian and english. First set your layout to english and run: 

```
xset -q | grep LED | awk '{ print $10 }'
```
This shall return a binary like ``00000000``

So in the ``default.json``, that's why I've set `` "00000000": "EN"``

Then go, turn on the caps lock and run the same command again. I've got ``00000001``

That's why, in ``default.json`` I set ``"00000001": "EN 🟢"``

Go and repeat that process for every other layout that you need.

I recommend putting a 🟢 for the layouts that are with caps-lock enabled but the control is in your hands, put a 🎃 if you wish.

## Basic usage:
```yml
blocks:
  - name: kblayout
    module: i3-status-kblayout
```

## Problems
After a while of using this in my setup, I encountered the following issue. Sometimes this binary number changes (I guess it depends from the way you set your keyboard layout) to a one you haven't mapped. If this happens to you, just follow the already described steps of mapping a binary number to a string in the configuration file.
