// js/script.js (Conteúdo completo fornecido anteriormente)
document.addEventListener('DOMContentLoaded', () => {
    // Dados de exemplo para os projetos (mantidos para o modal)
    const projects = [
        // ... (seus objetos de projeto aqui) ...
    ];

    // Seletores do DOM
    const projectGrid = document.getElementById('project-grid');
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectModal = document.getElementById('project-modal');
    const closeButton = projectModal.querySelector('.close-button');

    // Função para filtrar projetos com animação (CORRETA)
    function filterProjects(filter) {
        const projectItems = document.querySelectorAll('.project-item');

        projectItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                // Se o item deve ser visível, remove classes de ocultação
                item.classList.remove('hide', 'filtered-out');
            } else {
                // Adiciona classe para iniciar a animação de saída
                item.classList.add('hide');
                // Após a transição, esconde o elemento completamente
                item.addEventListener('transitionend', function handler() {
                    item.classList.add('filtered-out');
                    item.removeEventListener('transitionend', handler);
                }, { once: true });
            }
        });
    }

    // Função para abrir o modal com os detalhes do projeto (CORRETA)
    function openProjectModal(projectId) {
        const project = projects.find(p => p.id == projectId);
        if (!project) return;

        projectModal.querySelector('#modal-title').textContent = project.title;
        projectModal.querySelector('#modal-client').textContent = project.client;
        projectModal.querySelector('#modal-services').textContent = project.services;
        projectModal.querySelector('#modal-period').textContent = project.period;
        projectModal.querySelector('#modal-objective').textContent = project.objective;
        projectModal.querySelector('#modal-description').textContent = project.description;
        projectModal.querySelector('#modal-results-text').textContent = project.results;
        projectModal.querySelector('#modal-testimonial').textContent = project.testimonial ? `"${project.testimonial}"` : 'Nenhum depoimento disponível.';

        const gallery = projectModal.querySelector('#modal-gallery');
        gallery.innerHTML = ''; // Limpa galeria antiga
        project.images.forEach(image => {
            gallery.innerHTML += `
                <div>
                    <img src="${image.src}" alt="${image.alt}">
                </div>
            `;
        });
        projectModal.style.display = 'block';
    }

    // Event Listeners para os botões de filtro (CORRETOS)
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentActive = document.querySelector('.filter-button.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            button.classList.add('active');
            filterProjects(button.getAttribute('data-filter'));
        });
    });

    // Delegação de eventos para os botões "Ver Detalhes" (CORRETA)
    const initialProjectItems = document.querySelectorAll('.project-item');
    initialProjectItems.forEach(item => {
        const viewDetailsButton = item.querySelector('.view-project-details');
        if (viewDetailsButton) {
            viewDetailsButton.addEventListener('click', (event) => {
                openProjectModal(event.target.getAttribute('data-project-id'));
            });
        }
    });

    // Event Listeners para fechar o modal (CORRETOS)
    if (closeButton) {
        closeButton.addEventListener('click', () => projectModal.style.display = 'none');
    }
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    // Animação de entrada para o cabeçalho da página (CORRETA)
    const portfolioHeader = document.querySelector('.portfolio-page-header');
    if(portfolioHeader) {
        portfolioHeader.querySelector('.section-title').classList.add('animated', 'fade-in-up');
        portfolioHeader.querySelector('.filters').classList.add('animated', 'fade-in-up');
        portfolioHeader.querySelector('.filters').style.animationDelay = '200ms';
    }
});