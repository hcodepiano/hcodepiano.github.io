import keyboardKeys from "./keyboardKeys.js";
import { playAudio } from "./utils.js";

const pianoKeysEl = [...document.querySelectorAll(".piano .piano-key")] as HTMLElement[];

function playPianoKey(keyElement: HTMLElement) {

    if (keyElement) {

        const piano = keyElement.closest(".piano");

        piano!.querySelectorAll(".piano-key").forEach(element => {

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

            const container = keyElement.closest('.piano-key') as HTMLElement;

            keyName = `${container.dataset.key}-sharp.mp3`;

        } else {

            keyName = `${keyElement.dataset.key}.mp3`;

        }            

        if (keyName) {

            playAudio(keyName);

        } else {
            console.error('Nota não encontrada.');
        }

    }

}

pianoKeysEl.forEach((element: Element) => {

    element.addEventListener("click", (event) => {

        const currentKey = event.target as HTMLElement;

        playPianoKey(currentKey);

    });

});

document.addEventListener('keydown', (event: KeyboardEvent) => {

    const pressedKey = event.key;

    const pianoKey = keyboardKeys.filter((item) => item.key === pressedKey)[0];

    console.log(pressedKey, pianoKey);

    if (pianoKey) {

        const pianoElement = pianoKeysEl.filter((el) => el.dataset.key === pianoKey.pianoKey.split(".")[0])[0];

        if (pianoElement) {

            if (pianoKey.isSharp) {

                const blackKey = pianoElement.querySelector('.black') as HTMLElement;

                playPianoKey(blackKey);
    
            } else {
    
                playPianoKey(pianoElement);
    
            }

        } else {
            console.error('Nota não encontrada.');
        }

    } else {
        console.error('Nota não encontrada.');
    }

})