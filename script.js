// Variables Initialization
let xp = 0; // keep track of the player's experience points
let health = 100; // keep track of the player's health points
/* variable declaration: var/let/const <variableName> ( = inital value) (;)*/
/* ; is optional */
let gold = 50; 
let currentWeapon = 0; // store the index inside weapons array of the current weapon 
let fighting;
let monsterHealth;
let inventory = ["stick"]; // an array to keep track of the player's inventory items

// const variables can't be updated (immutable)
const button1 = document.querySelector("#button1"); // reference to the button with id button1 in html
const button2 = document.querySelector("#button2"); // reference to the button with id button2
const button3 = document.querySelector("#button3"); // reference to the button with id button3
const text = document.querySelector("#text"); // reference to the text area with id text in html
const xpText = document.querySelector("#xpText"); // reference to the text area with id xpText in html
const healthText = document.querySelector("#healthText"); // reference to the text area with id healthText in html
const goldText = document.querySelector("#goldText"); // reference to the text area with id goldText in html
const monsterStats = document.querySelector("#monsterStats"); // reference to the text area with id monsterStats in
const monsterNameText = document.querySelector("#monsterName"); // reference to the text area with id monsterNameText in html
const monsterHealthText = document.querySelector("#monsterHealth"); // reference to the text area with id monsterHealthText in html

// const array = [
//     {
//         name: "lsh"
            // key: value
//     }
// ]

// store all weapon Objects 
const weapons = [{
    name: "stick",
    power: 5
},
{
    name: "dagger",
    power: 30
},
{
    name: "claw hammer",
    power: 50
},
{
    name: "sword",
    power: 100
}
];

// store all monster Objects
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
      },
      {
        name: "fanged beast",
        level: 8,
        health: 60
      },
      {
        name: "dragon",
        level: 20,
        health: 300
      }
];

// store all in-game location Objects
const locations = [
    // town square info
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight Dragon"],
        "button functions" : [goStore, goCave, fightDragon],
        text: "You are now in the town square, and you see a sign that says \"store\"."
        
    },
    // store info
    {
        name: "store",
        "button text": ["Buy 10 health (Cost: 10 gold)", "Buy Weapon (Cost: 30 gold)", "Go to town square"],
        "button functions" : [buyHealth, buyWeapon, goTown],
        text: "You have entered the store now."
    },

    {
        name: "cave",
		"button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
		"button functions": [fightSlime, fightBeast, goTown],
		text: "You enter the cave. You see some monsters."
	},

    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text:"You are now fighting a monster!"
    }, 

    {
        name: "kill monster",
		"button text": ["Go to town square", "Go to town square", "Find Easter eggs"],
		"button functions": [goTown, goTown, easterEgg],
		text: 'The monster screams "Uhhhh~ Oof~ Arg!" as it dies. You gain experience points and find gold.'
	},

    {
        name: "lose",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You die. ☠️ gg ☠️ "
    },

    {
        name: "win",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "🎉🎉🎉🎉🎉🎉 You defeat the dragon! YOU WIN THE GAME! 🎉🎉🎉🎉🎉🎉🎉"
    },

    {
        name: "easter egg",
		"button text": ["2", "8", "Go to town square?"],
		"button functions": [pickTwo, pickEight, goTown],
		text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];
// initialize buttons
// function calls will be executed on when corresponding buttons are clicked
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// function functionName() {
//     return val; 
// }

function update(location) {
    // console.log("Going to store...");
    // How to Update a button's text: button1.innerText = "val";
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location["text"]; // location.text
}

function goTown() {
    update(locations[0]);   
}
function goStore() {
    update(locations[1]);
}

function goCave() {
    // console.log("Going to cave...");
    update(locations[2]);
}

function fightDragon() {
    console.log("Fighting Dragon...");
}

function buyHealth() {
    // if (condition){

    // }
    if (gold >= 10) {
        gold -= 10;
    // gold = gold - 10;
    health += 10;
    // health = health + 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
    
    
}

function buyWeapon() {
if (inventory.length < 3) { // check if the player has bought the last weapon
        if (gold >= 30) {
            gold -= 30;
            currentWeapon += 1; // currentWeapon ++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "Successfully bought " + newWeapon + "!";
            inventory.push(newWeapon); // add the bought new weapon to the player's inventory items
            text.innerText += " In your inventory you have " + inventory;
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        } 
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + "!";
        text.innerText += "In your inventory you have" + inventory;
    
    } else {
        text.innertext = "Please don't sell your only weapon!";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
	monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
		text.innerText += " You miss.";
	}
    
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
	healthText.innerText = health;
	monsterHealthText.innerText = monsterHealth; 
    
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        // single equal sign = is value assignment
        // if (fighting == 2) { // === 
        //     winGame();
        // } else {
        //     defeatMonsters();
        // }
        // conditions ? function1() : function2();
        fighting === 2 ? winGame() : defeatMonsters();
    }

    if (Math.random() < .1 && inventory.length !== 1) {
        text.inner += "Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}

function isMonsterHit() {
    // Math.random() generates a randome value between 0 and 1
    // means 80 % chances of a monster hitting  successfully or player's health is below 20
    return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerText = "You dodged the attack from " + monsters[fighting].name;
}

function defeatMonsters() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}


function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	inventory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	goTown();
}

// hidden feature of the game
function easterEgg () {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text = "You picked" + guess + ". Here are the randome numbers: \n";
    for (let i = 0; i < numbers.length; i++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.indexOf(guess) !== -1) { // if the player's guess is correct
        text.innerText += "You won!\n";
        gold += 20;
        goldText.innerText = gold;
        
    } else {
        text.innerText += "You lost!\n";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}