# Space Invaders

## Version 1.1.0
## Created by Robert Sibek, Bad Mug Games

### TODOS
[] publish game on itch.io
[x] CLEAN THE MESS! (refactor, refactor, refactor) (1)
[] improve advancing to new wave
	[] display animated text in the screen center
	[] animate new alien swarm arrival (short delay between showing them left to right?)
[] allow changing FPS (for perf. tuning) (2)
[] change horizontal speed of starfield based on player's movement
[] destroy player when aliens are below critical level
[x] show major messages on the screen instead in debug (eg. sfx on/off)
[] separate alien scoring for each row ("frontmen" are cheaper :-)
[x] download/create retro game machine frame 
[] add god mode for testing (1)
	[x] player is unaffected by enemy shots
	[] display shield when player in god mode and get hit by enemy
	[x] player can blast rest of aliens by pressing K key (this will call the next wave)
[x] reset alien grid (1)
	[x] when game starts
	[x] when player looses all lifes
	[x] on new wave
	[x] NOT when player loose one life only
[] adjust player control to be more precise (2)
[] add player spaceship energy shields (3)
	[] show them as five orange rectangles (=====) 
	[] remove one per hit
	[] when all depleated, decrease player's lives
[] add random bonus from blasting UFO (3)
	[] when Ufo blasted it may or may not drop some powerup (shields refill, power shots etc.)
[x] add sounds
	[x] add enemy hit sfx
	[x] add player hit sfx
	[x] add shot left screen sfx	
[x] add max lives for player
	[x] define max lives
	[x] show lives left in screen top
[x] add UFO as class (hell YEAH!)
[x] add playerScore
[] make ufo animated from spritesheet
	[] create ufo animation in blender
[] create player class (2)
	[x] create player class
	[x] allow to setup spaceship image
	[x] allow to setup shot image
	[] allow to setup separate sfx for each ship
[] implement difficulty increasing with each wave (2)
	[] increase points for aliens
	[] increase alien movement speed
	[] increase ufo points
[x] add star field background (parallax vertical scroll in 3 rows)
[] intro screen (4)
[] performance check to adjust speed automatically for slower/faster machines (5)
[x] shot as image
[] add rewind time feature (fcf)
	[] create framebuffer for x-seconds
	[] store each frame in the buffer, if it's longer rewrite from beginning
	[] allow to go back in time
[] add easter eggs (5)
	[] babis mode 1 (password ano)
	[] special mode 2 (password ninja)

### KNOWN BUGS:
- Ufo's hitbox is poor, improve it

### HISTORY
    
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


