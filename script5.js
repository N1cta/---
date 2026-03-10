const board = document.getElementById('puzzle-board');
        const pieces = [];
        let selectedPiece = null;

        // Позиции для сетки 3x3
        const correctOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let currentOrder = [...correctOrder].sort(() => Math.random() - 0.5);

        function createPuzzle() {
            board.innerHTML = '';
            currentOrder.forEach((pos, index) => {
                const piece = document.createElement('div');
                piece.className = 'puzzle-piece';
                piece.dataset.index = index;
                piece.dataset.correctPos = pos;
                
                // Вычисляем смещение фона для нарезки картинки
                const row = Math.floor(pos / 3);
                const col = pos % 3;
                piece.style.backgroundPosition = `-${col * 150}px -${row * 150}px`;
                
                piece.addEventListener('click', () => handlePieceClick(piece));
                board.appendChild(piece);
                pieces.push(piece);
            });
        }

        function handlePieceClick(piece) {
            if (!selectedPiece) {
                selectedPiece = piece;
                piece.classList.add('selected');
            } else {
                const index1 = selectedPiece.dataset.index;
                const index2 = piece.dataset.index;

                // Меняем местами в массиве
                [currentOrder[index1], currentOrder[index2]] = [currentOrder[index2], currentOrder[index1]];
                
                selectedPiece.classList.remove('selected');
                selectedPiece = null;
                renderPieces();
                checkWin();
            }
        }

        function renderPieces() {
            const domPieces = document.querySelectorAll('.puzzle-piece');
            currentOrder.forEach((pos, index) => {
                const row = Math.floor(pos / 3);
                const col = pos % 3;
                domPieces[index].style.backgroundPosition = `-${col * 150}px -${row * 150}px`;
                domPieces[index].dataset.correctPos = pos;
            });
        }

        function checkWin() {
            const isWin = currentOrder.every((pos, index) => pos === index);
            if (isWin) {
                updateScore(150);
                document.getElementById('finish-block').style.display = 'block';
                document.querySelectorAll('.puzzle-piece').forEach(p => p.style.pointerEvents = 'none');
                document.getElementById('finish-block').scrollIntoView({behavior: 'smooth'});
            }
        }

        function updateScore(pts) {
            let score = parseInt(localStorage.getItem('pioneerScore') || 0);
            localStorage.setItem('pioneerScore', score + pts);
            document.getElementById('total-score').innerText = localStorage.getItem('pioneerScore');
        }

        window.onload = () => {
            createPuzzle();
            document.getElementById('total-score').innerText = localStorage.getItem('pioneerScore') || 0;
        };