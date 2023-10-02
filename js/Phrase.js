/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display phrase placeholder on game board
   */
  addPhraseToDisplay() {
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

  /**
   * Checks if the letter selected by the player matches a letter in the phrase
   * @param {string} letter - The clicked button element
   * @return {boolean} True if matches, false if it doesn't
   */
  checkLetter(selectedLetter) {
    const arrayOfCharacters = [...this.phrase];

    if (arrayOfCharacters.includes(selectedLetter)) {
      return true;
    } else {
      return false;
    }
  }

  /*
   * Reveals the letter(s) on the board that matches the player's selection
   * @param {string} letter - letter on phrase
   */
  showMatchedLetter(letter) {
    const matchingLetters = document.querySelectorAll(`.${letter}`);
    matchingLetters.forEach((matchingLetter) =>
      matchingLetter.classList.replace("hide", "show")
    );
  }
}
