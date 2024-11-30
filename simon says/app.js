let gameseq = [];
let userseq = [];
let buttons = ["red", "purple", "green", "yellow"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});

function gameflash(button) {
  button.classList.add("flash");
  setTimeout(() => {
    button.classList.remove("flash");
  }, 250);
}

function userflash(button) {
  button.classList.add("userflash");
  setTimeout(() => {
    button.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = buttons[randIdx];
  let randbutton = document.querySelector(`.${randColor}`);
  gameseq.push(randColor);
  console.log(gameseq);
  gameflash(randbutton);
}

function checkans(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function buttonPress() {
  let button = this;
  userflash(button);
  let userColor = button.getAttribute("id");
  userseq.push(userColor);
  checkans(userseq.length - 1);
}

let allbuttons = document.querySelectorAll(".button");
for (let btn of allbuttons) {
  btn.addEventListener("click", buttonPress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}