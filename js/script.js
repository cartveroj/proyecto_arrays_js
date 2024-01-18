	
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


let arrayLabels=[];
let arrayDadesGraf = [];
let backgroundColor=[];
let borderColor=[];
//EJERCICIO 0
// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;		
	dades.forEach( element => {
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
	let municipis = [];
	dades.forEach(element=> {
		municipis.push(element.municipi_nom);
	});
	//console.log(municipis.length);
	municipis.forEach( municipi => {
		dataFinal.push(municipi);
	});
});

// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;	
	let movies = [];
	dades.forEach( element => {
		movies.push(element.title);
	});
	movies.forEach(movie => {
		dataFinal.push(movie);
	});
});
	

	// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dades = data.pokemon;	
	let pokemones = [];
	dades.forEach(element => {
		pokemones[contador] = element.name;
		arrayPokemonsType.push(element.type);
		pokemons = {
			id:element.id,
			img:element.img,
			nom:element.name,
			pes:element.weight.slice(0,element.weight.indexOf("k")),
			type: element.type,
		}
		arrayPokemons.push(pokemons);
	});

	pokemones.forEach( (pokemon) =>{
		dataFinal.push(pokemon);
	});

	arrayPokemons.forEach((arryPok) =>{
		arrayPokemonsType.push(arryPok);
	});

	let indice = 0;
	for(a=0; a< arrayPokemonsType.length; a++){
		for(e =0; e < arrayPokemonsType[a].length; e++){
			arrayPokemonsTypeClean[indice] = arrayPokemonsType[a][e];
			indice++;
		}
	}
	
	const result = {};
	arrayPokemonsTypeClean.forEach((value) => {
	result[value] = (result[value] || 0) + 1;
	});
	arrayDadesGraf = Object.values(result);
	console.log(arrayDadesGraf);
		
	arrayLabels = [... new Set(arrayPokemonsTypeClean)];
	console.log(arrayLabels);

	let rgb = "rgba(rrr,ggg,bbb)";
   for(let i=0; i< arrayLabels.length;i++){
	  let rrr= Math.floor(Math.random() * (255 - 0) + 0);
	  let ggg= Math.floor(Math.random() * (255 - 0) + 0);
	  let bbb= Math.floor(Math.random() * (255 - 0) + 0);
	  rgb = `rgba(${rrr},${ggg},${bbb})`;
	  borderColor[i]=rgb;
   }
   console.log(borderColor);

   borderColor.forEach((color)=>{
	backgroundColor.push(color.replace(")", ",0.2)"));
   });
   console.log(backgroundColor);
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
	printGrafico();
	
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
		arrayPokemons.forEach((pokemon)=>{
			if(pokemon.nom.includes(criterio)){
				arrayPokemonsMatch.push(pokemon);
			}
		});
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
	arrayPokemons.forEach((pokemon)=>{
		suma += parseInt(pokemon.pes);
	});
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

function printGrafico(){
	const ctx = document.getElementById('myChart');

	const data = {
		labels: arrayLabels,
		datasets: [{
		label: 'My First Dataset',
		data: arrayDadesGraf,
		backgroundColor: backgroundColor,
		borderColor: borderColor
		}]
		};

		const config = {
			type: 'doughnut',
			data: data,
		  };
		new Chart(ctx,config);
}









