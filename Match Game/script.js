function createNewCard() {
	let cardElement = document.createElement("div");

	cardElement.classList.add("card");

	cardElement.innerHTML = '<div class="card-down"></div><div class="card-up"></div>'

	return cardElement;

}
// createNewCardTest();


function appendNewCard(parentElement) {
	let cardElement = createNewCard();
  
	parentElement.appendChild(cardElement);

	return cardElement;

}
// appendNewCardTest();


function shuffleCardImageClasses() {
	let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"]

	/*    
  CDN: https://cdnjs.com/libraries/underscore.js/1.4.1
  Shuffle: https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm 
 
  let shuffledClasses = _.shuffle(cardClasses); 
  */
  
  return shuffledClasses;
  
}
// shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {
  let cardObjects = [];

  for (let i = 0; i < 12; i++) {
    let newCard = appendNewCard(parentElement);
  
    newCard.classList.add(shuffledImageClasses[i]);
  
	   cardObjects.push({
       index: i,
       element: newCard,
       imageClass: shuffledImageClasses[i]
     });
  }

  return cardObjects;
	
}

function doCardsMatch(cardObject1, cardObject2) {
return cardObject1.imageClass === cardObject2.imageClass;
	
}
// doCardsMatchTest();


let counters = {};


function incrementCounter(counterName, parentElement) {
	if(counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
  
	counters[counterName]++;

	parentElement.innerText = counters[counterName];

}
// incrementCounterTest();

let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
	incrementCounter("flipCounter", document.getElementById("flip-count"));

	if(lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }  

  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    setTimeout(() => {
      lastCardFlipped.element.classList.remove("flipped");
      newlyFlippedCard.element.classList.remove("flipped");
      lastCardFlipped = null;
    }, 1000);
  return;
    }
  	
  incrementCounter("matches", document.getElementById("match-count"));
  newlyFlippedCard.element.classList.add("glow");
  lastCardFlipped.element.classList.add("glow");

	if(counters["match"] === 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }

lastCardFlipped = null;

}

function resetGame() {

  let cardContainer = document.getElementById("card-container");
	
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
	
  document.getElementById("flip-count").innerText = "0";
  document.getElementById("match-count").innerText = "0";
  
  counters = {};
	
  lastCardFlipped = null;

}

setUpGame();
