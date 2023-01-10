//declare all the dynamic(elements that will do something, like hide, when the user interacts with something else) or clickable elements you need.
//heros is for the div that holds all 3 hero cards
const heros = document.querySelector("#heros")
//self explanatory
const title = document.querySelector("#title");
//battlelog (btn) will at first be hidden and will appear only after the fight concluded
const battlelog = document.querySelector("#battlelog");
//restart option = refreshes page
const restart = document.querySelector("#restart");
//start = shows the heros that are initially hidden and the start fight btn
const start = document.querySelector("#start");
//self explanatory
const startFightBtn = document.querySelector("#start-fight");
//this is the div that holds the battlelog and makes the rest of the screen blurry and darker
const modal = document.querySelector(".modal");
//this will generate the text for the battelog from the variable res from main.js
const modalContainer = document.querySelector("#modal-container");



function showHeroes() {
    //add the d-flex class to the heros div to make the heros visible
    heros.classList.add('d-flex');
    //add the d-none class to the title to hide it
    title.classList.add('d-none');
    //this shows the start fight btn. you can style it differently, I chose inherit because no specific styling was applied.
    startFightBtn.style.display = "inherit";
    //add the d-none class to the start btn that hides it
    start.classList.add('d-none');
}

function roundResults() {
    //the modal will get the innerHTML (so the text) from the variable res
    modalContainer.innerHTML = res;
    //set to block so it displays an element as a block element. It starts on a new line, and takes up the whole width
    modal.style.display = "block";
}

function clearModal(e) {
    //if the user clicks on the modal (so the blurry, darker background or outside the battlelog) then the battlelog closes and the restart btn appears
    if (e.target == modal) {
        modal.style.display = "none";
        restart.style.display = "inherit";
    }
}

function clearModalEscape(e) {
    //add the option to close it also by hitting escape
    if (e.key === 'Escape') {
        modal.style.display = 'none'
        restart.style.display = "inherit";
      }
}

//this just refreshes the page
function restartGame() {
    location.reload();
}

//added event listeners for the buttons and the window itself to close the modal
start.addEventListener('click', showHeroes);
battlelog.addEventListener('click', roundResults);
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
window.addEventListener('keydown', clearModalEscape);