/* ===================================================================
   WEB DEV UNIFICADO - SCRIPT.JS
   
   Toda a lógica está dentro de um 'DOMContentLoaded' para
   garantir que o HTML foi carregado antes de executar o script.
   
   Cada componente é "encapsulado" em um bloco if(elemento)
   para evitar conflitos de seletores e variáveis.
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- LÓGICA DA SEÇÃO 7: Evento 'click' --- */
    const btnClick = document.querySelector('#demo-btn-click');
    const resClick = document.querySelector('#demo-click-resultado');
    if (btnClick && resClick) {
        btnClick.addEventListener('click', () => {
            resClick.textContent = 'Botão clicado! ' + new Date().toLocaleTimeString();
        });
    }

    /* --- LÓGICA DA SEÇÃO 8: Evento 'keydown' --- */
    const inputKey = document.querySelector('#demo-input-key');
    const resKey = document.querySelector('#demo-key-resultado');
    if (inputKey && resKey) {
        inputKey.addEventListener('keydown', (event) => {
            resKey.textContent = `Você pressionou: ${event.key}`;
            if (event.key === 'Enter') {
                resKey.textContent = 'Você pressionou Enter!';
            }
        });
    }

    /* --- LÓGICA DA SEÇÃO 9: Eventos 'mouseover' e 'mouseout' --- */
    const boxMouse = document.querySelector('#demo-box-mouse');
    if (boxMouse) {
        boxMouse.addEventListener('mouseover', () => {
            boxMouse.textContent = 'Cursor DENTRO';
            boxMouse.style.backgroundColor = 'var(--color-js)';
            boxMouse.style.color = '#333';
        });

        boxMouse.addEventListener('mouseout', () => {
            boxMouse.textContent = 'Cursor FORA';
            boxMouse.style.backgroundColor = '#eee';
            boxMouse.style.color = '#333';
        });
    }
    
    /* --- LÓGICA DA SEÇÃO 10: Delegação de Eventos --- */
    const listaDelegation = document.querySelector('#demo-lista-delegation');
    if (listaDelegation) {
        listaDelegation.addEventListener('click', (event) => {
            // Verifica se o clique foi em um LI (e não no UL)
            if (event.target.tagName === 'LI') {
                // Remove a classe 'active' de todos os filhos
                Array.from(listaDelegation.children).forEach(child => {
                    child.classList.remove('active');
                });
                
                // Adiciona a classe 'active' apenas no alvo
                event.target.classList.add('active');
            }
        });
    }

    /* --- LÓGICA DA SEÇÃO 11: Exemplo 'preventDefault' --- */
    const formPrevent = document.querySelector('#demo-form-prevent');
    const resFormPrevent = document.querySelector('#demo-form-prevent-resultado');
    if (formPrevent && resFormPrevent) {
        formPrevent.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede a página de recarregar
            resFormPrevent.textContent = 'Formulário enviado via JS! A página não recarregou.';
        });
    }

    /* ===================================================================
       LÓGICA DO COMPONENTE: CALCULADORA
       =================================================================== */
    
    // Função auxiliar de cálculo (escopo local do DOMContentLoaded)
    function calcular(n1, op, n2) {
        const num1 = parseFloat(n1);
        const num2 = parseFloat(n2);
        if (op === 'add') return num1 + num2;
        if (op === 'subtract') return num1 - num2;
        if (op === 'multiply') return num1 * num2;
        if (op === 'divide') {
            if (num2 === 0) return 'Erro!'; // Divisão por zero
            return num1 / num2;
        }
        return num2; // fallback
    }

    // Encapsulamento da lógica da calculadora
    const elCalculadora = document.querySelector('.calculadora');
    if (elCalculadora) {
        // Seletores relativos ao 'elCalculadora'
        const display = elCalculadora.querySelector('.calculadora-display');
        const teclado = elCalculadora.querySelector('.calculadora-teclado');
        
        // Estado da calculadora
        let estado = {
            displayValue: '0',
            primeiroOperando: null,
            operador: null,
            esperandoSegundoOperando: false
        };

        // Reseta o estado
        function resetarCalculadora() {
            estado.displayValue = '0';
            estado.primeiroOperando = null;
            estado.operador = null;
            estado.esperandoSegundoOperando = false;
        }

        teclado.addEventListener('click', (e) => {
            if (!e.target.matches('button')) return; // Ignora cliques fora dos botões
            
            const key = e.target;
            const action = key.dataset.action;
            const keyContent = key.textContent;
            let displayValue = estado.displayValue;

            // 1. Se for um número
            if (!action) {
                if (displayValue === '0' || estado.esperandoSegundoOperando) {
                    estado.displayValue = keyContent;
                    estado.esperandoSegundoOperando = false;
                } else {
                    estado.displayValue = displayValue.length < 10 ? displayValue + keyContent : displayValue; // Limite de dígitos
                }
            }
            
            // 2. Se for um decimal
            if (action === 'decimal') {
                if (estado.esperandoSegundoOperando) {
                    estado.displayValue = '0.';
                    estado.esperandoSegundoOperando = false;
                } else if (!displayValue.includes('.')) {
                    estado.displayValue += '.';
                }
            }

            // 3. Se for um operador
            if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                if (estado.operador && estado.esperandoSegundoOperando) {
                    estado.operador = action; // Troca o operador
                    return;
                }

                if (estado.primeiroOperando === null) {
                    estado.primeiroOperando = displayValue;
                } else if (estado.operador) {
                    const result = calcular(estado.primeiroOperando, estado.operador, displayValue);
                    estado.displayValue = String(result);
                    estado.primeiroOperando = String(result);
                }
                
                estado.operador = action;
                estado.esperandoSegundoOperando = true;
            }

            // 4. Se for 'clear' (AC)
            if (action === 'clear') {
                resetarCalculadora();
            }

            // 5. Se for 'calculate' (=)
            if (action === 'calculate') {
                if (estado.operador && estado.primeiroOperando !== null) {
                    const result = calcular(estado.primeiroOperando, estado.operador, displayValue);
                    estado.displayValue = String(result);
                    estado.primeiroOperando = null; // Reset para próximo cálculo
                    estado.operador = null;
                    estado.esperandoSegundoOperando = false;
                }
            }
            
            // Outras ações (sign, percent)
            if (action === 'sign' && displayValue !== '0') {
                estado.displayValue = displayValue.startsWith('-') ? displayValue.substring(1) : `-${displayValue}`;
            }
            if (action === 'percent') {
                estado.displayValue = String(parseFloat(displayValue) / 100);
            }

            // Atualiza o display no final
            display.textContent = estado.displayValue.length > 12 ? parseFloat(estado.displayValue).toExponential(5) : estado.displayValue;
        });

        // Inicia limpa
        resetarCalculadora();
        display.textContent = estado.displayValue;
    }


    /* ===================================================================
       LÓGICA DO COMPONENTE: CARROSSEL
       =================================================================== */
    
    // Encapsulamento da lógica do Carrossel
    const elCarrossel = document.querySelector('.carrossel');
    if (elCarrossel) {
        // Seletores relativos
        const filmstrip = elCarrossel.querySelector('.carrossel-filmstrip');
        const slides = Array.from(filmstrip.children);
        const prevBtn = elCarrossel.querySelector('.carrossel-btn.prev');
        const nextBtn = elCarrossel.querySelector('.carrossel-btn.next');
        const totalSlides = slides.length;
        let currentIndex = 0;

        // Função para mover o filmstrip
        function goToSlide(index) {
            if (index < 0 || index >= totalSlides) {
                console.warn('Índice do slide inválido');
                return;
            }
            // Move o filmstrip horizontalmente
            filmstrip.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        }

        // Evento do botão "Próximo"
        nextBtn.addEventListener('click', () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= totalSlides) {
                nextIndex = 0; // Volta para o primeiro slide
            }
            goToSlide(nextIndex);
        });

        // Evento do botão "Anterior"
        prevBtn.addEventListener('click', () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = totalSlides - 1; // Vai para o último slide
            }
            goToSlide(prevIndex);
        });

        // Inicia no primeiro slide
        goToSlide(0);
    }
    
    
    /* ===================================================================
       LÓGICA DO COMPONENTE: MODAL
       =================================================================== */
    
    // Encapsulamento da lógica do Modal
    const btnAbrir = document.querySelector('#btn-abrir-modal');
    const btnFechar = document.querySelector('#btn-fechar-modal');
    const modal = document.querySelector('#meu-modal');

    if (btnAbrir && btnFechar && modal) {
        
        // Função para abrir
        function abrirModal() {
            modal.classList.add('ativo');
        }
        
        // Função para fechar
        function fecharModal() {
            modal.classList.remove('ativo');
        }

        // 1. JS adiciona a classe 'ativo' no clique de ABRIR
        btnAbrir.addEventListener('click', abrirModal);

        // 2. JS remove a classe 'ativo' no clique de FECHAR
        btnFechar.addEventListener('click', fecharModal);
        
        // 3. (Bônus) Fechar o modal se clicar fora (na área cinza)
        modal.addEventListener('click', (event) => {
            // Se o alvo do clique (event.target) for o PRÓPRIO container do modal...
            if (event.target === modal) {
                 fecharModal();
            }
        });
        
        // 4. (Bônus) Fechar com a tecla ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('ativo')) {
                fecharModal();
            }
        });
    }

}); // Fim do DOMContentLoaded