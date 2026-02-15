// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

let noBtnBaseRect = null;

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    noBtn.style.transform = "translate(0px, 0px)";
    noBtnBaseRect = null;

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

function getNoBtnBaseRect() {
    const prevTransform = noBtn.style.transform;
    noBtn.style.transform = "translate(0px, 0px)";
    const rect = noBtn.getBoundingClientRect();
    noBtn.style.transform = prevTransform;
    return rect;
}

function moveNoButton() {
    const boundsEl = window.matchMedia("(max-width: 480px)").matches
        ? document.querySelector(".buttons")
        : document.querySelector(".letter-window");
    if (!boundsEl) return;

    const boundsRect = boundsEl.getBoundingClientRect();

    if (!noBtnBaseRect) {
        noBtnBaseRect = getNoBtnBaseRect();
    }

    const padding = 16;

    const minX = boundsRect.left + padding;
    const maxX = boundsRect.right - padding - noBtnBaseRect.width;
    const minY = boundsRect.top + padding;
    const maxY = boundsRect.bottom - padding - noBtnBaseRect.height;

    const targetLeft = maxX <= minX ? minX : Math.random() * (maxX - minX) + minX;
    const targetTop = maxY <= minY ? minY : Math.random() * (maxY - minY) + minY;

    const moveX = targetLeft - noBtnBaseRect.left;
    const moveY = targetTop - noBtnBaseRect.top;

    noBtn.style.transition = "transform 0.2s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

noBtn.addEventListener("pointerenter", () => {
    moveNoButton();
});

noBtn.addEventListener(
    "pointerdown",
    (e) => {
        e.preventDefault();
        moveNoButton();
    },
    { passive: false }
);

window.addEventListener("resize", () => {
    noBtn.style.transform = "translate(0px, 0px)";
    noBtnBaseRect = null;
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});





