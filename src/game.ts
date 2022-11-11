import {Game} from "./game/game";

const game = new Game();

const codeArea = document.getElementById("code-box") as HTMLTextAreaElement;
codeArea.addEventListener('keyup', (e) => {
    game.changeCode(codeArea.value);
});

const runButton = document.getElementById("run-btn") as HTMLButtonElement;
runButton.addEventListener('click', (e) => {
    game.changeCode(codeArea.value);
    game.run();
});
