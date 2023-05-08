const backsList=["a_permanent", "b_stranger", "c_law", "d_mystery", "e_night", "f_coffee", "g_flowers", "h_lovers", "i_paterson", "a_permanent", "b_stranger", "c_law", "d_mystery", "e_night", "f_coffee", "g_flowers", "h_lovers", "i_paterson"];
const timeVariable = 0
let firstSelectedCard
let secondSelectedCard
let isFirstCardSelected = false

const cardList = Array.from(document.querySelectorAll('img'));
// There is 2 pairs of the same name in backsList array. This way we always get 2 pairs with the same name
cardList.forEach((element) => {
  const randomNumber = Math.floor(Math.random() * backsList.length);
  element.setAttribute('name', backsList[randomNumber]);
  backsList.splice(randomNumber, 1);
  element.addEventListener('click', flipCard)
});

function flipCard() {
  // Check if the clicked card is the same as the first or second selected card
  if (this === firstSelectedCard || this === secondSelectedCard) {
    console.log('Same card');
    return;
  } else {
    // Get the image source based on the card's name attribute
    const src = 'images/kort/' + this.getAttribute('name') + '.jpg';
    this.setAttribute('src', src);

    // Check if it's the first card selected
    if (!isFirstCardSelected) {
      firstSelectedCard = this;
      isFirstCardSelected = true;
      console.log('First card selected');
    } else if (isFirstCardSelected) {
      secondSelectedCard = this;
      console.log('Second card selected');
      isFirstCardSelected = false;

      // Check if the first and second selected cards have the same name (i.e., a match)
      if (firstSelectedCard.name === secondSelectedCard.name) {
        console.log('MATCH');
        // Remove click event listener and change cursor for the matched cards
        firstSelectedCard.removeEventListener('click', flipCard);
        firstSelectedCard.style.cursor = 'initial';
        cardList.splice(cardList.indexOf(firstSelectedCard), 1);

        secondSelectedCard.removeEventListener('click', flipCard);
        secondSelectedCard.style.cursor = 'initial';
        cardList.splice(cardList.indexOf(secondSelectedCard), 1);
      } else {
        // No match, handle the cards after a delay
        cardList.forEach((element) => {
          // Remove click event listener and change cursor for all cards
          element.removeEventListener('click', flipCard);
          element.style.cursor = 'initial';

          // Delay execution using a promise
          delay(1000).then(() => {
            // Reset the flipped cards to their front image
            firstSelectedCard.src = 'images/front.jpg';
            secondSelectedCard.src = 'images/front.jpg';
            firstSelectedCard = '';
            secondSelectedCard = '';

            // Add click event listener and change cursor back to pointer for all cards
            element.addEventListener('click', flipCard);
            element.style.cursor = 'pointer';
          });
        });
      }
    }
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}