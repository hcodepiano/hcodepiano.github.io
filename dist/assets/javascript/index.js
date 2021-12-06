import keyboardKeys from "./keyboardKeys.js";
import { playAudio } from "./utils.js";
const pianoKeysEl = [...document.querySelectorAll(".piano .piano-key")];
function playPianoKey(keyElement) {
    if (keyElement) {
        const piano = keyElement.closest(".piano");
        piano.querySelectorAll(".piano-key").forEach(element => {
            if (element.classList.contains("pressed")) {
                element.classList.remove("pressed");
            }
            const blackKey = element.querySelector('.black');
            if (blackKey) {
                if (blackKey.classList.contains("pressed")) {
                    blackKey.classList.remove("pressed");
                }
            }
        });
        keyElement.classList.add("pressed");
        let keyName;
        if (keyElement.classList.contains('black')) {
            const container = keyElement.closest('.piano-key');
            keyName = `${container.dataset.key}-sharp.mp3`;
        }
        else {
            keyName = `${keyElement.dataset.key}.mp3`;
        }
        if (keyName) {
            playAudio(keyName);
        }
        else {
            console.error('Nota não encontrada.');
        }
    }
}
pianoKeysEl.forEach((element) => {
    element.addEventListener("click", (event) => {
        const currentKey = event.target;
        playPianoKey(currentKey);
    });
});
document.addEventListener('keydown', (event) => {
    const pressedKey = event.key;
    const pianoKey = keyboardKeys.filter((item) => item.key === pressedKey)[0];
    if (pianoKey) {
        const pianoElement = pianoKeysEl.filter((el) => el.dataset.key === pianoKey.pianoKey.split(".")[0])[0];
        if (pianoElement) {
            if (pianoKey.isSharp) {
                const blackKey = pianoElement.querySelector('.black');
                playPianoKey(blackKey);
            }
            else {
                playPianoKey(pianoElement);
            }
        }
        else {
            console.error('Nota não encontrada.');
        }
    }
    else {
        console.error('Nota não encontrada.');
    }
});
//# sourceMappingURL=index.js.map