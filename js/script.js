	
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

let meteorit = {id:"",name:"",mass:"",recclass:"", year:""};
let arrayMeteoritos =[];

let movie = {title:"",genres:"",year:"",img:"", rating:""};
let arrayMovies =[];

let municipi = {ine:"",municipi_nom:"",comarca_nom:"",provincia_nom:"", nombre_habitants:""};
let arrayMunicipis =[];

let arrayTotal = [
	{Pokemons:[]},{Meteoritos:[]},{Peliculas:[]},{Municipis:[]}
];

let arrayLabels=[];
let arrayDadesGraf = [];
let backgroundColor=[];
let borderColor=[];

let path = "../img/drop_down.png";
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
		meteorit = {
			id:element.id,
			name:element.name,
			mass:element.mass,
			recclass:element.recclass,
			year: element.year,
		}
		arrayMeteoritos.push(meteorit);
		dataFinal.push(dataObject); //añadimos al array 
	});
	//console.log(arrayMeteoritos);

});
//MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;		
	let municipis = [];
	dades.forEach(element=> {
		municipis.push(element.municipi_nom);
		municipi = {
			ine:element.ine,
			municipi_nom:element.municipi_nom,
			comarca_nom:element.grup_comarca.comarca_nom,
			provincia_nom:element.grup_provincia.provincia_nom,
			nombre_habitants:element.nombre_habitants
		};
		arrayMunicipis.push(municipi);
	});
	//console.log(municipis.length);
	municipis.forEach( municipi => {
		dataFinal.push(municipi);
	});
	//console.log(arrayMunicipis);
});

// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;	
	let movies = [];
	dades.forEach( element => {
		movies.push(element.title);
		movie = {
			title:element.title,
			genres:element.genres,
			year:element.year.toString(),
			img:element.url,
			rating:element.rating
		}
		arrayMovies.push(movie);
	});
	movies.forEach(movie => {
		dataFinal.push(movie);
	});
	//console.log(arrayMovies)
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
  // printList(arrayPokemons);
  arrayTotal.forEach((tabla)=>{
	const clave = Object.keys(tabla)[0]; // Obtener la clave del objeto interno

    switch (clave) {
        case 'Pokemons':
            tabla[clave] = arrayPokemons;
            break;
        case 'Meteoritos':
            tabla[clave] = arrayMeteoritos;
            break;
        case 'Peliculas':
            tabla[clave] = arrayMovies;
            break;
        case 'Municipis':
            tabla[clave] = arrayMunicipis;
            break;
	}
	// tabla['Pokemons']= arrayPokemons;
	// tabla['Meteoritos']= arrayMeteoritos;
	// tabla['Peliculas']= arrayMovies;
	// tabla['Municipis']= arrayMunicipis;
  });
 
  console.log(arrayTotal);
});

function formatFecha(fecha){
	let fechaObjeto = new Date(fecha)
	const fechaFormateada = fechaObjeto.toISOString().split("T")[0];
	return fechaFormateada;
}
//EJERCICIO 1
function chooseTable(){
	let tabla = document.getElementById("tablas").value;
	switch (tabla){
		case 'Pokemons':
			printList(arrayPokemons);
			break;
		case 'Peliculas':
			printList(arrayMovies);
			break;
		case 'Municipis':
			printList(arrayMunicipis);
			break;
		case 'Meteoritos':
			printList(arrayMeteoritos);
			break;
	}
}

function printList(array){
	
	let tableName = document.getElementById("tablas").value;
	let headers = Object.keys(array[0]);

	let tabla = `<table id="myTabla${tableName}" border=1>`;
    // Encabezados de la tabla
    tabla += "<tr>";
    for (let i = 0; i < headers.length ; i++) {
        tabla += `<td>${headers[i]}<button class="btnDown" id="down"><img class=${tableName} src=${path} id="${headers[i]}" onclick="changeImage(this)"></button></td>`;
    }
    tabla += "</tr>";
	//contenido de la tabla

   for (var i = 0; i < array.length; i++) {
		tabla += `<tr>`;
        for(let j = 0; j < headers.length; j++){
			tabla += "<td>";
			if( headers[j] == "img"){
				tabla += `<img src="${array[i][headers[j]]}">`;
			}else{
				tabla += `<p>${array[i][headers[j]]}</p>`;
            	tabla += "</td>";
			}
            
        }
        tabla +=`</tr>`
   }
   tabla += "</table>"
  
    document.getElementById('tablasmix').innerHTML = tabla;
	printGrafico();
	
}

function changeImage(element){

	console.log(element)
	let orden = "asc";
	let tabla = element.className;
	let filtro = element.id;
	let isDropUp = element.src.match('drop_up');
	//console.log(isDropUp);
	if (isDropUp) {
		path = "../img/drop_down.png";
		orden = "asc";
	} else {
		path = "../img/drop_up.png";
		orden = "desc";
	}
	orderList(orden,filtro,tabla);
		

}
function refreshPage(){
	window.location.reload();
}



function orderList(orden,filtro,tabla){
	const sortOrder = orden === "asc" ? 1 : -1;
	let arrayObjectos = arrayTotal.find(obj => obj.hasOwnProperty(`${tabla}`));
	let arraySorted= arrayObjectos[tabla].sort((a,b)=>{
		if (a[filtro] < b[filtro]) {
            return -1 * sortOrder;
        }
        if (a[filtro] > b[filtro]) {
            return 1 * sortOrder;
        }
        return 0;
	});
	printList(arraySorted);
}



function searchList(){

	let tabla = document.getElementById("tablas").value;

	let inputSearch = document.getElementById('txtSearch');
	inputSearch.addEventListener('input', (e) => {
	console.log(inputSearch.value)
	});

	let criterio = inputSearch.value;
	console.log(criterio);
	let arrayMatch =[];
	if(criterio.length>0){
		let arrayObjectos = arrayTotal.find(obj => obj.hasOwnProperty(`${tabla}`));
		arrayObjectos[tabla].filter( obj => {
			let valores = Object.values(obj);
			console.log(typeof(criterio));
			for(let valor of valores){
				console.log(valor);
				if(typeof valor === 'string' && valor.toLowerCase().includes(criterio.toLowerCase())){
					arrayMatch.push(obj);
				} else if (Array.isArray(valor) && valor.some(v => typeof v === 'string' && v.toLowerCase().includes(criterio.toLowerCase()))) {
					arrayMatch.push(obj);
				}
			}
		});
		console.log(arrayMatch);
		if(arrayMatch.length > 0){
			printList(arrayMatch);
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


function printGrafico(){
	const ctx = document.getElementById('myChart');
	if (ctx) {
		var chart = Chart.getChart(ctx);
		if (chart) {
			chart.destroy();
		}
	}
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









