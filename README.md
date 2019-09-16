# Space Invaders 2019

## Version 1.1.0
## Created by Robert Sibek, Bad Mug Games

### CONTROLS
#### BASIC
LEFT ARROW, RIGHT ARROW     Player movement
SPACEBAR                    Fire		
1 2 3                       Change player's ship 		
S                           Sound On/Off
C                           Switch to custom alien images
P                           Pause game
T                           Screenshot mode
Q                           Quit to title screen
#### DEBUG
D                           Debug mode
TAB                         Request next frame (while in debug mode & paused)
G                           God mode (faster shots and invicibility)
K                           Proceed to next wave (while in God mode)
H                           Display Hitboxes (where available)
L                           Enable Dynamic Starfield
[ ]                         Starfield Brightness
< >                         Add/Remove starfield layer


### GENERAL TODOS

[x] publish game on itch.io
[x] CLEAN THE MESS! (refactor, refactor, refactor) (1)
[x] show major messages on the screen instead in debug (eg. sfx on/off)
[x] download/create retro game machine frame 
[x] add god mode for testing (3)
	[x] player is unaffected by enemy shots
	[x] player can blast rest of aliens by pressing K key (this will call the next wave)
[x] reset alien grid (1)
	[x] when game starts
	[x] when player looses all lifes
	[x] on new wave
	[x] NOT when player loose one life only
[] adjust player control to be more precise (2)
[x] add sounds
	[x] add enemy hit sfx
	[x] add player hit sfx
	[x] add shot left screen sfx	
[x] add max lives for player
	[x] define max lives
	[x] show lives left in screen top
[x] add UFO as class (hell YEAH!)
[x] add playerScore
[x] make ufo animated from spritesheet
	[x] create ufo animation in blender
[x] create player class (2)
	[x] create player class
	[x] allow to setup spaceship image
	[x] allow to setup shot image
[x] add star field background (parallax vertical scroll in 3 rows)
[x] display shot as image
[] tune the difficulty on new notebook
    [] get a new notebook ASAP, under grace in a perfect way
        [] get money for new notebook (~81.000CZK)
        [] WHY do I want new notebook?
            [x] I want my own notebook
            [x] I want a perfect one
                WHY?
                [x] So I can enjoy the work on it
                [x] Because I can focus on work fully without wanting a better one
                [x] Because it will increase my UX and speed
                [x] Because it reflects my self-worth
            [] I'll have to return the old one               
        [x] choose the perfect notebook - it's hard to decide, I'll buy both
            [x] Why go for Macbook Pro?
                PROS:
                    [x] MacOS is just perfect
                    [] can get job as iOS developer
                    [] can continue with my own apps
                    [] can colaborate with Radim
                    [] Stylish piece of hardware
                    [x] Possible future deployment both to iOS and Android
                    [] Retina display
                    [] OS optimization increases UX
                    [x] can develop iOS apps in XCODE (love it!)
                    [] it's hipsta-thing, everybody will see me as I'm rich
                CONS:
                    [] price
                    [] lower HW specs than DELL
            [] Why go for Dell XPS 15
                PROS:
                    [x] higher resolution than Macbook
                    [x] OLED display
                    [x] better HW specs (32GB RAM, 1TB, faster i9 CPU)
                    [x] cheaper
                    [x] can run windows games
                    [x] Better GPU (NVidia 1650)
                    [] touch screen (though have no usage for it currently)
                CONS:
                    [] can not deploy to iOS
                    [] it's less hipsta-thing

### VERSION 1.1 RELEASE TODOS
[x] destroy player when aliens are below critical level (1)
[] level 21 is final one               
[x] add barriers to protect player (as from the original game) (1)
[x] improve barrier rendering
	[x] use higher resolution/array item or different attitude
	[x] make the barrier destruction more non uniform
[x] implement difficulty scaling with each wave (2)
	[x] increase points for aliens with each wave
	[x] increase alien movement speed
	[x] increase ufo points per wave
[x] rewrite Audio.js similar to LoadImages (2)
[x] show intro screen (2)
    [x] create intro screen
    [NA] play intro music (not allowed by chrome until user interaction)
    [x] show BMG logo
        [x] create BMG logo
    [x] display blinking text click to play 
            NOTE: fuck blinking texts, static is enough
[x] show end screen (2)
    [x] show game summary
        [x] show click to menu button
        [x] show play again button
[] test gameplay
[] obfuscate .js files and distribute
[] publish game
[] distribute game on different channels

### VERSION 1.2 RELEASE TODOS
[] animate player's leaving the screen after clearing wave (3)
    [] move spaceship vertically up
    [] show jets    
[] create highres Ufo model
    [] model Ufo in Blender
    [] render frames in Blender
    [] create spritesheet
    [] update code
[] add UFO hunt every 5th level
[] add boss fight, every 10th level
[] add easter eggs
    [] load custom alien sprites (eg. your boss, wife, husband, ex, whatever...)

### KNOWN BUGS:
- none. Really?

### HISTORY
- Original game differences
    [] each kind of alien is scored differently (30 - top row, 20 - 2xmiddle rows, 10 - 2xfor lowest rows)
    [] each row is moving independently, slightly ahead the row above
    [] after destroying alien, there a short sprite swap for blast image
    [] player's and alien's shot can destroy each other when met
    
#### version 1.0
- enhanced graphic
- animated starfield background
- standard controls
- added Ufo

### version 1.1
- God mode added
- sound effect can be enabled/disabled now
- new UFO arrival sound
- retro tv frame added
- enhanced background
- major messages now visible on screen (not just in console)
- code refactored
- UFO is now animated
- aliens and ufo images are now using spritesheets
- fixed UFO hitbox
- added barriers to protect player's ship
- changed animation loop from setInterval to requestAnimationFrame (battery saving, more stable performance)
- added intro screen with logo (Finally!)
- different sounds for each spaceship

### version 1.2 - planned
- animated alien sprites
- boss fights