let playerScore = 0;
let botScore = 0;

const choices = document.querySelectorAll('.choice');
const playerScoreElement = document.getElementById('playerScore');
const botScoreElement = document.getElementById('botScore');
const resultElement = document.getElementById('result');

const options = ['Kő', 'Papír', 'Olló'];

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.getAttribute('data-choice');
        const botChoice = options[Math.floor(Math.random() * 3)];
        determineWinner(playerChoice, botChoice);
    });
});

function determineWinner(player, bot) {
    if (player === bot) {
        resultElement.textContent = `Döntetlen!   ${bot} = ${player}.`;
    } else if (
        (player === 'Kő' && bot === 'Olló') ||
        (player === 'Papír' && bot === 'Kő') ||
        (player === 'Olló' && bot === 'Papír')
    ) {
        playerScore++;
        playerScoreElement.textContent = playerScore;
        resultElement.textContent = `Nyertél!   ${player} > ${bot}.`;
    } else {
        botScore++;
        botScoreElement.textContent = botScore;
        resultElement.textContent = `Vesztettél!   ${bot} > ${player}.`;
    }
}
