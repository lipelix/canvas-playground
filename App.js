var App = function App(canvasEl){
	this.canvasEl = canvasEl;
	this.canvas = canvasEl.getContext('2d');
	this.animObjects = {};
	this.speed = 1;
	this.fps = 25;
};

App.prototype = {

	setupToolbar: function() {
		document.getElementsByClassName('incSpeed')[0].addEventListener('click', this.incSpeed.bind(this));
		document.getElementsByClassName('decSpeed')[0].addEventListener('click', this.decSpeed.bind(this));
	},

	renderAnimObjects: function() {
		var obj, prop;

		this.canvas.clearRect(0, 0, 800, 800);
		for (prop in this.animObjects) {
			obj = this.animObjects[prop];
			this.canvas.beginPath();
//			this.canvas.fillStyle = "black";
//			this.canvas.fill();
			this.canvas.arc(obj.x, obj.y, obj.r, 0, 2 * Math.PI);
			this.canvas.stroke();
		}

		console.log('render');
	},

	createAnimObjects: function(count) {
		var i, obj;

		for (i = 0; i < count; i++) {
			obj = new AnimObject(this.getRandomCoords());
			this.animObjects[obj.id] = obj;
		}
	},

	getRandomCoords: function() {
		return {
			x: Math.round(Math.random() * 800),
			y: Math.round(Math.random() * 800)
		};
	},

	doMove: function() {
		var
			id, id2, move;

		for (id in this.animObjects) {
			this.animObjects[id].futureMoveRand(this.speed);
		}

		for (id in this.animObjects) {

			move = true;
			for (id2 in this.animObjects) {
				if (this.animObjects[id] === this.animObjects[id2]) {
					continue;
				}

				if (this.animObjects[id].willCollide(this.animObjects[id2])) {
					move = false;
					break;
				}
			}

			if (move) {
				this.animObjects[id].moveToFuture();
			}
		}
	},

	handleCollisions: function() {

	},

	setLoop: function() {
		this.doMove();
		this.handleCollisions();
		this.renderAnimObjects();
	},

	loop: function() {
		setInterval(this.setLoop.bind(this), 1000/this.fps);
	},

	addRandomObject: function() {
		var obj = new AnimObject(this.getRandomCoords());
		this.animObjects[obj.id] = obj;
		this.renderAnimObjects();
	},

	incSpeed: function() {
		this.speed += 1;
		console.log(this.speed);
	},

	decSpeed: function() {
		if (this.speed > 0)
			this.speed -= 1;
	}
};

