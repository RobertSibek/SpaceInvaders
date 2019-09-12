# Space Invaders

## Version 1.1.0
## Created by Robert Sibek, Bad Mug Games

### CONTROLS
LEFT ARROW, RIGHT ARROW     Player movement
SPACEBAR                    Fire				
1 2 3                       Change player's ship 		
S                           Sound On/Off
P                           Pause game
G                           God mode (faster shots and invicibility)
T                           Screenshot mode
Q                           Quit to title screen
F                           Show Fps
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
[x] shot as image

### VERSION 1.1 RELEASE TODOS
[x] destroy player when aliens are below critical level (1)
[] level 100 is the final
[] tune the difficulty on new pc
[x] add barriers to protect player (as from the original game) (1)
[] implement difficulty increasing with each wave (2)
	[] increase points for aliens with each wave
	[] increase alien movement speed
	[] increase ufo points
[] rewrite Audio.js similar to LoadImages (2)
[x] show intro screen (2)
    [x] create intro screen
    [NA] play intro music (not allowed by chrome until user interaction)
    [x] show BMG logo
        [x] create BMG logo
    [x] display blinking text click to play 
            NOTE: fuck blinking texts, static is enough
[] show end screen (2)
    [] show game summary
        [] show score points in huge font in the centre
        [] play end music
        [] show click to menu button
        [] show play again button
[] obfuscate .js files and distribute
[] publish game
[] distribute game on different channels

### VERSION 1.2 RELEASE TODOS
[] animate player's leaving the screen after clearing wave (3)
[] create highres Ufo model
    [] model Ufo in Blender
    [] render frames in Blender
    [] create spritesheet
    [] update code
[] add UFO hunt every 5th level
[] add boss fight, every 10th level
[] add easter eggs
    [] load custom alien sprites (eg. your boss, wift, husband, ex, whatever...)

### KNOWN BUGS:
- none

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

### version 1.1
- god mode added
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


