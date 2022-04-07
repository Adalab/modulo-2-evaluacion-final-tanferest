'use strict';

console.log('>> Ready :)');

// CONSTANTES
const inputSearch = document.querySelector('.js_input_search');
const searchBtn = document.querySelector('.js_button');
const searchResult = document.querySelector('.js_result_list');
//let photo = '';
let resultsList = [];

// FUNCIONES

// Pintar resultados de búsqueda
function paintListResult() {
  let htmlResult = '';
  for (const item of resultsList) {
    htmlResult += `<li>`;
    htmlResult += `<h2>${item.strDrink}</h2>`;
    if (item.strDrinkThumb !== '') {
      htmlResult += `<img src=${item.strDrinkThumb}>`;
    } else {
      htmlResult += `<img src=https://via.placeholder.com/210x295/ffffff/666666/?text=cocktail>`;
    }
    htmlResult += `</li>`;
  }
  searchResult.innerHTML = htmlResult;
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

// EVENTOS
searchBtn.addEventListener('click', handleSearchClick);
