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
    hides the start screen overlay, 
    calls the getRandomPhrase() method, and 
    sets the activePhrase property with the chosen phrase. 
    It also adds that phrase to the board by calling the addPhraseToDisplay() method on the activePhrase property.
    */
  startGame() {
    document.querySelector("#overlay").style.display = "none";

    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  // this method randomly retrieves one of the phrases stored in the phrases array and returns it
  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be use
   */
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /*
    checks to see if the button clicked by the player matches a letter in the phrase, and 
    then directs the game based on a correct or incorrect guess.
    */
  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
  handleInteraction(button) {
    // disable the selected letter's onscreen keyboard button
    button.target.disabled = true;

    if (this.activePhrase.checkLetter(button.target.innerHTML) === true) {
      button.target.classList.add("chosen");
      this.activePhrase.showMatchedLetter(button.target.innerHTML);
    } else if (
      this.activePhrase.checkLetter(button.target.innerHTML) === false
    ) {
      button.target.classList.add("wrong");
      this.removeLife();
    }

    if (this.checkForWin() === true) {
      this.gameOver(true);
    }
  }

  /*
    this method removes a life from the scoreboard, 
    by replacing one of the liveHeart.png images with a lostHeart.png image (found in the images folder) 
    and increments the missed property. 
    If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.
    */
  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    this.missed = this.missed + 1;
    console.log(this.missed);

    const hearts = document.querySelectorAll("#scoreboard ol li");
    hearts[this.missed - 1].firstChild.src = "images/lostHeart.png";

    // If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.
    if (this.missed === 5) {
      this.gameOver(false);
    }
  }

  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't won
   */
  checkForWin() {
    let wrigthLetters = document.querySelectorAll(".letter");
    const allWright = (element) =>
      element.classList.contains("show") ? true : false;

    if (
      this.missed < 5 === true &&
      Array.from(wrigthLetters).every(allWright) === true
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
    document.querySelectorAll("#scoreboard ol li").forEach((li) => (li.firstChild.src = "images/liveHeart.png"));
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
