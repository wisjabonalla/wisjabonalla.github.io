document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tabs-nav .tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    const switchTab = (selectedTab) => {
        const targetContentId = selectedTab.getAttribute('data-tab');

        tabButtons.forEach(button => {
            button.classList.remove('active-tab');
        });

        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none'; 
        });

        selectedTab.classList.add('active-tab');

        const targetContent = document.querySelector(`.tab-content[data-content="${targetContentId}"]`);

        if (targetContent) {
            targetContent.classList.add('active');
            targetContent.style.display = 'block'; 
        }
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button);
        });
    });

    tabContents.forEach(content => {
        if (!content.classList.contains('active')) {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});