let dramaShows = [
  "Ginny & Georgia",
  "Outlander",
  "Grey's Anatomy",
  "Ozark",
  "The Queen's Gambit"
];

let fantasyShows = [
  "Supernatural",
  "The Sandman",
  "Wednesday",
  "The Witcher",
  "Avatar: The Last Airbender"
];

let comedyShows = [
  "Arrested Development",
  "Dead to Me",
  "Seinfeld",
  "Emily in Paris",
  "The Good Place"
];



function chooseRandomGenre() {
  let genres = ["drama", "fantasy", "comedy"];
  return genres[getRandomNumber(0, genres.length - 1)];
}

let show;
function displayRandomShow(genre) {
  if (genre == "random") {
    genre = chooseRandomGenre();
  }

  if (genre == "drama") {
    show = dramaShows[getRandomNumber(0, dramaShows.length - 1)];
  } else if (genre == "fantasy") {
    show = fantasyShows[getRandomNumber(0, dramaShows.length - 1)];
  } else if (genre == "comedy") {
    show = comedyShows[getRandomNumber(0, dramaShows.length - 1)];
  }

  displayShow(show);
}

