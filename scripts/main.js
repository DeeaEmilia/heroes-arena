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
                console.log(this.name + " flew away.");
                damage = 0;
            }
        }

        if (this.shield) {
            damage *= 0.8;
            console.log(this.name + " shielded.");
        }
        
        if (this.heal) {
            let chance = Math.random();
            if (chance > 0.7) {
                console.log(this.name + " healed for 10%.");
                damage *= 0.9;
            }
        }

        this.hp -= damage;

        console.log(this.name + " has been attacked. HP reduced by " + damage + ". HP remaining: " + this.hp + ".");
    }
}

class Dwarf extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.shield = true;
        this.heal = true;
    }

    attack(otherHero) {
        let damage = 10;
        console.log(this.name + " attacked with damage: " + damage + ".");
        otherHero.attacked(damage);
    }
}

class Sprite extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.canFly = true;
    }

    attack(otherHero) {
        let damage = 15;
        console.log(this.name + " attacked with damage: " + damage + ".");
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
        let damage = 5;
        console.log(this.name + " attacked with damage: " + damage + ".");
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
            console.log(this.hero1.name + " won with " + this.hero1.hp + " HP left.");
        } else if (this.hero2.hp > 0) {
            console.log(this.hero2.name + " won with " + this.hero2.hp + " HP left.");
        } else {
            console.log("No heroes left alive!");
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


let dwarf = new Dwarf("Smoliv", 200);
let sprite = new Sprite("Sylveon", 100);
let dragon = new Dragon("Dragonair", 210);

let epicFight = new Fight(dwarf, sprite);
epicFight.go();
