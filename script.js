// Símbolos de las ruedas
const symbols = ["🍒", "🍋", "🍊", "🍇", "7️⃣"];

// Créditos iniciales
let credits = 10;

// Sonidos de efectos
const spinSound = new Audio("spin.mp3"); // Asegúrate de tener el archivo de sonido
const winSound = new Audio("win.mp3");   // Asegúrate de tener el archivo de sonido

// Tiempo de cooldown del botón en milisegundos (ej. 3 segundos)
const cooldownTime = 3000;

// Función para actualizar los créditos en pantalla
function updateCredits() {
    document.getElementById("credits").innerText = "Créditos: " + credits;
}

// Función para girar las ruedas
function spin() {
    if (credits <= 0) {
        alert("¡No tienes suficientes créditos!");
        return;
    }

    // Reducir créditos
    credits--;
    updateCredits();

    // Deshabilitar el botón durante el cooldown
    const button = document.querySelector("button");
    button.disabled = true;

    // Reproducir sonido de giro
    spinSound.play();

    // Establecer animación de giro y eliminarla después para reiniciar
    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    // Eliminar animación de giro anterior
    slot1.style.animation = "none";
    slot2.style.animation = "none";
    slot3.style.animation = "none";

    // Forzar reflow para reiniciar la animación
    void slot1.offsetWidth;
    void slot2.offsetWidth;
    void slot3.offsetWidth;

    // Aplicar la animación de giro
    slot1.style.animation = "spinAnimation 3s ease-out";
    slot2.style.animation = "spinAnimation 3s ease-out";
    slot3.style.animation = "spinAnimation 3s ease-out";

    // Detener las animaciones después de 3 segundos y mostrar el resultado
    setTimeout(() => {
        const result1 = randomSymbol();
        const result2 = randomSymbol();
        const result3 = randomSymbol();

        slot1.innerText = result1;
        slot2.innerText = result2;
        slot3.innerText = result3;

        const resultText = document.getElementById("result");

        if (result1 === result2 && result2 === result3) {
            const prize = getPrize(result1);
            credits += prize;
            updateCredits(); // ← Aquí actualizamos los créditos inmediatamente
            winSound.play();
            resultText.innerText = `¡Has ganado ${prize} créditos!`;
            document.getElementById("celebration").style.display = "block";

            setTimeout(() => {
                document.getElementById("celebration").style.display = "none";
            }, 2000);
        }

        // Habilitar el botón nuevamente después del cooldown
        setTimeout(() => {
            button.disabled = false;
        }, cooldownTime);

    }, 3000);
}

// Función para generar un símbolo aleatorio
function randomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Función para calcular el premio según el símbolo
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
