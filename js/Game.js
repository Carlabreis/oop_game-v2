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
        new Phrase("Carpe diem")
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
  handleInteraction(event) {
    // disable the selected letter's onscreen keyboard button
    event.target.disabled = true;

    if (this.activePhrase.checkLetter(event.target.innerHTML) === true) {
      event.target.classList.add("chosen");
      this.activePhrase.showMatchedLetter(event.target.innerHTML);

      if (this.checkForWin() === true) {
        this.gameOver();
        console.log('you won');
      }
    } else if (this.activePhrase.checkLetter(event.target.innerHTML) === false){
      event.target.classList.add("wrong");
      this.removeLife();
    }
  }

  /*
    this method removes a life from the scoreboard, 
    by replacing one of the liveHeart.png images with a lostHeart.png image (found in the images folder) 
    and increments the missed property. 
    If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.
    */
  removeLife() {
    this.missed = this.missed + 1;
    console.log(this.missed);

    const hearts = document.querySelectorAll("#scoreboard ol li");
    hearts.childNodes[this.missed - 1].src = "images/lostHeart.png";

    // If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.
    if (this.checkForWin() === false) {
        console.log('you lost');
        this.gameOver();
    }
  }

//   checkForWin() {
//     if (this.missed < 5 && ) {
//         return true;
//     } else {
//         return false;
//     }
//   }

}
