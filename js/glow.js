function logo_glow() {
	setInterval(function() {                
		if(options.glow) {
			if (Math.random() > 0.5) {
				blur = Math.floor((Math.random()*20)+1);
			}
		}
		else {
			blur = 0;
		}
	}, 20);
}

ctx.shadowColor = this.color;
ctx.shadowBlur = blur;