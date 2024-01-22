	/*Logica de js de tablas empleando arrays */

/*Declaracion de variables globales */
let dades;
let dataObject = {name:"",municipi:"",meteorit:"",movie:""};
let dataFinal = [];
let contador = 0;

let pokemons = {id:"",img:"",nom:"",pes:"", type:""};
let arrayPokemons = [];

let meteorit = {id:"",name:"",mass:"",recclass:"", year:""};
let arrayMeteoritos =[];

let movie = {title:"",genres:"",year:"",img:"", rating:""};
let arrayMovies =[];

let municipi = {ine:"",municipi_nom:"",comarca_nom:"",provincia_nom:"", nombre_habitants:""};
let arrayMunicipis =[];

let arrayTotal = [
	{Pokemons:[]},{Meteoritos:[]},{Peliculas:[]},{Municipis:[]}
];
/*CHAR */
let arrayPokemonsTipos = [];
let arrayPokemonsTiposSorted = [];
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
			mass:(element.mass != null)?element.mass :"0",
			recclass:element.recclass,
			year: element.year.toString().slice(0,element.year.toString().indexOf("T")),/*Modificamos los datos del string para cambiar el formato yy/mm/dd */
		}
		arrayMeteoritos.push(meteorit);
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
		municipi = {
			ine:element.ine,
			municipi_nom:element.municipi_nom,
			comarca_nom:element.grup_comarca.comarca_nom,
			provincia_nom:element.grup_provincia.provincia_nom,
			nombre_habitants:element.nombre_habitants
		};
		arrayMunicipis.push(municipi);
	});
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
});
	

	// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dades = data.pokemon;	
	let pokemones = [];
	dades.forEach(element => {
		pokemones[contador] = element.name;
		arrayPokemonsTipos.push(element.type);
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
		arrayPokemonsTipos.push(arryPok);
	});

	let indice = 0;
	for(a=0; a< arrayPokemonsTipos.length; a++){
		for(e =0; e < arrayPokemonsTipos[a].length; e++){
			arrayPokemonsTiposSorted[indice] = arrayPokemonsTipos[a][e];
			indice++;
		}
	}
	/*filtramos los valores para sacar un array de tipos sin duplicados */
	const result = {};
	arrayPokemonsTiposSorted.forEach((value) => {
	result[value] = (result[value] || 0) + 1;
	});
	arrayDadesGraf = Object.values(result);
	arrayLabels = [... new Set(arrayPokemonsTiposSorted)];

	/*bucle que forma el array de arrayLabels */
	let rgb = "rgba(rrr,ggg,bbb)";
   for(let i=0; i< arrayLabels.length;i++){
	  let rrr= Math.floor(Math.random() * (255 - 0) + 0);
	  let ggg= Math.floor(Math.random() * (255 - 0) + 0);
	  let bbb= Math.floor(Math.random() * (255 - 0) + 0);
	  rgb = `rgba(${rrr},${ggg},${bbb})`;
	  borderColor[i]=rgb;
   }

   borderColor.forEach((color)=>{
	backgroundColor.push(color.replace(")", ",0.2)"));
   });
/*Bucle genera un array con clave - valor */
  arrayTotal.forEach((tabla)=>{
	const clave = Object.keys(tabla)[0];
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
  });
 
});


//EJERCICIO 1

// function inicializarPagina() {
// 	// Deshabilitar los botones al cargar la página
// 	document.getElementById('media').disabled = true;
// 	document.getElementById('refresh').disabled = true;
// 	document.getElementById('search').disabled = true;
// 	document.getElementById('grafico').disabled = true;
// }

