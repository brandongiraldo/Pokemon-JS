class Pokemon {
	constructor(name, weight, sprites, stats, types, renderer) {
		this.name = name;
		this.weight = weight;
		this.sprites = sprites;
		this.stats = stats;
		this.types = types;
		this.renderer = renderer;
	}

	get render() {
		return this.renderFull();
	}

	renderFull() {
		var stats = this.renderStats();
		var types = this.renderTypes();
		return '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">\
					<div class="cell">\
						<img src="'+ this.sprites.front_shiny +'"/> \
						<div class="title">'+this.name+'</div> \
						<div class="weight"> Weight: '+this.weight+'</div> \
						<div class="stats"> Stats '+stats+'</div> \
						<div class="types"> Types '+types+'</div> \
					</div>\
				</div>';
	}

	renderTypes() {
		var stringBuilder;
		this.types.forEach(function(item) {
			stringBuilder+='<div class="item">'+item.type.name+'</div>';
		});
		return stringBuilder;	
	}
	
	renderStats() {
		var stringBuilder;
		this.stats.forEach(function(item) {
			stringBuilder+='<div class="item">'+item.stat.name+': '+'<div class="int">'+item.base_stat+'</div>'+'</div>';
		});
		return stringBuilder;
	}
}