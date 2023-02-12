//res will store our text for the battlelog 
let res = "Battlelog: <br><br> ";

//declare necessary variables for the event listener
const selectSprite = document.querySelector("#select-sprite");
const selectDragon = document.querySelector("#select-dragon");
const selectDwarf = document.querySelector("#select-dwarf");
const startFight = document.querySelector("#start-fight");
//disabled the start fight button so that the js doesn't run until a hero is chosen
startFight.disabled = true;

//declare the Hero class with the necessary arguments and abilities
class Hero {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
        this.canFly = false;
        this.shield = false;
        this.heal = false;
        this.extraDamage = false;
    }

    //what happens when a hero is attacked. If they possess any ability the below code will take effect, otherwise hp will directly be substracted.
    attacked(damage) {
        if (this.canFly) {
            let chance = Math.random();
            if (chance > 0.5) {
                damage = 0;
                res += this.name + " flew away. ";
            }
        }

        if (this.shield) {
            damage *= 0.8;
            res += this.name + " shielded.  ";
        }

        if (this.heal) {
            let chance = Math.random();
            if (chance > 0.7) {
                this.hp += 20;
                res += this.name + "healed 20 HP. "
            }
        }

        this.hp -= damage;
        res += this.name + " got attacked with a total of " + damage + " damage.<br>" + this.name + " HP remaining: " + this.hp + ". <br> ";
    }
}

//use extends to create a new hero and attribute an ability to him
class Dwarf extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.shield = true;
        this.heal = true;
    }

    //define how much damage a hero does and then call the method attacked() from the parent class
    attack(otherHero) {
        let damage = 100;
        res += "[ " + this.name + "] </strong>used <strong>[He attacc]</strong> and dealt " + damage + " damage. ";
        otherHero.attacked(damage);
    }
}

class Sprite extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.canFly = true;
        this.extraDamage = true;
    }

    attack(otherHero) {
        let damage = 100;
        let chance = Math.random();
        if (chance > 0.7) {
            damage += 100;
            res += "The attack triggered <strong>[" + this.name + "] </strong> skill <strong>[Sass] </strong> for extra 50 damage. ";
        }
        res += "[ " + this.name + "] </strong>used <strong>[Heart of Fire]</strong> and dealt " + damage + " damage. ";
        otherHero.attacked(damage);
    }
}

class Dragon extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.canFly = true;
        this.shield = true;
    }

    attack(otherHero) {
        let damage = 50;
        res += "[ " + this.name + "] </strong>used <strong>[Snek Attack]</strong> and dealt " + damage + " damage. ";
        otherHero.attacked(damage);
    }
}

//create a class Fight to define how the turns change and how the attack is performed
class Fight {
    constructor(hero1, hero2) {
        this.hero1 = hero1;
        this.hero2 = hero2;
        this.turn = 1;
    }

    performAttack() {
        //use %2 === 0 or not to count the turns. if the turn is even then Computer is attacking, if it's odd then You are attacking
        if (this.turn % 2 === 0) {
            res += "◦⊳ Turn " + this.turn + " ⊲◦ <strong style='color:#e72f2f;'>Computer: </strong><strong style='color:#e72f2f;'>";
            this.hero1.attack(this.hero2);
        } else {
            res += "◦⊳ Turn " + this.turn + " ⊲◦ <strong style='color:#61dd19;'>You: </strong><strong style='color:#61dd19;'>";
            this.hero2.attack(this.hero1);
        }
    }

    changeTurn() {
        //count the turns so it shows up in the battlelog. Ty Alex for the hint.
        this.turn++;
    }

    findWinner() {
        let winner;
        //search for a winner
        if (this.hero2.hp > 0) {
            winner = "You";
            res += "<br><br><strong style='color:#61dd19; font-size:30px;'>You won!</strong><br><br>" + this.hero2.name + " remaining HP: " + this.hero2.hp + " HP left. "
        } else if (this.hero1.hp > 0) {
            winner = "Computer";
            res += "<br><br><strong style='color:#e72f2f; font-size:30px;'>You lost!</strong><br><br>" + this.hero1.name + " remainng HP: " + this.hero1.hp + " HP left.  "
        }
        const modalContainer = document.querySelector("#modal-container");
        modalContainer.innerHTML = `
        <h2>${winner} won!</h2>
        <p>For a more in-depth analysis of the battle, check the battlelog.</p>
    `;
        const modal = document.querySelector(".modal");
        modal.style.display = "block";
    }

    go() {
        //make a loop to fight while both players hp is over 0
        do {
            this.performAttack();
            this.changeTurn();
        } while (this.hero1.hp > 0 && this.hero2.hp > 0);
        this.findWinner();
    }
}

//create 3 new objects for each hero
let dwarf = new Dwarf("Smoliv ", 2000);
let sprite = new Sprite("Sylveon ", 1000);
let dragon = new Dragon("Dragonair ", 2100);
//create an array for the computer's choice
const array = [dwarf, sprite, dragon];
//create a variable to store the player's choice
let playerChoice;

//create a function for the player's choice. The variable playerChoice will be called with an Event Listener below
function getPlayerChoice(selection) {
    playerChoice = selection;
    //after the click, the start fight button will be enabled
    startFight.disabled = false;
}

//create a function that chooses a random index out of an array
function getComputerChoice(arr) {
    //add filteredArray var to delete the playerChoice from the array. Ty stack overflow and Zen
    let filteredArray = arr.filter(e => e !== playerChoice)
    //add variable randomIndex then add math.floor method and math.random times the amount of the heros in the array to get a random index (in this case 0 or 1)
    const randomIndex = Math.floor(Math.random() * filteredArray.length);
    //add variable item to equal the value corresponding to the index chosen above
    const item = filteredArray[randomIndex];
    //return that variable which is the Computer Choice
    return item;
}

//create a function that starts the fight. 
function startFightNow() {
    //declare a new object for the class Fight
    let epicFight = new Fight(playerChoice, getComputerChoice(array));
    //call the method go from the class Fight
    epicFight.go();
    //make the modal for the battlelog visible
    battlelog.style.display = "inherit";
    //disable the start fight button so that you need to restart the game to generate a new battlelog.
    startFight.disabled = true;
}

//add event listeners, 1 for the start fight button and 3 for the player choice.
//in player choice, first choose the id of the btn, then add the event listener, click and then call the function with the corresponding variable for the chosen hero, as you see below:
selectSprite.addEventListener('click', function () { getPlayerChoice(sprite); });
selectDragon.addEventListener('click', function () { getPlayerChoice(dragon); });
selectDwarf.addEventListener('click', function () { getPlayerChoice(dwarf); });
//for start fight, you only need to add the startFightNow function without any arguments.
startFight.addEventListener('click', startFightNow);

//for other functionalities, check functionality.js file

//afisez selectionul intr-un modal -> inlocuit cu you