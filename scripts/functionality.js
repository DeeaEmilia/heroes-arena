const heros = document.querySelector("#heros")
const title = document.querySelector("#title");
const battlelog = document.querySelector("#battlelog");
const restart = document.querySelector("#restart");
const start = document.querySelector("#start");
const startFightBtn = document.querySelector("#start-fight");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector("#modal-container");

function showHeroes() {
    heros.classList.add('d-flex');
    title.classList.add('d-none');
    battlelog.style.display = "inherit";
    restart.style.display = "inherit";
    startFightBtn.style.display = "inherit";
    start.classList.add('d-none');
}

function roundResults() {
    modalContainer.innerHTML = res;
    modal.style.display = "block";
}

function clearModal(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}
function restartGame() {
    location.reload();
}

start.addEventListener('click', showHeroes);
battlelog.addEventListener('click', roundResults);
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);