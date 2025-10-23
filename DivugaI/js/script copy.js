document.addEventListener('DOMContentLoaded', () => {
    // Dados de exemplo para os projetos
    // Estes dados serão usados pelo modal para exibir os detalhes.
    // O 'data-project-id' no HTML deve corresponder ao 'id' aqui.
    const projects = [
        {
            id: 1,
            title: "Campanha de Verão Explosiva",
            category: "panfletagem",
            client: "Bronze & Sol Cosméticos",
            services: "Panfletagem estratégica, blitz em áreas movimentadas, ativação com promotores.",
            period: "Dezembro/2024 - Janeiro/2025",
            objective: "Aumentar o reconhecimento da marca e as vendas de protetor solar durante o verão em Palmas.",
            description: "Desenvolvemos uma campanha de panfletagem intensa em pontos chave da cidade, como praias e parques, com uma equipe de promotores treinados para interagir com o público. A ação incluiu distribuição de amostras e cupons de desconto.",
            images: [
                { src: "https://via.placeholder.com/600x400?text=Acao+Verao+1", alt: "Promotores distribuindo panfletos na praia" },
                { src: "https://via.placeholder.com/600x400?text=Acao+Verao+2", alt: "Panfleto da Campanha de Verão" },
                { src: "https://via.placeholder.com/600x400?text=Acao+Verao+3", alt: "Interação com o público" }
            ],
            results: "30.000 panfletos distribuídos, aumento de 25% nas vendas do produto durante o período da campanha. Feedback positivo dos clientes sobre a visibilidade da marca.",
            testimonial: "A equipe da Divulga-I superou nossas expectativas! A campanha de verão foi um sucesso e realmente impulsionou nossas vendas. - Gerente de Marketing, Bronze & Sol."
        },
        {
            id: 2,
            title: "Lançamento de Produto Inovador",
            category: "eventos",
            client: "Tech Solutions Ltda.",
            services: "Organização de evento de ativação de marca, design de convites e materiais de apoio, cobertura fotográfica.",
            period: "Abril/2025",
            objective: "Criar buzz em torno do lançamento de um novo aplicativo de produtividade e atrair investidores.",
            description: "Organizamos um coquetel de lançamento exclusivo para imprensa e potenciais investidores. Cuidamos de toda a ambientação, logística, buffet e do design de todos os materiais visuais, desde o convite digital até os banners do evento.",
            images: [
                { src: "https://via.placeholder.com/600x400?text=Evento+Produto+1", alt: "Cenário do evento de lançamento" },
                { src: "https://via.placeholder.com/600x400?text=Evento+Produto+2", alt: "Convite do evento" },
                { src: "https://via.placeholder.com/600x400?text=Evento+Produto+3", alt: "Participantes interagindo" }
            ],
            results: "Mídia espontânea em 5 veículos locais, 150 participantes qualificados, 3 propostas de investimento inicial. O evento gerou grande repercussão nas redes sociais.",
            testimonial: "O evento de lançamento foi impecável! A Divulga-I cuidou de cada detalhe, permitindo que nos concentrássemos apenas em apresentar nosso produto. - CEO, Tech Solutions."
        },
        {
            id: 3,
            title: "Branding Completo para Startup",
            category: "design",
            client: "FitLife Consultoria",
            services: "Criação de logotipo, manual de identidade visual, design de papelaria (cartões, timbrados), folder institucional.",
            period: "Janeiro/2025 - Março/2025",
            objective: "Desenvolver uma identidade visual moderna e profissional para uma nova startup de consultoria em bem-estar.",
            description: "Trabalhamos em estreita colaboração com a FitLife para entender sua visão e valores. Criamos um logotipo que transmite vitalidade e equilíbrio, e desdobramos essa identidade em diversos materiais para garantir uma comunicação coesa e impactante.",
            images: [
                { src: "https://via.placeholder.com/600x400?text=Logo+FitLife", alt: "Logotipo FitLife" },
                { src: "https://via.placeholder.com/600x400?text=Manual+Marca", alt: "Página do manual de marca" },
                { src: "https://via.placeholder.com/600x400?text=Cartao+FitLife", alt: "Cartão de visitas FitLife" }
            ],
            results: "Identidade visual aprovada e implementada, aumento percebido de profissionalismo pela audiência-alvo. Cliente satisfeito com a nova imagem da empresa.",
            testimonial: "A Divulga-I captou a essência da nossa empresa e transformou em uma identidade visual que nos representa. Estamos muito felizes com o resultado! - Fundador, FitLife Consultoria."
        },
        {
            id: 4,
            title: "Gestão de Mídias Sociais - Comércio Local",
            category: "digital",
            client: "Café Aroma Tocantins",
            services: "Criação de conteúdo mensal, agendamento de posts, gerenciamento de interações, campanhas de impulsionamento (tráfego pago).",
            period: "Fevereiro/2025 - Presente",
            objective: "Aumentar o engajamento online, atrair novos clientes para a cafeteria física e promover produtos sazonais.",
            description: "Desenvolvemos um calendário editorial focado na cultura do café e nos diferenciais do Café Aroma Tocantins. Criamos posts visuais atraentes, realizamos sessões de fotos e gerenciamos campanhas de anúncios para alcançar um público maior em Palmas.",
            images: [
                { src: "https://via.placeholder.com/600x400?text=Post+Cafe+1", alt: "Post de café no Instagram" },
                { src: "https://via.placeholder.com/600x400?text=Post+Cafe+2", alt: "Post promocional de produto sazonal" },
                { src: "https://via.placeholder.com/600x400?text=Stories+Cafe", alt: "Exemplo de Stories interativo" }
            ],
            results: "Aumento de 80% no engajamento do Instagram, 30% de crescimento na base de seguidores orgânicos, aumento de 15% no fluxo de clientes para a loja física.",
            testimonial: "Nossas redes sociais nunca foram tão profissionais e atrativas! A Divulga-I realmente entende do assunto e trouxe resultados incríveis para nosso café. - Proprietário, Café Aroma Tocantins."
        },
        {
            id: 5,
            title: "Ação Promocional Supermercado",
            category: "panfletagem",
            client: "Super Preço Palmas",
            services: "Equipe de promotores, distribuição de flyers e brindes, organização de fila para sorteio.",
            period: "Maio/2025",
            objective: "Divulgar a semana de ofertas especiais e impulsionar as vendas de categorias específicas.",
            description: "Mobilizamos uma equipe de promotores uniformizados para atuar na entrada e corredores do supermercado, distribuindo encartes com ofertas e engajando os clientes. Também organizamos a logística para um sorteio de prêmios, controlando o fluxo de pessoas e garantindo a ordem.",
            images: [
                { src: "https://via.placeholder.com/600x400?text=Acao+Supermercado+1", alt: "Promotores na entrada do supermercado" },
                { src: "https://via.placeholder.com/600x400?text=Acao+Supermercado+2", alt: "Distribuição de brindes" },
                { src: "https://via.placeholder.com/600x400?text=Acao+Supermercado+3", alt: "Fila para sorteio" }
            ],
            results: "Aumento de 10% no ticket médio durante a semana da ação, 5.000 brindes distribuídos, grande aprovação dos clientes pela iniciativa.",
            testimonial: "A ação foi muito bem executada! A equipe da Divulga-I foi proativa e garantiu que a promoção fosse um sucesso. - Gerente Comercial, Super Preço Palmas."
        },
        {
            id: 6,
            title: "Feira de Negócios Palmas",
            category: "eventos",
            client: "Associação Comercial de Palmas",
            services: "Organização e montagem de stand, material de divulgação para a feira, coordenação de atividades no local.",
            period: "Junho/2025",
            objective: "Garantir a visibilidade e participação efetiva da Associação em uma importante feira de negócios local.",
            description: "Fomos responsáveis por todo o planejamento e execução do stand da Associação. Criamos um design atraente, produzimos banners e folhetos informativos, e coordenamos a equipe que atendeu os visitantes, promovendo os serviços da Associação.",
            images: [
                { src: "https://via.placeholder.com/600x400?text=Feira+Negocios+1", alt: "Stand da Associação na feira" },
                { src: "https://via.placeholder.com/600x400?text=Feira+Negocios+2", alt: "Banners e flyers no stand" },
                { src: "https://via.placeholder.com/600x400?text=Feira+Negocios+3", alt: "Equipe no stand interagindo" }
            ],
            results: "Aumento de 40% nas novas associações durante o evento, alto fluxo de visitantes no stand. Cliente extremamente satisfeito com a representação.",
            testimonial: "A Divulga-I foi fundamental para o nosso sucesso na feira. O stand estava impecável e a equipe foi muito profissional. - Presidente, Associação Comercial de Palmas."
        },
    ];

    // Seletores do DOM
    const projectGrid = document.getElementById('project-grid');
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectModal = document.getElementById('project-modal');
    const closeButton = projectModal.querySelector('.close-button');

    // Função para filtrar projetos com animação
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

    // Função para abrir o modal com os detalhes do projeto
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

    // Event Listeners para os botões de filtro
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

    // Delegação de eventos para os botões "Ver Detalhes"
    // Pega todos os itens do projeto que já estão no HTML
    const initialProjectItems = document.querySelectorAll('.project-item');
    initialProjectItems.forEach(item => {
        const viewDetailsButton = item.querySelector('.view-project-details');
        if (viewDetailsButton) {
            viewDetailsButton.addEventListener('click', (event) => {
                openProjectModal(event.target.getAttribute('data-project-id'));
            });
        }
    });

    // Event Listeners para fechar o modal
    if (closeButton) {
        closeButton.addEventListener('click', () => projectModal.style.display = 'none');
    }
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    // Animação de entrada para o cabeçalho da página (mantida)
    const portfolioHeader = document.querySelector('.portfolio-page-header');
    if(portfolioHeader) {
        portfolioHeader.querySelector('.section-title').classList.add('animated', 'fade-in-up');
        portfolioHeader.querySelector('.filters').classList.add('animated', 'fade-in-up');
        portfolioHeader.querySelector('.filters').style.animationDelay = '200ms';
    }
});