let res="Battlelog: <br><br> ";
const start = document.getElementById("start");
const battlelog = document.getElementById("battlelog");
const modal = document.querySelector('.modal');
const heros = document.getElementById("heros")
const title = document.getElementById("title");
const modalContainer = document.getElementById("modal-container");
const restart = document.getElementById("restart");

class Hero {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
        this.canFly = false;
        this.shield = false;
        this.heal = false;
    }

    attacked(damage) {
        if (this.canFly) {
            let chance = Math.random();
            if (chance > 0.5) {
                console.log(this.name + " flew away. ");
                damage = 0;
                res += this.name + " flew away. ";
            }
        }

        if (this.shield) {
            damage *= 0.8;
            console.log(this.name + " shielded. ");
            res += this.name + " shielded.  ";
        }
        
        if (this.heal) {
            let chance = Math.random();
            if (chance > 0.7) {
                console.log(this.name + " healed for 10%. ");
                damage *= 0.9;
                res += this.name + "healed for 10%. "
            }
        }

        this.hp -= damage;

        console.log(this.name + " has been attacked. HP reduced by " + damage + ".HP remaining: " + this.hp + ". ");
        res += this.name + " lost " + damage + " HP.<br>" + this.name + " HP remaining: "  + this.hp + ". <br> ";
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
        console.log(this.name + " attacked with damage: " + damage + ". ");
        res += "<strong style='color:#59ba44;'>[ " + this.name + "] </strong>triggered <strong style='color:#e48100;'>[I attacc]</strong> and attacked with " + damage + " damage. ";
        otherHero.attacked(damage);
    }
}

class Sprite extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.canFly = true;
    }

    attack(otherHero) {
        let damage = 150;
        console.log(this.name + " attacked with damage: " + damage + ". ");
        res += "<strong style='color:#e80201;'>[ " + this.name + "] </strong>triggered <strong style='color:#e48100;'>[Heart of Fire]</strong> and attacked with " + damage + " damage. ";
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
        console.log(this.name + " attacked with damage: " + damage + ". ");
        res += "<strong style='color:#17DCE5;'>[ " + this.name + "] </strong>triggered <strong style='color:#e48100;'>[Snek Attack]</strong> and attacked with " + damage + " damage. ";
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
            console.log(this.hero1.name + " won with " + this.hero1.hp + " HP left. ");
            res += "<strong style='color:#59ba44;'>" +  this.hero1.name + " won with " + this.hero1.hp + " HP left. </strong>"

        } else if (this.hero2.hp > 0) {
            console.log(this.hero2.name + " won with " + this.hero2.hp + " HP left. ");
            res += "<strong style='color:#59ba44;'>" + this.hero2.name + " won with " + this.hero2.hp + " HP left.  </strong>"

        } else {
            console.log("No heroes left alive! ");
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
    heros.style.display = "flex";
    title.style.display = "none";
    battlelog.style.display = "inherit";
    restart.style.display = "inherit";
    start.style.display = "none";
 }

function roundResults(){
    document.getElementById("battlelogContainer").innerHTML = res;
    modal.style.display = "block";
}

function clearModal(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}
function restartGame(){
    location.reload();
}

start.addEventListener('click', showHeroes);
battlelog.addEventListener('click', roundResults);
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);

