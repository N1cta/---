 window.addEventListener('DOMContentLoaded', () => {
    // 1. Обновляем обычный счетчик в углу экрана
    const scoreDisplay = document.getElementById('total-score');
    const savedScore = parseInt(localStorage.getItem('pioneerScore') || 0);
    if (scoreDisplay) {
        scoreDisplay.innerText = savedScore;
    }

    // 2. Логика ТОЛЬКО для финальной страницы
    const finalPointsDisplay = document.getElementById('final-points');
    if (finalPointsDisplay) {
        // Выводим баллы в центр экрана
        finalPointsDisplay.innerText = savedScore;
        
        // Определяем звание
        const rankText = document.getElementById('rank-text');
        const feedback = document.getElementById('feedback-message');
        
        if (rankText) {
            if (savedScore >= 450) {
                rankText.innerText = "Звание: ПИОНЕР-ЛИДЕР";
                feedback.innerText = "Твои знания безупречны! Ты настоящий пример для подражания и лидер движения.";
            } else if (savedScore >= 300) {
                rankText.innerText = "Звание: АКТИВИСТ";
                feedback.innerText = "Отличный результат! Ты хорошо знаешь традиции и историю, продолжай в том же духе.";
            } else {
                rankText.innerText = "Звание: НОВИЧОК";
                feedback.innerText = "Хорошее начало! Тебе еще есть куда расти. Попробуй пройти маршрут еще раз.";
            }
        }
    }
});

// Функция для кнопки "Пройти заново"
function resetGame() {
    localStorage.setItem('pioneerScore', 0);
}
 // Функция, которая выполняется сразу при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    const scoreDisplay = document.getElementById('total-score');
    if (scoreDisplay) {
        // Достаем число из памяти браузера. Если там пусто — ставим 0.
        const savedScore = localStorage.getItem('pioneerScore') || 0;
        scoreDisplay.innerText = savedScore;
    }
});

// Универсальная функция для начисления баллов
function updateScore(pts) {
    let currentScore = parseInt(localStorage.getItem('pioneerScore') || 0);
    currentScore = Math.max(0, currentScore + pts); // Чтобы счет не стал отрицательным
    
    localStorage.setItem('pioneerScore', currentScore);
    
    const scoreDisplay = document.getElementById('total-score');
    if (scoreDisplay) {
        scoreDisplay.innerText = currentScore;
    }
}

 // Переменные для отслеживания прогресса на 1-й станции
let correctCountS1 = 0;
const totalNeededS1 = 8; 

function checkAnswer(button) {
    // Если кнопка уже нажата, ничего не делаем
    if (button.disabled) return;
    
    if (button.classList.contains('correct')) {
        button.style.backgroundColor = "#4CAF50"; // Зеленый
        button.style.color = "white";
        updateScore(10); // Начисляем 10 баллов
        correctCountS1++;
        
        // ПРОВЕРКА: Если собрали все 8 правильных ответов
        if (correctCountS1 === totalNeededS1) {
            activateFinishBlock();
        }
    } else {
        button.style.backgroundColor = "#f44336"; // Красный
        button.style.color = "white";
        updateScore(-10); // Штраф за ошибку
    }
    
    button.disabled = true; // Выключаем кнопку после клика
}

