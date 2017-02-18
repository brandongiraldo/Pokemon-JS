/**
	
	This is main.js, the file (and only file) you will edit to test your work.

	This file has 5 problems, each outlined in a comment. You must write your solutions
	between //START CODE HERE and //END CODE HERE for each question.

	Right below this is an ajax call to a local resource, pokemon.json. You will need to use
	this again for questions 4 and 5. Feel free to use lines 15 - 37 when building your solutions
	for those questions.

	Do not edit pokemon.json or pokemon.js. Again, this is the only file you will need to edit.

**/

window.onload = function() {
	// ajax call to pokemon.json
	var request = $.ajax({
		type: 'GET',
		url: "data/pokemon.json",
		dataType: "json"
	});

	// When the call is complete, we have access to the data
	request.done(function(data) {
		// This is your array of pokemon, the data was converted into an object array
		var array = $.map(data, function(value, index) {
    		return [value];
		});
		// show the array of pokemon objects
		console.log(array);
		// Loop over the objects in the array
		array.forEach(function(item) {
			// making a new instance of the Pokemon object while looping over the pokemon objects from
			// the array. Be sure to look at the properties of each object in the console.
			var pokemon = new Pokemon(item.name, item.weight, item.sprites, item.stats, item.types, "full");
			// jquery to append the html to the .row class, need to call render on pokemon object to get html
			$(".results .row").append(pokemon.render);
		});
	});

	/**
		Question 1 - Change font-size
		10 points 
		Change the size of the weight and items elements
		target the .items and .weight class
	**/
	$(".font-select").change(function() {
		// START CODE Q1

		// END CODE Q1
		var font = $(".font-select :selected").text();
		$(".item").css("font-size", font + "px");
		$(".weight").css("font-size", font+ "px");
	});

	/** 
		Question 2 - Show/Hide
		10 points 
		Show/hide the sprite images when the box is checked/unchecked.
		Do not use jQuery show / hide functions, cell text formatting needs to be retained.
	**/
	$(".toggle-sprites").change(function() {
		// START CODE Q2

		// END CODE Q2
		if ($(this).is(":checked")) {
            $(".cell img").css("visibility", "hidden");
        } else {
        	$(".cell img").css("visibility", "visible");
        }
	})

	/**
		Question 3 - Adding a font-size
		15 points
		Add a font size to the select menu if the input is a number.
		Look at the DOM to make sure you append the value to the right drop down.
		Make sure its an int, validate that it is between 5 - 22, otherwise ignore it
	**/
	$("#addFontSize").click(function(){
		// START CODE Q3

		// END CODE Q3
		var size = parseInt($("#fontSizeInput").val());
		if (Number.isInteger(size)){
			$('.custom-select').append('<option value="'+size+'">'+size+'</option>');
		}
	});

	/** 
		Question 4 - Search
		25 points
		Filter by pokemon name. You will need to make an ajax call to pokemon.json
		You need to check the inputed value from the DOM against the name of each pokemon
		from the returned ajax call.

		When search is cleared, show all pokemon as would appear on first load

		Be sure to clear the .row class before appending to the DOM
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
		Question 5 - Sort by
		40 points (10 points for each sort)
		For name, alphabetical
		For Weight, largest first
		For Stats, largest sum first
		For Types, most types first

		You will need to make an ajax call to pokemon.json
		You need to check the inputed value from the DOM 
		against a field (or newly computed field) of the pokemon from the returned call

		Be sure to clear the .row class before appending to the DOM

		You should use either a series of if else statments or switch statements to handle
		either of the 4 types of sorting.
	**/
	$(".filter-select").change(function() {

		$(".results .row div").remove();
		var filter = $(".filter-select :selected").text();

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
