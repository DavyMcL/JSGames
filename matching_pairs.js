const emojis = ["🎶", "🎶", "👻", "👻", "🐔", "🐔", "🦊", "🦊", "😽", "😽",
    "🐈‍⬛", "🐈‍⬛", "🥚", "🥚", "⛄", "⛄"];
var shuffle_cards = emojis.sort(() => (Math.random() > .5) ? 2 : -1);
var attempts = 0;
var personalBest = parseInt(localStorage.getItem('personalBest'));
if (isNaN(personalBest)) {
    personalBest = 0;
}
console.log("Personal Best from localStorage:", personalBest);
document.querySelector('.personal-best').textContent = personalBest;
const matchAudio = document.getElementById("match");
const cardFlipAudio = document.getElementById("cardFlip");
const victoryAudio = document.getElementById("victory");

function playMatchAudio() {
    matchAudio.volume = 0.05;
    matchAudio.play();
}

function playCardFlipAudio() {
    cardFlipAudio.volume = 0.15;
    cardFlipAudio.playbackRate = 1.5;
    cardFlipAudio.play();
}

function playVictoryAudio() {
    victoryAudio.volume = 0.15;
    victoryAudio.play();
}
 

for (i = 0; i < emojis.length; i++) {
    let card = document.createElement('div');
    card.className = 'item';
    card.innerHTML = shuffle_cards[i];
    card.onclick = function () {
        this.classList.add('reveal');
        playCardFlipAudio();
        setTimeout(function () {
            if (document.querySelectorAll('.reveal').length > 1) {
                if (document.querySelectorAll('.reveal')[0].innerHTML == document.querySelectorAll('.reveal')[1].innerHTML) {
                    document.querySelectorAll('.reveal')[0].classList.add('match');
                    document.querySelectorAll('.reveal')[1].classList.add('match');

                    document.querySelectorAll('.reveal')[1].classList.remove('reveal');
                    document.querySelectorAll('.reveal')[0].classList.remove('reveal');
                    playMatchAudio();
                    attempts++;
                    updateAttemptsCounter();
                    if (document.querySelectorAll('.match').length == emojis.length) {
                        document.getElementById('winMessage').style.display = 'block';
                        playVictoryAudio();
                        updatePersonalBest();
                    }
                } else {
                    document.querySelectorAll('.reveal')[1].classList.remove('reveal');
                    document.querySelectorAll('.reveal')[0].classList.remove('reveal');
                    attempts++;
                    updateAttemptsCounter();
                }
            }
        }, 800)
    }

    document.querySelector('.game').appendChild(card);
}

function updateAttemptsCounter() {
    document.querySelector('.attempts').textContent = attempts;
}

function updatePersonalBest() {
    if (attempts < personalBest || personalBest === 0) {
        personalBest = attempts;
        localStorage.setItem('personalBest', personalBest);
        document.querySelector('.personal-best').textContent = personalBest;
        console.log("Personal Best updated:", personalBest);
    }
}
