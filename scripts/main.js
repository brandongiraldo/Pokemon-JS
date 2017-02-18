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
		Make sure its an int, between 5 - 22
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
