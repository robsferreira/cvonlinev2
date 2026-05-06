// 1. Variável global para camadas (z-index)
let zIndexAtual = 100;[span_4](start_span)[span_4](end_span)

// 2. Funções de Interface
function abrirJanela(id) {
    const janela = document.getElementById(id);
    if (janela) {
        janela.classList.remove('hidden');[span_5](start_span)[span_5](end_span)
        focarJanela(id);
        
        // Para a animação de pulso no Dock
        const botoes = document.querySelectorAll('.dock-item');
        botoes.forEach(btn => btn.classList.remove('animar'));[span_6](start_span)[span_6](end_span)
    }
}

function fecharJanela(id) {
    const janela = document.getElementById(id);
    if (janela) {
        janela.classList.add('hidden');[span_7](start_span)[span_7](end_span)
    }
}

function focarJanela(id) {
    const janela = document.getElementById(id);
    if (janela) {
        zIndexAtual++;
        janela.style.zIndex = zIndexAtual;[span_8](start_span)[span_8](end_span)
    }
}

// --- LÓGICA UNIVERSAL PARA ARRASTAR (MOUSE + TOUCH) ---
const windows = document.querySelectorAll('.draggable');[span_9](start_span)[span_9](end_span)

windows.forEach(win => {
    const header = win.querySelector('.window-header');
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    // Função central para iniciar o movimento
    function startDragging(e) {
        isDragging = true;
        focarJanela(win.id);
        
        // Detecta se é toque ou mouse para pegar a posição correta
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

        offset.x = clientX - win.offsetLeft;
        offset.y = clientY - win.offsetTop;
        
        // Evita que a página role no celular enquanto arrasta
        if (e.type === 'touchstart') e.preventDefault(); 
    }

    // Função central para mover
    function moveDragging(e) {
        if (!isDragging) return;

        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        win.style.position = 'absolute';
        win.style.left = (clientX - offset.x) + 'px';
        win.style.top = (clientY - offset.y) + 'px';
    }

    function stopDragging() {
        isDragging = false;
    }

    // Eventos de Mouse (Desktop)
    header.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', moveDragging);
    document.addEventListener('mouseup', stopDragging);

    // Eventos de Toque (Celular/Tablet)
    header.addEventListener('touchstart', startDragging, { passive: false });
    document.addEventListener('touchmove', moveDragging, { passive: false });
    document.addEventListener('touchend', stopDragging);
    
    // Traz para frente ao clicar no corpo da janela
    win.addEventListener('mousedown', () => focarJanela(win.id));
    win.addEventListener('touchstart', () => focarJanela(win.id));
});
