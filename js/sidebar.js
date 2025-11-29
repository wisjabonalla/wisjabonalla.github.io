document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.left-sidebar');
    
    if (sidebar) {
        setTimeout(() => {
            sidebar.classList.add('active');
        }, 100); 
    }
});