
BreakoutGame.persistence = (function(){
	'use strict';

	var highscores = [],
		previousScores = localStorage.getItem('BreakoutGame.highScores');

	if(previousScores !== null){
		highscores = JSON.parse(previousScores);
	}
	
	highscores.sort(function(a,b){return a - b});
	highscores.reverse();

	function add(value){
		highscores.push(value);
		localStorage['BreakoutGame.highScores'] = JSON.stringify(highscores);
	}

	function remove(index){
		delete highscores[index];
		localStorage['BreakoutGame.highScores'] = JSON.stringify(highscores);
	}

	function report(){
		var htmlNode =
		 document.getElementById('score-list'),
			key;

			htmlNode.innerHTML = '';

			var size = Math.min(highscores.length, 5);

			for(var i = 0; i < size; i++){
				htmlNode.innerHTML += ('<li>'+highscores[i]+'</li>');
			}
	}

	return {
		add : add,
		remove : remove,
		report : report
	};

}());