document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item-wrapper');

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
    const modalBody = imageModalElement.querySelector('.modal-body'); 
    
    if (imageModalElement) {
        imageModalElement.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;
            const portfolioItem = button.closest('.portfolio-item');
            const portfolioItemWrapper = button.closest('.portfolio-item-wrapper');
            
            const imageSrc = button.getAttribute('data-image-src'); 
            const videoSrc = button.getAttribute('data-video-src'); 
            
            const projectTitle = portfolioItem ? portfolioItem.querySelector('.work-title').textContent : 'Project Details';
            const workType = portfolioItem ? portfolioItem.querySelector('.work-type').textContent : '';
            const category = portfolioItemWrapper ? portfolioItemWrapper.dataset.category : '';

            const modalTitle = imageModalElement.querySelector('#imageModalLabel');
            modalTitle.textContent = `${projectTitle}`;

            modalBody.innerHTML = '';
            
           if (workType === 'VIDEO EDITING' && videoSrc) {
                modalBody.classList.add('px-3', 'row', 'justify-content-center');

                const videoCol = document.createElement('div');
                videoCol.classList.add('col-12', 'col-md-10'); 
                
                videoCol.innerHTML = `
                    <div class="ratio ratio-16x9">
                        <video controls controlsList="nodownload" class="rounded w-100" style="height: 100%;">
                            <source src="${videoSrc}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                `;
                modalBody.appendChild(videoCol);

            }
            else if (imageSrc) {
                modalBody.classList.remove('p-3', 'row', 'g-3', 'align-items-center', 'justify-content-center'); // Also remove justify-content-center
                modalBody.classList.add('pb-5'); 

                const modalImageViewer = document.createElement('img');
                modalImageViewer.id = 'modal-image-viewer';
                modalImageViewer.src = imageSrc;
                modalImageViewer.alt = 'Project Design';
                
                modalImageViewer.style.width = '100%';
                modalImageViewer.style.height = 'auto';
                modalImageViewer.style.display = 'block';

                if (category === 'multimedia') {
                    modalImageViewer.style.maxWidth = '60%';
                    modalImageViewer.style.margin = '0 auto';
                } else {
                    modalImageViewer.style.maxWidth = '100%';
                    modalImageViewer.style.margin = '0';
                }
                modalBody.appendChild(modalImageViewer);
                
            } else {
                console.error('No content source found for the clicked button.');
                modalBody.innerHTML = '<p class="text-light text-center">No content to display.</p>';
            }
        });

        imageModalElement.addEventListener('hidden.bs.modal', () => {
            modalBody.innerHTML = '';
            modalBody.classList.remove('p-3', 'row', 'g-3', 'align-items-center', 'justify-content-center'); // Also reset justify-content-center
            modalBody.classList.add('pb-5');
        });
    }
});