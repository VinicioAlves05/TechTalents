// CPF Mask
        document.getElementById('cpf').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });

        // File name display
        function updateFileName(input) {
            const fileName = document.getElementById('fileName');
            if (input.files.length > 0) {
                fileName.textContent = `Arquivo selecionado: ${input.files[0].name}`;
            } else {
                fileName.textContent = '';
            }
        }

        // Form submission
        document.getElementById('curriculumForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = ['nomeCompleto', 'cpf', 'endereco', 'estadoCivil', 'experiencia', 'escolaridade'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    input.style.borderColor = '#e53e3e';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                alert('Currículo enviado com sucesso!');
                // Here you would typically send the data to a server
                console.log('Form data:', new FormData(this));
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });

        // Navigation functionality
        document.querySelectorAll('.nav-left a, .auth-buttons button').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert(`Funcionalidade "${this.textContent}" será implementada em breve!`);
            });
        });