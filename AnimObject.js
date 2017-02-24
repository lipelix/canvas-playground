var AnimObject = function AnimObject(cfg) {
	this.id = this.guid();
	this.x = 0 || cfg.x;
	this.y = 0 || cfg.y;
	this.r = 5 || cfg.r;

	this.futureX = 0 || cfg.x;
	this.futureY = 0 || cfg.y;
};

AnimObject.prototype = {

	moveTo: function(x, y) {
		this.x = x;
		this.y = y;
	},

	futureMoveRand: function(step) {
		var stepX, stepY;

		stepX = Math.sin(Math.random() - 0.5) * step;
		stepY = Math.sin(Math.random() - 0.5) * step;

		if (this.x + stepX < 0 || this.x + stepX > 800)
			return;

		if (this.y + stepY < 0 || this.y + stepY > 800)
			return;

		this.futureX += stepX,
		this.futureY += stepY;
	},

	moveToFuture: function() {
		this.x = this.futureX;
		this.y = this.futureY;
	},

	willCollide: function(animObject) {
		var r, sqrt;

		r = this.r + animObject.r;
		r = r * r;
		sqrt = (this.futureX + animObject.x) * (this.futureX + animObject.x) + (this.futureY + animObject.y) * (this.futureY + animObject.y);

		if (r < sqrt) {
			return false;
		}

		return true;
	},

	/**
	 * Generates a GUID string.
	 * @returns {String} The generated GUID.
	 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
	 * @author Slavik Meltser (slavik@meltser.info).
	 * @link http://slavik.meltser.info/?p=142
	 */
	guid: function() {
		function _p8(s) {
			var p = (Math.random().toString(16) + "000000000").substr(2, 8);
			return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
		}
		return _p8() + _p8(true) + _p8(true) + _p8();
	}

};