$(document).ready(function () {

    const $menuIcon = $('.menu-icon');
    const $fullMenu = $('#full-menu');
    const $closeMenuBtn = $('#close-menu');

    function openMenu() {
        $fullMenu.addClass('active');
        $menuIcon.hide();
        $closeMenuBtn.show();
    }

    function closeMenu() {
        $fullMenu.removeClass('active');
        $menuIcon.show();
        $closeMenuBtn.hide();
    }

    $menuIcon.on('click', openMenu);

    $closeMenuBtn.on('click', function (e) {
        e.preventDefault();
        closeMenu();
    });

    $('.menu-nav a').on('click', function () {
        closeMenu();
    });
    
});
