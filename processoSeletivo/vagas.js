
        // Job data
        const jobs = [
            {
                id: 1,
                company: 'Gupy Tech',
                title: 'Desenvolvedor Frontend',
                background: 'gupy',
                logo: 'GUPY',
                candidates: '67 vagas em aberto',
                details: {
                    'Última candidatura': 'Em 20/08/2023',
                    'Tempo de vaga': '5/5'
                },
                tags: ['Presencial em SP', 'Pleno/Jr'],
                applicants: '1/4'
            },
            {
                id: 2,
                company: 'Itaú Unibanco',
                title: 'Analista de Sistemas',
                background: 'itau',
                logo: 'itaú',
                candidates: '23 vagas em aberto',
                details: {
                    'Última candidatura': 'Em 15/07/2023',
                    'Tempo de vaga': '5/5'
                },
                tags: ['Tempo de vaga', '5/5'],
                applicants: '2/4'
            },
            {
                id: 3,
                company: 'Globo',
                title: 'Designer UX/UI',
                background: 'globo',
                logo: 'globo',
                candidates: '15 vagas em aberto',
                details: {
                    'Última candidatura': 'Em 10/09/2023',
                    'Tempo de vaga': '3/5'
                },
                tags: ['Tempo de vaga', '3/5'],
                applicants: '3/7'
            },
            {
                id: 4,
                company: 'Grupo Boticário',
                title: 'Product Designer',
                background: 'boticario',
                logo: 'BOT',
                candidates: '54 vagas em aberto',
                details: {
                    'Última candidatura': 'Em 05/08/2023',
                    'Tempo de vaga': '4/5'
                },
                tags: ['Presencial', '1/4'],
                applicants: '1/4'
            },
            {
                id: 5,
                company: 'Môre Talent Tech',
                title: 'Desenvolvedor Full Stack',
                background: 'more',
                logo: 'môre',
                candidates: '32 vagas em aberto',
                details: {
                    'Última candidatura': 'Em 25/09/2023',
                    'Tempo de vaga': '4/5'
                },
                tags: ['À distância', '4/5'],
                applicants: '4/5'
            },
            {
                id: 6,
                company: 'Queima Diária',
                title: 'Gerente de Produto',
                background: 'queima',
                logo: 'QD',
                candidates: '8 vagas em aberto',
                details: {
                    'Última candidatura': 'Em 30/09/2023',
                    'Tempo de vaga': '5/5'
                },
                tags: ['Presencial', '3/5'],
                applicants: '3/5'
            }
        ];

        // Render jobs
        function renderJobs() {
            const jobsGrid = document.getElementById('jobsGrid');
            jobsGrid.innerHTML = '';

            jobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.className = 'job-card';
                jobCard.innerHTML = `
                    <div class="job-header">
                        <div class="job-bg ${job.background}"></div>
                        <div class="company-logo">${job.logo}</div>
                    </div>
                    <div class="job-content">
                        <h3 class="job-title">${job.company}</h3>
                        <div class="job-details">
                            <div class="job-detail">
                                <span class="job-detail-label">Nº candidaturas em:</span>
                                <span class="job-detail-value">${job.candidates}</span>
                            </div>
                            ${Object.entries(job.details).map(([key, value]) => `
                                <div class="job-detail">
                                    <span class="job-detail-label">${key}:</span>
                                    <span class="job-detail-value">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="job-tags">
                            ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                        </div>
                        <div class="job-footer">
                            <button class="btn-apply" onclick="applyToJob(${job.id})">Todas as suas vagas</button>
                            <span class="applicants">${job.applicants}</span>
                        </div>
                    </div>
                `;
                jobsGrid.appendChild(jobCard);
            });
        }

        // Event handlers
        function navigateTo(section) {
            alert(`Navegando para: ${section.toUpperCase()}`);
        }

        function showLogin() {
            alert('Abrindo tela de login...');
        }

        function showRegister() {
            alert('Abrindo tela de registro...');
        }

        function searchJobs() {
            alert('Buscando novas vagas...');
        }

        function applyToJob(jobId) {
            const job = jobs.find(j => j.id === jobId);
            alert(`Visualizando todas as vagas da ${job.company}`);
        }

        // Applications data
        const applications = [
            {
                id: 1,
                company: 'Ambev Global Tech',
                background: 'ambev',
                logo: '🍺',
                status: 'Vaga encerrada para essa empresa',
                candidates: '04 vagas nessa empresa',
                details: {
                    'Última candidatura': 'Em 04/09/23',
                    'Tempo': '5/5'
                },
                tags: ['Tempo'],
                closed: true
            },
            {
                id: 2,
                company: 'Riachuelo AQUI',
                background: 'riachuelo',
                logo: 'R',
                status: 'Vaga encerrada para essa empresa',
                candidates: '04 vagas nessa empresa',
                details: {
                    'Última candidatura': 'Em 07/10/23',
                    'Tempo': '5/5'
                },
                tags: ['Tempo na Empresa'],
                closed: false
            },
            {
                id: 3,
                company: 'Instituto Ayrton Senna',
                background: 'ayrton',
                logo: 'IAS',
                status: 'Vaga encerrada para essa empresa',
                candidates: '03 vagas nessa empresa',
                details: {
                    'Última candidatura': 'Em 04/10/23',
                    'Tempo': '5/5'
                },
                tags: ['Currículo'],
                closed: true
            },
            {
                id: 4,
                company: 'UOL EdTech',
                background: 'uol',
                logo: 'UOL',
                status: 'Vaga encerrada para essa empresa',
                candidates: '02 vagas nessa empresa',
                details: {
                    'Última candidatura': 'Em 02/10/23',
                    'Tempo': '5/5'
                },
                tags: ['Presencial em SP', 'Sênior'],
                closed: true
            },
            {
                id: 5,
                company: 'Gupy',
                background: 'gupy-app',
                logo: '⭐',
                status: 'Vaga encerrada para essa empresa',
                candidates: '30 vagas nessa empresa',
                details: {
                    'Última candidatura': 'Em 07/09/23',
                    'Tempo': '5/5'
                },
                tags: ['Empresa com Diversão'],
                closed: false
            },
            {
                id: 6,
                company: 'Haynda Motorbane Intermedica',
                background: 'haynda',
                logo: 'H',
                status: 'Vaga encerrada para essa empresa',
                candidates: '03 vagas nessa empresa',
                details: {
                    'Última candidatura': 'Em 09/09/23',
                    'Tempo': '5/5'
                },
                tags: ['Tempo'],
                closed: true
            }
        ];

        // Render applications
        function renderApplications() {
            const applicationsGrid = document.getElementById('applicationsGrid');
            if (!applicationsGrid) return;
            
            applicationsGrid.innerHTML = '';

            applications.forEach(app => {
                const appCard = document.createElement('div');
                appCard.className = 'application-card';
                appCard.innerHTML = `
                    <div class="application-header ${app.background}">
                        <div class="application-logo">${app.logo}</div>
                        <div class="application-status">
                            <span>👁️</span>
                            <span>${app.status}</span>
                        </div>
                    </div>
                    <div class="application-content">
                        <h3 class="application-company">${app.company}</h3>
                        <div class="application-details">
                            <div class="application-detail">
                                <span class="application-detail-label">Nº candidaturas em:</span>
                                <span class="application-detail-value">${app.candidates}</span>
                            </div>
                            ${Object.entries(app.details).map(([key, value]) => `
                                <div class="application-detail">
                                    <span class="application-detail-label">${key}:</span>
                                    <span class="application-detail-value">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="application-tags">
                            ${app.tags.map(tag => `<span class="application-tag ${app.closed ? 'closed' : ''}">${tag}</span>`).join('')}
                        </div>
                        <div class="application-footer">
                            ${app.closed ? 
                                '<button class="btn-closed">Vaga encerrada</button>' : 
                                '<button class="btn-search-new" onclick="searchNewPosition(' + app.id + ')">Buscar nova vaga</button>'
                            }
                            <span class="applicants">${app.details.Tempo || '5/5'}</span>
                        </div>
                    </div>
                `;
                applicationsGrid.appendChild(appCard);
            });
        }

        // Additional event handlers
        function viewMoreApplications() {
            alert('Visualizando mais candidaturas...');
        }

        function searchNewPosition(appId) {
            const app = applications.find(a => a.id === appId);
            alert(`Buscando nova vaga na ${app.company}`);
        }

        // Update the DOMContentLoaded event listener
        document.addEventListener('DOMContentLoaded', function() {
            renderJobs();
            renderApplications();
            
            // Animate cards
            const allCards = document.querySelectorAll('.job-card, .application-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            });

            allCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.6s ease';
                observer.observe(card);
            });
        });