window.onload = function() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observerOptions = {
        root: null, 
        threshold: 0.0 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-target-width');

            if (entry.isIntersecting) {
                bar.style.width = targetWidth; 
            } else {
                bar.style.width = '0%';
            }
        });
    };

    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.setAttribute('data-target-width', targetWidth);
        bar.style.width = '0%';
    });
    
    setTimeout(() => {
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }, 100); 
};