// Универсальная функция появления блока
function activateFinishBlock() {
    const block = document.getElementById('finish-block');
    if (block) {
        // 1. Показываем блок
        block.style.display = 'flex';
        
        // 2. Обновляем количество баллов внутри блока (если там есть id="final-points")
        const finalPointsLabel = document.getElementById('final-points');
        if (finalPointsLabel) {
            finalPointsLabel.innerText = localStorage.getItem('pioneerScore') || 0;
        }

        // 3. Плавно скроллим к нему
        setTimeout(() => {
            block.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

 

    let foundCount = 0;
    const totalItems = 8;

    function foundItem(element) {
        if (!element.classList.contains('active')) {
            element.classList.add('active');
            foundCount++;

            if (foundCount === totalItems) {
                document.getElementById('finish-block').style.display = 'flex';
                setTimeout(() => {
                    document.getElementById('finish-block').scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        }
    }


    function checkWord(input) {
            const answer = input.getAttribute('data-answer');
            if (input.value.toUpperCase().trim() === answer) {
                input.style.backgroundColor = "#4CAF50";
                input.style.color = "white";
                input.disabled = true;
                checkAllDone();
            }
        }

        function checkAllDone() {
            const inputs = document.querySelectorAll('.word_input');
            const allCorrect = Array.from(inputs).every(i => i.disabled);
            if (allCorrect) {
                document.getElementById('finish-block').style.display = 'flex';
                setTimeout(() => {
                    document.getElementById('finish-block').scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        }


        document.getElementById('total-score').innerText = localStorage.getItem('pioneerScore') || 0;


        







function updateScore(pts) {
    let score = parseInt(localStorage.getItem('pioneerScore') || 0);
    score = Math.max(0, score + pts);
    localStorage.setItem('pioneerScore', score);
    // Обновляем текст на табло, если оно есть
    const scoreElement = document.getElementById('total-score');
    if (scoreElement) scoreElement.innerText = score;
}





       

       const grid = document.getElementById('puzzle-grid');
        const finishBlock = document.getElementById('finish-block');
        
        let order = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        
        // Перемешивание
        do {
            order.sort(() => Math.random() - 0.5);
        } while (order.every((v, i) => v === i));

        order.forEach(pos => {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.setAttribute('data-id', pos);
            
            const row = Math.floor(pos / 3);
            const col = pos % 3;
            const size = window.innerWidth <= 500 ? 100 : 150;
            piece.style.backgroundPosition = `-${col * size}px -${row * size}px`;
            
            grid.appendChild(piece);
        });

        const sortable = new Sortable(grid, {
            animation: 250,
            onEnd: function() {
                checkWin();
            }
        });

        function checkWin() {
            const currentOrder = Array.from(grid.children).map(child => parseInt(child.getAttribute('data-id')));
            const isWin = currentOrder.every((v, i) => v === i);

            if (isWin) {
                sortable.option("disabled", true);
                updateScore(100);
                
                // Появление блока в вашем стиле
                finishBlock.style.display = 'flex';
                
                // Плавный скролл к нему
                setTimeout(() => {
                    finishBlock.scrollIntoView({ behavior: 'smooth' });
                }, 300);
                
                // Визуальное объединение пазла
                grid.style.gap = "0";
                grid.style.padding = "0";
            }
        }

        function updateScore(pts) {
            let score = parseInt(localStorage.getItem('pioneerScore') || 0);
            localStorage.setItem('pioneerScore', score + pts);
            document.getElementById('total-score').innerText = localStorage.getItem('pioneerScore');
        }

        window.onload = () => {
            document.getElementById('total-score').innerText = localStorage.getItem('pioneerScore') || 0;
        };


       


        // Универсальная функция обновления счета
function updateScore(pts) {
    let score = parseInt(localStorage.getItem('pioneerScore') || 0);
    score = Math.max(0, score + pts); // Защита от отрицательного счета
    localStorage.setItem('pioneerScore', score);
    
    const scoreDisplay = document.getElementById('total-score');
    if (scoreDisplay) {
        scoreDisplay.innerText = score;
    }
}

// Инициализация при загрузке любой страницы
window.onload = () => {
    const scoreDisplay = document.getElementById('total-score');
    if (scoreDisplay) {
        scoreDisplay.innerText = localStorage.getItem('pioneerScore') || 0;
    }
    
    // Если это финальная страница, выводим результат
    const finalPoints = document.getElementById('final-points');
    if (finalPoints) {
        const score = parseInt(localStorage.getItem('pioneerScore') || 0);
        finalPoints.innerText = score;
        updateRank(score);
    }
};



function updateRank(score) {
    const rankText = document.getElementById('rank-text');
    const feedback = document.getElementById('feedback-message');
    
    if (score >= 600) {
        rankText.innerText = "Пионер-Лидер";
        feedback.innerText = "Ты — настоящий пример для подражания! Идеальные знания.";
    } else if (score >= 350) {
        rankText.innerText = "Активист";
        feedback.innerText = "Отличная работа! Ты хорошо знаком с традициями.";
    } else {
        rankText.innerText = "Новичок";
        feedback.innerText = "Хорошее начало пути. Попробуй еще раз, чтобы улучшить результат!";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Находим элемент, где должны быть баллы
    const finalPointsDisplay = document.getElementById('final-points');
    
    if (finalPointsDisplay) {
        // Получаем баллы из памяти браузера
        const totalScore = localStorage.getItem('pioneerScore') || 0;
        
        // Просто выводим число в блок
        finalPointsDisplay.innerText = totalScore;
    }
});



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

// --- СИСТЕМА БАЛЛОВ ---



// Функция сброса (для кнопки "Пройти заново")
function resetGame() {
    localStorage.setItem('pioneerScore', 0);
    window.location.href = 'index.html';
}