//funcion que inicia la tabla segun el valor seleccionado
//inicialmente inicia deshabilitado, solo se activa si selecciona una tabla
function chooseTable(){

	const selectOpciones = document.getElementById('tablas');
	const btnMedia = document.getElementById('media');
	const btnRefresh = document.getElementById('refresh');
	const btnSearch = document.getElementById('search');
	const btnGrafico = document.getElementById('grafico');
	//verificamos que el valor se diferente a "default"
	let seleccion = selectOpciones.value !== "default";
	btnMedia.disabled = !seleccion;
	btnRefresh.disabled = !seleccion;
	btnSearch.disabled = !seleccion;
	btnGrafico.disabled = !seleccion;

	//segun el valor seleccionado pasamos el array correspondiente a la funcion printList
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

//Funcion que segun el tipo de array printa la tabla
function printList(array){
	let tableName = document.getElementById("tablas").value;
	let headers = Object.keys(array[0]); //recuperamos las keys de los objetos para poner en los encabezados

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
	
	
}

//funcion que se encarga de cambiar la imagen si se selecciona cambia 
//de ascendente a descendente y el filtro que es por el header que se selecciona 
function changeImage(element){
	let orden = "asc";
	let filtro = element.id; // header -> id/nom/
	let isDropUp = element.src.match('drop_up');
	if (isDropUp) {
		path = "../img/drop_down.png";
		orden = "asc";
	} else {
		path = "../img/drop_up.png";
		orden = "desc";
	}
	orderList(orden,filtro);
		

}

//funcion que se encarga de refrescar la página
function refreshPage(){
	window.location.reload();
}


//Funcion que recibe si el orden si es asc o desc junto con el parametro de la columna 
function orderList(orden,filtro){
	let tabla = document.getElementById("tablas").value;
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


//funcion que se encarga de buscar segun un criterio introducido 
function searchList(){
	let tabla = document.getElementById("tablas").value;
	let inputSearch = document.getElementById('txtSearch');
	inputSearch.addEventListener('input', (e) => {
	console.log(inputSearch.value)
	});

	let criterio = inputSearch.value;
	let arrayMatch =[];
	//verificamos que se introduzca algun valor en el buscador 
	if(criterio.length>0){
		let arrayObjectos = arrayTotal.find(obj => obj.hasOwnProperty(`${tabla}`)); // filtramos por el tipo de tabla los arrays
		arrayObjectos[tabla].filter( obj => {
			let valores = Object.values(obj);
			for(let valor of valores){ //recorremos el array
				if(typeof valor === 'string' && valor.toLowerCase().includes(criterio.toLowerCase())){ // verificamos que sea string
					arrayMatch.push(obj);
				} else if (Array.isArray(valor) && valor.some(v => typeof v === 'string' && v.toLowerCase().includes(criterio.toLowerCase()))) { // hace busquedas si contiene array dentro de las propiedades
					arrayMatch.push(obj);
				}
			}
		});
		if(arrayMatch.length > 0){
			printList(arrayMatch); // con los valores en coincidencia mostramos el array 
		}else{
			alert("No hay ninguna coincidencia con esos criterios de busqueda");			
		}
		
	}else{
		alert("Introduzca algún valor de busqueda");
	}
}

//Funcion que se encarga de calcular la media de ciertas propiedades de los objetos
//de la tabla seleccionada
function calcMitjana(){
	let tabla = document.getElementById("tablas").value;
	let suma = 0;
	let media = 0;
	let criterio ="";
	switch (tabla){
		case 'Pokemons':
			arrayPokemons.forEach((pokemon)=>{
				suma += parseInt(pokemon.pes); //segun el peso
			});
			media = (suma/arrayPokemons.length).toFixed(2);
			criterio= "pes";
			break;
		case 'Peliculas':
			arrayMovies.forEach((movie)=>{
				suma += parseInt(movie.rating);//segun el rating
			});
			media = (suma/arrayMovies.length).toFixed(2);
			criterio= "rating";
			break;
		case 'Municipis':
			arrayMunicipis.forEach((municipi)=>{
				suma += parseInt(municipi.nombre_habitants); //segun numero de habitantes
			});
			media = (suma/arrayMunicipis.length).toFixed(2);
			criterio= "numero de habitantes";
			break;
		case 'Meteoritos':
			arrayMeteoritos.forEach((meteoro)=>{
				suma += parseInt(meteoro.mass); //segun la masa
			});
			media = (suma/arrayMeteoritos.length).toFixed(2);
			criterio= "masa";
			break;
	}
	
	//notificamos a traves del alert
	alert(`${tabla} la media de ${criterio} es: ${media}`);

}

//Funcion que se encarga de mostrar el grafico de pokemons 
//empleando la libreria de Chart.js
function printGrafico(){
	document.querySelector("table").innerHTML="";
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
		label: 'My First Dataset Pokemons',
		data: arrayDadesGraf,
		backgroundColor: backgroundColor,
		borderColor: borderColor
		}]
		};

		const config = {
			type: 'polarArea',
			data: data,
		  };
		new Chart(ctx,config);
}









