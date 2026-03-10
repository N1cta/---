   // Функция для Станции 1 (Следопыты)
let currentCorrect = 0;
const neededToWin = 8; 

function checkAnswer(button) {
    if (button.disabled) return;
    
    if (button.classList.contains('correct')) {
        button.style.backgroundColor = "#4CAF50";
        button.style.color = "white";
        updateScore(10); // Начисляем баллы
        currentCorrect++;
        
        // Если все правильные ответы найдены
        if (currentCorrect === neededToWin) {
            activateFinishBlock();
        }
    } else {
        button.style.backgroundColor = "#f44336";
        button.style.color = "white";
        updateScore(-5); // Штраф
    }
    button.disabled = true;
}

// УНИВЕРСАЛЬНАЯ ФУНКЦИЯ появления существующего блока
function activateFinishBlock() {
    const block = document.getElementById('finish-block');
    if (block) {
        // 1. Делаем блок видимым (flex, так как у вас в верстке была такая структура)
        block.style.display = 'flex';
        
        // 2. Если внутри блока есть элемент для финальных баллов, обновляем его
        const finalScoreLabel = block.querySelector('#final-points');
        if (finalScoreLabel) {
            finalScoreLabel.innerText = localStorage.getItem('pioneerScore') || 0;
        }

        // 3. Плавная прокрутка к блоку, чтобы игрок его заметил
        setTimeout(() => {
            block.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}
