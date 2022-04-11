'use strict';

// ---- CONSTANTES
const inputSearch = document.querySelector('.js_input_search');
const searchBtn = document.querySelector('.js_button');
const searchResult = document.querySelector('.js_result_list');
const favoritesList = document.querySelector('.js_fav_list');
const altImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=cocktail';
const resetBtn = document.querySelector('.js_reset_button');
const savedDrinks = JSON.parse(localStorage.getItem('favCocktails'));
let resultsList = [];
let favList = [];

// ---- FUNCIONES
// Petición de los datos al api
function getCocktailData() {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      resultsList = data.drinks;
      paintListResult();
    });
}

// Pintar resultados de búsqueda
function paintListResult() {
  let htmlResult = '';
  for (const item of resultsList) {
    const favDrink = favList.findIndex((fav) => {
      // Aquí hay que buscar el id en los datos de la api
      return fav.idDrink === item.idDrink;
    });
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
  addFavCocktails();
}

// Pintar lista de favoritos
function paintFavCocktails() {
  let htmlFav = '';
  for (const favItem of favList) {
    htmlFav += `<li class="fav-cocktail results__item js_results_item" id="${favItem.idDrink}">`;
    htmlFav += `<button class="xbutton js_fav_remove">x</button>`;
    htmlFav += `<h3 class="results__item--name">${favItem.strDrink}</h3>`;
    if (favItem.strDrinkThumb !== null) {
      htmlFav += `<img class="cocktail-img" src=${favItem.strDrinkThumb}>`;
    } else {
      htmlFav += `<img class="cocktail-img" src=${altImage}>`;
    }
    htmlFav += `</li>`;
  }
  favoritesList.innerHTML = htmlFav;
  removeFavCocktails();
}

//Función para gestionar bebidas favoritas
function manageFavCocktail(item){
  // Busco en el resultado de búsqueda el ELEMENTO seleccionado
  const clickedDrink = resultsList.find((fav) => {
    return fav.idDrink === item;
  });
  // Compruebo si el elemento está en la lista de favoritos
  const favDrink = favList.findIndex((fav) => {
    return fav.idDrink === item;
  });
  // Si no lo está, lo añado a la lista y si lo está, lo elimino
  if (favDrink === -1) {
    favList.push(clickedDrink);
  } else {
    favList.splice(favDrink, 1);
  }
  paintFavCocktails();
  paintListResult();
  localStorage.setItem('favCocktails', JSON.stringify(favList));
}

// Comprobar localStorage
function localSaved() {
  if (savedDrinks !== null) {
    favList = savedDrinks;
  }
  paintFavCocktails();
}

// Función manejadora de botón: buscar
function handleSearchClick(event) {
  event.preventDefault();
  getCocktailData();
}

// Marcar bebidas favoritas desde la lista de resultados
function handleFavClick(event) {
  const selectedCocktail = event.currentTarget.id;
  manageFavCocktail(selectedCocktail);
}
// Eliminar bebidas favoritas
function handleRemoveClick(event) {
  const selectedCocktail = event.currentTarget.parentElement.id;
  manageFavCocktail(selectedCocktail);
}
// Eliminar todos los favoritos
function handleResetFav(event) {
  event.preventDefault();
  favList = [];
  paintFavCocktails();
  localStorage.removeItem('favCocktails');
}

// ---- EVENTOS ---- //
// Al cargar la página
localSaved();

// Cuando la usuaria interactúa
searchBtn.addEventListener('click', handleSearchClick);
resetBtn.addEventListener('click', handleResetFav);

// Listener para resultados
function addFavCocktails() {
  const cocktailItems = document.querySelectorAll('.results .js_results_item');
  for (const cocktail of cocktailItems) {
    cocktail.addEventListener('click', handleFavClick);
  }
}
// Listener para favoritos
function removeFavCocktails() {
  const removeButton = document.querySelectorAll('.js_fav_remove');
  for (const removeFav of removeButton) {
    removeFav.addEventListener('click', handleRemoveClick);
  }
}