
BreakoutGame.screens['main-menu'] = (function(game){
	'use strict';

	function initialize(){
		document.getElementById('new-game-btn').addEventListener('click',function(){game.showScreen('play-game');});

		document.getElementById('scores-btn').addEventListener('click',function(){game.showScreen('scores');});

		document.getElementById('credits-btn').addEventListener('click',function(){game.showScreen('credits');});		
	}

	function run(){

	}

	return {
		initialize : initialize,
		run : run
	};

}(BreakoutGame.game));