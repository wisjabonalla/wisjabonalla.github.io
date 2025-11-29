document.addEventListener('DOMContentLoaded', () => {
    const fadeUpElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                observer.unobserve(entry.target); 

            } 
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeUpElements.forEach(element => {
        observer.observe(element);
    });
});