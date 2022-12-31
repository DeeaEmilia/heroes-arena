let res = "Battlelog: <br><br> ";
const selectSprite = document.querySelector("#select-sprite");
const selectDragon = document.querySelector("#select-dragon");
const selectDwarf = document.querySelector("#select-dwarf");
const startFight = document.querySelector("#start-fight");
startFight.disabled = true;

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
                damage *= 0.9;
                res += this.name + "healed for 10%. "
            }
        }

        this.hp -= damage;
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
            res += "The attack triggered <strong style='color:#f29b9b;'>[" + this.name + "] </strong> skill <strong style ='color:#e48100;'>[Sass] </strong> for extra 50 damage. ";
        }
        res += "<strong style='color:#f29b9b;'>[ " + this.name + "] </strong>used <strong style='color:#e48100;'>[Heart of Fire]</strong> and dealt " + damage + " damage. ";
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
            res += "<strong style='color:#59ba44; font-size:30px;'>" + this.hero1.name + " won with " + this.hero1.hp + " HP left. </strong>"
        } else if (this.hero2.hp > 0) {
            res += "<strong style='color:#59ba44;font-size:30px;'>" + this.hero2.name + " won with " + this.hero2.hp + " HP left.  </strong>"
        } else {
            res += "<strong style='color:#f29b9b;'> No heroes left alive! </strong>";
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
const array = [dwarf, sprite, dragon];
let playerChoice;
let computerChoice;

function getPlayerChoice(selection) {
    playerChoice = selection;
    console.log(playerChoice);
    startFight.disabled = false;
    // heros.style.display = "none";
}

function getComputerChoice(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

function startFightNow() {
    
    let epicFight = new Fight(getComputerChoice(array), playerChoice);
    epicFight.go();
    battlelog.style.display = "inherit";
    startFight.disabled = true;
}

selectSprite.addEventListener('click', function(){getPlayerChoice(sprite);});
selectDragon.addEventListener('click', function(){getPlayerChoice(dragon);});
selectDwarf.addEventListener('click', function(){getPlayerChoice(dwarf);});
startFight.addEventListener('click', startFightNow);



