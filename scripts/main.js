let res = "Battlelog: <br><br> ";
const selectSprite = document.querySelector("#select-sprite");
const selectDragon = document.querySelector("#select-dragon");
const selectDwarf = document.querySelector("#select-dwarf");


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
            res += "The attack triggered <strong style='color:#e80201;'>[" + this.name + "] </strong> skill <strong style ='color:#e48100;'>[Sass] </strong> for extra 50 damage. ";
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

class ChooseHero {
    constructor (player1, player2) {
        this.player1 = player1;
        this.player2 = player2;

        
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

let playerChoice;
let computerChoice;
let epicFight = new Fight(sprite, dwarf);
epicFight.go();

function getComputerChoice(e) {
    let player;
    let computer;
    let option = Math.random();

    if (e.target == selectSprite) {
        if (option > 0.5) {
            computer = selectDragon;
            computerChoice = dragon;
            selectDwarf.style.display = "none";
            console.log("Computer chose Dragon.");
        } else {
            computer = selectDwarf;
            computerChoice = dwarf;
            selectDragon.style.display = "none";
            console.log("Computer chose Dwarf.");
        }
        playerChoice = sprite;
        player = selectSprite;
        console.log("You chose Sylveon.");

    } else if (e.target == selectDragon) {
        if (option > 0.5) {
            computer = selectDwarf;
            computerChoice = dwarf;
            selectSprite.style.display = "none";
            console.log("Computer chose Dwarf.");
        } else {
            computer = selectSprite;
            computerChoice = sprite;
            selectDwarf.style.display = "none";
            console.log("Computer chose Sprite.");
        }

        player = selectDragon;
        playerChoice = dragon;
        console.log("You chose Dragonair.");

    } else if (e.target == selectDwarf) {
        if (option > 0.5) {
            computer = selectSprite;
            computerChoice = sprite;
            selectDragon.style.display = "none";
            console.log("Computer chose Sprite.");
        } else {
            computer = selectDragon;
            computerChoice = dragon;
            selectSprite.style.display = "none";
            console.log("Computer chose Dragon.");
        }
        player = selectDwarf;
        playerChoice = dwarf;
        console.log("You chose Smoliv.");
    }
    console.log(player, computer);
}




selectSprite.addEventListener('click', getComputerChoice);
selectDragon.addEventListener('click', getComputerChoice);
selectDwarf.addEventListener('click', getComputerChoice);

