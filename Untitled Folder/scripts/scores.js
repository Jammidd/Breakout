BreakoutGame.screens['scores'] = (function(game) {
	'use strict';
	
	function initialize() {
		document.getElementById('scores-back').addEventListener(
			'click',
			function() { game.showScreen('main-menu'); });

		document.getElementById('scores-reset').addEventListener('click',
			function(){
				localStorage.setItem('BreakoutGame.highScores',JSON.stringify([]));
				BreakoutGame.persistence.report();
			}
		);
	}
	
	function run() {
		//
		// I know this is empty, there isn't anything to do.
		BreakoutGame.persistence.report();
	}
	
	return {
		initialize : initialize,
		run : run
	};
}(BreakoutGame.game));