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