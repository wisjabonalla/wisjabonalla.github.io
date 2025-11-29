    var certModal = document.getElementById('certificateModal');
    
    var pdfViewer = document.getElementById("certPdfViewer");
    var modalTitle = document.getElementById("modalCertTitle");

    certModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget; 

        var pdfSrc = button.getAttribute('data-pdf-src');
        
        var certCard = button.closest('.cert-card');
        var title = certCard ? certCard.querySelector('.cert-title').innerText : 'Certificate';

        if (pdfSrc) {
            modalTitle.textContent = title;
            pdfViewer.src = pdfSrc;
        } else {
            modalTitle.textContent = "Error Loading Certificate";
            pdfViewer.src = ""; 
        }
    });

    certModal.addEventListener('hidden.bs.modal', function () {
        pdfViewer.src = ""; 
    });