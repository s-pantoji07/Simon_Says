let gameseq = [];
let userseq = [];
let btns = ["green", "red", "purple", "yellow"];

let start = false;
let level = 0;

let h2 = document.querySelector("h2");
let body = document.querySelector("body");

document.addEventListener("keypress", function() {
    if (start == false) {
        console.log("game started");
        start = true;
        levelUp(); // function call
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 300);
}

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;

    // Random btn choose
    let randomIndex = Math.floor(Math.random() * 4);  // Corrected: Random index should be between 0 and 3
    let randomcolor = btns[randomIndex]; // Choosing random color
    let randombtn = document.querySelector(`.${randomcolor}`);

    gameseq.push(randomcolor); 
    console.log(gameseq);
    gameFlash(randombtn);

    // Reset user sequence
    userseq = [];
}

function btnPress() {
    let btn = this; // Corrected variable name
    let usercolor = btn.classList[1]; // Assuming the second class name is the color
    userseq.push(usercolor);
    userFlash(btn);

    // Check if user sequence matches game sequence so far
    if (userseq[userseq.length - 1] !== gameseq[userseq.length - 1]) {
        // User pressed the wrong button
        console.log("Wrong sequence. Game Over.");
        gameOver();
    } else if (userseq.length === gameseq.length) {
        // User completed the current sequence correctly
        setTimeout(levelUp, 1000);
    }
}

function gameOver() {
    h2.innerText = `Game Over. You reached Level ${level}`;
    body.classList.add("game-over");
    setTimeout(function() {
        body.classList.remove("game-over");
        resetGame();
    }, 1000);
}

function resetGame() {
    level = 0;
    gameseq = [];
    start = false;
    h2.innerText = "Press any key to start";
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) { // Corrected loop
    btn.addEventListener("click", btnPress); // Corrected event listener assignment
}
