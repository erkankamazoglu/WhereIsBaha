const activeClass = "active";
const upstairsClass = "upstairs";
const successClass = "success";
const failedClass = "failed";

const startButton = document.getElementById("start");
const scoreText = document.getElementById("score");
const numberOfTrialsText = document.getElementById("numberOfTrials");
const bahas = document.querySelectorAll(".baha");
const areas = document.querySelectorAll(".area");
const message = document.querySelector(".message");

const citiesClassName = [
  "adana",
  "ankara",
  "antalya",
  "bursa",
  "erzurum",
  "istanbul",
  "izmir",
  "konya",
  "mersin",
  "samsun",
  "sivas",
];

let score = 0;
let numberOfTrials = 0;
let lastArea;
let currentArea;
let currentBaha;

function ChooseAreaName(index) {
  cities = citiesClassName.slice();
  return cities[index];
}

function RandomIndex(length, indexArr) {
  let index = Math.floor(Math.random() * length); 

  if (indexArr.length > 0 && indexArr.includes(index)) { 
      return RandomIndex(length, indexArr);  
  }

  return index;
}

startButton.addEventListener("click", StartGame);

function RandomArea() { 
  let randomIndex = 0;
  var indexArr = [];

  areas.forEach((area) => {
    randomIndex = RandomIndex(citiesClassName.length, indexArr);
    indexArr.push(randomIndex);
    const areaClassName = ChooseAreaName(randomIndex);
    area.classList.add(areaClassName);
  });

  randomIndex = Math.floor(Math.random() * bahas.length);
  currentArea = areas[randomIndex];
  currentBaha = bahas[randomIndex];  

  currentArea.classList.add(activeClass);
  while (indexArr.length > 0) {
    indexArr.pop();
  }
}

function GoUpstairs() {
  console.log("Go Upstairs Baha");
  currentBaha.classList.add(upstairsClass);
}

function ClearAllClass() {
  bahas.forEach((baha) => {
    baha.classList.remove(upstairsClass);
    baha.classList.remove(successClass);
    baha.classList.remove(failedClass);
  });
  
  areas.forEach((area) => {
    area.classList.remove(activeClass);
    area.classList.remove("adana");
    area.classList.remove("ankara");
    area.classList.remove("antalya");
    area.classList.remove("bursa");
    area.classList.remove("erzurum");
    area.classList.remove("istanbul");
    area.classList.remove("izmir");
    area.classList.remove("konya");
    area.classList.remove("mersin");
    area.classList.remove("samsun");
    area.classList.remove("sivas");
  });
} 

function StartGame() {
  console.log("Start Game!!");
  NextGamePreparing();
  score = 0;
  numberOfTrials = 0;
  startButton.textContent = "Restart";

  scoreText.textContent = score;
  numberOfTrialsText.textContent = numberOfTrials;
  message.textContent = "Let's Find Baha";
}

function AreaSetClick() {
  areas.forEach((area) => area.addEventListener("click", Find));
}

function AreaRemoveClick() {
  areas.forEach((area) => area.removeEventListener("click", Find));
}

function NextGamePreparing() {
  ClearAllClass();
  RandomArea();
  ReadyMessage();
  AreaSetClick();
}

function Find(e) {
  console.log("Find Baha...");
  AreaRemoveClick();

  numberOfTrials += 1;
  numberOfTrialsText.textContent = numberOfTrials;

  if (e.target.classList.contains(activeClass)) {
    console.log("Baha was found");
    score++;
    scoreText.textContent = score;
    SuccessSound();
    currentBaha.classList.add(successClass);
    GoUpstairs();

    SuccessMessage();

    setTimeout(function () {
      NextGamePreparing();
    }, 2000);
  } else {
    console.log("Baha not found");
    FailedSound();
    currentBaha.classList.add(failedClass);
    GoUpstairs();

    FailedMessage();

    setTimeout(function () {
      NextGamePreparing();
    }, 2000);
  }
}

function SuccessSound() {
  const audio = new Audio("./Sound/success.wav");
  audio.play();
}

function FailedSound() {
  const audio = new Audio("./Sound/failed.wav");
  audio.play();
}

function SuccessMessage() {
  message.textContent = "Bingo!! Baha Was Found :)";
  message.classList.add(successClass);
}

function FailedMessage() {
  message.textContent = "Oops, Whoops Baha Not Found :(";
  message.classList.add(failedClass);
}

function ReadyMessage() {
  message.textContent = "Let's Try Again.";
  message.classList.remove(successClass);
  message.classList.remove(failedClass);
}
