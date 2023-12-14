			
/*Declaracion de variables globales */
let dades;
let dataObject = {name:"",municipi:"",meteorit:"",movie:""}
let dataFinal = [];
let contador = 0;

// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;		
	dades.forEach( element => {
		contador ++
		dataObject = {
			meteorit:element.name, //asignamos los valores a la propiedad del objeto
		} 
		dataFinal.push(dataObject); //añadimos al array 
	});

});
//MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;		
	contador = 0;
	let municipis = [];
	dades.forEach(element=> {
		municipis[contador] = element.municipi_nom;
		contador++
	});
	console.log(municipis.length);
	for(let i=0; i<municipis.length;i++){
		dataFinal[i].municipi = municipis[i]; //asignamos los valores a la propiedad del objeto
	}
});

// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;	
	let movie = [];
	contador = 0;
	dades.forEach( element => {
		movie[contador] = element.title;
		contador++;	
	});
	console.log(movie.length);
	for(let i=0; i<movie.length;i++){
		dataFinal[i].movie = movie[i]; //asignamos los valores a la propiedad del objeto
	}
});
	

	// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dades = data.pokemon;	
	contador =0;
	let pokemon = [];
	dades.forEach(element => {
		pokemon[contador] = element.name;
		contador++;
	});
	console.log(pokemon.length);
	for(let i=0; i<pokemon.length;i++){
		dataFinal[i].pokemon = pokemon[i]; //asignamos los valores a la propiedad del objeto 
	}
	
	console.table(dataFinal);
	
});


	








