function startCounter(counterElement, targetValue, duration) {
        let startValue = 0;
        let adjustedTarget = targetValue + 1; 
        let increment = adjustedTarget / (duration / 24); 

        const needsPlus = counterElement.id === 'projects-counter'; 

        const counter = setInterval(() => {
            startValue += increment;

            if (startValue >= adjustedTarget) {
                clearInterval(counter);
                
                if (needsPlus) {
                    counterElement.innerText = targetValue + '+';
                } else {
                    counterElement.innerText = targetValue;
                }
            } else {
                counterElement.innerText = Math.floor(startValue); 
            }
        }, 16); 
    }

    document.addEventListener('DOMContentLoaded', () => {
        const counterElementProjects = document.getElementById('projects-counter');
        const counterElementWebsite = document.getElementById('website-counter'); 
        
        const targetValueProjects = 10; 
        const targetValueWebsite = 3; 
        
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.5 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'projects-counter') {
                        startCounter(entry.target, targetValueProjects, 1500); 
                    } else if (entry.target.id === 'website-counter') {
                        startCounter(entry.target, targetValueWebsite, 1500); 
                    }
                    
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);
        
        if (counterElementProjects) {
            observer.observe(counterElementProjects);
        }
        
        if (counterElementWebsite) { 
            observer.observe(counterElementWebsite);
        }
    });

