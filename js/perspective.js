$(document).ready(function() {
    const $card = $('.info-card, .portfolio-item');
    
    const maxRotate = 10; 

    $card.on('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left; 
        const mouseY = e.clientY - rect.top;  
        
        const ratioX = (mouseX / width) - 0.5; 
        const ratioY = (mouseY / height) - 0.5; 

        const rotateY = ratioX * -maxRotate * 3; 
        const rotateX = ratioY * maxRotate * 3;

        $(this).css('transform', 
            'perspective(1000px) ' + 
            'rotateX(' + rotateX + 'deg) ' + 
            'rotateY(' + rotateY + 'deg) ' +
            'scale(1.02)' 
        );
        
        $(this).addClass('is-tilted');
    });

    $card.on('mouseleave', function() {
        $(this).css('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
        $(this).removeClass('is-tilted');
    });
});