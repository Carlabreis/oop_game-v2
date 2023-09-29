/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  addPhraseToDisplay() {
    //adds letter placeholders to the display when the game starts
    //each letter is presented by an empty box, one 'li' element for each letter

    const placeholdersList = document.querySelector("#phrase ul");

    const arrayOfCharacters = [...this.phrase];

    arrayOfCharacters.forEach((letter) => {
      if (letter !== " ") {
        const li = document.createElement("li");
        li.classList.add("hide", "letter", letter);
        li.innerHTML = letter;
        placeholdersList.append(li);
      } else {
        const li = document.createElement("li");
        li.classList.add("space");
        li.innerHTML = " ";
        placeholdersList.append(li);
      }
    });
  }

  checkLetter(selectedLetter) {
    // checks to see if the letter selected by the player matches a letter in the phrase
    const arrayOfCharacters = [...this.phrase];
    //if array of charachters include letter selected
    if (arrayOfCharacters.includes(selectedLetter)){
        return true;
    } else {
        return false;
    }
    }


  showMatchedLetter() {
    /*
        reveals the letter(s) on the board that matches the player's selection
        To reveal the matching letter(s), select all of the letter DOM elements that 
        have a CSS class name that matches the selected letter and replace each 
        selected element's hide CSS class with the show CSS class.
        */
  }
}