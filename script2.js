let firstChoice = null;
let matchesFound = 0;

function updateScore(points) {
    let score = parseInt(localStorage.getItem('pioneerScore')) || 0;
    score = Math.max(0, score + points);
    localStorage.setItem('pioneerScore', score);
    const scoreDisplay = document.getElementById('total-score');
    if (scoreDisplay) scoreDisplay.innerText = score;
}

document.querySelectorAll('.match_item').forEach(item => {
    item.addEventListener('click', function() {
        // 1. Если блок уже угадан (зеленый) или уже выбран (рамка) — выходим
        if (this.classList.contains('matched') || this.classList.contains('selected')) return;

        if (!firstChoice) {
            // ПЕРВЫЙ КЛИК
            firstChoice = this;
            this.classList.add('selected');
        } else {
            // ВТОРОЙ КЛИК
            const isMatch = this.dataset.id === firstChoice.dataset.id;
            const isDifferentColumn = this.parentNode !== firstChoice.parentNode;

            if (isMatch && isDifferentColumn) {
                // ПРАВИЛЬНО: Делаем оба зелеными и ЗАБЫВАЕМ про них
                this.classList.remove('selected');
                firstChoice.classList.remove('selected');
                
                this.classList.add('matched');
                firstChoice.classList.add('matched');
                
                updateScore(20);
                matchesFound++;
                firstChoice = null; // Очищаем выбор для следующей пары

                if (matchesFound === 8) {
                    document.getElementById('finish-block').style.display = 'flex';
                    document.getElementById('finish-block').scrollIntoView({behavior: 'smooth'});
                }
            } else {
                // ОШИБКА
                const secondChoice = this;
                secondChoice.classList.add('error');
                firstChoice.classList.add('error');
                
                updateScore(-5);
                
                // Чтобы игрок не мог кликать во время анимации ошибки
                document.body.style.pointerEvents = "none";

                setTimeout(() => {
                    secondChoice.classList.remove('error');
                    firstChoice.classList.remove('error', 'selected');
                    firstChoice = null; // Очищаем выбор
                    document.body.style.pointerEvents = "all"; // Возвращаем клики
                }, 500);
            }
        }
    });
});

window.onload = () => {
    document.getElementById('total-score').innerText = localStorage.getItem('pioneerScore') || 0;
};