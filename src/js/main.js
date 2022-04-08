'use strict';

console.log('>> Ready :)');

// ---- CONSTANTES
const inputSearch = document.querySelector('.js_input_search');
const searchBtn = document.querySelector('.js_button');
const searchResult = document.querySelector('.js_result_list');
const favoritesList = document.querySelector('.js_fav_list');
let resultsList = [];
let htmlResult = '';
let favList = [];

// ---- FUNCIONES

// Pintar resultados de búsqueda
function paintListResult() {
  for (const item of resultsList) {
    htmlResult += `<li class="results__item js_results_item" id=${item.idDrink}>`;
    htmlResult += `<h3 class="results__item--name">${item.strDrink}</h3>`;
    if (item.strDrinkThumb !== null) {
      htmlResult += `<img class="cocktail-img" src=${item.strDrinkThumb}>`;
    } else {
      htmlResult += `<img class="cocktail-img" src=https://via.placeholder.com/210x295/ffffff/666666/?text=cocktail>`;
    }
    htmlResult += `</li>`;
  }
  searchResult.innerHTML = htmlResult;
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
  console.log('has hecho click en buscar');
}

/* Para añadir a favoritos:
  1. Crear array para guardar los favoritos
  2. Escuchar click sobre cada elemento li (currentTarget)
  3. Al hacer click, añadir el elemento a la lista
  4. Pintar los resultados en la ul de favoritos
  5. Conseguir que no desaparezcan al hacer otra búsqueda
*/

function manageFavCocktails() {
  const cocktailItems = document.querySelectorAll('.js_results_item');
  for (const cocktail of cocktailItems) {
    cocktail.addEventListener('click', handleFavClick);
  }
}

function paintFavCocktails() {

}

function handleFavClick(event) {
  const cocktailId = event.currentTarget.id;
  console.log(cocktailId);
  paintFavCocktails();
}


// ---- EVENTOS
searchBtn.addEventListener('click', handleSearchClick);
