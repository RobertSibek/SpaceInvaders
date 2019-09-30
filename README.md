# Space Invaders 2019

## Version 1.1.0
## Created by Robert Sibek, Bad Mug Games

### CONTROLS
#### BASIC
LEFT ARROW, RIGHT ARROW		Player movement\
SPACEBAR                    Fire\		
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
[x] adjust player control to be more precise (2)
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
[] add comments to each class .js file with /* Usage: */ hint
[] obfuscate .js files and distribute
[] publish game on different channels
    [] publish on Twitch
    [] create own website www.spaceinvaders2019.com
[] check browser compatibility
    [] IE
    [] Edge
    [] FireFox
    [] Opera
    [x] Chrome
    [] Safari

### VERSION 1.1 RELEASE TODOS
[x] destroy player when aliens are below critical level (1)
[x] level 21 is final one 
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
[x] create own highres Ufo model
    [x] model Ufo in Blender
    [x] render frames in Blender
    [x] create spritesheet
    [x] update code        
[x] test gameplay
[x] add one life for each round finished without loosing life (until max. 5 lifes)
[x] display top ten highscores at main screen (3/3)
[] display game controls and points per aliens at the main screen (2/3)
    [] create NICE controls screen
[] unify text colors used in game
[] unify vertical text positions at all screens
[] unify font size in game


### VERSION 1.1.1 RELEASE TODOS
[] use One font with monospacing
[] refactor
[] add flashTextClass

### VERSION 1.2 RELEASE TODOS
[] think about how to add original 4 notes background music with increasing tempo (makes pressure to player). It could be also similar sound motive, which tempo is increasing with alien swarm speed
[] animate player's leaving the screen after clearing wave (3)
    [] move spaceship vertically up
    [] show jets    
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
    
#### version 1.0 - 10.9.2019
- enhanced graphic
- animated starfield background
- standard controls
- added Ufo

### version 1.1 - 1.10.2019
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
- new original Ufo model
- added Highscore saving

### version 1.2 - planned
- add original typewriter intro describing the story
- original animated alien sprites
- boss fights
- original spaceship(s)