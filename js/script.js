	
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
   printList(arrayPokemons);
});

//EJERCICIO 1
function printList(array){
	let titles = ["id","img","nom","pes"];
	let tabla = "<table id = \"miTablaPokemons\" border=1>" ;
	
   for (var i = 0; i < array.length+1; i++) {
		tabla += `<tr>`;
		
        for(let j = 0; j < 4; j++){
			if(i==0){
				tabla += `<td>${titles[j]}<button class="btnDown" id="down" ><img src=${path} id="${titles[j]}" onclick="changeImage(this)"></button></td>`
			}else{
				tabla += `<td>`
				if(j==0){
					tabla+=`<p>${array[i-1].id}</p>`
				}else if(j==1){
					tabla += ` <img src="${array[i-1].img}" >`
				}else if(j==2){
					tabla+=`<p id='nom'>${array[i-1].nom}</p>`
				}else{
					tabla += `<p>${array[i-1].pes + equivalencia}</p>`
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

function changeImage(element){
	//console.log(element);
	let orden = "asc";
	let titles = ["id","nom","pes"];
	titles.forEach((title)=>{
		if(title == element.id){
			let image = document.getElementById(`${title}`);
			let isDropUp = image.src.match('drop_up');
			console.log(isDropUp);
			if (isDropUp && title == element.id) {
				path = "../img/drop_down.png";
                orden = "asc";
            } else {
				path = "../img/drop_up.png";
                orden = "desc";
            }
			orderList(orden,title);
		}
	});
}
function refreshPage(){
	window.location.reload();
}



function orderList(orden, title){

	const sortOrder = orden === "asc" ? 1 : -1;
	let arrayPokemonsSorted= arrayPokemons.sort((a,b)=>{
		if (a[title] < b[title]) {
            return -1 * sortOrder;
        }
        if (a[title] > b[title]) {
            return 1 * sortOrder;
        }
        return 0;
	});
	printList(arrayPokemonsSorted);
}



function searchList(){
	let inputSearch = document.getElementById('txtSearch');
	inputSearch.addEventListener('input', (e) => {
	console.log(inputSearch.value)
	});
	let criterio = inputSearch.value;
	console.log(criterio);
	let arrayPokemonsMatch = [];
	if(criterio.length>0){
		arrayPokemons.forEach((pokemon)=>{
			if(pokemon.nom.includes(criterio)){
				arrayPokemonsMatch.push(pokemon);
			}
		});
		if(arrayPokemonsMatch.length >0){
			printList(arrayPokemonsMatch);
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









