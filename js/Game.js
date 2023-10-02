/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      new Phrase("Good Morning"),
      new Phrase("Have a nice day"),
      new Phrase("You can do it"),
      new Phrase("Have fun"),
      new Phrase("Carpe diem"),
    ];
    this.activePhrase = null;
  }

  /*
   * Hides the start screen overlay;
   * Calls the getRandomPhrase() method, and sets the activePhrase property with the chosen phrase;
   * Adds that phrase to the board by calling the addPhraseToDisplay() method.
   */
  startGame() {
    document.querySelector("#overlay").style.display = "none";

    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Selects random phrase from phrases property.
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
  handleInteraction(button) {
    // disable the selected letter's onscreen keyboard button
    button.disabled = true;

    if (this.activePhrase.checkLetter(button.innerHTML) === true) {
      button.classList.add("chosen");
      this.activePhrase.showMatchedLetter(button.innerHTML);
    } else if (
      this.activePhrase.checkLetter(button.innerHTML) === false
    ) {
      button.classList.add("wrong");
      this.removeLife();
    }

    if (this.checkForWin() === true) {
      this.gameOver(true);
    }
  }

  /**
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    this.missed = this.missed + 1;

    const hearts = document.querySelectorAll("#scoreboard ol li");
    hearts[this.missed - 1].firstChild.src = "images/lostHeart.png";

    if (this.missed === 5) {
      this.gameOver(false);
    }
  }

  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't won
   */
  checkForWin() {
    let letters = document.querySelectorAll(".letter");
    const allWright = (element) =>
      element.classList.contains("show") ? true : false;

    if (
      this.missed < 5 === true &&
      Array.from(letters).every(allWright) === true
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    //reset the gameboard between games
    document.querySelector("#phrase ul").innerHTML = "";
    document.querySelectorAll(".key").forEach((button) => {
      button.classList.remove("chosen", "wrong");
      button.disabled = false;
    });
    document
      .querySelectorAll("#scoreboard ol li")
      .forEach((li) => (li.firstChild.src = "images/liveHeart.png"));
    document.querySelector("#overlay").classList.remove("win", "lose");

    // display overlay with message
    if (gameWon) {
      document.querySelector("#game-over-message").innerHTML = "Great job!";
      document.querySelector("#overlay").style.display = "flex";
      document.querySelector("#overlay").classList.add("win");
    } else if (!gameWon) {
      document.querySelector("#game-over-message").innerHTML =
        "Sorry, better luck next time!";
      document.querySelector("#overlay").style.display = "flex";
      document.querySelector("#overlay").classList.add("lose");
    }
  }
}
