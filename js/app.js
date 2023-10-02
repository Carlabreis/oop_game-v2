/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const placeholdersList = document.querySelector("#phrase ul");
let game;

document.querySelector("#btn__reset").addEventListener("click", () => {
    game = new Game();
    game.startGame();
});

document.querySelector("#qwerty").addEventListener("click", (event)=>{
    const target = event.target;

    if (target.matches("button")) {
        game.handleInteraction(event);
    }
})

