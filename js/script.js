$(document).ready(function() {
    const $sliderTrack = $('#slider-track');
    const $navItems = $('.nav-item');
    let currentSlide = 0;
    const totalSlides = 4;
    let isDragging = false;
    let startX = 0;
    let deltaX = 0;
    const dragThreshold = 50;
    
    const bounceFactor = 0.1;

    function updateSlider(index) {
        if (index < 0 || index >= totalSlides) {
            return;
        }

        currentSlide = index;

        const offset = -currentSlide * (100 / totalSlides);
        $sliderTrack.css('transition', 'transform 0.5s ease-out'); 
        $sliderTrack.css('transform', 'translateX(' + offset + '%)');

        $navItems.removeClass('active');
        $navItems.filter('[data-slide-to="' + currentSlide + '"]').addClass('active');
    }


    function handleStart(e) {
        isDragging = true;
        startX = (e.touches ? e.touches[0].clientX : e.clientX);
        $sliderTrack.css('transition', 'none'); 
    }

    function handleMove(e) {
        if (!isDragging) return;

        e.preventDefault(); 
        
        const currentX = (e.touches ? e.touches[0].clientX : e.clientX);
        deltaX = currentX - startX;

        const slideWidthPercent = 100 / totalSlides;
        const currentOffset = -currentSlide * slideWidthPercent;
        const dragOffsetPercent = (deltaX / $sliderTrack.width()) * 100;
        
        let finalOffset = currentOffset + dragOffsetPercent;

        if (currentSlide === 0 && deltaX > 0) {
            const maxDragOffset = bounceFactor * slideWidthPercent;
            const limitedDrag = Math.min(dragOffsetPercent, maxDragOffset);
            finalOffset = currentOffset + limitedDrag;
        } 
        
        if (currentSlide === totalSlides - 1 && deltaX < 0) {
            const minDragOffset = -bounceFactor * slideWidthPercent;
            const limitedDrag = Math.max(dragOffsetPercent, minDragOffset);
            finalOffset = currentOffset + limitedDrag;
        }
        
        $sliderTrack.css('transform', 'translateX(' + finalOffset + '%)');
    }

    function handleEnd() {
        if (!isDragging) return;
        isDragging = false;

        $sliderTrack.css('transition', 'transform 0.5s ease-out');

        if (deltaX > dragThreshold && currentSlide > 0) {
            updateSlider(currentSlide - 1);
        } else if (deltaX < -dragThreshold && currentSlide < totalSlides - 1) {
            updateSlider(currentSlide + 1);
        } else {
            updateSlider(currentSlide);
        }
        
        startX = 0;
        deltaX = 0;
    }

    $sliderTrack.on('mousedown', handleStart);
    $(document).on('mousemove', handleMove);
    $(document).on('mouseup', handleEnd);

    $sliderTrack.on('touchstart', handleStart);
    $sliderTrack.on('touchmove', handleMove);
    $sliderTrack.on('touchend', handleEnd);
    
    $(window).on('blur', handleEnd);
    
    $navItems.on('click', function(e) {
        e.preventDefault();
        const targetIndex = parseInt($(this).data('slide-to'));
        updateSlider(targetIndex);
    });

    $(document).on('keydown', function(e) {
        if ($('#full-menu').hasClass('active')) return; 

        if (e.key === "ArrowRight") {
            updateSlider(currentSlide + 1);
        } else if (e.key === "ArrowLeft") {
            updateSlider(currentSlide - 1);
        }
    });

    updateSlider(0);
});