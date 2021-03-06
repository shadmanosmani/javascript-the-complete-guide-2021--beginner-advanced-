const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_STRONG_PLAYER_ATTACK = "STRONG_PLAYER_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredMaxLife = prompt("Choose maximum life", "100");

let chosenMaxLife = parseInt(enteredMaxLife);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

let battleLog = [];

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHeath: monsterHealth,
    finalPlayerHeath: playerHealth,
  };
  if (
    event === LOG_EVENT_PLAYER_ATTACK ||
    event === LOG_EVENT_STRONG_PLAYER_ATTACK
  ) {
    logEntry.target = "MONSTER";
  } else if (
    event === LOG_EVENT_MONSTER_ATTACK ||
    event === LOG_EVENT_PLAYER_HEAL
  ) {
    logEntry.target = "PLAYER";
  } else if (event === LOG_EVENT_GAME_OVER) {
    logEntry.target = "NONE";
  }
  battleLog.push(logEntry);
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function attackMonster(attackMode) {
  let maxDamage =
    attackMode === MODE_ATTACK
      ? ATTACK_VALUE
      : attackMode === MODE_STRONG_ATTACK
      ? STRONG_ATTACK_VALUE
      : null;
  let logEvent =
  attackMode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : attackMode === MODE_STRONG_ATTACK
      ? LOG_EVENT_STRONG_PLAYER_ATTACK
      : null;
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your initial max health!");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON!",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    if (hasBonusLife) {
      hasBonusLife = false;
      removeBonusLife();
      setPlayerHealth(initialPlayerHealth);
      currentPlayerHealth += initialPlayerHealth;
      alert("You would be dead but the bonus life saved you!");
    } else {
      alert("You lost!");
      writeToLog(
        LOG_EVENT_GAME_OVER,
        "PLAYER WON!",
        currentMonsterHealth,
        currentPlayerHealth
      );
      reset();
    }
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("It's a draw");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "IT'S A DRAW!",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  }
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function printLogHandler() {
  console.log(battleLog);
}

const CLICK_EVENT = "click";

attackBtn.addEventListener(CLICK_EVENT, attackHandler);
strongAttackBtn.addEventListener(CLICK_EVENT, strongAttackHandler);
healBtn.addEventListener(CLICK_EVENT, healPlayerHandler);
logBtn.addEventListener(CLICK_EVENT, printLogHandler);
