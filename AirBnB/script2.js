document.addEventListener("DOMContentLoaded", function() {
  displayAll();
});

function displayAll() {
  SearchResults.shownListings = [...Array(listings.length).keys()];
  SearchResults.cityIndices = [...Array(listings.length).keys()];
  SearchResults.typeIndices = [...Array(listings.length).keys()];
  SearchResults.displayListings();
}

const _noMatchingListingsHtml =
  `<p class="userMessage">We could not find any listings with that criteria. Please try again with different criteria!</p>`;

const _searchFunctionErrorHTML =
  `<p class="userMessage">The search functionality isn't working yet. Please complete the functions and try again!</p>`;

const _listingTemplate =
  `<div class="col">
      <div class="card listing h-100">
        <img src="{{imageSrc}}" class="card-img-top" alt="{{title}}" style="width: 100%; height: 19vw; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">{{title}}</h5>
          <span class="card-text text-truncate">{{city}}</span><br>
          <span class="card-text">{{stay-type}}</span>
          <p class="card-text"><span class="price">\${{price}}</span> night</p>
        </div>
      </div>
    </div>`;

const _buttonElement =
  document.querySelector("#search-button");

const _searchInputElement =
  document.querySelector("#location-input");

const _listingContainerElement =
  document.getElementById("listing-container");

const _filterContainerElement =
  document.querySelector("#filter-container");

const _minRangeElement =
  document.getElementById("min-price-range");

let _maxRangeElement =
  document.getElementById("max-price-range");

const SearchResults = {
  shownListings: [],
  typeIndices: [],
  cityIndices: [],
  cityFilter: undefined,
  typeFilter: ['entire-place', 'private-room', 'shared-room'],
  minPriceFilter: 0,
  maxPriceFilter: 1000,
  update: function() {
    this.shownListings = [...listings];
    this.filterByCity();
    this.filterByTypes();
    this.filterByPrice();
    this.displayListings();
  },

  filterByCity: function() {
    this.cityIndices = [];
    if (this.cityFilter === undefined) {
      this.cityIndices = [...Array(listings.length).keys()];
      return;
    }
    let indices = filterByCity(this.cityFilter,
      listings.map(l => l.city));
    if (!this.validateListingIndices(indices)) {
      return;
    }
    this.shownListings = [];
    for (let i = 0; i < indices.length; i++) {
      this.shownListings.push(listings[indices[i]]);
      this.cityIndices.push(indices[i]);
    }
  },

  filterByTypes: function() {
    this.typeIndices = []
    let indices =
      filterByTypes(this.typeFilter, this.shownListings.map(l => l.type));
    if (!this.validateListingIndices(indices)) {
      return;
    }
    this.shownListings = [];
    for (let i = 0; i < indices.length; i++) {
      this.typeIndices.push(indices[i]);
    }
  },

  filterByPrice: function() {
    let tempPriceArray = [];
    for (let i = 0; i < this.cityIndices.length; i++) {
      tempPriceArray.push(listings[this.cityIndices[i]].price);
    }
    let indices =
      filterByPrice(this.minPriceFilter, this.maxPriceFilter, tempPriceArray);
    if (!this.validateListingIndices(indices)) {
      return;
    }
    this.shownListings = [];
    for (let i = 0; i < indices.length; i++) {
      this.shownListings.push(indices[i]);
    }
  },
  displayListings: function() {
    _listingContainerElement.innerHTML = "";
    _filterContainerElement.classList.remove("hidden");

    if (this.shownListings.length == 0) {
      _listingContainerElement.innerHTML = _noMatchingListingsHtml;
      return;
    } else if (!this.validateListingIndices(this.shownListings)) {
      _listingContainerElement.innerHTML = _searchFunctionErrorHTML;
      return;
    }
    for (let i = 0; i < this.shownListings.length; i++) {
      let type = listings[this.cityIndices[this.typeIndices[this.shownListings[i]]]].type;
      if (type == "entire-place") {
        type = "Entire Place";
      } else if (type == "private-room") {
        type = "Private Room";
      } else {
        type = "Shared Room";
      }

      let newHtml =
        _listingTemplate
          .replaceAll("{{imageSrc}}",
            listings[this.cityIndices[this.typeIndices[this.shownListings[i]]]].img)
          .replaceAll("{{title}}",
            listings[this.cityIndices[this.typeIndices[this.shownListings[i]]]].title)
          .replaceAll("{{price}}",
            listings[this.cityIndices[this.typeIndices[this.shownListings[i]]]].price)
          .replaceAll("{{city}}",
            listings[this.cityIndices[this.typeIndices[this.shownListings[i]]]].city)
          .replaceAll("{{stay-type}}", type);

      _listingContainerElement
        .insertAdjacentHTML('beforeend', newHtml);
    }
  },
  validateListingIndices: function(indices) {
    if (!Array.isArray(indices)) {
      return false;
    }

    for (let i = 0; i < indices.length; i++) {
      if (typeof (indices[i]) != "number" ||
        indices[i] < 0) {
        return false;
      }
    }

    return true;
  }
}

function checkInputAndDisplay() {
  const cityFilter = _searchInputElement.value.trim();
  if (cityFilter) {
    SearchResults.cityFilter = cityFilter;
    SearchResults.update();
  } else {
    displayAll();
  }
}

_buttonElement.addEventListener("click", () => {
  checkInputAndDisplay();
});

_searchInputElement.addEventListener("keyup", (e) => {
  if (e.code != "Enter") {
    return;
  }
  checkInputAndDisplay();
});

function _toggleType(typeOfPlace) {
  let checked =
    document.querySelector(`.${typeOfPlace}`);
  let unchecked =
    document.querySelector(`.unchecked-${typeOfPlace}`);
  let index = SearchResults.typeFilter.findIndex(type => type == typeOfPlace);

  if (index < 0) {
    SearchResults.typeFilter.push(typeOfPlace);
    checked.classList.add("show");
    checked.classList.remove("hide");
    unchecked.classList.remove("show");
    unchecked.classList.add("hide");

  } else {
    SearchResults.typeFilter.splice(index, 1);
    checked.classList.add("hide");
    checked.classList.remove("show");
    unchecked.classList.add("show");
    unchecked.classList.remove("hide");
  }

  SearchResults.update();
  return
}

_minRangeElement.addEventListener("input", () => {
  SearchResults.minPriceFilter = _minRangeElement.value;
  SearchResults.update();
});

_maxRangeElement.addEventListener("input", () => {
  SearchResults.maxPriceFilter = _maxRangeElement.value;
  SearchResults.update();
});
