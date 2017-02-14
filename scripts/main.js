//filter, search, and pull 

window.onload = function() {
	var request = $.ajax({
		type: 'GET',
		url: "data/sample.json",
		dataType: "json"
	});

	request.done(function(data) {
		var pokemon = new Pokemon(data.name, data.weight, data.sprites, data.stats, data.types, "full");
		console.log(pokemon);
		for(var i=0; i<10;i++) {
			$(".results .row").append(pokemon.render);
		}
	});

	/**
		10 points
		Easy 
		all .items and .weight classes
	**/
	$(".font-select").change(function() {
		var font = $(".font-select :selected").text();
		$(".item").css("font-size", font + "px");
		$(".weight").css("font-size", font+ "px");
	});

	/** 
		10 points
		Easy 
		Do not use jQuery show / hide, cell text needs to retain location
	**/
	$(".toggle-sprites").change(function() {
		if ($(this).is(":checked")) {
            $(".cell img").css("visibility", "hidden");
        } else {
        	$(".cell img").css("visibility", "visible");
        }
	})

	/** 
		40 points
		Hard 
		Filter by closes name match
		When search is cleared, show all pokemon as would appear on first load
	**/
	$(".search").keypress(function() {
		// when cleared must also reset cells
		console.log($(this).val());

	});

	/** 
		40 points (10 points for each filter)
		Hardest 
		For name, alphabetical
		For Weight, largest first
		For Stats, largest sum first
		For Types, most types first
	**/
	$(".filter-select").change(function() {
		console.log($(".filter-select :selected").text());
	})
}

// pull 20 pokemon from the API
function pullPokemon(){
	//pokemon variable is stored in pokemon.json
	return pokemon;
}

// search for pokemon name
function searchPokemon(name){
	// if the pokemon is not in the database, return error
	if (!pokemon[name]){
		return "Pokemon not found";
	}
	return pokemon[name];
}

// returns sprite url of pokemon if it exists
function pokemonImage(name){
	// if the pokemon is not in the database, return error
	if (!pokemon[name]) {
		return "Pokemon not found";
	}
	return pokemon[name]['sprites']['front_default'];
}

// get pokemon moves if pokemon exists
function pokemonMoves(name){
	// if the pokemon is not in the database, return error
	if (!pokemon[name]) {
		return "Pokemon not found";
	}
	var moves = pokemon[name]['moves'];
	var moveNames = [];
	for (var i = 0; i < moves.length; i++) {
		moveNames.push(moves[i]['move']['name']);
	}
	return moveNames;
}

// filter pokemon with the move 'move'
function getPokemonWithMove(move){
	// pokemon with the move
	var hasMove = {};
	// get the pokemon (the keys)
	var poke = Object.keys(pokemon);
	// check each pokemon for the move
	for (var i = 0; i < poke.length; i++) {
		var moves = pokemonMoves(poke[i]);
		// if this pokemon has the move, add it to the return list
		if (moves.indexOf(move) != -1) {
			hasMove[poke[i]] = pokemon[poke[i]];
		}
	}
	return hasMove;
}
