document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    const sidebarLinks = sidebar.getElementsByTagName('a');
    Array.from(sidebarLinks).forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 576) {
                sidebar.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInside = sidebar.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInside && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});