'use strict';

console.log('>> Ready :)');

// ---- CONSTANTES
const inputSearch = document.querySelector('.js_input_search');
const searchBtn = document.querySelector('.js_button');
const searchResult = document.querySelector('.js_result_list');
const favoritesList = document.querySelector('.js_fav_list');
const altImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=cocktail';
let resultsList = [];
let favList = [];
// ---- FUNCIONES

// Pintar resultados de búsqueda
function paintListResult() {
  let htmlResult = '';
  for (const item of resultsList) {
    const favDrink = favList.findIndex((fav) => {
      return fav.idDrink === item.id;
    });
    console.log(favDrink);
    let favClass = '';
    if (favDrink === -1) {
      favClass = '';
    } else {
      favClass = 'fav-cocktail';
    }
    htmlResult += `<li class="${favClass} results__item js_results_item" id=${item.idDrink}>`;
    htmlResult += `<h3 class="results__item--name">${item.strDrink}</h3>`;
    if (item.strDrinkThumb !== null) {
      htmlResult += `<img class="cocktail-img" src=${item.strDrinkThumb}>`;
    } else {
      htmlResult += `<img class="cocktail-img" src=${altImage}>`;
    }
    htmlResult += `</li>`;
  }
  searchResult.innerHTML = htmlResult;
  manageFavCocktails();
}

/* Para añadir a favoritos:
  1. Crear array para guardar los favoritos-- x
  2. Escuchar click sobre cada elemento li (currentTarget)-- x
  3. Al hacer click, añadir el elemento a la lista --x
  4. Pintar los resultados en la ul de favoritos -- x
  5. Conseguir que no desaparezcan al hacer otra búsqueda --x
*/

function paintFavCocktails() {
  let htmlFav = '';
  for (const favItem of favList) {
    htmlFav += `<li class="fav-cocktail results__item js_results_item" id=${favItem.idDrink}>`;
    htmlFav += `<h3 class="results__item--name">${favItem.strDrink}</h3>`;
    if (favItem.strDrinkThumb !== null) {
      htmlFav += `<img class="cocktail-img" src=${favItem.strDrinkThumb}>`;
    } else {
      htmlFav += `<img class="cocktail-img" src=${altImage}>`;
    }
    htmlFav += `</li>`;
  }
  favoritesList.innerHTML = htmlFav;
  manageFavCocktails();
}

// Petición de los datos al api
function getCocktailData() {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      resultsList = data.drinks;
      console.log(resultsList);
      paintListResult();
    });
}

// Función manejadora de botón: buscar
function handleSearchClick(event) {
  event.preventDefault();
  getCocktailData();
}
// Función manejadora para bebidas favoritas
function handleFavClick(event) {
  const selectedCocktail = event.currentTarget.id;
  console.log(selectedCocktail);
  // Busco en el resultado de búsqueda el ELEMENTO seleccionado
  const clickedDrink = resultsList.find((fav) => {
    return fav.idDrink === selectedCocktail;
  });
  // Compruebo si el elemento está en la lista de favoritos
  const favDrink = favList.findIndex((fav) => {
    return fav.idDrink === selectedCocktail;
  });
  // Si no lo está, lo añado a la lista y si lo está, lo elimino
  if (favDrink === -1) {
    favList.push(clickedDrink);
  } else {
    favList.splice(favDrink, 1);
  }
  paintFavCocktails();
  paintListResult();
}

// ---- EVENTOS ---- //
searchBtn.addEventListener('click', handleSearchClick);
// Recorrer el array para escuchar click sobre cada uno
function manageFavCocktails() {
  const cocktailItems = document.querySelectorAll('.js_results_item');
  for (const cocktail of cocktailItems) {
    cocktail.addEventListener('click', handleFavClick);
  }
}
