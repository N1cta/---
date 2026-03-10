//ст 5
// 1. Переменные прогресса (общее количество правильных кликов на всей странице)
// Задание 1 (4 проекта) + Задание 2 (1) + Задание 3 (1) + Задание 4 (3 верных утверждения) = 9
let correctTasks = 0;
const totalToFinish = 9; 

// 2. Функция для Задания 1 (Выбор проектов БРПО)
function checkProject(btn) {
    if (btn.disabled) return;
    if (btn.classList.contains('correct')) {
        btn.style.backgroundColor = "#4CAF50";
        btn.style.color = "white";
        updateScore(15);
        correctTasks++;
    } else {
        btn.style.backgroundColor = "#f44336";
        btn.style.color = "white";
        updateScore(-5);
    }
    btn.disabled = true;
    checkFinish();
}

// 3. Функция для Заданий 2 и 3 (Тесты с одним выбором)
function checkTest(btn) {
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('.option_btn');
    
    if (btn.classList.contains('correct')) {
        btn.style.backgroundColor = "#4CAF50";
        btn.style.color = "white";
        updateScore(20);
        correctTasks++;
    } else {
        btn.style.backgroundColor = "#f44336";
        btn.style.color = "white";
        updateScore(-10);
    }
    // Блокируем все кнопки в этом вопросе
    buttons.forEach(b => b.disabled = true);
    checkFinish();
}

// 4. Функция для Задания 4 (Верные утверждения) — ЕЁ НЕ ХВАТАЛО
function checkFinalStep(btn) {
    if (btn.disabled) return;
    if (btn.classList.contains('correct')) {
        btn.style.backgroundColor = "#4CAF50";
        btn.style.color = "white";
        updateScore(15);
        correctTasks++;
    } else {
        btn.style.backgroundColor = "#f44336";
        btn.style.color = "white";
        updateScore(-10);
    }
    btn.disabled = true;
    checkFinish();
}

// 5. Проверка условий появления финишного блока
function checkFinish() {
    if (correctTasks >= totalToFinish) {
        const block = document.getElementById('finish-block');
        if (block) {
            block.style.display = 'flex';
            // Плавная прокрутка к блоку
            setTimeout(() => {
                block.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }
}

// Функция обновления счета (из вашего основного скрипта)
function updateScore(pts) {
    let score = parseInt(localStorage.getItem('pioneerScore') || 0);
    score = Math.max(0, score + pts);
    localStorage.setItem('pioneerScore', score);
    const display = document.getElementById('total-score');
    if (display) display.innerText = score;
}
