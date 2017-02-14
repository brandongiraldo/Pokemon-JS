window.onload = function() {
	var request = $.ajax({
		type: 'GET',
		url: "data/pokemon.json",
		dataType: "json"
	});

	request.done(function(data) {
		//This is your array of pokemon.
		var array = $.map(data, function(value, index) {
    		return [value];
		});
		console.log(array);
		//This is how we make the pokemon appear.
		array.forEach(function(item) {
			var pokemon = new Pokemon(item.name, item.weight, item.sprites, item.stats, item.types, "full");
			$(".results .row").append(pokemon.render);
		});
	});

	/**
		Question 1
		10 points
		Easy 
		Change the size of the weight and items elements
		all .items and .weight classes
	**/
	$(".font-select").change(function() {
		var font = $(".font-select :selected").text();
		$(".item").css("font-size", font + "px");
		$(".weight").css("font-size", font+ "px");
	});

	/** 
		Question 2
		10 points
		Easy 
		Show/hide the sprite images when the box is checked.
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
		Question 3
		15 points
		Moderate
		Add a font size to the select menu if the input is a number.
	**/
	$("#addFontSize").click(function(){
		var size = parseInt($("#fontSizeInput").val());
		if (Number.isInteger(size)){
			$('.custom-select').append('<option value="'+size+'">'+size+'</option>');
		}
	});

	/** 
		25 points
		Hard 
		Filter by name
		When search is cleared, show all pokemon as would appear on first load
	**/
	$(".search").keyup(function() {
		// when cleared must also reset cells
		$(".results .row div").remove();

		var name = $(this).val();

		var newRequest = $.ajax({
			type: 'GET',
			url: "data/pokemon.json",
			dataType: "json"
		});

		newRequest.done(function(data) {
			//This is your array of pokemon.
			var array = $.map(data, function(value, index) {
	    		return [value];
			});
			//This is how we make the pokemon appear.
			array.forEach(function(item) {
				if (item.name.indexOf(name) != -1 || name == ''){
					var pokemon = new Pokemon(item.name, item.weight, item.sprites, item.stats, item.types, "full");
					$(".results .row").append(pokemon.render);
				}
			});
		});

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

		$(".results .row div").remove();
		var filter = $(".filter-select :selected").text();

		console.log(filter);
		var newRequest = $.ajax({
			type: 'GET',
			url: "data/pokemon.json",
			dataType: "json"
		});

		// This resource may be helpful in organizing the data
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

		newRequest.done(function(data) {
			//This is your array of pokemon.
			var array = $.map(data, function(value, index) {
	    		return [value];
			});
			console.log(array);

			if (filter == "Name"){
				function compareString(a, b) {
				  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
				  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
				  if (nameA < nameB) {
				    return -1;
				  }
				  if (nameA > nameB) {
				    return 1;
				  }
				  // names must be equal
				  return 0;
				}
				array.sort(compareString);
			}
			else if (filter == "Weight"){
				function compareWeight(a,b){
					return b.weight-a.weight;
				}
				array.sort(compareWeight);
			}
			else if (filter == "Stats"){
				function compareStats(a,b){
					var aStats = 0;
					var bStats = 0;
					for (var i = a.stats.length - 1; i >= 0; i--) {
						aStats += a.stats[i]['base_stats'];
					}
					for (var i = b.stats.length - 1; i >= 0; i--) {
						bStats += b.stats[i]['base_stats'];
					}
					return bStats - aStats;
				}	
				array.sort(compareStats);
			}
			else if (filter == "Types"){
				function compareTypes(a,b){
					var aTypes = a.types.length;
					var bTypes = b.types.length;
					return bTypes-aTypes;
				}
				array.sort(compareTypes);
			}

			//This is how we make the pokemon appear.
			array.forEach(function(item) {
				var pokemon = new Pokemon(item.name, item.weight, item.sprites, item.stats, item.types, "full");
				$(".results .row").append(pokemon.render);	
			});
		});
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
