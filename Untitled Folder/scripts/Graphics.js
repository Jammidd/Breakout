
BreakoutGame.graphics = (function(){
	'use strict';

	var canvas = document.getElementById('game-canvas'),
		context = canvas.getContext('2d');

	CanvasRenderingContext2D.prototype.clear = function () {
	    this.save();
	    this.setTransform(1, 0, 0, 1, 0, 0);
	    this.clearRect(0, 0, canvas.width, canvas.height);
	    this.fillStyle = 'rgba(0,0,0,1)';
		this.fillRect(0,0,canvas.width, canvas.height);
	    this.restore();
	};

	function clear() {
	    context.clear();
	}

	function width(){
		return canvas.width;
	}

	function height(){
		return canvas.height;
	}

	function Ball(spec){
		var that = {};

		that.launch = function(){
			spec.moving = true;
			spec.angle = Math.random();
		};
		
		that.setLaunched = function(launched){
			spec.moving = launched;
		}

		that.launched = function(){
			return spec.moving;
		}

		that.setVelocity = function(speed){
			spec.velocity = speed;
		};

		that.getVelocity = function(){
			return spec.velocity;
		};

		that.setAngle = function(angle){
			spec.angle = angle;
		};

		that.getAngle = function(){
			return spec.angle;
		};

		that.getRadius = function(){
			return spec.radius;
		};

		that.setDirection = function(x,y){
			spec.direction.x = x;
			spec.direction.y = y;
		}

		that.getDirection = function(){
			return {
				x : spec.direction.x,
				y : spec.direction.y
			};
		}

		that.move = function(){
		    if(spec.position.x + spec.velocity > canvas.width-spec.radius || spec.position.x + spec.velocity < spec.radius) {
		    //    spec.direction.x *= -1;
		    	spec.angle = -spec.angle;
		    }
		    if(spec.position.y + spec.velocity > canvas.height-spec.radius || spec.position.y + spec.velocity < spec.radius) {
		    //    spec.direction.y *= -1;
		    	spec.angle = 180 - spec.angle;
		    }

		    var direction = angleToXY(spec.angle);

			spec.position.y -= direction.y * spec.velocity;
			spec.position.x -= direction.x * spec.velocity;
		};

		that.bounce = function(){
			spec.angle = 180+spec.angle;
			that.move();
		};

		that.setPosition = function(x, y){
			spec.position.x = x;
			spec.position.y = y;
		};

		that.getPosition = function(){
			return { 
				x : spec.position.x, 
				y : spec.position.y
			};
		}

		that.draw = function(){
			context.save();

			context.beginPath();	
			context.arc(spec.position.x, spec.position.y,spec.radius*2,0,2*Math.PI);
			context.fillStyle = "rgba(244,244,244,1)";
			context.fill();

			context.restore();
		};

		function angleToXY(angle){
			return {
				x : Math.sin(angle),
				y : Math.cos(angle)
			};
		}

		return that;
	}

	function Paddle(spec){
		var that = {};

		spec.position = {
			x : canvas.width / 2,
			y : canvas.height - 50
		}

		spec.broken = false;

		that.getBroken = function(){
			return spec.broken;
		}

		that.setBroken = function(){
			spec.broken = true;
		}

		that.getWidth = function(){
			return spec.width;
		};

		that.setWidth = function(width){
			spec.width = width;
		}

		that.getHeight = function(){
			return spec.height;
		};

		that.getPosition = function(){
			return {
				x : spec.position.x,
				y : spec.position.y
			};
		};

		that.moveRight = function(){
			if(spec.position.x + (spec.width / 2)< canvas.width){
				spec.position.x += spec.speed;
			}
		};

		that.moveLeft = function(){
			if(spec.position.x - (spec.width / 2) > 0){
				spec.position.x -= spec.speed;
			}
		};

		that.draw = function(){
			context.save();

			context.fillStyle = "rgba(255,0,0,1)";
			context.fillRect(spec.position.x - spec.width / 2, spec.position.y - spec.height / 2, spec.width, spec.height);

			context.restore();
		};

		return that;
	}

	function Brick(spec){
		var that = {};

		that.getPosition = function(){
			return {
				x : spec.position.x,
				y : spec.position.y
			};
		};

		that.getWidth = function(){
			return spec.width;
		};

		that.getRow = function(){
			return spec.row;
		};

		that.getHeight = function(){
			return spec.height;
		};

		that.getColor = function(){
			return spec.color;
		};

		that.destroy = function(){

		};

		that.draw = function(){
			context.save();

			context.fillStyle = spec.color;
			context.fillRect(spec.position.x, spec.position.y, spec.width, spec.height);

			context.restore();
		};

		return that;
	}

	function Score(spec){
		var that = {};

		that.setScore = function(score){
			spec.score = score;
		};

		that.addScore = function(score){
			spec.score += score;
		}

		that.getScore = function(){
			return spec.score;
		};

		that.draw = function(){
			context.save();

			context.font="20px Courier New";
			context.fillStyle = "#FFFFFF";
			context.fillText("Score: "+spec.score,5,canvas.height - 10);

			context.restore();
		};

		return that;
	}

	function Life(spec){
		var that = {};

		that.setLives = function(score){
			spec.lives = score;
		};

		that.addLife = function(){
			spec.lives += 1;
		}

		that.removeLife = function(){
			spec.lives -= 1;
		}

		that.getLives = function(){
			return spec.lives;
		};

		that.draw = function(){
			context.save();

			context.font="20px Courier New";
			context.fillStyle = "#FFFFFF";
			context.fillText("Lives: "+spec.lives,canvas.width - 110,canvas.height - 10);

			context.restore();
		};

		return that;
	}

	function Countdown(spec){
		var that = {};

		spec.duration = 4;
		spec.counter = spec.duration;
		spec.expired = false;

		that.getExpired = function(){
			return spec.expired;
		};

		that.setExpired = function(exp){
			spec.expired = exp;
		};

		that.setStart = function(start){
			spec.startTime = start;
		};

		that.update = function(elapsedTime){
			if(elapsedTime - spec.startTime >= spec.duration){
				spec.expired = true;
			}

			spec.elapsed = spec.duration - Math.floor(elapsedTime - spec.startTime) - 1;
		};

		that.draw = function(){
			context.save();

			context.fillStyle = "#FFFFFF";
			context.font = "40px Georgia";
			if(spec.elapsed > 0)
				context.fillText(spec.elapsed, canvas.width / 2.2, canvas.height / 2);
			else
				context.fillText("Start!",canvas.width / 2.2, canvas.height / 2);

			context.restore();
		};

		return that;
	}

	function ParticleSystem(spec){
		var that = {},
			particles = [];

		that.create = function(){
			var p; 

			var numPartWidth = spec.width / spec.particleSize; 
			var numPartHeight = spec.height / spec.particleSize;
			var rowPos = 1;

			for(var i = 0; i < numPartHeight; i++){
				for(var j = 0; j < numPartWidth; j++){
					var yPos = spec.particleSize * i;
					var xPos = spec.particleSize * j
					p = {
						position:{
							x: xPos,
							y: yPos
						},
						alive:0,
						lifetime:Math.random() + 0.01,
						speed: Math.floor(Math.random() * 3),
						dimension: spec.particleSize
					}

					particles.push(p);
				}
				rowPos++;
			}
		};

		that.update = function(elapsedTime){
			var removedParticles = [],
				value,
				particle;

			for(value in particles){
				if(particles.hasOwnProperty(value)){
					particle = particles[value]
					particle.alive += (elapsedTime);

					particle.position.y += (elapsedTime * particle.speed);

					if (particle.alive > particle.lifetime) {
						removedParticles.push(value);
					}	
				}
			}

			for(particle = 0; particle < removedParticles.length; particle++){
				delete particles[removedParticles[particle]];
			}
			removedParticles.length = 0;
		};

		that.drawParticles = function(){
			context.save();
			for(var i = 0; i < particles.length; i++){
				context.fillStyle = "#434343";
				context.fillRect(particles[i].position.x, particles[i].position.y,particles[i].dimension,particles[i].dimension);
			}
			context.restore();
		};
		
		return that;
	}

	return {
		clear:clear,
		width:width,
		height:height,
		Ball:Ball,
		Paddle:Paddle,
		Brick:Brick,
		Score:Score,
		Life:Life,
		Countdown:Countdown,
		ParticleSystem:ParticleSystem
	};

}());