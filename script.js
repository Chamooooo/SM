// Símbolos de las ruedas
const symbols = ["🍒", "🍋", "🍊", "🍇", "7️⃣"];

// Créditos iniciales
let credits = 10;

// Sonidos de efectos
const spinSound = new Audio("sonidos/spin.mp3");
const winSound = new Audio("sonidos/win.mp3");

// Cooldown
const cooldownTime = 3000;

// Referencias a elementos
const betInput = document.getElementById("bet");
const betValue = document.getElementById("betValue");

// Actualizar visualmente la apuesta seleccionada
betInput.addEventListener("input", () => {
    betValue.textContent = betInput.value;
});

// Actualizar créditos en pantalla
function updateCredits() {
    document.getElementById("credits").innerText = "Créditos: " + credits;
    const addBtn = document.getElementById("addCreditsBtn");
    addBtn.style.display = credits <= 0 ? "inline-block" : "none";
}

// Función para girar las ruedas
function spin() {
    const apuesta = parseInt(betInput.value);

    if (credits < apuesta) {
        alert("¡No tienes suficientes créditos para apostar !");
        return;
    }

    document.getElementById("result").innerText = "";

    // Reducir créditos por la apuesta
    credits -= apuesta;
    updateCredits();

    const button = document.querySelector("button");
    button.disabled = true;
    spinSound.play();

    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    // Reiniciar animaciones
    [slot1, slot2, slot3].forEach(slot => {
        slot.style.animation = "none";
        void slot.offsetWidth;
        slot.style.animation = "spinAnimation 3s ease-out";
    });

    setTimeout(() => {
        const result1 = randomSymbol();
        const result2 = randomSymbol();
        const result3 = randomSymbol();

        slot1.innerText = result1;
        slot2.innerText = result2;
        slot3.innerText = result3;

        const resultText = document.getElementById("result");

        if (result1 === result2 && result2 === result3) {
            const prize = getPrize(result1) * apuesta;
            credits += prize;
            updateCredits();
            winSound.play();
            resultText.innerText = `¡Has ganado ${prize} créditos!`;
            document.getElementById("celebration").style.display = "block";

            setTimeout(() => {
                document.getElementById("celebration").style.display = "none";
            }, 2000);
        }

        setTimeout(() => {
            button.disabled = false;
        }, cooldownTime);

    }, 3000);
}

// Funciones auxiliares
function randomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function getPrize(symbol) {
    switch (symbol) {
        case "🍒": return 5;
        case "🍋": return 10;
        case "🍊": return 15;
        case "🍇": return 20;
        case "7️⃣": return 50;
        default: return 0;
    }
}

function addCredits() {
    credits += 5;
    updateCredits();
    document.getElementById("result").innerText = "Has añadido 5 créditos.";
}

function updateCredits() {
    document.getElementById("credits").innerText = "Créditos: " + credits;

    const addBtn = document.getElementById("addCreditsBtn");
    addBtn.style.display = credits <= 0 ? "inline-block" : "none";
}
