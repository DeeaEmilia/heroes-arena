let res = "Battlelog: <br><br> ";
const start = document.querySelector("#start");
const battlelog = document.querySelector("#battlelog");
const modal = document.querySelector(".modal");
const heros = document.querySelector("#heros")
const title = document.querySelector("#title");
const modalContainer = document.querySelector("#modal-container");
const restart = document.querySelector("#restart");
const startFightBtn = document.querySelector("#start-fight");
const selectSprite = document.querySelector("#select-sprite");
const selectDragon = document.querySelector("#select-dragon");
const selectDwarf = document.querySelector("#select-dwarf");
const selectBtn = document.querySelectorAll(".select-btn");

class Hero {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
        this.canFly = false;
        this.shield = false;
        this.heal = false;
        this.extraDamage = false;
    }

    attacked(damage) {
        if (this.canFly) {
            let chance = Math.random();
            if (chance > 0.5) {
                // console.log(this.name + " flew away. ");
                damage = 0;
                res += this.name + " flew away. ";
            }
        }

        if (this.shield) {
            damage *= 0.8;
            // console.log(this.name + " shielded. ");
            res += this.name + " shielded.  ";
        }

        if (this.heal) {
            let chance = Math.random();
            if (chance > 0.7) {
                // console.log(this.name + " healed for 10%. ");
                damage *= 0.9;
                res += this.name + "healed for 10%. "
            }
        }

        this.hp -= damage;
        // console.log(this.name + " has been attacked. HP reduced by " + damage + ".HP remaining: " + this.hp + ". ");
        res += this.name + " lost " + damage + " HP.<br>" + this.name + " HP remaining: " + this.hp + ". <br> ";
    }
}

class Dwarf extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.shield = true;
        this.heal = true;
    }

    attack(otherHero) {
        let damage = 100;
        // console.log(this.name + " attacked with damage: " + damage + ". ");
        res += "<strong style='color:#59ba44;'>[ " + this.name + "] </strong>used <strong style='color:#e48100;'>[He attacc]</strong> and dealt " + damage + " damage. ";
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
        if (chance > 0.6) {
            damage += 100;
            // console.log("The attack triggered <strong style='color:#e80201;'>[Sass] </strong> for extra 100 damage. ");
            res += "The attack triggered <strong style='color:#e80201;'>[" +this.name + "] </strong> skill <strong style ='color:#e48100;'>[Sass] </strong> for extra 50 damage. ";
        }
        // console.log(this.name + " attacked with damage: " + damage + ". ");
        res += "<strong style='color:#e80201;'>[ " + this.name + "] </strong>used <strong style='color:#e48100;'>[Heart of Fire]</strong> and dealt " + damage + " damage. ";
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
        // console.log(this.name + " attacked with damage: " + damage + ". ");
        res += "<strong style='color:#17DCE5;'>[ " + this.name + "] </strong>used <strong style='color:#e48100;'>[Snek Attack]</strong> and dealt " + damage + " damage. ";
        otherHero.attacked(damage);
    }
}

class Fight {
    constructor(hero1, hero2) {
        this.hero1 = hero1;
        this.hero2 = hero2;
        this.turn = 0;
    }

    performAttack() {
        if (this.turn === 0) {
            this.hero1.attack(this.hero2);
        } else {
            this.hero2.attack(this.hero1);
        }
    }

    changeTurn() {
        this.turn = 1 - this.turn;
    }

    findWinner() {
        if (this.hero1.hp > 0) {
            // console.log(this.hero1.name + " won with " + this.hero1.hp + " HP left. ");
            res += "<strong style='color:#59ba44;'>" + this.hero1.name + " won with " + this.hero1.hp + " HP left. </strong>"

        } else if (this.hero2.hp > 0) {
            // console.log(this.hero2.name + " won with " + this.hero2.hp + " HP left. ");
            res += "<strong style='color:#59ba44;'>" + this.hero2.name + " won with " + this.hero2.hp + " HP left.  </strong>"

        } else {
            // console.log("No heroes left alive! ");
            res += "<strong style='color:#e80201;'> No heroes left alive! </strong>";
        }
    }

    go() {
        do {
            this.performAttack();
            this.changeTurn();
        } while (this.hero1.hp > 0 && this.hero2.hp > 0);
        this.findWinner();
    }
}


let dwarf = new Dwarf("Smoliv ", 2000);
let sprite = new Sprite("Sylveon ", 1000);
let dragon = new Dragon("Dragonair ", 2100);

let epicFight = new Fight(dwarf, sprite);
epicFight.go();

function showHeroes() {
    heros.classList.add('d-flex');
    title.classList.add('d-none');
    battlelog.classList.add('d-inherit');
    restart.classList.add('d-inherit');
    startFightBtn.classList.add('d-inherit');
    start.classList.add('d-none');
}

function roundResults() {
    modalContainer.innerHTML = res;
    modal.classList.add('blcok');
}

function clearModal(e) {
    if (e.target == modal) {
        modal.classList.add('d-none');
    }
}
function restartGame() {
    location.reload();
}

function computerChoice(e) {

    let computerChoice;
    let option = Math.random();

    if (e.target == selectSprite) {
        if (option > 0.5) {
            computerChoice == selectDragon;
            selectDragon.classList.add('test');
        } else { 
            computerChoice == selectDwarf;
            selectDwarf.classList.add('test');
        }
    } else if (e.traget == selectDragon) {
        if (option > 0.5) {
            computerChoice == selectDwarf
        } else {
            computerChoice == selectSprite;
        } 
    } else if (e.traget == selectDwarf) {
        if (option > 0.5) {
            computerChoice == selectSprite;
        } else {
            computerChoice == selectDragon;
        }
    }
    console.log(computerChoice);
}

start.addEventListener('click', showHeroes);
battlelog.addEventListener('click', roundResults);
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
selectSprite.addEventListener('click', computerChoice);
selectDragon.addEventListener('click', computerChoice);
selectDwarf.addEventListener('click', computerChoice);

