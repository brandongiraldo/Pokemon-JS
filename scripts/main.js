//filter, search, and pull 

window.onload = function() {
	var pokemon = pullPokemon(100);

	$('#tmp').text(pokemon);
}

// pull x random pokemon from the API
function pullPokemon(){
	var pokemon = [];
	$.getJSON("https://info2300.coecis.cornell.edu/users/bz82sp17/www/hw1/pokemon.json", function(data){
		console.log(data);
	});

	// var async_request=[];
	// var responses=[];
	// for(var i = 1; i <= x; i++)
	// {
	//     // you can push  any aysnc method handler
	//     async_request.push($.ajax({
	//         url:'http://pokeapi.co/api/v2/pokemon/'+i, // your url
	//         method:'post', // method GET or POST
	//         success: function(data){
	//             console.log('success of ajax response')
	//             responses.push(data);
	//         }
	//     }));
	// }


	// $.when.apply(null, async_request).done( function(){
	//     // all done
	//     console.log('all request completed')
	//     console.log(responses);
	// });


	// var settings = {
	//     "async": true,
	//     "crossDomain": true,
	//     "url": "http://pokeapi.co/api/v2/pokemon/"+x,
	//     "method": "GET",
	//     "headers": {},
	// }

	// $.ajax(settings).done(function (response) {
	//     return(response);
	// });
}
