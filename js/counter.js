    function startCounter(counterElement, targetValue, duration) {
        let startValue = 0;
        let adjustedTarget = targetValue + 1;
        let increment = adjustedTarget / (duration / 16); 

        const counter = setInterval(() => {
            startValue += increment;

            if (startValue >= adjustedTarget) {
                clearInterval(counter);
                counterElement.innerText = targetValue + '+';
            } else {
                counterElement.innerText = Math.floor(startValue); 
            }
        }, 16); 
    }

    document.addEventListener('DOMContentLoaded', () => {
        const counterElement = document.getElementById('projects-counter');
        const targetValue = 10; 

        if (!counterElement) return; 

        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.5 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target, targetValue, 1500); 
                    
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        observer.observe(counterElement);
    });