/**

	INFO/CS 2300 Spring 2017 - Homework 1
	Created By: Batya Zamansky and Brandon Giraldo

	This is main.js, the file (and only file) you will edit for this assignment.

	This file has 5 problems, each outlined in a comment. You must write your solutions
	between //START CODE QX and //END CODE QX for each question.

	The first code in this file is an ajax call to a local resource, pokemon.json. You will need to use
	this again for questions 4 and 5. Feel free to reuse --- START * --- to --- END * --- when 
	building your solutions for those questions.

	Do not edit data/pokemon.json or pokemon.js. Again, this is the only file you will need to edit.

	You can (and are encouraged to) use console.log() to debug your work as you work along. Also check
	the DOM using the inspector to know exactly where your html result is going to be outputted to. Use
	jQuery as nessesary. (exception in question 2 with show/hide functions)

	Though there are not any PHP files in this assignment, you must run it on a 
	server (local on your computer or on the course server) since there is an 
	ajax call to a resource. Most browsers will throw
	an error if you try to load data from an external source while not running on a server. 
	You can read more about that here:

	https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS

	Have fun!

**/

window.onload = function() {
	// --- START OF AJAX CALL ---

	// ajax call to pokemon.json
	var request = $.ajax({
		type: 'GET',
		url: "data/pokemon.json",
		dataType: "json"
	});

	// When the call is complete, we have access to the data
	request.done(function(data) {
		// This is your array of pokemon, the data was converted into an object array
		var pokemonArray = $.map(data, function(value, index) {
    		return [value];
		});
		// show the array of pokemon objects
		console.log(pokemonArray);
		// Loop over the objects in the array
		pokemonArray.forEach(function(item) {
			// making a new instance of the Pokemon object while looping over the pokemon objects from
			// the array. Be sure to look at the properties of each object in the console.
			var pokemon = new Pokemon(item.name, item.weight, item.sprites, item.stats, item.types, "full");
			// jquery to append the html to the .row class, need to call render on pokemon object to get html
			$(".results .row").append(pokemon.render);
		});
	});

	// --- END OF AJAX CALL ---

	/**
		Question 1 - Changing font-size
		10 points 

		Change the font size of the pokemon weight and pokemon item elements
		based on the selected value of #font-select

		target the .item and .weight classes
	**/
	$("#font-select").change(function() {
		// START CODE Q1



		// END CODE Q1


		// ANSWER BELOW
		var font = $("#font-select :selected").val();
		$(".item").css("font-size", font + "px");
		$(".weight").css("font-size", font+ "px");
		// END ANSWER
	});

	/** 
		Question 2 - Show/Hide
		10 points

		Show/hide the all sprite images when the box is checked/unchecked.
		Do not use jQuery show / hide functions, cell text formatting needs to be retained.

		In other words, the sprites should not be 'visible'.
	**/
	$("#hide-sprites").change(function() {
		// START CODE Q2



		// END CODE Q2


		// ANSWER BELOW
		if ($(this).is(":checked")) {
            $(".cell img").css("visibility", "hidden");
        } else {
        	$(".cell img").css("visibility", "visible");
        }
        // END ANSWER
	})

	/**
		Question 3 - Adding a font-size
		15 points

		Add a font size to the select menu if the input is a number.
		You must check that it is a number.
		Look at the DOM to make sure you append the value to the right drop down menu.
		Also validate that it is between 5 - 22, otherwise ignore it completely

		It is OK if the resulting selections do not display in order
	**/
	$("#add-font-size").click(function(){
		// START CODE Q3



		// END CODE Q3


		// ANSWER BELOW
		var size = parseInt($("#fontSizeInput").val());
		console.log(size);
		if (Number.isInteger(size)  && size > 5 && size < 22 ){
			$('#font-select').append('<option value="'+size+'">'+size+' pixels</option>');
		}
		// END ANSWER
	});

	/** 
		Question 4 - Search
		25 points

		Filter by pokemon name. You will need to make an ajax call to pokemon.json
		You need to check the inputed value from search field against the name of 
		each pokemon from the returned ajax call.

		The search should be case insensitive. Searching for "Wa" or "wa" should display Wartortle.

		When search is cleared, show all pokemon as would appear on first load

		Be sure to clear the .row class before appending to the DOM

		Look at --- START * --- to --- END * ---
	**/
	$(".search").keyup(function() {
		// START CODE Q4




		// END CODE Q4
		


		// ANSWER BELOW
		$(".results .row div").remove();

		var name = $(this).val();

		var newRequest = $.ajax({
			type: 'GET',
			url: "data/pokemon.json",
			dataType: "json"
		});

		newRequest.done(function(data) {
			//This is your array of pokemon.
			var pokemonArray = $.map(data, function(value, index) {
	    		return [value];
			});
			//This is how we make the pokemon appear.
			pokemonArray.forEach(function(item) {
				var searchString = $(".search").val();
				//zero or more characters followed by the search string followed by zero or more characters
				var search = new RegExp( "^.*" + searchString + ".*$", 'i');

				//console.log( item.name + " " + search.test(item.name))

				if (search.test(item.name)){
					var pokemon = new Pokemon(item.name, item.weight, item.sprites, item.stats, item.types, "full");
					$(".results .row").append(pokemon.render);
				}
			});
		});
		// END ANSWER
	});

	/** 
		Question 5 - Sort by
		40 points (10 points for each sort)

		For name, alphabetical
		For Weight, largest first
		For Stats, largest sum of all stats first
		For Types, most types first

		You will need to make an ajax call to pokemon.json
		You need to check the inputed value from the DOM 
		against a field (or newly computed field) of the pokemon from the returned call

		Be sure to clear the .row class before appending to the DOM if you use append()

		You should use either a series of if else statments or switch statements to handle
		either of the 4 types of sorting.

		This resource may be helpful in organizing the data
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	**/
	$(".sort-select").change(function() {
		// START CODE Q5




		// END CODE Q5



		// ANSWER BELOW
		$(".results .row div").remove();
		var filter = $(".sort-select :selected").text();

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
		// END ANSWER
	});
}