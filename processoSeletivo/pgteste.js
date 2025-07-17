    // Test data
        const questions = [
            {
                id: 1,
                type: "Múltipla Escolha",
                title: "Qual é a diferença entre let, const e var em JavaScript?",
                description: "Selecione a alternativa que melhor descreve as diferenças entre essas três formas de declarar variáveis.",
                options: [
                    "var tem escopo de função, let e const têm escopo de bloco",
                    "Não há diferença entre elas",
                    "let é para números, const para strings, var para objetos",
                    "var é mais rápido que let e const"
                ],
                answer: null
            },
            {
              
                id: 3,
                type: "Múltipla Escolha",
                title: "O que é o Virtual DOM no React?",
                description: "Escolha a definição mais precisa sobre o Virtual DOM.",
                options: [
                    "Uma cópia em JavaScript do DOM real mantida em memória",
                    "Um banco de dados virtual para componentes React",
                    "Uma ferramenta de debug do React",
                    "Um servidor virtual para aplicações React"
                ],
                answer: null
            },
            {
               
                id: 5,
                type: "Múltipla Escolha",
                title: "Qual é o propósito do useEffect no React?",
                description: "Selecione a descrição mais adequada para o hook useEffect.",
                options: [
                    "Gerenciar efeitos colaterais em componentes funcionais",
                    "Criar novos componentes dinamicamente",
                    "Validar props de componentes",
                    "Otimizar a performance de renderização"
                ],
                answer: null
            },
            {
               
                id: 7,
                type: "Múltipla Escolha",
                title: "O que é Hoisting em JavaScript?",
                description: "Escolha a explicação correta sobre o conceito de Hoisting.",
                options: [
                    "Elevação de declarações de variáveis e funções para o topo do escopo",
                    "Processo de otimização do código JavaScript",
                    "Método para organizar arquivos em projetos",
                    "Técnica para melhorar a performance de loops"
                ],
                answer: null
            },
            {
             
                id: 9,
                type: "Múltipla Escolha",
                title: "Qual é a diferença entre == e === em JavaScript?",
                description: "Selecione a explicação correta sobre esses operadores de comparação.",
                options: [
                    "== compara valores, === compara valores e tipos",
                    "Não há diferença entre eles",
                    "== é mais rápido que ===",
                    "=== só funciona com números"
                ],
                answer: null
            },
         
        ];

        // Test state
        let currentQuestion = 0;
        let timeLeft = 45 * 60; // 45 minutes in seconds
        let timerInterval;

        // Initialize test
        function initTest() {
            generateQuestionNav();
            loadQuestion();
            startTimer();
        }

        // Generate question navigation
        function generateQuestionNav() {
            const nav = document.getElementById('questionNav');
            nav.innerHTML = '';
            
            questions.forEach((_, index) => {
                const btn = document.createElement('button');
                btn.className = 'nav-btn';
                btn.textContent = index + 1;
                btn.onclick = () => goToQuestion(index);
                nav.appendChild(btn);
            });
            
            updateQuestionNav();
        }

        // Update question navigation
        function updateQuestionNav() {
            const navBtns = document.querySelectorAll('.nav-btn');
            navBtns.forEach((btn, index) => {
                btn.classList.remove('current', 'answered');
                if (index === currentQuestion) {
                    btn.classList.add('current');
                } else if (questions[index].answer !== null) {
                    btn.classList.add('answered');
                }
            });
        }

        // Load current question
        function loadQuestion() {
            const question = questions[currentQuestion];
            const card = document.getElementById('questionCard');
            
            let optionsHtml = '';
            
            if (question.isTextArea) {
                optionsHtml = `
                    ${question.code ? `<div class="code-block">${highlightCode(question.code)}</div>` : ''}
                    <textarea class="text-answer" placeholder="Digite sua resposta aqui..." 
                              onchange="saveTextAnswer(this.value)">${question.answer || ''}</textarea>
                `;
            } else {
                optionsHtml = `
                    <div class="options-container">
                        ${question.options.map((option, index) => `
                            <div class="option ${question.answer === index ? 'selected' : ''}" 
                                 onclick="selectOption(${index})">
                                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                                <div class="option-text">${option}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            card.innerHTML = `
                <div class="question-header">
                    <div class="question-number">Questão ${currentQuestion + 1}</div>
                    <div class="question-type">${question.type}</div>
                </div>
                <h2 class="question-title">${question.title}</h2>
                <p class="question-description">${question.description}</p>
                ${optionsHtml}
            `;
            
            updateProgress();
            updateNavigation();
            updateQuestionNav();
        }

        // Highlight code syntax
        function highlightCode(code) {
            return code
                .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
                .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="string">$&</span>')
                .replace(/\b(function|const|let|var|if|else|for|while|return|async|await)\b/g, '<span class="keyword">$1</span>');
        }

        // Select option
        function selectOption(index) {
            questions[currentQuestion].answer = index;
            loadQuestion();
        }

        // Save text answer
        function saveTextAnswer(value) {
            questions[currentQuestion].answer = value;
            updateQuestionNav();
        }

        // Navigation functions
        function nextQuestion() {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
            }
        }

        function previousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                loadQuestion();
            }
        }

        function goToQuestion(index) {
            currentQuestion = index;
            loadQuestion();
        }

        // Update navigation buttons
        function updateNavigation() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const finishBtn = document.getElementById('finishBtn');
            
            prevBtn.disabled = currentQuestion === 0;
            
            if (currentQuestion === questions.length - 1) {
                nextBtn.style.display = 'none';
                finishBtn.style.display = 'inline-flex';
            } else {
                nextBtn.style.display = 'inline-flex';
                finishBtn.style.display = 'none';
            }
        }

        // Update progress
        function updateProgress() {
            const progressText = document.getElementById('progressText');
            const progressFill = document.getElementById('progressFill');
            
            const answered = questions.filter(q => q.answer !== null).length;
            const percentage = ((currentQuestion + 1) / questions.length) * 100;
            
            progressText.textContent = `${currentQuestion + 1} de ${questions.length} questões`;
            progressFill.style.width = `${percentage}%`;
        }

        // Timer functions
        function startTimer() {
            timerInterval = setInterval(() => {
                timeLeft--;
                updateTimer();
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    finishTest();
                }
            }, 1000);
        }

        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            document.getElementById('timeDisplay').textContent = display;
            
            const timer = document.getElementById('timer');
            timer.classList.remove('warning', 'danger');
            
            if (timeLeft <= 300) { // 5 minutes
                timer.classList.add('danger');
            } else if (timeLeft <= 600) { // 10 minutes
                timer.classList.add('warning');
            }
        }

        // Finish test functions
        function showFinishModal() {
            const answered = questions.filter(q => q.answer !== null).length;
            document.getElementById('answeredCount').textContent = answered;
            document.getElementById('finishModal').classList.add('show');
        }

        function closeFinishModal() {
            document.getElementById('finishModal').classList.remove('show');
        }

        function finishTest() {
            clearInterval(timerInterval);
            
            // Calculate results
            const answered = questions.filter(q => q.answer !== null).length;
            const percentage = Math.round((answered / questions.length) * 100);
            
            // Show results (in a real application, this would send data to server)
            alert(`Teste finalizado!\n\nQuestões respondidas: ${answered}/${questions.length}\nTempo utilizado: ${45 - Math.floor(timeLeft / 60)} minutos\n\nSeus dados foram enviados com sucesso!`);
            
            // Redirect or show results page
            window.location.href = 'index.html';
        }

        // Prevent page refresh/close without warning
        window.addEventListener('beforeunload', function(e) {
            e.preventDefault();
            e.returnValue = 'Tem certeza que deseja sair? Seu progresso será perdido.';
        });

        // Initialize test when page loads
        document.addEventListener('DOMContentLoaded', initTest);

        // Auto-save functionality (optional)
        setInterval(() => {
            // In a real application, save progress to server
            console.log('Auto-saving progress...');
        }, 30000); // Save every 30 seconds
    