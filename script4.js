// --- ГЛОБАЛЬНЫЕ НАСТРОЙКИ ---
let correctCountS6 = 0;
const totalNeededS6 = 5; // Тур1 (1) + Тур2 (3) + Тур3 (1)

window.addEventListener('DOMContentLoaded', () => {
    const scoreDisplay = document.getElementById('total-score');
    if (scoreDisplay) {
        scoreDisplay.innerText = localStorage.getItem('pioneerScore') || 0;
    }
});

function updateScore(pts) {
    let score = parseInt(localStorage.getItem('pioneerScore') || 0);
    score = Math.max(0, score + pts);
    localStorage.setItem('pioneerScore', score);
    const display = document.getElementById('total-score');
    if (display) display.innerText = score;
}

// --- ОСНОВНАЯ ФУНКЦИЯ СТАНЦИИ 6 ---
function checkFinal(btn, isSingleChoice = false) {
    if (btn.disabled) return;

    if (btn.classList.contains('correct')) {
        // ДЕЙСТВИЯ ПРИ ПРАВИЛЬНОМ ОТВЕТЕ
        btn.style.backgroundColor = "#4CAF50";
        btn.style.color = "white";
        updateScore(20);
        correctCountS6++;
        
        // Блокируем кнопки
        if (isSingleChoice) {
            // В турах 1 и 3 блокируем ВЕСЬ ряд, так как ответ найден
            const container = btn.closest('.test_options');
            if (container) {
                container.querySelectorAll('.option_btn').forEach(b => b.disabled = true);
            }
        } else {
            // В туре 2 блокируем только нажатую верную кнопку
            btn.disabled = true;
        }
    } else {
        // ДЕЙСТВИЯ ПРИ ОШИБКЕ
        btn.style.backgroundColor = "#f44336";
        btn.style.color = "white";
        updateScore(-10);
        btn.disabled = true; // Выключаем только эту кнопку, даем нажать другие
    }

    // ПРОВЕРКА НА ПОЯВЛЕНИЕ ФИНАЛЬНОГО БЛОКА
    if (correctCountS6 >= totalNeededS6) {
        const finishBlock = document.getElementById('finish-block');
        if (finishBlock) {
            finishBlock.style.display = 'flex';
            finishBlock.style.opacity = '1';
            
            setTimeout(() => {
                finishBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
    }
}