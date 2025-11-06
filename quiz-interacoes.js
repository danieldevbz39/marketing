// Arquivo: quiz-interacoes.js

// Lógica de Quiz Aperfeiçoada: Múltiplas tentativas, Emojis de Feedback
function checkAnswer(button) {
    const quizContainer = button.closest('.quiz-interaction');
    const feedbackElement = quizContainer.querySelector('.feedback');
    const buttons = quizContainer.querySelectorAll('.options button');
    const isCorrect = button.dataset.correct === 'true';
    // Armazena ou recupera o texto original do feedback (a resposta completa)
    let originalText = feedbackElement.getAttribute('data-original-text') || feedbackElement.textContent || '';
    // Se o atributo não existir, grava o texto atual como referência
    if (!feedbackElement.getAttribute('data-original-text')) {
        feedbackElement.setAttribute('data-original-text', originalText);
    }

    // 1. Reseta a estilização de todas as tentativas anteriores (mantém botões ativos)
    buttons.forEach(btn => {
        btn.style.backgroundColor = '#007bff';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.disabled = false;
    });

    // 2. Garante que o feedback comece oculto, será mostrado explicitamente abaixo
    feedbackElement.style.display = 'none';

    // 3. Lógica de Feedback e Estilização
    if (isCorrect) {
        // Opção Correta: destaca o botão e exibe a resposta completa com emoji 👍
        button.style.backgroundColor = '#1e8449'; // Verde para correto
        feedbackElement.className = 'feedback visible correct';
        // Exibe o emoji de joinha e a resposta original (garante texto legível)
        feedbackElement.textContent = `👍 ${originalText}`.trim();
        feedbackElement.style.display = 'block';

        // Desativa TODOS os botões após o ACERTO final
        buttons.forEach(btn => btn.disabled = true);

    } else {
        // Opção Incorreta: destaca o botão em vermelho e mostra apenas o emoji 👎
        button.style.backgroundColor = '#cb4335'; // Vermelho para incorreto
        feedbackElement.className = 'feedback visible incorrect';
        feedbackElement.textContent = '👎';
        feedbackElement.style.display = 'block';

        // Mantém os botões ativos para permitir novas tentativas
    }
}

// Lógica de Navegação da Sidebar (IntersectionObserver)
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.unit-card');
    const navLinks = document.querySelectorAll('#sidebar a');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                const targetId = entry.target.id;
                const activeLink = document.querySelector(`#sidebar a[href="#${targetId}"]`);
                
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});