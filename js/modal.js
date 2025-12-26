document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item-wrapper');
    
    // --- Portfolio Filtering Logic ---
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const filter = event.target.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            portfolioItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                    item.classList.add('col-lg-4');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                    item.classList.remove('col-lg-4');
                }
            });
        });
    });
    
    const imageModalElement = document.getElementById('imageModal');
    const modalDialog = imageModalElement.querySelector('.modal-dialog'); 
    const modalContent = imageModalElement.querySelector('.modal-content'); 
    const modalBody = imageModalElement.querySelector('.modal-body'); 
    
    if (imageModalElement) {
        
        // --- NEW: Close modal when clicking outside the media ---
        imageModalElement.addEventListener('click', (event) => {
            // Check if the user clicked the modal backdrop, the dialog wrapper, 
            // or the body itself (not the image or video)
            if (event.target === imageModalElement || 
                event.target === modalDialog || 
                event.target === modalContent || 
                event.target === modalBody) {
                
                const modalInstance = bootstrap.Modal.getInstance(imageModalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        });

        // --- Modal Content Injection Logic ---
        imageModalElement.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;
            const portfolioItem = button.closest('.portfolio-item');
            const portfolioItemWrapper = button.closest('.portfolio-item-wrapper');
            
            const imageSrc = button.getAttribute('data-image-src'); 
            const videoSrc = button.getAttribute('data-video-src'); 
            
            const workType = portfolioItem ? portfolioItem.querySelector('.work-type').textContent : '';

            modalBody.innerHTML = '';
            
            const closeButton = document.createElement('button');
            closeButton.type = 'button';
            closeButton.classList.add('btn-close', 'btn-close-white', 'close-button-overlay');
            closeButton.setAttribute('data-bs-dismiss', 'modal');
            closeButton.setAttribute('aria-label', 'Close');
            modalContent.appendChild(closeButton);

            if (workType === 'VIDEO EDITING' && videoSrc) {
                modalBody.classList.remove('p-0'); 
                modalBody.classList.add('p-3', 'row', 'justify-content-center');

                const videoCol = document.createElement('div');
                videoCol.classList.add('col-12', 'col-md-10', 'm-auto'); 
                
                videoCol.innerHTML = `
                    <div class="ratio ratio-16x9">
                        <video controls controlsList="nodownload" class="rounded w-100" style="height: 100%;">
                            <source src="${videoSrc}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                `;
                modalBody.appendChild(videoCol);

            } else if (imageSrc) {
                modalBody.classList.add('p-0', 'd-flex', 'justify-content-center', 'align-items-center');

                const modalImageViewer = document.createElement('img');
                modalImageViewer.id = 'modal-image-viewer';
                modalImageViewer.src = imageSrc;
                modalImageViewer.alt = 'Project Design';
                
                modalImageViewer.style.maxWidth = '100%';
                modalImageViewer.style.maxHeight = '100vh';
                modalImageViewer.style.width = 'auto';
                modalImageViewer.style.height = 'auto';
                modalImageViewer.style.display = 'block';
                modalImageViewer.style.objectFit = 'contain';
                modalBody.appendChild(modalImageViewer);
                
            } else {
                console.error('No content source found for the clicked button.');
                modalBody.innerHTML = '<p class="text-light text-center">No content to display.</p>';
            }
        });

        // --- Modal Cleanup Logic ---
        imageModalElement.addEventListener('hidden.bs.modal', () => {
            modalBody.innerHTML = '';
            const closeButton = modalContent.querySelector('.close-button-overlay');
            if(closeButton) {
                closeButton.remove();
            }
            modalBody.classList.add('p-0', 'd-flex', 'justify-content-center', 'align-items-center');
            modalBody.classList.remove('p-3', 'row'); 
        });
    }
});
