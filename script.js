// 1. Variável global para controlar a ordem das camadas (z-index)
let zIndexAtual = 100; 

// 2. Função para abrir a janela
function abrirJanela(id) {
    const janela = document.getElementById(id);
    if (janela) {
        janela.classList.remove('hidden');
        focarJanela(id);

        // Remove a animação de pulso de todos os botões do dock após o primeiro clique
        const botoes = document.querySelectorAll('.dock-item');
        botoes.forEach(btn => {
            btn.classList.remove('animar'); // Remove a animação original
            btn.classList.add('no-pulse');  // Garante que não pulse mais
        });
    }
}

// 3. Função para fechar a janela (A que estava faltando!)
function fecharJanela(id) {
    const janela = document.getElementById(id);
    if (janela) {
        janela.classList.add('hidden');
    }
}

// 4. Função para trazer a janela para frente
function focarJanela(id) {
    const janela = document.getElementById(id);
    if (janela) {
        zIndexAtual++;
        janela.style.zIndex = zIndexAtual;
    }
}

// --- LÓGICA DE ARRASTAR (DRAG AND DROP) ---
const windows = document.querySelectorAll('.draggable');

windows.forEach(win => {
    const header = win.querySelector('.window-header');
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    // Traz para frente ao clicar em qualquer lugar da janela
    win.addEventListener('mousedown', () => {
        focarJanela(win.id);
    });

    // Lógica quando o mouse aperta no cabeçalho
    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offset.x = e.clientX - win.offsetLeft;
        offset.y = e.clientY - win.offsetTop;
    });

    // Lógica quando o mouse se move
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        win.style.position = 'absolute';
        win.style.left = (e.clientX - offset.x) + 'px';
        win.style.top = (e.clientY - offset.y) + 'px';
    });

    // Lógica quando solta o mouse
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});