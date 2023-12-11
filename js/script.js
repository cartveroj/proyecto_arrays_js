			
// POKEMONS

let dades;
let arrayPokemonsNames = new Array();
let arrayNamesMunicipis = new Array();
let arrayNamesMeteorits = new Array();
let arrayNamesMovies = [];



function getPokemons(){
	// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dades = data.pokemon;	
	
	dades.forEach(element => {
		arrayPokemonsNames.push(element.name);
		
	});
	//console.log(arrayPokemonsNames);
	//console.log(typeof(dades));
	//console.log(dades[0].name)

});
return arrayPokemonsNames;
}



function getMunicipis(){
// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;		
	
	dades.forEach(element=> {
		arrayNamesMunicipis.push(element.municipi_nom);
	}
	);
	//console.table(arrayNamesMunicipis)
	//console.log(dades[0].municipi_nom)
});
return arrayNamesMunicipis;
}



function getMeteoritos(){
	// METEORITS
	fetch("js/data/earthMeteorites.json")
	.then((response) => response.json())
	.then((data) => {
		dades = data;		
		
		dades.forEach( element => {
			arrayNamesMeteorits.push(element.name);
		});
		//console.table(arrayNamesMeteorits);
		//console.log(dades)
		//console.log(dades[0].name)
	});
	return arrayNamesMeteorits;
}



function getMovies(){
	// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;		
	
	dades.forEach( element => {
		arrayNamesMovies.push(element.title);
	});
	//console.table(arrayNamesMovies);
	//console.log(dades)
	//console.log(dades[0].title)
});
return arrayNamesMovies;
}

function objectPadre(pokemon, municipio, meteorito, movie){
	this.pokemon = pokemon;
	this.municipio = municipio;
	this.meteorito = meteorito;
	this.movie = movie;
}

function ejecucionMain() {
    let objetos = [
        getPokemons(),
        getMunicipis(),
        getMeteoritos(),
        getMovies()
    ];

	console.log(objetos);

}

ejecucionMain();


