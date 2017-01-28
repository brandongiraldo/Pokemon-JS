window.onload = function() {
	console.log(pullPokemon(10));
}

// pull x random pokemon from the API
function pullPokemon(x){
	var pokemon = [];
	for (var i = 1; i <= x; i++) {
		var data = $.getJSON("http://pokeapi.co/api/v2/pokemon/" + x);
		pokemon.append(data);
	}
	return pokemon;
}