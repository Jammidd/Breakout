//copied from example files in CS5410
var BreakoutGame = {
    images: {},
    sounds: {},
    menus: [],
    gameStack: [],
	screens: {},
	status : {
			preloadRequest : 0,
			preloadComplete : 0
		
	}
	
};

//------------------------------------------------------------------
//
// Wait until the browser 'onload' is called before starting to load
// any external resources.  This is needed because a lot of JS code
// will want to refer to the HTML document.
//
//------------------------------------------------------------------
window.addEventListener('load', function() {
    console.log('Loading resources...');

    BreakoutGame.audioExt = '';
    //
    // Find out which kind of audio support we have
    if (Modernizr.audio.mp3 === 'probably') {
        console.log('We have MP3 support');
        BreakoutGame.audioExt = 'mp3';
    }
    else if (Modernizr.audio.wav === 'probably') {
        console.log('We have WAV support');
        BreakoutGame.audioExt = 'wav';
    }

	Modernizr.load([
		{
			load : [
                'preload!scripts/Graphics.js',
                'preload!scripts/Input.js',
				'preload!scripts/game.js',
				'preload!scripts/gameEngine.js',
				'preload!scripts/credits.js',
				'preload!scripts/menu.js',
				'preload!scripts/scores.js',
				'preload!scripts/gameover.js',
				'preload!scripts/persistence.js'
			],
			complete : function() {
				console.log('All files requested for loading...');
			}
		}
	]);
}, false);

//
// Extend yepnope with our own 'preload' prefix that...
// * Tracks how many have been requested to load
// * Tracks how many have been loaded
// * Places images into the 'images' object
yepnope.addPrefix('preload', function(resource) {
	console.log('preloading: ' + resource.url);
	
	BreakoutGame.status.preloadRequest += 1;
	var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
	resource.noexec = isImage;
	var isSound = /.+\.(mp3|wav)$/i.test(resource.url);
	resource.noexec = isSound;

	resource.autoCallback = function(e) {
		if (isImage) {
			var image = new Image();
			image.src = resource.url;
			BreakoutGame.images[resource.url] = image;
		}

		else if (isSound) {
		    var sound = new Audio(resource.url);
		    console.log(resource.url);
		    BreakoutGame.sounds[resource.url] = sound;
		}
		
		BreakoutGame.status.preloadComplete += 1;
		
		//
		// When everything has finished preloading, go ahead and start the game
		if (BreakoutGame.status.preloadComplete === BreakoutGame.status.preloadRequest) {
		    if (BreakoutGame.frame == null) {
				console.log("frame is undefined!");
				
			}
			console.log('Preloading complete!');
			BreakoutGame.game.initialize();
		}
	};
	
	return resource;
});

