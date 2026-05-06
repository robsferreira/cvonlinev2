// 1. Variáveis Globais
let zIndexAtual = 100;

// 2. Funções de Controle de Interface
function abrirJanela(id) {
    const janela = document.getElementById(id);
    if (janela) {
        janela.classList.remove('hidden');
        focarJanela(id);

        // Remove a animação de pulso do menu ao interagir
        const botoes = document.querySelectorAll('.dock-item');
        botoes.forEach(btn => btn.classList.remove('animar'));
    }
}

function fecharJanela(id) {
    const janela = document.getElementById(id);
    if (janela) {
        janela.classList.add('hidden');
    }
}

function focarJanela(id) {
    const janela = document.getElementById(id);
    if (janela) {
        zIndexAtual++;
        janela.style.zIndex = zIndexAtual;
    }
}

// 3. Lógica de Arrastar (Mouse + Touch)
const windows = document.querySelectorAll('.draggable');

windows.forEach(win => {
    const header = win.querySelector('.window-header');
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    // Início do Arraste
    const startDragging = (e) => {
        isDragging = true;
        focarJanela(win.id);

        // Define se a origem é toque ou clique
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        offset.x = clientX - win.offsetLeft;
        offset.y = clientY - win.offsetTop;
    };

    // Movimentação
    const moveDragging = (e) => {
        if (!isDragging) return;

        // Impede o scroll da página apenas no celular durante o movimento
        if (e.type === 'touchmove') e.preventDefault();

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        win.style.position = 'absolute';
        win.style.left = (clientX - offset.x) + 'px';
        win.style.top = (clientY - offset.y) + 'px';
    };

    const stopDragging = () => {
        isDragging = false;
    };

    // Eventos para Mouse[cite: 2]
    header.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', moveDragging);
    document.addEventListener('mouseup', stopDragging);

    // Eventos para Touch[cite: 2]
    header.addEventListener('touchstart', startDragging, { passive: true });
    document.addEventListener('touchmove', moveDragging, { passive: false });
    document.addEventListener('touchend', stopDragging);

    // Focar ao clicar no corpo da janela[cite: 2]
    win.addEventListener('mousedown', () => focarJanela(win.id));
});
