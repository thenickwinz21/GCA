function filterByCity(targetCity, listingCityArray) {
  let indices = [];
  targetCity = targetCity.toLowerCase();
  for (let i = 0; i < listingCityArray.length; i++) {
    if (listingCityArray[i].toLowerCase() === targetCity) {
      indices.push(i);
    }
  }
  return indices;
}

function filterByPrice(minPrice, maxPrice, listingPriceArray) {
  let pricing = [];
  for (let i = 0; i < listingPriceArray.length; i++) {
    if (listingPriceArray[i] < maxPrice && listingPriceArray[i] > minPrice) {
      pricing.push(i);
    }
  }
  return pricing;
}

function filterByTypes(targetTypes, listingTypeArray) {
return [...listingTypeArray.keys()]
}
