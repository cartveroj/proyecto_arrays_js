	
/*Declaracion de variables globales */
let dades;
let dataObject = {name:"",municipi:"",meteorit:"",movie:""};
let dataFinal = [];
let contador = 0;

let pokemons = {id:"",img:"",nom:"",pes:"", type:""};
let arrayPokemons = [];
let equivalencia = "kg";
let arrayPokemonsType = [];
let arrayPokemonsTypeClean = [];
let uniqueTypes=[];
//EJERCICIO 0
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
		arrayPokemonsType.push(element.type);
		pokemons = {
			id:element.id,
			img:element.img,
			nom:element.name,
			pes:element.weight.slice(0,element.weight.indexOf("k")),
			type: element.type,
		}
		//pokemons = pokemons.pes.slice(0).pokemons.pes.indexOf("k");
		arrayPokemons.push(pokemons);

		contador++;
	});
	console.log(pokemon.length);
	
	for(let i=0; i<pokemon.length;i++){
		dataFinal[i].pokemon = pokemon[i]; //asignamos los valores a la propiedad del objeto
	}
	for(let e=0; e< arrayPokemons.length; e++){
		arrayPokemonsType[e] = arrayPokemons[e].type; 
		
		//console.log(arrayPokemonsType[e]);
	}
	let indice = 0;
	for(a=0; a< arrayPokemonsType.length; a++){
		for(e =0; e < arrayPokemonsType[a].length; e++){
			arrayPokemonsTypeClean[indice] = arrayPokemonsType[a][e];
			indice++;
		}
	}
		const result = {};

	arrayPokemonsTypeClean.forEach((value) => {
		console.log(value);
	result[value] = (result[value] || 0) + 1;

	});
	console.log(result);
		
	uniqueTypes = [... new Set(arrayPokemonsTypeClean)];
	console.log(uniqueTypes);
	// let cantidadTypes = [];
	// let numeroPokemos=0;
	// for(let b =0; b< uniqueTypes.length; b++){
	// 	for(let c=0; c < arrayPokemons.length; c++){
	// 		let match = uniqueTypes[b].includes(arrayPokemons[c].type);
	// 		console.log(match);
	// 		if(match){
	// 			numeroPokemos++;
	// 			cantidadTypes.push(numeroPokemos);
	// 		}
	// 		numeroPokemos=0;
	// 	}
	// }
	// console.log(cantidadTypes);
	//console.log(arrayPokemonsType[0]);
	//console.table(dataFinal);
	

});

//EJERCICIO 1
function printList(){
	let titles = ["id","img","nom","pes"];
	let tabla = "<table id = \"miTablaPokemons\" border=1>" ;
	
   for (var i = 0; i < arrayPokemons.length; i++) {
		tabla += `<tr>`;
		
        for(let j = 0; j < 4; j++){
			if(i==0){
				tabla += `<td>${titles[j]}</td>`
			}else{
				tabla += `<td>`
				if(j==0){
					tabla+=`<p>${arrayPokemons[i-1].id}</p>`
				}else if(j==1){
					tabla += ` <img src="${arrayPokemons[i-1].img}" >`
				}else if(j==2){
					tabla+=`<p id='nom'>${arrayPokemons[i-1].nom}</p>`
				}else{
					tabla += `<p>${arrayPokemons[i-1].pes + equivalencia}</p>`
				}
				tabla += `</td>`
			}
            
        }
        tabla +=`</tr>`
   }

   tabla += "</table>"
  
    document.getElementById('tablaPokemons').innerHTML = tabla;
}

function refreshPage(){
	window.location.reload();
}

function orderList(asc){
	console.log(asc);
	if(asc === "asc"){
		
		let arrayPokemonsAsc = arrayPokemons.sort((a,b)=>{
			return a.nom.localeCompare(b.nom);
		});
		printTable(arrayPokemonsAsc);

	}else{
		let arrayPokemonsDesc = arrayPokemons.sort((a,b)=>{
			return b.nom.localeCompare(a.nom);
		});
		
		printTable(arrayPokemonsDesc);


	}
}
function searchList(){
	let criterio = prompt("Busqueda por nombre, introduzca el criterio: ");
	let arrayPokemonsMatch = [];
	if(criterio.length>0){
		for(let i=0; i<arrayPokemons.length ; i++){
			let nom = arrayPokemons[i].nom;
			match = nom.includes(criterio);
			if(match){
				console.log(arrayPokemons[i]);
				arrayPokemonsMatch.push(arrayPokemons[i]);
				
			}
		}
		if(arrayPokemonsMatch.length >0){
			printTable(arrayPokemonsMatch);
		}else{
			alert("No hay ninguna coincidencia con esos criterios de busqueda");			
		}
		
	}else{
		alert("Introduzca algún valor de busqueda");
	}
}
function calcMitjana(){

	let suma = 0;
	let media = 0;
	for(let i=0; i< arrayPokemons.length; i++){
		suma += parseInt(arrayPokemons[i].pes);
	}
	media = (suma/arrayPokemons.length).toFixed(2);
	alert(`La media es: ${media+ equivalencia}`);

}
function printTable(array){
let titles = ["id","img","nom","pes"];
		let tabla = "<table id = \"miTablaPokemons\" border=1>" ;
	   for (var i = 0; i< array.length+1; i++) {
			tabla += `<tr>`;
			
			for(let j = 0; j < 4; j++){
				if(i==0){
					tabla += `<td>${titles[j]}</td>`
				}else{
					tabla += `<td>`
					if(j==0){
						tabla+=`<p>${array[i-1].id}</p>`
					}else if(j==1){
						tabla += ` <img src="${array[i-1].img}" >`
					}else if(j==2){
						tabla+=`<p id='nom'>${array[i-1].nom}</p>`
					}else{
						tabla += `<p>${arrayPokemons[i-1].pes + equivalencia}</p>`
					}
					tabla += `</td>`
				}
				
			}
			tabla +=`</tr>`
	   }
	
	   tabla += "</table>"
	  
		document.getElementById('tablaPokemons').innerHTML = tabla;
}

//CHART

function quitandoDuplicadosTipo(array){
	for(let i=0; i<=array.length; i++){
		for(let e=0; e<= array[i].length; e++){
			let tipo = array[i][e].type;
		}
	}
}

const data = {
	labels: [
	  'Red',
	  'Green',
	  'Yellow',
	  'Grey',
	  'Blue'
	],
	datasets: [{
	  label: 'My First Dataset',
	  data: uniqueTypes,
	  backgroundColor: [
		'rgb(255, 99, 132)',
		'rgb(75, 192, 192)',
		'rgb(255, 205, 86)',
		'rgb(201, 203, 207)',
		'rgb(54, 162, 235)'
	  ]
	}]
  };
new Chart(
    document.getElementById('myChart'),
    {
      type: 'bar',
      data: {
        labels: arrayPokemons.map(row => row.pes),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: arrayPokemons.map(row => row.id)
          }
        ]
      }
    }
  );

	








