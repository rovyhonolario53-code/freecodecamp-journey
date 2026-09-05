function playAudio(key) {
    const upperKey = key.toUpperCase();
    const audio = document.getElementById(upperKey);

    if (audio) {
        audio.currentTime = 0;
        audio.play();
        
        const parentPad = audio.parentElement;
        const displayText = parentPad.id.replace(/-/g, " ");

        const displayElement = document.getElementById("display");
        if (displayElement) {
            displayElement.innerText = displayText;

            parentPad.classList.add("active");

            
            setTimeout(() => {
                parentPad.classList.remove("active");
            }, 100);
        }
    }

}

document.addEventListener("keydown", (event) => {
    if (event.key) {
        playAudio(event.key);
    }
});

document.querySelectorAll(".drum-pad").forEach((pad) => {
    pad.addEventListener("click", () => {
        const audio = pad.querySelector("audio");
        if (audio) {
            playAudio(audio.id);
        }
    });
});